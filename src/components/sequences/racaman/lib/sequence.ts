function createRacamanSequence(n: number) {
  const sequence: number[] = [];
  let i = 0;
  while (sequence.length < n) {
    const last = sequence[sequence.length - 1];
    if (last === undefined) {
      sequence.push(0);
    } else if (last - i > 0 && !sequence.includes(last - i)) {
      sequence.push(last - i);
    } else {
      sequence.push(last + i);
    }
    i++;
  }
  return sequence;
}

// Test
// const refSequence = [
//   0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10, 23, 9, 24, 8, 25, 43, 62, 42,
//   63, 41, 18, 42, 17, 43, 16, 44, 15, 45, 14, 46, 79, 113, 78, 114, 77, 39, 78,
//   38, 79, 37, 80, 36, 81, 35, 82, 34, 83, 33, 84, 32, 85, 31, 86, 30, 87, 29,
//   88, 28, 89, 27, 90, 26, 91, 157, 224, 156, 225, 155,
// ]
// const racamanSequence = createRacamanSequence(refSequence.length)
// console.log(refSequence.toString() === racamanSequence.toString())

export { createRacamanSequence };
