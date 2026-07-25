'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import jsPDF from 'jspdf';

export default function SDORForm() {
  const [formData, setFormData] = useState({
    afpNumber: '',
    ssn: '',
    crpContractor: '',
    crpRepresentativeName: '',
    dvrCounselor: '',
    totalCost: '$0.00',
    serviceCategory: [] as string[],
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

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Title
    doc.setFontSize(16);
    doc.text('SDOR Addendum Form for Cascadia Deaf Nation', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;

    doc.setFontSize(10);
    doc.text('Washington State Division of Vocational Rehabilitation', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 5;
    doc.text('DSHS 11-030 (REV. 07/2025)', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Helper function to add form fields
    const addField = (label: string, value: string) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFontSize(10);
      doc.text(`${label}:`, 20, yPosition);
      doc.setFont(undefined, 'normal');
      doc.text(value || '___________________', 100, yPosition);
      yPosition += 8;
    };

    // Basic Information
    doc.setFont(undefined, 'bold');
    doc.text('BASIC INFORMATION', 20, yPosition);
    yPosition += 8;
    doc.setFont(undefined, 'normal');

    addField('AFP Number', formData.afpNumber);
    addField('SSN (Last 4 Digits)', formData.ssn);
    addField('CRP Contractor', formData.crpContractor);
    addField('CRP Representative Name', formData.crpRepresentativeName);
    addField('DVR Counselor', formData.dvrCounselor);
    addField('Total Cost', formData.totalCost);

    // Service Category
    yPosition += 5;
    doc.setFont(undefined, 'bold');
    doc.text('CRP SERVICE CATEGORY', 20, yPosition);
    yPosition += 8;
    doc.setFont(undefined, 'normal');

    if (formData.serviceCategory.length > 0) {
      doc.text('Selected Services:', 20, yPosition);
      yPosition += 6;
      formData.serviceCategory.forEach(service => {
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(`• ${service}`, 25, yPosition);
        yPosition += 6;
      });
    } else {
      doc.text('No services selected', 20, yPosition);
      yPosition += 8;
    }

    // Timelines
    yPosition += 5;
    doc.setFont(undefined, 'bold');
    doc.text('TIMELINES', 20, yPosition);
    yPosition += 8;
    doc.setFont(undefined, 'normal');

    addField('Service Start Date', formData.serviceStartDate);
    addField('Service End Date', formData.serviceEndDate);

    // Client Information
    yPosition += 5;
    doc.setFont(undefined, 'bold');
    doc.text('CLIENT INFORMATION', 20, yPosition);
    yPosition += 8;
    doc.setFont(undefined, 'normal');

    addField('Client Name', formData.clientName);
    addField('Date of Birth', formData.clientDOB);
    addField('Address', formData.clientAddress);
    addField('Phone', formData.clientPhone);
    addField('Email', formData.clientEmail);

    // Employment Outcome
    yPosition += 5;
    doc.setFont(undefined, 'bold');
    doc.text('EMPLOYMENT OUTCOME', 20, yPosition);
    yPosition += 8;
    doc.setFont(undefined, 'normal');

    addField('Employment Outcome', formData.employmentOutcome);
    addField('Employment Status', formData.employmentStatus);
    addField('Wage at Placement', formData.wageAtPlacement);
    addField('Hours Per Week', formData.hoursPerWeek);
    addField('Job Title', formData.jobTitle);

    // Employer Information
    yPosition += 5;
    doc.setFont(undefined, 'bold');
    doc.text('EMPLOYER INFORMATION', 20, yPosition);
    yPosition += 8;
    doc.setFont(undefined, 'normal');

    addField('Employer Name', formData.employerName);
    addField('Employer Address', formData.employerAddress);
    addField('Employer Phone', formData.employerPhone);

    // Notes
    if (formData.notes) {
      yPosition += 5;
      doc.setFont(undefined, 'bold');
      doc.text('NOTES', 20, yPosition);
      yPosition += 8;
      doc.setFont(undefined, 'normal');
      const notesLines = doc.splitTextToSize(formData.notes, 170);
      doc.text(notesLines, 20, yPosition);
    }

    // Save the PDF
    doc.save('SDOR_Form_Cascadia_Deaf_Nation.pdf');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">SDOR Addendum Form for Cascadia Deaf Nation</h1>
          <p className="text-center text-gray-600 mb-1">Washington State Division of Vocational Rehabilitation</p>
          <p className="text-center text-gray-500 text-sm">DSHS 11-030 (REV. 07/2025)</p>
        </div>

        <form className="space-y-8">
          {/* Basic Information Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="afpNumber">AFP Number *</Label>
                <Input
                  id="afpNumber"
                  name="afpNumber"
                  value={formData.afpNumber}
                  onChange={handleInputChange}
                  placeholder="Enter AFP Number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="ssn">SSN (Last 4 Digits) *</Label>
                <Input
                  id="ssn"
                  name="ssn"
                  value={formData.ssn}
                  onChange={handleInputChange}
                  placeholder="XXXX"
                  maxLength={4}
                  required
                />
              </div>
              <div>
                <Label htmlFor="crpContractor">CRP Contractor *</Label>
                <Input
                  id="crpContractor"
                  name="crpContractor"
                  value={formData.crpContractor}
                  onChange={handleInputChange}
                  placeholder="Enter CRP Contractor"
                  required
                />
              </div>
              <div>
                <Label htmlFor="crpRepresentativeName">CRP Representative Name *</Label>
                <Input
                  id="crpRepresentativeName"
                  name="crpRepresentativeName"
                  value={formData.crpRepresentativeName}
                  onChange={handleInputChange}
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="dvrCounselor">DVR Counselor *</Label>
                <Input
                  id="dvrCounselor"
                  name="dvrCounselor"
                  value={formData.dvrCounselor}
                  onChange={handleInputChange}
                  placeholder="Enter DVR Counselor"
                  required
                />
              </div>
              <div>
                <Label htmlFor="totalCost">Total Cost *</Label>
                <Input
                  id="totalCost"
                  name="totalCost"
                  value={formData.totalCost}
                  onChange={handleInputChange}
                  placeholder="$0.00"
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
                  <Checkbox
                    id={category}
                    checked={formData.serviceCategory.includes(category)}
                    onCheckedChange={() => handleCheckboxChange(category)}
                  />
                  <Label htmlFor={category} className="font-normal cursor-pointer">{category}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Timelines Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">Timelines *</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="serviceStartDate">Service Start Date *</Label>
                <Input
                  id="serviceStartDate"
                  name="serviceStartDate"
                  type="date"
                  value={formData.serviceStartDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="serviceEndDate">Service End Date *</Label>
                <Input
                  id="serviceEndDate"
                  name="serviceEndDate"
                  type="date"
                  value={formData.serviceEndDate}
                  onChange={handleInputChange}
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
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  placeholder="Enter Client Name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="clientDOB">Date of Birth *</Label>
                <Input
                  id="clientDOB"
                  name="clientDOB"
                  type="date"
                  value={formData.clientDOB}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="clientAddress">Address *</Label>
                <Input
                  id="clientAddress"
                  name="clientAddress"
                  value={formData.clientAddress}
                  onChange={handleInputChange}
                  placeholder="Enter Address"
                  required
                />
              </div>
              <div>
                <Label htmlFor="clientPhone">Phone *</Label>
                <Input
                  id="clientPhone"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleInputChange}
                  placeholder="Enter Phone"
                  required
                />
              </div>
              <div>
                <Label htmlFor="clientEmail">Email *</Label>
                <Input
                  id="clientEmail"
                  name="clientEmail"
                  type="email"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
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
                <Label htmlFor="employmentOutcome">Employment Outcome *</Label>
                <Input
                  id="employmentOutcome"
                  name="employmentOutcome"
                  value={formData.employmentOutcome}
                  onChange={handleInputChange}
                  placeholder="Enter Employment Outcome"
                  required
                />
              </div>
              <div>
                <Label htmlFor="employmentStatus">Employment Status *</Label>
                <Input
                  id="employmentStatus"
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleInputChange}
                  placeholder="Enter Employment Status"
                  required
                />
              </div>
              <div>
                <Label htmlFor="wageAtPlacement">Wage at Placement *</Label>
                <Input
                  id="wageAtPlacement"
                  name="wageAtPlacement"
                  value={formData.wageAtPlacement}
                  onChange={handleInputChange}
                  placeholder="Enter Wage"
                  required
                />
              </div>
              <div>
                <Label htmlFor="hoursPerWeek">Hours Per Week *</Label>
                <Input
                  id="hoursPerWeek"
                  name="hoursPerWeek"
                  type="number"
                  value={formData.hoursPerWeek}
                  onChange={handleInputChange}
                  placeholder="Enter Hours"
                  required
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="Enter Job Title"
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
                <Label htmlFor="employerName">Employer Name *</Label>
                <Input
                  id="employerName"
                  name="employerName"
                  value={formData.employerName}
                  onChange={handleInputChange}
                  placeholder="Enter Employer Name"
                  required
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="employerAddress">Employer Address *</Label>
                <Input
                  id="employerAddress"
                  name="employerAddress"
                  value={formData.employerAddress}
                  onChange={handleInputChange}
                  placeholder="Enter Employer Address"
                  required
                />
              </div>
              <div>
                <Label htmlFor="employerPhone">Employer Phone *</Label>
                <Input
                  id="employerPhone"
                  name="employerPhone"
                  value={formData.employerPhone}
                  onChange={handleInputChange}
                  placeholder="Enter Employer Phone"
                  required
                />
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">Additional Notes</h2>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Enter any additional notes"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 justify-center pt-6">
            <Button
              type="button"
              onClick={generatePDF}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
            >
              Download as PDF
            </Button>
            <Button
              type="reset"
              variant="outline"
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
            >
              Clear Form
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
