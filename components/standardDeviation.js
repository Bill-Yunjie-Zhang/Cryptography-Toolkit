const standardDeviation = (stats) => {
    let sum = 0
    let total = stats.reduce((a, b) => a + b, 0)
    let mean = total / stats.length
    stats.forEach(e => sum += Math.pow(e - mean, 2))
    let variance = 1 / stats.length * sum
    let standardDeviation = Math.sqrt(variance)
    return standardDeviation
}

module.exports = standardDeviation