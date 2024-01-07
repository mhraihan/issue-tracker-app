"use client";
import { Skeleton } from "@/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const { data: users, error, isLoading } = useUser();
  const updateIssue = async (userId: string) => {
    try {
      await axios.patch("/api/issues/" + issue.id, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      });

      toast.success("Issue has been updated");
      router.refresh();
    } catch {
      toast.error("Changes could not be saved.");
    }
  };
  if (isLoading) {
    return <Skeleton height={"2rem"} />;
  }
  if (error) {
    return null;
  }
  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || ""}
      onValueChange={updateIssue}
    >
      <Select.Trigger color="indigo" placeholder="Assign..." variant="soft" />
      <Select.Content color="indigo">
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

const useUser = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
