
export function buildCsv(results) {
  if (!results.length) return null;

  const headers = Object.keys(results[0]).join(",") + "\n";
  const rows = results
    .map((r) =>
      Object.values(r)
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  return headers + rows;
}