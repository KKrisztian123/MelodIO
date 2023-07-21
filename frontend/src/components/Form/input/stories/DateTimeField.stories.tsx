import Form from "../../Form";
import type { StoryFn, Meta } from "@storybook/react";
import DateTimeField from "../DateTimeField";

export default {
  title: "UI Components/Inputs/Form Inputs/Datetime Field",
  component: DateTimeField,
  decorators: [(Story) => (
    <Form onSubmit={(e)=>console.log(e)}>
      <Story />
    </Form>
  )],
} as Meta<typeof DateTimeField>

const Template: StoryFn<typeof DateTimeField> = (args) => (
  <DateTimeField  {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
  label: "Dátum és idő",
  id: "datetime",
  config: { required: { value: true, message: "" } },
};
