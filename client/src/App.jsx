import './App.css'
import Register from "./pages/Register";
import Login from "./pages/Login";
import MainLayout from './layout/MainLayout';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
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
              {/* <HeroSection /> */}
              {/* <Courses /> */}
              {/* <Footer/> */}
          </>
        },
        {
          path:"login",
          element:<Login />
        },
        {
          path:"register",
          element:<Register />
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
