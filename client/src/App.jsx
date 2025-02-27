import './App.css'
import Register from "./pages/Register";
import Login from "./pages/Login";
import MainLayout from './layout/MainLayout';
import Footer from './components/Footer';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import Profile from './pages/users/profile';
import Tournaments from './pages/users/Tournaments';
import HeroSection from './pages/users/HeroSection';
import Sidebar from "./pages/admin/Sidebar";
import TournamentTable from './pages/admin/tournament/TournamentTable';
import Dashboard from './pages/admin/Dashboard';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element:
          <>
            <HeroSection />
            <Tournaments />
            <Footer />
          </>
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "tournament",
            element: <TournamentTable />
          },
        ]
      }
    ],
  },
])

const App = () => {
  return (
    <>
      <main>
        <RouterProvider router={appRouter} />
      </main>
    </>
  )
}

export default App
