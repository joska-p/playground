function createRemap(inMin: number, inMax: number) {
  if (inMin === inMax) {
    throw new Error('Input range cannot be zero (inMin === inMax)');
  }
  return {
    to(outMin: number, outMax: number) {
      return {
        asFloat: (value: number): number =>
          outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin),
        asInt: (value: number): number =>
          Math.round(outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin))
      };
    }
  };
}

export { createRemap };
