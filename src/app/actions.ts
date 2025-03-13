"use server";

export async function createBoardAction(formData: FormData) {
  const title = formData.get("title") as string;
  console.log(`Server: Creating board with title "${title}"`);
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate server delay
  const newSlug = title.toLowerCase().replace(/\s+/g, "-") || "default";
  return { id: "new-id", title, slug: newSlug };
}
