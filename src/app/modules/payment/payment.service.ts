
import { Request, Response } from "express";
import { stripe } from "../../helper/stripe";
import { prisma } from "../../shared/prisma";

const createCheckoutSession = async (payload: any) => {
  const { userId, planType } = payload;

  const priceId =
    planType === "WEEKLY"
      ? process.env.WEEKLY_PRICE_ID
      : planType === "MONTHLY"
      ? process.env.MONTHLY_PRICE_ID
      : process.env.YEARLY_PRICE_ID;

  if (!priceId) throw new Error("Invalid subscription plan");

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: "https://github.com/Imranahmed935/payment/success",
    cancel_url: "http://localhost:3000/payment/cancel",
    metadata: {
      userId,
      planType,
    },
  });

  return { url: session.url };
};



export const handleWebhook = async (req:Request, res: Response) => {
  const signature = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const userId = session.metadata?.userId;
    const planType = session.metadata?.planType;

    if (!userId || !planType) {
      return res.status(400).json({ error: "Missing userId or planType in metadata" });
    }

    const startDate = new Date();
    const endDate = calculateExpiry(planType);

    try {
      // Upsert subscription: create if not exists, update if exists
      await prisma.subscription.upsert({
        where: { userId },
        update: {
          type: planType,
          startDate,
          endDate,
          updatedAt: new Date(),
        },
        create: {
          userId,
          type: planType,
          startDate,
          endDate,
        },
      });

      
      // await prisma.user.update({
      //   where: { id: userId },
      //   // data: { subscriptionActive: true },
      // });

    } catch (err) {
      console.error("Prisma update error:", err);
      return res.status(500).json({ error: "Failed to update subscription" });
    }

    return res.json({ received: true });
  }

  return res.json({ received: true });
};

function calculateExpiry(planType: string) {
  const date = new Date();

  if (planType === "WEEKLY") {
    date.setDate(date.getDate() + 7);
  } else if (planType === "MONTHLY") {
    date.setMonth(date.getMonth() + 1);
  } else if (planType === "YEARLY") {
    date.setFullYear(date.getFullYear() + 1);
  }

  return date;
}

export const paymentService = {
  createCheckoutSession,
  handleWebhook,
};
