import { useAppSelector } from "../../../app/hooks";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EMPLOYER_BE_API, EMPLOYER_ROUTES } from "../constants/routes.constant";
import { useDispatch } from "react-redux";
import { employerActions } from "../redux/employer.slice";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../utils/baseAxios";

export function EmployerAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const accessToken = Cookies.get("accessToken");

  const isLogin = useAppSelector((state) => state.employer.isLogin);

  const { data: profile } = useQuery({
    queryKey: ["employer-profile"],
    queryFn: async () => {
      const response = await axiosInstance.get(EMPLOYER_BE_API.PROFILE);
      return response.data?.data?.[0];
    },
    enabled: isLogin,
  });

  useEffect(() => {
    if (
      accessToken ||
      location.pathname === EMPLOYER_ROUTES.LOGIN ||
      location.pathname === EMPLOYER_ROUTES.REGISTER
    )
      return;

    if (!isLogin) navigate(EMPLOYER_ROUTES.LOGIN);
  }, [accessToken, navigate, location.pathname, isLogin]);

  useEffect(() => {
    if (accessToken) {
      dispatch(employerActions.setLogin(true));
      dispatch(employerActions.setProfile(profile));
    } else {
      dispatch(employerActions.logout());
    }
  }, [accessToken, dispatch, profile]);

  return <>{children}</>;
}
