"use client";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Avatar, Button, DropdownMenu } from "@radix-ui/themes";
import { Session } from "next-auth/types";
interface Props {
  session: Session | null;
  signIn: () => void;
  signOut: () => void;
}
const NavBarAccount = ({ session, signIn, signOut }: Props) => {
  if (!session) {
    return (
      <Button
        onClick={() => {
          signIn();
        }}
      >
        Login
      </Button>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" className="!outline-none">
          <Avatar
            src={session!.user.image!}
            fallback={session!.user.name!.slice(0, 2)}
          />
          <CaretDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size={"2"}>
        <DropdownMenu.Item>{session!.user.name}</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item color="red" onClick={() => signOut()}>
          Logout
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default NavBarAccount;
