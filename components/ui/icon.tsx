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
  const width = typeof size === "number" ? size : size.width;
  const height = typeof size === "number" ? size : size.height;

  return (
    <div className={className || `w-[${width}px] h-[${height}px]`}>
      {/* <Image
        src={src ? src : `/icons/${name}.svg`}
        alt={alt ?? name ?? "icon"}
        width={width}
        height={height}
        className="w-full h-full"
      /> */}
      <img src={src ? src : `/icons/${name}.svg`} alt={alt ?? name ?? "icon"} />
    </div>
  );
}
