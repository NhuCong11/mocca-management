import LoadingStart from '@/share/Loading';
import { Box } from '@mantine/core';

export const metadata = {
  title: 'Mocca Cafe | Loading ...',
};

function Loading() {
  return (
    <Box bg="var(--content-bg)">
      <LoadingStart />
    </Box>
  );
}

export default Loading;
