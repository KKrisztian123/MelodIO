import { IonPage } from "@ionic/react";
import { useEffect, type FC, useMemo } from "react";
import Header from "@components/Layout/AppLayout/Header/Header";
import BackButton from "@components/Layout/BackButton";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import { useHistory, useParams } from "react-router";
import { useAxios } from "@hooks/useFetch";
import PageFetchDisplay from "@components/PageFetchDisplay/PageFetchDisplay";
import useError from "@hooks/useError";
import FileForm from "@components/Form/FileForm/FileForm";
import { useFileForm } from "@hooks/useFileForm";
import FormSelection from "@components/Form/FormSelection/FormSelection";
import { SelectedAuthorsList } from "@features/Admin/components/Selection/SelectedAuthors";
import AuthorsSelector from "@features/Admin/components/Selection/AuthorsSelector";
import AlbumsSelector from "@features/Admin/components/Selection/AlbumsSelector";
import { SelectedAlbumsList } from "@features/Admin/components/Selection/SelectedAlbums";
import useGetFormArtists from "@features/Admin/hooks/useGetFormArtists";
import useGetFormAlbums from "@features/Admin/hooks/useGetFormAlbums";
import { responseHandler } from "@/utils/utils";
import useToggle from "@hooks/useToggle";

const EditSongPage: FC = () => {
  const { songId } = useParams<{ songId: string }>();
  const history = useHistory();
  const { errorContent, showError } = useError();
  const [fetcher, loading] = useAxios("GET", `/songs/${songId}`);
  const {
    fetch: artistFetchList,
    result: artistResult,
    loading: artistListLoading,
  } = useGetFormArtists(showError);
  const {
    fetch: albumFetchList,
    result: albumResult,
    loading: albumListLoading,
  } = useGetFormAlbums(showError);
  const [contentLoading, setContentLoading] = useToggle(true);
  const { setPreview, preview, ...fileFormProps } = useFileForm(
    "POST",
    `/songs/${songId}`,
    {
      onSuccess: () => history.goBack(),
    }
  );

  const authors = useMemo(
    () =>
      artistResult.map((res) => {
        return { id: res.id, values: res };
      }),
    [artistResult]
  );

  const albums = useMemo(
    () =>
      albumResult.map((res) => {
        return { id: res.id, values: res };
      }),
    [albumResult]
  );

  useEffect(() => {
    setContentLoading(true);
    fetcher({})
      .then((res: APIResponse<Song>) =>
        responseHandler(
          res,
          showError,
          (payload) => (
            setPreview({
              file: [`${payload.name}.${payload.fileType}`],
              name: payload.name,
            }),
            artistFetchList(payload.author),
            albumFetchList([payload.album]),
            setContentLoading(false)
          )
        )
      )
      .catch(() => showError(true));
  }, [
    fetcher,
    artistFetchList,
    albumFetchList,
    showError,
    setPreview,
    setContentLoading,
  ]);

  return (
    <IonPage>
      <Header leftOrnament={<BackButton />}>Dal szerkesztése</Header>
      <PageContent>
        <PageFetchDisplay
          error={
            !contentLoading &&
            !loading &&
            !artistListLoading &&
            !albumListLoading &&
            errorContent
          }
          loading={
            loading || artistListLoading || albumListLoading || contentLoading
          }
          errorText={errorContent}
          loaderText={"Dal betöltése"}
        >
          <FileForm
            {...fileFormProps}
            defaultValues={preview}
            preview={preview}
            fileId="file"
            setPreview={setPreview}
            buttonTitle="Módosítás"
            loaderText="Dal módosítása"
            fileFieldName="Hangfájl"
            requiredFile
          >
            <FormSelection
              title="Album"
              selectorContentTitle="Album választása"
              addItemText="Album hozzáadása"
              type="single"
              id="albumId"
              defaultValues={albums}
              selectionContent={<SelectedAlbumsList />}
              selectorContent={<AlbumsSelector />}
            />
            <FormSelection
              title="Előadók"
              selectorContentTitle="Előadó választása"
              addItemText="Előadó hozzáadása"
              type="multiple"
              id="artistIds"
              defaultValues={authors}
              selectionContent={<SelectedAuthorsList />}
              selectorContent={<AuthorsSelector />}
            />
          </FileForm>
        </PageFetchDisplay>
      </PageContent>
    </IonPage>
  );
};
export default EditSongPage;
