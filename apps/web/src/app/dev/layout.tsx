import { PageBuilderDevRouteClient } from "@pb/runtime-react/dev-client";
import { DevRouteTheme } from "./DevRouteTheme";

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <DevRouteTheme>
      {children}
      <PageBuilderDevRouteClient />
    </DevRouteTheme>
  );
}
