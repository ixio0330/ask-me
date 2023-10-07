import Switch, { SwitchProps } from '@/client/components/Switch';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Switch> = {
  title: 'components/Switch',
  component: Switch,
};
export default meta;

type Story = StoryObj<typeof Switch>;

const SwitchWithHooks = (props: SwitchProps) => {
  const [active, setActive] = useState(false);

  return (
    <Switch 
      {...props} 
      active={active}
      onClick={() => setActive(!active)} 
    />
  );
};

export const Default: Story = {
  render: (props) => <SwitchWithHooks {...props} />,
  args: {
    label: '라벨'
  },
};
