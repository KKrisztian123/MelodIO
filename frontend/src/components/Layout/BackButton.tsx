import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { IconButton, IconButtonProps } from "../Button/Button";
import { useHistory } from "react-router";

/** A back button for navigation. */
const BackButton = ({
  size = "extraLarge",
  type = "tertiary",
  ...rest
}: Partial<
  Omit<IconButtonProps, "label" | "icon" | "onClick" | "link" | "buttonType">
>) => {
  const history = useHistory();
  return (
    <IconButton
      {...rest}
      size={size}
      type={type}
      label="Vissza"
      onClick={() => history.goBack()}
      icon={faChevronLeft}
    />
  );
};

export default BackButton;
