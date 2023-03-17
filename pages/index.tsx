import React from "react";
import Head from "next/head";
import { Container, SimpleGrid } from "@chakra-ui/react";
import TargetTextarea from "../components/TargetTextarea";
import { atom, RecoilRoot } from "recoil";
import Navbar from "../components/Navbar";
import OutputTextGroup from "../components/OutputTextGroup";

type LevelInfo = {
  body: string | null;
  isLoading: boolean;
};

export const LEVEL_LIST: number[] = [0, 25, 50, 75, 100];
const INITIAL_TARGET_TEXT = "";
const INITIAL_LEVEL_INFOS: { [level: number]: LevelInfo } = {};
LEVEL_LIST.forEach((level) => {
  INITIAL_LEVEL_INFOS[level] = {
    body: null,
    isLoading: false,
  };
});
const INITIAL_SLIDER_VALUE = 50;

export const targetTextState = atom<string>({
  key: "targetTextState",
  default: INITIAL_TARGET_TEXT,
});
export const levelInfosState = atom<{ [level: number]: LevelInfo }>({
  key: "levelInfosState",
  default: INITIAL_LEVEL_INFOS,
});
export const sliderValueState = atom<number>({
  key: "sliderValueState",
  default: INITIAL_SLIDER_VALUE,
});

export default function Home() {
  return (
    <RecoilRoot>
      <Head>
        <title>知的レベル調整器</title>
      </Head>

      <Navbar />

      <Container maxW={1200} mt={8}>
        <SimpleGrid columns={2} spacingX="20px" spacingY="20px">
          <section>
            <TargetTextarea />
          </section>
          <section>
            <OutputTextGroup />
          </section>
        </SimpleGrid>
      </Container>
    </RecoilRoot>
  );
}
