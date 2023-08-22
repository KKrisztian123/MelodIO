import SongGroupGridItem from "../SongGroupGridItem/SongGroupGridItem";

/** Displays album information in grid item */
const AlbumGridItem = (props) => {
  return <SongGroupGridItem {...props} urlPrefix={"albums"} />;
};
export default AlbumGridItem;
