import type { NextApiRequest, NextApiResponse } from "next";

interface ChallengeRequestBody {
  challenge: string;
}

export function challenge(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as ChallengeRequestBody;
  console.log("req body challenge is:", body.challenge);

  res.status(200).send({
    challenge: body.challenge,
  });
}
