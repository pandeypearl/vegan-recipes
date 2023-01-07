//getting current year
document.getElementById("year").innerHTML = new Date().getFullYear();

//definiting end points for data to html endpoints
const recipeItemTemplate = document.querySelector("[data-recipe-template]")
const recipeItemContainer = document.querySelector("[data-recipe-items-container]")
const searchInput = document.querySelector("[data-search]");


//Getting API data and rendering it
fetch('http://localhost:8000/results')
    .then(response => response.json())
    .then(data => {
        recipes = data.map(recipe => {
            const item = recipeItemTemplate.content.cloneNode(true).children[0]
            const header = item.querySelector('[data-header]')
            const body = item.querySelector('[data-body]')
            header.textContent = recipe.title
            body.textContent = recipe.url
            body.href = recipe.url
            recipeItemContainer.append(item)
            return {title: recipe.title, url: recipe.url, element: item}
        })
    })
    .catch(err => console.log(err))

//filtering through recipes
let recipes = []

searchInput.addEventListener("input", (e) => {
    const value =  e.target.value.toLowerCase()
    recipes.forEach(recipe => {
        const isPresent = recipe.title.toLowerCase().includes(value)
        recipe.element.classList.toggle("hide", !isPresent)
        // dealing with no results found
        const items = document.querySelectorAll('.item')
        const itemsArray = [].slice.call(items)
        const displayVisible = itemsArray.filter(function(e) {
            return getComputedStyle(e).display === "block";
        })
        const visibleItems = displayVisible.length
        // console.log(visibleItems)
        if (visibleItems == 0) {
            document.querySelector('.empty').style.display = "block";
        }else{
            document.querySelector('.empty').style.display = "none";
        }
    })

})

    