import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import BlogCard from "./BlogCard";

export function Blogs() {
  const posts = [
    {
      title: "Blog Post 1",
      content: "This is the first blog post.",
      image:
        "https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Blog Post 2",
      content: "This is the second blog post.",
      image:
        "https://images.unsplash.com/photo-1521341957697-b93449760f30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Blog Post 3",
      content: "This is the third blog post.",
      image:
        "https://images.unsplash.com/photo-1536084006720-6c105926e135?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <Container>
      <Box>
        {posts.map((post) => (
          <Box key={post?.title} mb={4}>
            <BlogCard
              title={post.title}
              content={post.content}
              image={post.image}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
