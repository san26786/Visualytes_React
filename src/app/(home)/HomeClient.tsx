"use client";

import { useState } from "react";
import IntroLoader from "./Intro/IntroLoader";
import HomeWrapper from "./HomeWrapper";


export default function HomeClient() {

  const [started, setStarted] = useState(false);


  return (
    <>
      {!started && (
        <IntroLoader
          onComplete={() => setStarted(true)}
        />
      )}

      {started && <HomeWrapper />}
    </>
  );
}