export const JobSeekerRoute = {
  employerList: "/employer/list",
  employerDetail: "/employer/detail/:id",
  jobList: "/job/list",
} as const;

export const JobSeekerApiRoute = {
  employerList: "api/companies1",
  employerDetail: "api/companies1/:id",
} as const;
