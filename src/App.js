import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./components/Header";
import Loader from "./components/loader";
import './App.css';

const RoofForms = lazy(() => import('./components/pages/roof-form'));
const SignUp = lazy(() => import('./components/signup'));
const SignIn = lazy(() => import('./components/signin'));
const CombineForm = lazy(() => import('./components/Combine-form'));

function App() {
  const { userId } = useSelector((store) => store.rooftop);

  return (
    <>
      <Router>
        <Header />
        <Suspense fallback={<Loader />}>
          <Routes>
            {
              !userId ? <>
                <Route path="/signup" element={<SignUp />} />
                <Route default path="*" element={<SignIn />} />
                <Route path="/signin" element={<SignIn />} />
              </> :
                <>
                  <Route path="/" element={<CombineForm />} />
                  <Route path="/roof-forms" element={<RoofForms />} />
                </>
            }
          </Routes>
        </Suspense>
      </Router>
    </>

  );
}
export default App;
