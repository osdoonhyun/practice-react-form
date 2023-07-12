import { createBrowserRouter } from 'react-router-dom';
import SingUp from './pages/Signup';
import ChangePassword from './pages/ChangePassword';
import Login from './pages/Login';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
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
