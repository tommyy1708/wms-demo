import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="privacy-policy">
      <h1>Privacy Policy</h1>
      <p>
        <strong>Last Updated:</strong> {process.env.REACT_APP_LAST_UPDATED}
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        <strong>Personal Information:</strong> We may collect personal
        information that you provide directly to us, such as your
        name, email address, and phone number when you create an
        account or contact us.
      </p>
      <p>
        <strong>Usage Data:</strong> We collect information about your
        interactions with the Website, including the pages you visit,
        the time spent on those pages, and other statistics.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Provide and maintain our services.</li>
        <li>
          Communicate with you regarding your account, transactions,
          and customer support inquiries.
        </li>
        <li>Improve our Website and services.</li>
        <li>Comply with legal obligations.</li>
      </ul>

      <h2>3. Sharing Your Information</h2>
      <p>
        We do not sell or rent your personal information to third
        parties. We may share your information with:
      </p>
      <ul>
        <li>
          <strong>Service Providers:</strong> Third-party vendors who
          perform services on our behalf.
        </li>
        <li>
          <strong>Legal Requirements:</strong> If required by law, we
          may disclose your information to comply with legal
          obligations or protect our rights.
        </li>
      </ul>

      <h2>4. Cookies</h2>
      <p>
        We use cookies and similar tracking technologies to enhance
        your experience on our Website. You can control the use of
        cookies through your browser settings.
      </p>

      <h2>5. Data Security</h2>
      <p>
        We take reasonable measures to protect your personal
        information from unauthorized access, use, or disclosure.
        However, no method of transmission over the Internet is
        completely secure.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        You have the right to access, update, or delete your personal
        information. To exercise these rights, please contact us at{' '}
        <span>{process.env.REACT_APP_EMAIL}</span>
      </p>

      <h2>7. Changes to this Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any
        changes will be effective immediately upon posting on the
        Website.
      </p>

      <h2>8. Contact Information</h2>
      <p>
        If you have any questions about this Privacy Policy, please
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
        Email:{' '}
         <span>{process.env.REACT_APP_EMAIL}</span>
      </address>
    </div>
  );
}

export default PrivacyPolicy;
