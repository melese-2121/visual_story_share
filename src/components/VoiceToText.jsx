import React, { useState, useEffect } from "react";

const VoiceToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  const recognition = new window.webkitSpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;

  useEffect(() => {
    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          final += transcript + " ";
        }
      }

      setTranscript(final);
      console.log(final); // Log the final transcript to the console
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const handleToggleRecording = () => {
    if (isRecording || recognition.start) {
      recognition.stop();
      return;
    }

    setTranscript("");
    recognition.start();
  };

  return (
    <div>
      <button onClick={handleToggleRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <div>
        <p>Transcript: {transcript}</p>
      </div>
    </div>
  );
};

export default VoiceToText;
