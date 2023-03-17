import React from "react";
import Head from "next/head";
import { Container } from "@chakra-ui/react";
import TargetTextarea from "../components/TargetTextarea";
import Outputs from "../components/Outputs";
import { atom, RecoilRoot } from "recoil";

export const targetTextState = atom({
  key: "targetTextState",
  default: "",
});

export default function Home() {
  return (
    <RecoilRoot>
      <Head>
        <title>5段階のレベル</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <Container>
        <section>
          <TargetTextarea />
        </section>
        <section>
          <Outputs />
        </section>
      </Container>
    </RecoilRoot>
  );
}
