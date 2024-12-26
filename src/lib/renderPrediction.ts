import { DetectedObject } from "@tensorflow-models/coco-ssd";

export const renderPredictions = (predictions: DetectedObject[], ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];

    const isPerson = prediction.class === "person";

    ctx.strokeStyle = isPerson ? "#FFFFFF" : "#00000000";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
  });
};