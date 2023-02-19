import { InAskClient } from "@/common/models/ask";
import { Avatar, Box, Button, Divider, Flex, FormLabel, Heading, Spacer, Switch, Text, Textarea, useToast } from "@chakra-ui/react";
import color from "../color";
import convertDateToString from "@/common/utils/convert_date";
import ResizeTextarea from 'react-textarea-autosize';
import { ChangeEvent, useState } from "react";

interface Props {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  isOwner : boolean;
  item: InAskClient;
}

const AskItem = ({ item, photoURL, displayName, isOwner }: Props) => {
  const [reply, setReply] = useState('');
  const toast = useToast();
  const onChangeReply = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
    setReply(e.currentTarget.value);
  };

  const onClickPostReply = async () => {};
  return (
    <Box
      width='full'
      mx='auto'
      mt='1'
      bg={color.white}
      borderRadius='lg'
      padding='20px'
      pos='relative'
    >
      <Flex>
        <Flex alignItems='center' mb='2'>
          <Avatar 
            size='sm' 
            src={item.author ? item.author.photoURL : ''} 
            background={color.primary}
            mr='2'
          />
          <Box>
            <Text fontWeight='bold'>{item.author?.displayName || '익명'}</Text>
            <Text fontSize='sm' color={color.gray}>{convertDateToString(item.createdAt)}</Text>
          </Box>
        </Flex>
        <Spacer />
        {
          isOwner && 
          <>
            <FormLabel htmlFor='anonymous' fontSize='sm'>
              공개
            </FormLabel>
            <Switch 
              size='md' 
              colorScheme='purple' 
              id='anonymous' 
              mr='2'
              isChecked={item.status === 'public'}
            />
          </>
        }
      </Flex>
      <Text>{item.ask}</Text>
      {
        item.reply ? (
          <Box>
            <Divider my='4' />
            <Heading as='h3' size='md' >답변</Heading>
            <Flex alignItems='center' mb='2' my='4'>
              <Avatar 
                size='sm' 
                src={photoURL ?? ''} 
                background={color.primary}
                mr='2'
              />
              <Box>
                <Text fontWeight='bold'>{displayName ?? '알 수 없음'}</Text>
                <Text fontSize='sm' color={color.gray}>{convertDateToString(item.replyedAt as string)}</Text>
              </Box>
            </Flex>
            <Text>{item.reply}</Text>
          </Box>
        ) : (
          isOwner && (
            <>
              <Textarea
                value={reply}
                onChange={onChangeReply}
                my='3'
                placeholder='답변을 남겨보세요.'
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
                <Spacer />
                <Button
                  bg={color.primary} 
                  color={color.white}
                  colorScheme='none'
                  isDisabled={reply.length < 1}
                  onClick={onClickPostReply}
                >
                  등록
                </Button>
              </Flex>
            </>
          )
        )
      }
    </Box>
  )
};

export default AskItem;