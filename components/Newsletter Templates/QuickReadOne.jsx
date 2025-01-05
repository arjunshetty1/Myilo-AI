"use client"

import React, { useEffect, useState } from 'react';
import { Clock, Tag, ChevronRight } from 'lucide-react';

const QuickReadOne = ({ thumbnail, dataToTemplate, isEditing, onUpdate }) => {
  const [editableData, setEditableData] = useState(dataToTemplate);

  useEffect(() => {
    setEditableData(dataToTemplate);
  }, [dataToTemplate]);

  const handleInputChange = (field, value) => {
    const updatedData = { ...editableData, [field]: value };
    setEditableData(updatedData);
    onUpdate(updatedData);
  };

  const handleArrayInputChange = (field, index, value) => {
    const updatedArray = editableData[field].map((item, i) =>
      i === index ? value : item
    );
    const updatedData = { ...editableData, [field]: updatedArray };
    setEditableData(updatedData);
    onUpdate(updatedData);
  };

  const renderEditableText = (content, field, placeholder = "Edit text") => {
    if (isEditing) {
      return (
        <textarea
          value={content}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 bg-white/80 text-gray-800"
          style={{ minHeight: '100px', height: 'auto' }}
        />
      );
    }
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  const renderEditableInput = (content, field, placeholder = "Edit text") => {
    if (isEditing) {
      return (
        <input
          type="text"
          value={content}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 bg-white/80 text-gray-800"
        />
      );
    }
    return <span>{content}</span>;
  };

  if (!editableData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans text-sm max-w-2xl mx-auto bg-white">
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        {/* Header Section */}
        <div className="relative h-48">
          <img
            src={thumbnail}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30 p-4 flex flex-col justify-end">
            <div className="text-white space-y-2">
              <h1 className="text-xl font-bold">
                {renderEditableInput(editableData.title, "title", "Edit title")}
              </h1>
              <div className="flex items-center space-x-2 text-xs">
                <Clock size={14} />
                <span>{editableData.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-4">
          {/* Main Title */}
          <h2 className="text-lg font-semibold text-gray-900">
            {renderEditableInput(editableData.mainTitle, "mainTitle", "Edit main title")}
          </h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {editableData.tags.map((tag, index) => (
              <div key={index} className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                <Tag size={12} className="mr-1" />
                {isEditing ? (
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleArrayInputChange("tags", index, e.target.value)}
                    className="w-20 bg-transparent border-none p-0 text-xs"
                  />
                ) : (
                  tag
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="text-gray-600">
            {renderEditableText(editableData.summary, "summary", "Edit summary")}
          </div>

          {/* Key Points */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Quick Takeaways</h3>
            <ul className="space-y-2">
              {editableData.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <ChevronRight size={16} className="text-purple-500 mt-1 flex-shrink-0" />
                  <div className="ml-2 flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => handleArrayInputChange("keyPoints", index, e.target.value)}
                        className="w-full bg-white/50 border-none rounded p-1"
                      />
                    ) : (
                      point
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Conclusion */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Bottom Line</h3>
            <div className="text-gray-600">
              {renderEditableText(editableData.conclusion, "conclusion", "Edit conclusion")}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center space-y-2 pt-4 border-t">
            <p className="text-gray-600">
              {renderEditableInput(editableData.footer, "footer", "Edit footer")}
            </p>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-200"
            >
              Watch Video
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickReadOne;