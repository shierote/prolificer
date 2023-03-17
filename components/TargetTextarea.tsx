import React, { useState } from "react";
import { Box, Text, Textarea } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { targetTextState } from "../pages";

function TargetTextarea() {
  const [value, setValue] = useRecoilState(targetTextState);

  async function onChange(event) {
    const inputValue = event.target.value;
    setValue(inputValue);
  }
  return (
    <>
      <Box>
        <Text as={"b"}>元のテキスト</Text>
      </Box>
      <Textarea
        value={value}
        onChange={onChange}
        placeholder="知的レベルを変えたいテキストを入力してください。"
        height={400}
      />
    </>
  );
}

export default TargetTextarea;
