"use client";
import { Payment } from "@/types/payment";
import PaymentCheckoutDetails from "./PaymentCheckoutDetails";
import PaymentForm from "./PaymentForm";
import { FormProvider, useForm } from "react-hook-form";
import { paymentSchema, PaymentSchema } from "@/schemas/payment";
import { zodResolver } from "@hookform/resolvers/zod";

const PaymentContainer = ({ payment }: { payment: Payment }) => {
  const methods = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchema),
    mode: "all",
    defaultValues: {
      checkInDate: new Date(payment.checkInDate),
      checkoutDate: new Date(payment.checkoutDate),
      guests: payment.guests,
      cardNumber: payment.cardNumber,
      totalCosts: payment.totalCosts,
      user: payment.user._id,
      hotel: payment.hotel._id,
      status: payment.status,
    },
  });
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <FormProvider {...methods}>
          <PaymentForm payment={payment} />
          <PaymentCheckoutDetails payment={payment} />
        </FormProvider>
      </div>
    </>
  );
};

export default PaymentContainer;
