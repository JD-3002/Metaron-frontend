"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import Link from "next/link";

export function Navbar() {
  const [openAccount, setOpenAccount] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const clickedAccount = accountRef.current?.contains(target);
      const clickedLanguage = languageRef.current?.contains(target);

      if (!clickedAccount && !clickedLanguage) {
        setOpenAccount(false);
        setOpenLanguage(false);
      }
    }

    if (openAccount || openLanguage) {
      window.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openAccount, openLanguage]);

  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenAccount(false);
        setOpenLanguage(false);
        setShowSignIn(false);
      }
    }
    if (openAccount || openLanguage || showSignIn) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [openAccount, openLanguage, showSignIn]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/70 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <div className="flex items-center gap-3 text-slate-900">
            <span className="text-lg font-semibold tracking-[0.6em]">METARON</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-400 md:block" />
            <span className="hidden text-xs tracking-[0.3em] text-slate-500 uppercase md:block">AI REAL ESTATE</span>
          </div>

          {/* <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            {navLinks.map((link) => (
              <button
                key={link}
                className="transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60 rounded-full px-2 py-1"
              >
                {link}
              </button>
            ))}
          </nav> */}

          <div className="flex items-center gap-3">
            <div className="relative" ref={languageRef}>
              <IconButton
                label="Change language"
                onClick={() => {
                  setOpenLanguage((prev) => !prev);
                  setOpenAccount(false);
                }}
                active={openLanguage}
              >
                <GlobeIcon />
              </IconButton>
              {openLanguage && (
                <div className="absolute right-0 mt-3 w-40 rounded-2xl border border-slate-100 bg-white/95 p-2 text-sm shadow-xl backdrop-blur">
                  {["English", "Korean"].map((lang) => (
                    <button
                      key={lang}
                      className="w-full rounded-xl px-3 py-2 text-left font-medium text-slate-800 transition hover:bg-slate-100"
                      onClick={() => setOpenLanguage(false)}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/auth/v1/login"
              className="hidden rounded-full border border-slate-900 px-4 py-2 text-sm font-semibold tracking-wide text-slate-900 uppercase transition hover:bg-slate-900 hover:text-white lg:inline-flex"
            >
              Admin Login
            </Link>
            <div className="relative" ref={accountRef}>
              <IconButton label="Account" onClick={() => setOpenAccount((prev) => !prev)} active={openAccount}>
                <UserIcon />
              </IconButton>
              {openAccount && (
                <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-slate-100 bg-white/95 p-2 text-sm shadow-xl backdrop-blur">
                  <button
                    className="w-full rounded-xl px-3 py-2 text-left font-medium text-slate-800 transition hover:bg-slate-100"
                    onClick={() => {
                      setOpenAccount(false);
                      setShowSignIn(true);
                    }}
                  >
                    Sign in
                  </button>
                  <button className="w-full rounded-xl px-3 py-2 text-left font-medium text-slate-800 transition hover:bg-slate-100">
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {showSignIn && (
        <SignInModal
          onClose={() => {
            setShowSignIn(false);
          }}
        />
      )}
    </>
  );
}

function IconButton({
  children,
  label,
  onClick,
  active,
}: {
  children: ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-full border bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-black focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none ${
        active ? "border-slate-400" : "border-slate-200"
      }`}
    >
      {children}
    </button>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 4 3 14 0 18M12 3c-3 4-3 14 0 18" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20c1.5-3 4.5-4 7-4s5.5 1 7 4" />
    </svg>
  );
}

function SignInModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white p-8 shadow-2xl">
        <div className="mb-6 space-y-2 text-center">
          <p className="text-xs font-semibold tracking-[0.4em] text-slate-500 uppercase">Welcome back</p>
          <h3 className="text-2xl font-semibold text-slate-900">Sign in to Metaron AI</h3>
          <p className="text-sm text-slate-500">Manage your 3D pipelines, listings, and analytics in one dashboard.</p>
        </div>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
          />
          <Link
            href="/auth/v2/login"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-xl bg-slate-900 py-3 text-sm font-semibold tracking-wide text-white uppercase transition hover:bg-black"
          >
            Sign in
          </Link>
        </form>

        <button
          className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          onClick={onClose}
        >
          Continue as guest
        </button>
      </div>
    </div>
  );
}
