"use client";
import {
  NavbarItem,
  Button,
  Avatar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
import Link from "next/link"; // 1. Import Link

export default function HeaderAuth() {
  const session = useSession();
  let authContent: React.ReactNode;

  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session.data.user.image || ""} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <form action={actions.SignOut}>
              <Button type="submit">Sign Out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    // 2. Change these to Links instead of Forms
    authContent = (
      <>
        <NavbarItem>
          {/* Link to your Manual Sign In Page */}
          <Button as={Link} href="/sign-in" color="primary" variant="bordered">
            Sign In
          </Button>
        </NavbarItem>
        <NavbarItem>
          {/* Link to your Manual Sign Up Page (you need to create this page) */}
          <Button
            as={Link}
            href="/sign-up"
            color="secondary"
            variant="bordered"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </>
    );
  }
  return authContent;
}
