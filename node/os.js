import os from "os";

// The node:os module provides operating system-related utility methods and properties.


// Arch
// Returns the operating system CPU architecture for which the Node.js binary was compiled. Possible values are 'arm', 'arm64', 'ia32', 'loong64', 'mips', 'mipsel', 'ppc', 'ppc64', 'riscv64', 's390', 's390x', and 'x64'

console.log(os.arch());


// Cpus
// Returns an array of objects containing information about each logical CPU core. The array will be empty if no CPU information is available, such as if the /proc file system is unavailable.

console.log(os.cpus());

// Freemem
// return the amount of fee system memory in bytes as an Integer
console.log(os.freemem())


// homedir
// Returns the string path of the current user's home directory.
console.log(os.homedir())

// hostname
// Returns the host name of the operating system as a string.
console.log(os.hostname());


// Platform
// Returns a string identifying the operating system platform for which the Node.js binary was compiled. The value is set at compile time. Possible values are 'aix', 'darwin', 'freebsd','linux', 'openbsd', 'sunos', and 'win32'.
// The return value is equivalent to process.platform.
console.log(os.platform());

// tmpdir
// return the operating system defualt directory for temporary files as string
console.log(os.tmpdir());

// totalmem
// return the total amount of system memory in bytes as string
console.log(os.totalmem());

