import { ref } from '../config/firebaseConfig';
import simulateIoTData from '../utils/simulateIoTData';

const sendIoTDataToFirebase = () => {
  const data = simulateIoTData();
  ref('iotData').push(data);
};

const getCurrentStatus = async () => {
  const snapshot = await ref('iotData')
    .orderByKey()
    .limitToLast(1)
    .once('value');
  let currentStatus = {};
  snapshot.forEach((snap) => (currentStatus = snap.val()));
  return currentStatus;
};

const getStatusHistory = async () => {
  const snapshot = await ref('iotData').once('value');
  return snapshot.val();
};

export default { sendIoTDataToFirebase, getCurrentStatus, getStatusHistory };
