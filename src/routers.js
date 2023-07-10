import { createBrowserRouter } from 'react-router-dom';
import FindId from './pages/FindId';
import FindPassword from './pages/FindPassword';
import SingUp from './pages/Signup';
import ChangePassword from './pages/ChangePassword';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/findid',
    element: <FindId />,
  },
  {
    path: '/findpassword',
    element: <FindPassword />,
  },
  {
    path: '/signup',
    element: <SingUp />,
  },
  {
    path: '/change/password',
    element: <ChangePassword />,
  },
]);

export default router;
