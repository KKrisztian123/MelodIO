import { Preferences } from "@capacitor/preferences";

export const savePlayHistory = async (playHistory: Album["id"][]) => {
  await Preferences.set({
    key: "playHistory",
    value: JSON.stringify(playHistory),
  });
};
export const getPlayHistory = async () => {
  const { value: playHistory } = await Preferences.get({ key: "playHistory" });
  try {
    return playHistory ? JSON.parse(playHistory) : [];
  } catch {
    return [];
  }
};
