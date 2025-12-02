import { Request, Response } from "express";
import { paymentService } from "./payment.service";
import sendResponse from "../../shared/sendResponse";

const createCheckoutSession = async (req: Request, res: Response) => {
  const result = await paymentService.createCheckoutSession(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Checkout session created",
    data: result,
  });
};

const handleWebhook = async (req: Request, res: Response) => {
  const result = await paymentService.handleWebhook(req, res);
  return result; // Stripe requires direct return
};

export const paymentController = {
  createCheckoutSession,
  handleWebhook,
};
