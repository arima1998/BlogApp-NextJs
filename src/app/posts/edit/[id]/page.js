"use client";
import React from "react";
import { useEffect, useState, use } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPost({ params }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const { id } = use(params);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (res.ok) {
          const post = await res.json();
          setTitle(post.title);
          setContent(post.content);
          setCategory(post.category);
        } else {
          console.error("Failed to fetch post data");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/posts`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, content, category }),
      });
      if (res.ok) {
        router.push(`/posts/${id}`);
      } else {
        console.error("Failed to Update Post");
      }
    } catch (error) {
      console.error("An Error Occured While updating in edit/post", error);
    }
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            placeholder="...title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}
