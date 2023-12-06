import doctorRoutes from "./doctor";
import authRoutes from "./auth";
import shiftRoutes from "./shift";
import { notFound } from "../middlewares/handle-errors";

const initRoutes = (app) => {
  app.use("/doctor", doctorRoutes);
  app.use("/auth", authRoutes);
  app.use("/shift", shiftRoutes);

  app.use(notFound);
};

module.exports = initRoutes;
