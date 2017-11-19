module.exports = {
   allowedRhythms: {
    '2' : false,
    '3' : false,
    '4' : false,
    '5' : false,
    '7' : false,
    '8' : false,
    '16' : false,
    'Random': false
  },
  setAllowedRhythm: function(rhythm, value) {
    this.allowedRhythms[rhythm] = value
  }
}
