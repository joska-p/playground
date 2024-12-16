const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay = 1000
): ((...args: Parameters<T>) => void) => {
  let timeout: number
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => callback(...args), delay)
  }
}

const throttle = <T extends (...args: any[]) => any>(callback: T, delay = 1000) => {
  let shouldWait = false
  let waitingArgs: Parameters<T> | null

  const timeoutFunc = () => {
    if (!waitingArgs) {
      shouldWait = false
    } else {
      callback(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args: Parameters<T>) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    callback(...args)
    shouldWait = true

    setTimeout(timeoutFunc, delay)
  }
}

export { debounce, throttle }
