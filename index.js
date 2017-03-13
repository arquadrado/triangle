'use strict'

console.log('firing up')

const sortAlpha = (string) => {
  return string.split('').sort().join('');
}

const multiplyPolynomials = (polyA, polyB) => {

  let result = []

  polyA.forEach((polyATerm) => {
    polyB.forEach((polyBTerm) => {
      result.push(multiplyPolynomialTerms(polyATerm, polyBTerm))
    })
  })

  result = result.reduce((processedResult, term) => {
    const coeficient = term.match(/\d+/g) === null ? 1 : Number(term.match(/\d+/g).join(''))
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
  if (power > -1) {

    let compositePoly = binomial
    let result = []
    result.push(['1'])

    if (power >= 1) {
      result.push(binomial)
    }

    if (power > 1) {
      for (let i = power - 1; i > 0; i--) {
        compositePoly = formatPolynomial(multiplyPolynomials(binomial, compositePoly))
        result.push(compositePoly)
      }
    }

    return result

  }

  return -1
}

const multiplyPolynomialTerms = (termA, termB) => {
  console.log(termA, termB)
  const coeficientA = termA.match(/\d+/g) === null ? 1 : Number(termA.match(/\d+/g).join(''))
  const coeficientB = termB.match(/\d+/g) === null ? 1 : Number(termB.match(/\d+/g).join(''))

  const rawTermA = termA.match(/[a-zA-Z]+/g).join('')
  const rawTermB = termB.match(/[a-zA-Z]+/g).join('')

  return (coeficientA * coeficientB) + sortAlpha(rawTermA + rawTermB)
}

const extractBinomialCoeficients = (term) => {
  return term.match(/\d+/g) === null ? 1 : Number(term.match(/\d+/g).join(''))
}



const binomial = ['x', 'y']
const trinomial = ['xx', '2xy', 'yy']
const tetranomial = ['xxx', '3xxy', '3xyy', 'yyy']
const fivePowerPoly = ['xxxxx', '5xxxxy', '10xxxyy', '10xxyyy', '5xyyyy', 'yyyyy']

//console.log(formatPolynomial(multiplyPolynomials(binomial, trinomial)))
//console.log(formatPolynomial(multiplyPolynomials(binomial, tetranomial)))

//console.log(binomialPower(binomial, 6))
//console.log(multiplyPolynomials(binomial, fivePowerPoly))
//console.log(sumPolynomialTerms('2xy', '2xxy'));



const buildTriangle = () => {
	const lines = document.getElementById('lines').value
  if (lines > -1) {
    const poweredBinomial = binomialPower(binomial, lines)
    const $triangle = document.getElementById('triangle')
    poweredBinomial.forEach((line) => {
      const triangleLine = document.createElement('li')
      triangleLine.className = 'line'
      line.forEach((element) => {
        const elementContent = document.createElement('span')
        elementContent.className = 'element'
        elementContent.appendChild(document.createTextNode(extractBinomialCoeficients(element)))

        triangleLine.appendChild(elementContent)
      })
      $triangle.appendChild(triangleLine)
    })
  }

}

document.getElementById('build').addEventListener('click', buildTriangle)

