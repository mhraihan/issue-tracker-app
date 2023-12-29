import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <div className="flex items-center space-x-6 h-14 border-b mb-5 px-5">
      <Link href={"/"}>
        <AiFillBug />
      </Link>
      <div className="ul flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
