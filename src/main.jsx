import { createRoot } from 'react-dom/client';
import Mainlayout from './layouts/Mainlayout/Mainlayout';
import './styles/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Register from './pages/Register';
import Login from './pages/Login';
import { Provider } from 'react-redux';
import store from './store';
import DashboardHome from './Dashboard/DashboardHome';
import DashboardLayout from './Dashboard/DashboardLayout';
import CoursesPage from './Dashboard/DashboardCourses/Couses';
import Instructor from './Dashboard/DashboardInstructors/Instructor';
import Shoppinglist from './store/Shoppinglist';
import CheckoutContainer from './store/Checkout';
import PurchaseComplete from './store/purchasecompelet';
import { Toaster } from 'react-hot-toast';
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
       { path: "/courses/:id", element: <CourseDetails /> },
      {
        path : 'Register',
        element: <Register />
      },
      {
        path: 'Login',
        element : <Login />
      },
      {
    path : 'Shoppinglist',
    element : <Shoppinglist/>
  }
  ,
  {    path : 'Checkout',
    element : <CheckoutContainer/>},
    {
      path : 'purchase-complete',
      element : <PurchaseComplete/>
    }
     
    ],
  },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children :[{
                index: true, element: <DashboardHome/>

      },
    {
      path: 'CoursesPage', 
      element: <CoursesPage />
    },
  {
    path : 'InstructorsPage',
    element: <Instructor/>
  }
  
  
  ]
      
    }
  
]);

createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </QueryClientProvider>
  </Provider>

);
