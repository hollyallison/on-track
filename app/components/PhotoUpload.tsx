import React from 'react'
import { PhotoIcon } from '@heroicons/react/24/solid';


    const PhotoUpload: React.FC = () => {
        return (
            <div>
            
            <h2 className='my-8 text-2xl font-semibold text-gray-900'> Photo of the Day</h2>
          <div className="mb-8 p-6 bg-gray-100 rounded-lg border border-dashed border-gray-200">
            <div className="flex flex-col items-center justify-center ">
              <PhotoIcon className="m-6 h-12 w-12 text-gray-400" />
              <p className="m-4 text-sm text-gray-600">Upload a photo or drag and drop</p>
              <p className="text-xs text-gray-500 mb-4">PNG, JPG, GIF up to 10MB</p>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
            </div>
          </div>
          </div>
        );
      } 
      export default PhotoUpload