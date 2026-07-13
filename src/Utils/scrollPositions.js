const scrollPositions = {};

export const saveScrollPosition = (key) => {
    scrollPositions[key] = 1000;
};

export const getScrollPosition = (key) => {
    return scrollPositions[key] ;
};
