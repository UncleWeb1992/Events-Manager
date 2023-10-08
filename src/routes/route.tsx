import { RouteProps } from "react-router-dom";
import { AuthPage } from "../pages/Auth";
import { OrdersPage } from "../pages/Orders";
import { AddOrderPage } from "../pages/OrderAdd";

export enum AppRoutes {
  Auth = "auth",
  Orders = "oders",
  AddOrder = "add",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.Auth]: "/auth",
  [AppRoutes.Orders]: "/",
  [AppRoutes.AddOrder]: "/add",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.Auth]: {
    path: RoutePath.auth,
    element: <AuthPage />,
  },
  [AppRoutes.Orders]: {
    path: RoutePath.oders,
    element: <OrdersPage />,
  },
  [AppRoutes.AddOrder]: {
    path: RoutePath.add,
    element: <AddOrderPage />,
  },
};
