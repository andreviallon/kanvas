import { KonvaEventObject } from "konva/lib/Node";
import { Shape, ShapeEnum } from "../models/shape";
import { ToolEnum } from "../models/tool";

const basicRectangle: Shape = {
  shape: ShapeEnum.RECTANGLE,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  color: "blue",
};

const basicCircle: Shape = {
  shape: ShapeEnum.CIRCLE,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  color: "blue",
};

export const drawBasicShape = (
  selectedTool: ToolEnum,
  event: KonvaEventObject<MouseEvent>
): Shape => {
  if (selectedTool === ToolEnum.RECTANGLE) {
    return {
      ...basicRectangle,
      x: event?.target?.getStage()?.getPointerPosition()?.x ?? 0,
      y: event?.target?.getStage()?.getPointerPosition()?.y ?? 0,
    };
  } else {
    return {
      ...basicCircle,
      x: event?.target?.getStage()?.getPointerPosition()?.x ?? 0,
      y: event?.target?.getStage()?.getPointerPosition()?.y ?? 0,
    };
  }
};

export const drawShape = (
  shape: Shape,
  event: KonvaEventObject<MouseEvent>
): Shape => {
  const shapeX = shape?.x;
  const shapeY = shape?.y;
  const x = event?.target?.getStage()?.getPointerPosition()?.x ?? 0;
  const y = event?.target?.getStage()?.getPointerPosition()?.y ?? 0;

  return {
    ...shape,
    x: shapeX,
    y: shapeY,
    width: x - shapeX,
    height: y - shapeY,
  };
};