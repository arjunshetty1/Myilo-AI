"use client"

import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const MinimalThree = ({ thumbnail, dataToTemplate, isEditing, onUpdate }) => {
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
    const updatedArray = [...editableData[field]];
    updatedArray[index] = value;
    const updatedData = { ...editableData, [field]: updatedArray };
    setEditableData(updatedData);
    onUpdate(updatedData);
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = editableData.sections.map((section, i) =>
      i === index ? { ...section, [field]: value } : section
    );
    const updatedData = { ...editableData, sections: updatedSections };
    setEditableData(updatedData);
    onUpdate(updatedData);
  };

  const rendeblueitableText = (content, field, placeholder = "Edit text") => {
    if (isEditing) {
      return (
        <textarea
          value={content}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full p-2 text-sm bg-white/50 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-800"
          style={{
            minHeight: '100px',
            height: 'auto',
            resize: 'none',
            overflow: 'hidden'
          }}
          onInput={(e) => {
            e.target.style.height = 'auto'; // Reset the height
            e.target.style.height = e.target.scrollHeight + 'px'; // Adjust to fit content
          }}
        />
      );
    }
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  const rendeblueitableInput = (content, field, placeholder = "Edit text") => {
    if (isEditing) {
      return (
        <input
          type="text"
          value={content}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full p-2 text-sm bg-white/50 border-none rounded-md focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
      );
    }
    return <span>{content}</span>;
  };

  if (!editableData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans text-sm  min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold mb-2">
            {rendeblueitableInput(editableData.title, "title", "Edit title")}
          </h1>
        
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {rendeblueitableInput(editableData.mainTitle, "mainTitle", "Edit main title")}
            </h2>
            <div className="text-gray-600 leading-relaxed">
              {rendeblueitableText(editableData.summary, "summary", "Edit summary")}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {editableData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 border border-blue-300 px-2 py-1 rounded-full text-xs"
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleArrayInputChange("tags", index, e.target.value)}
                    className="w-20 p-0 text-xs bg-transparent border-none"
                  />
                ) : (
                  tag
                )}
              </span>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-3">
              <AlertCircle size={20} className="mr-2 text-blue-600" />
              Key Points
            </h3>
            <ul className="space-y-3">
              {editableData.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle size={18} className="mr-2 text-blue-600 flex-shrink-0 mt-1" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handleArrayInputChange("keyPoints", index, e.target.value)}
                      className="w-full p-1 text-sm bg-white/50 border-none rounded"
                    />
                  ) : (
                    <span>{point}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 mb-6">
            {editableData.sections.map((section, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                      className="w-full p-1 text-lg bg-transparent border-none font-semibold"
                    />
                  ) : (
                    section.title
                  )}
                </h3>
                <div className="text-gray-600 leading-relaxed">
                  {isEditing ? (
                    <textarea
                      value={section.content}
                      onChange={(e) => handleSectionChange(index, "content", e.target.value)}
                      className="w-full p-2 text-sm bg-white/50 border rounded-md"
                      style={{
                        height: 'auto',
                        resize: 'none',
                        overflow: 'hidden'
                      }}
                      onInput={(e) => {
                        e.target.style.height = 'auto'; // Reset height
                        e.target.style.height = e.target.scrollHeight + 'px'; // Adjust to fit content
                      }}
                    />
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: section.content }} />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-3">
              <AlertCircle size={20} className="mr-2 text-blue-600" />
              Final Thoughts
            </h3>
            <div className="text-gray-700 leading-relaxed">
              {rendeblueitableText(editableData.conclusion, "conclusion", "Edit conclusion")}
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 font-semibold text-sm shadow-md"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="bg-gray-800 text-white p-4 text-center">
          <p className="mb-2 text-sm">
            {rendeblueitableInput(editableData.footer, "footer", "Edit footer")}
          </p>
          <a
            href="https://www.example.com"
            className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-300"
          >
            Poweblue by example.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default MinimalThree;
