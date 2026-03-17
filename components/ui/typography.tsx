type Variant =
  | "hero"
  | "display"
  | "h1"
  | "h2"
  | "bodyLg"
  | "body"
  | "small"
  | "caption";

const variantMap = {
  hero: "text-hero",
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  bodyLg: "text-body-lg",
  body: "text-body",
  small: "text-small",
  caption: "text-caption",
};

export default function Typography({
  variant,
  children,
}: {
  variant: Variant;
  children: React.ReactNode;
}) {
  return <p className={variantMap[variant]}>{children}</p>;
}
