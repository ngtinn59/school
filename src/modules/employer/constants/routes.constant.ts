export const EMPLOYER_ROUTES = {
  LOGIN: "/employer/login",
  REGISTER: "/employer/register",
  PROFILE: "/employer/profile",
  EDIT_PROFILE: "/employer/edit-profile",
} as const;

export const EMPLOYER_BE_API = {
  COUNTRY: "api/countries",
  CITIES: "api/cities",
  COMPANY_TYPES: "api/companyType",
  COMPANY_SIZE: "api/companySize",
  REGISTER: "api/employer/register",
  LOGIN: "api/login",
  PROFILE: "api/companies",
} as const;
