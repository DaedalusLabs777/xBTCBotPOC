import React from 'react';
import Box from '@mui/joy/Box';
import Header from './components/Header';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';

const App = () => {
  const bitcoinAddress = localStorage.getItem('bitcoinAddress');
  const ordinalsAddress = localStorage.getItem('ordinalsAddress');
  const connected = bitcoinAddress && ordinalsAddress;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#010001',
        maxWidth: '100%',
        height: '100dvh',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Header />
      {connected && <ChatBot />}
      <Footer />
    </Box>
  );
};

export default App;
