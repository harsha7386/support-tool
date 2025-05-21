import React, { useState, useRef, useEffect } from 'react';
import '../Styles.css';

const ChatBox = ({ customer, messages = [], inputText, setInputText, onSend }) => {
  const [aiOptionsVisible, setAiOptionsVisible] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [selectedTextRange, setSelectedTextRange] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [customerSummaries, setCustomerSummaries] = useState({});
  const inputRef = useRef();
  const aiOptionsRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        aiOptionsRef.current &&
        !aiOptionsRef.current.contains(e.target) &&
        e.target !== inputRef.current
      ) {
        setAiOptionsVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSend = () => {
    if (inputText.trim() !== '') {
      onSend({ sender: 'agent', text: inputText.trim() });
      setInputText('');
      setAiOptionsVisible(false);
    }
  };

  const showAiOptions = () => {
    const selection = window.getSelection();
    const text = selection.toString();

    if (text && inputRef.current) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setHoverPosition({ x: rect.left, y: rect.top - 30 });
      setSelectedTextRange({
        start: inputRef.current.selectionStart,
        end: inputRef.current.selectionEnd,
      });
      setAiOptionsVisible(true);
    } else {
      setAiOptionsVisible(false);
    }
  };

  const applyAiOption = (type) => {
    if (!selectedTextRange) return;

    const { start, end } = selectedTextRange;
    const selected = inputText.slice(start, end);
    let modified = selected;

    switch (type) {
      case 'rephrase':
        modified = `In other words, ${selected}`;
        break;
      case 'tone':
        modified = `${selected} (in your tone)`;
        break;
      case 'friendly':
        modified = `😊 ${selected}`;
        break;
      case 'formal':
        modified = `Dear Customer, ${selected}`;
        break;
      case 'grammar':
        modified = selected.replace(/\bi\b/g, 'I');
        break;
      default:
        break;
    }

    const newText = inputText.slice(0, start) + modified + inputText.slice(end);
    setInputText(newText);
    setAiOptionsVisible(false);
  };

  const summarizeChat = () => {
    if (messages.length === 0) return 'No messages to summarize.';
    const customerMsgs = messages.filter(m => m.sender === 'customer').map(m => m.text).join(' ');
    const agentMsgs = messages.filter(m => m.sender === 'agent').map(m => m.text).join(' ');
    return `Customer said: "${customerMsgs}". Agent responded: "${agentMsgs}".`;
  };

  const handleSummarize = () => {
    setCustomerSummaries(prev => ({
      ...prev,
      [customer]: {
        summary: summarizeChat(),
        transferred: false
      }
    }));
    setMenuOpen(false);
  };

  const handleTransfer = () => {
    setCustomerSummaries(prev => ({
      ...prev,
      [customer]: {
        summary: summarizeChat(),
        transferred: true
      }
    }));
    setMenuOpen(false);
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        {customer ? (
          <span>Chat with <span className="customer-name">{customer}</span></span>
        ) : 'Select a customer to start'}
        <div className="menu-container">
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>⋮</button>
          {menuOpen && (
            <div className="menu-options">
              <div onClick={handleSummarize}>Summarize Chat</div>
              <div onClick={handleTransfer}>Transfer Chat</div>
            </div>
          )}
        </div>
      </div>

      <div className="chat-body">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.sender === 'agent' ? 'agent-message' : 'customer-message'}`}
            >
              <strong>{msg.sender === 'agent' ? 'Agent' : 'Customer'}:</strong> {msg.text}
            </div>
          ))
        )}

        {customerSummaries[customer]?.summary && (
          <div className="chat-summary-container">
            <button className="summary-button">
              <strong>Chat Summary:</strong> {customerSummaries[customer].summary}
            </button>
            {customerSummaries[customer].transferred && (
              <button className="transfer-button">
                <em>Chat has been transferred.</em>
              </button>
            )}
          </div>
        )}
      </div>

      <div className="chat-input">
        <textarea
          ref={inputRef}
          rows={3}
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onMouseUp={showAiOptions}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button onClick={handleSend}>Send</button>

        {aiOptionsVisible && (
          <div
            className="ai-options-popup"
            ref={aiOptionsRef}
            style={{
              position: 'absolute',
              top: `${hoverPosition.y}px`,
              left: `${hoverPosition.x}px`,
              zIndex: 1000,
              backgroundColor: '#fff',
              boxShadow: '0 0 10px rgba(0,0,0,0.2)',
              padding: '8px',
              borderRadius: '6px',
              animation: 'fadeIn 0.2s ease-in-out',
            }}
          >
            <button onClick={() => applyAiOption('rephrase')}>Rephrase</button>
            <button onClick={() => applyAiOption('tone')}>My tone</button>
            <button onClick={() => applyAiOption('friendly')}>Friendly</button>
            <button onClick={() => applyAiOption('formal')}>Formal</button>
            <button onClick={() => applyAiOption('grammar')}>Fix Grammar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
