const { withEsbuildOverride } = require("remix-esbuild-override");
const GlobalsPolyfills =
  require("@esbuild-plugins/node-globals-polyfill").default;
const alias = require("esbuild-plugin-alias");
require("dotenv").config();

withEsbuildOverride((option, { isServer }) => {
  if (!isServer) {
    option.define = {
      ...option.define,
      "process.env.SUPABASE_URL": JSON.stringify(process.env.SUPABASE_URL),
      "process.env.SUPABASE_ANON_KEY": JSON.stringify(
        process.env.SUPABASE_ANON_KEY
      ),
    };
  }

  if (isServer)
    option.plugins = [
      GlobalsPolyfills({
        buffer: true,
      }),
      alias({
        jotai: require.resolve("jotai"),
      }),
      ...option.plugins,
    ];

  return option;
});

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildTarget: "cloudflare-workers",
  server: "./server.js",
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: [".*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
