class MarkovChain {
  constructor(order, elements) {
    this.order = order
    this.element = elements
    this.lastRow = new Array()
    this.generateMarkovMatrix()
    this.generateProbabilities()
  }

  generateMarkovMatrix() {
    this.matrix = this.generateStructureLevel(this.elements, this.order, this.getRandomElementProbabilities(this.elements))
  }

  generateStructureLevel(elements, n, callback) {
    let obj = {}
    elements.map((el) => obj[el] = n === 1 ? callback().bind(this) : this.generateStructureLevel(elements, n - 1))
    return obj
  }

  getRandomElementProbabilities(elements) {
    let elementProbabilities = []
    let remainingChance = 1
    let remainingElements = elements
    let baseProbability = 0
    elements.map(() => {
      let index = parseInt(Math.random() * remainingElements.length)
      let probability = Math.random() * this.remainingChance
      elementProbabilities.push({
        exclusiveMaximum: baseProbability + probability,
        inclusiveMinimum: baseProbability,
        element: remainingElements[index]
      })
      remainingElements = remainingElements.slice(0, index).slice(index)
    })
  }

  traverseObject(object, keys) {
    keys.forEach((key) => {
      if (!typeof object[key] === "undefined") {
        object = object[key]
      } else {
        return undefined
      }
    }!(typeof object[key] === "undefined") ? object = object[key] : undefined)
  }

  get next() {
    if (this.lastRow.length < this.order) {
      this.lastRow.push(this.elements[parseInt(Math.random() * (this.elements.length - 1))])
    } else {
      let object = this.matrix
      this.lastRow.map((el) => object = object[el])
      const throw = Math.random()
      // object should be an array at this point
      const {element: next} = object.filter((el) => throw >= el.inclusiveMinimum && < el.exclusiveMaximum)
      // remove the array's first element and append the next one to the end
      this.elements.shift().push(next)
      return next
    }
  }
}
