import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

//export default function handler(req: NextApiRequest, res: NextResponse) {
//  if (req.method === "POST") {
//    // Process a POST request
//    console.log(req.body);
//	return res.json()
//  }
//}

export async function POST(request: Request) {
  //this will be the node mail
  try {
    const result = await request.json();

    //do stuff with node mailer use your own email secret here
    return NextResponse.json({ message: "Hello World" });
  } catch (err) {
    return NextResponse.error();
  }
}
