'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

interface SDORFormData {
  afpNumber: string;
  ssnLast4: string;
  crpContractor: string;
  crpRepresentative: string;
  dviCounselor: string;
  totalCost: string;
  serviceCategories: string[];
  timelines: string;
}

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
  'Off-Site Psycho-Social - SE
'];

export default function SDORForm() {
  const [isPrinting, setIsPrinting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<SDORFormData>();

  const onSubmit = (data: SDORFormData) => {
    console.log('Form data:', data);
    alert('Form submitted successfully!');
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">SDOR Addendum Form for Cascadia Deef Nation</h1>
        <p>Washington State Division of Vocational Rehabilitation</p>
        <p className="text-sm text-gray-500">DSHS 11-030 (REV. 07/2025)</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">AFP Number *</label>
              <input
                {...register('afpNumber', { required: 'AFP Number is required' })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter AFP Number"
              />
              {errors.afpNumber && <p className="text-red-500 text-sm mt-1">{errors.afpNumber.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SSN (Last 4 Digits) *</label>
              <input
                {...register('ssnLast4', { required: 'SSN Last 4 Digits is required' })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="XOXX"
                maxLength={4}
              />
              {errors.ssnLast4 && <p className="text-red-500 text-sm mt-1">{errors.ssnLast4.message}</p>}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">CRP Service Category *</h2>
          <div className="grid grid-cols-2 gap-4">
            {serviceCategories.map((category) => (
              <label key={category} className="flex items-star gap-2 cursor-pointer">
                <input
                  {...register('serviceCategories')}
                  type="checkbox"
                  value={category}
                  className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
          {errors.serviceCategories && <p>The missing error message}</p>}
        </div>

        <div>
          <label className="block text-xl font-semibold mb-2">Timelines *</label>
          <textarea
            {...register('timelines', { required: 'Timelines are required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Be sure to include the start date, end date, and any milestones."
          />
          {errors.timelines && <p className="text-red-500 text-sm mt-1">{errors.timelines.message}</p>}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Form
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isPrinting ? 'Printing...' : 'Download PDF'}
          </button>
        </div>
      </form>
    </div>
  );
}