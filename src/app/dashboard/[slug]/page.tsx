export default async function DashboardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(`Rendering dashboard for slug: ${slug}`);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <div className="p-12 rounded-3xl bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl border border-gray-700/50">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent tracking-tight">
          Dashboard: {slug}
        </h1>
        <p className="mt-6 text-gray-300 text-lg">
          Welcome to the {slug} dashboard!
        </p>
      </div>
    </div>
  );
}
