export const EMPLOYER_ROUTES = {
  LOGIN: "/employer/login",
  REGISTER: "/employer/register",
  PROFILE: "/employer/profile",
  EDIT_PROFILE: "/employer/edit-profile",
  CREATE_JD: "/employer/create-jd",
} as const;

export const EMPLOYER_BE_API = {
  COUNTRY: "api/countries",
  CITIES: "api/cities",
  COMPANY_TYPES: "api/companyType",
  COMPANY_SIZE: "api/companySize",
  REGISTER: "api/employer/register",
  LOGIN: "api/login",
  PROFILE: "api/companies",
  JOB_TYPE: "api/jobtypes",
  SKILL: "api/company/skills",
  CREATE_JD: "api/job",
} as const;
