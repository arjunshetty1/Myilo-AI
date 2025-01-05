"use client";

import React, { useState, useEffect } from "react";
import { Calendar, User, Tag, MessageSquare, Link, Youtube } from "lucide-react";

const MinimalOne = ({ thumbnail, dataToTemplate, isEditing, onUpdate }) => {
  const [editabledataToTemplate, setEditabledataToTemplate] = useState(dataToTemplate);

  useEffect(() => {
    setEditabledataToTemplate(dataToTemplate);
  }, [dataToTemplate]);

  const handleInputChange = (field, value) => {
    const updateddataToTemplate = { ...editabledataToTemplate, [field]: value };
    setEditabledataToTemplate(updateddataToTemplate);
    onUpdate(updateddataToTemplate);
  };

  const handleArrayInputChange = (field, index, value) => {
    const updatedArray = [...editabledataToTemplate[field]];
    updatedArray[index] = value;
    const updateddataToTemplate = { ...editabledataToTemplate, [field]: updatedArray };
    setEditabledataToTemplate(updateddataToTemplate);
    onUpdate(updateddataToTemplate);
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = editabledataToTemplate.sections.map((section, i) =>
      i === index ? { ...section, [field]: value } : section
    );
    const updateddataToTemplate = { ...editabledataToTemplate, sections: updatedSections };
    setEditabledataToTemplate(updateddataToTemplate);
    onUpdate(updateddataToTemplate);
  };

  const adjustHeight = (e) => {
    e.target.style.height = "auto"; // Reset height
    e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scroll height
  };

  const renderEditableText = (content, field, placeholder = "Edit text") => {
    if (isEditing) {
      return (
        <textarea
          value={content || ""}
          onChange={(e) => {
            handleInputChange(field, e.target.value);
            adjustHeight(e);
          }}
          placeholder={placeholder}
          className="w-full p-2 text-sm bg-white/50 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-800 resize-none "
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

  const renderEditableInput = (content, field, placeholder = "Edit text") => {
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

  return (
    <div className="font-sans text-sm bg-white min-h-screen p-4">
      <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl">
        <div className="relative p-0">
          <div className="w-full h-48 md:h-64 overflow-hidden">
            <img
              src={thumbnail}
              alt="Newsletter Thumbnail"
              className="w-full h-full object-cover object-center blur-sm"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
  <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
    {isEditing ? (
      <input
        type="text"
        value={editabledataToTemplate.title || ""}
        onChange={(e) => handleInputChange("title", e.target.value)}
        placeholder="Edit title"
        className="w-full p-1 px-4 text-2xl bg-transparent border-none focus:ring-2 focus:ring-blue-500 text-white"
      />
    ) : (
      <span className="text-white">{editabledataToTemplate.title}</span>
    )}
  </h1>
  <p className="text-lg">
    {isEditing ? (
      <input
        type="text"
        value={editabledataToTemplate.subtitle || ""}
        onChange={(e) => handleInputChange("subtitle", e.target.value)}
        placeholder="Edit subtitle"
        className="w-full p-1  bg-transparent text-lg border-none focus:ring-2 focus:ring-blue-500 text-white"
      />
    ) : (
      <span className="text-white">{editabledataToTemplate.subtitle}</span>
    )}
  </p>
</div>
        </div>

        <div className="p-4 md:p-6">

          <div className="flex flex-wrap gap-2 mb-4">
            {editabledataToTemplate.tags &&
              editabledataToTemplate.tags.map((tag, index) => (
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
              ))}
          </div>

          <div className="text-sm text-gray-600 mb-6 leading-relaxed">
            {renderEditableText(editabledataToTemplate.summary, "summary", "Edit summary")}
          </div>

          <div className="space-y-6 mb-6">
            {editabledataToTemplate.sections &&
              editabledataToTemplate.sections.map((section, index) => (
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
                        onInput={(e) => {
                          e.target.style.height = "auto";
                          e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                      />
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: section.content || "" }} />
                    )}
                  </div>
                </div>
              ))}
          </div>

          <div className="flex justify-center mb-6">
            <button
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              onClick={() => editabledataToTemplate.youtubeLink && window.open(editabledataToTemplate.youtubeLink, "_blank")}
            >
              <Youtube size={20} />
              Watch Full YouTube Video
            </button>
          </div>
        </div>

        <div className="bg-gray-100 text-gray-600 p-4 text-center flex flex-col gap-2">
          <p className="mb-1 text-sm w-full">
            {renderEditableInput(editabledataToTemplate.footer, "footer", "Edit footer")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MinimalOne;
