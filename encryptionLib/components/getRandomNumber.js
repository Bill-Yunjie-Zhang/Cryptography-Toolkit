const getRandomNumber = () => {
    min = Math.ceil(0);
    max = Math.floor(25);
    return Math.floor(Math.random() * (25 - 0 + 1)) + 0;
}

module.exports = getRandomNumber