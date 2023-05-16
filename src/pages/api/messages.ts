import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db.ts";

interface MessageData {
  channel: string;
  userName: string;
  date: string;
  text: string;
  color: string;
  ts: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const bodyObject: MessageData = req.body as MessageData;
        const channel = await prisma.channel.upsert({
          where: { name: bodyObject.channel },
          update: {},
          create: { name: bodyObject.channel },
        });
        const message = await prisma.message.create({
          data: {
            ...bodyObject,
            channel: {
              connect: { id: channel.id },
            },
          },
        });
        message
          ? res.status(201).json(message)
          : res.status(500).json("Failed to add a new message.");
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json(error.message);
        }
      }
      break;

    case "GET":
      try {
        const channelName = req.query.channelName as string;
        const channel = await prisma.channel.findUnique({
          where: {
            name: channelName,
          },
        });
        if (channel) {
          const allMessages = await prisma.message.findMany({
            where: {
              channelId: channel.id,
            },
          });
          res.status(200).json(allMessages);
        } else {
          res.status(404).json({ message: "Channel not found" });
        }
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json(error.message);
        }
      }
      break;
  }
}
