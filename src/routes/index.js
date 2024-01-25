
import Clients from "../pages/admin/clients/Clients"
import Items from "../pages/admin/items/Items"
import Staffs from "../pages/admin/staffs/Staffs"
import Vehicles from "../pages/admin/vehicles/Vehicles"
import ForgotPassword from "../pages/auth/ForgotPassword"
import Login from "../pages/auth/Login"


import Home from "../pages/public/Home"



export const authenticatedRoutes = [
    {type:'menu',label:'Dashboard',path:'/dashboard',element:<Home/>,icon:'ri-home-8-line',users:['admin','staff'],children:[]},
    {type:'menu',label:'Transactions',path:'/transactions',element:<Home/>,icon:'ri-swap-line',users:['admin','staff'],children:[]},
    {type:'menu',label:'Staffs',path:'/staffs',element:<Staffs/>,icon:'ri-team-line',users:['admin'],children:[]},
    {type:'menu',label:'Product/Items',path:'/items',element:<Items />,icon:'ri-shopping-basket-2-line',users:['admin','staff'],children:[]},
    {type:'menu',label:'Clients/location',path:'/clients',element:<Clients />,icon:'ri-map-pin-line',users:['admin','staff'],children:[]},
    {type:'menu',label:'Vehicles',path:'/vehicles',element:<Vehicles />,icon:'ri-truck-line',users:['admin','staff'],children:[]},
    {type:'module',label:'Transaction History',icon:'ri-history-line',users:['admin','staff'],children:[
        {label:'Product',path:'/producthistory',element:<Home/>,users:['admin','staff']},
        {label:'Location/clients',path:'/clienthistory',element:<Home/>},
        {label:'Vehicles',path:'/vehiclehistory',element:<Home/>}
    ]},
    {type:'setting',label:'Setting',icon:'bx bx-cog',users:['admin','staff'],children:[
        {label:'Roles',path:'/roles',element:<Home/>,users:['admin']},
    ]},

    
]
export const publicRoutes = [
]
export const authRoutes = [
    {label:'Home',path:'/',element:<Login /> ,icon:'null',users:[],children:[]},
    {label:'Login',path:'/login',element:<Login /> ,icon:'null',users:[],children:[]},
    {label:'Password Reset',path:'/passwordReset',element:<ForgotPassword /> ,icon:'null',users:[],children:[]},
]