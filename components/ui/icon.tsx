import Image from "next/image";

type IconProps = {
  name?: string;
  size?: number | { width: number; height: number };
  alt?: string;
  className?: string;
  src?: string;
};

export default function Icon({
  name,
  size = 24,
  alt,
  className,
  src,
}: IconProps) {
  return (
    <Image
      src={src ? src : `/icons/${name}.svg`}
      alt={alt ?? name ?? "icon"}
      width={typeof size === "number" ? size : size.width}
      height={typeof size === "number" ? size : size.height}
      className={className}
    />
  );
}
