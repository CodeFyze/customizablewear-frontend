import React, { useState } from "react";

const AddTextLogoPopup = ({ onBack, onFinish }) => {
  const [textLine, setTextLine] = useState("");
  const [font, setFont] = useState("Standard");
  const [color, setColor] = useState("Black");
  const [notes, setNotes] = useState("");

  const handleFinish = () => {
    onFinish({ textLine, font, color, notes });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mx-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Add Your Text Logo</h2>
          <p className="text-gray-600 mb-4">
            Create your text logo, we have no set up fees! We will always send a
            design proof for your approval before production.
          </p>
        </div>
        <div className="space-y-4">
          {/* Text Line Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text Line
            </label>
            <input
              type="text"
              value={textLine}
              onChange={(e) => setTextLine(e.target.value)}
              placeholder="Enter your text"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Font and Color Select */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font
              </label>
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>Standard</option>
                <option>Serif</option>
                <option>Sans-serif</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Colour
              </label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>Black</option>
                <option>White</option>
                <option>Red</option>
              </select>
            </div>
          </div>

          {/* Text Preview */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Text Preview</h3>
            <div className="bg-black text-center py-3 rounded-md">
              <span
                className="px-4 py-2 bg-orange-500 text-white font-bold rounded-md"
              >
                {textLine || "Preview Text"}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Please note: The black box is for preview purposes only.
            </p>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Leave a message"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onBack}
            className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none"
          >
            Back
          </button>
          <div className="flex gap-2">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none" disabled>
              Add Another Logo
            </button>
            <button
              onClick={handleFinish}
              className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTextLogoPopup;