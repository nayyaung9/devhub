import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Box,
  Tag,
  TagLabel,
  Flex,
  TagCloseButton,
} from "@chakra-ui/react";

type IProps = {
  setTopicFieldState: (arg0: string, arg1: string[]) => void;
};
/**
 * @returns Custom Autocomplete Components
 */
const TagsInput = ({ setTopicFieldState }: IProps) => {
  const [text, setText] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    setTopicFieldState("tags", topics);
  }, [topics]);

  const onAddTopic = () => {
    if (!text) return false;

    setTopics([...topics, text]);

    setText("");
  };

  const removeTopic = (topicText: string) => {
    setTopics(topics.filter((topic) => topic !== topicText));
  };

  return (
    <React.Fragment>
      <Box
        bgColor="gray.100"
        p={2}
        borderColor="inherit"
        borderRadius="0.375rem"
        borderWidth={1}
      >
        <Box my="2">
          {topics
            ? topics.map((topic) => (
                <Tag
                  size="md"
                  ml="1"
                  mb="1"
                  key={topic}
                  borderRadius="full"
                  variant="outline"
                  colorScheme="blue"
                  cursor="pointer"
                >
                  <TagLabel>{topic}</TagLabel>
                  <TagCloseButton onClick={() => removeTopic(topic)} />
                </Tag>
              ))
            : null}
        </Box>

        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Input
            placeholder="Topics"
            borderRadius="0.375rem"
            bgColor="white"
            size="sm"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button ml="1" size="sm" colorScheme="messenger" onClick={onAddTopic}>
            Add
          </Button>
        </Flex>
      </Box>
    </React.Fragment>
  );
};

export default TagsInput;
