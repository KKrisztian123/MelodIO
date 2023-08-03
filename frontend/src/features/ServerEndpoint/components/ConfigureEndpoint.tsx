import { type FC } from "react";
import Form from "@components/Form/Form";
import { FormBlock, FormFlex } from "@components/Form/FormBlocks";
import TextField from "@components/Form/input/TextField";
import ButtonContainer from "@components/ButtonContainer/ButtonContainer";
import Button from "@components/Button/Button";
import { useConfigureBaseURL, useGetEndpoint } from "../hooks/baseUrl";
import useToggle from "@hooks/useToggle";
import Modal from "@components/Modal/Modal";
import { Loader } from "@components/Loaders/Loaders";
import { AnimatePresence, motion } from "framer-motion";
import InvalidServer from "@assets/serverFail.svg";
import ValidServer from "@assets/serverSuccess.svg";
import Text from "@components/Text/Text";

const horizontalSlide = {
  initial: {
    x: 20,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: -20,
    opacity: 0,
  },
};

export type ConfigureEndpointProps = {
  /** Callback for successful endpoint configuration. */
  onFinish?: () => void;
};

const ConfigureEndpoint: FC<ConfigureEndpointProps> = ({ onFinish }) => {
  const [isLoading, endpoint] = useGetEndpoint();
  const [isOpen, changeOpen] = useToggle();
  const [config, isTesting, isValid] = useConfigureBaseURL();

  return (
    <>
      <div>
        <Form
          onSubmit={(e) => {
            config(e.baseUrl);
            changeOpen(true);
          }}
        >
          <FormFlex>
            <FormBlock>
              {!isLoading && (
                <TextField
                  id="baseUrl"
                  label="Végpont"
                  config={{
                    required: { value: true, message: "" },
                    value: endpoint,
                  }}
                />
              )}
            </FormBlock>
          </FormFlex>
          <ButtonContainer center>
            <Button
              text="Végpont Beállítása"
              buttonType="submit"
              size="extraLarge"
            />
          </ButtonContainer>
        </Form>
      </div>
      <Modal
        title="Végpont ellenőrzése"
        isOpen={isOpen}
        changeOpen={changeOpen}
      >
        <div
          style={{ minHeight: 100, display: "grid", placeContent: "center" }}
        >
          <AnimatePresence mode="popLayout">
            {isTesting ? (
              <motion.div {...horizontalSlide} key={"loader"}>
                <Loader text="Ellenőrzés" />
              </motion.div>
            ) : !isValid ? (
              <motion.div {...horizontalSlide} key={"serverError"}>
                <img
                  src={InvalidServer}
                  style={{ width: "70%", margin: "0 auto", display: "block" }}
                />
                <Text centered>
                  <b>Érvénytelen cím</b>
                </Text>
                <ButtonContainer center>
                  <Button text="Újra próbálom" onClick={() => changeOpen()} />
                </ButtonContainer>
              </motion.div>
            ) : (
              <motion.div {...horizontalSlide} key={"serverSuccess"}>
                <img
                  src={ValidServer}
                  style={{ width: "70%", margin: "0 auto", display: "block" }}
                />
                <Text centered>
                  {" "}
                  <b>Sikeres csatlakozás</b>
                </Text>
                <ButtonContainer center>
                  <Button
                    text="Rendben"
                    onClick={() => {
                      changeOpen();
                      typeof onFinish === "function" && onFinish();
                    }}
                  />
                </ButtonContainer>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Modal>
    </>
  );
};

export default ConfigureEndpoint;
