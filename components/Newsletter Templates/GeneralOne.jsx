"use client"

import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

const GeneralOne = ({ thumbnail, dataToTemplate, isEditing, onUpdate }) => {
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

  const handleSectionChange = (index, field, value) => {
    const updatedSections = editableData.sections.map((section, i) =>
      i === index ? { ...section, [field]: value } : section
    );
    const updatedData = { ...editableData, sections: updatedSections };
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
          className="w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 resize-y"
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
          className="w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
        />
      );
    }
    return <span>{content}</span>;
  };

  if (!editableData) {
    return <SkeletonLoader />;
  }

  return (
    <div className="font-sans text-sm bg-gray-50 min-h-screen">
      <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden ">
        <div className="relative">
          <div className="w-full h-64 md:h-52 overflow-hidden">
            <img
              src={thumbnail}
              alt="Thumbnail"
              className="w-full h-full object-cover object-center blur-sm"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-4 md:p-6">
            <h1 className="text-2xl md:text-2xl font-semibold text-[#eae9e9] mb-2 leading-tight">
              {renderEditableInput(editableData.title, "title", "Edit title")}
            </h1>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
            {renderEditableInput(
              editableData.mainTitle,
              "mainTitle",
              "Edit main title"
            )}
          </h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {editableData.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                {isEditing ? (
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) =>
                      handleArrayInputChange("tags", index, e.target.value)
                    }
                    className="w-20 p-0 text-xs bg-transparent border-none"
                  />
                ) : (
                  tag
                )}
              </span>
            ))}
          </div>

          <div className="text-sm text-gray-600 mb-6 leading-relaxed">
            {renderEditableText(
              editableData.summary,
              "summary",
              "Edit summary"
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Key Highlights
            </h3>
            <ul className="space-y-2 text-sm">
              {editableData.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <ChevronRight
                    size={16}
                    className="mr-2 text-blue-500 flex-shrink-0 mt-1"
                  />
                  {isEditing ? (
                    <input
                      type="text"
                      value={point}
                      onChange={(e) =>
                        handleArrayInputChange(
                          "keyPoints",
                          index,
                          e.target.value
                        )
                      }
                      className="w-full p-1 text-sm bg-white/50 border-none"
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
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) =>
                        handleSectionChange(index, "title", e.target.value)
                      }
                      className="w-full p-1 text-lg bg-transparent border-none font-semibold"
                    />
                  ) : (
                    section.title
                  )}
                </h3>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {isEditing ? (
                    <textarea
                      value={section.content}
                      onChange={(e) =>
                        handleSectionChange(index, "content", e.target.value)
                      }
                      className="w-full p-2 text-sm bg-white/50 border rounded-md resize-y"
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Conclusion
            </h3>
            <div className="text-sm text-gray-600 leading-relaxed">
              {renderEditableText(
                editableData.conclusion,
                "conclusion",
                "Edit conclusion"
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-colors duration-300 font-semibold text-sm shadow-md"
            >
              Watch Full Video
            </a>
          </div>
        </div>

        <div className="bg-gray-800 text-white p-4 text-center flex flex-col gap-2">
          <p className="mb-1 text-sm w-full">
            {renderEditableInput(editableData.footer, "footer", "Edit footer")}
          </p>
          <a
            href="https://www.clipmailo.com"
            className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-300"
          >
            Powered by clipmailo.com
          </a>
        </div>
      </div>
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="animate-pulse font-sans text-sm bg-gray-50 min-h-screen p-4 md:p-8">
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="w-full h-64 md:h-80 bg-gray-300"></div>
      <div className="p-4 md:p-6">
        <div className="h-8 bg-gray-300 rounded mb-4 w-3/4"></div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 bg-gray-300 rounded-full w-16"></div>
          <div className="h-6 bg-gray-300 rounded-full w-20"></div>
          <div className="h-6 bg-gray-300 rounded-full w-24"></div>
        </div>
        <div className="h-24 bg-gray-300 rounded mb-6"></div>
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="h-6 bg-gray-300 rounded mb-3 w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="space-y-6 mb-6">
          {[...Array(3)].map((_, index) => (
            <div key={index}>
              <div className="h-6 bg-gray-300 rounded mb-3 w-1/2"></div>
              <div className="h-16 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg mb-6">
          <div className="h-6 bg-gray-300 rounded mb-3 w-1/4"></div>
          <div className="h-16 bg-gray-300 rounded"></div>
        </div>
        <div className="flex justify-center">
          <div className="h-10 bg-gray-300 rounded-full w-40"></div>
        </div>
      </div>
      <div className="bg-gray-800 p-4">
        <div className="h-4 bg-gray-600 rounded mb-2 w-3/4 mx-auto"></div>
        <div className="h-3 bg-gray-600 rounded w-1/3 mx-auto"></div>
      </div>
    </div>
  </div>
);

export default GeneralOne;