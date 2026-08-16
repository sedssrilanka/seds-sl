import Link from "next/link";
import Image from "next/image";
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";

const CustomLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href;

  if (!href) {
    return <a {...props} />;
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function RoundedImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <Image
      alt={props.alt || ""}
      src={props.src || ""}
      width={800}
      height={500}
      className="rounded-lg"
      {...(props as any)}
    />
  );
}

export const mdxComponents = {
  a: CustomLink,
  Image: RoundedImage,
};
