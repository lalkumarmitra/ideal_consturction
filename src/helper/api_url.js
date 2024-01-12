import {post,get, del,put, use,API_URL} from './api_helper';

export const auth={
    login: data =>post("/login",data),
}

// student api url
export const staff={
    add: data =>post("/user",data),
    list: () =>get("/users/type/staff"),
    delete: (id) =>del(`/user/${id}/destroy`),
    changeStatus: data=>post(`/user/set-status`,data)
}
export const item = {
    add:data=>post("/item",data),
    list:()=>get('/items'),
    delete:(id)=>del(`/item/${id}/destroy`)
}
export const baseURL=API_URL;


