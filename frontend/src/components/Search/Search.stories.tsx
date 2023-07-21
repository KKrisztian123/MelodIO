import type { StoryFn, Meta } from "@storybook/react";
import Search from "./Search";
export default {
  title: "UI Components/Search/Search",
  component: Search,
} as Meta<typeof Search>;

const Template: StoryFn<typeof Search> = (args) => <Search {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  placeholder: "Előadók, albumok és dalok",
  onChange: console.log
};