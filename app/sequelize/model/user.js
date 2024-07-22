import { Sequelize, DataTypes, STRING } from "sequelize";
import sequelize from "../connection/connection.js";

// Properties for fileds
/*
    type: DataTypes.INTEGER,
    type: DataTypes.UUID,
    DataTypes.DATE; // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
    DataTypes.DATE(6); // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision
    DataTypes.DATEONLY;
    DataTypes.INTEGER; // INTEGER
    DataTypes.BIGINT; // BIGINT
    DataTypes.BIGINT(11); // BIGINT(11)
    DataTypes.FLOAT; // FLOAT
    DataTypes.FLOAT(11); // FLOAT(11)
    DataTypes.FLOAT(11, 10); // FLOAT(11,10)
    DataTypes.REAL; // REAL            PostgreSQL only.
    DataTypes.REAL(11); // REAL(11)        PostgreSQL only.
    DataTypes.REAL(11, 12); // REAL(11,12)     PostgreSQL only.
    DataTypes.DOUBLE; // DOUBLE
    DataTypes.DOUBLE(11); // DOUBLE(11)
    DataTypes.DOUBLE(11, 10); // DOUBLE(11,10)
    DataTypes.DECIMAL; // DECIMAL
    DataTypes.DECIMAL(10, 2); // DECIMAL(10,2)
    DataTypes.BOOLEAN; // TINYINT(1)
    DataTypes.STRING; // VARCHAR(255)
    DataTypes.STRING(1234); // VARCHAR(1234)
    DataTypes.STRING.BINARY; // VARCHAR BINARY
    DataTypes.TEXT; // TEXT
    DataTypes.TEXT('tiny'); // TINYTEXT
    DataTypes.CITEXT; // CITEXT          PostgreSQL and SQLite only.
    DataTypes.TSVECTOR; // TSVECTOR        PostgreSQL only.

    //Defines an array of DataTypes.SOMETHING.
    DataTypes.ARRAY( DataTypes.SOMETHING );

    // For example
    // VARCHAR(255)[]
    DataTypes.ARRAY(DataTypes.STRING);
    // VARCHAR(255)[][]
    DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING));

    DataTypes.BLOB; // BLOB (bytea for PostgreSQL)
    DataTypes.BLOB('tiny'); // TINYBLOB (bytea for PostgreSQL)
    DataTypes.BLOB('medium'); // MEDIUMBLOB (bytea for PostgreSQL)
    DataTypes.BLOB('long'); // LONGBLOB (bytea for PostgreSQL)

    //ENUM
    DataTypes.ENUM('foo', 'bar'); // An ENUM with allowed values 'foo' and 'bar'
    states: {
        type: DataTypes.ENUM,
        values: ['active', 'pending', 'deleted'],
    },

    allowNull: false,   
    unique: true,   
    primaryKey: true,  
    autoIncrement: true,  
    defaultValue: 'india'   
    field: 'user_id'     // change key to this filed name in table
    underscored: true,   // without this define sequelize create filed like createdAt, but when its true it wil create filed created_at
    comment: 'This is a column name that has a comment',
    references: {
        // This is a reference to another model
        model: Bar,

        // This is the column name of the referenced model
        key: 'id',

        // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
        // Options:
        // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
        // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
        // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
    }

    validate: {
        is: /^[a-z]+$/i,          // matches this RegExp
        is: ["^[a-z]+$",'i'],     // same as above, but constructing the RegExp from a string
        not: /^[a-z]+$/i,         // does not match this RegExp
        not: ["^[a-z]+$",'i'],    // same as above, but constructing the RegExp from a string
        isEmail: true,            // checks for email format (foo@bar.com)
        isUrl: true,              // checks for url format (https://foo.com)
        isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
        isIPv4: true,             // checks for IPv4 (129.89.23.1)
        isIPv6: true,             // checks for IPv6 format
        isAlpha: true,            // will only allow letters
        isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
        isNumeric: true,          // will only allow numbers
        isInt: true,              // checks for valid integers
        isFloat: true,            // checks for valid floating point numbers
        isDecimal: true,          // checks for any numbers
        isLowercase: true,        // checks for lowercase
        isUppercase: true,        // checks for uppercase
        notNull: true,            // won't allow null
        isNull: true,             // only allows null
        notEmpty: true,           // don't allow empty strings
        equals: 'specific value', // only allow a specific value
        contains: 'foo',          // force specific substrings
        notIn: [['foo', 'bar']],  // check the value is not one of these
        isIn: [['foo', 'bar']],   // check the value is one of these
        notContains: 'bar',       // don't allow specific substrings
        len: [2,10],              // only allow values with length between 2 and 10
        isUUID: 4,                // only allow uuids
        isDate: true,             // only allow date strings
        isAfter: "2011-11-05",    // only allow date strings after a specific date
        isBefore: "2011-11-05",   // only allow date strings before a specific date
        max: 23,                  // only allow values <= 23
        min: 23,                  // only allow values >= 23
        isCreditCard: true,       // check for valid credit card numbers

        // Examples of custom validators:
        isEven(value) {
            if (parseInt(value) % 2 !== 0) {
            throw new Error('Only even values are allowed!');
            }
        }
        isGreaterThanOtherField(value) {
            if (parseInt(value) <= parseInt(this.otherField)) {
            throw new Error('Bar must be greater than otherField.');
            }
        }

        isInt: {
            msg: 'Must be an integer number of pennies';
        }

        sIn: {
            args: [['en', 'zh']],
            msg: "Must be English or Chinese"
        }

    }
*/

// define sequelize schems. User is schema name
const userSeqModel = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,// type of field
        allowNull: false,       // false will not allow null for this field
        unique: true,           // it will alllow unique values 
        primaryKey: true,       // set it as PK
        autoIncrement: true,    // it will auto increment unique field
        field: 'user_id'        // define field name for table else it will take key name 
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {             // set validation on this field
            len: {              // lenght for this filed value
                args:[4, 10],
                msg: "name length should be 4 to 10 character"  // custom message in case of validation failed
            }
        }
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: {
                args : [4, 10],
                msg: "name length should be 4 to 10 character"
            }
        }
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 18,
            max: 50
        },
        comment: "Age should be between 18 to 50"
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    city: {
        type: DataTypes.ENUM,   // set ENUM
        values: ["pune", "mumbai"]
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "India"  // Default name
    }
}, {
    freezeTableName: true, // its freeze table name same as schema name, if its false ( default ) then it will add S in last like- Users
    timestamps: true, // If its true then it will create createdAt and updatedAt column
    createdAt: "createdBy", // rename default createdAt column name
    updatedAt: "updatedBy", // rename default updatedAt column name
    paranoid: true, // it will create deletedAt column which will update on destory for soft delete 
    schema: 'mySchema', // define schema name for tables
    
    // If you want to give a custom name to the deletedAt column
    deletedAt: 'destroyTime',

    // define index -> its should be array and accept multiple key
    indexes: [{
        // index name
        name: "pk_id",
        unique: true,
        // feild name for which this key need to set
        fields: ['user_id', 'email']

    }]

    // modelName: 'User', // We need to choose the model name

})

// sync -> its sync any changes in exiting/new tables
/*
User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
User.sync({ force: true }) - This creates the table, dropping it first if it already existed
User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
*/
await userSeqModel.sync({ alter: true });

export { userSeqModel };