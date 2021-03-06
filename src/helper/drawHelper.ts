import { KonvaEventObject } from "konva/lib/Node";
import { Shape, ShapeEnum } from "../models/shape";
import { generateId } from "./idHelper";
import { StageOffset } from "../models/stage";

const basicRectangle: Shape = {
  id: generateId(),
  shape: ShapeEnum.RECTANGLE,
  x: 0,
  y: 0,
  offsetX: 0,
  offsetY: 0,
  width: 0,
  height: 0,
  scaleX: 1,
  scaleY: 1,
  rotation: 0,
  color: "#555555",
  hasStroke: false,
  strokeColor: "#000000",
  strokeWidth: 1,
};

export const drawBasicShape = (event: KonvaEventObject<MouseEvent>): Shape => {
  return {
    ...basicRectangle,
    x: event?.target?.getStage()?.getPointerPosition()?.x ?? 0,
    y: event?.target?.getStage()?.getPointerPosition()?.y ?? 0,
    id: generateId(),
  };
};

export const drawShape = (
  shape: Shape,
  event: KonvaEventObject<MouseEvent>,
  offset: StageOffset
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
    offsetX: offset.x,
    offsetY: offset.y,
  };
};

export const drawEnd = (shape: Shape, offset: StageOffset): Shape => {
  if (!shape?.width && !shape.height) {
    shape.width = 100;
    shape.height = 100;
  }

  shape.offsetX = offset.x;
  shape.offsetY = offset.y;

  return shape;
};
