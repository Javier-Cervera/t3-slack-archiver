import type { NextApiRequest } from "next";
import crypto from "crypto";

export function validateSlackRequest(
  event: NextApiRequest,
  signingSecret: string
) {
  const requestBody = JSON.stringify(event["body"]);

  const headers = event.headers;

  const timestamp = headers["x-slack-request-timestamp"] as string;
  const slackSignature = headers["x-slack-signature"] as string;
  const baseString = "v0:" + timestamp + ":" + requestBody;

  const hmac = crypto
    .createHmac("sha256", signingSecret)
    .update(baseString)
    .digest("hex");
  const computedSlackSignature = "v0=" + hmac;
  const isValid = computedSlackSignature === slackSignature;

  return isValid;
}
