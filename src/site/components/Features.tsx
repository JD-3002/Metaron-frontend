"use client";

import { motion } from "framer-motion";

const featurePanels = [
  {
    pill: "Capture Suite",
    title: "Sensor-agnostic ingestion",
    body: "Sync LiDAR, drone and mobile footage directly from the field with automated alignment, geo-tagging and QA.",
    bullets: ["On-device compression keeps uploads under 30 seconds.", "Smart floor-plan detection for every scan."],
  },
  {
    pill: "AI Processing",
    title: "Cinematic staging at scale",
    body: "Metaron's neural pipeline cleans, stages and textures each scene, producing photorealistic 3D twins ready for any channel.",
    bullets: [
      "Remove clutter + auto-light rooms with one click.",
      "Generate branded callouts and hotspots in minutes.",
    ],
  },
  {
    pill: "Omni-channel Publish",
    title: "One click, every screen",
    body: "Push interactive tours to web, mobile, MLS feeds and VR kiosks while tracking engagement down to the room level.",
    bullets: ["Embed-ready components for sites and apps.", "Insight dashboards for brokers & developer teams."],
  },
];

export function Features() {
  return (
    <section className="relative overflow-hidden bg-[#020817] text-white">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-10 h-64 w-64 rounded-full bg-sky-500/20 blur-[160px]" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-blue-800/30 blur-[200px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="space-y-4 text-center">
          <p className="text-xs font-semibold tracking-[0.4em] text-sky-200 uppercase">Platform Modules</p>
          <h2 className="text-3xl font-semibold md:text-4xl">Blueprint for 3D-ready listings</h2>
          <p className="text-white/70">
            Everything brokers need to go from raw scans to hyper-real experiences that sell premium inventory faster.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featurePanels.map((panel, index) => (
            <motion.div
              key={panel.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <p className="text-xs font-semibold tracking-wide text-sky-200 uppercase">{panel.pill}</p>
              <h3 className="mt-3 text-2xl font-semibold">{panel.title}</h3>
              <p className="mt-2 text-sm text-white/75">{panel.body}</p>
              <ul className="mt-5 space-y-2 text-sm text-white/80">
                {panel.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-sky-300" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
