const defaultLocale = process.env.CONTENTFUL_LOCALE || "en-US";

function pickLocalized<T>(value: unknown, locale = defaultLocale): T | null {
  if (value == null) return null;
  if (typeof value === "string" || typeof value === "number")
    return value as T;
  if (typeof value === "object" && !Array.isArray(value)) {
    const map = value as Record<string, T>;
    if (locale in map) return map[locale] ?? null;
    const first = Object.values(map)[0];
    return first ?? null;
  }
  return null;
}

function pickUrl(value: unknown): string | null {
  const direct = pickLocalized<string>(value);
  if (typeof direct === "string" && direct.trim().startsWith("http")) {
    return direct.trim();
  }
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const o = value as Record<string, unknown>;
    const nested = o.uri ?? o.url ?? o.href;
    if (typeof nested === "string" && nested.startsWith("http")) return nested;
    const loc = pickLocalized<unknown>(value);
    if (typeof loc === "string" && loc.startsWith("http")) return loc;
  }
  return null;
}

function formatValueLabDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Mexico_City",
    timeZoneName: "short",
  }).format(d);
}

export type ValueLabData = {
  title: string | null;
  dateLabel: string | null;
  link: string | null;
};

type EntryRow = {
  sys?: { contentType?: { sys?: { id?: string } }; updatedAt?: string };
  fields?: Record<string, unknown>;
};

/** Prefer the entry with the most useful fields (draft-only title loses to one with date + link). */
function pickBestValueLabFields(rows: EntryRow[]): Record<string, unknown> | undefined {
  const idee = rows.filter(
    (r) => r.sys?.contentType?.sys?.id === "ideeValueLab",
  );
  const pool = idee.length > 0 ? idee : rows;

  function score(fields: Record<string, unknown>): number {
    let n = 0;
    if (pickLocalized<string>(fields.nombreDelValueLab)) n += 1;
    if (pickLocalized<string>(fields.horaDelValueLab)) n += 2;
    if (
      pickUrl(fields.ligaDeInscripcion) ??
      pickUrl(fields.ligaDeInscripción)
    )
      n += 4;
    return n;
  }

  let best: Record<string, unknown> | undefined;
  let bestScore = -1;
  for (const r of pool) {
    const f = r.fields;
    if (!f) continue;
    const s = score(f);
    if (s > bestScore) {
      bestScore = s;
      best = f;
    }
  }
  return best;
}

export async function getValueLab(): Promise<ValueLabData> {
  try {
    const spaceId = process.env.CONTENTFUL_SPACE_ID;
    const environment = process.env.CONTENTFUL_ENVIRONMENT || "master";
    const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN;
    const contentType = process.env.CONTENTFUL_VALUE_LAB_CONTENT_TYPE;

    if (!spaceId || !previewToken) {
      throw new Error(
        "Missing Contentful config. Set CONTENTFUL_SPACE_ID and CONTENTFUL_PREVIEW_TOKEN in .env.local",
      );
    }

    const params = new URLSearchParams({
      access_token: previewToken,
      order: "-sys.updatedAt",
      // Fetch several entries: multiple Value Lab drafts can exist; newest may be title-only.
      limit: contentType ? "10" : "20",
    });
    if (contentType) {
      params.set("content_type", contentType);
      params.set("fields.nombreDelValueLab[exists]", "true");
    }

    const res = await fetch(
      `https://preview.contentful.com/spaces/${spaceId}/environments/${encodeURIComponent(environment)}/entries?${params.toString()}`,
      {
        next: { revalidate: 60 },
      },
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        `Contentful request failed: ${res.status} ${res.statusText}`,
      );
    }

    if (!data.items || data.items.length === 0) {
      return {
        title: null,
        dateLabel: null,
        link: null,
      };
    }

    const rows = data.items as EntryRow[];
    const item = pickBestValueLabFields(rows);

    if (!item) {
      return {
        title: null,
        dateLabel: null,
        link: null,
      };
    }

    const title = pickLocalized<string>(item.nombreDelValueLab);
    const dateRaw = pickLocalized<string>(item.horaDelValueLab);
    const link =
      pickUrl(item.ligaDeInscripcion) ??
      pickUrl(item.ligaDeInscripción);

    return {
      title,
      dateLabel: formatValueLabDate(dateRaw),
      link,
    };
  } catch (error) {
    console.error("Contentful fetch failed:", error);
    return {
      title: null,
      dateLabel: null,
      link: null,
    };
  }
}
