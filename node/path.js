import path from 'path';

// Basename

const val1 = path.basename("C:\\temp\\file.txt");
console.log(val1) //  output- C:\temp\file.txtt

const val2 = path.win32.basename("C:\\temp\\file.txt");
console.log(val2); // output- file.txt

const val3 = path.basename('/foo/bar/baz/asdf/quux.html');
console.log(val3); // Returns: 'quux.html'

const val4 = path.basename('/foo/bar/baz/asdf/quux.html', '.html');
console.log(val4) // Returns: 'quux'

const val5 = path.win32.basename('C:\\foo.HTML', '.html');
console.log(val5) // Returns: 'foo.HTML' 

//--------------------------------------------------------------------------

// Delimeter

// Window ; and POSIX :

// On POSIX/MAC
const path1 = "/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin";
console.log(path1.split(path.delimiter));
// output - [ '/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin' ]

//Window
//const path2 = "C:\Windows\system32;C:\Windows;C:\Program Files\node\";
//console.log(path2.split(path.delimiter));
// output - ['C:\\Windows\\system32', 'C:\\Windows', 'C:\\Program Files\\node\\']

//-----------------------------------------------------------------------------------

// dirname

// The path.dirname() method returns the directory name of a path, similar to the Unix dirname command. Trailing directory separators are ignored, see path.sep.

console.log(path.dirname("/foo/bar/baz/asdf/quux"));
// // Returns: '/foo/bar/baz/asdf' 

//-----------------------------------------------------------------------------------

// extname

// The path.extname() method returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last portion of the path. If there is no . in the last portion of the path, or if there are no . characters other than the first character of the basename of path (see path.basename()) , an empty string is returned.

console.log(path.extname('index.html')); // Returns: '.html'
console.log(path.extname('index.coffee.md')); // Returns: '.md'
console.log(path.extname('index.')); // Returns: '.'
console.log(path.extname('index')); // Returns: ''
console.log(path.extname('.index')); // Returns: ''
console.log(path.extname('.index.md')); // Returns: '.md'

//-----------------------------------------------------------------------------------


// format

/* pathObject <Object> Any JavaScript object having the following properties:
dir <string>
root <string>
base <string>
name <string>
ext <string>
Returns: <string>
The path.format() method returns a path string from an object. This is the opposite of path.parse().
*/

// If `dir`, `root` and `base` are provided,
// `${dir}${path.sep}${base}`
// will be returned. `root` is ignored.
path.format({
    root: '/ignored',
    dir: '/home/user/dir',
    base: 'file.txt',
  });
  // Returns: '/home/user/dir/file.txt'
  
  // `root` will be used if `dir` is not specified.
  // If only `root` is provided or `dir` is equal to `root` then the
  // platform separator will not be included. `ext` will be ignored.
  path.format({
    root: '/',
    base: 'file.txt',
    ext: 'ignored',
  });
  // Returns: '/file.txt'
  
  // `name` + `ext` will be used if `base` is not specified.
  path.format({
    root: '/',
    name: 'file',
    ext: '.txt',
  });
  // Returns: '/file.txt'
  
  // The dot will be added if it is not specified in `ext`.
  path.format({
    root: '/',
    name: 'file',
    ext: 'txt',
  });
  // Returns: '/file.txt'

  //-----------------------------------------------------------------------------------

  // isAbsolute

 //The path.isAbsolute() method determines if path is an absolute path.
 //If the given path is a zero-length string, false will be returned.

 // POSIX
 
console.log(path.isAbsolute('/foo/bar')); // true
console.log(path.isAbsolute('/baz/..'));  // true
console.log(path.isAbsolute('qux/'));     // false
console.log(path.isAbsolute('.'));        // false

 //Window
console.log(path.win32.isAbsolute('//server'));    // true
console.log(path.win32.isAbsolute('\\\\server'));  // true
console.log(path.win32.isAbsolute('C:/foo/..'));   // true
console.log(path.win32.isAbsolute('C:\\foo\\..')); // true
console.log(path.win32.isAbsolute('bar\\baz'));    // false
console.log(path.win32.isAbsolute('bar/baz'));     // false
console.log(path.win32.isAbsolute('.'));           // false

