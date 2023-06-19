import { createBrowserRouter } from 'react-router-dom'
import {
  App,
  ErrorComponent,
  NotFound,
  AdminPrivateRoute
} from 'components/index'
import {
  Home,
  About,
  AdminProducts,
  AdminProductAdd,
  ProductList,
  ProductDetail,
  AdminCustomers,
  AdminDashboard,
  SignInPage,
  SignUpPage,
  Payment
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
        path: 'payment',
        element: <Payment />,
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
      },
      {
        path: 'signup',
        element: <SignUpPage />,
        errorElement: <ErrorComponent />
      },
      {
        path: 'signin',
        element: <SignInPage />,
        errorElement: <ErrorComponent />
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminPrivateRoute />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <AdminDashboard />,
        errorElement: <ErrorComponent />
      },
      {
        path: 'customers',
        element: <AdminCustomers />,
        errorElement: <ErrorComponent />
      },
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
