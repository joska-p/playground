export interface ClockOptions {
    duration?: number;
    loop?: boolean;
    pingPong?: boolean;
    speed?: number;
    autoStart?: boolean;
}

export class Clock {
    #time = 0;
    #deltaTime = 0;
    #isPlaying = true;
    #speed = 1;
    #duration: number | undefined = undefined;
    #loop = false;
    #pingPong = false;
    #direction = 1;

    constructor(options: ClockOptions = {}) {
        this.#duration = options.duration;
        this.#loop = options.loop ?? options.duration !== undefined;
        this.#pingPong = options.pingPong ?? false;
        this.#speed = options.speed ?? 1;
        this.#isPlaying = options.autoStart ?? true;
    }

    get time(): number {
        return this.#time;
    }

    get deltaTime(): number {
        return this.#deltaTime;
    }

    get isPlaying(): boolean {
        return this.#isPlaying;
    }

    get speed(): number {
        return this.#speed;
    }

    get duration(): number | undefined {
        return this.#duration;
    }

    get loop(): boolean {
        return this.#loop;
    }

    get pingPong(): boolean {
        return this.#pingPong;
    }

    get progress(): number {
        if (this.#duration === undefined || this.#duration <= 0) return 0;

        return Math.max(0, Math.min(1, this.#time / this.#duration));
    }

    play(): this {
        this.#isPlaying = true;

        return this;
    }

    pause(): this {
        this.#isPlaying = false;
        this.#deltaTime = 0;

        return this;
    }

    togglePlay(): this {
        return this.#isPlaying ? this.pause() : this.play();
    }

    reset(): this {
        this.#time = 0;
        this.#deltaTime = 0;
        this.#direction = 1;

        return this;
    }

    seek(time: number): this {
        this.#time =
            this.#duration !== undefined && this.#duration > 0
                ? Math.max(0, Math.min(this.#duration, time))
                : Math.max(0, time);
        this.#deltaTime = 0;

        return this;
    }

    setSpeed(speed: number): this {
        this.#speed = speed;

        return this;
    }

    update(rawDelta: number): this {
        if (!this.#isPlaying) {
            this.#deltaTime = 0;

            return this;
        }

        const delta = rawDelta * this.#speed;

        this.#deltaTime = delta;

        if (this.#duration === undefined || this.#duration <= 0) {
            this.#time = Math.max(0, this.#time + delta);

            return this;
        }

        const duration = this.#duration;

        if (this.#pingPong) {
            let t = this.#time + delta * this.#direction;

            if (t >= duration) {
                const overflow = t - duration;

                t = duration - overflow;
                this.#direction = -1;

                if (t < 0) t = 0;
            } else if (t <= 0) {
                const underflow = -t;

                t = underflow;
                this.#direction = 1;

                if (t > duration) t = duration;
            }

            this.#time = Math.max(0, Math.min(duration, t));
        } else if (this.#loop) {
            let t = this.#time + delta;

            t = ((t % duration) + duration) % duration;
            this.#time = t;
        } else {
            const t = this.#time + delta;

            if (t >= duration) {
                this.#time = duration;
                this.#isPlaying = false;
            } else if (t <= 0) {
                this.#time = 0;
            } else {
                this.#time = t;
            }
        }

        return this;
    }
}

export function createClock(options?: ClockOptions): Clock {
    return new Clock(options);
}
