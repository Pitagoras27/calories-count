const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

const DESCRIPTION = document.querySelector('#description')
const CALORIES = document.querySelector('#calories')
const CARBS = document.querySelector('#carbs')
const PROTEIN = document.querySelector('#protein')