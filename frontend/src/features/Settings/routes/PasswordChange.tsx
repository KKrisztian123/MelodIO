import Form from "@components/Form/Form";
import Header from "@components/Layout/AppLayout/Header/Header";
import BackButton from "@components/Layout/BackButton";
import Content from "@components/Layout/Frame/ContentContainer/Content";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import { IonPage } from "@ionic/react";
import { useState, type FC } from "react";
import { usePasswordChange } from "../hooks/passwordChange";
import { FormBlock, FormFlex } from "@components/Form/FormBlocks";
import PasswordField from "@components/Form/input/PasswordField";
import ButtonContainer from "@components/ButtonContainer/ButtonContainer";
import Button from "@components/Button/Button";
import { ErrorText } from "@components/Text/ErrorText";
import { FullScreenLoader } from "@components/Loaders/Loaders";
import { useHistory } from "react-router";
import { isMatching } from "@/utils/utils";
import { PasswordChange } from "../types/Index";

const PasswordChangePage: FC = () => {
  const { changePassword, loading, errorRef, errorContent } =
    usePasswordChange();
  const [values, setValues] = useState({} as PasswordChange);
  const history = useHistory();
  return (
    <IonPage>
      <Header transparent leftOrnament={<BackButton />}>
        Jelszóváltás
      </Header>
      <PageContent>
        <Content>
          <Form
            onSubmit={(v) =>
              changePassword(v as PasswordChange).then(
                (status) => status && history.goBack()
              )
            }
            onChange={setValues}
          >
            <FormFlex>
              <FormBlock>
                <PasswordField
                  id="password"
                  label="Régi jelszó"
                  config={{
                    required: { value: true, message: "" },
                  }}
                />
              </FormBlock>
            </FormFlex>
            <FormFlex>
              <FormBlock>
                <PasswordField
                  id="newPassword"
                  label="Új jelszó"
                  config={{
                    required: { value: true, message: "" },
                    minLength: {
                      value: 8,
                      message:
                        "A jelszónak legalább 8 karakter hosszúnak kell lennie.",
                    },
                  }}
                />
              </FormBlock>
            </FormFlex>
            <FormFlex>
              <FormBlock>
                <PasswordField
                  id="newPasswordRepeat"
                  label="Új jelszó ismét"
                  config={{
                    required: { value: true, message: "" },
                    minLength: {
                      value: 8,
                      message:
                        "A jelszónak legalább 8 karakter hosszúnak kell lennie.",
                    },
                    validate: {
                      matches: (v) =>
                        isMatching(values.newPassword, v) ||
                        "Az új jelszavak nem egyeznek.",
                    },
                  }}
                />
              </FormBlock>
            </FormFlex>
            <ButtonContainer center>
              <Button
                text="Jelszó megváltoztatása"
                size="extraLarge"
                buttonType="submit"
              />
            </ButtonContainer>
            <ErrorText ref={errorRef}>{errorContent}</ErrorText>
            <FullScreenLoader
              text="Jelszóváltás"
              loading={loading}
              withBackground
            />
          </Form>
        </Content>
      </PageContent>
    </IonPage>
  );
};
export default PasswordChangePage;
