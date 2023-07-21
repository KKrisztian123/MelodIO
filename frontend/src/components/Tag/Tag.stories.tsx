import type { Meta, StoryFn } from "@storybook/react";
import Tag, { TagContainer } from "./Tag";

export default {
  title: "UI Components/Tag/Tag",
  component: Tag,
} as Meta<typeof Tag>;

const Template: StoryFn<typeof Tag> = (args) => <Tag {...args} />;

export const SingleTag = Template.bind({});

SingleTag.args = {
  children: "FLAC",
};
SingleTag.decorators = [
  (Story) => (
    <TagContainer>
      <Story />
    </TagContainer>
  ),
];

const Multiple: StoryFn<typeof Tag> = (args) => (
  <TagContainer>
    <Tag>FLAC</Tag>
    <Tag {...args} />
  </TagContainer>
);

export const MultipleTags = Multiple.bind({});

MultipleTags.args = {
  children: "1411kbps",
};
