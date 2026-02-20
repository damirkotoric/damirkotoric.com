"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "motion/react";

/**
 * Animated background for Booking.com portfolio card.
 * Features a blurred background image with 4 mobile phone UI mockups
 * that animate in from the right with staggered expo ease-out timing.
 */
type BookingBgProps = {
  compact?: boolean;
};

// Expo ease out curve
const expoEaseOut: [number, number, number, number] = [0.19, 1, 0.22, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const phoneVariants: Variants = {
  hidden: {
    x: 200,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: expoEaseOut,
    },
  },
};

export function BookingBg({ compact = false }: BookingBgProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px", amount: 0.3 });

  const phones = [
    { src: "/images/portfolio/booking/booking-ui-1.avif", alt: "Booking.com search results" },
    { src: "/images/portfolio/booking/booking-ui-2.avif", alt: "Booking.com property details" },
    { src: "/images/portfolio/booking/booking-ui-3.avif", alt: "Booking.com booking overview" },
    { src: "/images/portfolio/booking/booking-ui-4.avif", alt: "Booking.com room selection" },
  ];

  return (
    <div ref={ref} className="relative w-full aspect-[3/2] overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/portfolio/booking/booking-bg.avif"
        alt=""
        fill
        className="object-cover"
        aria-hidden="true"
      />

      {/* Phone mockups */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative flex items-end h-[85%]" style={{ marginLeft: "8%" }}>
          {phones.map((phone, index) => (
            <motion.div
              key={phone.src}
              variants={phoneVariants}
              className="relative h-full"
              style={{
                marginLeft: index === 0 ? 0 : "-2%",
                zIndex: phones.length - index,
              }}
            >
              <div
                className="h-full transition-transform duration-300 ease-out group-hover:-translate-x-[10px]"
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                <div
                  className="relative h-full rounded-md overflow-hidden shadow-2xl"
                  style={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 12px 24px -8px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Image
                    src={phone.src}
                    alt={phone.alt}
                    width={390}
                    height={844}
                    className="h-full w-auto"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
