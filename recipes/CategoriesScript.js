var select;
var data;
var SelectedArea;
var Selectedcategory;
var row;
var Mealdata;
var tableauArea;
var tableauCategory;
fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
    .then(async (response) => {
        data = await response.json();
        console.log(data)
        console.log(data.meals.length)


        for (let i = 0; i < data.meals.length; i++) {
            Selectedcategory = document.getElementById("Categorie")
            let option = document.createElement("option")
            option.setAttribute("value", `${data.meals[i].strCategory}`)
            let OptionText = document.createTextNode(`${data.meals[i].strCategory}`)
            if (data.meals[i].strCategory === "Lamb") {
                option.setAttribute("selected", "")
            }
            option.appendChild(OptionText)
            Selectedcategory.appendChild(option)

        }
    })



fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    .then(async (response) => {
        data = await response.json();
        console.log(data)
        console.log(data.meals.length)



        for (let i = 0; i < data.meals.length; i++) {
            SelectedArea = document.getElementById("Area")
            let option = document.createElement("option")
            option.setAttribute("value", `${data.meals[i].strArea}`)
            let OptionText = document.createTextNode(`${data.meals[i].strArea}`)
            if (data.meals[i].strArea === "Moroccan") {
                option.setAttribute("selected", "")
            }
            option.appendChild(OptionText)
            SelectedArea.appendChild(option)


        }

    })

