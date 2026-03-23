const BASE_SPEED = 0.2; // fraction of light speed (game feel, not real physics)
const SPEED_PER_ENGINE = 0.15; // scaling per engine level
const MIN_TIME = 2; // minimum travel time (seconds)
const MAX_TIME = 30; // cap for UX

/**
 * Calculate travel time in seconds
 * Deterministic, fast, and gameplay-friendly
 */
export function calculateTravel(distanceLY, engineLevel = 1) {
  if (!Number.isFinite(distanceLY) || distanceLY <= 0) {
    throw new Error("Invalid distance");
  }

  if (!Number.isFinite(engineLevel) || engineLevel <= 0) {
    engineLevel = 1;
  }

  // Effective speed (fraction of light speed)
  const speed = BASE_SPEED + engineLevel * SPEED_PER_ENGINE;

  // Time = distance / speed
  let time = distanceLY / speed;

  // Convert to seconds (scaled for gameplay)
  time *= 5;

  // Clamp for UX sanity
  time = Math.max(MIN_TIME, Math.min(MAX_TIME, time));

  return Math.round(time);
}