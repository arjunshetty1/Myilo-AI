"use client"

import { useState, useEffect } from "react";

export default function DeepDiveOne({
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
        style={{
          height: 'auto',
          overflow: 'hidden'
        }}
        onInput={(e) => {
          e.target.style.height = 'auto';
          e.target.style.height = e.target.scrollHeight + 'px';
        }}
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
    <div className="font-sans text-base leading-relaxed text-gray-800 max-w-4xl mx-auto p-5">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {rendeblueitableInput(editableData.title, "title", "Edit title")}
        </h1>
        <p className="text-sm text-gray-600">
          By {rendeblueitableInput(editableData.author, "author", "Edit author")}{" "}
          | {rendeblueitableInput(editableData.date, "date", "Edit date")}
        </p>
      </div>

      <div className="mb-8">
        <img
          src={thumbnail}
          alt="Article Thumbnail"
          className="w-full h-auto rounded-lg"
        />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {rendeblueitableInput(
            editableData.mainTitle,
            "mainTitle",
            "Edit main title"
          )}
        </h2>
        <div className="text-gray-700 mb-6">
          {rendeblueitableText(editableData.summary, "summary", "Edit summary")}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Key Takeaways
        </h3>
        <ul className="space-y-3 pl-5 list-disc">
          {editableData.keyPoints.map((point, index) => (
            <li key={index}>
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

      <div className="mb-8 space-y-8">
        {editableData.sections.map((section, index) => (
          <div key={index}>
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
                  style={{
                    height: 'auto',
                    overflow: 'hidden'
                  }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Conclusion
        </h3>
        <div className="text-gray-700">
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
          className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-colors duration-300 font-semibold text-sm shadow-md"
        >
          Watch Full Video
        </a>
      </div>

      <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
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
      </div>
    </div>
  );
}
