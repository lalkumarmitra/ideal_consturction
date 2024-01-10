import React from 'react'
import { NavLink } from 'react-router-dom'
import { publicRoutes } from '../../../routes'

function Header() {
  return (
    <>
        <ul>
            {publicRoutes.map((route,idx)=>(
                <li key={idx} >
                    <NavLink to={route.path} >{route.label}</NavLink>
                </li>
            ))}
        </ul>
    </>
  )
}

export default Header