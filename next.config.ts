import path from "node:path";
import type { NextConfig } from "next";


const githubPagesBasePath = "/ocassionorbit";

const nextConfig: NextConfig = {
  
    output: "export",
    basePath: githubPagesBasePath,
    assetPrefix: `${githubPagesBasePath}/`,
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
  // A stray lockfile above this directory makes Turbopack infer the wrong workspace root.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
