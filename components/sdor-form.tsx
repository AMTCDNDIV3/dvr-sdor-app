'use client';

import { useState } from 'react';

interface SDORFormData {
  afpNumber: string;
  ssn: string;
  crpContractor: string;
  crpRepresentativeName: string;
  dvrCounselor: string;
  totalCost: string;
  serviceCategory: string[];
  serviceStartDate: string;
  serviceEndDate: string;
  clientName: string;
  clientDOB: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;
  employmentOutcome: string;
  employmentStatus: string;
  wageAtPlacement: string;
  hoursPerWeek: string;
  jobTitle: string;
  employerName: string;
  employerAddress: string;
  employerPhone: string;
  notes: string;
}

export default function SDORForm() {
  const [formData, setFormData] = useState<SDORFormData>({
    afpNumber: '',
    ssn: '',
    crpContractor: '',
    crpRepresentativeName: '',
    dvrCounselor: '',
    totalCost: '$0.00',
    serviceCategory: [],
    serviceStartDate: '',
    serviceEndDate: '',
    clientName: '',
    clientDOB: '',
    clientAddress: '',
    clientPhone: '',
    clientEmail: '',
    employmentOutcome: '',
    employmentStatus: '',
    wageAtPlacement: '',
    hoursPerWeek: '',
    jobTitle: '',
    employerName: '',
    employerAddress: '',
    employerPhone: '',
    notes: '',
  });

  const serviceCategories = [
    'Trial Work Experience',
    'Discovery Services',
    'Job Placement Services',
    'Job Retention Services',
    'Off-Site Psycho-Social - NON-SE',
    'Community Based Assessment',
    'Customized Job Placement Services',
    'Intensive Training Services',
    'Youth Extended Services',
    'Off-Site Psycho-Social - SE',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      serviceCategory: prev.serviceCategory.includes(category)
        ? prev.serviceCategory.filter(c => c !== category)
        : [...prev.serviceCategory, category],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    alert('Form submitted successfully!');
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const buttonClass = "px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const outlineButtonClass = "px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">SDOR Addendum Form for Cascadia Deaf Nation</h1>
          <p className="text-center text-gray-600 mb-1">Washington State Division of Vocational Rehabilitation</p>
          <p className="text-center text-gray-500 text-sm">DSHS 11-030 (REV. 07/2025)</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="afpNumber" className={labelClass}>AFP Number *</label>
                <input
                  id="afpNumber"
                  name="afpNumber"
                  type="text"
                  value={formData.afpNumber}
                  onChange={handleInputChange}
                  placeholder="Enter AFP Number"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="ssn" className={labelClass}>SSN (Last 4 Digits) *</label>
                <input
                  id="ssn"
                  name="ssn"
                  type="text"
                  value={formData.ssn}
                  onChange={handleInputChange}
                  placeholder="XXXX"
                  maxLength={4}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="crpContractor" className={labelClass}>CRP Contractor *</label>
                <input
                  id="crpContractor"
                  name="crpContractor"
                  type="text"
                  value={formData.crpContractor}
                  onChange={handleInputChange}
                  placeholder="Enter CRP Contractor"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="crpRepresentativeName" className={labelClass}>CRP Representative Name *</label>
                <input
                  id="crpRepresentativeName"
                  name="crpRepresentativeName"
                  type="text"
                  value={formData.crpRepresentativeName}
                  onChange={handleInputChange}
                  placeholder="Enter Name"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="dvrCounselor" className={labelClass}>DVR Counselor *</label>
                <input
                  id="dvrCounselor"
                  name="dvrCounselor"
                  type="text"
                  value={formData.dvrCounselor}
                  onChange={handleInputChange}
                  placeholder="Enter DVR Counselor"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="totalCost" className={labelClass}>Total Cost *</label>
                <input
                  id="totalCost"
                  name="totalCost"
                  type="text"
                  value={formData.totalCost}
                  onChange={handleInputChange}
                  placeholder="$0.00"
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* CRP Service Category Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">CRP Service Category *</h2>
            <div className="grid grid-cols-2 gap-4">
              {serviceCategories.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <input
                    id={category}
                    type="checkbox"
                    name="serviceCategory"
                    value={category}
                    checked={formData.serviceCategory.includes(category))}
                    onChange={() => handleCheckboxChange(category))}
                    className="w-4 h-4"
                  />
                  <label htmlFor={category} className="text-sm cursor-pointer">{category}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Timelines Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">Timelines *</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="serviceStartDate" className={labelClass}>Service Start Date *</label>
                <input
                  id="serviceStartDate"
                  name="serviceStartDate"
                  type="date"
                  value={formData.serviceStartDate}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="serviceEndDate" className={labelClass}>Service End Date *</label>
                <input
                  id="serviceEndDate"
                  name="serviceEndDate"
                  type="date"
                  value={formData.serviceEndDate}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* Client Information Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">Client Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="clientName" className={labelClass}>Client Name *</label>
                <input
                  id="clientName"
                  name="clientName"
                  type="text"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  placeholder="Enter Client Name"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="clientDOB" className={labelClass}>Date of Birth *</label>
                <input
                  id="clientDOB"
                  name="clientDOB"
                  type="date"
                  value={formData.clientDOB}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="clientAddress" className={labelClass}>Address *</label>
                <input
                  id="clientAddress"
                  name="clientAddress"
                  type="text"
                  value={formData.clientAddress}
                  onChange={handleInputChange}
                  placeholder="Enter Address"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="clientPhone" className={labelClass}>Phone *</label>
                <input
                  id="clientPhone"
                  name="clientPhone"
                  type="text"
                  value={formData.clientPhone}
                  onChange={handleInputChange}
                  placeholder="Enter Phone"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="clientEmail" className={labelClass}>Email *</label>
                <input
                  id="clientEmail"
                  name="clientEmail"
                  type="email"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* Employment Outcome Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">Employment Outcome</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="employmentOutcome" className={labelClass}>Employment Outcome *</label>
                <input
                  id="employmentOutcome"
                  name="employmentOutcome"
                  type="text"
                  value={formData.employmentOutcome}
                  onChange={handleInputChange}
                  placeholder="Enter Employment Outcome"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="employmentStatus" className={labelClass}>Employment Status *</label>
                <input
                  id="employmentStatus"
                  name="employmentStatus"
                  type="text"
                  value={formData.employmentStatus}
                  onChange={handleInputChange}
                  placeholder="Enter Employment Status"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="wageAtPlacement" className={labelClass}>Wage at Placement *</label>
                <input
                  id="wageAtPlacement"
                  name="wageAtPlacement"
                  type="text"
                  value={formData.wageAtPlacement}
                  onChange={handleInputChange}
                  placeholder="Enter Wage"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="hoursPerWeek" className={labelClass}>Hours Per Week *</label>
                <input
                  id="hoursPerWeek"
                  name="hoursPerWeek"
                  type="number"
                  value={formData.hoursPerWeek}
                  onChange={handleInputChange}
                  placeholder="Enter Hours"
                  className={inputClass}
                  required
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="jobTitle" className={labelClass}>Job Title *</label>
                <input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="Enter Job Title"
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* Employer Information Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">Employer Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label htmlFor="employerName" className={labelClass}>Employer Name *</label>
                <input
                  id="employerName"
                  name="employerName"
                  type="text"
                  value={formData.employerName}
                  onChange={handleInputChange}
                  placeholder="Enter Employer Name"
                  className={inputClass}
                  required
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="employerAddress" className={labelClass}>Employer Address *</label>
                <input
                  id="employerAddress"
                  name="employerAddress"
                  type="text"
                  value={formData.employerAddress}
                  onChange={handleInputChange}
                  placeholder="Enter Employer Address"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="employerPhone" className={labelClass}>Employer Phone *</label>
                <input
                  id="employerPhone"
                  name="employerPhone"
                  type="text"
                  value={formData.employerPhone}
                  onChange={handleInputChange}
                  placeholder="Enter Employer Phone"
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">Additional Notes</h2>
            <label htmlFor="notes" className={labelClass}>Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Enter any additional notes"
              rows={4}
              className={inputClass}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center pt-6">
            <button
              type="button"
              onClick={handlePrint}
              className={buttonClass}
            >
              Download as PDF
            </button>
            <button
              type="reset"
              onClick={() => {
                setFormData({
                  afpNumber: '',
                  ssn: '',
                  crpContractor: '',
                  crpRepresentativeName: '',
                  dvrCounselor: '',
                  totalCost: '$0.00',
                  serviceCategory: [],
                  serviceStartDate: '',
                  serviceEndDate: '',
                  clientName: '',
                  clientDOB: '',
                  clientAddress: '',
                  clientPhone: '',
                  clientEmail: '',
                  employmentOutcome: '',
                  employmentStatus: '',
                  wageAtPlacement: '',
                  hoursPerWeek: '',
                  jobTitle: '',
                  employerName: '',
                  employerAddress: '',
                  employerPhone: '',
                  notes: '',
                });
              }}
              className={outlineButtonClass}
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  (};
}
