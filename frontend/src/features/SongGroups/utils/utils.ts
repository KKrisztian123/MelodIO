/** Changes a songs like state in a list. */
export const changeLikeState = (
  type: "song" | "album",
  values,
  newValue,
  id,
  count: "single" | "multiple"
) => {
  if (count === "single") {
    return { ...values, favorite: newValue };
  }
  return {
    ...values,
    [`${type}s`]: values?.[`${type}s`]?.map((song) => {
      return song.id === id ? { ...song, favorite: newValue } : song;
    }),
  };
};
/** Returns only liked songs in the list */
export const getLikedSongsInList = (values) => {
  return {
    ...values,
    songs: values.songs.filter((song) => song.favorite),
  };
};
