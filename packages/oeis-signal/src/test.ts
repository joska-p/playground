import { getModule } from './index';

const mod = getModule('naturals');
const signal = mod?.createSignal({ maxTerms: 10 });

console.log(signal?.take(5), ' // [0, 1, 2, 3, 4]');
console.log(signal?.take(3), ' // [5, 6, 7]');
console.log(signal?.next(), ' // { value: 8, done: false }');
