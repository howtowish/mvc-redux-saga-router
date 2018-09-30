var jwt = require('jsonwebtoken');

function generateToken(user) {
  //Dont use password and other sensitive fields
  //Use fields that are useful in other parts of the app/collections/models
  var u = {
    username: user.username,
    fullname: user.fullname,
    roles: user.roles,
    _id: user._id.toString(),
    email: user.email,
    phone: user.phone //used to prevent creating posts w/o verifying emails
  };

  return token = jwt.sign(u, "Bearer ", {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}

// function validateSignUpForm(values, callback) {
//   var errors = {};
//   var hasErrors = false;

//   if (!values.name || values.name.trim() === '') {
//     errors.name = 'Enter a name';
//     hasErrors = true;
//   }
//   if (!values.username || values.username.trim() === '') {
//     errors.username = 'Enter username';
//     hasErrors = true;
//   }
//   if (!values.email || values.email.trim() === '') {
//     errors.email = 'Enter email';
//     hasErrors = true;
//   }
//   if (!values.password || values.password.trim() === '') {
//     errors.password = 'Enter password';
//     hasErrors = true;
//   }
//   if (!values.confirmPassword || values.confirmPassword.trim() === '') {
//     errors.confirmPassword = 'Enter Confirm Password';
//     hasErrors = true;
//   }

//   if (values.confirmPassword && values.confirmPassword.trim() !== '' && values.password && values.password.trim() !== '' && values.password !== values.confirmPassword) {
//     errors.password = 'Password And Confirm Password don\'t match';
//     errors.password = 'Password And Confirm Password don\'t match';
//     hasErrors = true;
//   }

//   if (callback) {
//     callback(hasErrors && errors);
//   } else {
//     return hasErrors && errors;
//   }
// }

// //strips internal fields like password and verifyEmailToken etc
function getCleanUser(user) {
  if(!user) return {};

  var u = user.toJSON();
  if(u.roles==1){
    u.roles={
      rolesId:1,
      rolesName:"admin"
    }
  }
  else if(u.roles==2){
      u.roles={
        rolesId:2,
        rolesName:"user"
      }
  }
  else if(u.roles==3){
      u.roles={
        rolesId:3,
        rolesName:"subuser"
      }
  }
  else{
    u.roles= u.roles;
  }
  return {
    _id: u._id,
    fullname: u.fullname,
    username: u.usrname,
    email: u.email,
    roles: u.roles,
    createdAt: u.createdAt,
    phone: u.phone,
    email: u.email,
  }
}

module.exports = {
//   validateSignUpForm: validateSignUpForm,
   getCleanUser: getCleanUser,
  generateToken: generateToken
}