function createRecamanSequence(n: number) {
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

export { createRecamanSequence };
