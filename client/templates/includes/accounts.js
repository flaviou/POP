Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'full_name',
        fieldLabel: 'Full name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please enter your name");
            return false;
          } else {
            return true;
          }
        }
    }],
    forceEmailLowercase: true,
    forceUsernameLowercase: true,
    forcePasswordLowercase: true,
});

