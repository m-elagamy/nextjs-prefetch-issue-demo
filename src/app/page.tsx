"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBoardAction } from "./actions";

export default function Home() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleOnBlur = (value: string) => {
    if (!value.trim()) {
      setSlug("");
      return; // No prefetch if empty
    }
    const newSlug = value.toLowerCase().replace(/\s+/g, "-");
    console.log("Prefetching:", `/dashboard/${newSlug}`);
    router.prefetch(`/dashboard/${newSlug}`);
    setSlug(newSlug);
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
            setIsSubmitting(true);
            setError(null);
            setSuccess(null);
            try {
              const result = await createBoardAction(formData);
              setSuccess(`Board "${result.title}" created successfully!`);
              redirectToBoard(result.slug);
            } catch (error) {
              console.error("Failed to create board:", error);
              setError("Failed to create board. Please try again.");
            } finally {
              setIsSubmitting(false);
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
              required
              disabled={isSubmitting}
              className="w-full p-5 rounded-xl bg-gray-800/70 border border-gray-600/50 text-white placeholder-gray-500/80 focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:border-transparent text-lg font-medium disabled:bg-gray-700/50 disabled:text-gray-400/70 shadow-inner"
            />
            <p className="text-xs text-gray-400 italic">
              {slug
                ? `Preview: /dashboard/${slug}`
                : "Enter a title to see the slug."}
            </p>
          </div>
          {error && (
            <p className="text-sm text-red-300 bg-red-900/10 p-4 rounded-xl border border-red-800/50">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm text-green-300 bg-green-900/10 p-4 rounded-xl border border-green-800/50">
              {success}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !title.trim()}
            className={`w-full py-5 rounded-xl bg-gradient-to-r from-gray-700 to-gray-600 text-white font-semibold text-xl uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-gray-400/50 shadow-lg ${
              isSubmitting || !title.trim()
                ? "disabled:bg-gray-700/50 disabled:text-gray-400/50 disabled:cursor-not-allowed"
                : "hover:from-gray-600 hover:to-gray-500"
            }`}
          >
            {isSubmitting ? "Creating..." : "Create Board"}
          </button>
        </form>
        <p className="mt-8 text-xs text-gray-600 text-center">
          Check the network tab for prefetch + navigation requests.
        </p>
      </div>
    </div>
  );
}
