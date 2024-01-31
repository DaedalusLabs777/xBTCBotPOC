/* eslint-disable max-len */
import React from 'react';
import {Box, Typography, Button} from '@mui/joy';
import Avatar from '@mui/material/Avatar';

const VerificationChat = ({inscriptions, payload, formattedAddress, feeRates, handleChangeFeeRate}) => {
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
          variant="body1"
        >
          <span>
            <b>AI</b>
            <br />
          </span>

          <span>
            Done. Verify what I am about to do:
            <br /><br />
          </span>
          <span style={{marginLeft: '40px'}}>
            1. I will inscribe <span style={{color: '#fd803b'}}>{inscriptions[0]} </span>
            <span style={{color: '#fd803b'}}>{inscriptions[0] !== inscriptions[inscriptions.length - 1] ? inscriptions.length - 1 : inscriptions.length} </span>
            times to your address <span style={{color: '#fd803b'}}>{formattedAddress()}</span> at
            <span style={{color: '#fd803b'}}> {payload['fee-rate'] || 1 } fees</span>
            <br /><br />
          </span>

          {inscriptions[0] !== inscriptions[inscriptions.length - 1] && (
            <span style={{marginLeft: '40px'}}>
            2. I will inscribe <span style={{color: '#fd803b'}}>{inscriptions[inscriptions.length - 1]} 1 </span>
            times to your address <span style={{color: '#fd803b'}}>{formattedAddress()}</span> at
              <span style={{color: '#fd803b'}}> {payload['fee-rate'] || 1 } fees</span>
              <br /><br />
            </span>
          )}

          <span>
            This inscription should execute in <span style={{color: '#2196f3'}}>2</span> blocks or 20-40 minutes.
            <br /><br />
          </span>

          <span>
            Press the <span style={{color: '#2196f3'}}>EXECUTE</span> key to inscribe. Cancel and adjust by adjusting instructions.
          </span>
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button
            sx={{
              'height': '60%',
              'fontSize': '15px',
              'fontFamily': 'Roboto',
              'bgcolor': '#161617',
              'color': '#2196f3',
              'borderRadius': '4px',
              '&:hover': {bgcolor: '#161617'},
              'm': '8px',
            }}
            onClick={() => handleChangeFeeRate(feeRates.economyFee)}
          >
            SLOW: {feeRates.economyFee} FEES
          </Button>
          <Button
            sx={{
              'height': '60%',
              'fontSize': '15px',
              'fontFamily': 'Roboto',
              'bgcolor': '#161617',
              'color': '#2196f3',
              'borderRadius': '4px',
              '&:hover': {bgcolor: '#161617'},
              'm': '8px',
            }}
            onClick={() => handleChangeFeeRate(feeRates.hourFee)}
          >
            MEDIUM: {feeRates.hourFee} FEES
          </Button>
          <Button
            sx={{
              'height': '60%',
              'fontSize': '15px',
              'fontFamily': 'Roboto',
              'bgcolor': '#161617',
              'color': '#2196f3',
              'borderRadius': '4px',
              '&:hover': {bgcolor: '#161617'},
              'm': '8px',
            }}
            onClick={() => handleChangeFeeRate(feeRates.halfHourFee)}
          >
            HIGH: {feeRates.halfHourFee} FEES
          </Button>
          <Button
            sx={{
              'height': '60%',
              'fontSize': '15px',
              'fontFamily': 'Roboto',
              'bgcolor': '#161617',
              'color': '#2196f3',
              'borderRadius': '4px',
              '&:hover': {bgcolor: '#161617'},
              'm': '8px',
              'mr': '0px',
            }}
            onClick={() => handleChangeFeeRate(feeRates.fastestFee)}
          >
            TURBO: {feeRates.fastestFee} FEES
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default VerificationChat;
