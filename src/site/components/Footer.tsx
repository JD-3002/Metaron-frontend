"use client";
export function Footer() {
  return (
    <footer className="bg-blue-900 py-3 text-center text-white">
      <p className="text-sm text-blue-200">© {new Date().getFullYear()} Metaron — All Rights Reserved</p>
    </footer>
  );
}
