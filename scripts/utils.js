
export const debounce = (callback, delay = 300) => {

    let timeoutId;

    return (...args) => {

        clearTimeout(timeoutId);

        timeoutId = setTimeout(()=> {
            callback(...args);
        }, delay);

    };

};