import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { sliderValueState } from "../pages";

export default function LevelSlider() {
  const [sliderValue, setSliderValue] = useRecoilState(sliderValueState);
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <Slider
      id="slider"
      defaultValue={sliderValue}
      min={0}
      max={100}
      step={25}
      colorScheme="teal"
      onChange={(v) => setSliderValue(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      m={5}
    >
      <SliderMark value={0} mt="1" ml="-2.5" fontSize="sm">
        0%
      </SliderMark>
      <SliderMark value={25} mt="1" ml="-2.5" fontSize="sm">
        25%
      </SliderMark>
      <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
        50%
      </SliderMark>
      <SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
        75%
      </SliderMark>
      <SliderMark value={100} mt="1" ml="-2.5" fontSize="sm">
        100%
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg="teal.500"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={`${sliderValue}%`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
}
