export const randomColor = () => {
    const random = Math.floor(Math.random()*16777215).toString(16);
    return '#' + random;
};

// export const iterateThroughtList = async (page, locator: string, text: string) => {
//     for (const element of await page.locator(locator).all()) {
//         if(await element.textContent() === text) {
//          element.click();
//         }
//      };
// } ;