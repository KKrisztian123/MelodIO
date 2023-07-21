import Form from "../../Form";
import type { StoryFn, Meta } from "@storybook/react";
import EmailField from "../EmailField";

export default {
  title: "UI Components/Inputs/Form Inputs/Email Field",
  component: EmailField,
  decorators: [(Story) => (
    <Form onSubmit={(e)=>console.log(e)}>
      <Story />
    </Form>
  )],
} as Meta<typeof EmailField>

const Template: StoryFn<typeof EmailField> = (args) => (
  <EmailField  {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
  label: "Email",
  id: "email",
  config: { required: { value: true, message: "" } },
};
