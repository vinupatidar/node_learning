import { userInfo } from "os";
import { PassThrough } from "stream";
import url from "url";

// The node:url module provides utilities for URL resolution and parsing. It can be accessed using:

// https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash
/*
href = https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash
protocal = https:
origin = https://
auth = user:pass 
username - username
password = pass 
host = sub.example.com:8080
hostname = sub.example.com
port = 8080
path = p/a/t/h?query=string
pathname = p/a/t/h
search = ?query=string
query = query=string
hash = #hash
*/

const urlPar = url.parse('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');
console.log(urlPar)


// Constructing a URL from component parts
const myURL = new URL('https://example.org');
myURL.pathname = '/a/b/c';
myURL.search = '?d=e';
myURL.hash = '#fgh'; 

console.log(myURL)

// hash value
console.log(urlPar.hash); // #hash

// Set hash
urlPar.hash = '#newHash'
console.log(urlPar.hash); // #hash

// Get host
console.log(urlPar.host); // sub.example.com:8080

// URl json
const myURLs = [
    new URL('https://www.example.com'),
    new URL('https://test.example.org'),
  ];
console.log(JSON.stringify(myURLs));
// Prints ["https://www.example.com/","https://test.example.org/"] 


// Format

const urlFormat = url.format({
    protocol : "https",
    hostname : "example.com",
    post : 8080,
    pathname : "/some/path",
    query : {
        page : 1,
        format : 'json'
    }
})
console.log(urlFormat) // https://example.com/some/path?page=1&format=json


