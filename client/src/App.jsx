import './App.css'
import Register from "./pages/Register";
import Login from "./pages/Login";
import MainLayout from './layout/MainLayout';
import Navbar from './components/Navbar';
import TournamentFeatures from './components/tournamentFeature';
import Footer from './components/footer';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import Profile from './pages/users/profile';
import Tournament from './pages/users/Tournament';
import Tournaments from './pages/users/Tournaments';
import HeroSection from './pages/users/HeroSection';
// import Footer from './components/Footer';

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
              {/* <Footer/> */}
          <Navbar/>
          <TournamentFeatures/>
              {/* <HeroSection /> */}
              {/* <Courses /> */}
              <Footer/>
          </>
        },
        {
          path:"login",
          element:<Login />
        },
        {
          path:"register",
          element:<Register />
        },
        {
          path:"profile",
          element:<Profile />
        }
      ],
    },
  ])

  const App = () => {
    return (
    <>
      <main>
        <RouterProvider router={appRouter}/>
      </main>
    </>
  )
}

export default App
