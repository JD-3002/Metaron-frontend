import Link from "next/link";

import { Command } from "lucide-react";

import { LoginForm } from "../../_components/login-form";
import { GoogleButton } from "../../_components/social-auth/google-button";

export default function LoginV1() {
  return (
    <div className="flex h-dvh">
      <div className="relative hidden overflow-hidden lg:block lg:w-1/3">
        <div className="absolute inset-0 bg-linear-to-br from-[#030713] via-[#031a3f] to-[#0775ff]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.35),transparent_45%)]" />
        <div className="bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 fill=%22none%22><path d=%22M0 39.5H40V40H0V39.5Z%22 fill=%22rgba(255,255,255,0.05)%22/><path d=%22M39.5 0V40H40V0H39.5Z%22 fill=%22rgba(255,255,255,0.05)%22/></svg>')] absolute inset-0 opacity-20" />
        <div className="flex h-full flex-col items-center justify-center p-12 text-center">
          <div className="space-y-6">
            <Command className="mx-auto size-12 text-white drop-shadow-[0_10px_35px_rgba(4,7,28,0.35)]" />
            <div className="space-y-2">
              <h1 className="text-5xl font-light text-white drop-shadow-[0_25px_60px_rgba(6,9,26,0.6)]">Metaron</h1>
              <p className="text-xl text-white/80">Login to continue</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background flex w-full items-center justify-center p-8 lg:w-2/3">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
          <div className="space-y-4 text-center">
            <div className="font-medium tracking-tight">Login</div>
            <div className="text-muted-foreground mx-auto max-w-xl">
              Welcome back. Enter your email and password, let&apos;s hope you remember them this time.
            </div>
          </div>
          <div className="space-y-4">
            <LoginForm variant="gradient" />
            <GoogleButton className="w-full" variant="outline" />
            <p className="text-muted-foreground text-center text-xs">
              Don&apos;t have an account?{" "}
              <Link href="register" className="text-primary">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
