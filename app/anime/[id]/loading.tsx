export default function AnimeDetailLoading() {
  return (
    <main className="sm:p-16 py-16 px-8 max-w-7xl mx-auto">
      <div className="h-8 w-32 bg-[#161921] rounded animate-pulse mb-8" />
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full max-w-[225px] aspect-[225/350] rounded-xl bg-[#161921] animate-pulse" />
        <div className="flex-1 space-y-4">
          <div className="h-10 bg-[#161921] rounded w-3/4 animate-pulse" />
          <div className="h-5 bg-[#161921] rounded w-1/2 animate-pulse" />
          <div className="flex gap-4 mt-6">
            <div className="h-8 w-20 bg-[#161921] rounded animate-pulse" />
            <div className="h-8 w-28 bg-[#161921] rounded animate-pulse" />
          </div>
          <div className="h-4 bg-[#161921] rounded w-full animate-pulse mt-6" />
          <div className="h-4 bg-[#161921] rounded w-full animate-pulse" />
          <div className="h-4 bg-[#161921] rounded w-2/3 animate-pulse" />
        </div>
      </div>
    </main>
  );
}
