import Pagination from "@/components/Pagination";

export default async function Home() {
  return <Pagination currentPage={10} itemCount={100} pageSize={2} />;
}
