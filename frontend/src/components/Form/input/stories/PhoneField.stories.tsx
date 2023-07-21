import Form from "../../Form";
import type { StoryFn, Meta } from "@storybook/react";
import PhoneField from "../PhoneField";

export default {
  title: "UI Components/Inputs/Form Inputs/Phone Field",
  component: PhoneField,
  decorators: [(Story) => (
    <Form onSubmit={(e)=>console.log(e)}>
      <Story />
    </Form>
  )],
} as Meta<typeof PhoneField>


const Template: StoryFn<typeof PhoneField> = (args) => (
  <PhoneField  {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
  label: "Telefonszám",
  id: "phonenumber",
  config: { required: { value: true, message: "" } },
};
