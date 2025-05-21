import {useState, } from 'react';

import SideBar from './components/SideBar';
import ChatBox from './components/ChatBox';
import AIPilot from './components/AIPilot';
import './Styles.css';
import dummyChats from './dummyData'; 

function App() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  // const [messages, setMessages] = useState([]);
  

const handleSend = (newMessage) => {
  setChatMessages(prev => [...prev, newMessage]);
};
  const getLastCustomerMessage = () => {
    const customerMsgs = chatMessages.filter(msg => msg.sender === "customer");
    return customerMsgs.length > 0 ? customerMsgs[customerMsgs.length - 1].text : "";
  };

  const handleCustomerClick = (customerName) => {
    setSelectedCustomer(customerName);
    setChatMessages(dummyChats[customerName] || []);
  };
   
  const handleAddToComposer = (text) => {
    setInputText(text);
  };
  
  return (
    <div className="container">
      <SideBar onCustomerClick={handleCustomerClick} />
      <ChatBox
        customer={selectedCustomer}
        messages={chatMessages}
        inputText={inputText}
        setInputText={setInputText}
        onSend={handleSend}
        
      />
      <AIPilot
        customerMessage={getLastCustomerMessage()}
        onAddToComposer={handleAddToComposer}
      />
    </div>
  );
}

export default App;
