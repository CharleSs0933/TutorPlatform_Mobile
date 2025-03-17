// bookingRoutes.ts
import express from "express";
import {
  cancelBooking,
  createPayment,
  createStripePaymentIntent,
  createTrialBooking,
  getParentBookings,
  payPayment,
} from "../controllers/bookingController";
import tutorAuth from "../middleware/tutorAuth";

const router = express.Router();

router.post("/stripe/payment-intent", createStripePaymentIntent);
router.post("/stripe/create", createPayment);
router.post("/stripe/pay", payPayment);
router.post("/create-trial-booking", createTrialBooking);
router.get("/parent", tutorAuth, getParentBookings);
router.put("/cancel", cancelBooking);

export default router;
