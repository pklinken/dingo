import classNames from "classnames";
import { formatDistanceToNow, isSameDay, parseISO } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addQuantity, Entity, entities } from "./trackerSlice";

const ensureTwoDecimals = (n: number): string => {
  if (!Number.isInteger(n)) {
    return n.toFixed(2);
  } else {
    return n.toString();
  }
};

const Quantity = (q: number): JSX.Element => {
  return (
    <div className="text-base p-1 mr-4 bg-blue-200 rounded-lg hover:cursor-pointer">
      +{ensureTwoDecimals(q)}
    </div>
  );
};

const Timestamp = (d: string): JSX.Element => {
  const date = parseISO(d);
  const timePeriod = formatDistanceToNow(date);

  return (
    <span className="text-sm text-slate-300 text-left">
      updated {timePeriod} ago
    </span>
  );
};

const Trackable = (e: Entity): JSX.Element => {
  const entityValue = useAppSelector((state) => state.tracker.values[e.name]);

  const { quantity, updated } =
    entityValue && isSameDay(new Date(), Date.parse(entityValue.updated))
      ? entityValue
      : { quantity: 0, updated: undefined };

  const dispatch = useAppDispatch();

  const bgColor = quantity >= e.targetValue ? "bg-green-200" : "bg-red-200";

  return (
    <div key={e.name} className="mb-4">
      <div className="flex items-baseline">
        <div className="text-2xl">{e.name}:</div>
        <div className={classNames(bgColor, "text-xl mx-2 p-1 rounded-lg")}>
          {ensureTwoDecimals(quantity)} {e.unit}
        </div>
        {e.quantities.map((q) => (
          <div key={q} onClick={() => dispatch(addQuantity(e.name, q))}>
            {Quantity(q)}
          </div>
        ))}
      </div>
      {updated && Timestamp(updated)}
    </div>
  );
};

export function Tracker() {
  return (
    <div>
      <div className="text-4xl pb-8">Today</div>
      {entities.map(Trackable)}
    </div>
  );
}
