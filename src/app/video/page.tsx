import React from "react";
import ObjectDetector from "../components/ObjectDetector";

function Page() {
  return (
    <div className="flex flex-col gap-4 items-center py-6 min-h-screen w-full">
      <h1 className="text-2xl font-bold tracking-tight">Record your video</h1>
      <ObjectDetector />
    </div>
  );
}

export default Page;
