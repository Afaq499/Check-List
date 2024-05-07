import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import Table from '../../../components/Table';
import Notification from "../../Notification";
import Loader from "../../loader";

import { GetRoofForms } from "../../../helper/firebase-handler";
import './style.css';

const RoofForms = () => {
  const { userId } = useSelector((store) => store.rooftop);

  const [page, setPage] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [forms, setForms] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [pageCounts, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    setLoading(true);
    GetRoofForms({ userId,
      skip: page * perPage,
      limit: perPage,
      page: page + 1
    }).then(({ data, count }) => {
      setForms(data);
      setPageCount(count);
    }).catch(error => {
      setNotification({
        open: true,
        message: error?.message,
        type: "error",
      });
    });
  }, [userId, perPage, page]);

  useEffect(() => {
    if (loading) setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [loading]);


  useEffect(() => {
    const formsData = forms?.map(({
      fileName,
      userName,
      createdDate
    }, id) => {
      return {
        id: id + 1,
        formName: fileName,
        userName,
        date: createdDate,
        action: ''
      }
    });
    setTableData(formsData);
  }, [forms]);
  return (
    <div className="roof-table">
      {
        loading && <Loader />
      }
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <Table
        rows={tableData}
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
        count={pageCounts}
      />
    </div>
  )
}

export default RoofForms;
