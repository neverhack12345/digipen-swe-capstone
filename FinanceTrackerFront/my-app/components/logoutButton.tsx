"use client";

import { Button } from "@nextui-org/button";
import { NavbarItem } from "@nextui-org/navbar";
import { logoutUser } from "@/app/api/route";

export const LogoutButton = () => {
    return (
        <NavbarItem>
            <Button type="button" onClick={async () => {
                await logoutUser();
            }}>Logout</Button>
        </NavbarItem>
    )
}