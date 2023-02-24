import { Button, Flex, FormLabel, Spacer, Switch, Textarea, useToast } from "@chakra-ui/react";
import color from "../color";
import ResizeTextarea from 'react-textarea-autosize';
import { ChangeEvent, useState } from "react";
import AskApi from "../api/ask";
import { InAuthUser } from "@/common/models/in_auth_user";

interface Props {
  userInfo: InAuthUser | null;
  authUser: InAuthUser | null;
  onSendComplete: () => void;
}

const AskForm = ({ userInfo, authUser, onSendComplete }: Props) => {
  const [ask, setAsk] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const toast = useToast();

  const onChangeAsk = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value) {
      const lineCount = e.currentTarget.value.match(/[^\n]*\n[^\n]*/gi)?.length || 1;
      if (7 < lineCount) {
        toast({
          title: '최대 7줄까지만 입력가능합니다.',
          position: 'top-right',
        });
        return;
      }
    }
    setAsk(e.currentTarget.value);
  };

  const onClickPostAsk = async () => {
    const postResult = await AskApi.post({ 
      uid: userInfo?.uid as string, 
      ask, 
      author: isAnonymous ? null : {
        displayName: authUser?.displayName ?? '',
        photoURL: authUser?.photoURL ?? '',
      },
    });
    if (!postResult?.result) {
      toast({
        title: postResult?.message,
        position: 'top-right',
      });
      return;
    }
    setAsk('');
    onSendComplete();
  };
  
  return (
    <>
      <Textarea
        value={ask}
        onChange={onChangeAsk}
        my='3'
        placeholder='무엇이 궁금한가요?'
        bg={color.tertiary}
        focusBorderColor={color.primary}
        maxLength={2000}
        minH='unset'
        resize='none'
        overflow='hidden'
        as={ResizeTextarea}
        minRows={1}
        maxRows={7}
      />
      <Flex justifyContent='space-between' alignItems='center'>
        {
          authUser ? 
          <Flex mt='2'>
            <Switch 
              size='md' 
              colorScheme='purple' 
              id='anonymous' 
              mr='2'
              isChecked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
            />
            <FormLabel htmlFor='anonymous' fontSize='sm'>
              익명으로 질문하기
            </FormLabel>
          </Flex> : 
          <Spacer />
        }
        <Button
          bg={color.primary} 
          color={color.white}
          colorScheme='none'
          isDisabled={ask.length < 1}
          onClick={onClickPostAsk}
        >
          등록
        </Button>
      </Flex>
    </>
  )
};

export default AskForm;