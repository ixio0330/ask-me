import ServiceLayout from "@/client/layout/service_layout";
import { Avatar, Box, Button, Flex, FormLabel, Heading, Spacer, Switch, Text, Textarea, useToast, VStack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import ResizeTextarea from 'react-textarea-autosize';
import color from "@/client/color";
import { useAuth } from "@/client/context/auth_user";
import { InAuthUser } from "@/common/models/in_auth_user";
import axios from 'axios';
import AskApi from "@/client/api/ask";
import AskItem from "@/client/components/ask_item";
import { InAskClient } from "@/common/models/ask";

interface Props {
  userInfo: InAuthUser | null;
}

const UserHomePage: NextPage<Props> = ({ userInfo }) => {
  const [ask, setAsk] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [askList, setAskList] = useState<InAskClient[]>([]);
  const { authUser } = useAuth();
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
  }
  const onClickPostAsk = async () => {
    try {
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
    } catch (error) {
      toast({
        title: '질문 등록에 실패했습니다.',
        position: 'top-right',
      })
    }
  }
  
  const fetchAsks = async (uid: string | undefined) => {
    if (!uid) return;
    const fetchAsks = await AskApi.getAll(uid);
    if (!fetchAsks.result) {
      toast({
        title: fetchAsks?.message,
        position: 'top-right',
      });
      return;
    }
    setAskList(fetchAsks?.data as InAskClient[]);
  }
  
  useEffect(() => {
    fetchAsks(userInfo?.uid);
  }, [userInfo]);

  if (userInfo === null) {
    return <p>사용자를 찾을 수 없습니다.</p>
  }
  return (
    <ServiceLayout
      title={userInfo.displayName || 'User Home'}
      backgroundColor={color.tertiary}
      minH='100vh'
    >
      <Box
        width='full'
        mx='auto'
        mt='8'
        bg={color.white}
        borderRadius='lg'
        padding='20px'
        pos='relative'
        textAlign='center'
      >
        <Box
          background={color.white}
          pos='absolute'
          left='calc(50% - 30px)'
          top='-8'
          width='60px' 
          height='60px'
          borderRadius='50%'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Avatar 
            size='md' 
            src={userInfo.photoURL ?? ''} 
            background={color.primary}
          />
        </Box>
        <Box>
          <Heading my='3' size='md'>{userInfo.displayName}</Heading>
          <Text>안녕하세요 {userInfo.displayName}입니다.</Text>
          {
            userInfo.uid !== authUser?.uid &&
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
          }
        </Box>
      </Box>
      <VStack spacing='12px' mt='3'>
        {
          askList.map((item, index) => (
            <AskItem 
              key={`ask-item-${index}`}
              item={item}
              uid={userInfo.uid}
              displayName={userInfo.displayName}
              photoURL={userInfo.photoURL}
              isOwner={userInfo.uid === authUser?.uid}
            />
          ))
        }
      </VStack>
    </ServiceLayout>
  )
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const { screenName } = query;
  
  if (screenName === undefined) {
    return {
      props: {
        userInfo: null,
      }
    }
  }

  try {
    const protocol = process.env.PROTOCOL || 'http';
    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || 3000;
    const baseUrl = `${protocol}://${host}:${port}`;
    const userInfo = await axios.get(`${baseUrl}/api/user/${screenName}`);
    return {
      props: {
        userInfo: userInfo.data ?? null,
      }
    }
  } catch (error) {
    return {
      props: {
        userInfo: null,
      }
    }
  }
};

export default UserHomePage;