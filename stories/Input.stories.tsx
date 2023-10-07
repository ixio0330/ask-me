import Input, { InputProps } from '@/client/components/Input';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'components/Input',
  component: Input
};
export default meta;

type Story = StoryObj<typeof Input>;

const InputWithHooks = (props: InputProps) => {
  const [value, setValue] = useState('');

  return <Input {...props} value={value} onChange={e => setValue(e.target.value)} />
};

export const Default: Story = {
  render: (props) => <InputWithHooks {...props} />,
  args: {
    placeholder: '무엇이 궁금한가요?',
  }
};
