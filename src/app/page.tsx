"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBoardAction } from "./actions";

export default function Home() {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const handleOnBlur = (value: string) => {
    if (!value.trim()) {
      return; // No prefetch if empty
    }
    const newSlug = value.toLowerCase().replace(/\s+/g, "-");
    console.log("Prefetching:", `/dashboard/${newSlug}`);
    router.prefetch(`/dashboard/${newSlug}`);
  };

  const redirectToBoard = (newSlug: string) => {
    if (newSlug) {
      console.log("Redirecting to:", `/dashboard/${newSlug}`);
      router.push(`/dashboard/${newSlug}`);

      // Toggle to test prefetch issue
      // setTimeout(() => {
      //   router.push(`/dashboard/${newSlug}`);
      // }, 0);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-8">
      <div className="w-full max-w-xl p-12 rounded-3xl bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl border border-gray-700/50">
        <h1 className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent tracking-tight">
          Create a New Board
        </h1>
        <form
          action={async (formData: FormData) => {
            try {
              const result = await createBoardAction(formData);
              redirectToBoard(result.slug);
            } catch (error) {
              console.error("Failed to create board:", error);
            }
          }}
          className="space-y-8"
        >
          <div className="space-y-3">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-200 uppercase tracking-wider"
            >
              Board Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={(e) => handleOnBlur(e.target.value)}
              placeholder="e.g., Personal Tasks"
              autoFocus
              required
              className="w-full p-5 rounded-xl bg-gray-800/70 border border-gray-600/50 text-white placeholder-gray-500/80 focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:border-transparent text-lg font-medium disabled:bg-gray-700/50 disabled:text-gray-400/70 shadow-inner"
            />
          </div>
          <button
            className={
              "w-full py-5 rounded-xl bg-gradient-to-r from-gray-700 to-gray-600 text-white font-semibold text-xl uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-gray-400/50 shadow-lg"
            }
          >
            Create Board
          </button>
        </form>
        <p className="mt-8 text-xs text-gray-600 text-center">
          Check the network tab for prefetch + navigation requests.
        </p>
      </div>
    </div>
  );
}
