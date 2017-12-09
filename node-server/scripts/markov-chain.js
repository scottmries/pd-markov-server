exports.MarkovChain = class {
  constructor(order, elements) {
    this.order = order
    this.elements = elements
    this.lastRow = new Array()
    this.generateMarkovMatrix()
    // this.generateProbabilities()
    this.state = new Array(this.order)
    for ( let i = 0; i < this.order; i++) {
      this.state[i] = this.elements[Math.floor(Math.random() * (this.elements.length))]
    }
    this.next
    for ( let i = 0; i < 1000; i++) {
      console.log(this.next)
    }
  }

  generateMarkovMatrix() {
    this.matrix = this.generateStructureLevel(this.elements, this.order)
    this.matrix = this.normalizeElementProbabilities(this.matrix)
  }

  generateStructureLevel(elements, n) {
    let obj = {}
    elements.map((el) => obj[el] = n === 0 ? Math.random() : this.generateStructureLevel(elements, n - 1))
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
    let submatrix = this.matrix
    let next
    let toss = Math.random()
    this.state.map((order, index) => {
      if (index  < this.order - 1) {
        submatrix = submatrix[order]
      } else {
        let values = submatrix[order]
        values.map((value) => {
          if (toss >= value.minimum && toss < value.maximum) {
            next = value.element
            this.state.shift()
            this.state.push(next)
            console.log('state', this.state)
          }
        })
      }
    })
    return next
  }
}

module.exports.MarkovChain
