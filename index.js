'use strict'

console.log('firing up')

const sortAlpha = (string) => {
    return string.split('').sort().join('');
}

const multiplyPolynomials = (polyA, polyB) => {

    let result = []

    polyA.forEach((polyATerm) => {
        polyB.forEach((polyBTerm) => {
            result.push(sumPolynomialTerms(polyATerm, polyBTerm))
        })
    })

    result = result.reduce((processedResult, term) => {
        const coeficient = term.match(/\d/g) === null ? 1 : Number(term.match(/\d/g).join(''))
        const rawTerm = term.match(/[a-zA-Z]+/g).join('')

        if (processedResult.hasOwnProperty(rawTerm)) {
            processedResult[rawTerm].coeficient += coeficient
            return processedResult
        }

        processedResult[rawTerm] = {
            coeficient: coeficient
        }
        return processedResult

    }, {})

    return result
}

const formatPolynomial = (polynomial) => {
    const poly = []
    for (let term in polynomial) {
        const coeficient = polynomial[term].coeficient === 1 ? '' : polynomial[term].coeficient
        poly.push(coeficient + term)
    }

    return poly
}

const binomialPower = (binomial, power) => {
    if ( power > -1) {

        let compositePoly = binomial
        let result = [[1]]

        for (let i = power; i > 0; i--) {
            compositePoly = formatPolynomial(multiplyPolynomials(binomial, compositePoly))
            result.push(compositePoly)
        }

        return result

    }

    return -1
}

const sumPolynomialTerms = (termA, termB) => {
    const coeficientA = termA.match(/\d/g) === null ? '' : Number(termA.match(/\d/g).join(''))
    const coeficientB = termB.match(/\d/g) === null ? '' : Number(termB.match(/\d/g).join(''))
    const rawTermA = termA.match(/[a-zA-Z]+/g).join('')
    const rawTermB = termB.match(/[a-zA-Z]+/g).join('')

    return sortAlpha((coeficientA + coeficientB) + rawTermA + rawTermB)
}



const binomial = ['x', 'y']
const trinomial = ['xx', '2xy', 'yy']
const tetranomial = ['xxx', '3xxy', '3xyy', 'yyy']

//console.log(formatPolynomial(multiplyPolynomials(binomial, trinomial)))
//console.log(formatPolynomial(multiplyPolynomials(binomial, tetranomial)))

console.log(binomialPower(trinomial, 1))
//console.log(sumPolynomialTerms('2xy', '2xxy'));

