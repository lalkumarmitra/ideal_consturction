import {post,get, del,put, use} from './api_helper';

export const auth={
    login: data =>post("/login",data),
}

// student api url
export const staff={
    add: data =>post("/users/type/staff",data),
    list: () =>get("users/role-type/student"),
    delete: (id) =>del(`/user/${id}`),
}



