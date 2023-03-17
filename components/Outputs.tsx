import React from "react";
import { useState } from "react";
import {
  Button,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Box,
  SkeletonText,
  Spinner,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useRecoilState } from "recoil";
import { targetTextState } from "../pages";

type LevelInfo = {
  label: string;
  body: string;
};

const initial_level_infos: { [key: string]: LevelInfo } = {
  Kindergarten: {
    label: "幼稚園児",
    body: null,
  },
  JuniorHighSchool: {
    label: "中学生",
    body: null,
  },
  HighSchool: {
    label: "高校生",
    body: null,
  },
  Graduate: {
    label: "大学院生",
    body: null,
  },
  Expert: {
    label: "専門家",
    body: null,
  },
};

function Outputs() {
  const [text, setText] = useRecoilState(targetTextState);
  const [level_infos, setLevelInfos] = useState(initial_level_infos);
  const [isLoading, setIsLoading] = useState(false);

  async function onClick(level) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          level: level_infos[level].label,
          original: text,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setLevelInfos({
        ...level_infos,
        [level]: {
          ...level_infos[level],
          body: data.result,
        },
      });
      console.log(level_infos);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
    setIsLoading(false);
  }

  return (
    <Tabs isLazy>
      <TabList>
        {Object.entries(level_infos).map(([level, level_info]) => {
          return <Tab key={level}>{level_info.label}</Tab>;
        })}
      </TabList>
      <TabPanels>
        {Object.entries(level_infos).map(([level, level_info]) => {
          return (
            <TabPanel key={level}>
              <Box>
                {isLoading ? (
                  <SkeletonText
                    mt="4"
                    noOfLines={2}
                    spacing="4"
                    skeletonHeight="2"
                  />
                ) : level_info.body === null ? (
                  <Text mt={2}>
                    まだ{level_info.label}レベルの説明は生成されていません。
                  </Text>
                ) : (
                  <>{level_info.body}</>
                )}
              </Box>

              <Box mt={4}>
                {isLoading ? (
                  <Button
                    leftIcon={<Spinner />}
                    colorScheme="teal"
                    variant="outline"
                    disabled
                  >
                    <Text>生成中...</Text>
                  </Button>
                ) : (
                  <Button
                    leftIcon={<RepeatIcon />}
                    colorScheme="teal"
                    variant="solid"
                    onClick={() => onClick(level)}
                  >
                    {level_info.body === null ? (
                      <Text>生成</Text>
                    ) : (
                      <Text>再生成</Text>
                    )}
                  </Button>
                )}
              </Box>
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
}

export default Outputs;
