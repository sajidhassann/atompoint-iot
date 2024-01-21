import {
  deleteAllData,
  sendIoTDataToFirebase,
} from "./src/services/iotDataService.js";
import app from "./src/app.js";

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  // Simulate IoT data every 5 seconds
  setInterval(sendIoTDataToFirebase, 5000);

  // Delete all IoT data every 3 minutes
  setInterval(deleteAllData, 3 * 60 * 1000);
});
