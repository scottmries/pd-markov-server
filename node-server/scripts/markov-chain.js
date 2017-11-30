class MarkovChain {
  constructor(order, elements) {
    this.order = order
    this.element = elements
    this.generateMarkovStructure()
    this.generateProbabilities()
  }

  generateMarkovStructure() {
    this.markovStructure = this.generateStructureLevel(this.elements, this.order, this.getRandomElementProbability)
  }

  generateStructureLevel(elements, n, callback) {
    let obj = {}
    elements.map((el) => obj[el] = n === 0 ? callback().bind(this) : this.generateStructureLevel(elements, n - 1))
    return obj
  }

  getRandomElementProbability() {
    this.remainingChance = typeof this.remainingChange === "undefined" || this.remainingChance <= 0 ? 1 : this.remainingChance
    const probability = Math.random() * this.remainingChance
    this.remainingChance = remainingChance - probability
    return probability
  }
}
