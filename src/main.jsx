import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Mainlayout from './layouts/Mainlayout/Mainlayout';
import './styles/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout />,
    children: [
        {
        index: true,
        element:<Home />
        },

      {
        path: '/courses',
        element: <Courses />,
      },
      {
        path : '/CoureseDetails/:id',
        element: <CourseDetails />
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
