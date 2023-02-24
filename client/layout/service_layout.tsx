import Head from "next/head";
import { ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import AppHeader from "../components/app_header";

interface Props {
  title: string;
  children: ReactNode;
}

const ServiceLayout: React.FC<Props & BoxProps> = ({ title, children, ...boxProps }) => {
  return (
    <Box {...boxProps}>
      <Head>
        <title>{title}</title>
      </Head>
      <AppHeader />
      <Box
        width='sm'
        m='0 auto'
        height='full'
        padding='2'
      >
        {children}
      </Box>
    </Box>
  )
};

export default ServiceLayout;