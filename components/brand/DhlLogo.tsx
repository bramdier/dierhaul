import Image from "next/image";

const LOGO_SRC = "/images/dhl-logo.png";

/** Official DHL wordmark, used as an attribution mark. */
export default function DhlLogo({
  className = "h-8 w-auto",
}: {
  className?: string;
}) {
  return (
    <Image
      src={LOGO_SRC}
      alt="DHL"
      width={478}
      height={105}
      className={className}
    />
  );
}
