import TextField from "../TextField";
import Form from "../../Form";
import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "UI Components/Inputs/Form Inputs/Text Field",
  component: TextField,
  decorators: [(Story) => (
    <Form onSubmit={(e)=>console.log(e)}>
      <Story />
    </Form>
  )],
} as Meta<typeof TextField>

const Template: StoryFn<typeof TextField> = (args) => (
  <TextField  {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
  label: "Név",
  id: "name",
  config: { required: { value: true, message: "" } },
};
export const WithHelperText = Template.bind({});

WithHelperText.args = {
  label: "Név",
  id: "name",
  description:"Teljes név szükséges.",
  config: { required: { value: true, message: "" } },
};