import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

type HeaderProps = {
  onSelectedChannelChange: (channel: string | null) => void;
};

export default function Header({ onSelectedChannelChange }: HeaderProps) {
  const [channels, setChannels] = useState<string[]>([]);
  const [selectedChannel, setSelectedChannel] = useState("");

  useEffect(() => {
    fetch("/api/channels")
      .then((response) => response.json())
      .then((data: { channelNames: string[] }) =>
        setChannels(data.channelNames)
      )
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    onSelectedChannelChange(selectedChannel);
  }, [selectedChannel, onSelectedChannelChange]);

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedChannel(event.target.value);
  }

  return (
    <header className="flex items-center justify-between p-4">
      <select
        value={selectedChannel}
        onChange={handleSelectChange}
        className="rounded-md border-gray-300"
      >
        <option value="">Select a channel</option>
        {channels?.map((channel) => (
          <option key={channel} value={channel}>
            {channel}
          </option>
        ))}
      </select>
      <AuthShowcase />
    </header>
  );
}

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  /*const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );*/

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {/*secretMessage && <span> - {secretMessage}</span>*/}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
