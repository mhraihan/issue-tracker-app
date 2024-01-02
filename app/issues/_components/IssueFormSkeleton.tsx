import { Skeleton } from "@/components";
import { Box } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
  return (
    <Box>
      <Skeleton />
      <Skeleton height={"20rem"} />
    </Box>
  );
};

export default IssueFormSkeleton;
