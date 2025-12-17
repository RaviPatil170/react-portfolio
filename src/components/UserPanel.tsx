import React, { useCallback, useMemo, useState, type JSX } from "react";
import { FixedSizeList as List } from "react-window";
import type { ListChildComponentProps } from "react-window";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredUsers } from "../store/selectors";
import type { RootState } from "../store/index";
import type { User } from "../store/userSlice";

// small row component (memoized)
const Row = React.memo(function Row({
  data,
  index,
  style,
}: ListChildComponentProps) {
  const user: User = data[index];
  return (
    <div className="user-row" style={style}>
      <img src={user.thumbnail} className="user-avatar" />
      <div className="user-meta">
        <div className="user-name">{user.name}</div>
        <div className="user-email">{user.email}</div>
      </div>
      <div className="user-country">{user.country}</div>
    </div>
  );
});

export default function UsersPanel(): JSX.Element {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 100;
  const [query, setQuery] = useState("");
  const filteredSelector = useMemo(() => selectFilteredUsers(query), [query]);
  const users = useSelector((state: RootState) => filteredSelector(state));
  const loading = useSelector((s: RootState) => s.users.loading);
  const dispatch = useDispatch();

  // pagination logic
  const totalPages = Math.max(1, Math.ceil(users.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return users.slice(start, start + PAGE_SIZE);
  }, [users, currentPage]);

  const onSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  }, []);

  const handlePrev = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const handleNext = useCallback(
    () => setPage((p) => Math.min(totalPages, p + 1)),
    [totalPages]
  );

  // react-window list height and row height
  const rowHeight = 72;
  const listHeight = Math.min(600, rowHeight * pageData.length);

  return (
    <section className="user-panel-card">
      <div className="user-controls">
        <input
          aria-label="Search users"
          className="user-search"
          placeholder="Search by name or email"
          value={query}
          onChange={onSearch}
        />
        <div className="user-pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Prev
          </button>
          <span>
            Page {currentPage} / {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>

      {loading ? (
        <div className="user-loaderr">Fetching users...</div>
      ) : (
        <List
          height={listHeight}
          itemCount={pageData.length}
          itemSize={rowHeight}
          width={"100%"}
          itemData={pageData}
        >
          {Row}
        </List>
      )}
    </section>
  );
}
