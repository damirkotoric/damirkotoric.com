"use client";

import React from "react";
import { cn } from "@/lib/utils";

type ScrollLinkedProviderProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollLinkedProvider({
  children,
  className,
}: ScrollLinkedProviderProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-[auto_1fr] 2xl:gap32 overflow-visible", className)}>
      {children}
    </div>
  );
}

type ScrollLinkedContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollLinkedContent({
  children,
  className,
}: ScrollLinkedContentProps) {
  return (
    <div className={cn("relative z-10 flex flex-col", className)}>
      {children}
    </div>
  );
}

type ScrollLinkedMediaProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollLinkedMedia({
  children,
  className,
}: ScrollLinkedMediaProps) {
  return (
    <div className={cn("hidden lg:block overflow-visible", className)}>
      {children}
    </div>
  );
}

type ScrollSectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  mobileMedia?: React.ReactNode;
};

export function ScrollSection({
  id,
  children,
  className,
  mobileMedia,
}: ScrollSectionProps) {
  return (
    <div
      id={id}
      className={cn("", className)}
    >
      {children}
      {/* Mobile media - inline below content */}
      {mobileMedia && (
        <div className="-mt-12 lg:mt-8 lg:hidden">
          {mobileMedia}
        </div>
      )}
    </div>
  );
}

type ScrollMediaItemProps = {
  sectionId: string;
  children: React.ReactNode;
  className?: string;
  group?: string;
};

export function ScrollMediaItem({
  sectionId,
  children,
  className,
}: ScrollMediaItemProps) {
  return (
    <div
      data-section={sectionId}
      className={cn("overflow-visible", className)}
    >
      {children}
    </div>
  );
}
