import { auth } from "@/auth"
import { NextResponse } from "next/server";

export const checkAuthorization = async (): Promise<boolean> => {
    const session = await auth();
    return !!session?.user;
}

export const handleUnauthorized = () => {
    return NextResponse.json(
        {"message": "Unauthorized Access"},
        {status: 401}
    )
}