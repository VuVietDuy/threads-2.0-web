import {
  Avatar,
  Box,
  Divider,
  Flex,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";

function MessageContainer() {
  const toast = useToast();
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const [messages, setMessages] = useState([]);
  const currentUser = useRecoilValue(userAtom);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(`/api/messages/${selectedConversation.userId}`);
        const data = await res.json();
        if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            status: "error",
          });
          return;
        }
        setMessages(data);
        console.log(data);
      } catch {
        toast({
          title: "Error",
          description: "Failed to load messages",
          status: "error",
        });
      }
    };
    getMessages();
  }, []);
  return (
    <Flex
      flex={70}
      bg={useColorModeValue("gray.200", "gray.dark")}
      borderRadius={"md"}
      flexDirection={"column"}
    >
      {/* Message header */}
      <Flex w={"full"} h={12} p={2} alignItems={"center"} gap={2}>
        <Avatar src="" size={"sm"}></Avatar>
        <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
          Vu Viet Duy <Image src="/verified.png" w={4} h={4} ml={1}></Image>
        </Text>
      </Flex>
      <Divider />
      <Flex
        flexDir={"column"}
        gap={4}
        my={4}
        p={2}
        maxH={"400px"}
        overflowY={"auto"}
      >
        {false &&
          [...Array(5)].map((_, i) => (
            <Flex
              key={i}
              gap={2}
              alignItems={"center"}
              p={1}
              borderRadius={"m"}
              alignSelf={i % 2 == 0 ? "flex-start" : "flex-end"}
            >
              {i % 2 === 0 && <SkeletonCircle size={7}></SkeletonCircle>}
              <Flex flexDir={"column"} gap={2}>
                <Skeleton h={"8px"} w={"250px"}></Skeleton>
                <Skeleton h={"8px"} w={"full"}></Skeleton>
              </Flex>
              {i % 2 !== 0 && <SkeletonCircle size={7}></SkeletonCircle>}
            </Flex>
          ))}

        {messages.map((message) => (
          <Message
            key={message._id}
            message={message}
            ownMessage={message.sender._id === currentUser._id}
          ></Message>
        ))}
      </Flex>

      <Box p={2}>
        <MessageInput setMessages={setMessages} />
      </Box>
    </Flex>
  );
}

export default MessageContainer;
