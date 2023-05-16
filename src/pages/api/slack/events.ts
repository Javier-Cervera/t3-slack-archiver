import type { NextApiRequest, NextApiResponse } from "next";
import { challenge } from "./events_handlers/_challenge";
import { message_channels } from "./events_handlers/_message_channels";
import { validateSlackRequest } from "./_validate";
import { signingSecret } from "./_constants";

interface EventsRequestBody {
  type: string;
  event: {
    type: string;
  };
}

export default async function events(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body as EventsRequestBody;
  //console.log(body);
  if (typeof signingSecret === "undefined") {
    throw new Error("Signing secret is undefined");
  }

  const type = body.type;
  //console.log(validateSlackRequest(req, signingSecret));
  if (type === "url_verification") {
    // await challenge(req, res); ?
    challenge(req, res);
  } else if (validateSlackRequest(req, signingSecret)) {
    if (type === "event_callback") {
      const event_type = body.event.type;
      switch (event_type) {
        case "message":
          res.status(200);
          await message_channels(req, res);
          break;
        default:
          break;
      }
    } else {
      console.log("body:", body);
    }
  } else {
    res.end();
  }
}