//-----------------------------------------------------------------------------------

// Join

//The path.join() method joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.

// .. its related to once step remove. If we remove multiple time then that much path will remove

console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..',)) //output- /foo/bar/baz/asdf
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..', '..')) //output- /foo/bar/baz
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..', '../..')) //output- /foo/bar
//console.log(path.join('foo', {}, 'bar')) //output- Throws 'TypeError: Path must be a string. Received {}' 

//console.log(path.join(path.dirname, "file.txt"))

//-----------------------------------------------------------------------------------

// Normalize

// The path.normalize() method normalizes the given path, resolving '..' and '.' segments.
// When multiple, sequential path segment separation characters are found (e.g. / on POSIX and either \ or / on Windows), they are replaced by a single instance of the platform-specific path segment separator (/ on POSIX and \ on Windows). Trailing separators are preserved.

//on POSIX
console.log(path.normalize('/foo/bar//baz/asdf/quux/..')); // Returns: '/foo/bar/baz/asdf'
console.log(path.normalize('/foo/bar//baz/asdf/quux/../..')); // Returns: '/foo/bar/baz'
console.log(path.normalize('/foo/bar//baz/asdf/quux/../../..')); // Returns: '/foo/bar'

//on WIndow
console.log(path.win32.normalize('C:\\temp\\\\foo\\bar\\..\\')); // Returns: 'C:\\temp\\foo\\'
console.log(path.win32.normalize('C:////temp\\\\/\\/\\/foo/bar')); // Returns: 'C:\\temp\\foo\\bar'

//-----------------------------------------------------------------------------------

// Parse

// The path.parse() method returns an object whose properties represent significant elements of the path. Trailing directory separators are ignored.
/*
The returned object will have the following properties:

dir <string>
root <string>
base <string>
name <string>
ext <string>
*/

//on POSIX
path.parse('/home/user/dir/file.txt');
// Returns:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }

//on Window
path.parse('C:\\path\\dir\\file.txt');
// Returns:
// { root: 'C:\\',
//   dir: 'C:\\path\\dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }


//-----------------------------------------------------------------------------------

// Resolve

/*
The path.resolve() method resolves a sequence of paths or path segments into an absolute path.
The given sequence of paths is processed from right to left, with each subsequent path prepended until an absolute path is constructed. For instance, given the sequence of path segments: /foo, /bar, baz, calling path.resolve('/foo', '/bar', 'baz') would return /bar/baz because 'baz' is not an absolute path but '/bar' + '/' + 'baz' is.
If, after processing all given path segments, an absolute path has not yet been generated, the current working directory is used.
The resulting path is normalized and trailing slashes are removed unless the path is resolved to the root directory.
Zero-length path segments are ignored.
If no path segments are passed, path.resolve() will return the absolute path of the current working directory.
*/
console.log(path.resolve('/foo/bar', './baz'));
// Returns: '/foo/bar/baz'

console.log(path.resolve('/foo/bar', '/tmp/file/'));
// Returns: '/tmp/file'

console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'));
// If the current working directory is /home/myself/node,
// this returns '/Users/iamvi9d/Documents/Project/Express/wwwroot/static_files/gif/image.gif'

//-----------------------------------------------------------------------------------

// path.sep#

// Provides the platform-specific path segment separator:
/*
    \ on Windows
    / on POSIX

*/

//on POSIX:

'foo/bar/baz'.split(path.sep);
// Returns: ['foo', 'bar', 'baz'] COPY

//On Windows:

'foo\\bar\\baz'.split(path.sep);
// Returns: ['foo', 'bar', 'baz'] COPY

//On Windows, both the forward slash (/) and backward slash (\) are accepted as path segment separators; however, the path methods only add backward slashes (\).