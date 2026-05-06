import { useRef, useState, useEffect } from "react";

import projects from "../data/projects";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

function DevelopmentSection() {

  const swiperRef = useRef(null);

  const videoRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);

  // PLAY ACTIVE VIDEO
  useEffect(() => {

    const currentVideo =
      videoRefs.current[activeIndex];

    if (currentVideo) {

      currentVideo.currentTime = 0;

      currentVideo.play();

    }

  }, [activeIndex]);

  // NEXT VIDEO
  const handleVideoEnd = () => {

    const nextIndex =
      (activeIndex + 1) % projects.length;

    setActiveIndex(nextIndex);

    swiperRef.current.slideTo(nextIndex);

  };

  return (

    <div className="projects-section">

      <div className="section-header">

        <p className="section-tag">
          DEVELOPMENT[REACT] PROJECTS
        </p>

        <h2>
          Selected Projects
        </h2>

      </div>

      <Swiper
        centeredSlides={true}
        slidesPerView={1.4}
        spaceBetween={40}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >

        {projects.map((project, index) => (

          <SwiperSlide key={project.id}>

            <div
              className={`video-card ${
                activeIndex === index
                  ? "active"
                  : "inactive"
              }`}
              onClick={() =>
                window.open(project.live)
              }
            >

              <video
                ref={(el) =>
                  (videoRefs.current[index] = el)
                }
                src={project.video}
                muted
                playsInline
                onEnded={handleVideoEnd}
              />

              <h3>{project.title}</h3>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </div>
  );
}

export default DevelopmentSection;