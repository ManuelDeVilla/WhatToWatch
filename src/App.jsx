import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './Layout/RootLayout.jsx';
import Home, { homeLoader } from './Home.jsx';
import ShowDetails, { showDetailsLoader } from './ShowDetailsComponent/ShowDetails.jsx';
import ShowLists, { showListLoader } from './BrowseComponent/ShowLists.jsx';
import PersonDetails, { personDetailsLoader } from './ShowDetailsComponent/PersonDetails.jsx';
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
