import Answer from '@/client/components/Card/Answer';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Answer> = {
  title: 'components/Card/Answer',
  component: Answer
};
export default meta;

type Story = StoryObj<typeof Answer>;

export const Default: Story = {
  args: {
    ask: '질문입니다',
    replyedAt: '2023-10-06T12:37:33.823Z',
    reply: '모든 국민은 법률이 정하는 바에 의하여 납세의 의무를 진다. 국가는 평생교육을 진흥하여야 한다. 군인은 현역을 면한 후가 아니면 국무총리로 임명될 수 없다.',
  }
};

export const Pending: Story = {
  args: {
    ask: '법률은 특별한 규정이 없는 한 공포한 날로부터 20일을 경과함으로써 효력을 발생한다',
  }
};

export const Deny: Story = {
  args: {
    ask: '법률은 특별한 규정이 없는 한 공포한 날로부터 20일을 경과함으로써 효력을 발생한다',
    deny: true,
    reply: '비공개 처리 된 질문입니다',
  }
};
