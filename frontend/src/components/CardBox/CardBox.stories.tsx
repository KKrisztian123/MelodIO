import type { Meta, StoryFn } from "@storybook/react";
import CardBox from "./CardBox";
import AlbumText from "../MusicalText/MusicalText";
import { IconButton } from "../Button/Button";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default {
    title:"UI Components/Card/CardBox",
    component: CardBox,    
} as Meta<typeof CardBox>

const Template: StoryFn<typeof CardBox> = (args) => <CardBox {...args} />

export const NoOrnament = Template.bind({});
NoOrnament.args = {
    isVisible: true,
    content: <div style={{paddingLeft: 21}}><AlbumText name="Szörnyeteg" type="Album" creators={["Dzsúdló"]}/></div>,
}
export const WithOrnament = Template.bind({});
WithOrnament.args = {
    isVisible: true,
    content: <div style={{paddingLeft: 21}}><AlbumText name="Szörnyeteg" type="Album" creators={["Dzsúdló"]}/></div>,
    rightOrnament: <IconButton type="primary" isRounded size="small" label="Szörnyeteg album lejátszása" icon={faPlay} />
}
