/** Peel angles (degrees) — curl starts from that corner/edge. */
export const PEEL_DIRECTIONS = {
  bottomLeft: 225,
  bottomRight: 315,
  topLeft: 135,
  topRight: 45,
  bottom: 270,
  top: 90,
  left: 180,
  right: 0,
};

/** Cycle these across icons for visible variety. */
export const PEEL_VARIATIONS = [
  PEEL_DIRECTIONS.bottomLeft,
  PEEL_DIRECTIONS.bottomRight,
  PEEL_DIRECTIONS.topRight,
  PEEL_DIRECTIONS.topLeft,
  PEEL_DIRECTIONS.left,
  PEEL_DIRECTIONS.right,
  PEEL_DIRECTIONS.bottom,
  PEEL_DIRECTIONS.top,
];
