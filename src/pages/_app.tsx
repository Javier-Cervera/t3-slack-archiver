import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import { useState } from "react";
import Head from "next/head";
import Header from "~/components/Header";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-screen bg-gray-900 p-4 text-white">
        <Header onSelectedChannelChange={setSelectedChannel} />
        <Component {...pageProps} selectedChannel={selectedChannel} />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
