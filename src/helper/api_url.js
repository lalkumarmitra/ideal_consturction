import {post,get, del,put, use,API_URL} from './api_helper';

export const auth={
    login: data =>post("/login",data),
    validate:()=>get('/validate'),
}

export const staff={
    add: data =>post("/user",data),
    update: data =>post("/user/update",data),
    list: () =>get("/users/type/staff"),
    delete: (id) =>del(`/user/${id}/destroy`),
    changeStatus: data=>post(`/user/set-status`,data)
}
export const item = {
    add:data=>post("/item",data),
    update:data=>post("/item/update",data),
    list:()=>get('/items'),
    delete:(id)=>del(`/item/${id}/destroy`)
}

export const client = {
    add:data=>post('/client',data),
    update:data=>post('/client/update',data),
    list:()=>get('/clients'),
    delete:id=>del(`/client/${id}/destroy`)
}
export const vehicles = {
    add:data=>post('vehicle',data),
    update:data=>post('vehicle/update',data),
    list:()=>get('/vehicles'),
    delete:id=>del(`/vehicle/${id}/destroy`)
}
export const transaction = {
    add:data=>post('/transaction',data),
    addsell:data=>post('/transaction/sell',data),
    list:()=>get('/transactions'),
    delete:(id)=>del('/transaction/'+id),
    history:filters=>post('/transaction/history',filters)
}
export const role = {
    list:()=>get('/roles')
}

export const ASSET_URL='https://idealconstruction.online/application/';