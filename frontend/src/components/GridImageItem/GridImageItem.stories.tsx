import type { StoryFn, Meta } from '@storybook/react';
import GridImageItem from './GridImageItem';

export default {
    title: 'UI Components/Album Display/Album Display',
    component: GridImageItem,
} as Meta<typeof GridImageItem>

const Template: StoryFn<typeof GridImageItem> = (args) => <GridImageItem {...args} />

export const Regular = Template.bind({});

Regular.args = {
    albumId:"asdasdasd",
    albumCreators:["Dzsúdló", "Beck Zoli"],
    albumName:"Szörnyeteg",
    imageUrl:"https://i.scdn.co/image/ab67616d0000b273773bdf93fd396de23d71f63b",
}

export const WithAlbumType = Template.bind({});

WithAlbumType.args = {
    albumId:"asdasdasd",
    albumCreators:["Dzsúdló", "Beck Zoli"],
    albumName:"Szörnyeteg",
    albumType:"Album",
    imageUrl:"https://i.scdn.co/image/ab67616d0000b273773bdf93fd396de23d71f63b",
}