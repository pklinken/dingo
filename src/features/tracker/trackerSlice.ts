import { createSlice } from "@reduxjs/toolkit";

export interface Entity {
  name: string
  targetValue: number
  unit: string
  quantities: number[]
}

export const entities: Entity[] =
  [
    {
      name: "Water",
      targetValue: 3.5,
      unit: "L",
      quantities: [0.33, 0.5]
    },
    {
      name: "Veg/Fruit",
      targetValue: 10,
      unit: "servings",
      quantities: [1]
    },
    {
      name: "Vit. D",
      targetValue: 1,
      unit: "pill",
      quantities: [1]
    }
  ]


type TrackableValue = {
  [index: string]: number
}

type TrackerState = {
  values: TrackableValue;
  lastUpdated?: Date;
}

const initialState: TrackerState = {
  values: {},
}

export const trackerSlice = createSlice(
  {
    name: "tracker",
    initialState: initialState,
    reducers: {
      addQuantity: (state, action) => {
        const { entityName, quantity } = action.payload;
        if (state.values[entityName] === undefined) {
          state.values[entityName] = quantity;
        } else {
          state.values[entityName] += quantity;
        }
      }
    },
  }
);

export const { addQuantity } = trackerSlice.actions;

export default trackerSlice.reducer