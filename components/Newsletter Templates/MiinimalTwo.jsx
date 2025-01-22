"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

const MinimalTwo = ({ thumbnail, dataToTemplate, isEditing, onUpdate }) => {
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

  const adjustHeight = (e) => {
    e.target.style.height = "auto"; // Reset height
    e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scroll height
  };

  const rendeblueitableText = (content, field, placeholder = "Edit text") => {
    if (isEditing) {
      return (
        <textarea
          value={content || ""}
          onChange={(e) => {
            handleInputChange(field, e.target.value);
            adjustHeight(e);
          }}
          placeholder={placeholder}
          className="w-full p-2 text-sm bg-white/50 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-800 resize-none"
          style={{
            minHeight: "100px",
            overflow: "hidden",
          }}
          onInput={adjustHeight}
        />
      );
    }
    return <div dangerouslySetInnerHTML={{ __html: content || "" }} />;
  };

  const rendeblueitableInput = (content, field, placeholder = "Edit text") => {
    if (isEditing) {
      return (
        <input
          type="text"
          value={content || ""}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full p-1 text-sm bg-transparent border-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
      );
    }
    return <span>{content}</span>;
  };

  const renderTags = () =>
    editableData.tags.map((tag, index) => (
      <span key={index} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
        {isEditing ? (
          <input
            type="text"
            value={tag || ""}
            onChange={(e) => handleArrayInputChange("tags", index, e.target.value)}
            className="w-20 p-0 text-xs bg-transparent border-none"
          />
        ) : (
          tag
        )}
      </span>
    ));

  return (
    <div className="font-sans text-sm bg-white min-h-screen p-4">
      <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl">
        <div className="relative p-0">
          <div className="w-full h-48 md:h-64 overflow-hidden">
            <img
              src={thumbnail}
              alt="Newsletter Thumbnail"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
              {rendeblueitableInput(editableData.mainTitle, "mainTitle", "Edit main title")}
            </h1>
            <p className="text-lg text-white/80">
              {rendeblueitableInput(editableData.title, "title", "Edit title")}
            </p>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {rendeblueitableInput(editableData.date, "date", "Edit date")}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {renderTags()}
          </div>

          <div className="text-sm text-gray-600 mb-6 leading-relaxed">
            {rendeblueitableText(editableData.summary, "summary", "Edit summary")}
          </div>

          <div className="space-y-6 mb-6">
            {editableData.sections &&
              editableData.sections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={section.title || ""}
                        onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                        className="w-full p-1 text-lg bg-transparent border-none font-semibold"
                      />
                    ) : (
                      section.title
                    )}
                  </h3>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    {isEditing ? (
                      <textarea
                        value={section.content || ""}
                        onChange={(e) => handleSectionChange(index, "content", e.target.value)}
                        className="w-full p-2 text-sm bg-white/50 border rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
                        style={{ minHeight: "100px", overflow: "hidden" }}
                        onInput={adjustHeight}
                      />
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: section.content || "" }} />
                    )}
                  </div>
                </div>
              ))}
          </div>

          <div className="flex justify-center mb-6">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              <span>Watch Full Video</span>
            </button>
          </div>
        </div>

        <div className="bg-gray-100 text-gray-600 p-4 text-center flex flex-col gap-2">
          <p className="mb-1 text-sm w-full">
            {rendeblueitableInput(editableData.footer, "footer", "Edit footer")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MinimalTwo;
