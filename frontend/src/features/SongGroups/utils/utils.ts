export const changeLikeState = (
  type: "song" | "album",
  values,
  newValue,
  id
) => {
  if (type === "album") {
    return { ...values, favorite: newValue };
  }
  return {
    ...values,
    songs: values.songs?.map((song) => {
      return song.id === id ? { ...song, favorite: newValue } : song;
    }),
  };
};
