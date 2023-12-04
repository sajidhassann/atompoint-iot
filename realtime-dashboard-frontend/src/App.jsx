import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import axios from 'axios';

// Firebase Config - replace with your config
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

function App() {
  const [currentStatus, setCurrentStatus] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const historyResponse = await axios.get(
        'http://localhost:3000/api/history'
      );
      setHistory(Object.values(historyResponse.data));
    };

    fetchInitialData();

    const db = firebase.database().ref('iotData');
    db.limitToLast(1).on('child_added', (snapshot) => {
      const data = snapshot.val();
      setCurrentStatus(data);
      setHistory((prevHistory) => [...prevHistory, data]);
    });
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold text-center text-blue-600 mb-4'>
        IoT Dashboard
      </h1>

      <div className='bg-white shadow-md rounded p-4 mb-4'>
        <h2 className='text-xl font-semibold mb-2'>Current Status</h2>
        <p className='text-gray-700'>
          Temperature:
          <span className='font-bold'>{currentStatus.temperature}°C</span>
        </p>
        <p className='text-gray-700'>
          Humidity: <span className='font-bold'>{currentStatus.humidity}%</span>
        </p>
      </div>

      <div className='bg-white shadow-md rounded p-4'>
        <h2 className='text-xl font-semibold mb-2'>History</h2>
        {history.map((item, index) => (
          <div
            key={index}
            className='border-b border-gray-200 py-2'
          >
            <p className='text-gray-600'>
              Timestamp: {new Date(item.timestamp).toLocaleString()}
            </p>
            <p className='text-gray-600'>Temperature: {item.temperature}°C</p>
            <p className='text-gray-600'>Humidity: {item.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
