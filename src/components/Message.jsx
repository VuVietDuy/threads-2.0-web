import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

function Message({ ownMessage, message }) {
  const currentUser = useRecoilValue(userAtom);
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text maxW="350px" bg="blue.400" py={1} px={2} borderRadius="md">
            {message.text}
          </Text>
          <Avatar
            src={currentUser.profilePic}
            name={currentUser.name}
            w={8}
            h={8}
          ></Avatar>
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar
            src={message.sender.profilePic}
            name={message.sender.name}
            w={8}
            h={8}
          ></Avatar>
          <Text
            maxW="350px"
            bg="gray.400"
            py={1}
            px={2}
            borderRadius="md"
            color={"black"}
          >
            {message.text}
          </Text>
        </Flex>
      )}
    </>
  );
}

export default Message;
