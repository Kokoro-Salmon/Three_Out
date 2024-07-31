const sessionIdToUserMap: Map<string, any> = new Map();

// type User = {
//     name : string;
//     email : string;
// }

const setUser = (id: string, user: any) => {
  sessionIdToUserMap.set(id, user);
};

const getUser = (id: string) => {
  return sessionIdToUserMap.get(id);
};

export { setUser, getUser };
