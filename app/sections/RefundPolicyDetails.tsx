'use client';

export default function RefundPolicyDetails() {
  return (
    <section className="refund-policy">
      <div className="container">
        {/* 1. Introduction */}
        <div className="section">
          <h3>1. Introduction</h3>
          <p>
            At <strong>Graphics Hub</strong>, we are committed to providing high-quality design
            services. However, due to the nature of our work, the following refund policy applies:
          </p>
        </div>

        {/* 2. Refund Eligibility */}
        <div className="section">
          <h3>2. Refund Eligibility</h3>
          <ul>
            <li>
              <strong>Project Cancellation Before Work Begins:</strong> If you cancel the project before
              any work has started, you will receive a full refund of the deposit, minus any transaction
              fees incurred.
            </li>
            <li>
              <strong>Project Cancellation After Work Begins:</strong> Once work has started, the{' '}
              <strong>deposit is non-refundable.</strong> If you fail to provide feedback or updates for
              more than a week, we reserve the right to consider the project canceled with no refund
              issued.
            </li>
            <li>
              <strong>Non-Refundable After First Draft:</strong> Once the first draft is delivered,{' '}
              <strong>no refunds</strong> will be provided. If you change your mind after the first draft
              or decide not to proceed, no refund will be issued.
            </li>
            <li>
              <strong>Non-Refundable After Final Design Delivery:</strong> Once final files have been
              delivered, <strong>no refunds</strong> will be provided. Additionally, if the client changes
              their mind after the final design has been approved, no refund will be issued.
            </li>
            <li>
              <strong>Non-Refundable Services:</strong> Certain services, such as{' '}
              <strong>AI-generated designs</strong>, are non-refundable once the final version has been
              delivered. We ensure that drafts &amp; revisions meet your approval before finalizing the
              design.
            </li>
          </ul>
        </div>

        {/* 3. Process for Refund Requests */}
        <div className="section">
          <h3>3. Process for Refund Requests</h3>
          <p>
            To request a refund, you must contact us at{' '}
            <a href="mailto:info@thegraphicshub.org">info@thegraphicshub.org</a> within{' '}
            <strong>3 days</strong> from the cancellation or project completion date. All refund requests
            must be made in writing, detailing the reasons for the request.
          </p>
        </div>

        {/* 4. No Refunds on Completed Projects */}
        <div className="section">
          <h3>4. No Refunds on Completed Projects</h3>
          <ul>
            <li>
              Once the final deliverables have been approved &amp; delivered, <strong>no refunds</strong>{' '}
              will be issued. If you have approved the final designs or services, &amp; later decide to
              cancel, no refund will be granted.
            </li>
          </ul>
        </div>

        {/* 5. Chargebacks */}
        <div className="section">
          <h3>5. Chargebacks</h3>
          <p>
            We strongly encourage clients to contact us directly to resolve any issues before initiating
            a chargeback. If a chargeback is filed without prior communication, we reserve the right to
            suspend all services until the matter is resolved.
          </p>
        </div>

        {/* 6. Additional Terms */}
        <div className="section">
          <h3>6. Additional Terms</h3>
          <ul>
            <li>
              Refunds will be processed within <strong>30 days</strong> of approval.
            </li>
            <li>
              Refunds are issued using the same payment method used for the original transaction, unless
              otherwise agreed upon.
            </li>
          </ul>
        </div>

        {/* 7. Contact Information */}
        <div className="section">
          <h3>7. Contact Information</h3>
          <p>For questions or concerns about this Privacy Policy, contact us at:</p>
          <div className="contact">
            <p><strong>Graphics Hub</strong></p>
            <p>
              Email:{' '}
              <a href="mailto:info@thegraphicshub.org">info@thegraphicshub.org</a>
            </p>
            <p>
              Phone:{' '}
              <a href="tel:+923255855580">+92 325 5855580</a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .refund-policy {
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

        .section {
          margin-bottom: 36px;
        }

        h3 {
          color: #f0c64a;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 10px;
          font-family: 'Playfair Display', serif;
        }

        ul {
          list-style-type: disc;
          margin: 0 0 10px 24px;
          padding: 0;
        }

        ul li {
          margin-bottom: 8px;
          color: rgba(255, 255, 255, 0.78);
        }

        ul li::marker {
          color: #f0c64a;
        }

        p {
          color: rgba(255, 255, 255, 0.78);
          margin: 0 0 10px;
        }

        strong {
          color: rgba(255, 255, 255, 0.96);
        }

        a {
          color: #f0c64a;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        a:hover {
          opacity: 0.85;
        }

        .contact p {
          margin: 2px 0;
        }

        @media (max-width: 768px) {
          .container {
            font-size: 15px;
          }
          h3 {
            font-size: 17px;
          }
        }
      `}</style>
    </section>
  );
}
