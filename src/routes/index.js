import Admission from "../pages/admin/Admission/Admission"
import Enquiry from "../pages/admin/Enquiry/Enquiry"
import ForgotPassword from "../pages/auth/ForgotPassword"
import Login from "../pages/auth/Login"
import About from "../pages/public/About"
import Contact from "../pages/public/Contact"
import Home from "../pages/public/Home"
import LandingPage from "../pages/public/LandingPage"
import Services from "../pages/public/Services"


export const authenticatedRoutes = [
    {type:'menu',label:'Dashboard',path:'/dashboard',element:<Home/>,icon:'ri-home-8-line',users:['admin','staff'],children:[]},
    {type:'menu',label:'Enquiry',path:'/about',icon:'ri-questionnaire-fill',users:['admin','staff'],children:[
        {label:'Enquiry',path:'/enquiry',element:<Enquiry />},
        {label:'Follow Up',path:'/followup',element:<Contact/>},
        {label:'Report',path:'/report',element:<Services/>}
    ]},
    {type:'module',label:'Admission',path:'/admission',element:<Admission/>,icon:' ri-user-add-line',users:['admin','staff'],children:[]},
    {type:'module',label:'Fees',path:'/services',element:<Home/>,icon:' ri-coins-line',users:['admin','staff'],children:[]},
    {type:'setting',label:'Setting',path:'/services',element:<Home/>,icon:'bx bx-cog',users:['admin','staff'],children:[
        {label:'Course',path:'/enquiry',element:<Home/>},
        {label:'Fees',path:'/followup',element:<Home/>},
        {label:'Personalization',path:'/report',element:<Home/>}
    ]},
]
export const publicRoutes = [
    {label:'Home',path:'/',element:<Login /> ,icon:'null',users:[],children:[]},
    {label:'About',path:'/about',element:<About/>,icon:'null',users:[],children:[]},
    {label:'Contact',path:'/contact',element:<Contact/>,icon:'null',users:[],children:[]},
    {label:'Services',path:'/services',element:<Services/>,icon:'null',users:[],children:[]},
]
export const authRoutes = [
    {label:'Login',path:'/login',element:<Login /> ,icon:'null',users:[],children:[]},
    {label:'Password Reset',path:'/passwordReset',element:<ForgotPassword /> ,icon:'null',users:[],children:[]},
]