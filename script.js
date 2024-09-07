let number1, number2, result
let mathematicalExpression

//4 fucntions for basic mathematical operation, a func take 2 number and a mathematical expression
function doAddition(num1, num2) {
    return num1 + num2;
}

function doSubtraction(num1, num2) {
    return num1 - num2;
}

function doMultiplication(num1, num2) {
    return num1 * num2;
}

function doDivision(num1, num2) {
    return num1 / num2;
}

function doMath(num1, num2, expression) {
    switch(expression) {
        case '+': result = doAddition(num1, num2); break;
        case '-': result = doSubtraction(num1, num2); break;
        case '*': result = doMultiplication(num1, num2); break;
        case '/': result = doDivision(num1, num2); break;
        default:
            console.log("nothing here")
    }
}

//Show the charactor on the monitor
const btns = document.querySelectorAll("button")
const display = document.querySelector("#display")
const sp = document.querySelector("#space")
const cl = document.querySelector("#clear")
const equal = document.querySelector("#equal")

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
            contentChanged()
        })
    }
})

function isNumber(ch) {
    if(ch >= "0" && ch <= "9") return true
    
    return false
}

function isMathmaticExpression(ch) {
    if((ch == '+') || (ch == '-') || (ch == '*') || (ch == '/')) return true
    else return false
}

//Not done yet, still get error
function correctNumber(number) {
    if(number.includes('*') || number.includes('/')) {
        return number
    }

    let negativeCount = 0
    let actualNumber = ''

    //filter number from expression before it
    let passNum = false
    for(const ch of number) {
        if(isNumber(ch) || ch == '.') {
            actualNumber+=ch
            passNum = true
        }
        if(ch == '-' && !passNum) negativeCount++
    }


    //if number of negative is even, return posive number else return a negative number
    if(negativeCount % 2 == 0) return actualNumber
    else return number = '-' + actualNumber

}

function calculate(str) {
    result = undefined
    //only calculate if there is expression
    if(!str.includes('+') && !str.includes('-') && !str.includes('*') && !str.includes('/')) {
        return
    }

    let num1, num2, expr = '', exprIndex
    let num1IsNull
    //loop for finding expression
    for(let i = 0; i < str.length; i++) {//-18
        if(isMathmaticExpression(str.charAt(i)) && isNumber(str.charAt(i-1))) {
            expr+=str.charAt(i)
            exprIndex = i
            console.log(expr);
            break
        }
    }
    if(exprIndex === undefined) return
    //////Find the seperate pair of number, then correct them if there's any exessive negative or positive before it
    num1 = str.slice(0, exprIndex)
    num2 = str.slice(exprIndex + 1, str.length)
    console.log(num1+".."+expr+".."+num2);
    //correct number if it has multiple positive and negative before it
    num1 = correctNumber(num1)
    num2 = correctNumber(num2)

    doMath(Number(num1), Number(num2), expr)
}

//return true if there is a pair of number, ready for calculate
function hasAPairOfNumber(str) {
    let exprOnePos = -1
    let lastIndex = str.length - 1
    let subStr = ''

    for(let i = 0; i <= lastIndex; i++) {
        if(isMathmaticExpression(str.charAt(i))) {
            exprOnePos = i
            //console.log("first: " + str.charAt(i));
            break
        }
    }
    if(!isMathmaticExpression(str.charAt(lastIndex))) {
        return false
    }

    subStr = str.slice(exprOnePos)
    for(const ch of subStr) {
        if(isNumber(ch)) {
            return true
        }
    }

    return false
}

function contentChanged() {
    display.scrollLeft = display.scrollWidth
    /*
    This whole thing is to restrict to one pair to operate at a time 
    meaning that when user try to add the 3th number to calculate, the calculator 
    will automatically calculate the first pair of number 
    */
    let content = display.textContent
    let secondExpr = ''

    if(!hasAPairOfNumber(content)) {
        return
    }

    let lastNumPos = -1
    for(let i = content.length - 1; i >= 0; i--) {
        if(isNumber(content.charAt(i))) {
            lastNumPos = i
            break
        }
        secondExpr = content.charAt(i) + secondExpr
    }

    calculate(display.textContent.slice(0, lastNumPos + 1))
    //console.log(display.textContent.slice(0, lastNumPos + 1));
    display.textContent = result.toString() + secondExpr
}

equal.addEventListener("click", () => {
    calculate(display.textContent) 
    display.textContent = result.toString()
})


