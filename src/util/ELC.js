// eslint no-undef: 0
//This function will grab an element by its class, but only the last one in the array of elements by class. Most useful when replacing html IDs with Classes.
 export function elemByClass (selectedClass) {
    let result
    selectedClass.forEach(element => {
        result = element
    })
    return result
}

 export function funcOnClass (querySeleced, func) {
    querySeleced.forEach(element => {
        func(element)
    })
}

 export function clickClass (querySeleced, func) {
    if (typeof querySeleced === 'object' && querySeleced !== null){
        if(querySeleced.length >= 1){
            querySeleced.forEach(element => {
                element.addEventListener('click', func)
            })
        } else if (objectLength(querySeleced) === 0) {
            querySeleced.addEventListener('click', func)
        } else if (querySeleced === null) {
            say ("The element is null.")
        } else if (querySeleced === undefined) {
            say ("The element is undefined.")
        } else {
            say ("Something is wrong here!")
        }
    }
}

 export function hasClass (el, className) {
    if (el.classList) 
        return el.classList.contains(className)
    // For browsers that don't support the classList property - 
    else
        return !!el.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`))
}
// ----------------

 export function addClass (el, className) {
    if (el.classList) {
        if (className instanceof Array) {
            for (let thisName in className) { el.classList.add(className[thisName]) }
        } else { el.classList.add(className) }
    // For browsers that don't support the classList property - 
    } else if (!hasClass(el, className)) el.className += ' ' + className // For browsers that don't support the classList property - 
    
}
// ----------------

 export function removeClass (el, className) {
    if (el.classList)
        el.classList.remove(className)
    // For browsers that don't support the classList property - 
    else if (hasClass(el, className)) { 
        const reg = new RegExp(`(\\s|^)${className}(\\s|$)`)
        el.className = el.className.replace(reg, ' ')
    }
}

// export function toggleClass (el, toggleClass) {
//     if (el.classList) {
//         say(el.classList)
//         el.classList.toggle(toggleClass);
//         say(el.classList)
//     // For browsers that don't support the classList property - 
//     } else {
//         const elClasses = el.className.split(" ")
//         const i = elClasses.indexOf(toggleClass)
//         if (i >= 0) 
//             elClasses.splice(i, 1)
//         else 
//             elClasses.push(toggleClass);
//             el.className = classes.join(" ") // classes isn't a thing?
//     }}

// Faster way to write log, but less performant. Development only.
export function l () {
    const args = [...arguments]
    console.log(args)
}

// Multipurpose check function. Not performant. Ideal for singular diagnosis, not rapid logging.
export function q (check, style, trace) {
    const args = [...arguments]
    function l (args) {
        console.log(args)
    }
    let mytype
    switch (true) {
        case check instanceof Promise:
            mytype = 'Promise'
            break
        case typeof check === 'string':
            mytype = 'String'
            break
        case Number.isInteger(check):
            mytype = 'Integer'
            break
        case typeof check === 'boolean':
            mytype = 'Boolean'
            break
        case check instanceof Array:
            mytype = 'Array'
            break
        case typeof check === "function":
            mytype = 'Function'
            break
        case check instanceof Date:
            mytype = 'Date'
            break
        case check instanceof Object:
            mytype = 'Object'
            break
        default:
            mytype = '...Odd Bit?'
            break
    }
    console.log(`Q: This ${mytype} has a value of:`)
    if (arguments.length >= 2 && (typeof check === 'string' || check instanceof String) && style !== (undefined || null ) && typeof style !== 'boolean') {
        check = `%c ${check}`
        console.log(check, style)
    } else {
        if(mytype === 'Array') { console.table(check); } 
        else { console.log(check); l(args) }
    }
    if ((arguments.length >= 2 && typeof style === 'boolean') || trace === true) { 
        console.log('%c Trace Your Steps Below... ', 'font-size:15px; color: Cornsilk; background: DarkOliveGreen;') 
        console.trace(check) 
    }
    if (mytype !== 'Integer') { console.assert(check, "That's not true! That's impossible!") }
}

// A fast and simple way to log strings or arrays of strings.
 export function say() {
    const args = [...arguments]
    if (args.length === 1) { console.log(`Message: ${args[0]}`); } 
    else {
        let i = 1
        args.forEach(arg => { 
            console.log(`Message ${i}: ${arg}`); 
            i++; })
    }
}

// Console log in a table.
 export function table(log) {
    console.table(log)
}


// Returns the length of an object.
 export function objectLength (object) {
    return Object.keys(object).length
}

// Turns an integer into a string with commas.
 export function numberWithCommas (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// From an array, create a new array of strings that match a provided string. 
 export function matchesFromArr (StringToMatch, arr) {
    return arr.filter(item => {
        const regex = new RegExp(StringToMatch, 'gi')
        return item.match(regex)
    })
}

 export function sliceIndex (array, index) {
    const newArr = [
        ...array.slice(0, index),
        ...array.slice(index +1)
    ]
    return newArr
}

// Returns a copied version of a passed object. Not nessesarily performant, 
// and smashes everything into strings (like Dates and Functions).
 export function poorClone (obj) {
    return JSON.parse(JSON.stringify(obj))
}

// Create a millisecond waiting period for a wrapped function(func). 
// - Primarilly usefull for scroll-based event listeners 
 export function debounce (func, wait = 20, immediate = true) {
    var timeout
    return function() {
        var context = this, args = arguments
        var later = function() {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        var callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}
// (Source: Wes Bos, Javascript 30, video 13, "Vanilla JavaScript Slide In on Scroll"
//  - https://bit.ly/2lSz0XM); 
// -----------------------------------------------------------

// Set a key and value in local storage.
 export function localSET (key, toSet) {
    localStorage.setItem(key, JSON.stringify(toSet))
}

// Get a key and value from local storage.
 export function localGET (key) {
    return JSON.parse(localStorage.getItem(key)) || []
}