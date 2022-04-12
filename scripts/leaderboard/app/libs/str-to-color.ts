export const strToColor = (str: string) => {
  const n = Array.from(str)
    .map((ch) => ch.charCodeAt(0))
    .reduce((a, b) => a + b);
  const colorAngle = (n * n) % 360;
  return `hsl(${colorAngle}, 80%, 64%)`;
};
