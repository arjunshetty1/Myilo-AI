"use client"

import React, { useEffect, useState } from 'react';
import { Clock,  Zap, ArrowRight, Sparkles } from 'lucide-react';

const QuickReadTwo = ({ thumbnail, dataToTemplate, isEditing, onUpdate }) => {
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

  const rendeblueitableText = (content, field, placeholder = "Edit text") => {
    if (isEditing) {
      return (
        <textarea
          value={content}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full p-3 text-sm border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white/90 text-gray-800"
          style={{ minHeight: '100px', height: 'auto' }}
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
          className="w-full p-2 text-sm border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white/90 text-gray-800"
        />
      );
    }
    return <span>{content}</span>;
  };

  if (!editableData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans text-sm bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-2xl mx-auto p-4">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header with Diagonal Design */}
          <div className="relative">
            <div className="h-40 overflow-hidden transform -skew-y-6 -translate-y-10">
              <div className="transform skew-y-6 translate-y-10">
                <img
                  src={thumbnail}
                  alt="Cover"
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/80 to-purple-500/80">
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span className="text-sm">{editableData.date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="px-6 -mt-6 relative z-10">
            {/* Title Card */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
              <h1 className="text-xl font-bold text-gray-800">
                {rendeblueitableInput(editableData.title, "title", "Edit title")}
              </h1>
              <h2 className="text-lg text-indigo-600 mt-2">
                {rendeblueitableInput(editableData.mainTitle, "mainTitle", "Edit main title")}
              </h2>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {editableData.tags.map((tag, index) => (
                <div key={index} 
                     className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium">
                  {isEditing ? (
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => handleArrayInputChange("tags", index, e.target.value)}
                      className="w-20 bg-transparent border-none text-white placeholder-white/70"
                    />
                  ) : (
                    <span className="flex items-center">
                      <Sparkles size={12} className="mr-1" />
                      {tag}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Summary Box */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5 mb-6">
              <div className="text-gray-700">
                {rendeblueitableText(editableData.summary, "summary", "Edit summary")}
              </div>
            </div>

            {/* Key Points */}
            <div className="space-y-3 mb-6">
              {editableData.keyPoints.map((point, index) => (
                <div key={index} 
                     className="flex items-start bg-white rounded-xl p-3 shadow-sm border border-indigo-100">
                  < Zap size={18} className="text-indigo-500 mt-1 flex-shrink-0" />
                  <div className="ml-3 flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => handleArrayInputChange("keyPoints", index, e.target.value)}
                        className="w-full bg-transparent border-none"
                      />
                    ) : (
                      point
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-5 text-white mb-6">
              <h3 className="font-semibold mb-2 flex items-center">
                <ArrowRight size={18} className="mr-2" />
                Final Thoughts
              </h3>
              <div className="text-white/90">
                {rendeblueitableText(editableData.conclusion, "conclusion", "Edit conclusion")}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center py-6">
              <p className="text-gray-600 mb-4">
                {rendeblueitableInput(editableData.footer, "footer", "Edit footer")}
              </p>
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Watch Full Video
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickReadTwo;