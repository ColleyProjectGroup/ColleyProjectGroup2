import { createBrowserRouter } from 'react-router-dom'
import {
  App,
  ErrorComponent,
  NotFound,
  Admin,
  MyPageRoute
} from 'components/index'
import {
  Home,
  About,
  AdminProducts,
  AdminProductAdd,
  AdminCustomers,
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
    path: '/mypage',
    element: <MyPageRoute />,
    errorElement: <NotFound />,
    children: []
  },
  {
    path: '/admin',
    element: <Admin />,
    errorElement: <NotFound />,
    children: [
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
