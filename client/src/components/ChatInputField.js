import React from 'react';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';

const ChatInputField = ({prompt, setPrompt, handleSendPrompt, inscribing}) => {
  return (
    <Box sx={{height: '100%', width: '90%', maxHeight: '70px'}}>
      <Input
        sx={{
          'fontSize': '20px',
          'fontFamily': 'Roboto',
          'width': '100%',
          'height': '80%',
          'bgcolor': '#161617',
          'color': '#d1d5db',
          'borderRadius': '4px',
          'border': '1px solid #4f4f4f',
          '--Input-focusedThickness': '0',
        }}
        variant="soft"
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendPrompt();
          }
        }}
        placeholder="Enter instructions..."
        required
        endDecorator={
          <Button
            sx={{
              'height': '60%',
              'fontSize': '15px',
              'fontFamily': 'Roboto',
              'bgcolor': inscribing ? '#2196f3' : '#f69026',
              'color': '#ffffff',
              'borderRadius': '4px',
              '&:hover': {bgcolor: inscribing ? '#2196f3' : '#f69026'},
              'm': '8px',
            }}
            onClick={handleSendPrompt}
          >
            EXECUTE
          </Button>
        }
      />
    </Box>
  );
};

export default ChatInputField;
