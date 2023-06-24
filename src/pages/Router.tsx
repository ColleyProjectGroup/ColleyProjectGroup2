import { createBrowserRouter } from 'react-router-dom'
import {
  App,
  ErrorComponent,
  NotFound,
  AdminPrivateRoute
} from 'components/index'
import {
  Home,
  AdminProducts,
  AdminProductAdd,
  ProductList,
  ProductDetail,
  AdminCustomers,
  AdminDashboard,
  SignInPage,
  SignUpPage,
  Payment,
  AdminSales,
  MyOrders,
  Order
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
        element: <MyOrders />,
        errorElement: <ErrorComponent />
      },
      {
        path: '/mypage/order',
        element: <Order />,
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
      },
      {
        path: 'sales',
        element: <AdminSales />,
        errorElement: <ErrorComponent />
      }
    ]
  }
])
