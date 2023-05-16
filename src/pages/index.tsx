import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Message from "~/components/Message";

export interface messagesProps {
  userName: string;
  date: string;
  text: string;
  color: string;
  ts?: string;
}

type HomeProps = {
  selectedChannel: string | null;
};

const Home: NextPage<HomeProps> = ({ selectedChannel }) => {
  const [messages, setMessages] = useState<messagesProps[]>([]);

  useEffect(() => {
    if (selectedChannel) {
      fetch(`/api/messages?channelName=${selectedChannel}`)
        .then((response) => response.json())
        .then((data: messagesProps[]) => setMessages(data))
        .catch((error) => console.log(error));
    }
  }, [selectedChannel]);

  return (
    <>
      <div className="h-full overflow-y-scroll">
        {messages
          ?.sort((a, b) => {
            return Date.parse(a.date) - Date.parse(b.date);
          })
          .map((message) => (
            <Message
              key={message.ts}
              userName={message.userName}
              date={message.date.slice(0, 24)}
              text={message.text}
              color={message.color}
            />
          ))}
      </div>
    </>
  );
};

export default Home;
