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
        className="w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 resize-y"
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
        className="w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
      />
    ) : (
      <span>{content}</span>
    );
  };

  if (!editableData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans text-base leading-relaxed text-gray-800 max-w-4xl mx-auto p-5 bg-gray-100">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {rendeblueitableInput(editableData.title, "title", "Edit title")}
        </h1>
        <p className="text-sm text-gray-600">
          By {rendeblueitableInput(editableData.author, "author", "Edit author")}{" "}
          | {rendeblueitableInput(editableData.date, "date", "Edit date")}
        </p>
      </header>

      <div className="flex justify-between mb-10">
        <div className="w-3/5">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {rendeblueitableInput(
              editableData.mainTitle,
              "mainTitle",
              "Edit main title"
            )}
          </h2>
          <div className="text-gray-700 mb-4">
            {rendeblueitableText(editableData.summary, "summary", "Edit summary")}
          </div>
        </div>
        <div className="w-2/5">
          <img
            src={thumbnail}
            alt="Article Thumbnail"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>

      <div className="bg-gray-200 p-6 rounded-lg mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Key Insights</h3>
        <ul className="list-disc pl-5">
          {editableData.keyPoints.map((point, index) => (
            <li key={index} className="mb-2 text-gray-700">
              {isEditing ? (
                <input
                  type="text"
                  value={point}
                  onChange={(e) =>
                    handleArrayInputChange("keyPoints", index, e.target.value)
                  }
                  className="w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              ) : (
                <span>{point}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-8 mb-10">
        {editableData.sections.map((section, index) => (
          <div key={index} className="bg-white p-5 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {isEditing ? (
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    handleSectionChange(index, "title", e.target.value)
                  }
                  className="w-full p-2 text-xl font-bold border-none focus:ring-2 focus:ring-blue-500 bg-transparent text-gray-900"
                />
              ) : (
                section.title
              )}
            </h3>
            <div className="text-gray-700">
              {isEditing ? (
                <textarea
                  value={section.content}
                  onChange={(e) =>
                    handleSectionChange(index, "content", e.target.value)
                  }
                  className="w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 resize-y"
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-600 text-white p-6 rounded-lg mb-10">
        <h3 className="text-xl font-bold mb-4">Conclusion</h3>
        <div className="text-gray-200">
          {rendeblueitableText(
            editableData.conclusion,
            "conclusion",
            "Edit conclusion"
          )}
        </div>
      </div>

      <div className="text-center mb-8">
        <a
          href="#"
          className="inline-flex items-center bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors duration-300 font-semibold text-sm shadow-md"
        >
          Watch Full Video
        </a>
      </div>

      <footer className="border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
        <p className="mb-2">
          {rendeblueitableInput(editableData.footer, "footer", "Edit footer")}
        </p>
        <p>
          <a
            href="https://www.clipmailo.com"
            className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
          >
            Poweblue by clipmailo.com
          </a>
        </p>
      </footer>
    </div>
  );
}
