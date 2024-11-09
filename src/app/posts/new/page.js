"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category }),
      });

      if (res.ok) {
        router.push("/posts"); // Redirect to posts list after creation
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-medium">Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-2 border rounded-md"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-medium">Content:</span>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="p-2 border rounded-md"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-medium">Category:</span>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="p-2 border rounded-md"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
