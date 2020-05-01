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

// console.log(createTag({ tag: 'h1', attr: { class: 'title' } })('Header!'))

const tableRowTag = generateHtml('tr')

const tableRow = items => tableRowTag(tableCells(items))
// const tableRow = items => compose(tableRowTag, tableCells)(items)

const tableCell = generateHtml('td')
const tableCells = item => item.map(tableCell).join('')

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

const updateTotal = () => {
  let calories = 0
  let carbs = 0
  let protein = 0

  LIST.forEach(item => {
    calories += item.calories
    carbs += item.carbs
    protein += item.protein
  })

  document.querySelector('#totalCalories').textContent = calories
  document.querySelector('#totalCarbs').textContent = carbs
  document.querySelector('#totalProteins').textContent = protein
}

const renderItems = () => {
  document.querySelector('tbody').innerHTML = ''

  LIST.map(item => {
    const row = document.createElement('tr')
    row.innerHTML = tableRow([
      item.description,
      item.calories,
      item.carbs,
      item.protein
    ])

    document.querySelector('tbody').appendChild(row)
  })
}

const addItem = () => {
  const newItem = {
    description: description.value,
    calories: parseInt(calories.value),
    carbs: parseInt(carbs.value),
    protein: parseInt(protein.value),
  }
  LIST.push(newItem)
  cleanInputs()
  updateTotal()
  renderItems()
}

const cleanInputs = () => {
  description.value = '';
  carbs.value = '';
  calories.value = '';
  protein.value = '';
};