document.getElementById("Area").onchange = function () {
    let Area = document.getElementById("Area").value
    document.getElementById("FirstRow").innerHTML = ""

    if(document.getElementById("Area").value == "All" && document.getElementById("Categorie").value == "All")
        {
            document.getElementById("FirstRow").innerHTML = "smhlia bzerba"
        }
        else if(Area != "All" && document.getElementById("Categorie").value != "All")
            {
                fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`)
                .then(async (response) => {
                    data = await response.json();
                    return data

                }).then(async response=>{
                    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${document.getElementById("Categorie").value}`)
                .then(async (response) => {
                    data = await response.json();
                    return data
                }).then (Cresponse=>{
                    let filter = []
                    response.meals.forEach(ameal => {
                        Cresponse.meals.forEach(cmeal=>{
                            if(ameal.idMeal==cmeal.idMeal) 
                            {
                                filter.push(ameal)
                            }

                        })
                    })
                    filter.forEach(meal=>{
                        row = document.getElementById("FirstRow")
                        row.innerHTML += `<div class="card bg-warning col-3">
                                <div class="card-body text-center">
                                    <img class="card-img-top" src = "${meal.strMealThumb}">
                                    <h3 class="card-title"> ${meal.strMeal}</h2>
                                    <p class="card-text"> Un texte</p>
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${meal.idMeal}">
                                Launch demo modal
                              </button>
                                </div>
                            </div>
                        <div class="modal fade" id="${meal.idMeal}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">${meal.strMeal}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                Ingredients :<p id="${meal.idMeal}p"></p>
                Instructions : <p id="${meal.idMeal}pp"></p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div> `
                        fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                        .then(async (response) => {
                            Mealdata = await response.json();
                            for (let y = 1; y <= 20; y++) {
                                if (Mealdata.meals[0][`strIngredient${y}`] != "" && Mealdata.meals[0][`strIngredient${y}`] != " " && Mealdata.meals[0][`strIngredient${y}`] != null && Mealdata.meals[0][`strMeasure${y}`] != null && Mealdata.meals[0][`strMeasure${y}`] != "" && Mealdata.meals[0][`strMeasure${y}`] != " ") {
                                    ing = document.getElementById(`${meal.idMeal}p`)
                                    ing.innerHTML += `${Mealdata.meals[0][`strMeasure${y}`]}  ${Mealdata.meals[0][`strIngredient${y}`]} <br>`
                                }        
                            }
                            document.getElementById(`${meal.idMeal}pp`).innerHTML = Mealdata.meals[0].strInstructions
                        })
                    })
                    
                })
                })

                

            }
            else if(document.getElementById("Categorie").value == "All")
            {
                fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`)
                .then(async (response) => {
                    data = await response.json();
                    console.log(data)
        
                    tableauArea = []
                    tableauArea.push(data)
                    console.log(tableauArea)
        
                    for (let x = 0; x < data.meals.length; x++) {
                        row = document.getElementById("FirstRow")
                        row.innerHTML += `<div class="card bg-warning col-3">
                                <div class="card-body text-center">
                                    <img class="card-img-top" src = "${data.meals[x].strMealThumb}">
                                    <h3 class="card-title"> ${data.meals[x].strMeal}</h2>
                                    <p class="card-text"> Un texte</p>
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${data.meals[x].idMeal}">
                                Launch demo modal
                              </button>
                                </div>
                            </div>
                        <div class="modal fade" id="${data.meals[x].idMeal}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">${data.meals[x].strMeal}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                Ingredients :<p id="${data.meals[x].idMeal}p"></p>
                Instructions : <p id="${data.meals[x].idMeal}pp"></p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div> `
        
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data.meals[x].idMeal}`)
                .then(async (response) => {
                Mealdata = await response.json();
                console.log(Mealdata)
        
                        for (let z = 0; z < Mealdata.meals.length; z++) {
                            document.getElementById(`${data.meals[x].idMeal}p`).innerHTML = ""
                            document.getElementById(`${data.meals[x].idMeal}pp`).innerHTML = Mealdata.meals[z].strInstructions
        
                            
                            for (let y = 1; y <= 20; y++) {
                                if (Mealdata.meals[z][`strIngredient${y}`] != "" && Mealdata.meals[z][`strIngredient${y}`] != " " && Mealdata.meals[z][`strIngredient${y}`] != null && Mealdata.meals[z][`strMeasure${y}`] != null && Mealdata.meals[z][`strMeasure${y}`] != "" && Mealdata.meals[z][`strMeasure${y}`] != " ") {
                                    ing = document.getElementById(`${data.meals[x].idMeal}p`)
                                    ing.innerHTML += `${Mealdata.meals[z][`strMeasure${y}`]}  ${Mealdata.meals[z][`strIngredient${y}`]} <br>`
                                }
                                console.log(Mealdata.meals[z][`strIngredient${y}`])
        
                            }
                        }
                    })
                    }
                })
        
        
        
        
        }else{
            let Category = document.getElementById("Categorie").value

    document.getElementById("FirstRow").innerHTML = ""

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`)
        .then(async (response) => {
            data = await response.json();
            console.log(data)

            tableauCategory = []
            tableauCategory.push(data)
            console.log(tableauCategory[0])

            for (let x = 0; x < data.meals.length; x++) {
                row = document.getElementById("FirstRow")
                row.innerHTML += `<div class="card bg-warning col-3">
                        <div class="card-body text-center">
                            <img class="card-img-top" src = "${data.meals[x].strMealThumb}">
                            <h3 class="card-title"> ${data.meals[x].strMeal}</h2>
                            <p class="card-text"> Un texte</p>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${data.meals[x].idMeal}">
                        Launch demo modal
                      </button>
                        </div>
                    </div>
                <div class="modal fade" id="${data.meals[x].idMeal}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${data.meals[x].strMeal}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Ingredients :<p id="${data.meals[x].idMeal}p"></p>
        Instructions : <p id="${data.meals[x].idMeal}pp"></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> `

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data.meals[x].idMeal}`)
        .then(async (response) => {
        Mealdata = await response.json();
        console.log(Mealdata)

                for (let z = 0; z < Mealdata.meals.length; z++) {
                    document.getElementById(`${data.meals[x].idMeal}p`).innerHTML = ""
                    document.getElementById(`${data.meals[x].idMeal}pp`).innerHTML = Mealdata.meals[z].strInstructions

                    
                    for (let y = 1; y <= 20; y++) {
                        if (Mealdata.meals[z][`strIngredient${y}`] != "" && Mealdata.meals[z][`strIngredient${y}`] != " " && Mealdata.meals[z][`strIngredient${y}`] != null && Mealdata.meals[z][`strMeasure${y}`] != null && Mealdata.meals[z][`strMeasure${y}`] != "" && Mealdata.meals[z][`strMeasure${y}`] != " ") {
                            ing = document.getElementById(`${data.meals[x].idMeal}p`)
                            ing.innerHTML += `${Mealdata.meals[z][`strMeasure${y}`]}  ${Mealdata.meals[z][`strIngredient${y}`]} <br>`
                        }
                        console.log(Mealdata.meals[z][`strIngredient${y}`])

                    }
                }
            })
            }
        })
        }
            }



