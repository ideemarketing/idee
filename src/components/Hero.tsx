import Image from "next/image";

export async function Hero() {
  return (
    <section className="relative flex min-h-[320px] w-full flex-col justify-end lg:min-h-[620px] lg:flex-row">
      {/* Decorative circle: primary red, center-right */}
      <div
        className="pointer-events-none absolute right-56 top-1/2 z-0 hidden h-40 w-40 -translate-y-1/2 rounded-full lg:block bg-primary/20"
        aria-hidden
      />

      {/* Decorative circle: bottom-right */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 z-0 hidden h-48 w-48 lg:block xl:h-64 xl:w-64"
        aria-hidden
      >
        <Image
          src="/images/hero-circle1.png"
          alt=""
          fill
          className="object-contain object-bottom-right"
        />
      </div>

      {/* Desktop background */}
      <div
        className="absolute inset-0 hidden bg-cover bg-left bg-no-repeat lg:block lg:bg-contain"
        style={{ backgroundImage: "url(/images/hero.png)" }}
        aria-hidden
      />

      {/* TEXT + Value Lab */}
      <div className="relative z-10 flex flex-col justify-center bg-white px-6 py-12 lg:w-4/8 lg:bg-transparent lg:px-12 lg:py-16 xl:px-16">
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-wider md:text-sm"
          style={{ color: "var(--dark)" }}
        >
          ¡Bienvenido! Haz crecer tu negocio hoy
        </p>
        <h1
          className="mb-6 text-2xl font-bold leading-tight md:text-3xl lg:text-5xl"
          style={{ color: "var(--dark)" }}
        >
          Deja de
          <em className="font-normal not-italic opacity-90">trabajar</em> de
          más.
          <br />
          Empieza a
          <em className="font-normal not-italic opacity-90">trabajar</em> mejor.
        </h1>

        <a
          href="https://wa.me/525551048399"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center justify-center rounded-lg px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-95"
          style={{ backgroundColor: "var(--dark)" }}
        >
          ¡Comienza ahora!
        </a>
      </div>

      {/* Mobile image */}
      <div
        className="relative min-h-[240px] w-full bg-cover bg-top bg-no-repeat md:min-h-[420px] lg:hidden"
        style={{ backgroundImage: "url(/images/hero.png)" }}
        aria-hidden
      />
    </section>
  );
}
