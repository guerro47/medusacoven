export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative z-10 flex min-h-svh items-center justify-center px-6">
      {children}
    </main>
  );
}
