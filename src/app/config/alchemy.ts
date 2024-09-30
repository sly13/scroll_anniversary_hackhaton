"use client";

import { JsonRpcProvider } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY_URL);

export default provider;
