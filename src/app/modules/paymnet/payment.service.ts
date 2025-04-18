import Stripe from "stripe";
import prisma from "../../../shared/prisma";
import config from "../../config";
import { appointmentStatus } from "@prisma/client";

const stripe = new Stripe(config.stripeSecret as string, {
    apiVersion: "2025-03-31.basil",
});

const paymentStoreBD = async (payload: any) => {
  const { doctorId, appointmentId,email, price } = payload;

  const doctorInfo = await prisma.doctor.findUnique({
    where: { id: doctorId },
  });

  if (!doctorInfo) throw new Error("Doctor not found");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: doctorInfo.name,
            },
           unit_amount: doctorInfo.appointmentFee, 
          },
          quantity: 1,
        },
      ],
    mode: "payment",
    success_url: `${config.publicDomainUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.publicDomainUrl}/payment/cancel`,
    customer_email:email,
    currency: "usd",
    metadata: {
      doctorId,
      appointmentId,
      price:doctorInfo.appointmentFee,
    },
  });
  return session;
};

const paymentGetBD=async(id:string)=>{
    const session=await stripe.checkout.sessions.retrieve(id)
     if(session?.payment_status == "paid"){
        const {appointmentId,price}:any=session.metadata
           await prisma.$transaction(async (tx) => {
            await tx.payment.create({
              data: {
                appointmentId,
                transactionId: session.payment_intent as string,
                amount:parseInt(price),
              },
            });
          
            await tx.appointment.update({
              where: { id: appointmentId },
              data: { status: appointmentStatus.COMPLETED },
            });
          });
     }
    return session.metadata
}

export const paymentService = {
    paymentGetBD,
  paymentStoreBD,
};
