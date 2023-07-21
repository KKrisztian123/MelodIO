import type { StoryFn, Meta } from "@storybook/react";
import ListItem from "../ListItem";
import NumberBox from "../../NumberBox/NumberBox";
import { IconButton } from "../../Button/Button";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export default {
  title: "UI Components/List/List Item",
  component: ListItem,
} as Meta<typeof ListItem>;

const Template: StoryFn<typeof ListItem> = (args) => <ListItem {...args} />;

export const LeftOrnament = Template.bind({});
LeftOrnament.args = {
  title: "Rosszlány",
  description: "Dzsúdló",
  leftOrnament: <NumberBox>1</NumberBox>,
  link: "/a",
};

export const BothOrnaments = Template.bind({});
BothOrnaments.args = {
  title: "Rosszlány",
  description: "Dzsúdló",
  leftOrnament: <NumberBox>1</NumberBox>,
  rightOrnament: (
    <IconButton
      type="tertiary"
      size="extraLarge"
      label="Hozzáadás a kedvelt dalokhoz."
      icon={faHeart}
    />
  ),
  link: "/a",
};
