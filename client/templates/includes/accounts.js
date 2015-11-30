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
    }, {
        fieldName: 'terms',
        fieldLabel: 'I accept the terms and conditions',
        inputType: 'checkbox',
        visible: true,
        saveToProfile: false,
        validate: function(value, errorFunction) {
            if (value) {
                return true;
            } else {
                errorFunction('You must accept the terms and conditions.');
                return false;
            }
        }
    }],
	forceEmailLowercase: true,
	forceUsernameLowercase: true,
    forcePasswordLowercase: true,
});

