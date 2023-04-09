import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addQuantity, Entity, entities } from "./trackerSlice";

const Quantity = (q: number): JSX.Element => {

  return (
    <div className="text-base p-1 mr-4 bg-blue-200 rounded-lg hover:cursor-pointer"
    >
      +{q}
    </div>
  );
};

const Trackable = (e: Entity): JSX.Element => {
  const value = useAppSelector(state => state.tracker.values[e.name]) || 0;

  const dispatch = useAppDispatch();

  const bgColor = value >= e.targetValue ? "bg-green-200" : "bg-red-200";

  const canBeFraction = (t: Entity) => t.quantities.some(q => !Number.isInteger(q))

  return (
    <div key={e.name} className="flex items-baseline mb-4">
      <div className="text-2xl">
        {e.name}:
      </div>
      <div className={classNames(bgColor, "text-xl mx-2 p-1 rounded-lg")}>
        {canBeFraction(e) ? value.toFixed(2) : value} {e.unit}
      </div>
      {e.quantities.map(q => (<div key={q} onClick={() => dispatch(addQuantity({
        entityName: e.name,
        quantity: q
      }))}>
        {Quantity(q)}
      </div>))}
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