/**
 * Determines if the provided {@param value} is a type of Record.
 */
export function isRecord(value: unknown): value is Record<string | number | symbol, unknown> {
  return !!value &&
    (typeof value === 'object') &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    !(value instanceof Blob) &&
    !(value instanceof File);
}
