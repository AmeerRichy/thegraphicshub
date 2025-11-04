'use client';

export default function PaymentPolicyDetails() {
  return (
    <section className="payment">
      <div className="container">
        {/* 1 */}
        <div className="section">
          <h3>1. Introduction</h3>
          <p>
            At <strong>Graphics Hub</strong>, we strive to maintain a transparent &amp; efficient payment
            process. By engaging our services, you agree to the following payment terms:
          </p>
        </div>

        {/* 2 */}
        <div className="section">
          <h3>2. Payment Structure</h3>
          <ul>
            <li>
              <strong>Upfront Deposit:</strong> A <strong>50% upfront deposit</strong> is required to
              begin any project. This ensures commitment from both parties.
            </li>
            <li>
              <strong>First Draft Payment:</strong> A <strong>25% payment</strong> is due upon delivery
              of the first draft.
            </li>
            <li>
              <strong>Final Payment:</strong> The remaining <strong>25% payment</strong> is due before
              the final files are delivered.
            </li>
          </ul>
        </div>

        {/* 3 */}
        <div className="section">
          <h3>3. Payment Methods</h3>
          <ul>
            <li>
              <strong>International Payments:</strong> We accept payments via <strong>Xoom</strong>,{' '}
              <strong>Western Union</strong>, &amp; other secure international payment platforms in{' '}
              <strong>USD</strong>.
            </li>
            <li>
              <strong>Domestic Payments:</strong> For local transactions, we accept{' '}
              <strong>direct bank transfers</strong>, <strong>JazzCash</strong>, <strong>Digit+</strong>, &
              other local payment methods in <strong>PKR</strong>.
            </li>
          </ul>
        </div>

        {/* 4 */}
        <div className="section">
          <h3>4. Late Payments</h3>
          <ul>
            <li>
              If payment is not received by the agreed-upon deadlines, a <strong>late fee</strong> may be
              applied at our discretion.
            </li>
            <li>
              Projects may be <strong>paused</strong> or <strong>delayed</strong> until full payment is
              received.
            </li>
          </ul>
        </div>

        {/* 5 */}
        <div className="section">
          <h3>5. Currency &amp; Payment Processing Fees</h3>
          <ul>
            <li>
              <strong>International payments</strong> will be processed in <strong>USD</strong>.
            </li>
            <li>
              <strong>Domestic payments</strong> will be processed in <strong>PKR</strong>.
            </li>
            <li>
              The client is responsible for any <strong>transaction fees</strong> incurred during the
              payment process.
            </li>
          </ul>
        </div>

        {/* 6 */}
        <div className="section">
          <h3>6. Refunds</h3>
          <p>
            Refunds are governed by our{' '}
            <a href="/refund-policy" target="_blank" rel="noopener noreferrer">
              Refund Policy
            </a>
            .
          </p>
        </div>

        {/* 7 */}
        <div className="section">
          <h3>7. Payment Confirmation</h3>
          <ul>
            <li>
              Once payment is received, we will send you a <strong>payment confirmation</strong>.
            </li>
            <li>
              For larger payments, we may request additional details to confirm the payment.
            </li>
          </ul>
        </div>

        {/* 8 */}
        <div className="section">
          <h3>8. Final Files Delivery</h3>
          <p>
            The final files &amp; deliverables will only be provided once <strong>full payment</strong> has
            been received.
          </p>
        </div>

        {/* 9 */}
        <div className="section">
          <h3>9. Contact Information</h3>
          <p>For questions or concerns about this Privacy Policy, contact us at:</p>
          <div className="contact">
            <p>
              <strong>Graphics Hub</strong>
            </p>
            <p>
              Email:{' '}
              <a href="mailto:info@thegraphicshub.org">info@thegraphicshub.org</a>
            </p>
            <p>
              Phone: <a href="tel:+923255855580">+92 325 5855580</a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .payment {
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
          margin: 0 0 10px;
          font-family: 'Playfair Display', serif;
        }

        ul {
          list-style: disc;
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
