import express from "express";
import authRoute from "./auth-route";
import userRoute from "./user-route";
import categoryRoute from "./category-route";
import lookupRoute from "./lookup-route";
import merchantsRoute from "./merchants-route";
const routes = express();

routes.use("/auth", authRoute);
routes.use("/users", userRoute);
routes.use("/categories", categoryRoute);
routes.use("/lookup", lookupRoute);
routes.use("/merchants", merchantsRoute);

export default routes;
