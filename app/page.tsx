"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const galleryImages = Array.from(
  { length: 15 },
  (_, i) => `/images/gallery/gallery${i + 1}.png`
);

const showcaseProjects = [
  {
    image: "/images/showcase/showcase1.png",
    location: "Royton",
    title: "One-day living room transformation",
    description:
      "A same-day media wall upgrade with warm lighting, clean lines and a premium finish.",
  },
  {
    image: "/images/showcase/showcase2.png",
    location: "Manchester",
    title: "Luxury bespoke media wall build",
    description:
      "Designed around the room to create a balanced focal point with integrated fire and shelving.",
  },
  {
    image: "/images/showcase/showcase3.png",
    location: "Oldham",
    title: "Feature wall with storage",
    description:
      "A practical, clutter-free design with hidden storage, acoustic panelling and ambient lighting.",
  },
  {
    image: "/images/showcase/showcase4.png",
    location: "Greater Manchester",
    title: "Cinema-style media wall",
    description:
      "A bold living room upgrade built around a large screen, feature fire and clean symmetrical detailing.",
  },
  {
    image: "/images/showcase/showcase5.png",
    location: "Manchester",
    title: "Bespoke wall built around the home",
    description:
      "A tailored installation planned around the existing space, finishes and how the room is used.",
  },
];

const pwdSteps = [
  {
    title: "Consult",
    text: "A free consultation to understand your room, your style and how you want the space to feel.",
  },
  {
    title: "Design",
    text: "Every wall is planned around the space — from TV placement and lighting to shelving, storage and finishes.",
  },
  {
    title: "Build",
    text: "Built cleanly, carefully and properly, with every detail considered from the first cut to the final finish.",
  },
  {
    title: "Finish",
    text: "A media wall that feels built into the home — not added afterwards.",
  },
];

