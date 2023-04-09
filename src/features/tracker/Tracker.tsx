import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addQuantity, ITrackable } from "./trackerSlice";

const Quantity = (q: number): JSX.Element => {

  return (
    <div className="text-base p-1 mr-4 bg-blue-200 rounded-lg hover:cursor-pointer"
    >
      +{q}
    </div>
  );
};

const Trackable = (t: ITrackable): JSX.Element => {
  const dispatch = useAppDispatch();

  const bgColor = (t: ITrackable) => t.value >= t.targetValue ? "bg-green-200" : "bg-red-200";

  const canBeFraction = (t: ITrackable) => t.quantities.some(q => !Number.isInteger(q))

  return (
    <div className="flex items-baseline mb-4">
      <div className="text-2xl">
        {t.name}:
      </div>
      <div className={classNames(bgColor(t), "text-xl mx-2 p-1 rounded-lg")}>
        {canBeFraction(t) ? t.value.toFixed(2) : t.value} {t.unit}
      </div>
      {t.quantities.map(q => (<div onClick={() => dispatch(addQuantity({
        trackableName: t.name,
        quantity: q
      }))}>
        {Quantity(q)}
      </div>))}
    </div>
  );
};

export function Tracker() {
  const state = useAppSelector(state => state.tracker);
  return (
    <div>
      <div className="text-4xl pb-8">Today</div>
      {state.trackables.map(Trackable)}
    </div>
  );
}