import { useCallback, useEffect, useState } from "react";
import { getPlayHistory, savePlayHistory } from "../utils/utils";

const usePlayHistory = () => {
  const [playHistory, setPlayHistory] = useState([] as string[]);

  const getAll = useCallback(() => {
    getPlayHistory().then((res) => {
      if (!Array.isArray(res)) return;
      setPlayHistory(res);
    });
  }, []);

  useEffect(() => {
    getAll();
  }, [getAll]);

  const add = useCallback(
    (albumId: string) => {
      const lastofHistory = playHistory.slice(0, 5);
      if (lastofHistory.includes(albumId) || albumId === "liked-songs") return;
      const newHistory = [albumId, ...lastofHistory];
      setPlayHistory(newHistory);
      savePlayHistory(newHistory);
    },
    [setPlayHistory, playHistory]
  );

  return { playHistory, getAll, add };
};

export default usePlayHistory;
