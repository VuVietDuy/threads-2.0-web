import { Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import CreatePost from "./CreatePost";
import LogoutButton from "./LogoutButton";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BsFillChatQuoteFill } from "react-icons/bs";

function Navbar() {
  const user = useRecoilValue(userAtom);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      position={"fixed"}
      top={{
        base: "auto",
        md: 0,
      }}
      left={0}
      right={{
        base: 0,
        md: "auto",
      }}
      bottom={0}
      w={{
        base: "100%",
        md: "68px",
      }}
      flexDirection={{
        base: "row",
        md: "column",
      }}
      justifyContent={{
        base: "center",
        md: "space-between",
      }}
      bg={{
        base: "gray.dark",
        md: "none",
      }}
      py={{
        base: 4,
        md: 6,
      }}
    >
      <Flex
        display={{
          base: "none",
          md: "flex",
        }}
        justifyContent={"center"}
      >
        <Image
          cursor={"pointer"}
          alt="logo"
          w={6}
          src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
          onClick={toggleColorMode}
        ></Image>
      </Flex>
      <Flex
        flexDirection={{
          base: "row",
          md: "column",
        }}
        gap={10}
        alignItems={{
          base: "center",
        }}
      >
        {user && (
          <>
            <Link as={RouterLink} to={"/"}>
              <AiFillHome size={24}></AiFillHome>
            </Link>
            <CreatePost />
            <Link as={RouterLink} to={`/chat`}>
              <BsFillChatQuoteFill size={24}></BsFillChatQuoteFill>
            </Link>
            <Link as={RouterLink} to={`/${user.username}`}>
              <RxAvatar size={24}></RxAvatar>
            </Link>
          </>
        )}
      </Flex>
      <Flex
        display={{
          base: "none",
          md: "flex",
        }}
        justifyContent={"center"}
      >
        {user && <LogoutButton />}
      </Flex>
    </Flex>
  );
}

export default Navbar;
