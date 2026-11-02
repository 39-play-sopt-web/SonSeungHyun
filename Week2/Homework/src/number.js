export const createNumbers = (start, end) => 
    Array.from({length: end - start + 1}, (_,i)=>start + i);

export const random = (array) => {
    const result = [...array];
    for(let i = 0; i < result.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = result[i];
        result[i] = result[j];
        result[j] = temp;
    }
    return result;
}