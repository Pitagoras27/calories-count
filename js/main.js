const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

const LIST = []

// clousure o función compuesta para generar etiquetas html y sus atributos
const generateHtml = obj => (content = '') => {
  const { tag, attr } = obj
  return `
    <${tag} ${attr ? generateAttrHtml(attr) : ' '} >
      ${content}
    </${tag}>`
}

const generateAttrHtml = (tag = {}) => {
  const entries = Object.entries(tag)
  const atributtes = []

  for (let i = 0; i < entries.length; i++) {
    const attrs = entries[i]
    const atributte = attrs[0]
    const value = attrs[1]
    atributtes.push(`${atributte}="${value}"`)
  }
  return atributtes.join('')
}

const createTag = tag => generateHtml(tag)

console.log(createTag({ tag: 'h1', attr: { class: 'title' } })('Header!'))

const description = document.querySelector('#description')
const calories = document.querySelector('#calories')
const carbs = document.querySelector('#carbs')
const protein = document.querySelector('#protein')

description.onkeypress = () => description.classList.remove('is-invalid')
calories.addEventListener('keypress', () => calories.classList.remove('is-invalid'))
carbs.onkeypress = () => carbs.classList.remove('is-invalid')
protein.onkeypress = () => protein.classList.remove('is-invalid')

const validateInputs = () => {
  !description.value ? description.classList.add('is-invalid') : ''
  !calories.value ? calories.classList.add('is-invalid') : ''
  !carbs.value ? carbs.classList.add('is-invalid') : ''
  !protein.value ? protein.classList.add('is-invalid') : ''

  if (description.value &&
    calories.value &&
    carbs.value &&
    protein.value) addItem()
}

const addItem = () => {
  const newItem = {
    description: description.value,
    calories: calories.value,
    carbs: carbs.value,
    protein: protein.value,
  }
  LIST.push(newItem)
  cleanInputs()
}

const cleanInputs = () => {
  description.value = '';
  carbs.value = '';
  calories.value = '';
  protein.value = '';
};