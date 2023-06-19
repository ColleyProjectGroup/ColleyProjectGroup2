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
  AdminCustomers,
  AdminDashboard,
  SignInPage,
  SignUpPage
} from 'pages/index'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      //하위 객체들처럼 페이지 추가시 생성해주세요
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
