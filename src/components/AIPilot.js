import React, { useState } from 'react';
import generateSuggestion from '../agentRequestData';

const AIPilot = ({ onAddToComposer }) => {
  const [agentPrompt, setAgentPrompt] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleAIResponse = () => {
    if (agentPrompt.trim()) {
      const aiReply = generateSuggestion(agentPrompt);
      setSuggestion(aiReply);
    }
  };

  return (
    <div
      className="ai-pilot"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '10px',
        borderLeft: '1px solid #ccc',
      }}
    >
      <div>
        <h3>AI Pilot</h3>
        {suggestion && (
          <div className="suggestion-box" >
            <p><strong>AI Suggestion:</strong></p>
            <p>{suggestion}</p>
            <button onClick={() => onAddToComposer(suggestion)}>
              Add to Composer
            </button>
          </div>
        )}
      </div>

     
      <div style={{ marginTop: 'auto' }}>
        <textarea
          rows="3"
          placeholder="Enter a prompt what you want to know"
          value={agentPrompt}
          onChange={(e) => setAgentPrompt(e.target.value)}
          style={{ width: '100%' }}
        />
        <button onClick={handleAIResponse} style={{ marginBottom: '2rem' }}>
          Get AI Response
        </button>
      </div>
    </div>
  );
};

export default AIPilot;   