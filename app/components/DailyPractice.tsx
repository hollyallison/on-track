"use client"
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import MoodTracker from './MoodTracker';
import styles from './Components.module.css';


export default function DailyPractice() {
  return (
   
      <form>
         <div className="flex justify-center items-center bg-white shadow-2xl m-20 rounded-md">
  <div className="w-full border-b border-gray-900/10 pb-12 px-10">
    <h2 className="text-base font-semibold leading-7 text-gray-900">Daily Practice</h2>
    <p className="mt-1 text-sm leading-6 text-gray-600">
      Take some time to yourself to reflect and think about the day.
    </p>
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="col-span-full">
        <label for="about" class="block text-sm font-medium leading-6 text-gray-900">
          Gratitude List
        </label>
        <p className="mt-3 text-sm leading-6 text-gray-600">I am so truly grateful for...</p>
        <div className="mt-2">
          <textarea id="about" name="about" rows="10" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
        </div>
      </div>
    </div>
    <div className="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
        Cancel
      </button>
      <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600">
        Save
      </button>
    </div>
  </div>
</div>


        <div className="flex justify-center items-center min-h-screen rounded-md p-12 m-20 bg-white shadow-2xl"> {/* Ensure full viewport height and centered content */}
        <div className="border-b border-gray-900/10 pb-12">
          {/* Photo of the day Section */}
        <div className="col-span-full">
              <label htmlFor="cover-photo" className=" mt-10 block text-sm font-medium leading-6 text-gray-900">
                Photo of the Day
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            </div>
{/* Daily Reflection Section */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Daily Reflections
              </label>
              <p className="mt-3 text-sm leading-6 text-gray-600">Reflecting on the day was there any process on your goals, distractions you need to be aware of or a simply something that made you laugh/smile today..</p>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={10}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
            </div>
          </div>

          <div className="mt-10 grid-cols-2">        
<MoodTracker />
</div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
      </div>
    </form>

  )
}