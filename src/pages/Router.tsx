import { createBrowserRouter } from 'react-router-dom';
import { App, ErrorComponent, NotFound } from 'components';
import { Home, About, Admin } from 'pages';

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
        errorElement: <ErrorComponent />,
      },
      {
        path: 'about',
        element: <About />,
        errorElement: <ErrorComponent />,
      },
    ],
  },
  {
    path: '/admin',
    element: <Admin />,
    errorElement: <NotFound />,
  },
]);
