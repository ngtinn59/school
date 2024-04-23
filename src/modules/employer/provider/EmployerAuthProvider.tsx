import { useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EMPLOYER_BE_API, EMPLOYER_ROUTES } from "../constants/routes.constant";
import { useDispatch } from "react-redux";
import { employerActions } from "../redux/employer.slice";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../utils/baseAxios";
import { COOKIE_ACCESS_TOKEN } from "..";

export function EmployerAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const accessToken = Cookies.get(COOKIE_ACCESS_TOKEN);

  const isLogin = useAppSelector((state) => state.employer.isLogin);

  const { data: profile } = useQuery({
    queryKey: ["employer-profile"],
    queryFn: async () => {
      const response = await axiosInstance.get(EMPLOYER_BE_API.PROFILE);
      return response.data?.data?.[0];
    },
    enabled: isLogin,
  });

  const isAuthenticated = useState(false);

  useEffect(() => {
    const isLoginPage = location.pathname === EMPLOYER_ROUTES.LOGIN;
    const isRegisterPage = location.pathname === EMPLOYER_ROUTES.REGISTER;

    if (accessToken) {
      dispatch(employerActions.setLogin(true));
      dispatch(employerActions.setProfile(profile));
      if (!isAuthenticated[0]) {
        navigate(EMPLOYER_ROUTES.PROFILE);
        isAuthenticated[1](true);
      }
    } else {
      if (!isLoginPage && !isRegisterPage) {
        navigate(EMPLOYER_ROUTES.LOGIN);
      }

      isAuthenticated[1](false);
      dispatch(employerActions.logout());
    }
  }, [
    accessToken,
    dispatch,
    location.pathname,
    navigate,
    profile,
    isAuthenticated,
  ]);

  return <>{children}</>;
}
