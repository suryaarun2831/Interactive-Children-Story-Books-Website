import React, { useState } from 'react';
import './SpeechToTextComponent.css';

const SpeechToTextComponent = ({ChangeText}) => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = false;
  recognition.interimResults = false;

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };
  
  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setText(transcript);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error', event.error);
    setIsListening(false);
  };

  return (
    <div className="speech-container">
      <div className="search-bar">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={"Type or speak..."}
        />
        {isListening ? (
          <button className="stop-button" onClick={stopListening}>X</button>
        ) : (
          <button className="mic-button" onClick={startListening}>🎤</button>
        )}
      </div>
    </div>
  );
};

export default SpeechToTextComponent;
