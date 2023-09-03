import Content, {
  type ContentProps,
} from "@components/Layout/Frame/ContentContainer/Content";
import PageFetchDisplay from "@components/PageFetchDisplay/PageFetchDisplay";
import TitleRow from "@components/TitleRow/TitleRow";
import { IonGrid, IonRow } from "@ionic/react";
import AlbumGridItem from "../AlbumGridItem/AlbumGridItem";
import { useLatestAlbums } from "../../hooks/useLatestAlbums";
import usePlaying from "@features/Player/hooks/usePlaying";
import CenteredTextContainer from "@components/CenteredTextContainer";

const LatestAlbums = ({ sidePadded }: Pick<ContentProps, "sidePadded">) => {
  const { albums, errorContent, isLoading } = useLatestAlbums();
  const { albumId } = usePlaying();

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
        <CenteredTextContainer
          title="Nincsenek új albumok."
          visible={albums.length === 0}
        />
        <IonGrid>
          <IonRow>
            {albums &&
              albums.map((res) => (
                <AlbumGridItem
                  key={res.id}
                  id={res.id}
                  name={res.name}
                  image={res.image}
                  creators={res.author?.map((author: Author) => author.name)}
                  type={res.type}
                  active={res.id === albumId}
                />
              ))}
          </IonRow>
        </IonGrid>
      </PageFetchDisplay>
    </Content>
  );
};
export default LatestAlbums;
