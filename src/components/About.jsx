import { useGSAP } from "@gsap/react";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
function About() {
  useGSAP(() => {
    const ClipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });
    ClipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: "0",
    });
  });
  return (
    <div id="about" className="min-h-screen w-scren">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          welcome to zentry
        </h2>
        <AnimatedTitle 
        title={"Disc<b>o</b>ver the world's <br />l<b>a</b>rgest shared adventure"}
        containerClass={"mt-5 text-center !text-black"}
        />
        <div className="about-subtext">
          <p>The Game of Games begins-your life, now an epic MMORPG</p>
          <p>Zentry unites every player from coutless games and platforms</p>
        </div>
      </div>
      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="background"
            className="absolute left=0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
