import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import { Flex, Spinner, useToast } from "@chakra-ui/react";
import PostCard from "../components/PostCard";

function UserPage() {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/${username}`);
        const data = await res.json();
        if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            status: "error",
          });
          return;
        }
        setUser(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch user data",
          status: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const getPosts = async () => {
      setIsFetching(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch user's posts",
          status: "error",
        });
      } finally {
        setIsFetching(false);
      }
    };

    getUser();
    getPosts();
  }, [username]);

  if (!user && isLoading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"}></Spinner>
      </Flex>
    );
  }
  if (!user) return <h1>User not found</h1>;
  return (
    <div>
      <UserHeader user={user} />
      {!isFetching && posts.length === 0 && <h1>User has not posts.</h1>}
      {isFetching && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {posts && posts.map((post) => <PostCard key={post._id} post={post} />)}
    </div>
  );
}

export default UserPage;
