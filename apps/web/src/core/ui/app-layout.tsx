"use client";

type AppLayoutProps = {
  children: React.ReactNode;
  afterChildren?: React.ReactNode;
};

export function AppLayout({ children, afterChildren }: AppLayoutProps) {
  return (
    <>
      <div className="min-h-dvh w-full min-w-0 flex flex-col bg-black">{children}</div>
      {afterChildren ?? null}
    </>
  );
}
