import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AxiosStore2 from "./map";
import LoginMas from "./login";
import { ProductDetail } from "./map";
import { Navigate } from "react-router-dom";
import Help from "./help";
import Create from "./createacc";
import ProtectedRoute from "./protect";
import Update from "./updateacc";
import Deleteacc from "./delete";
import UserList from "./users";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginMas />,
  },
  {
    path: "/",
    element: <LoginMas />,
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/userlist",
    element: <UserList />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/update",
    element: <Update />,
  },
  {
    path: "/delete",
    element: <Deleteacc />,
  },
  {
    path: "/product",
    element: (
      <ProtectedRoute>
        <AxiosStore2 />
      </ProtectedRoute>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <ProtectedRoute>
        <ProductDetail />
      </ProtectedRoute>
    ),
  },
]);

function Project() {
  return <RouterProvider router={router} />;
}

export default Project;