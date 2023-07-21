import type { Meta, StoryFn } from "@storybook/react";
import SelectionContainer from "../SelectionContainer";
import SelectionItem from "../SelectionItem";
import { faGlobe, faHeadphones, faPhone, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";

export default {
  title: "UI Components/Selection/Selection Container",
  component: SelectionContainer,
} as Meta<typeof SelectionContainer>;

const ClickTemplate: StoryFn<typeof SelectionContainer> = (args) => (
  <SelectionContainer {...args}>
    <SelectionItem title="Feltöltés" icon={faUpload} />
    <SelectionItem title="Törlés" icon={faTrash} />
  </SelectionContainer>
);

export const LinkSelection = ClickTemplate.bind({});

const ToggleTemplate: StoryFn<typeof SelectionContainer> = (args) => (
  <SelectionContainer {...args}>
    <SelectionItem title="Böngésző" icon={faGlobe} />
    <SelectionItem title="XQ-BC52" icon={faPhone} />
    <SelectionItem title="Echo dot" icon={faHeadphones} isActive/>
  </SelectionContainer>
);

export const ToggleSelection = ToggleTemplate.bind({});
