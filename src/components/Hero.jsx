import { useRef, useState, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
  const [isClicked, setIsCliced] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVid, setLoadedVid] = useState(0);
  const [current, setCurrent] = useState(1);
  const totalVids = 4;
  const nextVid = useRef(null);
  const handleMinVid = (current) => {
    setIsCliced(true);
    setCurrent(current + 1);
  };
  const handleVidLoad = () => {
    setLoadedVid((prev) => prev + 1);
  };
  const currentPath = (current) => {
    return `/videos/hero-${(current % totalVids) + 1}.mp4`;
  };
  useEffect(() => {
    if (loadedVid) {
      setIsLoading(false);
    }
  }, [loadedVid]);
  useGSAP(
    () => {
      if (isClicked) {
        gsap.from("#next-video", {
          transformOrigin: "center center",
          scale: 0,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
        });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1.5,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVid.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center ",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [current], removeOnUpdate: true }
  );

  useGSAP(() => {
        gsap.set("#video-frame", {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      borderRadius: "0 0 0 0",
      
    });
    gsap.to("#video-frame", {
      clipPath: "polygon(12% 1%, 80% 0%, 100% 100%, 1% 100%)",
      borderRadius: "0 0 40% 10%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="w-screen relative h-dvh overflow-x-hidden">
      {isLoading && (
        <div
          className="flex-center absolute z-[100] w-screen h-dvh
         bg-violet-50 overflow-hidden"
        >
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden bg-blue-75"
      >
        <div className="mask-clip-path absolute-center cursor-pointer size-64 z-50">
          <div
            onClick={() => handleMinVid(current)}
            className="origin-center opacity-0 scale-50
          transition-all duration-500 ease-in hover:opacity-100 hover:!scale-100"
          >
            <video
              className="size-64 scale-150 object-cover object-center relative"
              id="current-video"
              src={currentPath(current + 1)}
              onLoadedData={handleVidLoad}
              ref={nextVid}
            />
          </div>
        </div>
        <video
          className="w-screen h-screen object-cover object-center relative z-10"
          autoPlay
          loop
          id="next-video"
          ref={nextVid}
          src={currentPath(current)}
        />
        <video
          className="w-screen h-screen object-cover object-center absolute inset-0"
          autoPlay
          loop
          src={currentPath(current)}
        />
        <h1 className="absolute bottom-5 right-5 special-font z-40 hero-heading text-white">
          G<b>A</b>MING
        </h1>
      </div>

      <div className="absolute z-40 left-0 top-0 special-font">
        <div className="mr-5 px-5 sm:px-10 text-blue-100 mt-24">
          <h1 className="special-font hero-heading ">
            REDIF<b>N</b>E
          </h1>
          <p className="mb-5 max-w-64 font-robert-regular">
            Enter The Metagame Layer <br />
            Unleash the Play Economy
          </p>
          <Button
            id="watch-trailer"
            title="Watch Trailer"
            leftIcon={<TiLocationArrow />}
            containerClass="bg-yellow-300 flex-center text-black gap-1"
          />
        </div>
      </div>

      <h1 className="absolute bottom-5 right-5 special-font hero-heading ">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;
