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
  Order,
  Cart,
  Success,
  WishList,
  ModifyPassword
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
        path: 'mypage',
        element: <MyOrders />,
        errorElement: <ErrorComponent />
      },
      {
        path: 'mypage/order',
        element: <Order />,
        errorElement: <ErrorComponent />
      },
      {
        path: 'mypage/password',
        element: <ModifyPassword />,
        errorElement: <ErrorComponent />
      },
      {
        path: 'mypage/wishlist',
        element: <WishList />,
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
      },
      {
        path: 'cart',
        element: <Cart />,
        errorElement: <ErrorComponent />
      },
      {
        path: 'success',
        element: <Success />,
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
