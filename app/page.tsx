import AppHome from "@/client/components/App/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Ask Me',
  description: 'Ask Me는 익명 질문 사이트입니다.',
  authors: [{ 
    name: '서나무',
    url: 'https://github.com/ixio0330/ask-me',
  }],
  openGraph: {
    title: 'Ask Me',
    description: 'Ask Me는 익명 질문 사이트입니다.',
    url: 'https://ask-me-s.vercel.app',
  },
};

const IndexPage = () => <AppHome />

export default IndexPage;
