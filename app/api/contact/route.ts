import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

//check recaptcha 3 f

export async function POST(request: Request, response: NextResponse) {
  //this will be the node mail

  const result = await request.json();
  const { name, emailAddress, emailContent } = result;

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
      html: `
	  <div>
		<h1>New Message from ${name} about Dallery</h1>
		<p>${emailContent}</p>
	</div>
	  `,
    });

    return NextResponse.json({ message: "Email Sent!" });
  } catch (err) {
    return NextResponse.json({ message: "Email Failed!" });
  }
}
