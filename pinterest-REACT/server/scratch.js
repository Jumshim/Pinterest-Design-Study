db.get(`SELECT password FROM users WHERE email = ?;`, 'hello@gmail.com', (err, user) => {
    console.log(`Error is: ${err}`);
    console.log(`Password is: `);
    console.log(user.password);
});


let userPassword = "$2a$13$lFO.0HZoxRAWaWtEUz/H0uMs7AORns78yVc/YcVIjSwocV76VCa3O";
let password = "password";

bcrypt.compare(password, userPassword, (error, response) => {
    if(response) {
      console.log('Password is equal');
    } else {
      console.log('Password is wrong');
    }
  });
