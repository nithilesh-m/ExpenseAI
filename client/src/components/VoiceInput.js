import React, { useState, useEffect, useRef } from 'react';

const VoiceInput = ({ onResult, disabled = false }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Check if browser supports Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      
      // Configure recognition
      recognition.lang = 'en-IN'; // Indian English
      recognition.interimResults = false;
      recognition.continuous = false;
      recognition.maxAlternatives = 1;

      // Event handlers
      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
        
        // Auto-stop after 10 seconds of silence
        timeoutRef.current = setTimeout(() => {
          stopListening();
        }, 10000);
      };

      recognition.onresult = (event) => {
        clearTimeout(timeoutRef.current);
        const transcript = event.results[0][0].transcript.trim();
        
        if (transcript && onResult) {
          onResult(transcript);
        }
        
        stopListening();
      };

      recognition.onerror = (event) => {
        clearTimeout(timeoutRef.current);
        let errorMessage = 'Speech recognition error';
        
        switch (event.error) {
          case 'no-speech':
            errorMessage = 'No speech detected. Please try again.';
            break;
          case 'audio-capture':
            errorMessage = 'No microphone found. Please check your microphone.';
            break;
          case 'not-allowed':
            errorMessage = 'Microphone permission denied. Please allow microphone access.';
            break;
          case 'network':
            errorMessage = 'Network error. Please check your connection.';
            break;
          case 'aborted':
            errorMessage = 'Speech recognition aborted.';
            break;
          default:
            errorMessage = `Error: ${event.error}`;
        }
        
        setError(errorMessage);
        setIsListening(false);
        
        // Auto-clear error after 3 seconds
        setTimeout(() => setError(null), 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
        clearTimeout(timeoutRef.current);
      };

      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
      setError('Speech recognition not supported in this browser. Please use Chrome, Edge, or Chrome Android.');
    }

    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      clearTimeout(timeoutRef.current);
    };
  }, [onResult]);

  const startListening = () => {
    if (!isSupported || disabled || isListening) return;
    
    try {
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (err) {
      setError('Failed to start listening. Please try again.');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        // Ignore errors when stopping
      }
    }
    setIsListening(false);
    clearTimeout(timeoutRef.current);
  };

  const handleClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return (
      <div className="flex items-center">
        <button
          disabled
          className="px-4 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
          title="Speech recognition not supported"
        >
          🎤 Unavailable
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`
          relative px-4 py-3 rounded-lg font-semibold transition-all duration-200
          flex items-center gap-2 min-w-[120px] justify-center
          ${isListening
            ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/50'
            : 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-md'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          transform hover:scale-105 active:scale-95
        `}
        title={isListening ? 'Click to stop listening' : 'Click to start voice input'}
      >
        {isListening ? (
          <>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span>Listening…</span>
          </>
        ) : (
          <>
            <span className="text-xl">🎤</span>
            <span>Speak</span>
          </>
        )}
      </button>
      
      {error && (
        <div className="mt-2 text-xs text-red-600 bg-red-50 px-3 py-1 rounded max-w-[200px] text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default VoiceInput;

