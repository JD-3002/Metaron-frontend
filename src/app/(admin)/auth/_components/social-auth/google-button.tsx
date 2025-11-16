import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function GoogleButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="secondary" className={cn(className)} {...props}>
      <GoogleGlyph className="size-5" />
      Continue with Google
    </Button>
  );
}

const GoogleGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={cn("shrink-0", className)} aria-hidden>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6 1.54 7.38 2.83l5.42-5.42C32.81 3.04 28.74 1 24 1 14.82 1 7.09 6.58 3.69 14.27l6.42 4.98C11.43 13.66 17.1 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.64-.15-3.21-.43-4.74H24v9h12.7c-.55 2.81-2.24 5.19-4.76 6.78l7.31 5.68C43.81 37.58 46.5 31.54 46.5 24.5z" />
    <path fill="#FBBC05" d="M10.11 28.75c-.48-1.46-.76-3.02-.76-4.75s.27-3.29.76-4.75l-6.42-4.98C1.83 17.54 1 20.68 1 24s.83 6.46 2.69 9.73l6.42-4.98z" />
    <path fill="#34A853" d="M24 47c6.48 0 11.91-2.14 15.88-5.83l-7.31-5.68c-2.03 1.37-4.66 2.18-8.57 2.18-6.9 0-12.57-4.16-14.89-9.75l-6.42 4.98C7.09 41.42 14.82 47 24 47z" />
  </svg>
);
