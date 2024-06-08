import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Admin,
  Dashboard,
  Error,
  HomeLayout,
  Landing,
  Login,
  Profile,
  Register,
  AddAvailability,
  AdminHome,
  FamilyMembers,
  FamilyLayout,
  FamilyOverview,
  Information,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as adminAction } from "./pages/AdminHome";
import { action as familyAction } from "./pages/FamilyMembers";
import { loader as dashboardLoader } from "./pages/Dashboard";
import { loader as addAvailabilityLoader } from "./pages/AddAvailability";
import { loader as profileLoader } from "./pages/Profile";
import { loader as adminLoader } from "./pages/Admin";
import { loader as familyLoader } from "./pages/FamilyLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },

      {
        path: "/register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,

        children: [
          {
            index: true,
            element: <AddAvailability />,
            loader: addAvailabilityLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            loader: profileLoader,
          },
          {
            path: "information",
            element: <Information />,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
            children: [
              {
                index: true,
                action: adminAction,
                element: <AdminHome />,
              },
              {
                path: "family/:id",
                element: <FamilyLayout />,
                loader: familyLoader,

                children: [
                  {
                    index: true,
                    element: <FamilyOverview />,
                  },
                  {
                    path: "members",
                    action: familyAction,
                    element: <FamilyMembers />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
