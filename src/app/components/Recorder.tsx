"use client";
import { CircleDot, CircleStop, CircleX, Download } from "lucide-react";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  webcamRef: React.RefObject<Webcam | null>;
}

function Recorder({ canvasRef, webcamRef }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [videoVisible, setVideoVisible] = useState(false);

  const startRecording = () => {
    if (!canvasRef.current || !webcamRef.current || !webcamRef.current.video)
      return;
    const stream = canvasRef.current.captureStream(30);
    const videoStream = webcamRef.current.video.srcObject as MediaStream;

    const combinedStream = new MediaStream([
      ...videoStream.getTracks(),
      ...stream.getTracks(),
    ]);
    const recorder = new MediaRecorder(combinedStream);

    recorder.ondataavailable = (event) => {
      const url = URL.createObjectURL(event.data);
      if (!videoRef.current) return;
      videoRef.current.src = url;
    };

    recorder.onstop = async () => {
      if (!videoRef.current) return;
      videoRef.current.controls = true;
      videoRef.current.play();
    };

    recorder.start();
    setMediaRecorder(recorder);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
      setVideoVisible(true);
    }
  };

  const clearRecording = () => {
    if (videoRef.current) {
      videoRef.current.src = "";
      setVideoVisible(false);
    }
  };

  const downloadRecording = () => {
    if (videoRef.current) {
      const a = document.createElement("a");
      a.href = videoRef.current.src;
      a.download = "FaceRecording.webm";
      a.click();
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center mt-2">
      <div className="flex gap-2 items-center justify-center">
        {mediaRecorder ? (
          <button
            className="px-4 py-2 bg-stone-200 text-black rounded-xl hover:opacity-95 flex items-center justify-center gap-2"
            onClick={stopRecording}
          >
            <CircleStop /> Stop
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-stone-200 text-black rounded-xl hover:opacity-95 flex items-center justify-center gap-2"
            onClick={startRecording}
          >
            <CircleDot /> Record
          </button>
        )}
      </div>
      {videoVisible && (
        <>
          <video ref={videoRef} className="mt-2 w-full lg:h-[720px]" controls />
          <div className="flex gap-2 items-center justify-center">
            <button
              className="px-4 py-2 bg-stone-200 text-black rounded-xl hover:opacity-95 flex items-center justify-center gap-2"
              onClick={downloadRecording}
            >
              <Download /> Download
            </button>
            <button
              className="px-4 py-2 bg-transparent hover:bg-stone-800 ring-1 ring-stone-800 text-white rounded-xl hover:opacity-95 flex items-center justify-center gap-2"
              onClick={clearRecording}
            >
              <CircleX /> Clear
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Recorder;
