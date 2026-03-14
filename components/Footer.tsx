// =============================================================================
// FOOTER (components/Footer.tsx)
// =============================================================================
// Server Component. Shown on every page via app/layout.tsx. Contains copyright,
// logo, and social icons (placeholders — update links/alt text as needed).
// =============================================================================
import Image from "next/image";
import { MdCopyright } from "react-icons/md";

function Footer() {
  return (
    <footer className="sm:px-16 py-4 px-8 flex justify-between items-center gap-2 flex-wrap bg-[#161921]">
      <p className="text-base font-bold text-white flex items-center gap-1">
        <MdCopyright /> {new Date().getFullYear()}. All rights reserved.
      </p>
      <Image
        src="/logo.svg"
        alt="logo"
        width={47}
        height={44}
        className="object-contain"
      />
      <div className="flex items-center gap-6">
        <Image
          src="/tiktok.svg"
          alt="logo"
          width={19}
          height={19}
          className="object-contain"
        />
        <Image
          src="/instagram.svg"
          alt="logo"
          width={19}
          height={19}
          className="object-contain"
        />
        <Image
          src="/twitter.svg"
          alt="logo"
          width={19}
          height={19}
          className="object-contain"
        />
      </div>
    </footer>
  );
}

export default Footer;
