"use client";

import { useState, useEffect } from "react";

export default function DeepDiveTwo({
  thumbnail,
  dataToTemplate,
  isEditing,
  onUpdate,
}) {
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

  const rendeblueitableText = (content, field, placeholder = "Edit text") => {
    return isEditing ? (
      <textarea
        value={content}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 text-sm md:text-base border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 resize-y"
      />
    ) : (
      <div dangerouslySetInnerHTML={{ __html: content }} />
    );
  };

  const rendeblueitableInput = (content, field, placeholder = "Edit text") => {
    return isEditing ? (
      <input
        type="text"
        value={content}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 text-sm md:text-base border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
      />
    ) : (
      <span>{content}</span>
    );
  };

  if (!editableData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans text-gray-800 max-w-4xl mx-auto p-4 md:p-6 lg:p-8 bg-gray-50">
      <header className="text-center mb-6 md:mb-10">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
          {rendeblueitableInput(editableData.title, "title", "Edit title")}
        </h1>
        <p className="text-xs md:text-sm text-gray-600">
          By {rendeblueitableInput(editableData.author, "author", "Edit author")}{" "}
          | {rendeblueitableInput(editableData.date, "date", "Edit date")}
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8 md:mb-10">
        <div className="w-full md:w-3/5">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            {rendeblueitableInput(
              editableData.mainTitle,
              "mainTitle",
              "Edit main title"
            )}
          </h2>
          <div className="text-gray-700 mb-4 text-sm md:text-base">
            {rendeblueitableText(editableData.summary, "summary", "Edit summary")}
          </div>
        </div>
        <div className="w-full md:w-2/5">
          <img
            src={thumbnail}
            alt="Article Thumbnail"
            className="w-full h-auto aspect-video object-cover rounded-lg shadow-md"
          />
        </div>
      </div>

      <div className="bg-gray-200 p-4 md:p-6 rounded-lg mb-8 md:mb-10">
        <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Key Insights</h3>
        <ul className="list-disc pl-4 md:pl-6 space-y-2 md:space-y-3">
          {editableData.keyPoints.map((point, index) => (
            <li key={index} className="text-sm md:text-base text-gray-700">
              {isEditing ? (
                <input
                  type="text"
                  value={point}
                  onChange={(e) =>
                    handleArrayInputChange("keyPoints", index, e.target.value)
                  }
                  className="w-full p-2 text-sm md:text-base border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              ) : (
                <span>{point}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6 md:space-y-8 mb-8 md:mb-10">
        {editableData.sections.map((section, index) => (
          <div key={index} className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
              {isEditing ? (
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    handleSectionChange(index, "title", e.target.value)
                  }
                  className="w-full p-2 text-lg md:text-2xl font-bold border-b-2 border-blue-500 focus:ring-2 focus:ring-blue-500 bg-transparent text-gray-900"
                />
              ) : (
                section.title
              )}
            </h3>
            <div className="text-gray-700 text-sm md:text-base">
              {isEditing ? (
                <textarea
                  value={section.content}
                  onChange={(e) =>
                    handleSectionChange(index, "content", e.target.value)
                  }
                  className="w-full p-2 text-sm md:text-base border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 resize-y"
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-600 text-white p-4 md:p-6 rounded-lg mb-8 md:mb-10">
        <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4">Conclusion</h3>
        <div className="text-gray-200 text-sm md:text-base">
          {rendeblueitableText(
            editableData.conclusion,
            "conclusion",
            "Edit conclusion"
          )}
        </div>
      </div>

      

      <footer className="border-t border-gray-200 pt-4 md:pt-6 text-center text-xs md:text-sm text-gray-600">
        <p className="mb-2">
          {rendeblueitableInput(editableData.footer, "footer", "Edit footer")}
        </p>
        <p>
          <a
            href="https://www.clipmailo.com"
            className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
          >
            Powered by clipmailo.com
          </a>
        </p>
      </footer>
    </div>
  );
}