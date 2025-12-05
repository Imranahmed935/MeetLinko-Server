import express, { Application,  Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";
import { paymentController } from "./app/modules/payment/payment.controller";

const app: Application = express();


app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentController.handleWebhook
);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);


app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "MeetLinko Server is running..",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
