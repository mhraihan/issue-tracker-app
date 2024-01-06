"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {Skeleton} from "@/components";

const AssigneeSelect = () => {
  const { data: users, error, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  })
  if (isLoading) {
    return <Skeleton height={"2rem"}/>
  }
  if (error) {
    return null;
  }
  return (
    <Select.Root>
      <Select.Trigger color="indigo" placeholder="Assign..." variant="soft" />
      <Select.Content color="indigo">
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value="orange">
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
