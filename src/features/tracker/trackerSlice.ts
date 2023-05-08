import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { isSameDay } from "date-fns";

export interface Entity {
  name: string;
  targetValue: number;
  unit: string;
  quantities: number[];
}

export const entities: Entity[] = [
  {
    name: "Water",
    targetValue: 3.5,
    unit: "L",
    quantities: [1 / 3, 0.5],
  },
  {
    name: "Veg/Fruit",
    targetValue: 10,
    unit: "servings",
    quantities: [1],
  },
  {
    name: "Say something nice to yourself",
    targetValue: 10,
    unit: "times",
    quantities: [1],
  },
  {
    name: "Celebrate a win",
    targetValue: 10,
    unit: "times",
    quantities: [1],
  },
  {
    name: "Psyllium",
    targetValue: 2,
    unit: "dose",
    quantities: [1],
  },
  {
    name: "Vit. D",
    targetValue: 0,
    unit: "pill",
    quantities: [1],
  },
  {
    name: "Omega 3",
    targetValue: 0,
    unit: "capsule",
    quantities: [1],
  },
  {
    name: "Zinc",
    targetValue: 1,
    unit: "pill",
    quantities: [1],
  },
  {
    name: "Balancing exercise",
    targetValue: 1,
    unit: "session",
    quantities: [1],
  },
  {
    name: "Foot grab exercise",
    targetValue: 1,
    unit: "session",
    quantities: [1],
  },
];

export type ChangeEvent = {
  key: string;
  entityName: string;
  quantity: number;
  timestamp: string;
};

export type TrackerState = {
  events: ChangeEvent[];
};

const initialState: TrackerState = {
  events: [],
};

export const trackerSlice = createSlice({
  name: "tracker",
  initialState: initialState,
  reducers: {
    entityChanged: {
      reducer: (state, action: PayloadAction<ChangeEvent>) => {
        state.events.push(action.payload);
      },
      prepare: (
        entityName: string,
        quantity: number
      ): { payload: ChangeEvent } => {
        return {
          payload: {
            key: nanoid(),
            entityName,
            quantity,
            timestamp: new Date().toISOString(),
            // timestamp: (addDays(new Date(), -1)).toISOString()
          },
        };
      },
    },
    entityUndoLast: {
      reducer: (state, action: PayloadAction<Date>) => {
        const now = action.payload;

        const lastEvent = state.events[state.events.length - 1];
        if (isSameDay(now, Date.parse(lastEvent.timestamp))) state.events.pop();
      },
      prepare: () => ({ payload: new Date() }),
    },
  },
});

export const trackerActions = trackerSlice.actions;

export default trackerSlice.reducer;

// export const selectTrackerState = (state: RootState) => state.tracker;

// export const selectEvents = (state: TrackerState) => state.events;

export const selectEventsOnSameDay = (events: ChangeEvent[], date: Date) =>
  events.filter((event) => isSameDay(date, Date.parse(event.timestamp)));
