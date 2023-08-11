import Content, {
  type ContentProps,
} from "@components/Layout/Frame/ContentContainer/Content";
import PageFetchDisplay from "@components/PageFetchDisplay/PageFetchDisplay";
import TitleRow from "@components/TitleRow/TitleRow";
import { IonGrid, IonRow } from "@ionic/react";
import AlbumGridItem from "../AlbumGridItem/AlbumGridItem";
import { useLatestAlbums } from "../../hooks/useLatestAlbums";

const LatestAlbums = ({ sidePadded }: Pick<ContentProps, "sidePadded">) => {
  const { albums, errorContent, isLoading } = useLatestAlbums();

  return (
    <Content sidePadded={sidePadded}>
      <TitleRow
        title="Új albumok"
        link={"/albums/"}
        linkText={"Minden album"}
      />
      <PageFetchDisplay
        error={errorContent}
        errorText={errorContent}
        loading={isLoading}
        loaderText="Új megjelenések keresése"
      >
        <IonGrid>
          <IonRow>
            {albums &&
              albums.map((res, id) => (
                <AlbumGridItem
                  key={res.id}
                  id={res.id}
                  name={res.name}
                  image={res.image}
                  creators={res.author?.map((author) => author.name)}
                  type={res.type}
                  active={id === 1}
                />
              ))}
          </IonRow>
        </IonGrid>
      </PageFetchDisplay>
    </Content>
  );
};
export default LatestAlbums;
