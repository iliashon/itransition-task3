function isOdd (n) {
    return n % 2 === 1
}

function hasRepeatArg(args) {
    let isError = false;
    args.map((arg, mi) => {
        const r = args.filter((argR, fi) => arg === argR && fi !== mi)
        if (r.length !== 0) isError = true
    })
    return isError;
}

function randomNumber(max){
    return Math.floor(Math.random() * (max - 0))
}

module.exports = {isOdd, hasRepeatArg, randomNumber}
