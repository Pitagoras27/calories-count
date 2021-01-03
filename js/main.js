const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

let LIST = []

// clousure o función compuesta para generar etiquetas html y sus atributos
const generateHtml = obj => (content = '') => {
  const { tag, attr } = obj
  return `
    <${tag} ${attr ? createAttr(attr) : ' '} >
      ${content}
    </${tag}>`
}

const createAttr = (attr = {}) => Object.entries(attr)
  .map(item => `${item[0]}="${item[1]}"`).join('')

const createTag = tag => (typeof tag === 'string')
  ? generateHtml({ tag })
  : generateHtml(tag)

// console.log(createTag({ tag: 'h1', attr: { class: 'title' } })('Header!'))

const tableRowTag = createTag('tr') // generateHtml('tr')

const tableRow = items => tableRowTag(tableCells(items))
// const tableRow = items => compose(tableRowTag, tableCells)(items)

const trashIcon = createTag({ tag: "i", attr: { class: "fas fa-trash-alt" } })("");
const tableCell = createTag('td')
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
  const container = document.getElementsByTagName("tbody")[0];
  container.innerHTML = "";
  const ROWS = LIST.map((item, index) => {
    const {
      calories, description,
      carbs, protein,
    } = item;
    const removeButton = createTag({
      tag: "button",
      attr: {
        class: "btn btn-outline-danger",
        onclick: `removeItem(${index})`,
      },
    })(trashIcon);

    return tableRow([description, calories, carbs, protein, removeButton]);
    // document.querySelector('tbody').appendChild(row)
  })
  container.innerHTML = ROWS.join("");
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

const removeItem = (position) => {
  LIST = LIST.filter((item, index) => position !== index);
  updateTotal();
  renderItems();
};

const cleanInputs = () => {
  description.value = '';
  carbs.value = '';
  calories.value = '';
  protein.value = '';
};

console.log('1er cambio para unificación de commits con rebase');
console.log('2da cambio para unificación de commits con rebase');
console.log('3er cambio para unificación de commits con rebase');
