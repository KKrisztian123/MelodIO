import type { Meta, StoryFn } from "@storybook/react";
import Card from "./Card";
import CardBox from "../CardBox/CardBox";
import AlbumText from "../MusicalText/MusicalText";
import { IconButton } from "../Button/Button";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default {
  title: "UI Components/Card/Card",
  component: Card,
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args) => <Card {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  src: "https://i.scdn.co/image/ab6761610000e5eb284894d68fe2f80cad555110",
};

export const BottomOrnament = Template.bind({});
BottomOrnament.args = {
  src: "https://i.scdn.co/image/ab6761610000e5eb284894d68fe2f80cad555110",
  bottomOrnament: <h3>Shakira</h3>,
};

export const TopOrnament = Template.bind({});
TopOrnament.args = {
  src: "https://i.scdn.co/image/ab6761610000e5eb284894d68fe2f80cad555110",
  topOrnament: (
    <p
      style={{
        textAlign: "right",
        margin: "10px 15px",
        fontWeight: "600",
        color: "#fff",
        fontSize: "14px",
      }}
    >
      16 Album
    </p>
  ),
};

export const BothOrnaments = Template.bind({});
BothOrnaments.args = {
  src: "https://i.scdn.co/image/ab6761610000e5eb284894d68fe2f80cad555110",
  bottomOrnament: <h3>Shakira</h3>,
  topOrnament: (
    <p
      style={{
        textAlign: "right",
        margin: "10px 15px",
        fontWeight: "600",
        color: "#fff",
        fontSize: "14px",
      }}
    >
      16 Album
    </p>
  ),
};

export const BottomAlbumCardBox = Template.bind({});
BottomAlbumCardBox.args = {
  src: "https://i.scdn.co/image/ab6761610000e5eb284894d68fe2f80cad555110",
  bottomOrnament: (
    <CardBox
      content={
        <div style={{ paddingLeft: 21 }}>
          <AlbumText
            albumName="Szörnyeteg"
            albumType="Album"
            albumCreators={["Dzsúdló"]}
          />
        </div>
      }
      isVisible={true}
      rightOrnament={
        <IconButton
          type="primary"
          isRounded
          size="small"
          label="Szörnyeteg album lejátszása"
          icon={faPlay}
        />
      }
    />
  ),
};
