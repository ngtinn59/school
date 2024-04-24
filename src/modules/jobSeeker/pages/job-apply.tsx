import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TableColumnsType, Space, Button, Table, message } from "antd";
import { axiosInstance } from "../../../utils/baseAxios";
import { JobSeekerRoute } from "../constants/routes.constant";

export const JobsApply = () => {
  const { data: JobsApply, isLoading } = useQuery({
    queryKey: ["job-apply"],
    queryFn: async () => {
      return await axiosInstance.get("api/viewAppliedJobs");
    },
    select(data) {
      return data.data.data;
    },
  });

  const { data: favorites } = useQuery({
    queryKey: ["api/favorites/saved-jobs"],
    queryFn: async () => {
      return await axiosInstance.get("api/favorites/saved-jobs");
    },
    select(data) {
      return data.data.data;
    },
  });

  const { mutate: favorite } = useMutation({
    mutationFn: async (id) => {
      return await axiosInstance.post(`api/favorites/${id}/save`);
    },
    onSuccess() {
      message.success("Save job successfully");
    },
    onError() {
      message.error("Save job failed");
    },
  });

  const queryClient = useQueryClient();

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
        const isFavored = favorites?.some((item: any) => item.id === record.id);

        return (
          <Space size="middle">
            <Button
              onClick={() => {
                favorite(record?.id);
                queryClient.invalidateQueries({
                  queryKey: [JobSeekerRoute.jobList],
                });
              }}
              disabled={isFavored}
              icon={
                <FontAwesomeIcon
                  icon={faStar}
                  color={isFavored ? "#4096ff" : undefined}
                />
              }
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
          Job Applied
        </h3>
      </div>

      <Table
        scroll={{
          x: 1440,
        }}
        rowKey="id"
        loading={isLoading}
        dataSource={JobsApply ?? []}
        columns={columns}
      />
    </div>
  );
};
