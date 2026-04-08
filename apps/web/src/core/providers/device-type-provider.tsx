"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface DeviceTypeContextValue {
  isDesktop: boolean;
  isMobile: boolean;
}

const DeviceTypeContext = createContext<DeviceTypeContextValue | undefined>(undefined);

/** When set (e.g. by PageBuilderRenderer with server-resolved tree), useDeviceType returns this and no resize listener runs. */
const ServerBreakpointContext = createContext<DeviceTypeContextValue | undefined>(undefined);

const MOBILE_BREAKPOINT = 768;

export function useDeviceType(): DeviceTypeContextValue {
  const serverBreakpoint = useContext(ServerBreakpointContext);
  const context = useContext(DeviceTypeContext);
  if (serverBreakpoint !== undefined) return serverBreakpoint;
  if (context === undefined) {
    throw new Error(
      "useDeviceType must be used within DeviceTypeProvider or ServerBreakpointProvider"
    );
  }
  return context;
}

/** Use when the tree was pre-resolved on the server (e.g. getPageBuilderPropsAsync with isMobile). No resize listener; first paint uses server breakpoint. */
export function ServerBreakpointProvider({
  isMobile,
  children,
}: {
  isMobile: boolean;
  children: React.ReactNode;
}) {
  const value: DeviceTypeContextValue = {
    isMobile,
    isDesktop: !isMobile,
  };
  return (
    <ServerBreakpointContext.Provider value={value}>{children}</ServerBreakpointContext.Provider>
  );
}

export function DeviceTypeProvider({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkDeviceType = () => {
      const isMobileUserAgent = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isMobileWidth = window.innerWidth < MOBILE_BREAKPOINT;
      const isMobile = isMobileUserAgent || isMobileWidth;
      setIsDesktop(!isMobile);
    };

    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);

    return () => {
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []);

  const value: DeviceTypeContextValue = {
    isDesktop,
    isMobile: !isDesktop,
  };

  return <DeviceTypeContext.Provider value={value}>{children}</DeviceTypeContext.Provider>;
}
