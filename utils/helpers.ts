export const randomColor = () => {
    const random = Math.floor(Math.random()*16777215).toString(16);
    return '#' + random;
};

