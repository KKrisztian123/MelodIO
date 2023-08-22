import SongGroupGridItem from "../SongGroupGridItem/SongGroupGridItem";

/** Displays album information in grid item */
const PlaylistGridItem = (props) => {
  return <SongGroupGridItem {...props} urlPrefix={"playlists"} />;
};
export default PlaylistGridItem;
