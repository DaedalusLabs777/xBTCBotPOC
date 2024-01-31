/* eslint-disable max-len */
import React from 'react';
import {Box, Typography} from '@mui/joy';
import Avatar from '@mui/material/Avatar';

const ResultChat = ({response, request, formattedAddress}) => {
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
          Of couse. Your inscriptions are pending:
            <br /><br />
          </span>

          <span style={{marginLeft: "40px"}}>
            1. I inscribed <span style={{color: '#fd803b'}}>{request.inscriptions[0]} </span>
            <span style={{color: '#fd803b'}}>{request.inscriptions[0] !== request.inscriptions[request.inscriptions.length - 1] ? request.inscriptions.length - 1 : request.inscriptions.length} </span>
            times to your address <span style={{color: '#fd803b'}}>{formattedAddress()}</span> at <span style={{color: '#fd803b'}}>{request.payload['fee-rate'] || 1 } fees. </span>
            <a href={`https://mempool.space/signet/tx/${response.commit.txid}`} target="_blank" style={{color: '#fd803b'}} rel="noreferrer">Block explorer link</a>
            <br /><br />
          </span>

          {request.inscriptions[0] !== request.inscriptions[request.inscriptions.length - 1] && (
            <span style={{marginLeft: "40px"}}>
            2. I inscribed <span style={{color: '#fd803b'}}>{request.inscriptions[request.inscriptions.length - 1]} 1 </span>
            times to your address <span style={{color: '#fd803b'}}>{formattedAddress()}</span> at <span style={{color: '#fd803b'}}>{request.payload['fee-rate'] || 1 } fees. </span>
            <a href={`https://mempool.space/signet/tx/${response.commit.txid}`} target="_blank" style={{color: '#fd803b'}} rel="noreferrer">Block explorer link</a>
            <br /><br />
            </span>
          )}

          <span>
            This inscription should be confirmed in <span style={{color: '#2196f3'}}>2</span> blocks or 20-40 minutes. To speed it up, tell me to <span style={{color: '#2196f3'}}>accelerate</span> or give me a new <span style={{color: '#2196f3'}}>fee</span> and I'll redo the transaction for you. The minimum replacement fee rate is <span style={{color: '#2196f3'}}>{response['rbf_min_fee_rate']}</span>.
            <br /><br />
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default ResultChat;
