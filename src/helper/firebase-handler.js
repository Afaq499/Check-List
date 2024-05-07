import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  orderBy,
  startAt,
  endAt,
  getCountFromServer
} from "@firebase/firestore"
import Cryptr from 'cryptr';
import { firestore } from "../firebase/index";
import moment from 'moment';

import { uploadFileOnS3 } from "./upload-file-on-s3";

const GetUser = async ({ email, userId }) => {
  try {
    if (email) {
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      return newData;
    } else if (userId) {
      const user = await getDoc(doc(firestore, 'users', userId))
      return user.data()
    }
  } catch (error) {
    console.log('err => ', error);
  }
}

export const handleSignUp = async (user) => {
  const userRef = collection(firestore, "users") // Firebase creates this automatically

  try {
    const users = await GetUser({ email: user.email });
    if (users?.length > 0) {
      return {
        success: false,
        message: 'User Already Exists'
      };
    }
    await addDoc(userRef, user);
    return {
      success: true,
      message: 'SignUp Successfully'
    };
  } catch (err) {
    return {
      success: false,
      message: err
    };
  }

}

export const signInUser = async ({ email, password }) => {
  const cryptr = new Cryptr(process.env.REACT_APP_Password_Secret_key);
  const user = await GetUser({ email });
  if (user?.length) {
    const { id, password: savedPass } = user[0];
    if (password === cryptr.decrypt(savedPass)) {
      return {
        success: true,
        message: 'SignIn Successfully',
        userId: id
      };
    }
  }
  return {
    success: false,
    message: 'Email or Password is Incorrect'
  };
}

const createFileDocument = async (fileInfo) => {
  const fileRef = collection(firestore, 'roof-forms');
  await addDoc(fileRef, fileInfo);
  return {
    success: true,
    message: 'File Saved Successfully'
  };
}

export const GetRoofForms = async ({ userId, skip, limit, page }) => {
  try {
    const roofFormRef = collection(firestore, 'roof-forms');
    const q = query(roofFormRef, where('userId', '==', userId), orderBy("count"), startAt(skip), endAt(limit * page));
    const count = await getCountFromServer(roofFormRef);
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    return { data, count: count.data().count };
  } catch (error) {
    throw error
  }
}

export const uploadAndSaveFile = async ({ file, userId, fileName }) => {
  const user = await GetUser({ userId });
  const { firstName, lastName } = user || {};

  try {
    await uploadFileOnS3({
      fileName: `${fileName}-${firstName}-${moment().format('D-MMM-YY-h:mm')}.pdf`,
      file
    });

    const roofFormRef = collection(firestore, "roof-forms");
    const count = await getCountFromServer(roofFormRef);
    const res = await createFileDocument({
      userId,
      userName: `${firstName} ${lastName}`,
      fileName: `${fileName}-${firstName}-${moment().format('D-MMM-YY-h:mm')}.pdf`,
      createdDate: moment().format('MMM-DD-YYYY, h:mm:ss a'),
      count: count.data().count
    });
    return res;
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }
}
