import type { NextApiRequest, NextApiResponse } from "next";
//import clientPromise from 'lib/mongodb';

interface messagesData {
  channel: string;
  userName: string;
  date: string;
  text: string;
  color: string;
  ts: string;
}

/*export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
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
    case "GET":
      try {
        const allMessages = await db.collection("messages").find({}).toArray();
        allMessages && res.status(200).json(allMessages);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json(error.message);
        }
      }
      break;
  }
}*/
