// v1.0.22 - Root Redirect to Main Dashboard (preserves layout)
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/dashboard/main");
}
