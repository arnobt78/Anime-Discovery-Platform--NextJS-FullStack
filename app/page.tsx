// =============================================================================
// HOME PAGE (app/page.tsx) — Single route: "/"
// =============================================================================
// This is a Server Component (default in Next.js 14). It runs only on the server.
// Benefits: smaller client bundle, SEO-friendly HTML, no useEffect/useState for initial data.
// =============================================================================
import { fetchAnime } from "./action";

import LoadMore from "../components/LoadMore";

// Async Server Component: we can await data directly. No hooks needed for first load.
async function Home() {
  // First page (8 anime) is fetched on the server and sent as HTML to the client.
  const data = await fetchAnime(1);

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 className="text-3xl text-white font-bold">Explore Anime</h2>

      {/* Same grid as LoadMore: keeps layout consistent for server + client-loaded cards */}
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {/* data = array of <AnimeCard /> elements returned by fetchAnime(1) */}
        {data}
      </section>
      {/* Client Component: when user scrolls here, it fetches page 2, 3, ... and appends cards */}
      <LoadMore />
    </main>
  );
}

export default Home;
