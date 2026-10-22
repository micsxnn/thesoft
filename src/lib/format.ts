/** Utilitários puros de formatação — seguros para bundle do cliente. */

/** Datas em formato suíço: 22.10.2026 */
export function formatSwissDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}.${m}.${y}`;
}
