import Pagination from "@/components/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <Pagination
      currentPage={parseInt(searchParams.page ?? 1, 10)}
      itemCount={100}
      pageSize={10}
    />
  );
}
