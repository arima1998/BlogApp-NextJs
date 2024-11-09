"use client";

// app/posts/[id]/page.js
import React, { useEffect, useState, use } from "react";
import Link from "next/link";

export default function PostDetail({ params }) {
  const { id } = use(params);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
        } else {
          console.error("Failed to fetch post");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/posts`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        router.push("/posts"); // Redirect to posts list after deletion
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  if (!post) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg mb-6">{post.content}</p>
      <p className="text-sm text-gray-600 mb-4">Category: {post.category}</p>

      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Delete Post
        </button>

        {/* Edit Button */}
        <Link href={`/posts/edit/${post.id}`}>
          <p className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition">
            Edit Post
          </p>
        </Link>
      </div>
    </div>
  );
}
