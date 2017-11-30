class Tuning {
  constructor(basicScale, minimumFrequency, maximumFrequency, replicationFactor) {
    this.basicScale = basicScale
    this.minimumFrequency = minimumFrequency || 1
    this.maximumFrequency = maximumFrequency || 48000
    this.replicationFactor = replicationFactor || 2
    this.distributeNotes()
  }

  distributeNotes() {
    let replicationsDown = 0
    let replicationsUp = 0
    let lowestNote = this.basicScale[0]
    let highestNote = this.basicScale[this.basicScale.length - 1]
    while (lowestNote > this.minimumFrequency) {
      lowestNote /= this.replicationFactor
      replicationsDown += 1
    }
    while (highestNote < this.maximumFrequency) {
      highestNote *= this.replicationFactor
      replicationsUp += 1
    }
    this.tuning = this.basicScale.map((note) => note / ( note * this.replicationFactor * replicationsDown))
    for (let i = 1; i < replicationsDown + replicationsUp; i++) {
      this.tuning.push(this.basicScale.map((note) => note * i * replicationFactor))
    }
  }
}
