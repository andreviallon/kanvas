import { StageShapeAction, StageState } from "./StageStateModel";
import { ShapeEnum } from "../../models/shape";
import { SHAPE_ACTIONS } from "./StageActions";
import { generateId } from "../../helper/idHelper";

export const initialStageState: StageState = {
  shapes: [
    {
      id: generateId(),
      color: "red",
      height: 100,
      width: 100,
      x: 100,
      y: 100,
      rotation: 0,
      shape: ShapeEnum.RECTANGLE,
    },
    {
      id: generateId(),
      color: "blue",
      height: 50,
      width: 200,
      x: 300,
      y: 400,
      rotation: 45,
      shape: ShapeEnum.RECTANGLE,
    },
  ],
};

export const stageReducer = (
  state: StageState = initialStageState,
  action: StageShapeAction
): StageState => {
  switch (action.type) {
    case SHAPE_ACTIONS.ADD_SHAPE:
      const shape = action.shape;

      if (shape) {
        return {
          ...state,
          shapes:
            shape && state.shapes?.length ? [...state.shapes, shape] : [shape],
        };
      } else {
        return state;
      }

    case SHAPE_ACTIONS.REMOVE_SHAPE:
      return {
        ...state,
        shapes: state.shapes?.filter((_shape, index) => index !== action.index),
      };
    default:
      return state;
  }
};