document.getElementById("Categorie").onchange = function () {
    let Area = document.getElementById("Area").value
    document.getElementById("FirstRow").innerHTML = ""

    if(document.getElementById("Area").value == "All" && document.getElementById("Categorie").value == "All")
        {
            document.getElementById("FirstRow").innerHTML = "smhlia bzerba"
        }
        else if(Area != "All" && document.getElementById("Categorie").value != "All")
            {
                fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`)
                .then(async (response) => {
                    data = await response.json();
                    return data

                }).then(async response=>{
                    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${document.getElementById("Categorie").value}`)
                .then(async (response) => {
                    data = await response.json();
                    return data
                }).then (Cresponse=>{
                    let filter = []
                    response.meals.forEach(ameal => {
                        Cresponse.meals.forEach(cmeal=>{
                            if(ameal.idMeal==cmeal.idMeal) 
                            {
                                filter.push(ameal)
                            }

                        })
                    })
                    filter.forEach(meal=>{
                        row = document.getElementById("FirstRow")
                        row.innerHTML += `<div class="card bg-warning col-3">
                                <div class="card-body text-center">
                                    <img class="card-img-top" src = "${meal.strMealThumb}">
                                    <h3 class="card-title"> ${meal.strMeal}</h2>
                                    <p class="card-text"> Un texte</p>
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${meal.idMeal}">
                                Launch demo modal
                              </button>
                                </div>
                            </div>
                        <div class="modal fade" id="${meal.idMeal}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">${meal.strMeal}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                Ingredients :<p id="${meal.idMeal}p"></p>
                Instructions : <p id="${meal.idMeal}pp"></p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div> `
                        fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                        .then(async (response) => {
                            Mealdata = await response.json();
                            for (let y = 1; y <= 20; y++) {
                                if (Mealdata.meals[0][`strIngredient${y}`] != "" && Mealdata.meals[0][`strIngredient${y}`] != " " && Mealdata.meals[0][`strIngredient${y}`] != null && Mealdata.meals[0][`strMeasure${y}`] != null && Mealdata.meals[0][`strMeasure${y}`] != "" && Mealdata.meals[0][`strMeasure${y}`] != " ") {
                                    ing = document.getElementById(`${meal.idMeal}p`)
                                    ing.innerHTML += `${Mealdata.meals[0][`strMeasure${y}`]}  ${Mealdata.meals[0][`strIngredient${y}`]} <br>`
                                }        
                            }
                            document.getElementById(`${meal.idMeal}pp`).innerHTML = Mealdata.meals[0].strInstructions
                        })
                    })
                    
                })
                })

                

            }
            else if(document.getElementById("Categorie").value == "All")
            {
                fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`)
                .then(async (response) => {
                    data = await response.json();
                    console.log(data)
        
                    tableauArea = []
                    tableauArea.push(data)
                    console.log(tableauArea)
        
                    for (let x = 0; x < data.meals.length; x++) {
                        row = document.getElementById("FirstRow")
                        row.innerHTML += `<div class="card bg-warning col-3">
                                <div class="card-body text-center">
                                    <img class="card-img-top" src = "${data.meals[x].strMealThumb}">
                                    <h3 class="card-title"> ${data.meals[x].strMeal}</h2>
                                    <p class="card-text"> Un texte</p>
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${data.meals[x].idMeal}">
                                Launch demo modal
                              </button>
                                </div>
                            </div>
                        <div class="modal fade" id="${data.meals[x].idMeal}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">${data.meals[x].strMeal}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                Ingredients :<p id="${data.meals[x].idMeal}p"></p>
                Instructions : <p id="${data.meals[x].idMeal}pp"></p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div> `
        
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data.meals[x].idMeal}`)
                .then(async (response) => {
                Mealdata = await response.json();
                console.log(Mealdata)
        
                        for (let z = 0; z < Mealdata.meals.length; z++) {
                            document.getElementById(`${data.meals[x].idMeal}p`).innerHTML = ""
                            document.getElementById(`${data.meals[x].idMeal}pp`).innerHTML = Mealdata.meals[z].strInstructions
        
                            
                            for (let y = 1; y <= 20; y++) {
                                if (Mealdata.meals[z][`strIngredient${y}`] != "" && Mealdata.meals[z][`strIngredient${y}`] != " " && Mealdata.meals[z][`strIngredient${y}`] != null && Mealdata.meals[z][`strMeasure${y}`] != null && Mealdata.meals[z][`strMeasure${y}`] != "" && Mealdata.meals[z][`strMeasure${y}`] != " ") {
                                    ing = document.getElementById(`${data.meals[x].idMeal}p`)
                                    ing.innerHTML += `${Mealdata.meals[z][`strMeasure${y}`]}  ${Mealdata.meals[z][`strIngredient${y}`]} <br>`
                                }
                                console.log(Mealdata.meals[z][`strIngredient${y}`])
        
                            }
                        }
                    })
                    }
                })
        
        
        
        
        }else{
            let Category = document.getElementById("Categorie").value

    document.getElementById("FirstRow").innerHTML = ""

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Lamb`)
        .then(async (response) => {
            data = await response.json();
            console.log(data)

            tableauCategory = []
            tableauCategory.push(data)
            console.log(tableauCategory[0])

            for (let x = 0; x < data.meals.length; x++) {
                row = document.getElementById("FirstRow")
                row.innerHTML += `<div class="card bg-warning col-3">
                        <div class="card-body text-center">
                            <img class="card-img-top" src = "${data.meals[x].strMealThumb}">
                            <h3 class="card-title"> ${data.meals[x].strMeal}</h2>
                            <p class="card-text"> Un texte</p>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${data.meals[x].idMeal}">
                        Launch demo modal
                      </button>
                        </div>
                    </div>
                <div class="modal fade" id="${data.meals[x].idMeal}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${data.meals[x].strMeal}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Ingredients :<p id="${data.meals[x].idMeal}p"></p>
        Instructions : <p id="${data.meals[x].idMeal}pp"></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> `

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data.meals[x].idMeal}`)
        .then(async (response) => {
        Mealdata = await response.json();
        console.log(Mealdata)

                for (let z = 0; z < Mealdata.meals.length; z++) {
                    document.getElementById(`${data.meals[x].idMeal}p`).innerHTML = ""
                    document.getElementById(`${data.meals[x].idMeal}pp`).innerHTML = Mealdata.meals[z].strInstructions

                    
                    for (let y = 1; y <= 20; y++) {
                        if (Mealdata.meals[z][`strIngredient${y}`] != "" && Mealdata.meals[z][`strIngredient${y}`] != " " && Mealdata.meals[z][`strIngredient${y}`] != null && Mealdata.meals[z][`strMeasure${y}`] != null && Mealdata.meals[z][`strMeasure${y}`] != "" && Mealdata.meals[z][`strMeasure${y}`] != " ") {
                            ing = document.getElementById(`${data.meals[x].idMeal}p`)
                            ing.innerHTML += `${Mealdata.meals[z][`strMeasure${y}`]}  ${Mealdata.meals[z][`strIngredient${y}`]} <br>`
                        }
                        console.log(Mealdata.meals[z][`strIngredient${y}`])

                    }
                }
            })
            }
        })
        }

}
fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=Moroccan`)
.then(async (response) => {
    data = await response.json();
    return data

}).then(async response=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${document.getElementById("Categorie").value}`)
.then(async (response) => {
    data = await response.json();
    return data
}).then (Cresponse=>{
    let filter = []
    response.meals.forEach(ameal => {
        Cresponse.meals.forEach(cmeal=>{
            if(ameal.idMeal==cmeal.idMeal) 
            {
                filter.push(ameal)
            }

        })
    })
    filter.forEach(meal=>{
        row = document.getElementById("FirstRow")
        row.innerHTML += `<div class="card bg-warning col-3">
                <div class="card-body text-center">
                    <img class="card-img-top" src = "${meal.strMealThumb}">
                    <h3 class="card-title"> ${meal.strMeal}</h2>
                    <p class="card-text"> Un texte</p>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${meal.idMeal}">
                Launch demo modal
              </button>
                </div>
            </div>
        <div class="modal fade" id="${meal.idMeal}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<h1 class="modal-title fs-5" id="exampleModalLabel">${meal.strMeal}</h1>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
Ingredients :<p id="${meal.idMeal}p"></p>
Instructions : <p id="${meal.idMeal}pp"></p>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
<button type="button" class="btn btn-primary">Save changes</button>
</div>
</div>
</div>
</div> `
        fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
        .then(async (response) => {
            Mealdata = await response.json();
            for (let y = 1; y <= 20; y++) {
                if (Mealdata.meals[0][`strIngredient${y}`] != "" && Mealdata.meals[0][`strIngredient${y}`] != " " && Mealdata.meals[0][`strIngredient${y}`] != null && Mealdata.meals[0][`strMeasure${y}`] != null && Mealdata.meals[0][`strMeasure${y}`] != "" && Mealdata.meals[0][`strMeasure${y}`] != " ") {
                    ing = document.getElementById(`${meal.idMeal}p`)
                    ing.innerHTML += `${Mealdata.meals[0][`strMeasure${y}`]}  ${Mealdata.meals[0][`strIngredient${y}`]} <br>`
                }        
            }
            document.getElementById(`${meal.idMeal}pp`).innerHTML = Mealdata.meals[0].strInstructions
        })
    })
    
})
})


