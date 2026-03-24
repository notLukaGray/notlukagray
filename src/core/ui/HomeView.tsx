"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ScrambledText } from "@/core/ui/scrambled-text";
import { useProjectNavigation } from "@/core/hooks/use-project-navigation";
import { useAfterLcp } from "@/core/hooks/use-after-lcp";
import {
  wrapIndex,
  getHeroCarouselOpacity,
  getProjectUrl,
  getCarouselPlaceholderBg,
} from "@/core/lib/home/home-utils";
import type { HeroProject } from "@/core/lib/globals";

type HomeViewProps = {
  heroProjects: HeroProject[];
};

export function HomeView({ heroProjects }: HomeViewProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [previousPositions, setPreviousPositions] = useState<Map<string, number>>(new Map());
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const activeProject = heroProjects[activeProjectIndex];
  const isAfterLcp = useAfterLcp();

  useProjectNavigation({
    totalProjects: heroProjects.length,
    onNavigate: (direction) => {
      if (direction === "next") {
        setActiveProjectIndex((prev) => (prev + 1 >= heroProjects.length ? 0 : prev + 1));
      } else {
        setActiveProjectIndex((prev) => (prev - 1 < 0 ? heroProjects.length - 1 : prev - 1));
      }
    },
  });

  if (!activeProject) {
    return null;
  }

  const placeholderBg = getCarouselPlaceholderBg(activeProjectIndex);

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="fixed inset-0 w-full h-full">
        <div className="fixed inset-0 w-full h-full bg-black">
          {isAfterLcp && activeProject?.video?.url ? (
            <video
              key={activeProject.id}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover transition-opacity duration-1000"
            >
              <source src={activeProject.video.url} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div
              className="w-full h-full transition-colors duration-1000"
              style={{ backgroundColor: placeholderBg }}
            />
          )}
        </div>

        <Link
          href={getProjectUrl(activeProject)}
          className="absolute inset-0 z-10"
          aria-label={`View ${activeProject.title}`}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest("nav") || target.closest("footer")) {
              e.preventDefault();
            }
          }}
        />

        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center px-4 md:px-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="relative flex flex-col items-center justify-center"
            style={{ height: "fit-content" }}
          >
            {Array.from({ length: 7 }, (_, i) => {
              const offset = i - 3;
              const originalIndex = wrapIndex(activeProjectIndex + offset, heroProjects.length);
              const project = heroProjects[originalIndex];

              if (!project) return null;

              const opacity = getHeroCarouselOpacity(i);
              const isInvisible = i === 0 || i === 6;
              const isActive = originalIndex === activeProjectIndex;
              const isDisabled = isInvisible;

              const itemSpacing = 24;
              const yPosition = (i - 3) * itemSpacing;

              const previousY = previousPositions.get(project.id);
              const initialY = previousY !== undefined ? previousY : i < 3 ? -100 : 100;

              const content = (
                <motion.div
                  className="text-sm md:text-base relative px-3 md:px-4 text-white flex items-center gap-2"
                  animate={{ opacity }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  whileHover={isDisabled ? {} : { x: 8 }}
                >
                  <div className="font-heading font-bold leading-tight whitespace-nowrap">
                    {project.isRestricted ? (
                      <>
                        <ScrambledText text={project.title} id={project.id} /> /{" "}
                        <ScrambledText
                          text={project.brand?.name ?? ""}
                          id={`${project.id}-brand`}
                        />
                      </>
                    ) : (
                      `${project.title} / ${project.brand?.name ?? ""}`
                    )}
                  </div>
                </motion.div>
              );

              return (
                <React.Fragment key={project.id}>
                  <motion.div
                    data-project-id={project.id}
                    className="absolute left-1/2 -translate-x-1/2 group whitespace-nowrap"
                    initial={{
                      y: initialY,
                      opacity: isInvisible ? 0 : previousY !== undefined ? opacity : 0,
                    }}
                    animate={{
                      y: yPosition,
                      opacity: isInvisible ? 0 : opacity,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                    onAnimationComplete={() => {
                      setPreviousPositions((prev) => {
                        const newMap = new Map(prev);
                        newMap.set(project.id, yPosition);
                        return newMap;
                      });
                    }}
                    onMouseEnter={() => setHoveredProjectId(project.id)}
                    onMouseMove={(e) => {
                      setMousePosition({ x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => {
                      setHoveredProjectId(null);
                      setMousePosition(null);
                    }}
                    aria-hidden={isInvisible}
                  >
                    {isDisabled ? (
                      <div className="block relative pointer-events-none" aria-hidden="true">
                        {content}
                      </div>
                    ) : isActive ? (
                      <Link
                        href={getProjectUrl(project)}
                        onClick={(e) => e.stopPropagation()}
                        className="block relative group"
                      >
                        {content}
                      </Link>
                    ) : (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProjectIndex(originalIndex);
                        }}
                        className="block relative cursor-pointer group"
                      >
                        {content}
                      </div>
                    )}
                  </motion.div>
                  {!isDisabled && hoveredProjectId === project.id && mousePosition && (
                    <div
                      key={`${project.id}-description`}
                      data-desc-id={project.id}
                      className="fixed pointer-events-none z-50"
                      style={{
                        left: `${mousePosition.x + 12}px`,
                        top: `${mousePosition.y}px`,
                        transform: "translateY(-50%)",
                      }}
                    >
                      <div className="bg-background/90 backdrop-blur-sm border border-border rounded-[0.5rem] p-3 shadow-lg w-max max-w-[200px] md:max-w-[250px]">
                        <p className="text-[10px] md:text-xs text-foreground leading-relaxed whitespace-normal wrap-break-word">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </motion.nav>
      </div>
    </div>
  );
}
