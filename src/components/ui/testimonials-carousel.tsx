"use client";

import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export function TestimonialsCarousel({
  items,
  className,
}: {
  items: Testimonial[];
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative w-full", className)}
    >
      <style>{`
        .testimonial-swiper {
          width: 100%;
          padding-bottom: 60px !important;
          padding-top: 30px !important;
        }

        .testimonial-swiper .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 320px;
          max-width: 86vw;
        }

        .testimonial-swiper .swiper-pagination-bullet {
          background-color: #8E1B2C !important;
          opacity: 0.25;
          width: 10px;
          height: 10px;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .testimonial-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          transform: scaleX(1.4);
          border-radius: 999px;
          width: 28px;
        }

        .testimonial-swiper .swiper-button-prev,
        .testimonial-swiper .swiper-button-next {
          color: #D4A574;
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.92);
          border-radius: 999px;
          box-shadow: 0 8px 24px -6px rgba(139, 27, 44, 0.18);
          border: 1px solid rgba(212, 165, 116, 0.25);
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }

        .testimonial-swiper .swiper-button-prev::after,
        .testimonial-swiper .swiper-button-next::after {
          font-size: 16px;
          font-weight: 700;
        }

        .testimonial-swiper .swiper-button-prev:hover,
        .testimonial-swiper .swiper-button-next:hover {
          background: #8E1B2C;
          color: #FFFFFF;
          transform: scale(1.06);
          box-shadow: 0 14px 32px -4px rgba(139, 27, 44, 0.45);
        }

        .testimonial-swiper .swiper-button-prev:focus-visible,
        .testimonial-swiper .swiper-button-next:focus-visible {
          outline: 2px solid #D4A574;
          outline-offset: 2px;
        }
      `}</style>

      <div className="w-full">
        <Swiper
          spaceBetween={0}
          autoplay={
            !reduced && mounted
              ? { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={true}
          coverflowEffect={{
            rotate: 32,
            stretch: 0,
            depth: 140,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".testimonial-swiper-next",
            prevEl: ".testimonial-swiper-prev",
          }}
          className="testimonial-swiper"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {items.map((t, i) => (
            <SwiperSlide key={i}>
              <article className="relative mx-auto flex h-[380px] w-full flex-col justify-between rounded-3xl border border-gold/20 bg-gradient-to-br from-white via-[#FCFAF7] to-[#F4EDDF] px-8 py-10 text-center shadow-[0_24px_64px_-20px_rgba(139,27,44,0.25)]">
                <Quote
                  aria-hidden
                  className="absolute left-6 top-6 h-8 w-8 text-gold/35"
                />

                <div className="flex flex-1 flex-col items-center justify-center pt-4">
                  <blockquote className="font-serif text-[1.1rem] font-medium italic leading-relaxed text-neutral-dark/85 md:text-[1.15rem]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="mt-6 flex flex-col items-center gap-3">
                  <span
                    aria-hidden
                    className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent"
                  />
                  <h3 className="font-serif text-lg font-semibold text-neutral-dark">
                    {t.name}
                  </h3>
                  <span className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-gold-deep">
                    {t.role}
                  </span>
                </div>
              </article>
            </SwiperSlide>
          ))}

          <div className="testimonial-swiper-prev swiper-button-prev !hidden after:!hidden md:!flex" aria-label="Depoimento anterior">
            <ChevronLeft className="h-5 w-5" />
          </div>
          <div className="testimonial-swiper-next swiper-button-next !hidden after:!hidden md:!flex" aria-label="Próximo depoimento">
            <ChevronRight className="h-5 w-5" />
          </div>
        </Swiper>
      </div>
    </motion.div>
  );
}
