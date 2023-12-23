import doctorRoutes from './doctor';
import authRoutes from './auth';
import shiftRoutes from './shift';
import patientRoutes from './patient';
import roomRoutes from './room';
import doctorShiftRoutes from './doctorShift';
import surgeryTypeRoutes from './surgeryType';
import doctorMajorRoutes from './doctorMajor';
import surgeryRoutes from './surgery';
import settingRoutes from './setting';
import { notFound } from '../middlewares/handle-errors';

const initRoutes = (app) => {
  app.use('/doctor', doctorRoutes);
  app.use('/auth', authRoutes);
  app.use('/shift', shiftRoutes);
  app.use('/patient', patientRoutes);
  app.use('/room', roomRoutes);
  app.use('/doctorShift', doctorShiftRoutes);
  app.use('/surgeryType', surgeryTypeRoutes);
  app.use('/doctorMajor', doctorMajorRoutes);
  app.use('/surgery', surgeryRoutes);
  app.use('/setting', settingRoutes);

  app.use(notFound);
};

module.exports = initRoutes;
