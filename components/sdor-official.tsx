'use client';

import { useState } from 'react';

interface SDORFormData {
  // Header Info
  afpNumber: string;
  dvrCustomer: string;
  ssn: string;
  crpContractor: string;
  crpRepresentativeName: string;
  dvrCounselor: string;
  totalCost: string;

  // CRP Service Category
  crpServiceCategory: string[];

  // Timelines
  timelineFromDate: string;
  timelineToDate: string;
  reportingPeriodFromDate: string;
  reportingPeriodToDate: string;

  // Pre-Employment Transition Services
  preEtsServices: string[];
  preEtsWorkBasedLearning: string[];
  preEtsWorkplaceReadiness: string[];

  // Type of Report
  reportType: string[];

  // Level of Service
  levelOfService: string[];

  // Type of CRP Service Bonus Payments
  bonusPayments: string[];

  // Report Section
  teportNotes: string;

  // Signature
  crpRepSignature: string;
  signatureDate: string;
}

export default function SDOROfficial() {
  const [formData, setFormData] = useState<SDORFormData>({
    afpNumber: '',
    dvrCustomer: '',
    ssn: '',
    crpContractor: '',
    crpRepresentativeName: '',
    dvrCounselor: '',
    totalCost: '',
    crpServiceCategory: [],
    timelineFromDate: '',
    timelineToDate: '',
    reportingPeriodFromDate: '',
    reportingPeriodToDate: '',
    preEtsServices: [],
    preEtsWorkBasedLearning: [],
    preEtsWorkplaceReadiness: [],
    reportType: [],
    levelOfService: [],
    bonusPayments: [],
    reportNotes: '',
    crpRepSignature: '',
    signatureDate: '',
  });

  const crpServiceCategories = [
    'Trial Work Experience',
    'Community Based Assessment',
    'Job Shadow',
    'Informational Interview',
    'Discovery Services',
    'Customized Job Placement Services',
    'Job Placement Services',
    'Intensive Training Services',
    'Job Retention Services',
    'Youth Extended Services',
    'Off-Site Psycho-Social – NON-SE',
    'Off-Site Psycho-Social – SE',
  ];

  const preEtsServiceOptions = [
    'Pre-ETS: Informational Interview',
    'Pre-ETS: Job Shadow',
  ];

  const preEtsWorkBasedOptions = ['A', 'B', 'C'];
  const preEtsWorkplaceOptions = ['A', 'B', 'C'];

  const reportTypeOptions = [
    'Intake Report',
    'Outcome Report',
    'Job Placement Activity Report',
    'Monthly Update',
    'Discovery Activity Report',
    'DDCS DVR Intensive Job Placement Quarterly Update',
  ];

  const levelOfServiceOptions = ['Level 1', 'Level 2', 'Level 3', 'Level 4'];

  const bonusPaymentOptions = [
    'Permanent Employment Bonus',
    'Healthcare Coverage Bonus',
    'High Wage Bonus – Non-Supported Employment',
    'High Wage Bonus – Supported Employment',
    'Rapid Placement Bonus',
    'Rural Area Bonus – Customer Location',
    'Rural Area Bonus – Employer Location',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (
    category: keyof SDORFormData,
    value: string
  ) => {
    setFormData((prev) => {
      const currentArray = Array.isArray(prev[category])
        ? (prev[category] as string[])
        : [];
      const updated = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];
      return {
        ...prev,
        [category]: updated,
      };
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setFormData({
      afpNumber: '',
      dvrCustomer: '',
      ssn: '',
      crpContractor: '',
      crpRepresentativeName: '',
      dvrCounselor: '',
      totalCost: '',
      crpServiceCategory: [],
      timelineFromDate: '',
      timelineToDate: '',
      reportingPeriodFromDate: '',
      reportingPeriodToDate: '',
      preEtsServices: [],
      preEtsWorkBasedLearning: [],
      preEtsWorkplaceReadiness: [],
      reportType: [],
      levelOfService: [],
      bonusPayments: [],
      reportNotes: '',
      crpRepSignature: '',
      signatureDate: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white">
      <style>{`
        @media print {
          body { margin: 0; padding: 0; }
          .no-print { display: none; }
          .form-container { box-shadow: none; }
        }
      `}</style>

      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="text-2xl font-bold mr-4">DSHS</div>
          <div className="text-sm text-gray-600">
            <div>Division of Vocational Rehabilitation</div>
            <div>Community Rehabilitation Program (CRP)</div>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">
          SDOR: Service Delivery Outcome Report
        </h1>
        <p className="text-sm text-gray-600">DSHS 11-030 (Rev. 02/2026)</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* AFP Number Box - Top Right */}
        <div className="flex justify-end mb-6">
          <div className="border-2 border-gray-400 p-4 w-48">
            <label className="block text-sm font-bold mb-2">AFP Number</label>
            <input
              type="text"
              name="afpNumber"
              value={formData.afpNumber}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-4 border border-gray-400">
          {/* Left Column */}
          <div className="border-r border-gray-400 p-4 space-y-4">
            {/* DVR Customer */}
            <div className="border-b border-gray-300 pb-4">
              <label className="block text-sm font-bold mb-2">
                DVR Customer
              </label>
              <input
                type="text"
                name="dvrCustomer"
                value={formData.dvrCustomer}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 text-sm"
              />
            </div>

            {/* CRP Contractor */}
            <div className="border-b border-gray-300 pb-4">
              <label className="block text-sm font-bold mb-2">
                CRP Contractor
              </label>
              <input
                type="text"
                name="crpContractor"
                value={formData.crpContractor}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 text-sm"
              />
            </div>

            {/* DVR Counselor */}
            <div>
              <label className="block text-sm font-bold mb-2">
                DVR Counselor
              </label>
              <input
                type="text"
                name="dvrCounselor"
                value={formData.dvrCounselor}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 text-sm"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="p-4 space-y-4">
            {/* SSN */}
            <div className="border-b border-gray-300 pb-4">
              <label className="block text-sm font-bold mb-2">
                Social Security Number (last four digits)
              </label>
              <input
                type="text"
                name="ssn"
                value={formData.ssn}
                onChange={handleInputChange}
                placeholder="XXX-XX-"
                maxLength={4}
                className="w-full border border-gray-300 p-2 text-sm"
              />
            </div>

            {/* CRP Representative Name */}
            <div className="border-b border-gray-300 pb-4">
              <label className="block text-sm font-bold mb-2">
                CRP Representative's Name
              </label>
              <input
                type="text"
                name="crpRepresentativeName"
                value={formData.crpRepresentativeName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 text-sm"
              />
            </div>

            {/* Total Cost */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Total Cost
              </label>
              <div className="flex items-center">
                <span className="mr-2">$</span>
                <input
                  type="text"
                  name="totalCost"
                  value={formData.totalCost}
                  onChange={handleInputChange}
                  className="flex-1 border border-gray-300 p-2 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CRP Service Category */}
        <div className="border border-gray-400 p-4">
          <h3 className="font-bold mb-4">CRP Service Category</h3>
          <div className="grid grid-cols-2 gap-4">
            {crpServiceCategories.map((category) => (
              <label key={category} className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={formData.crpServiceCategory.includes(category)}
                  onChange={() =>
                    handleCheckboxChange('crpServiceCategory', category)
                  }
                  className="mr-2 w-4 h-4"
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Timelines */}
        <div className="border border-gray-400 p-4">
          <h3 className="font-bold mb-4">Timelines (overall SDOP)</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-bold mb-2">From:</label>
              <input
                type="date"
                name="timelineFromDate"
                value={formData.timelineFromDate}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">To:</label>
              <input
                type="date"
                name="timelineToDate"
                value={formData.timelineToDate}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 text-sm"
              />
            </div>
          </div>

          <h3 className="font-bold mb-4">Dates of this Reporting Period:</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">From:</label>
              <input
                type="date"
                name="reportingPeriodFromDate"
                value={formData.reportingPeriodFromDate}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">To:</label>
              <input
                type="date"
                name="reportingPeriodToDate"
                value={formData.reportingPeriodToDate}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Pre-Employment Transition Services */}
        <div className="border border-gray-400 p-4">
          <h3 className="font-bold mb-4">
            Pre-Employment Transition Services CRP Service Category
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Pre-ETS Services:</h4>
              {preEtsServiceOptions.map((service) => (
                <label key={service} className="flex items-center text-sm mb-2">
                  <input
                    type="checkbox"
                    checked={formData.preEtsServices.includes(service)}
                    onChange={() =>
                      handleCheckboxChange('preEtsServices', service)
                    }
                    className="mr-2 w-4 h-4"
                  />
                  {service}
                </label>
              ))}
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">
                Pre-ETS: Work-Based Learning:
              </h4>
              <div className="flex gap-4 mb-4">
                {preEtsWorkBasedOptions.map((option) => (
                  <label key={option} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={formData.preEtsWorkBasedLearning.includes(
                        option
                      )}
                      onChange={() =>
                        handleCheckboxChange('preEtsWorkBasedLearning', option)
                      }
                      className="mr-2 w-4 h-4"
                    />
                    {option}
                  </label>
                ))}
              </div>

              <h4 className="font-semibold text-sm mb-2">
                Pre-ETS: Workplace Readiness Training:
              </h4>
              <div className="flex gap-4 mb-2">
                {preEtsWorkplaceOptions.map((option) => (
                  <label key={option} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={formData.preEtsWorkplaceReadiness.includes(
                        option
                      )}
                      onChange={() =>
                        handleCheckboxChange('preEtsWorkplaceReadiness', option)
                      }
                      className="mr-2 w-4 h-4"
                    />
                    {option}
                  </label>
                ))}
              </div>
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={formData.preEtsWorkplaceReadiness.includes('D')}
                  onChange={() =>
                    handleCheckboxChange('preEtsWorkplaceReadiness', 'D')
                  }
                  className="mr-2 w-4 h-4"
                />
                D – Stand Alone
              </label>
            </div>
          </div>
        </div>

        {/* Type of Report & Level of Service */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-400 p-4">
            <h3 className="font-bold mb-4">Type of Report</h3>
            <div className="space-y-2">
              {reportTypeOptions.map((type) => (
                <label key={type} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={formData.reportType.includes(type)}
                    onChange={() => handleCheckboxChange('reportType', type)}
                    className="mr-2 w-4 h-4"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div className="border border-gray-400 p-4">
            <h3 className="font-bold mb-4">Level of Service for:</h3>
            <div className="space-y-2">
              {levelOfServiceOptions.map((level) => (
                <label key={level} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={formData.levelOfService.includes(level)}
                    onChange={() =>
                      handleCheckboxChange('levelOfService', level)
                    }
                    className="mr-2 w-4 h-4"
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Type of CRP Service Bonus Payments */}
        <div className="border border-gray-400 p-4">
          <h3 className="font-bold mb-4">
            Type of CRP Service Bonus Payments (check all that apply)
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {bonusPaymentOptions.map((bonus) => (
              <label key={bonus} className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={formData.bonusPayments.includes(bonus)}
                  onChange={() => handleCheckboxChange('bonusPayments', bonus)}
                  className="mr-2 w-4 h-4"
                />
                {bonus}
              </label>
            ))}
          </div>
        </div>

        {/* Report Section */}
        <div className="border border-gray-400 p-4">
          <h3 className="font-bold mb-4">Report</h3>
          <textarea
            name="reportNotes"
            value={formData.reportNotes}
            onChange={handleInputChange}
            rows={8}
            className="w-full border border-gray-300 p-2 text-sm"
            placeholder="Enter report details here..."
          />
        </div>

        {/* Certification */}
        <div className="border border-gray-400 p-4 bg-gray-50 text-sm">
          <p className="mb-4">
            This document is only for reporting purposes. Invoices must be
            created in a separate document, signed and dated (per CRP/IL
            contract), and submitted with this Service Delivery Outcome Report.
          </p>
          <p>
            I certify (or declare) under penalty of perjury under the laws of
            the State of Washington that the foregoing is true and correct.
            (Revised Code of Washington {'’'}
            <a href="#" className="text-blue-600 underline">
              5.05.050
            </a>
            )
          </p>
        </div>

        {/* Signature Section */}
        <div className="grid grid-cols-2 gap-4 border border-gray-400">
          <div className="border-r border-gray-400 p-4">
            <label className="block text-sm font-bold mb-4">
              CRP REPRESENTATIVE'S SIGNATURE
            </label>
            <input
              type="text"
              name="crpRepSignature"
              value={formData.crpRepSignature}
              onChange={handleInputChange}
              className="w-full border-b-2 border-gray-400 p-2 text-sm"
            />
          </div>
          <div className="p-4">
            <label className="block text-sm font-bold mb-4">DATE</label>
            <input
              type="date"
              name="signatureDate"
              value={formData.signatureDate}
              onChange={handleInputChange}
              className="w-full border-b-2 border-gray-400 p-2 text-sm"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-600 border-t pt-4">
          <p>SDOR: Service Delivery Outcome Report</p>
          <p>DSHS 11-030 (Rev. 02/2026) Page 1 of 1</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center no-print pt-6">
          <button
            type="button"
            onClick={handlePrint}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold"
          >
            Download as PDF
          </button>
          <button
            type="reset"
            onClick={handleReset}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-semibold"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}