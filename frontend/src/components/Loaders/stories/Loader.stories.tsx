import type { Meta, StoryFn } from "@storybook/react";
import {Loader} from "../Loaders";

export default {
    title: "UI Components/Loaders/Loader",
    component: Loader,
} as Meta<typeof Loader>

const Template: StoryFn<typeof Loader> = (args) => <Loader {...args}/>

export const LoaderWithoutBackground = Template.bind({});

LoaderWithoutBackground.args = {
    withBackground: false,
    text: "Harmonizálás",
}

export const LoaderWithBackground = Template.bind({});
LoaderWithBackground.args = {
    withBackground: true,
    text: "Harmonizálás",
}

