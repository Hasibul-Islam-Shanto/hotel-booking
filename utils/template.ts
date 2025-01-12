import { Payment } from "@/types/payment";

export const EmailReceiptTemplate = (payment: Payment) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Receipt</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #2c3e50; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
          <h1 style="color: #ffffff; margin: 0;">Payment Confirmation</h1>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0;">
          <p style="margin-top: 0;">Dear ${
            payment?.user?.name || "Valued Guest"
          },</p>
          
          <p>Thank you for your payment! Your booking has been confirmed.</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #2c3e50; margin-top: 0; font-size: 18px;">Booking Details:</h2>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 10px;">📅 Check-in: <strong>${new Date(
                payment.checkInDate
              ).toLocaleDateString()}</strong></li>
              <li style="margin-bottom: 10px;">📅 Check-out: <strong>${new Date(
                payment?.checkoutDate
              ).toLocaleDateString()}</strong></li>
              <li style="margin-bottom: 10px;">👥 Number of Guests: <strong>${
                payment.guests
              }</strong></li>
              <li style="margin-bottom: 10px;">💳 Amount Paid: <strong>$${
                payment?.totalCosts
              }</strong></li>
            </ul>
          </div>
          
          <p>We've attached your detailed receipt to this email for your records.</p>
          
          <p>If you have any questions or need to modify your booking, please don't hesitate to contact us.</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 5px 5px; border: 1px solid #e0e0e0; border-top: none;">
          <p style="margin: 0; color: #666;">
            🏨 ${payment?.hotel?.propertyName}<br>
            📞 Contact: +880 178-5303538<br>
            📧 Email: mdhasibulislam895@gmail.com
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};
