let MainSid =document.querySelector('.mainsideClose')
let toglSid =document.querySelector('.closeSider')
let openTag =document.querySelector('.open-close')
//let searchByName =document.querySelector('#search')
let rowData = document.getElementById("rowData");
let conectEnd = document.getElementById("footer");
let searchContainer = document.getElementById("searchContainer");

// side bar move
openTag.addEventListener('click', function() {
    if (MainSid.classList.contains('mainsideClose')) {
        MainSid.classList.replace('mainsideClose', 'mainsaide');
        toglSid.classList.replace('closeSider', 'sider');
        

    } else {
        MainSid.classList.replace('mainsaide', 'mainsideClose');
        toglSid.classList.replace('sider', 'closeSider');
        
    }
});
function closeSideNav() {
    if (MainSid.classList.contains('mainsaide')) {
        MainSid.classList.replace('mainsaide', 'mainsideClose');
        toglSid.classList.replace('sider', 'closeSider');
        
    }
}

// icon changer
changeIcon = (icon) => icon.classList.toggle("fa-x");

// search
function showSearchInputs() {
    debugger;
    searchContainer.innerHTML = `
        <div class="inSearch">
          <div class="sm:col-span-6">
            <div class="mt-2">
              <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input onkeyup="searchByName(this.value)" type="text" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 " placeholder="Search By Name">
              </div>
            </div>
          </div>
      </div>
        <div class="inSearch">
          <div class="sm:col-span-6">
            <div class="mt-2">
              <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input onkeyup="searchByFLetter(this.value)" type="text" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 " placeholder="Search By First Letter">
              </div>
            </div>
          </div>
      </div>`
  
    rowData.innerHTML = ""
  }

  searchByName("");
  async function searchByName(term) {
    //closeSideNav()
    rowData.innerHTML = ""
    $(".loader").fadeIn(300)
  
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
  
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".loader").fadeOut(300)
  
  }
  
  async function searchByFLetter(term) {
    //closeSideNav()
    rowData.innerHTML = ""
    $(".loader").fadeIn(300)
  
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()
  
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".loader").fadeOut(300)
  
  }
/////////////////////////////////////
  function displayMeals(arr) {
    let cartoona = "";
  
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
    <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal-item rounded relative bg-white cursor-pointer onclick="getMealDetails('${arr[i].idMeal}')">
    <img class="w-full" src="${arr[i].strMealThumb}" alt="">
    <div class="layer bg-white/70 flex items-center ps-5 text-xl">
        <h3 class="text-black/100 font-bold">${arr[i].strMeal}</h3>
    </div>
</div>
        `
    }

    rowData.innerHTML = cartoona;
  }
  


//get area
async function getArea() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    $(".loader").fadeIn(300)
    searchContainer.innerHTML = "";
  
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);
  
    displayArea(respone.meals)
    $(".loader").fadeOut(300)
  } 
  // display area
  function displayArea(arr) {
    let cartoona = "";
  
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div onclick="getAreaMeals('${arr[i].strArea}')" class="meal-item rounded-2 text-center cursor-pointer text-white" data-type="area">
          <i class="fa-solid fa-house-laptop fa-4x"></i>
          <h3>${arr[i].strArea}</h3>
        </div>
        `
    }
  
    rowData.innerHTML = cartoona
  }

  async function getAreaMeals(area) {
    rowData.innerHTML = ""
    $(".loader").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".loader").fadeOut(300)

}




  // get Int
  async function getIngredients() {
    rowData.innerHTML = ""
    
  
    searchContainer.innerHTML = "";
  
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);
  
    displayIngredients(respone.meals.slice(0, 20))
    $(".loader").fadeOut(300)
  }
  //Display Int
  function displayIngredients(arr) {
    let cartoona = "";
  
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div data-type="ingredients" onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="meal-item rounded-2 text-center cursor-pointer text-white">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>$${arr[i].strIngredient}</h3>
        <p class="line-clamp-4 text-sm">${arr[i].strDescription}</p>
</div>
        `
    }
  
    rowData.innerHTML = cartoona
  }

  //Get int meals
  async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".loader").fadeIn(300)
  
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
  
  
    displayMeals(response.meals.slice(0, 20))
    $(".loader").fadeOut(300)
  
  }



//get categories
async function getCategories() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    data = await response.json()
    displayCategories(data);
    $(".loader").fadeOut(300)
    console.log(data)
}



  function displayCategories(data) {
    let cartoona = "";
    let arr = data.categories;
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal-item relative ">
        <img class="w-full" src="${arr[i].strCategoryThumb}" alt="">
        <div class="layer bg-white/70 flex flex-col justify-center ps-5 text-xl">
            <h3 class="text-black/100 font-bold">${arr[i].strCategory}</h3>
            <p class="line-clamp-4 text-sm">${arr[i].strCategoryDescription}</p>
        </div>
    </div>
        `

    }
    rowData.innerHTML=cartoona;
    
  }

  async function getCategoryMeals(category) {
    
    rowData.innerHTML = ""
    $(".loader").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()

    
    displayMeals(response.meals.slice(0, 20))
    $(".loader").fadeOut(300)
    
}



