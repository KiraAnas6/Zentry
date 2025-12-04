import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
function NavBar() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const NavContainerRef = useRef(null);
  const audioRef = useRef(null);
  const [currentScroll, setCurrentScroll] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  
  useEffect(() => {
    const handleScroll = () => setLastScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    if (lastScrollY === 0) {
      NavContainerRef.current.classList.remove("floating-nav");
    } else if (currentScroll > lastScrollY) {
      setIsNavVisible(false);
      NavContainerRef.current.classList.add("floating-nav");
    } else if (currentScroll < lastScrollY) {
      setIsNavVisible(true);
      NavContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScroll);
    setCurrentScroll(window.scrollY);
    // Clean Up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentScroll, lastScrollY]);

  useEffect(() => {
    gsap.to(NavContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const NavLinks = ["Nexus", "Vault", "Prologue", "About", "Contact"];
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };
  useEffect(() => {
    if (isAudioPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div
      ref={NavContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-300 sm:inset-x-6 "
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <Button
              id="product-button"
              title={"Products"}
              rightIcon={<TiLocationArrow />}
              containerClass={
                "bg-blue-50 md:flex hidden items-center justify-center gap-1"
              }
            />
          </div>
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {NavLinks.map((link) => (
                <a
                  className="nav-hover-btn"
                  key={link}
                  href={`#${link.toLowerCase()}`}
                >
                  {link}
                </a>
              ))}
            </div>
            <button
              className="ml-10 flex justify-center rounded-full items-center space-x-0.5 w-[30px] aspect-square bg-yellow-300 p-2"
              onClick={toggleAudioIndicator}
            >
              <audio src="/audio/loop.mp3" className="" loop ref={audioRef} />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  className={`indicator-line !bg-black ${
                    isIndicatorActive ? "active" : ""
                  }`}
                  key={`bar_${bar}`}
                  style={{ animationDelay: `${0.1 * bar}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default NavBar;
