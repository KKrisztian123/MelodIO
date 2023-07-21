import NumberField from "../NumberField";
import Form from "../../Form";
import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "UI Components/Inputs/Form Inputs/Number Field",
  component: NumberField,
  decorators: [(Story) => (
    <Form onSubmit={(e)=>console.log(e)}>
      <Story />
    </Form>
  )],
} as Meta<typeof NumberField>

const Template: StoryFn<typeof NumberField> = (args) => (
  <NumberField  {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
  label: "Életkor",
  id: "age",
  config: { required: { value: true, message: "" } },
};
