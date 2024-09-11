import { Flex, Spinner, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const getFeedPosts = async () => {
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            status: "error",
          });
        }
        setPosts(data);
      } catch (e) {
        toast({
          title: "An error occurred",
          description: "Please try again later.",
          status: "error",
        });
      }
    };
    getFeedPosts();
    setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading && (
        <Flex justifyContent={"center"}>
          <Spinner size={xl}></Spinner>
        </Flex>
      )}
      {!isLoading && posts.length === 0 && (
        <h1>Follow some users to see the feed</h1>
      )}
      {posts &&
        posts.map((post) => <PostCard key={post._id} post={post}></PostCard>)}
    </>
  );
}

export default HomePage;
