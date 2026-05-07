import { MenuClient } from "@/components/(dashboard)/menu/client";
import { otherNavItems } from "@/constants";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const session = await verifySession();

  if (!session) {
    redirect("/login");
  }

  // Pass plain objects without LucideIcon components
  return <MenuClient otherNavItems={otherNavItems} />;
}
