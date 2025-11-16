"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

const stats = [
  { label: "3D spaces captured", value: "18K+" },
  { label: "Avg. render time", value: "4 hrs" },
  { label: "Broker NPS", value: "72" },
];

const highlights = ["Generative staging presets", "MLS + VR ready exports", "Spatial analytics for teams"];

const orbitBadges = [
  { label: "LiDAR", delay: 0 },
  { label: "Drone", delay: 0.4 },
  { label: "Mobile", delay: 0.8 },
  { label: "360 Cam", delay: 1.2 },
];

const viewerSpaces = [
  { label: "Sample Space", id: "u8zjmWsaN7x", description: "Walk through a staged condo showcase." },
  { label: "Literature Stadium", id: "2DtBWKDMLew", description: "Explore a full venue scan with seating tiers." },
  { label: "Metaron Room", id: "UYQB4BXZLB4", description: "Preview the Metaron studio with AI staging overlays." },
  { label: "Unfurnished Apartment", id: "j4RZx7ZGM6T", description: "Unfurnished apartment for virtual staging" },
];

export function Hero() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleSelectSpace = (spaceId: string) => {
    setIsModalOpen(false);
    router.push(`/viewer/${spaceId}`);
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#030713] via-[#031a3f] to-[#0775ff] text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_45%)]" />
        <div className="bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 fill=%22none%22><path d=%22M0 39.5H40V40H0V39.5Z%22 fill=%22rgba(255,255,255,0.05)%22/><path d=%22M39.5 0V40H40V0H39.5Z%22 fill=%22rgba(255,255,255,0.05)%22/></svg>')] absolute inset-0 opacity-30" />
        <div className="absolute top-10 -left-24 h-72 w-72 rounded-full bg-sky-500/30 blur-[160px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-indigo-900/30 blur-[200px]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-16 px-6 py-24 md:flex-row md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-7"
        >
          <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold tracking-[0.35em] uppercase backdrop-blur">
            Metaron AI
            <span className="h-1 w-1 rounded-full bg-sky-200" />
            Real Estate
          </span>
          <h1 className="text-4xl leading-tight font-semibold md:text-6xl">
            Capture, stage & publish
            <br className="hidden md:block" />
            <span className="text-sky-200"> cinematic 3D listings</span>
          </h1>
          <p className="text-lg text-white/80">
            Metaron is the AI operating system built for real estate teams to convert LiDAR, drone, and mobile scans
            into immersive, MLS-ready digital twins in hours—not weeks.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button className="rounded-full bg-white px-8 py-3 text-base font-semibold text-slate-900 shadow-[0_25px_60px_rgba(8,10,32,0.4)] transition hover:-translate-y-0.5 hover:shadow-[0_35px_80px_rgba(6,9,26,0.55)]">
              Book a demo
            </button>
            <button
              className="rounded-full border border-white/35 px-8 py-3 text-base font-semibold text-white/90 transition hover:bg-white/10"
              onClick={() => setIsModalOpen(true)}
            >
              Watch product film
            </button>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            {highlights.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-wide text-white/80 uppercase backdrop-blur"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                {item}
              </span>
            ))}
          </div>

          <div className="grid gap-4 pt-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-md"
              >
                <p className="text-3xl font-semibold">{stat.value}</p>
                <p className="text-xs tracking-wide text-white/70 uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-1 justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative w-full max-w-sm"
          >
            <motion.div
              animate={{ rotate: [0, 2, 0, -2, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-[34px] border border-white/20 bg-white/5 p-6 shadow-[0_30px_80px_rgba(3,5,20,0.45)] backdrop-blur-2xl"
            >
              <div className="mb-6 flex items-center justify-between text-xs tracking-[0.3em] text-white/70 uppercase">
                Live pipeline
                <span className="flex items-center gap-2 text-[10px] font-semibold text-sky-200">
                  synced
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                </span>
              </div>

              <div className="space-y-4">
                {orbitBadges.map((badge) => (
                  <motion.div
                    key={badge.label}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 3.5,
                      delay: badge.delay,
                      repeat: Infinity,
                    }}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
                  >
                    <span>{badge.label} capture</span>
                    <span className="text-xs text-white/60">Ultra-sync</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-linear-to-br from-white/15 to-sky-500/20 p-4">
                <p className="text-xs tracking-[0.3em] text-white/70 uppercase">Scene preview</p>
                <div
                  className="mt-3 h-32 rounded-2xl bg-cover bg-center shadow-inner"
                  style={{
                    backgroundImage:
                      "url('https://www.noupe.com/wp-content/uploads/2022/02/home-g5d70b48a4_1280-1024x586.jpg')",
                  }}
                />
                <p className="mt-3 text-sm text-white/70">AI lighting · Auto staging · Depth overlays</p>
              </div>
            </motion.div>

            <motion.div
              className="absolute top-10 -right-10 hidden w-40 rounded-3xl border border-white/20 bg-linear-to-b from-white/20 to-transparent p-4 text-xs text-white/80 backdrop-blur md:block"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-[10px] tracking-[0.4em] text-white/70 uppercase">AI staging</p>
              <p className="mt-2 text-sm font-semibold text-white">84 assets auto-styled</p>
              <p className="text-white/70">Render ETA · 04:12</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-10"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-[#050b1f] p-8 text-white shadow-[0_35px_120px_rgba(3,5,20,0.85)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 rounded-full border border-white/20 px-3 py-1 text-sm text-white/70 transition hover:bg-white/10"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
            <div className="space-y-4 pr-10">
              <p className="text-xs tracking-[0.4em] text-white/60 uppercase">Choose a 3D film</p>
              <h3 className="text-2xl font-semibold">Teleport into Metaron</h3>
              <p className="text-sm text-white/70">
                Pick a showcase to launch the interactive Matterport viewer. You can swap spaces anytime without leaving
                the page.
              </p>
              <div className="space-y-3">
                {viewerSpaces.map((space) => (
                  <button
                    key={space.id}
                    onClick={() => handleSelectSpace(space.id)}
                    className="flex w-full items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-left transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
                  >
                    <div>
                      <p className="text-lg font-semibold">{space.label}</p>
                      <p className="text-sm text-white/60">{space.description}</p>
                    </div>
                    <span className="text-xs tracking-[0.3em] text-white/60 uppercase">View</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
