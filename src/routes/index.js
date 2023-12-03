import doctorRoutes from "./doctor";
import authRoutes from "./auth";
import { notFound } from "../middlewares/handle-errors";

const initRoutes = (app) => {
  app.use("/doctor", doctorRoutes);
  app.use("/auth", authRoutes);

  app.use(notFound);
};

module.exports = initRoutes;
