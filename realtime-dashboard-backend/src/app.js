import express from 'express';
import iotDataRoutes from './api/iotDataRoutes';

const app = express();

app.use('/api', iotDataRoutes);

export default app;
