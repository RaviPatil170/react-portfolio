import React, { Suspense, useEffect, useMemo, useState, type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/userSlice";
import type { RootState, AppDispatch } from "../store/index";
import { selectUsersCount } from "../store/selectors";

const UsersPanel = React.lazy(() => import("./UserPanel"));

export default function VirtualisedList(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const count = useSelector(selectUsersCount);
  const [countToFetch] = useState(500); // configurable

  useEffect(() => {
    dispatch(fetchUsers(countToFetch));
  }, [dispatch, countToFetch]);

  const subtitle = useMemo(() => `Loaded users: ${count}`, [count]);

  return (
    <div className="app-root-forlist">
      <header>
        <h1>Virtualized Large List — Demo</h1>
        <p className="lead">{subtitle}</p>
      </header>

      <main>
        <Suspense fallback={<div className="loader">Loading UI...</div>}>
          <UsersPanel />
        </Suspense>
      </main>

      <footer className="muted">
        Data source: randomuser.me · Example for performance improvements
      </footer>
    </div>
  );
}
