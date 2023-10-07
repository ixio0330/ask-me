import Bio from '@/client/components/Card/Bio';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Bio> = {
  title: 'components/Card/Bio',
  component: Bio
};
export default meta;

type Story = StoryObj<typeof Bio>;

export const Default: Story = {
  args: {
    children: '버튼',
  }
};

export const Outlined: Story = {
  args: {
    children: '버튼',
    variant: 'outlined'
  }
};
