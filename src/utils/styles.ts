export const gridSpacingVertical = (spacing: number, reversed = false) => ({
  margin: spacing,
  [`& > *:not(${reversed ? ':first-child' : ':last-child'})`]: {
    marginBottom: spacing,
    marginRight: 0,
  },
});

export const gridSpacingHorizontal = (spacing: number, reversed = false) => ({
  margin: spacing,
  [`&& > *:not(${reversed ? ':first-child' : ':last-child'})`]: {
    marginRight: spacing,
    marginBottom: 0,
  },
});
