/** Gets all unique artist id-s from an array of albums */
export const getArtistIdsFromAlbums = (albums: Album[]) => {
  const authorList: string[] = [];
  albums.forEach((album) => {
    album.author.forEach(
      (author) => authorList.indexOf(author) === -1 && authorList.push(author)
    );
  });
  return authorList;
};
