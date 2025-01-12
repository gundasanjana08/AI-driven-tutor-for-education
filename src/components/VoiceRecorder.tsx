import React, { useState, useEffect } from 'react';
import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/solid';

interface VoiceRecorderProps {
  onTranscriptionComplete: (text: string) => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onTranscriptionComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (window.webkitSpeechRecognition) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
          
        if (event.results[0].isFinal) {
          onTranscriptionComplete(transcript);
        }
      };

      setRecognition(recognition);
    }
  }, []);

  const startRecording = () => {
    if (recognition) {
      recognition.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`inline-flex items-center px-4 py-2 rounded-md ${
          isRecording
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
      >
        {isRecording ? (
          <>
            <StopIcon className="h-5 w-5 mr-2" />
            Stop Recording
          </>
        ) : (
          <>
            <MicrophoneIcon className="h-5 w-5 mr-2" />
            Start Recording
          </>
        )}
      </button>
      {isRecording && (
        <span className="text-red-600 animate-pulse">Recording...</span>
      )}
    </div>
  );
};