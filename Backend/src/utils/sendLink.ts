import nodemailer from "nodemailer";

export const sendLink = async (email:string,Link:string): Promise<void> => {
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
    subject: "Meeting Link",
    text: `use ${Link} for Join the Meeting`,
  }
  await transporter.sendMail(mailOptions)
    .then(()=>console.log(`Email has been sent to ${email}`))
    .catch((error: string)=> console.log(error));
};
