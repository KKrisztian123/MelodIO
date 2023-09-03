import { IonPage } from "@ionic/react";
import { useEffect, type FC, useMemo } from "react";
import Header from "@components/Layout/AppLayout/Header/Header";
import BackButton from "@components/Layout/BackButton";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import { useHistory, useParams } from "react-router";
import { useAxios } from "@hooks/useFetch";
import PageFetchDisplay from "@components/PageFetchDisplay/PageFetchDisplay";
import useError from "@hooks/useError";
import { FormBlock, FormFlex } from "@components/Form/FormBlocks";
import { FormSwitch } from "@components/Form/input/switch/Switch";
import { useImageForm } from "@hooks/useImageForm";
import ImageForm from "@components/Form/ImageForm/ImageForm";
import useGetFormArtists from "@features/Admin/hooks/useGetFormArtists";
import { SelectedAuthorsList } from "@features/Admin/components/Selection/SelectedAuthors";
import FormSelection from "@components/Form/FormSelection/FormSelection";
import AuthorsSelector from "@features/Admin/components/Selection/AuthorsSelector";
import { responseHandler } from "@/utils/utils";
import useToggle from "@hooks/useToggle";
import DateField from "@components/Form/input/DateField";
import format from "date-fns/format";
import { parseISO } from "date-fns";

const EditAlbumPage: FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const history = useHistory();
  const { errorContent, showError } = useError();
  const [fetcher, loading] = useAxios("GET", `/albums/${albumId}`);
  const [contentLoading, setContentLoading] = useToggle(true);
  const {
    fetch: fetchList,
    result,
    loading: listLoading,
  } = useGetFormArtists(showError);
  const { setPreview, preview, ...imageFormProps } = useImageForm(
    "POST",
    `/albums/${albumId}`,
    {
      onSuccess: () => history.goBack(),
    }
  );

  const authors = useMemo(
    () =>
      result.map((res) => {
        return { id: res.id, values: res };
      }),
    [result]
  );

  useEffect(() => {
    setContentLoading(true);
    fetcher({})
      .then((res: APIResponse<Album>) =>
        responseHandler(
          res,
          showError,
          (payload) => (
            setPreview({
              image: [payload.image],
              name: payload.name,
              kislemez: payload.type === "Kislemez",
              releaseDate: format(parseISO(payload.releaseDate),"yyyy.MM.d"),
            }),
            fetchList(payload.author),
            setContentLoading(false)
          )
        )
      )
      .catch(() => showError(true));
  }, [fetcher, showError, setPreview, fetchList, setContentLoading]);

  return (
    <IonPage>
      <Header leftOrnament={<BackButton />}>Album szerkesztése</Header>
      <PageContent>
        <PageFetchDisplay
          error={!contentLoading && !loading && !listLoading && errorContent}
          loading={loading || listLoading || contentLoading}
          errorText={errorContent}
          loaderText={"Album betöltése"}
        >
          <ImageForm
            {...imageFormProps}
            setPreview={setPreview}
            preview={preview}
            defaultValues={preview}
            buttonTitle="Módosítás"
            modalTitle="Borítókép"
            loaderText="Album módosítása"
            requiredImage
          >
            <FormFlex>
              <FormBlock>
                <DateField
                  id="releaseDate"
                  label="Kiadási dátum"
                  config={{ required: { value: false, message: "" } }}
                />
              </FormBlock>
            </FormFlex>
            <FormSelection
              title="Előadók"
              selectorContentTitle="Előadó választása"
              addItemText="Előadó hozzáadása"
              type="multiple"
              defaultValues={authors}
              selectionContent={<SelectedAuthorsList />}
              selectorContent={<AuthorsSelector />}
            />

            <FormFlex>
              <FormBlock>
                <FormSwitch
                  id="kislemez"
                  label="Kislemez típusú album"
                  config={{ required: { value: false, message: "" } }}
                />
              </FormBlock>
            </FormFlex>
          </ImageForm>
        </PageFetchDisplay>
      </PageContent>
    </IonPage>
  );
};
export default EditAlbumPage;
