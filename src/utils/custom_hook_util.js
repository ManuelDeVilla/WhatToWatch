export function jitterAspectRatio(ratio, seed) {
  // deterministic pseudo-random offset based on seed, range ~ -12% to +12%
  const pseudoRandom = Math.abs(Math.sin(seed * 12.9898)) % 1;
  const variance = 0.1; // tune this — how much width variety you want
  const offset = (pseudoRandom - 0.5) * variance;
  return ratio * (1 + offset);
}