import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type ThemedImageProps = Omit<ImageProps, "src"> & { light: string; dark: string };

// One image per colour scheme. Only the one that matches the theme is shown and loaded.
export function ThemedImage({ light, dark, alt, className, ...props }: ThemedImageProps) {
  return (
    <>
      <Image src={light} alt={alt} className={cn("dark:hidden", className)} {...props} />
      <Image src={dark} alt={alt} className={cn("hidden dark:block", className)} {...props} />
    </>
  );
}
