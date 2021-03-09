import React from 'react';
import { Box } from '@material-ui/core';

export default function Container({ children, ...rest }) {
  <Box
    maxWidth={{ sm: 720, md: '65%' }}
    margin={'0 auto'}
    paddingX={2}
    paddingY={{ xs: 4, sm: 6, md: 8 }}
    {...rest}
  >
    {children}
  </Box>;
}
