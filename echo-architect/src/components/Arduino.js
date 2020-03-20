import React, { useCallback, useEffect, useState } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import '../App.css';
 
const pubnub = new PubNub({
  publishKey: "pub-c-80683f77-8828-4492-9012-dfb0efcea318",
  subscribeKey: "sub-c-25ea6214-4d95-11ea-80a4-42690e175160",
});
 
const channels = ['IoE'];
 
const Chat = () => {
  const pubnub = usePubNub();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
 
  useEffect(() => {
    pubnub.addListener({
      message: function(message) {
          console.log(message);
      }    
  });
 
  pubnub.subscribe({
    channels: [channels],
    message: function(message) {
        console.log("Message Received: " + message);
    }
  });
  });
  // publish data to your channel
  pubnub.publish({
    message: {
        "process": "done"
    },
    channel: channels
  });

  
 
  return (
    <div className="App">
      
    </div>
  );
};
 
const Arduino = () => {
  return (
    <PubNubProvider client={pubnub}>
      <Chat />
    </PubNubProvider>
  );
};
 
export default Arduino;