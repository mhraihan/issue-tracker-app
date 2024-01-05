"use client"
import { Flex } from "@radix-ui/themes";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavbarHeader = () => {
    const pathname = usePathname();
    const links = [
      { label: "Dashboard", href: "/" },
      { label: "Issues", href: "/issues" },
    ];
  
    return (
      <>
        <Flex align={"center"} gap={"4"}>
          <Link href={"/"}>
            <AiFillBug />
          </Link>
          <div className="ul flex space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={classnames({
                  "hover:text-zinc-800 transition-colors": true,
                  "text-zinc-800": pathname === link.href,
                  "text-zinc-500": pathname !== link.href,
                })}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </Flex>

      </>
    );
}

export default NavbarHeader