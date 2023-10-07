import Bio, { BioProps, BioStatus } from '@/client/components/Card/Bio';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Bio> = {
  title: 'components/Card/Bio',
  component: Bio
};
export default meta;

type Story = StoryObj<typeof Bio>;

export const Default: Story = {
  args: {
    photoURL: 'https://lh3.googleusercontent.com/a/AEdFTp4B9If0zw6ex3tT7TYldHLlMV5Y5QIKnRhcrJiv=s96-c',
    displayName: '서나무',
    bio: '안녕하세요, 서나무입니다'
  }
};

const BioWithHooks = () => {
  const [bio, setBio] = useState('안녕하세요, 서나무입니다');
  const [newBio, setNewBio] = useState(bio);
  const [status, setStatus] = useState<BioStatus>('owner');
  const onClickUpdateBio = () => setStatus('update');
  const onClickCancel = () => {
    setStatus('owner');
    setNewBio(bio);
  };
  const onClickSaveBio = () => {
    setBio(newBio);
    setStatus('owner');
  };

  return (
    <Bio 
      photoURL='https://lh3.googleusercontent.com/a/AEdFTp4B9If0zw6ex3tT7TYldHLlMV5Y5QIKnRhcrJiv=s96-c'
      displayName='서나무'
      status={status} 
      bio={bio} 
      onClickUpdateBio={onClickUpdateBio}
      onClickCancel={onClickCancel}
      onClickSaveBio={onClickSaveBio}
      value={newBio}
      onChange={e => setNewBio(e.target.value)}
    />
  )
};

export const Owner: Story = {
  render: (props) => <BioWithHooks {...props} />,
};
