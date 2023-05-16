import type { NextApiRequest, NextApiResponse } from "next";
import { channelIdToName, userInfo } from "../_utils";

interface MessageChannelsRequestBody {
  event_time: number;
  event: {
    channel: string;
    user: string;
    text: string;
    ts: string;
  };
}

export async function message_channels(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body as MessageChannelsRequestBody;
  const date = new Date(body.event_time * 1000);
  // console.log(event);
  try {
    // NEXTAUTH_URL used as Host url
    if (typeof process.env.NEXTAUTH_URL === "undefined") {
      throw new Error("NEXTAUTH_URL environment variable is undefined");
    }

    const channelName = await channelIdToName(body.event.channel);
    const { userName, color } = await userInfo(body.event.user);

    await fetch(`${process.env.NEXTAUTH_URL}/api/messages`, {
      method: "POST",
      body: JSON.stringify({
        channel: channelName,
        userName: userName,
        date: date.toString(),
        text: body.event.text,
        color: color,
        ts: body.event.ts,
      }),
    });
    res.end();
  } catch (e) {
    console.log(e);
  }
}
