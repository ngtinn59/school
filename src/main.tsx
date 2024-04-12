import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store.ts";
import "./index.css";
import CreateCV from "./pages/CreateCV.tsx";
import HomePage, {
  action as searchITJobAction,
} from "./pages/home/HomePage.tsx";
import JobPreferences from "./pages/JobPreferences.tsx";
import ManageCV from "./pages/ManageCV.tsx";
import Profile from "./pages/profile/Profile.tsx";
import SignIn, { action as signInAction } from "./pages/SignIn.tsx";
import SignUp, { action as signUpAction } from "./pages/SignUp.tsx";
import Layout from "./ui/Layout/Layout.tsx";
import LayoutWithoutFooter from "./ui/Layout/LayoutWithoutFooter.tsx";
import { loadLoginStatus } from "./utils/loadersFunction.ts";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import LoadUserAuthenticationData from "./components/LoadUserAuthenticationData.tsx";
import ProfileLayout from "./pages/profile/ui/ProfileLayout.tsx";
import ContactPage from "./pages/contact/ContactPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoadUserAuthenticationData>
        <Layout />
      </LoadUserAuthenticationData>
    ),
    loader: loadLoginStatus,
    children: [
      {
        path: "/",
        element: <HomePage />,
        action: searchITJobAction,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
        action: signInAction,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
        action: signUpAction,
      },
      {
        path: "/contact",
        element: <ContactPage />,
        action: signUpAction,
      },
    ],
  },
  {
    path: "/",
    element: (
      <LoadUserAuthenticationData>
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      </LoadUserAuthenticationData>
    ),
    loader: loadLoginStatus,
    children: [
      {
        path: "/profile",
        element: <ProfileLayout />,
        action: signInAction,
        children: [
          { path: "", element: <Profile /> },
          {
            path: "manage-cv",
            element: <ManageCV />,
          },
          {
            path: "job-preferences",
            element: <JobPreferences />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: (
      <LoadUserAuthenticationData>
        <ProtectedRoute>
          <LayoutWithoutFooter />
        </ProtectedRoute>
      </LoadUserAuthenticationData>
    ),
    loader: loadLoginStatus,
    children: [
      {
        path: "/create-cv",
        element: <CreateCV />,
        action: signInAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
