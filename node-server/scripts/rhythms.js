module.exports = {
   allowedRhythms: {
    '1' : true,
    '2' : false,
    '3' : false,
    '4' : false,
    '5' : false,
    '7' : false,
    '8' : false,
    '16' : false,
    'Random': false
  },
  rhythmsSets: {},
  setAllowedRhythm: function(rhythm, value) {
    this.allowedRhythms[rhythm] = value
  },
  print() {
    return Object.keys(this.allowedRhythms).reduce((acc, rhythm) => {
      return acc + rhythm + ": " + this.allowedRhythms[rhythm] + " "
    }, "")
  },
  generateRhythmSet(n){
    let set = []
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        set.push(i / n + " " +((j + 1) / n))
      }
    }
    return set
  },
  generateRandomRhythmSet() {
    let factors = []
    let set = []
    let numFactors = 5 + Math.random() * 10
    for (let i = 0; i < numFactors; i++) {
      factors.push(Math.random() * 15)
    }
    let sum = factors.reduce((factor, acc) => {
      return factor + acc
    }, 0)
    factors.forEach((factor) => {
      factors.forEach((factorAgain) => {
        set.push((factor / sum) + " " + ((factorAgain + 1) / sum))
      })
    })
    set.push(undefined)
    return set
  },
  rhythmSets: {},
  generateRhythmSets() {
    [2,3,4,5,7,8,16].forEach((divisor) => {
      this.rhythmSets[divisor] = this.generateRhythmSet(divisor)
    })
    this.rhythmSets['random'] = this.generateRandomRhythmSet()
  },
  initialize () {
    this.generateMarkovChains()
  },
  markovChains: {},
  generateMarkovChains() {
    this.generateRhythmSets()
    let keys = Object.keys(this.rhythmSets)
    keys.forEach((key) => {
      this.markovChains[key] = {}
      let orderTwoSet = []
      this.rhythmSets[key].forEach((element) => {
        orderTwoSet[element] = {}
        let remainingProbability = 1
        this.rhythmSets[key].forEach((element2, index) => {
          // only proceed if not defined undefined
          if ( element2 || typeof element === 'undefined') {
            if ( index < this.rhythmSets[key].length - 1) {
              let probability = Math.random() * remainingProbability
              remainingProbability -= probability
              orderTwoSet[element][element2] = probability
            } else {
              orderTwoSet[element][element2] = remainingProbability
            }
          }
          this.markovChains[key] = orderTwoSet[element]
        })
      })
    })
    console.log(this.markovChains)
  }
}
