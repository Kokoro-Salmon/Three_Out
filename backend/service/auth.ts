const sessionIdToUserMap: Map<string,User> = new Map();

type User = {
    name : string;
    email : string;
}

const setUser = (id:string , user:User ) => {
    sessionIdToUserMap.set(id,user);
}

const getUser = (id:string) => {
    return sessionIdToUserMap.get(id);
}

export { setUser, getUser };