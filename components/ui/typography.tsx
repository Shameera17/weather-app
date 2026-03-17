type Variant =
  | "textPreset1"
  | "textPreset2"
  | "textPreset3"
  | "textPreset4"
  | "textPreset5"
  | "textPreset6"
  | "textPreset7"
  | "textPreset8";

const variantMap = {
  textPreset1: "text-hero",
  textPreset2: "text-display",
  textPreset3: "text-h1",
  textPreset4: "text-h2",
  textPreset5: "text-body-lg",
  textPreset6: "text-body",
  textPreset7: "text-small",
  textPreset8: "text-caption",
};

export default function Typography({
  variant,
  children,
  className,
}: {
  variant: Variant;
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`${variantMap[variant]} ${className}`}>{children}</p>;
}
