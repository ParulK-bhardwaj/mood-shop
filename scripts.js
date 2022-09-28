import data from './data.js'


const itemsContainer = document.querySelector('#items')
const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')
itemList.innerHTML = '<li> Hello World</li>'




// the length of our data determines how many times this loop goes around
for (let i = 0; i < data.length; i += 1) {
	// create a new div element and give it a class name
	const newDiv = document.createElement('div');
	newDiv.className = 'item'
	// create an image element
	const img = document.createElement('img');
	// this will change each time we go through the loop. Can you explain why?
	img.src = data[i].image
	img.width = 300
	img.height = 300
	// Add the image to the div
	newDiv.appendChild(img)
	console.log(img) // Check the console!
	itemsContainer.appendChild(newDiv)
    // create a paragraph element
    const desc = document.createElement('P');
    desc.innerText = data[i].desc
    // Add the para to the div
    newDiv.appendChild(desc)
    console.log(desc)
    // price
    const price = document.createElement('P');
    price.innerText = data[i].price
    // Add the para to the div
    newDiv.appendChild(price)
    console.log(price)
    // button 
	const button = document.createElement('button')
	// add an id name to the button
	button.id = data[i].name
	// creates a custom attribute called data-price. That will hold price for each element in the button
	button.dataset.price = data[i].price
	button.innerHTML = 'Add to Cart'
	newDiv.appendChild(button)
}

// -------------------------------------------------
// to select all buttons 
const all_items_button = Array.from(document.querySelectorAll("button"))
all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
  }))
// console.log(all_items_button)
// -------------------------------------------------
// Cart Calculations
const cart = [];

// -------------------------------------------------
// function addItem to add items in the cart

function addItem(name, price) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) { 
            cart[i].qty += 1
            // stop here!
            return 
        }
    }
    const item ={name, price, qty: 1}
    cart.push(item)
}

// -------------------------------------------------
// function showItems to show items in the cart
function showItems() {
    
    const qty = getQty();
    cartQty.innerHTML = `You have ${qty} items in your cart.`
    // console.log(`You have ${qty} items in your cart.`)

    let itemStr = ''
    for (let i = 0; i < cart.length; i += 1) {
        // console.log(`- ${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
        
        // const name = cart[i].name
		// const price = cart[i].price
		// const qty = cart[i.qty]
        //{name: 'Apple', price : 0.99, qty: 3}

		const {name, price, qty} = cart[i]
		itemStr += `<li id="cart-list">
		${name} $${price} x ${qty} = $${qty * price}  </li>`
    }
    itemList.innerHTML = itemStr
    // console.log(`Cart Total: $${getTotal()}`)
    cartTotal.innerHTML = `Total in cart: $${getTotal()}`
}

// -------------------------------------------------
// total quantity Function
function getQty() {
	let qty = 0
	for (let i = 0; i<cart.length; i++) {
		qty += cart[i].qty
	}
	return qty
}

// -------------------------------------------------
// cart Total function
function getTotal() {
	let total = 0
	for (let i = 0; i < cart.length; i++) {
		total += cart[i].price * cart[i].qty
	}
	return total.toFixed(2)
}

function removeItem(name, qty = 0) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            if (qty > 0) {
                cart[i].qty -= 1
            }
            if (cart[i].qty < 1 || qty === 0 ) {
                cart.splice(i, 1) 
            }
            return
        }
    }
}
// -------------------------------------------------
// Test code
addItem('Apple', 0.99)
addItem('Orange', 1.29)
addItem('Opinion', 0.02)
addItem('Apple', 0.99)
addItem('Frisbee', 9.92)
addItem('Apple', 0.99)
addItem('Orange', 1.29)
showItems();

removeItem('Apple', 1)
removeItem('Frisbee')
 
showItems();
