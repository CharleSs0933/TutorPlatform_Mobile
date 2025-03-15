// bookingRoutes.ts
import express from "express";
import {
  createPayment,
  createStripePaymentIntent,
  createTrialBooking,
  payPayment,
} from "../controllers/bookingController";

const router = express.Router();

router.post("/stripe/payment-intent", createStripePaymentIntent);
router.post("/stripe/create", createPayment);
router.post("/stripe/pay", payPayment);
router.post("/create-trial-booking", createTrialBooking);

export default router;
