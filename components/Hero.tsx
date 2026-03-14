// =============================================================================
// HERO (components/Hero.tsx)
// =============================================================================
// Server Component. Renders the top section: logo, headline, and hero image.
// bg-hero comes from tailwind.config.ts (backgroundImage.hero → /hero.png).
// red-gradient is defined in app/globals.css.
// =============================================================================
import Image from "next/image";

function Hero() {
  return (
    <header className="bg-hero bg-center bg-cover bg-no-repeat sm:p-16 py-16 px-8 flex justify-center lg:items-center max-lg:flex-col w-full sm:gap-16 gap-0">
      <div className="flex-1 flex flex-col gap-10">
        <Image
          src="/logo.svg"
          alt="Anime Vault logo"
          width={56}
          height={53}
          className="object-contain shrink-0"
          style={{ width: 56, height: 53 }}
        />
        <h1 className="sm:text-6xl text-5xl text-white lg:max-w-lg font-bold leading-[120%]">
          Explore The <span className="red-gradient">Diverse Realms</span> of
          Anime Magic
        </h1>
      </div>
      <div className="lg:flex-1 relative w-full h-[50vh] justify-center">
        <Image
          src="/anime.png"
          alt="anime"
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </header>
  );
}

export default Hero;
