const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

const DESCRIPTION = document.querySelector('#description')
const CALORIES = document.querySelector('#calories')
const CARBS = document.querySelector('#carbs')
const PROTEIN = document.querySelector('#protein')

DESCRIPTION.onkeypress = () => DESCRIPTION.classList.remove('is-invalid')
CALORIES.addEventListener('keypress', () => CALORIES.classList.remove('is-invalid'))
CARBS.onkeypress = () => CARBS.classList.remove('is-invalid')
PROTEIN.onkeypress = () => PROTEIN.classList.remove('is-invalid')

const validateInputs = () => {
  !DESCRIPTION.value ? DESCRIPTION.classList.add('is-invalid') : ''
  !CALORIES.value ? CALORIES.classList.add('is-invalid') : ''
  !CARBS.value ? CARBS.classList.add('is-invalid') : ''
  !PROTEIN.value ? PROTEIN.classList.add('is-invalid') : ''

  if (DESCRIPTION.value &&
    CALORIES.value &&
    CARBS.value &&
    PROTEIN.value) {
    console.log('ok! next funcionality!')
  }
}