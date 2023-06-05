import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styles/pages/admin.module.scss'

export const AdminNav = () => {
  const path: string = useLocation().pathname

  return (
    <nav>
      <h1>Colley Admin</h1>
      <ul>
        <li className={path === '/admin' ? styled.active : null}>
          <Link to="/admin">Dashboard</Link>
        </li>
        <li className={path === '/admin/customers' ? styled.active : null}>
          <Link to="/admin/customers">Customers</Link>
        </li>
        <li
          className={
            path === '/admin/products' || path === '/admin/product-add'
              ? styled.active
              : null
          }>
          <Link to="/admin/products">Products</Link>
        </li>
        <li className={path === '/admin/sales' ? styled.active : null}>
          <Link to="/admin/sales">Sales</Link>
        </li>
      </ul>
    </nav>
  )
}
