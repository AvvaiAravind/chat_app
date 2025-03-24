export type UserType = {
  id: string;
  name: string;
  room: string;
};
export type UsersStateType = {
  users: UserType[];
  setUsers: (updatedUsers: UserType[]) => void;
};
