let number1, number2, result
let mathematicalExpression

//4 fucntions for basic mathematical operation, a func take 2 number and a mathematical expression
function doAddition(num1, num2) {
    return num1 + num2
}

function doSubtraction(num1, num2) {
    return num1 - num2
}

function doMultiplication(num1, num2) {
    return num1 * num2
}

function doDivision(num1, num2) {
    return num1 / num2
}

function doMath(num1, num2, expression) {
    switch(expression) {
        case '+': result = doAddition(num1, num2)
        case '-': result = doSubtraction(num1, num2)
        case '*': result = doMultiplication(num1, num2)
        case '/': result = doDivision(num1, num2)
    }
}

//Show the charactor on the monitor
const btns = document.querySelectorAll("button")
const display = document.querySelector("#display")
const sp = document.querySelector("#space")
const cl = document.querySelector("#clear")

// btn.addEventListener("click", function () {
//     display.textContent = btn.textContent;
// })

sp.addEventListener("click", function() {
    let text = display.textContent
    display.textContent = text.slice(0, -1)
})

cl.addEventListener("click", function() {
    display.textContent = ''
})

btns.forEach(btn => {
    if(btn.id == "space" || btn.id == "clear" || btn.id == "equal") {}
    else {
        btn.addEventListener("click", function() {
            display.textContent += btn.textContent;
        })
    }
})






