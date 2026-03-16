const MAX_SPEED = 3e16;
const ACCELERATION = 1.08;
const LY_IN_METERS = 9.461e15;

export function calculateTravel(distanceLY) {
  const distance = distanceLY * LY_IN_METERS;

  let speed = 1;
  let traveled = 0;
  let time = 0;

  while (traveled < distance) {
    speed = Math.min(speed * ACCELERATION, MAX_SPEED);

    traveled += speed;

    time++;
  }

  return time;
}
