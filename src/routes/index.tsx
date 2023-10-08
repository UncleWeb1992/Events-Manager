import { FC, useEffect, useLayoutEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { RoutePath, routeConfig } from "./route";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { authActions } from "../store/slices/AuthSlice";
import { userActions } from "../store/slices/UserSlice";
import { IUser } from "../types/types";

const Navigation: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const auth = useAppSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (!auth) {
      navigate(RoutePath.auth);
    } else if (auth && pathname.includes(RoutePath.auth)) {
      navigate(RoutePath.oders);
    }
  }, [auth, navigate, pathname]);

  useLayoutEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const userParse = JSON.parse(user) as IUser;
      dispatch(authActions.setAuth(true));
      dispatch(userActions.setUser(userParse));
    }
  }, [dispatch]);
  return (
    <Routes>
      {Object.values(routeConfig).map((options) => (
        <Route
          key={options.path}
          path={options.path}
          element={options.element}
        />
      ))}
      <Route path="*" element={<Navigate to={RoutePath.oders} replace />} />
    </Routes>
  );
};

export default Navigation;
