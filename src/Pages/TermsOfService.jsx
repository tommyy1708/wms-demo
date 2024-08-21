import React from 'react';

function TermsOfService() {
  return (
    <div className="terms-of-service">
      <h1>Terms of Service</h1>
      <p>
        <strong>Last Updated:</strong> January 1, 2024
      </p>

      <h2>1. Use of Services</h2>
      <p>
        You must be at least 18 years old to use our services. By
        using our Website, you warrant that you have the legal
        capacity to enter into this agreement.
      </p>

      <h2>2. Account Registration</h2>
      <p>
        To use certain features of our services, you may need to
        register for an account. You agree to provide accurate and
        complete information during registration and to update this
        information as necessary.
      </p>

      <h2>3. Intellectual Property</h2>
      <p>
        All content provided on the Website, including text, graphics,
        logos, and images, is the property of{' '}
        <strong>{process.env.REACT_APP_COMPANY_NAME}</strong> or its content suppliers
        and is protected by U.S. and international copyright laws.
      </p>

      <h2>4. Prohibited Conduct</h2>
      <p>
        You agree not to use the Website for any unlawful purpose or
        to engage in any conduct that interferes with the operation of
        the Website or infringes the rights of others.
      </p>

      <h2>5. Termination</h2>
      <p>
        We may terminate or suspend your access to the Website without
        prior notice or liability for any reason, including violation
        of these Terms of Service.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law,{' '}
        <strong>Hair Natural Inc.</strong> shall not be liable for any
        indirect, incidental, special, consequential, or punitive
        damages arising from your use of the Website.
      </p>

      <h2>7. Changes to the Terms of Service</h2>
      <p>
        We reserve the right to modify these Terms of Service at any
        time. Any changes will be effective immediately upon posting
        on the Website.
      </p>

      <h2>8. Governing Law</h2>
      <p>
        These Terms of Service shall be governed by and construed in
        accordance with the laws of the State of Florida, United
        States.
      </p>

      <h2>9. Contact Information</h2>
      <p>
        If you have any questions about these Terms of Service, please
        contact us at:
      </p>
      <address>
        {process.env.REACT_APP_COMPANY_NAME}
        <br />
        {process.env.REACT_APP_COMPANY_ADDRESS1}
        <br />
        {process.env.REACT_APP_COMPANY_ADDRESS2}
        <br />
        Phone: {process.env.REACT_APP_COMPANY_PHONE}
        <br />
        Email:{' '}<span>{process.env.REACT_APP_EMAIL}</span>
      </address>
    </div>
  );
}

export default TermsOfService;
