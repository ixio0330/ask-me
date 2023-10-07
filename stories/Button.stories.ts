import Button from '@/client/components/Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button
};
export default meta;

type Story = StoryObj<typeof Button>;

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
