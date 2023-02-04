import Head from "next/head";
import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

const ServiceLayout = ({ title, children }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  )
};

export default ServiceLayout;