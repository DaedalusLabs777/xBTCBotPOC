import React from 'react';
import {Box, Typography} from '@mui/joy';
import Avatar from '@mui/material/Avatar';

const BotChat = ({response}) => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'row', mb: '20px'}}>
      <Box sx={{display: 'flex', width: '5%', justifyContent: 'center'}}>
        <Avatar
          alt="Avatar"
          src="/images/xBTCBOT_hifi.ico"
          variant="circular"
          sx={{
            width: '2.5vw',
            height: '2.5vw',
          }}
        />
      </Box>
      <Box sx={{width: '94%'}}>
        <Typography
          sx={{
            fontSize: '20px',
            fontFamily: 'Roboto',
            color: '#d1d5db',
            whiteSpace: 'pre-line',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
            p: '0',
          }}
          variant="body1">
          <b>AI</b><br />
          {`${response}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default BotChat;
