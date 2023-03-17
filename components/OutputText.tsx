import { SkeletonText, Text } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { levelInfosState, sliderValueState } from "../pages";

export default function OutputText() {
  const [levelInfos, setLevelInfos] = useRecoilState(levelInfosState);
  const [sliderValue, setSliderValue] = useRecoilState(sliderValueState);

  return (
    <>
      {levelInfos.hasOwnProperty(sliderValue) ? (
        levelInfos[sliderValue].isLoading ? (
          <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
        ) : (
          <Text mt={2}>{levelInfos[sliderValue].body}</Text>
        )
      ) : (
        <>
          <Text>{sliderValue}レベルの説明は生成されていません。</Text>
        </>
      )}
    </>
  );
}
