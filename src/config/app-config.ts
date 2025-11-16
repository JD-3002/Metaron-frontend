import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Metaron",
  version: packageJson.version,
  copyright: `(c) ${currentYear}, Metaron.`,
  meta: {
    title: "Metaron - Capture, stage & publish cinematic 3D listings",
    description:
      "Metaron pairs premium marketing pages with a full-featured admin dashboard built on Next.js 16, Tailwind CSS v4, and shadcn/ui.",
  },
};
