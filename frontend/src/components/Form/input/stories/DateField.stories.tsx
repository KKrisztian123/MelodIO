import Form from "../../Form";
import type { StoryFn, Meta } from "@storybook/react";
import DateField from "../DateField";

export default {
  title: "UI Components/Inputs/Form Inputs/Date Field",
  component: DateField,
  decorators: [(Story) => (
    <Form onSubmit={(e)=>console.log(e)}>
      <Story />
    </Form>
  )],
} as Meta<typeof DateField>

const Template: StoryFn<typeof DateField> = (args) => (
  <DateField  {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
  label: "Dátum",
  id: "date",
  config: { required: { value: true, message: "" } },
};
