import { Link, useLocation } from 'react-router-dom'
import styled from 'styles/pages/admin.module.scss'

export const AdminNav = () => {
  const path: string = useLocation().pathname

  return (
    <nav>
      <h1>Colley Admin</h1>
      <ul>
        <li className={path === '/admin' ? styled.active : ''}>
          <Link to="/admin">Dashboard</Link>
        </li>
        <li className={path === '/admin/customers' ? styled.active : ''}>
          <Link to="/admin/customers">Customers</Link>
        </li>
        <li
          className={
            path === '/admin/products' || path === '/admin/product-add'
              ? styled.active
              : ''
          }>
          <Link to="/admin/products">Products</Link>
        </li>
        <li className={path === '/admin/sales' ? styled.active : ''}>
          <Link to="/admin/sales">Sales</Link>
        </li>
        <li className={styled.home}>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  )
}
