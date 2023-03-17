import { RepeatIcon } from "@chakra-ui/icons";
import { Button, Spinner, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  levelInfosState,
  LEVEL_LIST,
  sliderValueState,
  targetTextState,
} from "../pages";
import LevelSlider from "./LevelSlider";
import OutputText from "./OutputText";

async function fetchLeveledText(level: number, originalText: string) {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      level: `${level}`,
      original: originalText,
    }),
  });

  const data = await response.json();
  if (response.status !== 200) {
    throw (
      data.error || new Error(`Request failed with status ${response.status}`)
    );
  }
  return data.result as string;
}

export default function OutputTextGroup() {
  const [text, setText] = useRecoilState(targetTextState);
  const [levelInfos, setLevelInfos] = useRecoilState(levelInfosState);
  const [isAnyLoading, setIsAnyLoading] = useState(false);

  const toast = useToast();

  async function onClick() {
    setIsAnyLoading(true);
    try {
      if (text === "") {
        throw new Error(`元のテキストが空です。`);
      }
      LEVEL_LIST.forEach(async (level) => {
        setLevelInfos((prevState) => ({
          ...prevState,
          [level]: {
            body: prevState[level].body,
            isLoading: true,
          },
        }));

        toast({
          description: `知的レベル${level}の文章生成を開始しました。`,
          duration: 5000,
          isClosable: true,
        });
      });

      await Promise.all(
        LEVEL_LIST.map(async (level) => {
          const leveledText = await fetchLeveledText(level, text);

          setLevelInfos((prevState) => ({
            ...prevState,
            [level]: {
              body: leveledText,
              isLoading: false,
            },
          }));

          toast({
            title: `知的レベル${level}の文章生成が完了しました。`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
    setIsAnyLoading(false);
  }

  return (
    <>
      {text === "" ? (
        <Button
          colorScheme={"teal"}
          leftIcon={<RepeatIcon />}
          isDisabled={true}
        >
          元のテキストが空です。
        </Button>
      ) : !isAnyLoading ? (
        <Button
          colorScheme={"teal"}
          leftIcon={<RepeatIcon />}
          isDisabled={false}
          onClick={onClick}
        >
          一括生成
        </Button>
      ) : (
        <Button
          colorScheme={"teal"}
          leftIcon={<Spinner />}
          isLoading={true}
          variant="outline"
          loadingText="生成中..."
        ></Button>
      )}

      <LevelSlider />
      <OutputText />
    </>
  );
}
