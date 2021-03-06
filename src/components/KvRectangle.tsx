import React, { FC, useEffect } from "react";
import { Rect, Transformer } from "react-konva";
import { Shape, ShapeEnum } from "../models/shape";

interface Props {
  id: string;
  x: number;
  y: number;
  offsetX: number | undefined;
  offsetY: number | undefined;
  width?: number;
  height?: number;
  scaleX?: number;
  scaleY?: number;
  color?: string;
  hasStroke: boolean;
  strokeColor: string;
  strokeWidth: number;
  rotation: number;
  isSelected?: boolean;
  isDraggable: boolean;
  isSelectable: boolean;
  onSelect: (id: string) => void;
  onUpdateShape: (newShape: Shape) => void;
}

export const KvRectangle: FC<Props> = ({
  id,
  x,
  y,
  offsetX,
  offsetY,
  width = 100,
  height = 100,
  scaleX = 1,
  scaleY = 1,
  color = "#555555",
  hasStroke = false,
  strokeColor = "#000000",
  strokeWidth = 1,
  rotation = 0,
  isSelected = false,
  isDraggable = false,
  isSelectable = false,
  onSelect,
  onUpdateShape,
}) => {
  const shapeRef: any = React.useRef();
  const trRef: any = React.useRef();

  const [previousShape, setPreviousShape] = React.useState<Shape | undefined>(
    undefined
  );

  const dispatchUpdateShape = () => {
    const newShape: Shape = {
      id,
      color,
      hasStroke,
      strokeColor,
      strokeWidth,
      offsetX: 0,
      offsetY: 0,
      shape: ShapeEnum.RECTANGLE,
      x: Math.round(shapeRef.current.attrs.x),
      y: Math.round(shapeRef.current.attrs.y),
      width: Math.round(shapeRef.current.attrs.width),
      height: Math.round(shapeRef.current.attrs.height),
      scaleX: shapeRef.current.attrs.scaleX,
      scaleY: shapeRef.current.attrs.scaleY,
      rotation: Math.round(shapeRef.current.attrs.rotation),
    };

    setPreviousShape(newShape);

    if (
      JSON.stringify(previousShape) !== undefined &&
      JSON.stringify(previousShape) !== JSON.stringify(newShape)
    ) {
      onUpdateShape(newShape);
    }
  };

  useEffect(() => {
    if (isSelectable && isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelectable, isSelected]);

  return (
    <>
      <Rect
        x={offsetX ? x - offsetX : x}
        y={offsetY ? y - offsetY : y}
        ref={shapeRef}
        width={width}
        height={height}
        scaleX={scaleX}
        scaleY={scaleY}
        rotation={rotation}
        fill={color}
        stroke={hasStroke ? strokeColor : undefined}
        strokeWidth={hasStroke ? strokeWidth : undefined}
        draggable={isDraggable}
        isSelected={isSelected}
        onClick={() => onSelect(id)}
        onDragStart={() => onSelect(id)}
        onMouseDown={() => onSelect(id)}
        onDragEnd={() => dispatchUpdateShape()}
        onMouseUp={() => dispatchUpdateShape()}
        onTransformEnd={() => dispatchUpdateShape()}
      />
      {isSelectable && isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(prevShape, newShape) => {
            if (newShape.width < 5 || newShape.height < 5) {
              return prevShape;
            }
            return newShape;
          }}
        />
      )}
    </>
  );
};
