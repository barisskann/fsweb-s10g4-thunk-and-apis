import React, { useState  } from "react";

function Item({ data }) {
  return (
    <div className="shadow-md bg-white text-center">
      <p className="text-2xl p-10 fw-bold ">{data.title}</p>
    </div>
  );
}

export default Item;
