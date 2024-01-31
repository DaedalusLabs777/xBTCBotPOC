import Box from '@mui/joy/Box';
import React from 'react';
import ConnectWallet from './ConnectWallet';

const Header = () => {
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
      <img
        src="/images/xBTCBot_hifi.png"
        alt="Logo"
        style={{
          width: 'auto',
          height: '80%',
          marginLeft: '1em',
          marginRight: '1em',
        }}
      />
      <a href="https://twitter.com/xBTCBot" target="_blank" rel="noopener noreferrer" style={{height: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <img
          src="/images/twitter_logo.png"
          alt="Twitter"
          style={{width: 'auto', height: '100%'}}
        />
      </a>
      <Box
        sx= {{
          width: '10%',
          height: '80%',
          flex: '1',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          mr: '1em',
        }}
      >
        <ConnectWallet />
      </Box>
    </Box>
  );
};

export default Header;
