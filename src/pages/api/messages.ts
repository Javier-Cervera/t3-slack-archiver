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
        const channelId = req.query.channelId;
        const allMessages = await prisma.message.findMany({
          where: {
            channelId: Number(channelId),
          },
        });
        allMessages && res.status(200).json(allMessages);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json(error.message);
        }
      }
  }
  /*const client = await clientPromise;
  const db = client.db("archive");

  switch (req.method) {
    case "POST":
      try {
        const bodyObject: messagesData = JSON.parse(req.body);
        const message = await db.collection("messages").insertOne(bodyObject);
        message
          ? res.status(201).json(message)
          : res.status(500).json("Failed to add a new message.");
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json(error.message);
        }
      }
      break;
    
      try {
        const allMessages = await db.collection("messages").find({}).toArray();
        allMessages && res.status(200).json(allMessages);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json(error.message);
        }
      }
      break;
    }*/
}
