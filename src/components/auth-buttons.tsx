// src/components/auth-buttons.tsx
"use client"; // 👈 This enables the Buttons to work

import { Button } from "@nextui-org/react";
import * as actions from "@/actions";

export function AuthButtons() {
    return (
        <div className="flex gap-4">
            <form action={actions.SignIn}>
                <Button type="submit" color="primary">Sign In  </Button>
            </form>

            <form action={actions.SignOut}>
                <Button type="submit" color="danger" variant="flat">Sign Out</Button>
            </form>

        </div>
    );
}