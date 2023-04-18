import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays } from "date-fns";

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
      quantities: [1 / 3, 0.5]
    },
    {
      name: "Veg/Fruit",
      targetValue: 10,
      unit: "servings",
      quantities: [1]
    },
    {
      name: "Psyllium",
      targetValue: 2,
      unit: "dose",
      quantities: [1]
    },
    {
      name: "Vit. D",
      targetValue: 0,
      unit: "pill",
      quantities: [1]
    },
    {
      name: "Omega 3",
      targetValue: 0,
      unit: "capsule",
      quantities: [1]
    },
    {
      name: "Balancing exercise",
      targetValue: 1,
      unit: "session",
      quantities: [1]
    },
    {
      name: "Foot grab exercise",
      targetValue: 1,
      unit: "session",
      quantities: [1]
    },
  ]

export type ChangeEvent = {
  entityName: string;
  quantity: number;
  timestamp: string;
}

export type TrackerState = {
  events: ChangeEvent[]
}

const initialState: TrackerState = {
  events: []
}

export const trackerSlice = createSlice(
  {
    name: "tracker",
    initialState: initialState,
    reducers: {
      entityChanged: {
        reducer:
          (state, action: PayloadAction<{ entityName: string, quantity: number, now: string }>) => {
            const { entityName, quantity, now } = action.payload;
            state.events.push({ entityName, quantity, timestamp: now })
          }
        ,
        prepare: (entityName: string, quantity: number) => {
          return {
            payload: {
              entityName,
              quantity,
              now: new Date().toISOString()
              // now: (addDays(new Date(), -1)).toISOString()
            }
          }
        }
      }
    },
  }
);

export const trackerActions = trackerSlice.actions;

export default trackerSlice.reducer