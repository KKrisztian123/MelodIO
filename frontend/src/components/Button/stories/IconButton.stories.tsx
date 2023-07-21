import type { StoryFn, Meta } from '@storybook/react';
import { IconButton } from '../Button';
import '../../../theme/variables.css';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

export default {
    title: 'UI Components/Buttons/IconButton',
    component: IconButton,
    
} as Meta<typeof IconButton>

const Template: StoryFn<typeof IconButton> = (args) => <IconButton {...args} />

export const Primary = Template.bind({});

Primary.args = {
    type: "primary",
    size: "medium",
    icon: faMusic,
    isActive: false,
    isRounded:false,
}

export const Secondary = Template.bind({});

Secondary.args = {
    type: "secondary",
    size: "medium",
    icon: faMusic,
    isActive: false,
    isRounded:false,
}

export const Tertiary = Template.bind({});

Tertiary.args = {
    type: "tertiary",
    size: "medium",
    icon: faMusic,
    isActive: false,
    isRounded:false,
}