import { listen } from './app';
import { sendIoTDataToFirebase } from './services/iotDataService';

const port = process.env.PORT || 3000;

listen(port, () => {
  console.log(`Server is running on port ${port}`);

  // Simulate IoT data every 5 seconds
  setInterval(sendIoTDataToFirebase, 5000);
});
