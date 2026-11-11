import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import PostListPage from './pages/PostListPage';
import PostWritePage from './pages/PostWritePage';
import PostDetailPage from './pages/PostDetailPage';
import { requireAuthLoader } from './utils/auth';

const router = createBrowserRouter([
  { path: '/', element: <AuthPage /> },
   {
    element: <Layout />,
    loader: requireAuthLoader,
    children: [
      { path: '/posts', element: <PostListPage /> },
      { path: '/posts/new', element: <PostWritePage /> },
      { path: '/posts/:postId', element: <PostDetailPage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;