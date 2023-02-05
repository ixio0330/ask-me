import Head from "next/head";
import { ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

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
      <Box
        width='md'
        m='0 auto'
        height='full'
        padding='20px'
      >
        {children}
      </Box>
    </Box>
  )
};

export default ServiceLayout;