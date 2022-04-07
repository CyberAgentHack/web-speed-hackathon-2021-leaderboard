import { LoaderFunction, redirect } from "@remix-run/cloudflare";

export const loader: LoaderFunction = async ({ request }) => {
  return redirect("/dashboard", { status: 302 });
};
