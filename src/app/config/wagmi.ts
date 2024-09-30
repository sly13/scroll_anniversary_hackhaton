"use client";

import { http, createConfig } from "wagmi";
import { scrollSepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [scrollSepolia],
  transports: {
    // [scroll.id]: http(),
    [scrollSepolia.id]: http(),
  },
});
