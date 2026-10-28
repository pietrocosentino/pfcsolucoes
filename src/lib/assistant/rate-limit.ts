// Limite simples por aparelho, em memória. Cada instância da função tem o seu,
// então é uma barreira contra abuso casual, não uma garantia; o teto real de
// custo fica no limite de gastos da conta da Anthropic.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 30;
const hits = new Map<string, number[]>();

export function allowRequest(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear(); // evita crescer sem limite numa instância longa
  return true;
}
