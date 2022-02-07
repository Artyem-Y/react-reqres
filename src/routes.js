import React from "react";
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import ListUsers from "./views/userListView/ListUsers";
import {UserEditFrom} from "./views/userListView/UserEdit";

const routes = [
  { path: 'app', element: <DashboardLayout />,
    children: [
      { path: 'users', element: <ListUsers /> },
      { path: 'users/:id/edit', element: <UserEditFrom/> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/', element:  <Navigate to="/app/users" />,
    children: [
      { path: '404', element: <div>Not Found</div> },
      { path: '*', element: <Navigate to="/404" /> },
    ]
  }
];

export default routes;
