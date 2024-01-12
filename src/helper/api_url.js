import {post,get, del,put, use,API_URL} from './api_helper';

export const auth={
    login: data =>post("/login",data),
}

// student api url
export const staff={
    add: data =>post("/staff",data),
    list: (callback) =>get("/users/type/staff",callback),
    delete: (id) =>del(`/user/${id}`),
}

export const baseURL=API_URL;


