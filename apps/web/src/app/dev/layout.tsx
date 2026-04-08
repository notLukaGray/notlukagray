import { PageBuilderDevRouteClient } from "@pb/runtime-react/dev-client";

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <PageBuilderDevRouteClient />
    </>
  );
}
