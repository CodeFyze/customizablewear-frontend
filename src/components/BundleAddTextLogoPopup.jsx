import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const AddTextLogoPopup = ({ onBack, onClose, onFinish }) => {
  const [text, setText] = useState('');
  const [font, setFont] = useState('Standard');
  const [notes, setNotes] = useState('');

  const handleFinish = () => {
    onFinish({
      text,
      font,
      notes
    });
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mx-4 relative'>
        <button onClick={onClose} className='absolute top-4 right-4 text-red-600 hover:text-red-700 p-2'>
          <FaTimes size={20} />
        </button>

        <div className='text-center'>
          <h2 className='text-2xl font-bold mb-2'>Add Your Text Logo</h2>
          <p className='text-gray-600 mb-4'>
            Create your text logo, we have no setup fees! We will always send a design proof for your approval before
            production.
          </p>
          <img
            src='/placeholder-image.jpg'
            alt='Product'
            className='w-32 h-auto mx-auto mt-2 border rounded-md'
          />
        </div>

        <div className='space-y-4 mt-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Text Line</label>
            <input
              type='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Enter your text'
              className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Font</label>
            <select
              value={font}
              onChange={(e) => setFont(e.target.value)}
              className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
            >
              <option>Standard</option>
              <option>Serif</option>
              <option>Sans-serif</option>
            </select>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-2'>Text Preview</h3>
            <div className='bg-black text-center py-3 rounded-md'>
              <span className='px-4 py-2 bg-orange-500 text-white font-bold rounded-md font-sans'>
                {text || 'Preview Text'}
              </span>
            </div>
            <p className='text-sm text-gray-500 mt-1'>The black box is for preview purposes only.</p>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder='Leave a message'
              className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
            />
          </div>
        </div>

        <div className='flex justify-between mt-6'>
          <button
            onClick={onBack}
            className='bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none'>
            Back
          </button>
          <button
            onClick={handleFinish}
            className='bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600'
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTextLogoPopup;
