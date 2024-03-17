import React from 'react'


  const GratitudeList = () => {
        return (
          <>
            <label htmlFor="gratitude-list" className="block my-6 text-2xl font-semibold text-gray-900">
              Gratitude List
            </label>
            <p className="mt-1 text-sm text-gray-600">I am so truly grateful for...</p>
            <textarea
              id="gratitude-list"
              rows={10}
              className="w-full mt-2 text-sm text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Type here..."
            ></textarea>
          </>
        );
      };
export default GratitudeList
