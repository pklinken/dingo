import { createSlice } from "@reduxjs/toolkit";

export interface ITrackable {
  name: string
  value: number
  targetValue: number
  unit: string
  quantities: number[]
}

type TrackerState = {
  trackables: ITrackable[];
}

const initialState: TrackerState = {
  trackables: [
    {
      name: "Water",
      value: 0,
      targetValue: 3.5,
      unit: "L",
      quantities: [0.33, 0.5]
    },
    {
      name: "Veg/Fruit",
      value: 0,
      targetValue: 10,
      unit: "servings",
      quantities: [1]
    },
  ]
}

export const trackerSlice = createSlice(
  {
    name: "tracker",
    initialState: initialState,
    reducers: {
      addQuantity: (state, action) => {
        const { trackableName, quantity } = action.payload;
        const trackable = state.trackables.find(t => t.name === trackableName);
        if (trackable) {
          trackable.value += quantity;
        }
      }
    },
  }
);

export const { addQuantity } = trackerSlice.actions;

export default trackerSlice.reducer