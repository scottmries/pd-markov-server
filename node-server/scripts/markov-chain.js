exports.MarkovChain = class {
  constructor(order, elements) {
    this.order = order
    this.elements = elements
    this.lastRow = new Array()
    this.generateMarkovMatrix()
    // this.generateProbabilities()
  }

  generateMarkovMatrix() {
    this.matrix = this.generateStructureLevel(this.elements, this.order)
    this.matrix = this.normalizeElementProbabilities(this.matrix)
  }

  generateStructureLevel(elements, n) {
    let obj = {}
    elements.map((el) => obj[el] = n === 1 ? Math.random() : this.generateStructureLevel(elements, n - 1))
    return obj
  }

  normalizeElementProbabilities(matrix) {
    Object.keys(matrix).map((key) => {
      let childValue = matrix[key][Object.keys(matrix[key])[0]]
      if (typeof childValue === 'object') {
        matrix[key] = this.normalizeElementProbabilities(matrix[key])
      } else {
        const sum = Object.keys(matrix[key]).reduce((acc, val) => {
          return acc + matrix[key][val]
        }, 0)
        let accumulatedProbability = 0
        let probabilities = []
        Object.keys(matrix[key]).map((secondKey) => {
          const probability = matrix[key][secondKey] / sum
          probabilities.push( {
            minimum : accumulatedProbability,
            maximum : probability + accumulatedProbability,
            element : secondKey
          })
          accumulatedProbability += probability
        })
        matrix[key] = probabilities
        return matrix
        return probabilities
      }
    })
    return matrix
  }

  getRandomElementProbabilities(elements) {
    let elementProbabilities = []
    let remainingChance = 1
    let remainingElements = elements
    let baseProbability = 0.0
    elements.map(() => {
      let index = Math.floor(Math.random() * (remainingElements.length))
      let probability = Math.random() * remainingChance
      remainingChance -= probability
      baseProbability = probability
      elementProbabilities.push({
        exclusiveMaximum: baseProbability + probability,
        inclusiveMinimum: baseProbability,
        element: remainingElements[index]
      })
      remainingElements.splice(index, 1)
    })
    return elementProbabilities
  }

  traverseObject(object, keys) {
    keys.forEach((key) => {
      if (!typeof object[key] === "undefined") {
        object = object[key]
      } else {
        return undefined
      }
    })
  }

  get next() {
    if (this.lastRow.length < this.order) {
      this.lastRow.push(this.elements[parseInt(Math.random() * (this.elements.length - 1))])
    } else {
      let object = this.matrix
      this.lastRow.map((el) => object = object[el])
      const toss = Math.random()
      // object should be an array at this point
      const {element: next} = object.filter((el) => toss >= el.inclusiveMinimum && toss < el.exclusiveMaximum)
      // remove the array's first element and append the next one to the end
      this.elements.shift().push(next)
      return next
    }
  }
}

module.exports.MarkovChain
