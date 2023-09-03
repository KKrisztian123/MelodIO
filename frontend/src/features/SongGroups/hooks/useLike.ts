import { useAxiosWithUrl } from "@hooks/useFetch";
import { getLikedSongsInList, changeLikeState } from "../utils/utils";
import { responseHandler } from "@/utils/utils";

export const useLike = (type: "album" | "song", result, setResult, count: "single" | "multiple" = "multiple") => {
  const [fetcher] = useAxiosWithUrl("POST");
  const changeLike = (value, id) =>
    setResult((current) => changeLikeState(type, current, value, id, count));

  const like = (id: string) => {
    const originalValue =
    count === "single"
        ? result.favorite
        : result?.[`${type}s`]?.find((song) => song.id === id)?.favorite;
    changeLike(!originalValue, id);

    fetcher(`/${type === "album" ? "albums" : "songs"}/${id}/like`, {
      value: !originalValue,
    })
      .then((res) =>
        responseHandler(res, (err) => err && changeLike(originalValue, id))
      )
      .catch(() => changeLike(originalValue, id));
  };

  return like;
};

export const useLikeInList = (type: "album" | "song", result, setResult) => {
  const [fetcher] = useAxiosWithUrl("POST");
  const changeLike = (value, id) =>
    setResult((current) =>
      getLikedSongsInList(changeLikeState(type, current, value, id))
    );

  const like = (id: string) => {
    const originalValue =
      type === "album"
        ? result.favorite
        : result.songs?.find((song) => song.id === id)?.favorite;
    changeLike(!originalValue, id);

    fetcher(`/${type === "album" ? "albums" : "songs"}/${id}/like`, {
      value: !originalValue,
    })
      .then((res) =>
        responseHandler(res, (err) => err && changeLike(originalValue, id))
      )
      .catch(() => changeLike(originalValue, id));
  };

  return like;
};
