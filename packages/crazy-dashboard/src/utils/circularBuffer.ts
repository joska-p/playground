interface CircularBufferOptions {
  size: number;
}

/**
 * Fixed-size circular buffer with O(1) writes.
 * Avoids costly Array.shift() by overwriting oldest entries when full.
 */
function createCircularBuffer({ size }: CircularBufferOptions) {
  const buffer = new Float64Array(size);
  let writeIndex = 0;
  let count = 0;

  return {
    /** Write a value to the buffer (overwrites oldest when full). */
    push(value: number): void {
      buffer[writeIndex] = value;
      writeIndex = (writeIndex + 1) % size;
      if (count < size) count++;
    },

    /** Number of values currently in the buffer (0 to size). */
    get length(): number {
      return count;
    },

    /** Max capacity of the buffer. */
    get capacity(): number {
      return size;
    },

    /**
     * Iterate values oldest-to-newest.
     * Returns an array of { value, index } pairs in correct order.
     */
    entries(): Array<{ value: number; index: number }> {
      const result: Array<{ value: number; index: number }> = [];
      for (let i = 0; i < count; i++) {
        const readIndex = (writeIndex - count + i + size) % size;
        result.push({ value: buffer[readIndex]!, index: i });
      }
      return result;
    },

    /** Clear the buffer. */
    clear(): void {
      writeIndex = 0;
      count = 0;
    },
  };
}

export { createCircularBuffer };
