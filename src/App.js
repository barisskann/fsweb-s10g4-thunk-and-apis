import React, { useEffect, useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import FavItem from "./components/FavItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnother } from "./actions";
import { FAV_ADD } from "./actions";
import { Spinner } from "reactstrap";

export default function App() {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState(false);

  const { favs, data, loading, error, current } = useSelector(
    ({ favs, data, loading, error, current }) => {
      return { favs, data, loading, error, current };
    }
  );
  useEffect(() => {
    localStorage.setItem("deger", JSON.stringify(favs));
  }, [favs]);
  const handleClick = () => {
    dispatch(fetchAnother());
    setAnswer(false);
  };
  function addToFavs() {
    dispatch({ type: FAV_ADD, payload: data });
  }

  return (
    <div className="wrapper max-w-xl mx-auto px-4 mt-3 head">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          RANDOM JOKE :)
        </NavLink>
        <NavLink
          to="/favs"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Favoriler
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/">
          {data && (
            <div className="fw-bold text-danger d-flex justify-content-between">
              <p className="text-center flex-grow-1 align-self-center ">
                {" "}
                {data.setup}
              </p>
              <button
                onClick={() => setAnswer(!answer)}
                className="btn bg-warning   "
              >
                Answer
              </button>{" "}
            </div>
          )}
          {answer && (
            <p className="fw-bold text-primary text-center w-75 ms-3">
              {data.punchline}{" "}
            </p>
          )}
          {loading && (
            <div className="bg-light border rounded  p-6 text-center shadow-md ">
              {" "}
              <Spinner color="warning">Loading...</Spinner>
            </div>
          )}
          {current && (
            <p className="text-danger fw-bold text-center">
              Do you want any Joke ?
            </p>
          )}

          <div className="flex gap-3 justify-center py-3 mt-4">
            <button
              disabled={loading}
              onClick={handleClick}
              className=" px-4 py-2 -blue-500 btnn"
            >
              {loading ? "Waiting pls" : "TAKE ME A JOKE PLS"}
            </button>

            {!current && (
              <button
                onClick={addToFavs}
                className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
              >
                favorilere ekle{" "}
              </button>
            )}
          </div>
        </Route>

        <Route path="/favs">
          <div className="flex flex-col gap-3">
            {favs.length > 0 ? (
              favs.map((item, sayac) => (
                <FavItem key={sayac} id={item.key} title={item} />
              ))
            ) : (
              <div className="bg-white p-6 text-center shadow-md mb-4">
                Henüz bir favoriniz yok
              </div>
            )}
          </div>
        </Route>
      </Switch>
    </div>
  );
}
