'use client'

import AppLayout from "./App/Layout";
import { Avatar, Box, Button, Heading, Text, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useState, useRef, useCallback } from "react";
import color from "@/client/color";
import { useAuth } from "@/client/context/auth_user";
import { InAuthUser } from "@/common/models/in_auth_user";
import { InAskClient } from "@/common/models/ask";
import AskApi from "@/client/api/ask";
import AskItem from "@/client/components/ask_item";
import AskForm from "@/client/components/ask_form";

export default function UserHomePage({ userInfo }: { userInfo: InAuthUser }) {
  const [askList, setAskList] = useState<InAskClient[]>([]);
  const [askListFetchTrigger, setAskListFetchTrigger] = useState(false);
  const offset = useRef(0);
  const [pageLeft, setPageLeft] = useState(true);
  const { authUser } = useAuth();
  const toast = useToast();

  const fetchAllAsks = async (uid: string | undefined) => {
    if (!uid) return;
    const fetchResult = await AskApi.getAll(uid, 0);
    if (!fetchResult.result) {
      toast({
        title: fetchResult?.message,
        position: 'top-right',
      });
      return;
    }
    setAskList(fetchResult?.data as InAskClient[]);
  };

  const setTrigger = useCallback(() => setAskListFetchTrigger(!askListFetchTrigger), [askListFetchTrigger]);

  const fetchAsk = async (uid: string | undefined, askId: string) => {
    if (!uid || !askId) return;
    const fetchResult = await AskApi.getById(uid, askId);
    if (!fetchResult.result || !fetchResult.data) {
      toast({
        title: fetchResult?.message,
        position: 'top-right',
      });
      return;
    }
    updateAsk(fetchResult.data?.id, fetchResult.data);
  };

  const updateAsk = (askId: string, newAsk: InAskClient) => {
    const findIndex = askList.findIndex(fv => fv.id === askId);
    const updateAskList = [...askList];
    updateAskList[findIndex] = newAsk;
    setAskList(updateAskList);
  };

  const onClickMore = async (uid: string) => {
    offset.current += 10;
    if (!uid) return;
    const fetchResult = await AskApi.getAll(uid, offset.current);
    if (!fetchResult.result) {
      toast({
        title: fetchResult?.message,
        position: 'top-right',
      });
      return;
    }
    if (fetchResult.data?.length === 0) {
      setPageLeft(false);
      return;
    }
    setAskList([...askList, ...fetchResult?.data as InAskClient[]]);
  };
  
  useEffect(() => {
    fetchAllAsks(userInfo?.uid);
  }, [userInfo, askListFetchTrigger]);

  return (
    <AppLayout
      title={userInfo.displayName || 'User Home'}
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
            <AskForm 
              userInfo={userInfo}
              authUser={authUser}
              onSendComplete={setTrigger}
            /> 
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
              onSendComplete={() => fetchAsk(userInfo?.uid, item.id)}
              onUpdateDenyComplete={updateAsk}
            />
          ))
        }
      </VStack>
      {
        pageLeft && 10 <= askList.length && 
          <Button
            width='full'
            mt='4'
            bg={color.primary} 
            color={color.white}
            colorScheme='none'
            onClick={() => onClickMore(userInfo?.uid)}
          >
            더보기
          </Button>
      }
    </AppLayout>
  )
};