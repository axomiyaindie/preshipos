import Image from "next/image";
import Link from "next/link";

export function Brand() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5"
      aria-label="PreShipOS home"
    >
      <Image
        src="/branding/logo/logo.png"
        alt=""
        width={36}
        height={36}
        priority
        className="size-9 object-contain"
      />
      <span className="text-lg font-bold tracking-tight text-foreground">
        PreShipOS
      </span>
    </Link>
  );
}
