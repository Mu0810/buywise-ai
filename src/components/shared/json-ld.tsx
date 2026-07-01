/**
 * Renders a JSON-LD structured-data script. Content is developer-controlled
 * (never user input), so dangerouslySetInnerHTML is safe here.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
