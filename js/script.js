const loadProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;

    /* 
    fetch("https://fakestoreapi.com/products")
        .then(res=>res.json())
        .then(data=>console.log(data))
    */
}

const setAllMenu = async () => {
    // console.log(loadProducts());

    // loadProducts()
    // .then(data=>console.log(data))

    const data = await loadProducts();

    const uniqueProduct = []

    const menuContainer = document.getElementById('menu-container');
    for (const product of data) {
        // console.log(product.category);

        const li = document.createElement('li');

        if (uniqueProduct.indexOf(product.category) === -1) {
            uniqueProduct.push(product.category);
            li.innerHTML = `<a>${product.category}</a>`;
            menuContainer.appendChild(li);
        }

    }
}

setAllMenu();

const searchField = document.getElementById('search-field');


searchField.addEventListener('keypress', async (e) => {

    // spinner show
    const spinner = document.getElementById('spinner')
    spinner.classList.remove('hidden');

    if(e.key == 'Enter'){
        // console.log(e.key);
        const searchFieldValue = searchField.value;
        // console.log(searchFieldValue);

        const allProducts = await loadProducts();
        const desireProduct = allProducts.filter(product => product.category.includes(searchFieldValue));
        // console.log(desireProduct);


        spinner.classList.add('hidden'); 

        const productsContainer = document.getElementById("products-container");
        productsContainer.textContent='';
        
        // showing not Found msg
        const notFound = document.getElementById('not-found');
        notFound.textContent = '';
        if(desireProduct.length === 0){
            notFound.innerHTML=`<h1 class='text-2xl  font-semibold text-orange-600 text-center'>search result does no exist!</h1>`
            return;
        }

        // search box er lekha onujayei product card gula show
        desireProduct.forEach(product => {
            // console.log(product);
            const {category, image, description, price, title} = product

            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card card-compact  bg-base-100 shadow-xl">
                <figure><img class='w-full h-72' src=${image} alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${title.length>20 ? title.slice(0,15) : title + '...'}</h2>
                        <p>${description.slice(0, 25) + '...'}</p>
                        <div class="card-actions justify-end">

                        <label for="my-modal-3" class="btn btn-primary modal-button" onclick="showModal('${image}', '${description}')">Show Details</label>
                        </div>
                    </div>
            </div>
            `
            productsContainer.appendChild(div);

        });

    }
})

// modal e img details show
const modalDetails = document.getElementById('modal-details');
modalDetails.textContent='';
const showModal = (image, des)=>{
    modalDetails.innerHTML=`
    <img src="${image}" alt="">
    <p class="py-4">${des}</p>
    `
}

// by default showing all products
const showAllProduct = async()=>{
    const data = await loadProducts();
    console.log(data);

    data.forEach(product => {
        // console.log(product);
        const {category, image, description, price, title} = product

        const productsContainer = document.getElementById("products-container");

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card card-compact  bg-base-100 shadow-xl">
            <figure><img class='w-full h-72' src=${image} alt="Shoes" /></figure>
                <div class="card-body">
                    <h2 class="card-title">${title.length>20 ? title.slice(0,15) : title + '...'}</h2>
                    <p>${description.slice(0, 25) + '...'}</p>
                    <div class="card-actions justify-end">

                    <label for="my-modal-3" class="btn btn-primary modal-button" onclick="showModal('${image}', '${description}')">Show Details</label>
                    </div>
                </div>
        </div>
        `
        productsContainer.appendChild(div);

    });
}
showAllProduct();