//meal detail
async function getMealDetails(mealID) {
    
    rowData.innerHTML = "";
    $(".loader").fadeIn(300);

    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    response = await response.json(); 

    displayMealDetails(response.meals[0]); 
    $(".loader").fadeOut(300);  
}

function displayMealDetails(meal) {
    searchContainer.innerHTML = ""; 

    let ingredients = ``;
    rowData.className = "numm";
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    let tags = meal.strTags ? meal.strTags.split(",") : [];  // تجنب أي أخطاء إذا كانت `strTags` غير موجودة
    let tagsStr = '';
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
    }

    let cartoona = `
           <div class="grid normal container ms-auto gap-10 flex grid grid-cols-3">
        <div class="text-white">
          <header class="grid-cols-1">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <h1 class="text-3xl text-white">${meal.strMeal}</h1>
          </header>

      </div>
      <div class="" id="detailsContent">
        <div>
            <div class="flex justify-between text-white">
                <h2 class="text-3xl font-bold">Instructions</h2>
            </div>
            <p class="text-white">${meal.strInstructions}</p>
        </div>
        <div class=" text-white">
            <h3 class="text-2xl"><span class="font-extrabold">Area : </span>${meal.strArea}</h3>
            <h3 class="text-2xl"><span class="font-extrabold">Category : </span>${meal.strCategory}</h3>
            <h3 class="text-2xl font-extrabold">Recipes :</h3>
            <ul class="list-unstyled flex gap-0 flex-wrap items-start">
              
                ${ingredients}  
            </ul>
            <h3 class="text-2xl font-extrabold mb-4">Tags :</h3>
            <ul class="tt mb-5 flex gap-2">
                ${tagsStr} 
            </ul>
            <a target="_blank" href="${meal.strSource}" class="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600">Source</a>
            <a target="_blank" href="${meal.strYoutube}" class="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600">Youtube</a>
        </div>
    </div>
       
       </div>`;

    rowData.innerHTML = cartoona;
}





function showContacts() {
    rowData.className = "numm";
    rowData.innerHTML = `<section id="footer" class="">
      <div class="conect font-[sans-serif] flex md:gap-5 grid sm:grid-cols-1 md:grid-cols-2">
        <div class="mt-8 space-y-4">
            <input type='text' id="name" placeholder='Enter Your Name'
                class="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-white text-sm outline-blue-500" />
            <input type='text' id="phone" placeholder='Enter Your Phone'
                class="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-white text-sm outline-blue-500" />
            <input type='password' id="password" placeholder='Enter Your Password'
                class="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-white text-sm outline-blue-500" />
        </div>
        <div class="mt-8 space-y-4">
            <input type='email' id="email" placeholder='Enter Your Email'
                class="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-white text-sm outline-blue-500" />
            <input type='number' id="age" placeholder='Enter Your Age'
                class="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-white text-sm outline-blue-500" />
            <input type='password' id="rePassword" placeholder='Re Password'
                class="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-white text-sm outline-blue-500" />
        </div>
      </div>
      <div class="btn">
        <button type='button' id="submitBtn"
        class="text-white bg-blue-500 hover:bg-blue-600 rounded-md text-sm">Send</button>
      </div>
      <div id="alerts" class="text-red-600 mt-2 text-center"></div>
    </section>`

    document.getElementById("submitBtn").addEventListener("click", function() {
        let alerts = document.getElementById("alerts");
        alerts.innerHTML = ""; // 
    
        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;
        let password = document.getElementById("password").value;
        let rePassword = document.getElementById("rePassword").value;
        let email = document.getElementById("email").value;
    
        let errors = [];
    
    
        if (!/^\d{11}$/.test(phone)) {
          errors.push("رقم الهاتف يجب أن يحتوي على 10 أرقام.");
        }
    
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
          errors.push("كلمة السر يجب أن تحتوي على حروف كبيرة وصغيرة وأرقام.");
        }
    
    
        if (password !== rePassword) {
          errors.push("كلمة السر وتأكيد كلمة السر غير متطابقتين.");
        }
    
    
        if (!/\S+@\S+\.\S+/.test(email)) {
          errors.push("البريد الإلكتروني غير صحيح.");
        }
    
    
        if (errors.length > 0) {
          alerts.innerHTML = errors.join("<br>");
        } else {
    
          alerts.innerHTML = "<span class='text-green-600'>تم التحقق بنجاح!</span>";
        }
      })
}



// form check

