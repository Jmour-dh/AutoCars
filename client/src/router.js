import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { lazy } from "react";
import ErrorPage from "./components/pages/errorpage/ErrorPage";
import { rootLoader } from "./components/loaders/rootLoader";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const Home = lazy(() => import("./components/pages/home/Home"));
const Signin = lazy(() => import("./components/pages/cnx/Signin"));
const Signup = lazy(() => import("./components/pages/cnx/Signup"));
const About = lazy(() => import("./components/pages/About/About"));
const Accessoire = lazy(() =>
  import("./components/pages/Accessoire/Accessoire")
);
const Occasion = lazy(() =>
  import("./components/pages/Occasion/Occasion")
);

const Profile = lazy(() => import("./components/pages/profile/Profile"));
const ProfilePersonnel = lazy(() => import("./components/pages/profilePersonnel/profilePersonnel"));
const Admin = lazy(() => import("./components/pages/admin/Admin"));
const AdminReservations = lazy(() =>
  import("./components/pages/admin/pages/AdminReservations/AdminReservations")
);
const AdminReservationsList = lazy(() =>
  import(
    "./components/pages/admin/pages/AdminReservations/pages/AdminReservationList/AdminReservationList"
  )
);
const AdminUsers = lazy(() =>
  import("./components/pages/admin/pages/AdminUsers/AdminUsers")
);
const AdminContacts = lazy(() =>
  import("./components/pages/admin/pages/AdminContacts/AdminContacts")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: rootLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/occasion",
        element: <Occasion />,
      },
      {
        path: "/accessoire",
        element: <Accessoire />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },

      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <Admin />,
          </ProtectedRoute>
        ),
        children: [
          {
            path: "reservations",
            element: <AdminReservations />,
            children: [
              {
                path: "list",
                element: <AdminReservationsList />,
              },
            ],
          },
          {
            path: "users",
            element: <AdminUsers />,
          },
          {
            path: "contacts",
            element: <AdminContacts />,
          },
        ],
      },
      {
        path: "/profilePersonnel",
        element: (
          <ProtectedRoute>
            <ProfilePersonnel />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
