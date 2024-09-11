import { Button, useColorModeValue, useToast } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { FiLogOut } from "react-icons/fi";

function LogoutButton() {
  const setUser = useSetRecoilState(userAtom);
  const toast = useToast();
  const handleLogout = async () => {
    try {
      localStorage.removeItem("user-threads");
      const res = await fetch("api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUser(null);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
        status: "success",
      });
    } catch (e) {
      console.error("Failed to remove user-threads from local storage:", e);
    }
  };

  return (
    <Button
      bg={useColorModeValue("gray.300", "gray.dark")}
      size={"sm"}
      onClick={handleLogout}
    >
      <FiLogOut size={20}></FiLogOut>
    </Button>
  );
}

export default LogoutButton;
