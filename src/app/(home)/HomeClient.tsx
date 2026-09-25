"use client";

import { useState } from "react";
import IntroLoader from "./Intro/IntroLoader";
import HomeWrapper from "./HomeWrapper";


export default function HomeClient() {

  const [introDone, setIntroDone] = useState(false);


  // The page renders (and server-renders) straight away; the intro plays as an overlay on top of it.
  return (
    <>
      {!introDone && (
        <IntroLoader
          onComplete={() => setIntroDone(true)}
        />
      )}

      <HomeWrapper />
    </>
  );
}
