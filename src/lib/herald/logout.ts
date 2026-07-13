"use client";

export async function heraldLogout(): Promise<void> {
    await fetch(`${process.env.NEXT_PUBLIC_HERALD_AUTH_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
    });
    window.location.reload();
}
