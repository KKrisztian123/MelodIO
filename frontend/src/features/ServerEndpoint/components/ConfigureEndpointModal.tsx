import FullScreenModal from "@components/Modal/FullScreenModal";
import useToggle from "@hooks/useToggle";
import { useGetEndpoint } from "../hooks/baseUrl";
import { useEffect } from "react";
import ConfigureEndpoint from "./ConfigureEndpoint";

export const EndpointManager = () => {
  const [toggle, setToggle] = useToggle();
  const [loadState, endpoint] = useGetEndpoint();

  useEffect(() => {
    !loadState && endpoint === "" && setToggle(true);
  }, [loadState, endpoint, setToggle]);

  return (
    !loadState && (
      <FullScreenModal
        title="Végpont beállítása"
        isOpen={toggle}
        changeOpen={setToggle}
      >
        <ConfigureEndpoint onFinish={setToggle} />
      </FullScreenModal>
    )
  );
};
