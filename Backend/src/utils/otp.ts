import nodemailer from "nodemailer";

export const sentOTP = async (email:string,otp:number): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:process.env.MAIL,
      pass:process.env.PASS,
    },
  });
  const mailOptions ={
    from:process.env.MAIL,
    to:email,
    subject: "OTP Verification",
    text: `Your OTP is: ${otp}. Use this OTP to verify your account.`,
  }
  await transporter.sendMail(mailOptions)
    .then(()=>console.log(`Email has been sent to ${email}`))
    .catch((error: string)=> console.log(error));
};
