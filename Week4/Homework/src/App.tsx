import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import PostListPage from './pages/PostListPage';
import PostWritePage from './pages/PostWritePage';
import PostDetailPage from './pages/PostDetailPage';

const router = createBrowserRouter([
  { path: '/', element: <AuthPage /> },
   {
    element: <Layout />,
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