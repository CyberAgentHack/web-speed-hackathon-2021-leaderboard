import { LoaderFunction } from "@remix-run/cloudflare";
import { authenticator } from "~/libs/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/auth/login" });
};
