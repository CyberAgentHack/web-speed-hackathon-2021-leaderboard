import { useEffect } from "react";
import { useFetcher, useNavigate } from "@remix-run/react";
import { authenticator } from "~/libs/auth.server";
import { ActionFunction } from "@remix-run/cloudflare";

export const action: ActionFunction = ({ request }) =>
  authenticator.authenticate("sb", request, {
    successRedirect: "/dashboard",
  });

const AuthCallback = () => {
  const { submit } = useFetcher();
  const navi = useNavigate();

  useEffect(() => {
    const [, refreshToken] =
      location.hash.match(/refresh_token=(.+?)(&|$)/) ?? [];
    if (refreshToken) submit({ refreshToken }, { method: "post" });
    else navi("/auth/login");
  }, [submit, navi]);

  return null;
};

export default AuthCallback;
