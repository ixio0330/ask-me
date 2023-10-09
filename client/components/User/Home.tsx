'use client'

import AppLayout from "../App/Layout";
import Bio, { BioStatus } from "../Card/Bio";
import Ask from "../Card/Ask";
import Stack from "../Stack";
import { useEffect, useState, useRef, useCallback } from "react";
import { useAuth } from "@/client/context/auth_user";
import { InAuthUser } from "@/common/models/in_auth_user";
import { InAskClient } from "@/common/models/ask";
import AskApi from "@/client/api/ask";
import Button from "../Button";
import Answer from "../Card/Answer";

const UserHome = ({ userInfo }: { userInfo: InAuthUser }) => {
  const [askList, setAskList] = useState<InAskClient[]>([]);
  const [askListFetchTrigger, setAskListFetchTrigger] = useState(false);
  const offset = useRef(0);
  const [pageLeft, setPageLeft] = useState(true);
  const { authUser } = useAuth();
  const isOwner = userInfo.uid === authUser?.uid;
  const [status, setStatus] = useState<BioStatus>(isOwner ? 'owner' : 'visitor');

  const fetchAllAsks = async (uid: string | undefined) => {
    if (!uid) return;
    const fetchResult = await AskApi.getAll(uid, 0);
    if (!fetchResult.result) {
      window.alert(fetchResult.message);
      return;
    }
    setAskList(fetchResult?.data as InAskClient[]);
  };

  const setTrigger = useCallback(() => setAskListFetchTrigger(!askListFetchTrigger), [askListFetchTrigger]);

  const fetchAsk = async (uid: string | undefined, askId: string) => {
    if (!uid || !askId) return;
    const fetchResult = await AskApi.getById(uid, askId);
    if (!fetchResult.result || !fetchResult.data) {
      window.alert(fetchResult.message);
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
      window.alert(fetchResult.message);
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

  useEffect(() => {
    setStatus(isOwner ? 'owner' : 'visitor');
  }, [authUser?.uid]);

  return (
    <AppLayout>
      <Stack style={{padding: '20px 0'}}>
        <Bio 
          {...userInfo}
          status={status}
          bio={`안녕하세요, ${userInfo.displayName}입니다`}
          onSendComplete={setTrigger}
          onClickUpdateBio={() => setStatus('update')}
          onClickCancel={() => setStatus('owner')}
        />
        {
          isOwner 
          ? askList.map((ask, index) => (
            <Answer 
              {...ask}
              uid={userInfo.uid ?? ''}
              key={`ask-${index}`} 
              onSendComplete={() => fetchAsk(userInfo?.uid, ask.id)}
              onUpdateDenyComplete={updateAsk}
            />
          ))
          : askList.map((ask, index) => <Ask key={`ask-${index}`} {...ask}  />)
        }
        {
          pageLeft && 10 <= askList.length && (
            <Button
              onClick={() => userInfo?.uid && onClickMore(userInfo?.uid)}
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
