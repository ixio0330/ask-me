import Typography from '@/client/components/Typography';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Typography> = {
  title: 'components/Typography',
  component: Typography
};
export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: '안녕하세요!',
  }
};
