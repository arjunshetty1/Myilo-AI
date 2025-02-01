"use client";

import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import LoaderSecondary from '../App Components/LoaderSecondary';


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
          className="w-full p-3 text-sm md:text-base border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white/90 text-gray-800 resize-y min-h-[120px]"
        />
      );
    }
    return <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: content }} />;
  };

  const rendeblueitableInput = (content, field, placeholder = "Edit text") => {
    if (isEditing) {
      return (
        <input
          type="text"
          value={content}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full p-2 text-sm md:text-base border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white/90 text-gray-800"
        />
      );
    }
    return <span className="break-words">{content}</span>;
  };

  if (!editableData) {
    return <LoaderSecondary/>;
  }

  return (
    <div className="font-sans min-h-screen bg-gray-50 p-0 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 md:p-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">
            {rendeblueitableInput(editableData.title, "title", "Edit title")}
          </h1>
        </div>

        <div className="p-6 md:p-8 space-y-6 md:space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              {rendeblueitableInput(editableData.mainTitle, "mainTitle", "Edit main title")}
            </h2>
            <div className="text-gray-600 leading-relaxed">
              {rendeblueitableText(editableData.summary, "summary", "Edit summary")}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {editableData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 border border-blue-300 px-3 py-1 rounded-full text-xs md:text-sm"
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleArrayInputChange("tags", index, e.target.value)}
                    className="min-w-[100px] bg-transparent border-none"
                  />
                ) : (
                  tag
                )}
              </span>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-4 md:p-6 mb-6">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center mb-3">
              <AlertCircle size={24} className="mr-2 text-blue-600" />
              Key Points
            </h3>
            <ul className="space-y-3 md:space-y-4">
              {editableData.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle size={20} className="mr-2 text-blue-600 flex-shrink-0 mt-1" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handleArrayInputChange("keyPoints", index, e.target.value)}
                      className="w-full p-2 text-sm md:text-base bg-white border rounded-md"
                    />
                  ) : (
                    <span className="text-gray-700">{point}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 md:space-y-8">
            {editableData.sections.map((section, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                      className="w-full p-2 text-lg md:text-xl bg-transparent border-none font-semibold"
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
                      className="w-full p-3 text-sm md:text-base border-2 border-gray-200 rounded-lg resize-y min-h-[120px]"
                    />
                  ) : (
                    <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-lg p-4 md:p-6">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center mb-3">
              <AlertCircle size={24} className="mr-2 text-blue-600" />
              Final Thoughts
            </h3>
            <div className="text-gray-700 leading-relaxed">
              {rendeblueitableText(editableData.conclusion, "conclusion", "Edit conclusion")}
            </div>
          </div>

          <div className="flex justify-center">
            
          </div>
        </div>

        <div className="bg-gray-800 text-white p-4 md:p-6 text-center">
          <p className="mb-2 text-sm md:text-base">
            {rendeblueitableInput(editableData.footer, "footer", "Edit footer")}
          </p>
          <a
            href="https://www.example.com"
            className="text-xs md:text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200"
          >
            Powered by example.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default MinimalThree;