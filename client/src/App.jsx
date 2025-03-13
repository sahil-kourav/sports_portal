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
import CreateTournament from './pages/admin/tournament/CreateTournament';
import EditTournament from './pages/admin/tournament/EditTournament';
import TournamentDetail from './pages/users/TournamentDetail';
import TournamentProgress from './pages/users/TournamentProgress';

import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import MyTournament from './pages/users/MyTournament';

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
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "register",
        element: (
          <AuthenticatedUser>
            <Register />
          </AuthenticatedUser>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-tournaments",
        element: (
          <ProtectedRoute>
            <MyTournament />
          </ProtectedRoute>
        ),
      },
      {
        path: "tournament-detail/:tournamentId",
        element: (
          <ProtectedRoute>
            <TournamentDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "tournament-progress/:tournamentId",
        element: (
          <ProtectedRoute>
            <TournamentProgress />
          </ProtectedRoute>
        ), 
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "tournament",
            element: <TournamentTable />
          },
          {
            path: "tournament/create",
            element: <CreateTournament />
          },
          {
            path: "tournament/:tournamentId",
            element: <EditTournament />
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
