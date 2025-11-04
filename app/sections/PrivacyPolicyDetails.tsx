'use client';

export default function PrivacyPolicyDetails() {
  return (
    <section className="privacy">
      <div className="container">
        {/* 1 */}
        <div className="section">
          <h3>1. Introduction</h3>
          <p>
            At <strong>Graphics Hub</strong>, your privacy is a priority. This Privacy Policy outlines
            how we collect, use, &amp; protect your information when you visit our website, interact with
            our services, or <a href="/contact">contact us</a>. By accessing or using our website &amp;
            services, you agree to this policy.
          </p>
        </div>

        {/* 2 */}
        <div className="section">
          <h3>2. Information Collection</h3>
          <p>We may collect the following types of personal information:</p>
          <ul>
            <li>
              <strong>Contact information:</strong> Name, email address, phone number.
            </li>
            <li>
              <strong>Company details:</strong> Name, address, &amp; business type.
            </li>
            <li>
              <strong>Project details:</strong> Information regarding the projects you request.
            </li>
            <li>
              <strong>Payment information:</strong> Account or other payment details (if applicable).
            </li>
          </ul>
        </div>

        {/* 3 */}
        <div className="section">
          <h3>3. Information Use</h3>
          <p>We may use your personal information to:</p>
          <ul>
            <li>Provide &amp; deliver the design services you request.</li>
            <li>Communicate with you about your projects.</li>
            <li>Process payments.</li>
            <li>Improve our website &amp; services.</li>
            <li>Respond to your inquiries or requests.</li>
            <li>Personalize your experience on our website.</li>
            <li>Send updates, promotional offers, or newsletters (you can opt-out anytime).</li>
          </ul>
        </div>

        {/* 4 */}
        <div className="section">
          <h3>4. Information Sharing</h3>
          <p>
            We do not sell, trade, or rent your personal information. However, we may share your
            information with third-party service providers who assist us in delivering our services, such as:
          </p>
          <ul>
            <li>Payment processors</li>
            <li>Stock image providers</li>
            <li>Service providers assisting with operations (e.g., hosting, analytics)</li>
            <li>Legal authorities, if required by law or to protect our rights</li>
          </ul>
          <p className="muted">
            We require these third-party providers to maintain the confidentiality of your information &amp;
            use it only for the purposes specified by us.
          </p>
        </div>

        {/* 5 */}
        <div className="section">
          <h3>5. Data Security</h3>
          <p>
            We implement reasonable security measures to protect your personal information from
            unauthorized access, disclosure, alteration, or destruction. However, no method of
            transmission over the internet or electronic storage is 100% secure.
          </p>
        </div>

        {/* 6 */}
        <div className="section">
          <h3>6. Your Rights</h3>
          <p>You may have the following rights regarding your personal information:</p>
          <ul>
            <li>
              <strong>Access:</strong> Request access, update, or deletion of the personal information we hold about you.
            </li>
            <li>
              <strong>Correction:</strong> Request correction of inaccuracies in your personal information.
            </li>
            <li>
              <strong>Erasure:</strong> Request deletion of your personal information under certain circumstances.
            </li>
            <li>
              <strong>Restriction:</strong> Request restriction of processing under certain circumstances.
            </li>
            <li>
              <strong>Object:</strong> Object to processing of your personal information for certain purposes.
            </li>
            <li>
              <strong>Portability:</strong> Request your personal information in a structured, commonly used, &amp; machine-readable format.
            </li>
            <li>
              <strong>Clarification:</strong> Request clarification on how we handle your data.
            </li>
            <li>
              <strong>Other:</strong> Opt-out of marketing communications.
            </li>
          </ul>
          <p>
            To exercise these rights, please contact us at{' '}
            <a href="mailto:info@thegraphicshub.org">info@thegraphicshub.org</a>.
          </p>
        </div>

        {/* 7 */}
        <div className="section">
          <h3>7. Cookies &amp; Tracking Technologies</h3>
          <p>
            Our website uses cookies to enhance user experience &amp; analyze website traffic. By continuing
            to use our website, you consent to our cookie usage. You can manage cookie settings through your
            browser preferences.
          </p>
        </div>

        {/* 8 */}
        <div className="section">
          <h3>8. Third-Party Links</h3>
          <p>
            Our website may include links to third-party websites. We are not responsible for the privacy
            practices or content of these sites.
          </p>
        </div>

        {/* 9 */}
        <div className="section">
          <h3>9. Changes to this Privacy Policy</h3>
          <p>
            We may update this Privacy Policy periodically. The revised policy will be posted with an
            updated <strong>“Effective Date.”</strong>
          </p>
        </div>

        {/* 10 */}
        <div className="section">
          <h3>10. Contact Information</h3>
          <p>For questions or concerns about this Privacy Policy, contact us at:</p>
          <div className="contact">
            <p><strong>Graphics Hub</strong></p>
            <p>
              Email: <a href="mailto:info@thegraphicshub.org">info@thegraphicshub.org</a>
            </p>
            <p>
              Phone: <a href="tel:+923255855580">+92 325 5855580</a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .privacy {
          background: #000;
          padding: 60px 0 100px;
          color: rgba(255, 255, 255, 0.82);
        }
        .container {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 20px;
          font-family: 'Poppins', sans-serif;
          font-size: 16px;
          line-height: 1.7;
        }

        .section { margin-bottom: 36px; }

        h3 {
          color: #f0c64a;
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 10px;
          font-family: 'Playfair Display', serif;
        }

        p { margin: 0 0 10px; color: rgba(255,255,255,.78); }
        .muted { font-style: italic; opacity: .85; }

        ul { list-style: disc; margin: 0 0 10px 24px; padding: 0; }
        ul li { margin: 6px 0; color: rgba(255,255,255,.78); }
        ul li::marker { color: rgba(255,255,255,.65); } /* like your screenshot */

        strong { color: rgba(255,255,255,.96); }

        a {
          color: #f0c64a;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        a:hover { opacity: .9; }

        .contact p { margin: 2px 0; }

        @media (max-width: 768px) {
          .container { font-size: 15px; }
          h3 { font-size: 17px; }
        }
      `}</style>
    </section>
  );
}
