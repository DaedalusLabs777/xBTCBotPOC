/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React, {useEffect, useRef} from 'react';
import {Button, Typography} from '@mui/joy';
import Box from '@mui/joy/Box';
import Avatar from '@mui/material/Avatar';
import UserChat from './UserChat';
import BotChat from './BotChat';
import VerificationChat from './VerificationChat';
import ResultChat from './ResultChat';

const ChatDisplay = ({chat, feeRates, handleChangeFeeRate}) => {
  const formattedAddress = () => {
    const address = localStorage.getItem('ordinalsAddress');
    const beginning = address.substring(0, 4);
    const ending = address.substring(address.length - 4);
    return `${beginning}...${ending}`;
  };

  const scrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#161617',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '5px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  };


  const bottomChatRef = useRef(null);

  useEffect(() => {
    bottomChatRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [chat]);

  return (
    <Box sx={{display: 'flex', justifyContent: 'center', height: '90%', width: '100%', overflowY: 'auto', ...scrollbarStyles}}>
      <Box sx={{height: '100%', width: '90%'}}>
        {chat.map((exchange, index) => (
          <Box key={index}>
            {exchange.userPrompt && (
              <UserChat prompt={exchange.userPrompt} />
            )}
            {exchange.botResponse && (
              <BotChat response={exchange.botResponse} />
            )}
            {exchange.beResponse && exchange.beRequest && (
              <ResultChat response={exchange.beResponse} request={exchange.beRequest} formattedAddress={formattedAddress}/>
            )}
            {exchange.inscriptions && exchange.payload && (
              <VerificationChat inscriptions={exchange.inscriptions} payload={exchange.payload} feeRates={feeRates} handleChangeFeeRate={handleChangeFeeRate} formattedAddress={formattedAddress}/>
            )}
          </Box>
        ))}
        <div ref={bottomChatRef} />
      </Box>
    </Box>
  );
};

export default ChatDisplay;
