import Link from "next/link";
import { Button } from "@radix-ui/themes";

export default function Home() {
  return (
    <div>
      <Button>
        <Link href="/issues/new">Create New Issue</Link>
      </Button>
    </div>
  );
}
