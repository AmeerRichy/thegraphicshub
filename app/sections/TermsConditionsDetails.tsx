'use client';

export default function TermsConditionsDetails() {
  return (
    <section className="terms">
      <div className="container">

        {/* 1 */}
        <div className="section">
          <h3>1. Introduction</h3>
          <p>
            These Terms &amp; Conditions govern the use of services provided by <strong>Graphics Hub</strong>.
            By engaging with our services, you agree to comply with these terms.
          </p>
        </div>

        {/* 2 */}
        <div className="section">
          <h3>2. Services Provided</h3>
          <p>
            We offer a variety of design services, including but not limited to branding, logo design,
            UI/UX, character design, 3D designs, video production, social media content, &amp;
            AI-generated designs.
          </p>
        </div>

        {/* 3 */}
        <div className="section">
          <h3>3. Service Agreement</h3>
          <p>
            Before beginning any project, a service agreement outlining the scope of work, project timeline,
            &amp; payment terms will be provided. Both parties must sign the agreement for the project to begin.
          </p>
        </div>

        {/* 4 */}
        <div className="section">
          <h3>4. Payment Terms</h3>
          <ul>
            <li>A <strong>50% upfront deposit</strong> is required before work begins on all projects.</li>
            <li><strong>25% payment</strong> is due upon delivery of the first draft.</li>
            <li>The remaining <strong>25%</strong> is due before the final delivery of the completed project.</li>
            <li>
              For <strong>international payments</strong>, we accept payments via <strong>Xoom</strong>,{' '}
              <strong>Western Union</strong>, &amp; other similar services.
            </li>
            <li>
              For <strong>domestic payments</strong>, we accept <strong>direct bank transfer</strong>,{' '}
              <strong>JazzCash</strong>, <strong>Digit+</strong>, &amp; other local methods.
            </li>
            <li>
              If payment is delayed, Graphics Hub reserves the right to pause or terminate the project
              until payment is received.
            </li>
          </ul>
        </div>

        {/* 5 */}
        <div className="section">
          <h3>5. Revisions &amp; Deliverables</h3>
          <ul>
            <li>
              The number of revisions included is dependent on the service package selected. Additional
              revisions will be subject to extra charges.
            </li>
            <li>Final deliverables will be provided in the formats agreed upon in the service agreement.</li>
            <li>
              Graphics Hub is not responsible for any revisions requested after final approval of the project.
            </li>
          </ul>
        </div>

        {/* 6 */}
        <div className="section">
          <h3>6. Client Responsibilities</h3>
          <ul>
            <li>
              Clients must provide all necessary content (e.g., images, text, logos) in a timely manner to
              ensure the smooth progression of the project.
            </li>
            <li>
              Clients are responsible for ensuring that all materials provided do not infringe on any
              copyrights &amp; comply with applicable laws.
            </li>
            <li>
              Clients are responsible for the accuracy of all information provided for the project.
            </li>
          </ul>
        </div>

        {/* 7 */}
        <div className="section">
          <h3>7. Copyright &amp; Ownership</h3>
          <ul>
            <li>
              Upon full payment, the client will have ownership of the final design &amp; materials created.
            </li>
            <li>
              Graphics Hub retains the right to showcase completed projects in our portfolio, unless explicitly
              requested not to by the client.
            </li>
          </ul>
        </div>

        {/* 8 */}
        <div className="section">
          <h3>8. Confidentiality</h3>
          <p>
            Graphics Hub is committed to maintaining the confidentiality of any private or sensitive
            information shared during the course of the project. We will not disclose any confidential
            details to third parties without client consent, except where required by law.
          </p>
        </div>

        {/* 9 */}
        <div className="section">
          <h3>9. Liability &amp; Limitations</h3>
          <ul>
            <li>
              While we strive to deliver high-quality work, Graphics Hub is not liable for any indirect,
              incidental, or consequential damages arising from the use of our services.
            </li>
            <li>
              Graphics Hub is not responsible for website downtime, errors, or issues caused by third-party
              providers, hosting, or client modifications after project completion.
            </li>
          </ul>
        </div>

        {/* 10 */}
        <div className="section">
          <h3>10. Termination of Services</h3>
          <ul>
            <li>
              Either party may terminate the project with written notice. In the event of termination, the
              client will be invoiced for work completed up to that point.
            </li>
            <li>If a project is canceled after work has begun, no refund will be provided for the deposit.</li>
          </ul>
        </div>

        {/* 11 */}
        <div className="section">
          <h3>11. Amendments</h3>
          <p>
            Graphics Hub reserves the right to amend or update these Terms &amp; Conditions at any time.
            Clients will be notified of any changes, &amp; continued use of our services will indicate
            acceptance of the updated terms.
          </p>
        </div>

        {/* 12 */}
        <div className="section">
          <h3>12. Dispute Resolution</h3>
          <p>
            As we provide digital services worldwide, any disputes arising from the use of our services will
            be resolved through negotiation. If a resolution cannot be reached amicably, the dispute will be
            subject to the laws of a mutually agreed jurisdiction.
          </p>
        </div>

        {/* 13 */}
        <div className="section">
          <h3>13. Contact Information</h3>
          <p>For questions or concerns, contact us at:</p>
          <div className="contact">
            <p><strong>Graphics Hub</strong></p>
            <p>Email: <a href="mailto:info@thegraphicshub.org">info@thegraphicshub.org</a></p>
            <p>Phone: <a href="tel:+923255855580">+92 325 5855580</a></p>
          </div>
        </div>

      </div>

      <style jsx>{`
        .terms {
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

        ul { list-style: disc; margin: 0 0 10px 24px; padding: 0; }
        ul li { margin: 6px 0; color: rgba(255,255,255,.78); }
        ul li::marker { color: rgba(255,255,255,.65); }

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
