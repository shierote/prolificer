import React, { useState } from "react";
import { Textarea } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { targetTextState } from "../pages";

function TargetTextarea() {
  const [value, setValue] = useRecoilState(targetTextState);

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };
  return (
    <>
      <Textarea
        value={value}
        onChange={handleInputChange}
        placeholder="知的レベルを変えたいテキストを入力してください。"
        height={400}
      />
    </>
  );
}

export default TargetTextarea;
