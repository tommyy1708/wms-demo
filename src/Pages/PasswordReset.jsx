import React from 'react';

const PasswordReset = () => {

  

  return (
    <div>
      <form action="/api/password-reset" method="POST">
        <input type="hidden" name="token" value="{{token}}" />
        <label for="newPassword">New Password:</label>
        <input type="password" id="newPassword" name="newPassword" required />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default PasswordReset;
