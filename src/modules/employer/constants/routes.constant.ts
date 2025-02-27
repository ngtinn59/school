export const EMPLOYER_ROUTES = {
  LOGIN: "/employer/login",
  REGISTER: "/employer/register",
  PROFILE: "/employer/profile",
  EDIT_PROFILE: "/employer/edit-profile",
  CREATE_JD: "/employer/create-jd",
  LIST_JD: "/employer/list-jd",
  EDIT_JD: "/employer/edit-jd/:id",
  LIST_APPLICATION: "/employer/list-application",
} as const;

export const EMPLOYER_BE_API = {
  COUNTRY: "api/countries",
  CITIES: "api/cities",
  COMPANY_TYPES: "api/company-types",
  COMPANY_SIZE: "api/company-sizes",
  REGISTER: "api/employer/register",
  LOGIN: "api/login",
  PROFILE: "api/employer/companies",
  JOB_TYPE: "api/jobtypes",
  SKILL: "api/company/skills",
  CREATE_JD: "api/employer/jobs",
  LIST_JD: "api/employer/jobs",
  EDIT_JD: "api/employer/jobs/:id",
  DELETE_JD: "api/employer/jobs/:id",
  LIST_APPLICATION: "api/applications",
} as const;
