import { IonPage } from "@ionic/react";
import { useEffect, type FC } from "react";
import Header from "@components/Layout/AppLayout/Header/Header";
import BackButton from "@components/Layout/BackButton";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import { useHistory, useParams } from "react-router";
import { useAxios } from "@hooks/useFetch";
import PageFetchDisplay from "@components/PageFetchDisplay/PageFetchDisplay";
import useError from "@hooks/useError";
import { useImageForm } from "@hooks/useImageForm";
import ImageForm from "@components/Form/ImageForm/ImageForm";
import { responseHandler } from "@/utils/utils";
const EditArtistPage: FC = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const history = useHistory();
  const { errorContent, showError } = useError();
  const [fetcher, loading] = useAxios("GET", `/artists/${artistId}`);

  const { setPreview, preview, ...imageFormProps } = useImageForm(
    "POST",
    `/artists/${artistId}`,
    {
      onSuccess: () => history.goBack(),
    }
  );

  useEffect(() => {
    fetcher({})
      .then((res: APIResponse<Author>) =>
        responseHandler(res, showError, (payload) =>
          setPreview({
            image: [payload.image],
            name: payload.name,
          })
        )
      )
      .catch(() => showError(true));
  }, [fetcher, showError, setPreview]);

  return (
    <IonPage>
      <Header leftOrnament={<BackButton />}>Előadó szerkesztése</Header>
      <PageContent>
        <PageFetchDisplay
          error={!loading && errorContent}
          loading={loading}
          errorText={errorContent}
          loaderText={"Előadó betöltése"}
        >
          <ImageForm
            {...imageFormProps}
            setPreview={setPreview}
            preview={preview}
            defaultValues={preview}
            modalTitle="Előadó"
            buttonTitle="Módosítás"
            loaderText="Előadó módosítása"
            requiredImage
          />
        </PageFetchDisplay>
      </PageContent>
    </IonPage>
  );
};
export default EditArtistPage;
