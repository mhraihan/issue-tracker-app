import { auth, signIn, signOut } from "@/auth";
import { Flex } from "@radix-ui/themes";
import NavBarAccount from "./NavBarAccount";
import NavbarHeader from "./NavbarHeader";
const NavBar = async () => {
  const session = await auth();
  return (
    <div className="flex items-center space-x-6 h-14 border-b mb-5 px-5 justify-between">
      <Flex align={"center"} gap={"4"}>
        <NavbarHeader />
      </Flex>
      <Flex>
        <NavBarAccount
          session={session}
          signIn={async () => {
            "use server";
            await signIn();
          }}
          signOut={async () => {
            "use server";
            await signOut({redirectTo: "/"});
          }}
        />
      </Flex>
    </div>
  );
};

export default NavBar;
