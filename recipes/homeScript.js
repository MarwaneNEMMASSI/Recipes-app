var data;
var MealId;
var CardTitles = document.getElementsByTagName("h3");
var CardImages = document.getElementsByTagName("img");
var row;
var SecondRow;
var ingredient;
var measures;
var ing;

for (let i = 0; i < 6; i++) {
  ingredient = [];
  measures = [];

  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(async (response) => {
      data = await response.json();
      console.log(data);
      var y;

      row = document.getElementById("FirstRow")
      if (i >= 3) {
        SecondRow = document.getElementById("SecondRow")

        SecondRow.innerHTML += `
                    <div class="card bg-warning col-3">
                    <div class="card-body text-center">
                        <img class="card-img-top" src = "${data.meals[0].strMealThumb}">
                        <h3 class="card-title"> ${data.meals[0].strMeal}</h2>
                        <p class="card-text"> Un texte</p>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${data.meals[0].idMeal}">
                        Launch demo modal
                      </button>
                    </div>
                </div>
                <div class="modal fade" id="${data.meals[0].idMeal}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${data.meals[0].strMeal}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Ingredients :<p id="${data.meals[0].idMeal}p"></p>
        Instructions : ${data.meals[0].strInstructions} 
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`
      }
      else {
        row.innerHTML += `
                  <div class="card bg-warning col-3">
                    <div class="card-body text-center">
                        <img class="card-img-top" src = "${data.meals[0].strMealThumb}">
                        <h3 class="card-title"> ${data.meals[0].strMeal}</h2>
                        <p class="card-text"> Un texte</p>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${data.meals[0].idMeal}">
                        Launch demo modal
                      </button>
                    </div>
                </div>
                <div class="modal fade" id="${data.meals[0].idMeal}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${data.meals[0].strMeal}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Ingredients :<p id="${data.meals[0].idMeal}p"></p>
        Instructions : ${data.meals[0].strInstructions} 
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`
      }

      for (y = 1; y <= 20; y++) {
        if (data.meals[0][`strIngredient${y}`] != "" && data.meals[0][`strIngredient${y}`] != " " && data.meals[0][`strIngredient${y}`] != null && data.meals[0][`strMeasure${y}`] != null && data.meals[0][`strMeasure${y}`] != "" && data.meals[0][`strMeasure${y}`] != " ") {
          ing = document.getElementById(`${data.meals[0].idMeal}p`)
          ing.innerHTML += `${data.meals[0][`strMeasure${y}`]}  ${data.meals[0][`strIngredient${y}`]} <br>`
        }
        console.log(data.meals[0][`strMeasure${y}`] + data.meals[0][`strIngredient${y}`])

      }

    })
}
function test() {
  row.innerHTML = ""
  SecondRow.innerHTML = ""
  var i;
  var z;
  var input = document.getElementById("search").value
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
    .then(async (response) => {
      data = await response.json();
      console.log(data)
      console.log(data.meals[1])

      for (i = 0; i < 6; i++) {

        row = document.getElementById("FirstRow")
        if (i >= 3) {
          SecondRow = document.getElementById("SecondRow")
          SecondRow.innerHTML += `<div class="card bg-warning col-3">
                        <div class="card-body text-center">
                            <img class="card-img-top" src = "${data.meals[i].strMealThumb}">
                            <h3 class="card-title"> ${data.meals[i].strMeal}</h2>
                            <p class="card-text"> Un texte</p>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${data.meals[i].idMeal}">
                        Launch demo modal
                      </button>
                        </div>
                    </div>
              <div class="modal fade" id="${data.meals[i].idMeal}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${data.meals[i].strMeal}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Ingredients :<p id="${data.meals[i].idMeal}p"></p>
        Instructions : ${data.meals[i].strInstructions} 
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`
        }

        else {
          row.innerHTML += `<div class="card bg-warning col-3">
                        <div class="card-body text-center">
                            <img class="card-img-top" src = "${data.meals[i].strMealThumb}">
                            <h3 class="card-title"> ${data.meals[i].strMeal}</h2>
                            <p class="card-text"> Un texte</p>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${data.meals[i].idMeal}">
                        Launch demo modal
                      </button>
                        </div>
                    </div>
                <div class="modal fade" id="${data.meals[i].idMeal}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${data.meals[i].strMeal}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Ingredients :<p id="${data.meals[i].idMeal}p"></p>
        Instructions : ${data.meals[i].strInstructions} 
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> `
        }


      }
      for (z = 0; z < 6; z++) {

        document.getElementById(`${data.meals[z].idMeal}p`).innnerHTML = ""
        for (y = 1; y <= 20; y++) {
          if (data.meals[z][`strIngredient${y}`] != "" && data.meals[z][`strIngredient${y}`] != " " && data.meals[z][`strIngredient${y}`] != null && data.meals[z][`strMeasure${y}`] != null && data.meals[z][`strMeasure${y}`] != "" && data.meals[z][`strMeasure${y}`] != " ") {
            ing = document.getElementById(`${data.meals[z].idMeal}p`)
            ing.innerHTML += `${data.meals[z][`strMeasure${y}`]}  ${data.meals[z][`strIngredient${y}`]} <br>`
          }
          console.log(data.meals[z][`strMeasure${y}`] + data.meals[z][`strIngredient${y}`])

        }
      }


    })

}
//for(let i = 0; i < data.meals.length; i++)
//{

//}
