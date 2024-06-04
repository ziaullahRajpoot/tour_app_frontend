import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure you have Bootstrap CSS imported
import './HelpSupport.css';

const HelpSupport = () => {
  return (
    <div className="help-support-container">
      <div className="help-support col-12 col-md-8">
        <h1>Help & Support</h1>
        <p>Welcome to the Help & Support page. We're here to assist you with any issues or questions you might have about our tour guide services.</p>

        <section>
          <h2>Contact Us</h2>
          <p>If you need immediate assistance, please contact us through one of the following methods:</p>
          <ul>
            <li>Email: <a href="mailto:support@travelglobe.com">support@travelglobe.com</a></li>
            <li>Phone: +1-800-123-4567</li>
            <li>Address: 123 Travel St, Globe City, GC 12345</li>
          </ul>
        </section>

        <section>
          <h2>Frequently Asked Questions</h2>
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h3 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  How do I book a tour guide?
                </button>
              </h3>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  To book a tour guide, navigate to the tour guides section, select your desired guide, and follow the booking process.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  What payment methods do you accept?
                </button>
              </h3>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  We accept credit cards, PayPal, and other major payment methods.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Can I cancel a booking?
                </button>
              </h3>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Yes, you can cancel a booking up to 24 hours before the scheduled time. For more details, please refer to our cancellation policy.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header" id="headingFour">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  What should I do if I have an issue with my tour guide?
                </button>
              </h3>
              <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  If you encounter any issues with your tour guide, please contact our support team immediately, and we will assist you in resolving the issue.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Submit a Request</h2>
          <p>If you have a specific issue or request that is not covered in the FAQ, please fill out the form below, and our support team will get back to you as soon as possible.</p>
          <form className="support-form col-12 ">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="issue">Issue:</label>
            <textarea id="issue" name="issue" rows="4" required></textarea>

            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default HelpSupport;
