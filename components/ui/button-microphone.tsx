import React, { useRef, useState, useEffect } from 'react';
import { useRecordVoice } from "@/components/useRecordVoice";
import { Mic } from "lucide-react";
import { Button } from "./button";

interface MicrophoneProps {
    onVoiceSubmit: (text: string) => void;
}

const Microphone: React.FC<MicrophoneProps> = ({ onVoiceSubmit }) => {
    const { startRecording, stopRecording, text, resetText } = useRecordVoice();
    const isRecordingRef = useRef(false);

    const handleStartRecording = () => {
        isRecordingRef.current = true;
        startRecording();
    };

    const handleStopRecording = () => {
        isRecordingRef.current = false;
        stopRecording();
    };

    useEffect(() => {
        if (text) {
            onVoiceSubmit(text);
            resetText(); // Reset after submitting
        }
    }, [text, onVoiceSubmit]);
    return (
        <div className="flex flex-col justify-center items-center">
            <Button
                onMouseDown={handleStartRecording}
                onMouseUp={handleStopRecording}
                onTouchStart={handleStartRecording}
                onTouchEnd={handleStopRecording}
                variant="destructive"
                className="hover:bg-orange-500 active:bg-red-500"
            >
                <Mic className='h-8 w-8' />
            </Button>
        </div>
    );
};

export { Microphone };
