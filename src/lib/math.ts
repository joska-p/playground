const findBiggestInterval = (numbers: number[]): number => {
  // If the array has less than 2 elements, there can't be any intervals, so return 0
  if (numbers.length < 2) return 0;

  return numbers.slice(1).reduce((biggestInterval, current, index) => {
    // Calculate the interval between the current number and the previous number
    const interval = Math.abs(current - numbers[index]);

    // Return the maximum of the current biggest interval and the newly calculated interval
    return Math.max(biggestInterval, interval);
  }, 0);
};

export { findBiggestInterval };
