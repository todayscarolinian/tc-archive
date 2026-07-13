"use client";
import { useSession } from "./auth-client";
import { REQUIRED_DOMAIN, type HeraldUser } from "./types";

export function useHasHeraldDomainAccess() {
    const { data: session, isPending } = useSession();
    const domains = (session?.user as HeraldUser | undefined)?.domains ?? [];
    return { hasAccess: domains.includes(REQUIRED_DOMAIN), isPending };
}
