import type { Meta, StoryFn } from "@storybook/react";
import ListContainer from "../ListContainer";
import ListItem from "../ListItem";
import NumberBox from "../../NumberBox/NumberBox";
import { IconButton } from "../../Button/Button";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { SmallLoader } from "../../Loaders/Loaders";
import { XSImage } from "../../Image/Image";

export default {
  title: "UI Components/List/List Container",
  component: ListContainer,
} as Meta<typeof ListContainer>;

const Template: StoryFn<typeof ListContainer> = (args) => (
  <ListContainer {...args}>
    <ListItem
      leftOrnament={<NumberBox>1</NumberBox>}
      rightOrnament={
        <IconButton
          size="extraLarge"
          type="tertiary"
          label="Hozzáadás a kedvelt dalokhoz."
          icon={faHeart}
        />
      }
      title="Rosszlány"
      description="Dzsúdló"
      link="/a"
    />
    <ListItem
      leftOrnament={<NumberBox>2</NumberBox>}
      rightOrnament={
        <IconButton
          size="extraLarge"
          type="tertiary"
          label="Hozzáadás a kedvelt dalokhoz."
          icon={faHeart}
        />
      }
      title="Függő"
      description="Dzsúdló"
      link="/a"
    />
    <ListItem
      leftOrnament={<NumberBox>3</NumberBox>}
      rightOrnament={
        <IconButton
          size="extraLarge"
          type="tertiary"
          label="Hozzáadás a kedvelt dalokhoz."
          icon={faHeart}
        />
      }
      title="Várnék"
      description="Dzsúdló, Azahriah"
      link="/a"
    />
    <ListItem
      leftOrnament={<NumberBox>4</NumberBox>}
      rightOrnament={
        <IconButton
          size="extraLarge"
          type="tertiary"
          label="Hozzáadás a kedvelt dalokhoz."
          icon={faHeart}
        />
      }
      title="Ha meghalok"
      description="Dzsúdló"
      link="/a"
    />
  </ListContainer>
);

const ListTypesTemplate: StoryFn<typeof ListContainer> = (args) => (
  <ListContainer {...args}>
    <ListItem
      leftOrnament={<XSImage src="https://i.scdn.co/image/ab67616d00001e02bc3f33247a4190be63e40fb2" />}
      rightOrnament={
        <IconButton
          size="extraLarge"
          type="tertiary"
          label="Hozzáadás a kedvelt dalokhoz."
          icon={faHeart}
        />
      }
      title="Függő"
      description="Dzsúdló"
      link="/a"
    />
    <ListItem
      leftOrnament={<SmallLoader />}
      rightOrnament={
        <IconButton
          size="extraLarge"
          type="tertiary"
          label="Hozzáadás a kedvelt dalokhoz."
          icon={faHeart}
        />
      }
      title="Rosszlány"
      description="Dzsúdló"
      link="/a"
    />
    <ListItem
      leftOrnament={<NumberBox>3</NumberBox>}
      rightOrnament={
        <IconButton
          size="extraLarge"
          type="tertiary"
          label="Hozzáadás a kedvelt dalokhoz."
          icon={faHeart}
        />
      }
      title="Várnék"
      description="Dzsúdló, Azahriah"
      link="/a"
    />
  </ListContainer>
);

export const NumberList = Template.bind({});

export const ListCombinations = ListTypesTemplate.bind({});
