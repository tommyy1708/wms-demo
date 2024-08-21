import React from 'react';

function Support() {
  return (
    <div className="support-page">
      <h1>Customer Support</h1>
      <p>
        We are committed to providing exceptional customer support for
        all your needs. If you have any questions, concerns, or need
        assistance with our products or services, please don't
        hesitate to reach out to us.
      </p>

      <h2>How to Contact Us:</h2>
      <p>You can contact us through any of the following methods:</p>
      <address>
        <strong>Phone:</strong> {process.env.REACT_APP_COMPANY_PHONE}
        <br />
        <strong>Email:</strong>{' '}{process.env.REACT_APP_EMAIL}
        <br />
        <strong>Mail:</strong>
        <br />
        {process.env.REACT_APP_COMPANY_NAME}
        <br />
        {process.env.REACT_APP_COMPANY_ADDRESS1}
        <br />
        {process.env.REACT_APP_COMPANY_ADDRESS2}
      </address>

      <h2>Support Hours:</h2>
      <p>
        Our support team is available to assist you during the
        following hours:
      </p>
      <ul>
        <li>
          <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM (EST)
        </li>
        <li>
          <strong>Saturday:</strong> 10:00 AM - 4:00 PM (EST)
        </li>
        <li>
          <strong>Sunday:</strong> Closed
        </li>
      </ul>

      <h2>Common Support Topics:</h2>
      <p>We can assist you with the following topics:</p>
      <ul>
        <li>
          <strong>Account Management:</strong> Help with setting up or
          managing your account.
        </li>
        <li>
          <strong>Order Inquiries:</strong> Assistance with tracking
          your order, returns, or exchanges.
        </li>
        <li>
          <strong>Product Information:</strong> Details about our
          products and recommendations.
        </li>
        <li>
          <strong>Technical Support:</strong> Help with accessing or
          using our Website.
        </li>
      </ul>

      <p>
        We look forward to assisting you and ensuring you have a great
        experience with <strong>{process.env.REACT_APP_WEB_TITLE}</strong>.
      </p>
    </div>
  );
}

export default Support;
