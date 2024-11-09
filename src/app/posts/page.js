"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  // Fetch all posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-8 relative">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>

      {/* New Post Button */}
      <Link href="/posts/new">
        <p className="absolute top-8 right-8 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition">
          + New Post
        </p>
      </Link>

      <div className="grid gap-8 mt-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
            <Link href={`/posts/${post.id}`}>
              <p className="text-blue-500 hover:underline mt-2 inline-block">
                Read more
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
