/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import Box from '@mui/joy/Box';
import ChatDisplay from './ChatDisplay';
import ChatInputField from './ChatInputField';
import Loading from './Loading';

const ChatBot = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [inscriptionData, setInscriptionData] = useState({});
  const [feeRates, setFeeRates] = useState(null);
  const [chat, setChat] = useState([]);

  const fetchFeeRates = () => {
    const url = 'https://mempool.space/api/v1/fees/recommended';

    fetch(url)
        .then((response) => response.json())
        .then((data) => setFeeRates(data))
        .catch((error) => console.error('Error fetching fee rates:', error));
  };

  useEffect(() => {
    fetchFeeRates(); // Fetch once on component mount

    const interval = setInterval(() => {
      fetchFeeRates();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleChangeFeeRate = (feeRate) => {
    setInscriptionData((prevData) => {
      const newData = {
        ...prevData,
        payload: {...prevData.payload, 'fee-rate': feeRate.toString()},
      };

      setChat((prevChat) => [...prevChat, {
        inscriptions: newData.inscriptions,
        payload: newData.payload,
      }]);

      return newData;
    });
  };


  const handleInscription = () => {
    const {inscriptions, payload} = inscriptionData;

    setInscriptionData({});

    if (inscriptions) {
      const url = "https://xbtcbot.westus3.cloudapp.azure.com/inscribe";
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'a05cc27b-1ff6-4f5b-98a5-c47edf49edc0',
        },
        body: JSON.stringify({chat_history: chat, inscriptions: inscriptions, payload: payload}),
      })
          .then((response) => {
            setLoading(false);
            if (!response.ok) {
              setChat([...chat, {botResponse: 'Sorry, the inscription was not able to be generated.'}]);
              return;
            }
            return response.json();
          })
          .then((data) => {
            setChat([...chat, {beResponse: JSON.parse(data.response), beRequest: data.request}]);
          })
          .catch((error) => {
            console.error(error);
          });
    }
  };

  const handleSendPrompt = () => {
    if (!prompt) {
      if (!!inscriptionData.inscriptions) {
        handleInscription();
      }
      return;
    }

    setPrompt('');
    setLoading(true);
    setChat((prevChat) => [...prevChat, {userPrompt: prompt}]);

    // //////////////////// testing logging the chat ////////////////////
    console.log(chat);


    const url = "https://xbtcbot.westus3.cloudapp.azure.com";
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'a05cc27b-1ff6-4f5b-98a5-c47edf49edc0',
      },
      body: JSON.stringify({prompt: prompt, chat_history: chat, address: localStorage.getItem('ordinalsAddress')}),
    })
        .then((response) => {
          setLoading(false);
          if (!response.ok) {
            setChat((prevChat) => {
              const newChat = [...prevChat];
              newChat[newChat.length - 1].botResponse = 'Sorry, the response was not able to be generated.';
              return newChat;
            });
            return;
          }
          return response.json();
        })
        .then((data) => {
          const response = data.response;
          const inscriptions = data.inscriptions;
          const payload = data.payload;

          if (inscriptions) {
            setInscriptionData({inscriptions, payload});
            setChat((prevChat) => {
              const newChat = [...prevChat];
              newChat[newChat.length - 1].inscriptions = inscriptions;
              newChat[newChat.length - 1].payload = payload;
              return newChat;
            });
          } else {
            setChat((prevChat) => {
              const newChat = [...prevChat];
              newChat[newChat.length - 1].botResponse = response;
              return newChat;
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
  };

  return (
    <Box sx={{width: '100%', minHeight: '84%', bgcolor: '#161617', display: 'flex', flexGrow: '1', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <Box sx={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
        <ChatDisplay chat={chat} feeRates={feeRates} handleChangeFeeRate={handleChangeFeeRate}/>
        {loading && <Loading />}
      </Box>
      <Box sx={{height: '10%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <ChatInputField prompt={prompt} setPrompt={setPrompt} handleSendPrompt={handleSendPrompt} inscribing={!!inscriptionData.inscriptions}/>
      </Box>
    </Box>
  );
};
export default ChatBot;
