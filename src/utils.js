function isOdd (n) {
    return n % 2 === 0
}

function hasRepeatArg(args) {
    let isError = false;
    args.map((arg, mi) => {
        const r = args.filter((argR, fi) => arg === argR && fi !== mi)
        if (r.length !== 0) isError = true
    })
    return isError;
}

module.exports = {isOdd, hasRepeatArg}