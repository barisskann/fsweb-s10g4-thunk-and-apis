import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FAV_REMOVE } from "../actions";

function FavItem({ title }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    setOpen(!open);
  };

  const handleRemove = (title) => {
    dispatch({ type: FAV_REMOVE, payload: title.punchline });
  };
  return (
    <div className="bg-white shadow hover:shadow-lg p-3 pl-5 flex  group transition-all item justify-content-between">
      <div className="d-flex flex-column">
        <div className="flex-1 pr-4 fw-bold text-dark">{title.setup}</div>
        <div className="text-primary fw-bold">{open && title.punchline}</div>
      </div>
      <div className="d-flex justify-content-end">
        {" "}
        <button
          onClick={() => {
            handleRemove(title);
          }}
          className="transition-all px-3 py-2 block text-sm rounded bg-rose-700 text-white opacity-30 group-hover:opacity-100 align-self-baseline"
        >
          Çıkar
        </button>
        <button
          onClick={handleClick}
          className="mx-2 opacity-30 bg-blue-500 py-1 group-hover:opacity-100 align-self-baseline rounded "
        >
          ANSWER
        </button>
      </div>
    </div>
  );
}

export default FavItem;
