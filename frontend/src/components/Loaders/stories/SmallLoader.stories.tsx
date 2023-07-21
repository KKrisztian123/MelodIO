import type { Meta, StoryFn } from "@storybook/react";
import { SmallLoader } from "../Loaders";

export default {
    title: "UI Components/Loaders/Small Loader",
    component: SmallLoader,
} as Meta<typeof SmallLoader>

const Template: StoryFn<typeof SmallLoader> = (args) => <SmallLoader {...args}/>

export const SmallLoaderWithoutBackground = Template.bind({});

SmallLoaderWithoutBackground.args = {
    withBackground: false,
}

export const SmallLoaderWithBackground = Template.bind({});
SmallLoaderWithBackground.args = {
    withBackground: true,
}

