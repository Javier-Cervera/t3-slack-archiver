import { token } from "./_constants";

interface SlackChannel {
  id: string;
  name: string;
}

interface SlackConversationsListResponse {
  channels: SlackChannel[];
}

export async function channelIdToName(channelId: string) {
  try {
    if (typeof token === "undefined") {
      throw new Error("Token is undefined");
    }

    const url = "https://slack.com/api/conversations.list";
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = (await response.json()) as SlackConversationsListResponse;

    return data.channels.find((channel) => channel.id === channelId)?.name;
  } catch (err) {
    console.log("fetch Error:", err);
  }
}

interface SlackUser {
  real_name: string;
  color: string;
}

interface SlackUsersInfoResponse {
  user?: SlackUser;
}

export async function userInfo(
  userId: string
): Promise<{ userName: string; color: string }> {
  const encodedUser = `${encodeURIComponent("user")}=${encodeURIComponent(
    userId
  )}`;

  try {
    if (typeof token === "undefined") {
      throw new Error("Token is undefined");
    }

    const url = "https://slack.com/api/users.info";
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: encodedUser,
    });
    const data = (await response.json()) as SlackUsersInfoResponse;
    // console.log(data);
    return {
      userName: data.user?.real_name ?? "",
      color: data.user?.color ?? "",
    };
  } catch (err) {
    console.log("fetch Error:", err);
    return { userName: "", color: "" };
  }
}
