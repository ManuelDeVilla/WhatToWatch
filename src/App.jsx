import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './Layout/root/RootLayout.jsx';
import Home, {homeLoader} from './Layout/home/Home.jsx';
import ShowDetails, { showDetailsLoader } from './Layout/details/shows/ShowDetails.jsx';
import ShowLists, { showListLoader } from './Layout/show_list/ShowLists.jsx';
import PersonDetails, {personDetailsLoader} from './Layout/details/persons/PersonDetails.jsx';
import LoginRedirect from './components/registration/auth/LoginRedirect.jsx';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
          loader: homeLoader
        },

        // Types of lists [movie, tv, person]
        {
          path: ':type',
          element: <ShowLists />,
          loader: showListLoader
        },
        {
          path: '/person/:id',
          element: <PersonDetails />,
          loader: personDetailsLoader
        },
        {
          path: ':type/:id',
          element: <ShowDetails />,
          loader: showDetailsLoader
        },

        // Watchlist Group Page
        {
          path: '/watchgroup'
        },

        // AUTH
        // For Logging in using google
        {
          path: 'auth/callback',
          element: <LoginRedirect />
        }
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
