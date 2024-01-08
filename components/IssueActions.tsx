"use client";
import { Skeleton } from "@/components";
import { Status } from "@prisma/client";
import { Button, Flex, Select } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const statuses: { label: String; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
const IssueActions = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = () => {
      setStatus(params.get("status") ?? "");
      setLoading(false);
    };
    fetchData();
  }, [params]);

  return (
    <Flex justify={"between"}>
      {loading ? (
        <Skeleton height={"28px"} width={"141px"} />
      ) : (
        <Select.Root
          defaultValue={status}
          onValueChange={(status) => {
            const queryParams = new URLSearchParams();
           if (status && status !== 'all') {
            queryParams.append("status", status);
           }
           if (params.get("orderBy")) {
            queryParams.append("orderBy", params.get("orderBy")!);
           }
            const query = queryParams.size ? `?${queryParams.toString()}`: '';
            
            router.push(`/issues${query}`);
          }}
        >
          <Select.Trigger
            color="indigo"
            placeholder="Filter by status..."
            variant="soft"
          />
          <Select.Content color="indigo">
            <Select.Group>
              <Select.Label>Suggestions</Select.Label>
              {statuses?.map((status) => (
                <Select.Item
                  key={status.value ?? "all"}
                  value={status.value ?? "all"}
                >
                  {status.label}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      )}

      <Button>
        <Link href={"/issues/new"}>Create New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
