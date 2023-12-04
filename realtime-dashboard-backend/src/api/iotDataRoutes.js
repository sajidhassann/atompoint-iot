import { Router } from 'express';
const router = Router();
import { getCurrentStatus, getStatusHistory } from '../services/iotDataService';

router.get('/status', async (req, res) => {
  try {
    const currentStatus = await getCurrentStatus();
    res.json(currentStatus);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/history', async (req, res) => {
  try {
    const history = await getStatusHistory();
    res.json(history);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
