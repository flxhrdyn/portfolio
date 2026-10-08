export function limitWheelDelta(deltaY: number, maxAbsDelta: number): number {
  if (maxAbsDelta <= 0) {
    throw new RangeError("maxAbsDelta must be greater than zero");
  }

  if (Math.abs(deltaY) <= maxAbsDelta) return deltaY;

  return Math.sign(deltaY) * maxAbsDelta;
}
