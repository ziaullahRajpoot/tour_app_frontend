import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BillingPayments.css';
import Select from 'react-select';
import { Tabs, Tab } from 'react-bootstrap';

const countries = [
  { value: 'AF', label: 'Afghanistan' },
  { value: 'AL', label: 'Albania' },
  { value: 'DZ', label: 'Algeria' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'AD', label: 'Andorra' },
  { value: 'AO', label: 'Angola' },
  { value: 'PK', label: 'Pakistan' },
  
  // Add more countries as needed
];

const BillingPayments = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    country: null,
    region: '',
    address: '',
    city: '',
    postalCode: '',
    vatNumber: '',
    receiveInvoices: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      country: selectedOption,
    });
  };

  const handleCheckboxChange = () => {
    setFormData({
      ...formData,
      receiveInvoices: !formData.receiveInvoices,
    });
  };

  const handleSubmit = () => {
    // Implement the submit logic
    console.log('Form submitted:', formData);
  };

  return (
    <div className="financial-dashboard">
      <div className="dashboard-content">
        <div className="billing-header m-4">
          <h2>Billing and Payments</h2>
        </div>
        <Tabs defaultActiveKey="history" className="custom-tabs">
          <Tab eventKey="history" title="Billing History">
            <div className="tab-content p-4">
              <h4>Billing History</h4>
              <div className="filters-bar mb-4">
                <div className="filter-group">
                  <button className="filter-btn">Date Range</button>
                  <button className="filter-btn">Document</button>
                  <button className="filter-btn">Currency</button>
                </div>
                <div className="search-bar">
                  <input type="text" placeholder="Search by invoice or order number" className="search-input" />
                </div>
                <button className="reset-btn">Reset</button>
              </div>
              <div className="table-container">
                <div className="table-header">
                  <div className="table-row">
                    <div className="table-cell">Invoice Number</div>
                    <div className="table-cell">Order Number</div>
                    <div className="table-cell">Date</div>
                    <div className="table-cell">Amount</div>
                    <div className="table-cell">Status</div>
                  </div>
                </div>
                <div className="table-body">
                  <div className="table-row">
                    <div className="table-cell">INV12345</div>
                    <div className="table-cell">ORD54321</div>
                    <div className="table-cell">01/01/2022</div>
                    <div className="table-cell">$100.00</div>
                    <div className="table-cell">Paid</div>
                  </div>
                  <div className="table-row">
                    <div className="table-cell">INV12346</div>
                    <div className="table-cell">ORD54322</div>
                    <div className="table-cell">02/01/2022</div>
                    <div className="table-cell">$200.00</div>
                    <div className="table-cell">Pending</div>
                  </div>
                  {/* Additional rows here */}
                </div>
              </div>
              <div className="pagination-controls">
                <button className="pagination-prev">Previous</button>
                <span className="pagination-info">1-50 of 1000</span>
                <button className="pagination-next">Next</button>
              </div>
            </div>
          </Tab>
          <Tab eventKey="information" title="Billing Information">
            <div className="tab-content p-4">
              <h4>Billing Information</h4>
              <div className="billing-info-package billing-info-package-full">
                <form className="billing-info-form">
                  <fieldset className="billing-info-w-full">
                    <div className="field full-name">
                      <label className="field-label flex flex-items-center">
                        <span className="text-body-1 field-title">Full name</span>
                      </label>
                      <div className="WvIqLXU eXfr7qm field-input">
                        <div className="+T1b6wH">
                          <input
                            className="GD3asS"
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <p className="info-text"></p>
                    </div>

                    <div className="field country-code">
                      <label className="field-label flex flex-items-center">
                        <span className="text-body-1 field-title">Country</span>
                      </label>
                      <div className="orca-combo-box-container country-selector field-selector css-2b097c-container">
                        <Select
                          className="react-select-container"
                          classNamePrefix="react-select"
                          value={formData.country}
                          onChange={handleSelectChange}
                          options={countries}
                          isClearable
                        />
                      </div>
                      <p className="info-text"></p>
                    </div>

                    <div className="field region">
                      <label className="field-label flex flex-items-center">
                        <span className="text-body-1 field-title">State/Region</span>
                      </label>
                      <div className="WvIqLXU eXfr7qm field-input">
                        <div className="+T1b6wH">
                          <input
                            className="GD3asS"
                            type="text"
                            name="region"
                            value={formData.region}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <p className="info-text"></p>
                    </div>

                    <div className="field street-address">
                      <label className="field-label flex flex-items-center">
                        <span className="text-body-1 field-title">Address</span>
                      </label>
                      <div className="WvIqLXU eXfr7qm field-input">
                        <div className="+T1b6wH">
                          <input
                            className="GD3asS"
                            type="text"
                            name="address"
                            placeholder="Street or POB"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <p className="info-text"></p>
                    </div>

                    <div className="field city">
                      <label className="field-label flex flex-items-center">
                        <span className="text-body-1 field-title">City</span>
                      </label>
                      <div className="WvIqLXU eXfr7qm field-input">
                        <div className="+T1b6wH">
                          <input
                            className="GD3asS"
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <p className="info-text"></p>
                    </div>

                    <div className="field zip-code">
                      <label className="field-label flex flex-items-center">
                        <span className="text-body-1 field-title">Postal code</span>
                      </label>
                      <div className="WvIqLXU eXfr7qm field-input">
                        <div className="+T1b6wH">
                          <input
                            className="GD3asS"
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <p className="info-text"></p>
                    </div>

                    <div className="tax-section">
                      <div className="field tax-id">
                        <label className="field-label flex flex-items-center">
                          <span className="text-body-1 field-title">VAT number</span>
                        </label>
                        <div className="WvIqLXU eXfr7qm field-input">
                          <div className="+T1b6wH">
                            <input
                              className="GD3asS"
                              type="text"
                              name="vatNumber"
                              value={formData.vatNumber}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <p className="info-text"></p>
                      </div>
                    </div>

                    <div className="field registered-for-invoice">
                      <label className="field-label flex flex-items-center">
                        <span className="text-body-1 field-title">Invoices</span>
                      </label>
                      <p>
                        You will find your invoices under the{' '}
                        <a
                          href="/billing/billing-history"
                          className="billing-history-link"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Billing history
                        </a>{' '}
                        tab.
                      </p>
                      <div className="m-t-16 checkbox-container">
                        <label className="-SSRhMt zsZmoTB cWwLjTL">
                          <input
                            type="checkbox"
                            name="receiveInvoices"
                            checked={formData.receiveInvoices}
                            onChange={handleCheckboxChange}
                          />
                          <span className="FO1WDvp">
                            <span
                              className="XQskgrQ L8UwSlD"
                              aria-hidden="true"
                              style={{ width: '10px', height: '10px' }}
                            >
                              <svg
                                width="11"
                                height="9"
                                viewBox="0 0 11 9"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M3.64489 8.10164L0.158292 4.61504C-0.0511769 4.40557 -0.0511769 4.06594 0.158292 3.85645L0.916858 3.09786C1.12633 2.88837 1.46598 2.88837 1.67545 3.09786L4.02419 5.44658L9.05493 0.41586C9.2644 0.206391 9.60405 0.206391 9.81352 0.41586L10.5721 1.17445C10.7816 1.38392 10.7816 1.72355 10.5721 1.93303L4.40348 8.10166C4.19399 8.31113 3.85436 8.31113 3.64489 8.10164V8.10164Z"></path>
                              </svg>
                            </span>
                          </span>
                        </label>
                        <p>I want to get invoices via email as well.</p>
                      </div>
                      <p className="info-text"></p>
                    </div>
                  </fieldset>
                </form>
                <div className="submit-section">
                  <button
                    className="FW1syM7 Af0hvld co-white submit-button bg-co-black"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="balances" title="Available Balances">
            <div className="tab-content p-4">
              <h4>Available Balances</h4>
              <div className="balances-info">
                <p><strong>Current Balance:</strong> $1,200.00</p>
                <p><strong>Available Credit:</strong> $5,000.00</p>
                <p><strong>Last Payment Date:</strong> 05/15/2023</p>
                <p><strong>Last Payment Amount:</strong> $500.00</p>
              </div>
            </div>
          </Tab>
          <Tab eventKey="methods" title="Payment Methods">
            <div className="tab-content p-4">
              <h4>Payment Methods</h4>
              <div className="payment-methods">
                <div className="method">
                  <p><strong>Credit Card:</strong> **** **** **** 1234</p>
                  <p><strong>Expiry Date:</strong> 12/24</p>
                  <p><strong>Cardholder Name:</strong> John Doe</p>
                </div>
                <div className="method">
                  <p><strong>Bank Account:</strong> **** **** **** 5678</p>
                  <p><strong>Bank Name:</strong> Business Bank</p>
                  <p><strong>Account Holder Name:</strong> Acme Corp</p>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default BillingPayments;
