"use client"

import { title, subtitle } from "@/components/primitives";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Live&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>life&nbsp;</h1>
        <br />
        <h1 className={title()}>
          with financial independence.
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          One-stop finance tracking.
        </h2>
        <div>
        <Image
          as={NextImage}
          isBlurred
          width={1000}
          height={666}
          src="/freedom.jpg"
          alt="Financial freedom image"
        />
        </div>
      </div>
    </section>
  );
}
