import type { StoryFn, Meta } from '@storybook/react';
import Button from '../Button';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

export default {
    title: 'UI Components/Buttons/Button',
    component: Button,
} as Meta<typeof Button>

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({});

Primary.args = {
    type: "primary",
    text: "Button",
    size: "medium",
    variant: "box",
    iconPosition:"left",
    isActive: false,
    isRounded:false,
}

export const Secondary = Template.bind({});

Secondary.args = {
    type: "secondary",
    text: "Button",
    size: "medium",
    variant: "box",
    iconPosition:"left",
    isActive: false,
    isRounded:false,}

export const Tertiary = Template.bind({});

Tertiary.args = {
    type: "tertiary",
    text: "Button",
    size: "medium",
    variant: "box",
    iconPosition:"left",
    isActive: false,
    isRounded:false,
}

export const PrimaryWithIcon = Template.bind({});

PrimaryWithIcon.args = {
    type: "primary",
    text: "Button",
    size: "medium",
    variant: "box",
    iconPosition:"left",
    icon: faMusic,
    isActive: false,
    isRounded:false,
}

export const SecondaryWithIcon = Template.bind({});

SecondaryWithIcon.args = {
    type: "secondary",
    text: "Button",
    size: "medium",
    variant: "box",
    iconPosition:"left",
    icon: faMusic,
    isActive: false,
    isRounded:false,
}

export const TertiaryWithIcon = Template.bind({});

TertiaryWithIcon.args = {
    type: "tertiary",
    text: "Button",
    size: "medium",
    variant: "box",
    iconPosition:"left",
    icon: faMusic,
    isActive: false,
    isRounded:false,
}