const reviews = [
  {
    name: "Comfort Fajimi",
    quote:
      "Their professionalism, attention to detail, and quality of workmanship were outstanding from start to finish. They transformed my space beautifully.",
  },
  {
    name: "Tom Casey",
    quote:
      "Professional, reliable and clearly take pride in their work. The finish is top quality and it’s transformed the room.",
  },
  {
    name: "Sam Kay",
    quote:
      "The service was first class from start to finish — professional, friendly, and the workmanship was excellent. The media wall looks incredible.",
  },
  {
    name: "Caroline Gibson",
    quote:
      "The workmanship is second to none. They truly are masters of their craft. They helped me design the perfect wall for my space.",
  },
  {
    name: "Tracey Maurice Close",
    quote:
      "Every aspect from planning the build to completion was carried out efficiently and expertly. We absolutely love the end result.",
  },
  {
    name: "Sharon Pickering",
    quote:
      "Totally professional from start to finish. Turned up on time every time and I am so pleased with the finish.",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function mapRange(
  value: number,
  inputStart: number,
  inputEnd: number,
  outputStart: number,
  outputEnd: number
) {
  const progress = clamp((value - inputStart) / (inputEnd - inputStart), 0, 1);
  return outputStart + (outputEnd - outputStart) * progress;
}

function MobilePaperStack() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const designRef = useRef<HTMLElement | null>(null);
  const buildRef = useRef<HTMLElement | null>(null);
  const finishRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let frameId: number | null = null;

    const updateStack = () => {
      frameId = null;

      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight || 800;
      const travel = Math.max(1, sectionHeight - viewportHeight);

      const progress = clamp((window.scrollY - sectionTop) / travel, 0, 1);

      const designY = mapRange(progress, 0.02, 0.28, 100, 0);
      const buildY = mapRange(progress, 0.34, 0.60, 100, 0);
      const finishY = mapRange(progress, 0.66, 0.92, 100, 0);

      if (designRef.current) {
        designRef.current.style.transform = `translate3d(0, ${designY}%, 0)`;
      }

      if (buildRef.current) {
        buildRef.current.style.transform = `translate3d(0, ${buildY}%, 0)`;
      }

      if (finishRef.current) {
        finishRef.current.style.transform = `translate3d(0, ${finishY}%, 0)`;
      }
    };

    const requestUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateStack);
    };

    updateStack();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <section
      className="mobilePaperMotionStack"
      aria-label="The PWD Way"
      ref={sectionRef}
    >
      <div className="mobilePaperMotionStage">
        <div className="sectionLabel">The PWD Way</div>

        <div className="mobilePaperMotionCards">
          <section
            className="mobilePaperMotionCard"
            style={{ transform: "translate3d(0, 0%, 0)", zIndex: 1 }}
          >
            <h2>{pwdSteps[0].title}</h2>
            <p>{pwdSteps[0].text}</p>
          </section>

          <section
            ref={designRef}
            className="mobilePaperMotionCard"
            style={{ transform: "translate3d(0, 100%, 0)", zIndex: 2 }}
          >
            <h2>{pwdSteps[1].title}</h2>
            <p>{pwdSteps[1].text}</p>
          </section>

          <section
            ref={buildRef}
            className="mobilePaperMotionCard"
            style={{ transform: "translate3d(0, 100%, 0)", zIndex: 3 }}
          >
            <h2>{pwdSteps[2].title}</h2>
            <p>{pwdSteps[2].text}</p>
          </section>

          <section
            ref={finishRef}
            className="mobilePaperMotionCard"
            style={{ transform: "translate3d(0, 100%, 0)", zIndex: 4 }}
          >
            <h2>{pwdSteps[3].title}</h2>
            <p>{pwdSteps[3].text}</p>
          </section>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const showcaseRef = useRef<HTMLElement | null>(null);
  const pwdWayRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLElement | null>(null);
  const reviewsRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);
  const horizontalCardsRef = useRef<HTMLDivElement | null>(null);
  const suppressMobileCtaUntilRef = useRef(0);

  const isMouseDownRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);

  const [isDraggingProjects, setIsDraggingProjects] = useState(false);
  const [headerPresence, setHeaderPresence] = useState(1);
  const [activeReview, setActiveReview] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [mobileHeaderCompact, setMobileHeaderCompact] = useState(false);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 720);

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);


  useEffect(() => {
    const updateMobileCta = () => {
      const contact = contactRef.current;
      const isSmall = window.innerWidth <= 720;

      if (Date.now() < suppressMobileCtaUntilRef.current) {
        setShowMobileCta(false);
        return;
      }

      if (!contact || !isSmall) {
        setShowMobileCta(false);
        return;
      }

      const contactTop = contact.getBoundingClientRect().top;
      const hasStartedScrolling = window.scrollY > 90;
      const isBeforeContact = contactTop > window.innerHeight * 0.72;

      setMobileHeaderCompact(window.scrollY > 70);
      setShowMobileCta(hasStartedScrolling && isBeforeContact);
    };

    updateMobileCta();
    window.addEventListener("scroll", updateMobileCta, { passive: true });
    window.addEventListener("resize", updateMobileCta);

    return () => {
      window.removeEventListener("scroll", updateMobileCta);
      window.removeEventListener("resize", updateMobileCta);
    };
  }, []);

  useEffect(() => {
    const updateHeaderPresence = () => {
      const showcase = showcaseRef.current;
      const pwdWay = pwdWayRef.current;

      if (!showcase || !pwdWay) {
        setHeaderPresence(1);
        return;
      }

      const viewportHeight = window.innerHeight;
      const showcaseTop = showcase.getBoundingClientRect().top;
      const pwdWayTop = pwdWay.getBoundingClientRect().top;

      const fadeOutStart = viewportHeight * 0.72;
      const fadeOutEnd = 120;
      const fadeInStart = viewportHeight * 0.38;
      const fadeInEnd = 110;

      let nextPresence = 1;

      if (showcaseTop < fadeOutStart && pwdWayTop > fadeInStart) {
        nextPresence = Math.max(
          0,
          Math.min(1, (showcaseTop - fadeOutEnd) / (fadeOutStart - fadeOutEnd))
        );
      }

      if (pwdWayTop <= fadeInStart) {
        nextPresence = Math.max(
          0,
          Math.min(1, (fadeInStart - pwdWayTop) / (fadeInStart - fadeInEnd))
        );
      }

      setHeaderPresence(nextPresence);
    };

    updateHeaderPresence();
    window.addEventListener("scroll", updateHeaderPresence, { passive: true });
    window.addEventListener("resize", updateHeaderPresence);

    return () => {
      window.removeEventListener("scroll", updateHeaderPresence);
      window.removeEventListener("resize", updateHeaderPresence);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length);
    }, 4600);

    return () => window.clearInterval(timer);
  }, []);

  const handleProjectDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = horizontalCardsRef.current;
    if (!container) return;

    isMouseDownRef.current = true;
    setIsDraggingProjects(true);
    dragStartXRef.current = event.pageX - container.offsetLeft;
    dragStartScrollLeftRef.current = container.scrollLeft;
  };

  const handleProjectDragMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = horizontalCardsRef.current;
    if (!container || !isMouseDownRef.current) return;

    event.preventDefault();
    const x = event.pageX - container.offsetLeft;
    const walk = (x - dragStartXRef.current) * 1.15;
    container.scrollLeft = dragStartScrollLeftRef.current - walk;
  };

  const stopProjectDrag = () => {
    isMouseDownRef.current = false;
    setIsDraggingProjects(false);
  };

  const scrollToSection = (id: string) => {
    const targets: Record<string, HTMLElement | HTMLDivElement | null> = {
      projects: showcaseRef.current,
      "pwd-way": pwdWayRef.current,
      gallery: galleryRef.current,
      reviews: reviewsRef.current,
      contact: contactRef.current,
    };

    const target = targets[id] ?? document.getElementById(id);
    if (!target) return;

    const isSmallScreen = window.innerWidth <= 720;
    const offset = isSmallScreen ? 100 : 24;
    const top = Math.max(
      0,
      target.getBoundingClientRect().top + window.scrollY - offset
    );

    if (isSmallScreen) {
      suppressMobileCtaUntilRef.current = Date.now() + 1400;
      setShowMobileCta(false);
    }

    requestAnimationFrame(() => {
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    });
  };

  const logoSize = useTransform(heroProgress, [0, 0.22], ["52px", "30px"]);
  const logoY = useTransform(heroProgress, [0, 0.22], [0, 0]);

  const mobileLogoSize = useTransform(heroProgress, [0, 0.18], ["66px", "30px"]);

  const headerColor = useTransform(
    heroProgress,
    [0, 0.72, 0.86],
    ["#ffffff", "#ffffff", "#211d1b"]
  );

  const headerBg = useTransform(
    heroProgress,
    [0, 0.55, 0.86],
    [
      "rgba(246, 243, 237, 0.12)",
      "rgba(246, 243, 237, 0.28)",
      "rgba(246, 243, 237, 0.78)",
    ]
  );

  const mobileHeaderBg = useTransform(
    heroProgress,
    [0, 0.55, 0.86],
    [
      "rgba(246, 243, 237, 0.035)",
      "rgba(246, 243, 237, 0.08)",
      "rgba(246, 243, 237, 0.16)",
    ]
  );

  const ctaBg = useTransform(
    heroProgress,
    [0, 0.86],
    ["rgba(255, 255, 255, 0.2)", "rgba(33, 29, 27, 0.08)"]
  );

  const heroTitleY = useTransform(heroProgress, [0, 1], [0, -86]);
  const heroTitleOpacity = useTransform(heroProgress, [0, 0.78, 1], [1, 1, 0.62]);

  const currentReview = reviews[activeReview];

  return (
    <main>
      <motion.header
        className="siteHeader"
        style={{
          background: isMobile ? mobileHeaderBg : headerBg,
          color: headerColor,
          opacity: isMobile ? 1 : headerPresence,
          pointerEvents: isMobile || headerPresence > 0.15 ? "auto" : "none",
        }}
      >
        <nav className="desktopNav" aria-label="Main navigation">
          <div className="navSide navLeft">
            <a href="#projects" onClick={(event) => { event.preventDefault(); scrollToSection("projects"); }}>Projects</a>
            <a href="#pwd-way" onClick={(event) => { event.preventDefault(); scrollToSection("pwd-way"); }}>The PWD Way</a>
            <a href="#gallery" onClick={(event) => { event.preventDefault(); scrollToSection("gallery"); }}>Gallery</a>
          </div>

          <motion.a
            href="#top"
            className="brandMark"
            style={{ fontSize: logoSize, y: logoY }}
            aria-label="PWD home"
          >
            PWD
          </motion.a>

          <div className="navSide navRight">
            <a href="#reviews" onClick={(event) => { event.preventDefault(); scrollToSection("reviews"); }}>Reviews</a>
            <a href="#contact" onClick={(event) => { event.preventDefault(); scrollToSection("contact"); }}>Contact</a>
            <motion.a
              href="tel:07782913456"
              className="navCta"
              style={{ background: ctaBg }}
            >
              Free Consultation
            </motion.a>
          </div>
        </nav>

        <nav className="mobileNav" aria-label="Mobile navigation">
          <motion.div
            className="mobileNavLinks"
            initial={false}
            animate={
              isMobile && mobileHeaderCompact
                ? { opacity: 0, y: -14, height: 0, marginBottom: 0 }
                : { opacity: 1, y: 0, height: "auto", marginBottom: 0 }
            }
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onPointerDown={(event) => {
                event.preventDefault();
                scrollToSection("pwd-way");
              }}
            >
              The PWD Way
            </button>
            <button
              type="button"
              onPointerDown={(event) => {
                event.preventDefault();
                scrollToSection("gallery");
              }}
            >
              Gallery
            </button>
            <button
              type="button"
              onPointerDown={(event) => {
                event.preventDefault();
                scrollToSection("reviews");
              }}
            >
              Reviews
            </button>
            <a href="tel:07782913456">Call</a>
          </motion.div>

          <motion.a
            href="#top"
            className="mobileBrand"
            aria-label="PWD home"
            style={{ fontSize: mobileLogoSize }}
          >
            PWD
          </motion.a>
        </nav>
      </motion.header>

      <AnimatePresence>
        {showMobileCta && (
          <motion.a
            href="#contact"
            className="mobileBottomCta"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            Book Your Free Consultation
            <span aria-hidden="true">→</span>
          </motion.a>
        )}
      </AnimatePresence>

      <section className="hero" id="top" ref={heroRef}>
        <div className="heroImageDesktop">
  <Image
    src="/images/pwdhero1.png"
    alt="Luxury bespoke media wall with fireplace, shelving and acoustic panelling"
    fill
    priority
    className="heroImage"
  />
</div>

<div className="heroImageMobile">
  <video
    className="heroVideo"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
  >
    <source src="/videos/mobilehero.mp4" type="video/mp4" />
  </video>
</div>
        <div className="heroOverlay" />

        <div className="heroContent">
          <motion.div
            className="heroTitleWrap"
            style={{ y: heroTitleY, opacity: heroTitleOpacity }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Luxury Media Walls Across Manchester
            </motion.h1>

            <motion.a
              href="#contact"
              className="heroMobilePlan"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("contact");
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Plan yours
              <span aria-hidden="true">→</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section className="intro">
        <p>
          Bespoke media walls, feature fireplaces, acoustic panelling, shelving,
          hidden storage and ambient lighting — designed around your home.
        </p>
      </section>

      <section className="showcase" id="projects" ref={showcaseRef}>
        <div className="sectionLabel">Recent Work</div>
        <div
          ref={horizontalCardsRef}
          className={`horizontalCards${isDraggingProjects ? " isDragging" : ""}`}
          onMouseDown={handleProjectDragStart}
          onMouseMove={handleProjectDragMove}
          onMouseUp={stopProjectDrag}
          onMouseLeave={stopProjectDrag}
        >
          {showcaseProjects.map((project) => (
            <article key={project.image} className="projectPanel">
              <Image
                src={project.image}
                alt={project.title}
                fill
              />
              <div>
                <span>{project.location}</span>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div id="pwd-way" ref={pwdWayRef}>
        <section className="paperStack desktopPaperStack">
          <div className="sectionLabel">The PWD Way</div>

          <div className="stackInner">
            {pwdSteps.map((step, index) => (
              <section
                key={step.title}
                className="paperStep"
                style={{ zIndex: index + 1 }}
              >
                <h2>{step.title}</h2>
                <p>{step.text}</p>
              </section>
            ))}
          </div>
        </section>

        <MobilePaperStack />
      </div>

      <section className="movingGallery" id="gallery" ref={galleryRef}>
        <div className="sectionLabel">Gallery</div>
        <div className="marquee">
          {[...galleryImages, ...galleryImages, ...galleryImages].map((src, index) => (
            <div className="galleryItem" key={`${src}-${index}`}>
              <img
                src={src}
                alt={`PWD gallery image ${index + 1}`}
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="reviews" id="reviews" ref={reviewsRef}>
        <div className="reviewTopline">
          <span>Reviews</span>
        </div>

        <h2>Trusted in homes across Manchester.</h2>

        <div className="reviewStage">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={activeReview}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              “{currentReview.quote}”
              <footer>{currentReview.name}</footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <a
          className="reviewLink"
          href="https://www.facebook.com/PWDMediaWalls/reviews"
          target="_blank"
          rel="noreferrer"
        >
          Read our reviews
          <span aria-hidden="true">→</span>
        </a>
      </section>

      <section className="contact" id="contact" ref={contactRef}>
        <p>Ready to plan your media wall?</p>
        <h2>Book a free consultation.</h2>
        <div className="contactLinks">
          <a href="tel:07782913456">07782 913456</a>
          <a href="https://wa.me/447782913456">WhatsApp</a>
          <a href="mailto:hello@premiumwalldesigns.co.uk">
            hello@premiumwalldesigns.co.uk
          </a>
        </div>
      </section>
    </main>
  );
}
