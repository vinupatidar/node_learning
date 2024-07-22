import util from "util";
import fs from "fs";

// callbackify
/* Takes an async function (or a function that returns a Promise) and returns a function following the 
error-first callback style, i.e. taking an (err, value) => ... callback as the last argument. In the callback, 
the first argument will be the rejection reason (or null if the Promise resolved), and the second argument will be 
the resolved value.
*/
async function fn() {
    return "hello world"
}

const callbackfuntion = util.callbackify(fn);
callbackfuntion((err, val) => {
    if (err) throw err;
    console.log(val);
})

//----------------------------------------------------------------------------

// deprecate
/*
    The util.deprecate() method wraps fn (which may be a function or class) in such a way that it is marked as deprecated.
*/
const fn1 = util.deprecate(() => {
    console.log("Depracated method function")
}, "This method is deprecated", "EP0001")
fn1();

//----------------------------------------------------------------------------

// format
/*
    he util.format() method returns a formatted string using the first argument as a printf
*/
console.log(util.format("%s:%s", "foo"));
console.log(util.format("%s:%s", "foo", "bar"));
console.log(util.format("%s:%s:%s", "foo", "bar", "taz"));
console.log(util.format("%s:%s", "foo", "bar", "taz"));
console.log(util.format("%s-%s", "foo", "bar", "taz"));
console.log(util.format("%s-%s", "foo", "bar", "taz"));
console.log(util.format("foo", "bar", "taz"));

//----------------------------------------------------------------------------

// isDeepStrictEqual(val1, val2)
let var1 = "hello";
let var2 = "hello";
let var3 = "worldd";

console.log(util.isDeepStrictEqual(var1, var2));
console.log(util.isDeepStrictEqual(var1, var3));

//----------------------------------------------------------------------------

// MIMEType
    // Type & subType
    const mimeType = util.MIMEType;
    const myMime = new mimeType("text/javascript")
    console.log(myMime.type) //output -> text
    console.log(myMime.subtype) //output -> javascript

    myMime.type = 'application';
    console.log(myMime.type) //output -> application
    console.log(String(myMime)) //output -> application/javascript

    myMime.subtype = 'ecmascript';
    console.log(myMime.subtype) //output -> ecmascript
    console.log(String(myMime)) //output -> application/ecmascript

//----------------------------------------------------------------------------

// Promisifly
/*
    Takes a function following the common error-first callback style, i.e. taking an (err, value) => ... callback as the last argument, and returns a version that returns promises.
*/

const val = util.promisify(fs.stat);
val(".").then((val) => {
    console.log("Then block..")
}).catch(err => {
    onsole.log("Error block..")
})

//----------------------------------------------------------------------------

// isFunction

function fn2() {}
const bar = () => {}
console.log(util.isFunction(fn2))
console.log(util.isFunction(bar))
console.log(util.isFunction({}))

//----------------------------------------------------------------------------

// Deprecated Methods:

util.isDate(new Date())
util.isError(new Error())
util.isString("hello")
util.isNull(null)
util.isBoolean(true)
util.isArray([])
util.isUndefined(undefined)

