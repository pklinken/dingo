import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    }
  ]


export type EntityValue = {
  [index: string]: {
    quantity: number;
    updated: string; // Always UTC
  }
}

export type TrackerState = {
  values: EntityValue;
}

const initialState: TrackerState = {
  values: {},
}

export const trackerSlice = createSlice(
  {
    name: "tracker",
    initialState: initialState,
    reducers: {
      addQuantity: {
        reducer:
          (state, action: PayloadAction<{ entityName: string, quantity: number, now: string }>) => {
            const { entityName, quantity, now } = action.payload;
            if (state.values[entityName] === undefined) {
              state.values[entityName] = { quantity: quantity, updated: now }
            } else {
              state.values[entityName].quantity += quantity;
              state.values[entityName].updated = now;
            }
          },
        prepare: (entityName: string, quantity: number) => {
          return {
            payload: {
              entityName,
              quantity,
              now: new Date().toISOString()
              //now: (addDays(new Date(), -1)).toISOString()
            }
          }
        }
      }
    },
  }
);

export const { addQuantity } = trackerSlice.actions;

export default trackerSlice.reducer