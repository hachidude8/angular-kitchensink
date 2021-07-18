export function isRecord(value: unknown): value is Record<string | number | symbol, unknown> {
  return (typeof value === 'object');
}

// Lazy initialize components
