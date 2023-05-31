import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

//export default function handler(req: NextApiRequest, res: NextResponse) {
//  if (req.method === "POST") {
//    // Process a POST request
//    console.log(req.body);
//	return res.json()
//  }
//}

export async function POST(request: Request, response: NextResponse) {
  //this will be the node mail

  const result = await request.json();
  const { name, emailAddress, emailContent } = result;

  console.log(result, "this is the result");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NEXT_PUBLIC_DEV_EMAIL,
      pass: process.env.NEXT_PUBLIC_DEV_EMAIL_PASSWORD,
    },
  });
  try {
    const mailer = await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_DEV_EMAIL,
      to: process.env.NEXT_PUBLIC_DEV_EMAIL,
      replyTo: emailAddress,
      subject: `New Message from ${name} about Dallery`,
      text: emailContent,
      html: `<p>${emailContent}</p>`,
    });
    console.log("this is the mailer");

    //do stuff with node mailer use your own email secret here
    return NextResponse.json({ message: "Email Sent!" });
  } catch (err) {
    return NextResponse.json({ message: "Email Failed!" });
  }
}
