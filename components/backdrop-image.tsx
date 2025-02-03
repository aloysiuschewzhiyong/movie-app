"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface BackdropImageProps {
  src: string;
}

export function BackdropImage({ src }: BackdropImageProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <div
        className="absolute inset-0 h-[120%] -top-[20%]"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <Image
          unoptimized
          src={src}
          alt=""
          fill
          className="object-cover object-[50%_35%]"
          priority
        />
      </div>
      <div
        className="absolute inset-0 bg-black/40"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />
    </div>
  );
}
