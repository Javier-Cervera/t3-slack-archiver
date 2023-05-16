import React from "react";
import type { messagesProps } from "~/pages/index";

export default function Message({
  userName,
  date,
  text,
  color,
}: messagesProps) {
  return (
    <div className="m-2 inline-block rounded-md bg-gray-800 p-2">
      <div className="flex items-center">
        <h3
          className="m-0 p-1 text-lg text-white"
          style={{ color: `#${color}` }}
        >
          {userName}
        </h3>
        <p className="m-1 mb-0 mt-0 text-sm text-white">{date}</p>
      </div>
      <p className="m-0 px-0 py-1 text-base text-white">{text}</p>
    </div>
  );
}
