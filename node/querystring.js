import url from "url";
import querystring from "querystring";

// Parse

const urlS =  'https://google/com/query?foo=bar&abc=xyz&abc=123';
console.log(url.parse(urlS));
const qs = url.parse(urlS);
console.log(querystring.parse(qs.query)) // { foo: 'bar', abc: [ 'xyz', '123' ] }
console.log(querystring.parse(qs.query, '&', '=')) //output- { foo: 'bar', abc: [ 'xyz', '123' ] }


// Stringify

const dec = { foo : "bar", abc : [ 'xyz', 123 ]}
console.log(querystring.stringify(dec)) //output- foo=bar&abc=xyz&abc=123