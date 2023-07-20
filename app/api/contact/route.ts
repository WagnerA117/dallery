import validateHuman from "@/app/utils/validateHuman ";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

//check recaptcha 3 f

export async function POST(request: Request, response: NextResponse) {
  //this will be the node mail

  console.log("this ran");

  const result = await request.json();
  const { name, emailAddress, emailContent, token } = result;

  console.log(token, "recaptcha token from contact form");

  const verified = await validateHuman(token);

  console.log(verified, "verified from contact form");

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
    console.log("email would send here");

    //  const mailer = await transporter.sendMail({
    //    from: process.env.NEXT_PUBLIC_DEV_EMAIL,
    //    to: process.env.NEXT_PUBLIC_DEV_EMAIL,
    //    replyTo: emailAddress,
    //    subject: `New Message from ${name} about Dallery`,
    //    text: emailContent,
    //    html: `
    //  <div>
    //	<h1>New Message from ${name} about Dallery</h1>
    //	<p>${emailContent}</p>
    //</div>
    //  `,
    //  });

    return NextResponse.json({ message: "Email Sent!" });
  } catch (err) {
    return NextResponse.json({ message: "Email Failed!" });
  }
}

export const dynamic = "force-static";
