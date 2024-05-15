let dataRequest = new XMLHttpRequest();
dataRequest.open('GET', './data.json');
dataRequest.onload = () => {
    let data = JSON.parse(dataRequest.response);
    console.log(data);
    let items = document.getElementById('items');

    // data.sort((a, b) => a.price - b.price);

    for (let i = 0; i < data.length; i++) {
        let imgUrl = data[i].image;
        let imgTitle = data[i].title;
        let prodPrice = data[i].price;
        let prodRating = data[i].rating.rate;
        let prodCount = data[i].rating.count;

        items.innerHTML += `<div class="item border p-2 shadow flex-column justify-content-between rounded" style="display:flex; width: 22%;">
                <div class="item-img" style="height:150px;">
                     <img src=${imgUrl} class="w-100 h-100" id="img"  alt="">
                </div>
                <div class="item-desc" style="margin-top:60px">
                    <h5>${imgTitle}</h5>
                  <span style="margin-top:20px" id="prod">$${prodPrice}</span>
                    <p class="d-flex justify-content-between" style="margin-top:20px"><span class="bg-success p-1 border rounded-2 text-light">${prodRating} <i class="bi bi-star-fill"></i>
                    </span><span class="p-1 bg-info-subtle border rounded-1">Available Stock : ${prodCount}</span></p>
                   <button class="text-center bg-primary text-light border border-0 p-2 ps-5 pe-5 w-100 rounded-3" id="addCart${i}" onclick="addCartFun(${i})">Add to Cart</button>
               <input type="number" id="numCart${i}" value="1" style="visibility: hidden; width: 1px;">
               </div>
          </div>`
    }
};
dataRequest.send();

let cartCountArr = []
let addCart = document.getElementById('addCart')
let cartCount = document.getElementById('cartCount')
let addCartFun = (id)=>{
    let data = JSON.parse(dataRequest.response)
    let addCart = document.getElementById(`addCart${id}`)
    // console.log(data[id]);
    let cartList = document.getElementById('cartList')
    cartList.innerHTML += `<li id="innerCart${id}" class="text-light justify-content-between align-items-center" style="display:flex;">
    <img src=${data[id].image} width="100px" alt="">
    <p class="w-25">${data[id].title}</p>
    <p class="w-25">$${data[id].price}</p>
    <p class="w-25"><button id="decrement${id}" onclick="decrement(${id})">-</button><input type="number" style="width: 35px;" id="itemCount${id}"/> <button id="increment${id}" onclick="increment(${id})">+</button> <button onclick="removeProduct(${id})"><i class="bi bi-archive-fill"></i></button> <p id="totalPrice${id}">$${data[id].price}</p> </p>
    </li>`
    let cartCount = document.getElementById('cartCount')
    let itemCount = document.getElementById(`itemCount${id}`)
    itemCount.value = 1
    
    let numCart = document.getElementById(`numCart${id}`)
    
    if(numCart.value <= 1){
        cartCountArr.length++
        cartCount.innerText = cartCountArr.length
        numCart.value++
    }
    else{
        console.log('completed');
    }
    alert('your item added to cart successfully')
    cartCount.innerText = cartCountArr.length
    
    
    addCart.removeEventListener('click',addCartFun)
}

function increment(id){
    let data = JSON.parse(dataRequest.response)
    console.log(data[id].rating.count);
    let itemCount = document.getElementById(`itemCount${id}`)
    let totalPrice = document.getElementById(`totalPrice${id}`)
    if(itemCount.value <= data[id].rating.count){
        itemCount.value++
        totalPrice.innerText = `$${itemCount.value*data[id].price}`
    }
   else{
    alert('No Stock')
   }
    
}
function decrement(id){
    let data = JSON.parse(dataRequest.response)
    let itemCount = document.getElementById(`itemCount${id}`)
    let totalPrice = document.getElementById(`totalPrice${id}`)

    if(itemCount.value>1){
        itemCount.value--
        totalPrice.innerText = itemCount.value*data[id].price
    }
    else{
        let innerCart = document.getElementById(`innerCart${id}`)
        innerCart.style.display = 'none'
        let cartCount = document.getElementById('cartCount')
    cartCountArr.length--
    cartCount.innerText = cartCountArr.length
    }
    
}
function removeProduct(id){
    let innerCart = document.getElementById(`innerCart${id}`)
    console.log(innerCart);
    innerCart.style.display = 'none'
    let cartCount = document.getElementById('cartCount')
    cartCountArr.length--
    cartCount.innerText = cartCountArr.length
}