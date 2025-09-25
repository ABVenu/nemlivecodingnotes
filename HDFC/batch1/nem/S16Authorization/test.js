import bcrypt from "bcrypt"
const saltRounds = 20;

const myPlaintextPassword = 'Alice123';
const someOtherPlaintextPassword = 'not_bacon';

bcrypt.genSalt(saltRounds, function(err, salt) {
    console.log("salt", salt)
    // bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
    //     // Store hash in your password DB.
    //     console.log("-------")
    //     console.log("raw password", myPlaintextPassword, "hashed password--->", hash)
    // });
});

/// encoding 

let encodedPassword = btoa(myPlaintextPassword)


// console.log("-------")
// console.log("raw password", myPlaintextPassword, "encoded password--->", encodedPassword)
