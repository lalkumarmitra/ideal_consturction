
import PurchaseHistory from "../pages/admin/Transaction/PurchaseHistory"
import SalesHistory from "../pages/admin/Transaction/SalesHistory"
import SimpleTransaction from "../pages/admin/Transaction/SimpleTransaction/SimpleTransaction"
import Transaction from "../pages/admin/Transaction/Transaction"
import TransactionHistory from "../pages/admin/Transaction/TransactionHistory"
import Clients from "../pages/admin/clients/Clients"
import Items from "../pages/admin/items/Items"
import Staffs from "../pages/admin/staffs/Staffs"
import Vehicles from "../pages/admin/vehicles/Vehicles"
import ForgotPassword from "../pages/auth/ForgotPassword"
import Login from "../pages/auth/Login"


import Home from "../pages/public/Home"
import Issues from "../pages/public/Support/Issues"



export const authenticatedRoutes = [
    {type:'menu',label:'Dashboard',path:'/dashboard',element:<Home/>,icon:'ri-home-8-line',users:['admin','staff'],children:[]},
    {type:'menu',label:'Transactions',icon:'ri-swap-line',users:['admin','staff'],children:[
        {label:'Transactions List',path:'/transaction',element:<Transaction/>,users:['admin','staff']},
        {label:'New Transaction',path:'/transaction/list',element:<SimpleTransaction/>,users:['admin','staff']},
    ]},
    {type:'menu',label:'Staffs',path:'/staffs',element:<Staffs/>,icon:'ri-team-line',users:['admin'],children:[]},
    {type:'menu',label:'Product/Items',path:'/items',element:<Items />,icon:'ri-shopping-basket-2-line',users:['admin','staff'],children:[]},
    {type:'menu',label:'Clients/location',path:'/clients',element:<Clients />,icon:'ri-map-pin-line',users:['admin','staff'],children:[]},
    {type:'menu',label:'Vehicles',path:'/vehicles',element:<Vehicles />,icon:'ri-truck-line',users:['admin','staff'],children:[]},
    {type:'menu',label:'Help And Support',path:'/help-and-support',element:<Issues />,icon:' ri-customer-service-2-fill',users:['admin','staff'],children:[]},

    {type:'module',label:'Transaction History',icon:'ri-history-line',users:['admin','staff'],children:[
        {label:'All History',path:'/transaction/history',element:<TransactionHistory/>,users:['admin']},
        {label:'Purchase History',path:'/transaction/purchase/history',element:<PurchaseHistory/>,users:['admin']},
        {label:'Sale History',path:'/transaction/sale/history',element:<SalesHistory/>,users:['admin']},
    ]},

    // {type:'setting',label:'Setting',icon:'bx bx-cog',users:['admin','staff'],children:[
    //     {label:'Roles',path:'/roles',element:<Home/>,users:['admin']},
    // ]},

    
]
export const publicRoutes = [
    
]
export const authRoutes = [
    {label:'Home',path:'/',element:<Login /> ,icon:'null',users:[],children:[]},
    {label:'Login',path:'/login',element:<Login /> ,icon:'null',users:[],children:[]},
    {label:'Password Reset',path:'/passwordReset',element:<ForgotPassword /> ,icon:'null',users:[],children:[]},
]