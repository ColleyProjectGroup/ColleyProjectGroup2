import { createBrowserRouter } from 'react-router-dom'
import { App, ErrorComponent, NotFound, Admin } from 'components/index'
import {
  Home,
  About,
  AdminProducts,
  AdminProductAdd,
  ProductList,
  ProductDetail
} from 'pages/index'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Home />,
        errorElement: <ErrorComponent />
      },
      {
        path: 'about',
        element: <About />,
        errorElement: <ErrorComponent />
      },
      {
        path: 'pay',
        element: <About />,
        errorElement: <ErrorComponent />
      },
      {
        path: 'productlist',
        element: <ProductList />,
        errorElement: <ErrorComponent />
      },
      {
        path: 'products/:id',
        element: <ProductDetail />,
        errorElement: <ErrorComponent />
      }
    ]
  },
  {
    path: '/admin',
    element: <Admin />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'products',
        element: <AdminProducts />,
        errorElement: <ErrorComponent />
      },
      {
        path: 'product-add',
        element: <AdminProductAdd />,
        errorElement: <ErrorComponent />
      }
    ]
  }
])
