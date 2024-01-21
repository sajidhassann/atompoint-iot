import React, { useEffect, useState } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, onChildAdded } from "firebase/database";
import "firebase/database";
import axios from "axios";

// Firebase Config - replace with your config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const apps = getApps();
let app;

// Initialize Firebase
if (!apps?.length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const database = getDatabase(app);

const App = () => {
  const [currentStatus, setCurrentStatus] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // const fetchInitialData = async () => {
    //   const historyResponse = await axios.get("/api/history");
    //   setHistory(Object.values(historyResponse.data).reverse());
    // };
    // fetchInitialData();
    const iotData = ref(database, "iotData");
    onChildAdded(iotData, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      setCurrentStatus(data);
      setHistory((prevHistory) => [data, ...prevHistory]);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-black-600 mb-4">
        IoT Dashboard
      </h1>

      <div className="bg-white shadow-md rounded p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Current Status</h2>
        <p className="text-gray-700">
          Temperature:{" "}
          <span className="font-bold">
            {Number(currentStatus?.temperature ?? 0).toFixed(2)}°C
          </span>
        </p>
        <p className="text-gray-700">
          Humidity:{" "}
          <span className="font-bold">
            {Number(currentStatus?.humidity ?? 0).toFixed(2)}%
          </span>
        </p>
      </div>

      <div className="bg-white shadow-md rounded divide-y divide-gray-200 p-4">
        <h2 className="text-xl font-semibold mb-2">History</h2>
        {history.map((item, index) => (
          <div key={index} className="py-2">
            <p className="text-gray-600">
              Timestamp: {new Date(item.timestamp).toLocaleString()}
            </p>
            <p className="text-gray-600">
              Temperature: {Number(item.temperature).toFixed(2)}°C
            </p>
            <p className="text-gray-600">
              Humidity: {Number(item.humidity).toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
