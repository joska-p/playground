export const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
export const shuffleObject = (object) => {
    const keys = Object.keys(object);
    const values = Object.values(object);
    const shuffledValues = shuffleArray(values);
    return Object.fromEntries(keys.map((key, index) => [key, shuffledValues[index]]));
};
export const getRandom = (array) => {
    const item = array[Math.floor(Math.random() * array.length)];
    if (item === undefined) {
        throw new Error("Cannot get random item from empty array");
    }
    return item;
};
export const safeFetch = async (url, scheme) => {
    const response = await fetch(url);
    if (!response.ok)
        throw new Error("Network response was not ok");
    return scheme.parse(await response.json());
};
export const getRandomValue = (obj) => {
    const keys = Object.keys(obj);
    return getRandom(keys);
};
export const stall = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
