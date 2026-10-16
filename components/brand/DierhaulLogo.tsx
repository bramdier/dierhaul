import Image from "next/image";
import Link from "next/link";

/** Orange mark + HAUL wordmark (transparent PNG) */
const LOGO_SRC = "/images/logo-haul.png";

export default function DierhaulLogo({
  href = "/",
  className = "h-14 w-auto",
  priority = false,
}: {
  href?: string | null;
  className?: string;
  priority?: boolean;
}) {
  const image = (
    <Image
      src={LOGO_SRC}
      alt="Dierhaul"
      width={160}
      height={160}
      priority={priority}
      className={className}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-block" aria-label="Dierhaul home">
        {image}
      </Link>
    );
  }

  return image;
}
