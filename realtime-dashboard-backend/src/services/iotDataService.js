import db from "../config/firebaseConfig.js";
import { simulateIoTData } from "../utils/simulateIoTData.js";

const iotData = db.ref("iotData");

const sendIoTDataToFirebase = () => {
  const data = simulateIoTData();
  iotData.push(data);
};

const getCurrentStatus = async () => {
  const snapshot = await iotData.orderByKey().limitToLast(1).once("value");
  let currentStatus = {};
  snapshot.forEach((snap) => (currentStatus = snap.val()));
  return currentStatus;
};

const getStatusHistory = async () => {
  const snapshot = await iotData.once("value");
  return snapshot.val();
};

const deleteAllData = async () => {
  await iotData.remove();
};

export {
  sendIoTDataToFirebase,
  getCurrentStatus,
  getStatusHistory,
  deleteAllData,
};
