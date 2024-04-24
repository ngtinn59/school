import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { JobSeekerRoute } from "../constants/routes.constant";
import { axiosInstance } from "../../../utils/baseAxios";
import { Button, message, Space, Table, TableColumnsType } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import { BASE_URL_API } from "../../../utils/constants";

export const JobList = () => {
  const queryClient = useQueryClient();

  const { data: JobList, isLoading } = useQuery({
    queryKey: [JobSeekerRoute.jobList],
    queryFn: async () => {
      return await axiosInstance.get("api");
    },
    select(data) {
      return data.data.data;
    },
  });

  const { data: JobsApply } = useQuery({
    queryKey: ["job-apply"],
    queryFn: async () => {
      return await axiosInstance.get("api/viewAppliedJobs");
    },
    select(data) {
      return data.data.data.map((i: any) => i.id);
    },
  });

  const { data: jobCv } = useQuery({
    queryKey: ["job-cv"],
    queryFn: async () => {
      return await axiosInstance.get("api/cvs");
    },
    select(data) {
      return data.data.data.find((i: any) => i?.is_default === 1);
    },
  });

  const { mutate: applyJob } = useMutation({
    mutationKey: ["apply-job"],
    mutationFn: async (id: string) => {
      const response = await fetch(jobCv?.file_path);

      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }

      const blob = (await response.json()).blob();
      const file = new File([blob], "document.pdf", {
        type: "application/pdf",
      });

      const formData = new FormData();
      formData.append("cv", file);

      axios.post(`${BASE_URL_API}/api/jobs/${id}/apply`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
    },
    onSuccess() {
      message.success("Apply job successfully");
    },
    onError() {
      message.error("Apply job failed");
    },
  });

  const navigate = useNavigate();

  const { data: favorites } = useQuery({
    queryKey: ["api/favorites/saved-jobs"],
    queryFn: async () => {
      return await axiosInstance.get("api/favorites/saved-jobs");
    },
    select(data) {
      return data.data.data;
    },
  });

  const columns: TableColumnsType<any> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 300,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 300,
      key: "description",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      render: (value: any) => {
        return value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Job Type",
      dataIndex: "job_type",
      key: "job_type",
      render: (value: any) => {
        return (
          <div className="flex flex-col">
            {value.map((i: any) => (
              <div key={Math.random() + i}>{i}</div>
            ))}
          </div>
        );
      },
      width: 300,
    },
    {
      title: "Job City",
      dataIndex: "job_city",
      key: "job_city",
      width: 300,
      render: (value: any) => {
        return (
          <div className="flex flex-col">
            {value.map((i: any) => (
              <div key={Math.random() + i}>{i}</div>
            ))}
          </div>
        );
      },
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
      render: (value: any) => {
        return (
          <div className="flex flex-col">
            {value.map((i: any) => (
              <div key={Math.random() + i}>{i}</div>
            ))}
          </div>
        );
      },
    },
    {
      title: "Skill Experience",
      dataIndex: "skill_experience",
      key: "skills",
      width: 300,
    },
    {
      title: "Benefits",
      dataIndex: "benefits",
      width: 300,
      key: "benefits",
    },
    {
      title: "Last Date",
      dataIndex: "last_date",
      key: "last_date",
      width: 300,
    },
    {
      title: "Actions",
      key: "actions",
      width: "50px",
      render(_: any, record: any) {
        console.log(favorites);

        return (
          <Space size="middle">
            <Button
              onClick={() =>
                navigate(
                  JobSeekerRoute.employerDetail.replace(":id", record.id)
                )
              }
            >
              Detail
            </Button>
            {JobsApply?.includes(record.id) ? (
              <Button disabled>Applied</Button>
            ) : (
              <Button
                onClick={() => {
                  applyJob(record.id);
                  queryClient.invalidateQueries({
                    queryKey: [JobSeekerRoute.jobList],
                  });
                }}
              >
                Apply
              </Button>
            )}

            <Button
              icon={<FontAwesomeIcon icon={faStar} color={record} />}
            ></Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="mt-5 max-w-[1440px] mx-auto">
      <div className="px-4 mb-5 sm:px-0 flex justify-between">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Job List
        </h3>
      </div>

      <Table
        scroll={{
          x: 1440,
        }}
        rowKey="id"
        loading={isLoading}
        dataSource={JobList ?? []}
        columns={columns}
      />
    </div>
  );
};
