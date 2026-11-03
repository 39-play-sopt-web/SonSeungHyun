import { createBrowserRouter } from 'react-router';
import Home from '../pages/Home';
import Detail from '../pages/Detail';

const router = createBrowserRouter([
  { path: '/', Component: Home },
  { path: '/movies/:movieId', Component: Detail },
]);

export default router;