import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db.ts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const channels = await prisma.channel.findMany({
        select: {
          name: true,
        },
      });
      const channelNames = channels.map((channel) => channel.name);
      res.status(200).json(channelNames);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json(error.message);
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
