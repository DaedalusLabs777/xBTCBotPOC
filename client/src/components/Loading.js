import React from 'react';
import CircularProgress from '@mui/joy/CircularProgress';

const Loading = () => {
  return (
    <CircularProgress
      size="lg"
      color="neutral"
      variant="plain"
      sx={{
        color: '#fc813b',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

export default Loading;
