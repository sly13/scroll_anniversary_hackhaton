"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useMemo, useState } from "react";
import {
  Container,
  ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { Logo } from "../utils/types";

const ParticlesBackground = ({ imageSources }: { imageSources: Logo[] }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(() => {
    const images = imageSources.map((img: Logo) => ({
      src: img.src,
      width: 16,
      height: 16,
    }));

    return {
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        number: {
          density: {
            enable: true,
          },
          // value: imageSources.length,
          value: 100,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: true,
          speed: 8,
          straight: false,
        },
        opacity: {
          value: 0.05,
        },
        size: {
          value: { min: 20, max: 50 },
        },
        shape: {
          type: "image",
          options: {
            image: images,
          },
        },
      },
      detectRetina: true,
    };
  }, [imageSources]);
  if (init) {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      </div>
    );
  }

  return null;
};

export default ParticlesBackground;
