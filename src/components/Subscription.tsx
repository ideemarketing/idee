"use client";

import { useRef, useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    // pega aquí tu <form ...> y asegúrate que llame a handleSubmit
    // (el snippet de arriba)
    null
  );
}

export function Subscription() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <section className="w-full bg-white px-6 py-16 md:px-12 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: text + form */}
        <div className="flex flex-col">
          <h2
            className="mb-4 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl"
            style={{ color: "var(--dark)" }}
          >
            ¿Tu negocio ya vende, pero tú sigues agotado, apagando fuegos y sin
            ver el crecimiento que esperabas?
          </h2>
          <p className="mb-12 text-base text-neutral-600 md:text-lg">
            Toma gratis nuestra clase táctica de 20 minutos enfocada en la
            operación diaria y la toma de decisiones clave para tu negocio.
          </p>

          {/* Form card */}
          <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
            <h3
              className="text-xl font-bold md:text-2xl"
              style={{ color: "var(--dark)" }}
            >
              Inscríbete Gratis
            </h3>
            <p className="mb-6 mt-1 text-sm text-neutral-500">
              Value Lab gratuito de 20 minutos.
            </p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Nombre"
                  className="rounded-lg border border-neutral-300 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label="Nombre"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Apellido"
                  className="rounded-lg border border-neutral-300 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label="Apellido"
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                className="rounded-lg border border-neutral-300 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="Correo electrónico"
              />
              <textarea
                name="message"
                placeholder="Tu mensaje"
                rows={4}
                className="resize-y rounded-lg border border-neutral-300 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="Mensaje"
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-block w-full rounded-lg px-6 py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-95 disabled:opacity-60 sm:w-auto"
                style={{ backgroundColor: "var(--primary)" }}
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>

              {status === "ok" && (
                <p className="text-sm text-green-700">
                  ¡Listo! Te contactaremos pronto.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-700">
                  Algo falló. Intenta de nuevo.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Right: video */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-200 lg:sticky lg:top-8 lg:aspect-4/6 lg:self-start">
          <video
            ref={videoRef}
            src="/videos/video.mp4"
            className="h-full w-full object-cover"
            controls={isPlaying}
            playsInline
            onPause={handlePause}
            onEnded={handlePause}
          />
          {!isPlaying && (
            <button
              type="button"
              onClick={handlePlay}
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white transition-opacity hover:opacity-95"
              style={{ backgroundColor: "var(--primary)" }}
              aria-label="Reproducir video"
            >
              <svg
                className="ml-1 h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
