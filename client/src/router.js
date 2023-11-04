import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import { lazy } from "react";
import ErrorPage from "./components/pages/errorpage/ErrorPage";
import { rootLoader } from "./components/loaders/rootLoader";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const Home = lazy(() => import("./components/pages/home/Home"));

const MarqueList = lazy(() =>
  import("./components/pages/home/components/MarqueList/MarqureList")
);

const Signin = lazy(() => import("./components/pages/cnx/Signin"));
const Signup = lazy(() => import("./components/pages/cnx/Signup"));
const About = lazy(() => import("./components/pages/About/About"));
const Occasion = lazy(() => import("./components/pages/Occasion/Occasion"));

/*Profile Car */

const ProfileCar = lazy(() =>
  import("./components/pages/ProfileCar/ProfileCar")
);

/*Profile Client */

const Profile = lazy(() => import("./components/pages/profile/Profile"));
const ProfileClient = lazy(() =>
  import("./components/pages/profile/pages/ProfileClient/ProfileClient")
);
const Dashboard = lazy(() =>
  import(
    "./components/pages/profile/pages/ProfileClient/pages/Dashboard/Dashboard"
  )
);
const ProfileC = lazy(() =>
  import(
    "./components/pages/profile/pages/ProfileClient/pages/ProfileC/ProfileC"
  )
);
const ProfileClientEdit = lazy(() =>
  import(
    "./components/pages/profile/pages/ProfileClient/pages/ProfileCLientEdit/ProfileClientEdit"
  )
);

const ProfilePersonnel = lazy(() =>
  import("./components/pages/profilePersonnel/profilePersonnel")
);
const Admin = lazy(() => import("./components/pages/admin/Admin"));

/* Admin Personnel*/
const AdminPersonnel = lazy(() =>
  import("./components/pages/admin/pages/AdminPersonnel/AdminPersonnel")
);
const AdminPersonnelList = lazy(() =>
  import(
    "./components/pages/admin/pages/AdminPersonnel/pages/AdminPersonnelList/AdminPersonnelList"
  )
);
const AdminPersonnelAdd = lazy(() =>
  import(
    "./components/pages/admin/pages/AdminPersonnel/pages/AdminPersonnelAdd/AdminPersonnelAdd"
  )
);
const AdminPersonnelEdit = lazy(() =>
  import(
    "./components/pages/admin/pages/AdminPersonnel/pages/AdminPersonnelEdit/AdminPersonnelEdit"
  )
);

/*Admin CLient*/
const AdminUsers = lazy(() =>
  import("./components/pages/admin/pages/AdminUsers/AdminUsers")
);
const AdminUsersList = lazy(() =>
  import(
    "./components/pages/admin/pages/AdminUsers/pages/AdminUsersList/AdminUsersList"
  )
);
const AdminUsersAdd = lazy(() =>
  import(
    "./components/pages/admin/pages/AdminUsers/pages/AdminUsersAdd/AdminUsersAdd"
  )
);
const AdminUsersEdit = lazy(() =>
  import(
    "./components/pages/admin/pages/AdminUsers/pages/AdminUsersEdit/AdminUsersEdit"
  )
);

/*Admin Cars */

const AdminCars = lazy(() =>
  import("./components/pages/admin/pages/AdminCars/AdminCars")
);
const AdminCarsList = lazy(() =>
  import(
    "./components/pages/admin/pages/AdminCars/pages/AdminCarsList/AdminCarsList"
  )
);
const AdminCarsAdd = lazy(() =>
  import(
    "./components/pages/admin/pages/AdminCars/pages/AdminCarsAdd/AdminCarsAdd"
  )
);
const AdminCarsEdit = lazy(() =>
  import(
    "./components/pages/admin/pages/AdminCars/pages/AdminCarsEdit/AdminCarsEdit"
  )
);

/* Admin Message */

const AdminMessage = lazy(() =>
  import("./components/pages/admin/pages/AdminMessage/AdminMessage")
);

const AdminMessageList = lazy(() => import("./components/pages/admin/pages/AdminMessage/pages/AdminMessageList/AdminMessageList"));

/*Admin Contact */
const AdminContacts = lazy(() =>
  import("./components/pages/admin/pages/AdminContacts/AdminContacts")
);
const AdminContactsList = lazy(() => import("./components/pages/admin/pages/AdminContacts/pages/AdminContactsList/AdminContactsList"));

/*Admin Avis */

const AdminAvis = lazy(() =>import("./components/pages/admin/pages/AdminAvis/AdminAvis"));
const AdminAvisListNoValid = lazy(() => import("./components/pages/admin/pages/AdminAvis/pages/AdminAvisListNoValid/AdminAvisListNoValid"))
const AdminAvisListValid = lazy(() => import("./components/pages/admin/pages/AdminAvis/pages/AdminAvisListValid/AdminAvisListValid"))

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
        path: "/marques/:marque",
        element: <MarqueList />,
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
        path: "/voitures/:voitureId",
        element: <ProfileCar />,
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
        children: [
          {
            path: "details",
            element: <ProfileClient />,
            children: [
              {
                path: "tabBord",
                element: <Dashboard />,
              },
              {
                path: "profileC",
                element: <ProfileC />,
              },
              {
                path: "editClient/:userId",
                element: <ProfileClientEdit />,
              },
              {
                index: true,
                loader: async () => redirect("/profile/profileClient/tabBord"),
              },
            ],
          },
        ],
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
            path: "personnels",
            element: <AdminPersonnel />,
            children: [
              {
                path: "list",
                element: <AdminPersonnelList />,
              },
              {
                path: "new",
                element: <AdminPersonnelAdd />,
              },
              {
                path: "editPersonnel/:userId",
                element: <AdminPersonnelEdit />,
              },
              {
                index: true,
                loader: async () => redirect("/admin/personnels/list"),
              },
            ],
          },
          {
            path: "users",
            element: <AdminUsers />,
            children: [
              {
                path: "list",
                element: <AdminUsersList />,
              },
              {
                path: "new",
                element: <AdminUsersAdd />,
              },
              {
                path: "editUser/:userId",
                element: <AdminUsersEdit />,
              },
              {
                index: true,
                loader: async () => redirect("/admin/users/list"),
              },
            ],
          },
          {
            path: "cars",
            element: <AdminCars />,
            children: [
              {
                path: "list",
                element: <AdminCarsList />,
              },
              {
                path: "new",
                element: <AdminCarsAdd />,
              },
              {
                path: "editCars/:voitureId",
                element: <AdminCarsEdit />,
              },
              {
                index: true,
                loader: async () => redirect("/admin/cars/list"),
              },
            ],
          },
          {
            path: "messages",
            element: <AdminMessage />,
            children: [
              {
                path: "list",
                element: <AdminMessageList />,
              },
            ]
          },
          {
            path: "contacts",
            element: <AdminContacts />,
            children: [
              {
                path: "list",
                element: <AdminContactsList />,
              },
            ]
          },
          {
            path: "avis",
            element: <AdminAvis />,
            children: [
              {
                path: "listNoValid",
                element: <AdminAvisListNoValid />,
              },
              {
                path: "listValid",
                element: <AdminAvisListValid />,
              },
              {
                index: true,
                loader: async () => redirect("/admin/avis/listNoValid"),
              },
            ]
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
