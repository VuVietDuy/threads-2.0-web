import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Conversation from "../components/Conversation";
import MessageContainer from "../components/MessageContainer";
import {
  conversationAtom,
  selectedConversationAtom,
} from "../atoms/messagesAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { GiConversation } from "react-icons/gi";

function ChatPage() {
  const [conversations, setConversations] = useRecoilState(conversationAtom);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const toast = useToast();

  useEffect(() => {
    const getConversations = async () => {
      setLoadingConversations(true);
      try {
        const res = await fetch("/api/messages/conversations");
        const data = await res.json();
        if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            status: "error",
          });
          return;
        }
        console.log(data);
        setConversations(data);
        setLoadingConversations(false);
      } catch (err) {
        console.error("Failed to fetch conversations:", err);
        toast({
          title: "Error",
          description: "Failed to fetch conversations",
          status: "error",
        });
      }
    };

    getConversations();
  }, []);

  const handleSearchConversation = async (query) => {
    setSearchingUser(true);
    try {
    } catch (err) {
      console.error("Failed to search for conversation:", err);
      toast({
        title: "Error",
        description: "Failed to search for conversation",
        status: "error",
      });
    }
  };
  return (
    <Box
      position={"absolute"}
      left={"50%"}
      transform={"translateX(-50%)"}
      w={{
        base: "full",
        md: "600px",
        lg: "750px",
      }}
      p={4}
    >
      <Flex
        gap={4}
        flexDirection={{
          base: "column",
          md: "row",
        }}
        maxW={{
          sm: "400px",
          md: "full",
        }}
      >
        <Flex
          flex={30}
          gap={2}
          flexDirection={"column"}
          maxW={{
            sm: "250",
            md: "full",
          }}
          mx={"auto"}
        >
          <Text
            fontWeight={700}
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Your conversations
          </Text>
          <form action="">
            <Flex alignItems={"center"} gap={2}>
              <Input placeholder="Search"></Input>
              <Button size={"sm"}>
                <SearchIcon />
              </Button>
            </Flex>
          </form>

          {loadingConversations &&
            [1, 2, 3, 4].map((_, i) => (
              <Flex
                key={i}
                gap={4}
                alignItems={"center"}
                p={"1"}
                borderRadius={"md"}
              >
                <Box>
                  <SkeletonCircle size={"10"}></SkeletonCircle>
                </Box>
                <Flex w={"full"} flexDirection={"column"} gap={3}>
                  <Skeleton h={"10px"} w={"80px"}></Skeleton>
                  <Skeleton h={"8px"} w={"90%"}></Skeleton>
                </Flex>
              </Flex>
            ))}
          {conversations &&
            conversations.map((conversation) => (
              <Conversation
                key={conversation._id}
                conversation={conversation}
              ></Conversation>
            ))}
        </Flex>
        {selectedConversation._id ? (
          <MessageContainer></MessageContainer>
        ) : (
          <Flex
            flex={70}
            borderRadius={"md"}
            p={2}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"400px"}
          >
            <GiConversation size={100}></GiConversation>
            <Text fontSize={"xl"} fontWeight={700}>
              Start a conversation with a friend!
            </Text>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default ChatPage;
