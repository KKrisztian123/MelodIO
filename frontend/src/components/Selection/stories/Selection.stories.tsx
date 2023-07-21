import type { StoryFn, Meta } from "@storybook/react";
import SelectionItem from "../SelectionItem";
import { faGlobe, faUpload } from "@fortawesome/free-solid-svg-icons";

export default {
    title: "UI Components/Selection/Selection Item",
    component: SelectionItem,
} as Meta<typeof SelectionItem>

const Template: StoryFn<typeof SelectionItem> = (args) => <SelectionItem {...args}/>
export const Regular = Template.bind({});

Regular.args = {
    title: "Feltöltés",
    icon: faUpload,
}

export const Active = Template.bind({});
Active.args = {
    title: "Böngésző",
    icon: faGlobe,
    isActive: true,
}