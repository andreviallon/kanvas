import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Shape } from "../models/shape";
import { KonvaEventObject } from "konva/lib/Node";
import { addShape, updateShape } from "../state/stage/StageActions";
import { resetCursor, setCursor } from "../helper/cursorHelper";
import { drawBasicShape, drawEnd, drawShape } from "../helper/drawHelper";
import { Layer, Stage } from "react-konva";
import { ToolEnum } from "../models/tool";
import { ShapeFactory } from "./ShapeFactory";
import {
  resetSelectedShape,
  selectShape,
} from "../state/selection/SelectionActions";
import { StageOffset } from "../models/stage";

interface Window {
  width: number;
  height: number;
}

function getWindowDimensions(): Window {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

export const Scene = () => {
  const { present } = useSelector((state: RootState) => state.stage);
  const { selectedShapeId } = useSelector(
    (state: RootState) => state.selection
  );
  const { selectedTool } = useSelector((state: RootState) => state.tool);
  const [newShape, setNewShape] = useState<Shape | null>(null);
  const [shapesToDraw, setShapesToDraw] = useState<Shape[]>([]);

  const stageRef: any = React.useRef();

  const dispatch = useDispatch();

  const dispatchDrawShape = (shape: Shape) => {
    dispatch(addShape(shape));
  };

  const dispatchSelectShape = (shapeId: string) => {
    dispatch(selectShape(shapeId));
  };

  const dispatchResetShape = () => {
    dispatch(resetSelectedShape());
  };

  const dispatchUpdateShape = (newShape: Shape) => {
    dispatch(updateShape(newShape));
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const toDraw: Shape[] = [];

    if (present.shapes) toDraw.push(...present.shapes);

    if (newShape) toDraw.push(newShape);

    setShapesToDraw(toDraw);
  }, [present.shapes, newShape]);

  useEffect(() => {
    setCursor(selectedTool);
  }, [selectedTool]);

  const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    if (selectedTool === ToolEnum.RECTANGLE) setNewShape(drawBasicShape(event));
  };

  const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    newShape && setNewShape(drawShape(newShape, event, getStageOffset()));
  };

  const handleMouseUp = () => {
    newShape && dispatchDrawShape(drawEnd(newShape, getStageOffset()));
    setNewShape(null);
  };

  const getStageOffset = (): StageOffset => {
    return {
      x: stageRef.current.attrs.x,
      y: stageRef.current.attrs.y,
    };
  };

  return (
    <>
      <Stage
        ref={stageRef}
        width={windowDimensions.width - 320}
        height={windowDimensions.height - 56}
        onMouseEnter={() => setCursor(selectedTool)}
        onMouseLeave={resetCursor}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={(e) => {
          e.target === e.target.getStage() && dispatchResetShape();
        }}
        draggable={selectedTool === ToolEnum.MOVE}
      >
        <Layer>
          {shapesToDraw?.map((shape, index) => (
            <ShapeFactory
              key={index}
              {...shape}
              isSelected={shape.id === selectedShapeId}
              isSelectable={selectedTool === ToolEnum.POINTER}
              isDraggable={selectedTool === ToolEnum.POINTER}
              onSelect={(id: string) =>
                selectedTool === ToolEnum.POINTER && dispatchSelectShape(id)
              }
              onUpdateShape={(newShape: Shape) => dispatchUpdateShape(newShape)}
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
};
