'use client'

import AppLayout from "../App/Layout";
import Bio from "../Card/Bio";
import Ask from "../Card/Ask";
import Stack from "../Stack";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { useAuth } from "@/client/context/auth_user";
import { InAuthUser } from "@/common/models/in_auth_user";
import { InAskClient } from "@/common/models/ask";
import AskApi from "@/client/api/ask";
import Button from "../Button";

const UserHome = ({ userInfo }: { userInfo: InAuthUser }) => {
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
      <Stack style={{padding: '20px 0'}}>
        <Bio 
          {...userInfo}
          status={userInfo.uid !== authUser?.uid ? 'visitor' : 'owner'}
          bio={`안녕하세요, ${userInfo.displayName}입니다`}
          onSendComplete={setTrigger}
        />
        {
          askList.map((ask, index) => <Ask {...ask} key={`ask-${index}`} />)
        }
        {
          pageLeft && 10 <= askList.length && (
            <Button
              onClick={() => onClickMore(userInfo?.uid)}
            >
              더보기
            </Button>
          )
        }
      </Stack>
    </AppLayout>
  )
};

export default UserHome;