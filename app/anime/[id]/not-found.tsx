import Link from "next/link";

export default function AnimeNotFound() {
  return (
    <main className="sm:p-16 py-16 px-8 max-w-7xl mx-auto text-center">
      <h1 className="text-2xl font-bold text-white mb-4">Anime not found</h1>
      <p className="text-white/70 mb-6">
        The anime you&apos;re looking for doesn&apos;t exist or could not be
        loaded.
      </p>
      <Link
        href="/"
        className="inline-block px-4 py-2 bg-[#161921] text-white rounded-lg hover:bg-[#1e2230] font-medium"
      >
        Back to Explore
      </Link>
    </main>
  );
}
