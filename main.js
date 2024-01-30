const students = [
  {
    index: 1,
    firstname: "Lavender",
    lastname: "Brown",
    house: "Gryffindor"
  },
  {
    index: 2,
    firstname: "Cedric",
    lastname: "Diggory",
    house: "Hufflepuff"
  },
  {
    index: 3,
    firstname: "Roger",
    lastname: "Davies",
    house: "Ravenclaw"
  },
  {
    index: 4,
    firstname: "Millicent",
    lastname: "Bulstrode",
    house: "Slytherin"
  }
]

const expelled = [
  {
    index: 5,
    firstname: "Newton",
    lastname: "Scamander",
    house: "Hufflepuff"
  }
]

const studentsHTML = (list = students) => {
  const htmlString = list.reduce((a, b) => {
    a += `<div class="card ${b.house}" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${b.firstname} ${b.lastname}</h5>
            <p class="card-text"><i>${b.house}</i></p>
            <a href="#" class="btn btn-outline-dark">Expel</a>
          </div>
        </div>`
    return a
  }, '')
  renderDom('#students', htmlString)
}

const renderDom = (div, htmlToRender) => {
  targetElement = document.querySelector(div)
  targetElement.innerHTML = htmlToRender
}

const startUp = () => {
  studentsHTML()
}

startUp()
