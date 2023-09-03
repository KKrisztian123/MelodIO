import { FormBlock, FormFlex } from "@components/Form/FormBlocks";
import EmailField from "@components/Form/input/EmailField";
import PasswordField from "@components/Form/input/PasswordField";
import Content from "@components/Layout/Frame/ContentContainer/Content";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import { H1 } from "@components/Titles/Titles";
import { IonPage } from "@ionic/react";
import { type FC } from "react";
import Form from "@components/Form/Form";
import ButtonContainer from "@components/ButtonContainer/ButtonContainer";
import Button from "@components/Button/Button";
import { useLogin, useSessionValidation } from "@features/Auth/Index";
import { FullScreenLoader } from "@components/Loaders/Loaders";
import { ErrorText } from "@components/Text/ErrorText";
import { Redirect } from "react-router";
import Logo from "@components/Logo/Logo";
import { Login } from "@features/Auth/types";
/** Page for configuring app endpoint on first startup. */
const LoginPage: FC = () => {
  const { login, loading, errorContent, errorRef } = useLogin();
  const isValidSession = useSessionValidation();

  return isValidSession ? (
    <Redirect to="/explore" />
  ) : (
    <IonPage>
      <PageContent hasExternalHeader>
        <Content>
          <Logo />
        </Content>
        <H1 style={{ fontSize: "1.5rem" }} centered>
          Bejelentkezés
        </H1>
        <Content>
          <Form onSubmit={(e) => login(e as Login)}>
            <FormFlex>
              <FormBlock>
                <EmailField
                  id="email"
                  label="E-mail cím"
                  config={{
                    required: { value: true, message: "" },
                  }}
                />
              </FormBlock>
              <FormBlock>
                <PasswordField
                  id="password"
                  label="Jelszó"
                  config={{
                    required: { value: true, message: "" },
                  }}
                />
              </FormBlock>
            </FormFlex>
            <ButtonContainer center>
              <Button
                text="Bejelentkezés"
                size="extraLarge"
                buttonType="submit"
              />
            </ButtonContainer>
            <ErrorText ref={errorRef}>{errorContent}</ErrorText>
            <FullScreenLoader
              text="Bejelentkezés"
              loading={loading}
              withBackground
            />
          </Form>
        </Content>
      </PageContent>
    </IonPage>
  );
};

export default LoginPage;
