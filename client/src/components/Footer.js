import React from 'react';
import {Typography, Box} from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '8%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '70px',
      }}
    >
      <a href="https://discord.gg/5vXmB6uX8g" target="_blank" rel="noopener noreferrer" style={{marginLeft: '16px', textDecoration: 'none'}}>
        <Typography
          sx={{
            fontSize: '15px',
            fontFamily: 'Roboto',
            color: '#ffffff',
          }}
          variant="body1"
        >
          <b>Discord</b>
        </Typography>
      </a>
      <Box
        sx=
          {{width: '10%',
            height: '80%',
            flex: '1',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            mr: '16px',
          }}
      >
        <a href="https://www.xbtcbot.xyz/legal/terms-of-service" target="_blank" rel="noopener noreferrer" style={{marginLeft: '16px', textDecoration: 'none'}}>
          <Typography
            sx={{
              fontSize: '15px',
              fontFamily: 'Roboto',
              color: '#ffffff',
            }}
            variant="body1"
          >
            <b>Terms of Service</b>
          </Typography>
        </a>
      </Box>
    </Box>
  );
};

export default Footer;
