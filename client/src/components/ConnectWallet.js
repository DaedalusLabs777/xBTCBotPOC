import React from 'react';
import Box from '@mui/joy/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from 'react';
import {getAddress} from 'sats-connect';
import {Button, Typography} from '@mui/joy';

const ConnectWallet = () => {
  const bitcoinAddress = localStorage.getItem('bitcoinAddress');
  const ordinalsAddress = localStorage.getItem('ordinalsAddress');
  const connected = bitcoinAddress && ordinalsAddress;

  const [showDialog, setShowDialog] = useState(false);

  const disconnect = () => {
    localStorage.clear();
    window.location.reload();
  };

  const connectXverse = () => {
    const getAddressOptions = {
      payload: {
        purposes: ['ordinals', 'payment'],
        message: 'Address to perform functionalities.',
        network: {
          type: 'Mainnet',
        },
      },
      onFinish: (response) => {
        localStorage.setItem('bitcoinAddress', response.addresses[1].address);
        localStorage.setItem('ordinalsAddress', response.addresses[0].address);
        window.location.reload();
      },
      onCancel: () => alert('Request canceled'),
    };
    getAddress(getAddressOptions);
  };

  const formattedAddress = () => {
    const address = localStorage.getItem('ordinalsAddress');
    const beginning = address.substring(0, 4);
    const ending = address.substring(address.length - 4);
    return `${beginning}...${ending}`.toUpperCase();
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      {connected && (
        <Typography
          sx={{
            fontSize: '20px',
            fontFamily: 'Roboto',
            color: '#ffffff',
            width: '60%',
          }}
        >
          <span style={{color: '#fd803b'}}>0.00</span> BTC FUNDS
        </Typography>
      )}
      <Button
        sx={{
          width: '40%',
          fontFamily: 'Roboto',
          fontSize: '15px',
          bgcolor: '#993e0a',
          color: '#d1d5db',
          borderRadius: '4px',
        }}
        variant="solid"
        onClick={() => connected ? disconnect() : setShowDialog(true)}
      >
        {connected ? (formattedAddress()) : 'Connect'}
      </Button>
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#262726',
          },
        }}
      >
        <DialogTitle
          sx={{textAlign: 'center', color: '#d1d5db'}}
        >
          Wallet Connect
        </DialogTitle>
        <DialogActions sx={{flexDirection: 'column'}}>
          <Button
            onClick={connectXverse}
            sx={{width: '90%',
              fontSize: '15px',
              bgcolor: '#993e0a',
              color: '#d1d5db',
              borderRadius: '4px',
              m: '8px',
            }}
          >
            <img
              src="/images/xverse_logo.png"
              alt="Xverse"
              style={{
                maxWidth: '30px',
                maxHeight: '30px',
                width: 'auto',
                height: 'auto',
              }}
            />
          </Button>
          <Button
            onClick={() => setShowDialog(false)}
            sx={{width: '90%',
              fontFamily: 'Roboto',
              fontSize: '15px',
              bgcolor: '#993e0a',
              color: '#d1d5db',
              borderRadius: '6px',
              m: '8px',
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConnectWallet;
