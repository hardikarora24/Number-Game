var numOfAttempts = 10
var numOfDigits = 4
var guess = 0
var count = 0
var wantRepeat = 0
var selectDigits = document.querySelector('#num')
var selectAttempts = document.querySelector('#numa')
var selectRepeat = document.querySelector('#repeat')

selectDigits.addEventListener('change', () => {
    numOfDigits = selectDigits.options[selectDigits.selectedIndex].value
})

selectAttempts.addEventListener('change', () => {
    numOfAttempts = selectAttempts.options[selectAttempts.selectedIndex].value
})
selectRepeat.addEventListener('change', () => {
    wantRepeat = selectRepeat.options[selectRepeat.selectedIndex].value
})


const startGame = document.querySelector(".startbutton")
startGame.addEventListener('click', () => {
    answer = generate(numOfDigits)
    console.log(answer, numOfDigits, numOfAttempts)
    document.getElementById('body1').style.setProperty('display', 'none')
    document.getElementById('body2').style.setProperty('display', 'block')
    console.log(wantRepeat)
})
const digits = document.querySelectorAll('.digit')
const c = document.querySelector('.c')
const ac = document.querySelector('.ac')
const displayNum = document.querySelector('.tried')
const submit = document.querySelector('.submit')
const table = document.querySelector('#guess-table')
digits.forEach(digit => {
    digit.addEventListener('click', () => {
        if (displayNum.innerText.toString().length < numOfDigits) {
            displayNum.innerHTML += digit.innerHTML
        } else { alert("Don't exceed the number of digits") }
    })
})
ac.addEventListener('click', () => {
    displayNum.innerText = ""
})

c.addEventListener('click', () => {
    let str = displayNum.innerHTML.toString()
    displayNum.innerHTML = str.substring(0, str.length - 1)
})
submit.addEventListener('click', () => {
    guess = displayNum.innerText
    if (checkRepeat(parseInt(guess)) && wantRepeat === 0) {
        alert("ALL DIGITS ARE UNIQUE")
    }
    else {
        checks()
    }
    displayNum.innerText = ""
})




function generate(x) {
    console.log('hello')
    let max = Math.pow(10, x)
    var ans = Math.floor(Math.random() * max)
    while ((wantRepeat == 0 && checkRepeat(ans)) || ans < (max / 10) - 1) {
        ans = Math.floor(Math.random() * max)
    }
    console.log('no')
    return ans

}
function checkRepeat(number) {
    let check = number.toString()
    for (let i = 0; i < check.length; i++) {
        for (let j = 0; j < check.length; j++) {
            if (i != j && (check.charAt(i) == check.charAt(j))) {
                return true
            }
        }
    }
    return false
}


function reset() {
    document.getElementById('body1').style.setProperty('display', 'block')
    document.getElementById('body2').style.setProperty('display', 'none')
    numOfDigits = 4
    numOfAttempts = 10
    guess = 0
    count = 0
    table.innerHTML = "<thead><tr><th>Your <br>Guess</th><th>No. of <br>Correct <br>Digits</th><th>No. of digits<br>on Correct<br> Position</th></tr></thead>"
    wantRepeat = 0
    displayNum.innerText = ""
}


function checks() {
    var correctDigits = compare1(guess, answer)
    var correctPositions = compare2(guess, answer)
    if (guess.toString().length == numOfDigits) {
        let text = ""
        text += "<tr>"
        text += "<td>" + guess + "</td>"
        text += "<td>" + correctDigits + "</td>"
        text += "<td>" + correctPositions + "</td>"
        text += "</tr>"
        table.innerHTML += text
        count++

        if (correctPositions == numOfDigits) {
            alert("You have guessed the number " + answer + " in " + count + " attempts!")
            reset()
        }
        if (count == numOfAttempts) {
            alert("YOU DID NOT GUESS THE NUMBER " + answer + " IN THE GIVEN TRIES")
            reset()
        }
    } else {
        alert("Enter a valid guess!")
    }
}
function compare1(guess, ans) {
    let gs = guess.toString()
    let nu = ans.toString()
    //let a = 0
    let b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let count = 0
    for (i = 0; i < numOfDigits; i++) {
        b[parseInt(gs.charAt(i))]++
        c[parseInt(nu.charAt(i))]++
    }
    /*     console.log(b)
        console.log(c) */
    for (i = 0; i < 10; i++) {
        while (b[i] > 0 && c[i] > 0) {
            b[i]--
            c[i]--
            count++
        }
    }
    /*     console.log(count)
    
        for (let i = 0; i < numOfDigits; i++) {
            for (let j = 0; j < numOfDigits; j++) {
                if (gs.charAt(i) == nu.charAt(j)) {
                    a++
                }
            }
        }
        return a */
    return count
}
function compare2(guess, ans) {
    let gs = guess.toString()
    let nu = ans.toString()
    let a = 0
    for (let i = 0; i < numOfDigits; i++) {
        if (gs.charAt(i) == nu.charAt(i)) {
            a++
        }
    }
    return a
}
