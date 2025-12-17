import { createSelector } from "reselect";
import type { RootState } from "./index";
import type { User } from "./userSlice";

const usersState = (s: RootState) => s.users;

export const selectUsers = createSelector(usersState, (u) => u.items);

export const selectUsersCount = createSelector(
  usersState,
  (u) => u.items.length
);

export const selectFilteredUsers = (query: string) =>
  createSelector(selectUsers, (users) => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  });
