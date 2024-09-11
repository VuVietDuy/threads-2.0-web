import { Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  return <Flex justifyContent={"center"} mt={6} mb="12"></Flex>;
}

export default Header;
