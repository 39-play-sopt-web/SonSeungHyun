import { createBrowserRouter, RouterProvider } from 'react-router';
import AuthPage from './pages/AuthPage';

const router = createBrowserRouter([
  { path: '/', element: <AuthPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;