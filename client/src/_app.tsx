import type { AppProps } from "next/app";
import { ChainId ,ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { Auth, AuthContext, AuthStateProvider } from "../context";
import { useState } from "react";
import { Sepolia } from "@thirdweb-dev/chains";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      
      clientId="0d1b3d750a8ed1aa8d24c5831a839512"
      activeChain={Sepolia}
    >
      <AuthStateProvider>
        <Component {...pageProps} />
      </AuthStateProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
