import { Meta, StoryFn } from "@storybook/react";
import Form from "../../Form";
import PasswordField from "../PasswordField";

export default {
    title: "UI Components/Inputs/Form Inputs/Password Field",
    component: PasswordField,
    decorators: [(Story) => (
        <Form onSubmit={(e)=>console.log(e)}>
          <Story />
        </Form>
    )],
} as Meta<typeof PasswordField>

const Template: StoryFn<typeof PasswordField> = (args) => <PasswordField {...args}/>

export const Regular = Template.bind({});
Regular.args = {
    id: "password",
    label: "Jelszó",
    config: {required: ""}
}