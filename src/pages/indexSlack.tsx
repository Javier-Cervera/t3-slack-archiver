import type { NextPage } from "next";
//import React, { useState, useEffect } from 'react';
//import useSWR, { Fetcher } from 'swr';
import Message from "~/components/Message";
export interface messagesProps {
  channel?: string;
  userName: string;
  date: string;
  text: string;
  color: string;
  ts?: string;
}

const Index: NextPage = () => {
  //const fetcher: Fetcher<messagesProps[], string> = (url) => fetch(url).then((res) => res.json());
  //const { data, error } = useSWR('/api/messages', fetcher, { refreshInterval: 5000 });

  //data && console.log(data);
  return (
    <>
      <header>
        <h1>Slack Archiver</h1>
        <p>Channel: General</p>
      </header>
      {/*data
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
        ))*/}
    </>
  );
};

export default Index;
