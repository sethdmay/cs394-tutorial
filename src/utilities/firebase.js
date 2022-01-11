import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDnjfv7_B-dowbzM3XWz0GH5EE8aQmogCw",
  authDomain: "cs394-tutorial.firebaseapp.com",
  databaseURL: "https://cs394-tutorial-default-rtdb.firebaseio.com",
  projectId: "cs394-tutorial",
  storageBucket: "cs394-tutorial.appspot.com",
  messagingSenderId: "738662707547",
  appId: "1:738662707547:web:a66538a9ef28714c73aa7e",
  measurementId: "G-EZBN99QCC4",
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    if (devMode) { console.log(`loading ${path}`); }
    return onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      if (devMode) { console.log(val); }
      setData(transform ? transform(val) : val);
      setLoading(false);
      setError(null);
    }, (error) => {
      setData(null);
      setLoading(false);
      setError(error);
    });
  }, [path, transform]);

  return [data, loading, error];

};