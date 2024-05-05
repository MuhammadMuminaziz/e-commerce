import { signUp } from "@/libs/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    await signUp(req.body, (status: boolean) => {
      let message;
      let code;
      status
        ? ((message = "success"), (code = 200))
        : ((message = "failed"), (code = 400));
      res.status(code).json({ status, message });
    });
  } else {
    res.status(405).json({
      status: false,
      message: "Method not allowed",
    });
  }
}
