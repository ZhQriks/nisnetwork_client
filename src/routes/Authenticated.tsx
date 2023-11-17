import React from 'react';

import EventCalendar from 'pages/private/events/EventCalendar';
import Home from 'pages/public/home/Home';
import { Route, Routes } from 'react-router-dom';
import PublicLayout from 'routes/layouts/PublicLayout';

import Products from 'pages/private/products/Products';
import Login from "../pages/public/auth/Login";
import Register from "../pages/public/auth/Register";

interface IRouteMap {
  [route: string]: JSX.Element;
}

export const authenticatedRoutes: IRouteMap = {
  '/': <Home />,
  '/events': <EventCalendar />,
  '/schedule': <Products />,
'/login': <Login />,
'/register': <Register />,
};

const Authenticated = (): JSX.Element => {
  return (
    <PublicLayout>
      <Routes>
        {Object.keys(authenticatedRoutes).map(path => (
          <Route key={path} path={path} element={authenticatedRoutes[path]} />
        ))}
      </Routes>
    </PublicLayout>
  );
};

export default Authenticated;
