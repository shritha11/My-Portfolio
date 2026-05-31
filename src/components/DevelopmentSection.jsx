import { useRef, useState, useEffect } from "react";
import projects from "../data/projects";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function DevelopmentSection() {
  const swiperRef = useRef(null);
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const currentVideo = videoRefs.current[activeIndex];
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch(() => {});
    }
  }, [activeIndex]);

  const handleVideoEnd = () => {
    const nextIndex = (activeIndex + 1) % projects.length;
    setActiveIndex(nextIndex);
    if (swiperRef.current) swiperRef.current.slideTo(nextIndex);
  };

  return (
    <div className="projects-section">
      <div className="section-header">
        <p className="section-tag">DEVELOPMENT [REACT] PROJECTS</p>
        <h2 style={{ color: "white", textAlign: "center", fontFamily: "var(--font-display)" }}>
          Selected Projects
        </h2>
      </div>
      <Swiper
        centeredSlides={true}
        slidesPerView={isMobile ? 1.05 : 1.4}
        spaceBetween={isMobile ? 12 : 40}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onSlideChange={(swiper) => { setActiveIndex(swiper.activeIndex); }}
        style={{
          paddingLeft: isMobile ? "8px" : "0",
          paddingRight: isMobile ? "8px" : "0",
        }}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={`${project.id}-${index}`}>
            <div
              className={`video-card ${activeIndex === index ? "active" : "inactive"}`}
              onClick={() => window.open(project.live)}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={project.video}
                muted
                playsInline
                onEnded={handleVideoEnd}
                style={{
                  width: "100%",
                  height: isMobile ? "50vh" : "80vh",
                  objectFit: isMobile ? "contain" : "cover",
                  borderRadius: isMobile ? "16px" : "24px",
                  background: "black",
                  display: "block",
                }}
              />
              <h3 style={{
                color: "white",
                textAlign: "center",
                marginTop: "12px",
                fontSize: isMobile ? "15px" : "20px",
                fontFamily: "var(--font-display)",
              }}>
                {project.title}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}