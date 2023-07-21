import Form from "../../Form";
import type { StoryFn, Meta } from "@storybook/react";
import TimeField from "../TimeField";

export default {
  title: "UI Components/Inputs/Form Inputs/Time Field",
  component: TimeField,
  decorators: [(Story) => (
    <Form onSubmit={(e)=>console.log(e)}>
      <Story />
    </Form>
  )],
} as Meta<typeof TimeField>

const Template: StoryFn<typeof TimeField> = (args) => (
  <TimeField  {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
  label: "Idő",
  id: "time",
  config: { required: { value: true, message: "" } },
};
