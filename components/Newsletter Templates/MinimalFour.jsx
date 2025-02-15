"use client";

import { useState, useEffect } from "react";
import { TrendingUp, ArrowRight } from "lucide-react";
import LoaderSecondary from "../App Components/LoaderSecondary";

const MinimalFour = ({ thumbnail, dataToTemplate, isEditing, onUpdate }) => {
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
          className="w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 resize-y min-h-[100px]"
          style={{ height: "auto", overflow: "hidden" }}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
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
          className="w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
        />
      );
    }
    return <span>{content}</span>;
  };

  if (!editableData) {
    return <LoaderSecondary />;
  }

  return (
    <div className="font-sans text-sm min-h-screen bg-white">
      <div className="max-w-4xl mx-auto shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-6 sm:p-8">
          <h1 className="text-2xl sm:text-4xl font-bold mb-3">
            {rendeblueitableInput(editableData.title, "title", "Edit title")}
          </h1>
        </div>

        <div className="p-4 sm:p-8">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-3xl font-semibold text-gray-800 mb-4">
              {rendeblueitableInput(
                editableData.mainTitle,
                "mainTitle",
                "Edit main title"
              )}
            </h2>
            <div className="text-gray-600 leading-relaxed text-base sm:text-lg">
              {rendeblueitableText(
                editableData.summary,
                "summary",
                "Edit summary"
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
            {editableData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 border border-blue-300 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs"
              >
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

          <div className="bg-blue-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center mb-4">
              <TrendingUp size={20} className="mr-2 text-blue-600" />
              Main Takeaways
            </h3>
            <ul className="space-y-4">
              {editableData.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <ArrowRight
                    size={16}
                    className="mr-2 text-blue-600 flex-shrink-0 mt-1"
                  />
                  {isEditing ? (
                    <textarea
                      value={point}
                      onChange={(e) =>
                        handleArrayInputChange(
                          "keyPoints",
                          index,
                          e.target.value
                        )
                      }
                      className="w-full p-2 text-sm bg-white border-none rounded resize-y"
                      style={{ height: "auto", overflow: "hidden" }}
                      onInput={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                      }}
                    />
                  ) : (
                    <span className="text-gray-700">{point}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 mb-6 sm:mb-8">
            {editableData.sections.map((section, index) => (
              <div
                key={index}
                className="border-l-4 border-purple-500 pl-4 sm:pl-6"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  {isEditing ? (
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) =>
                        handleSectionChange(index, "title", e.target.value)
                      }
                      className="w-full p-2 text-lg bg-transparent border-none font-semibold"
                    />
                  ) : (
                    section.title
                  )}
                </h3>
                <div className="text-gray-600 leading-relaxed">
                  {isEditing ? (
                    <textarea
                      value={section.content}
                      onChange={(e) =>
                        handleSectionChange(index, "content", e.target.value)
                      }
                      className="w-full p-2 text-sm bg-white border rounded-md resize-y"
                      style={{ height: "auto", overflow: "hidden" }}
                      onInput={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                      }}
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

          <div className="bg-purple-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center mb-4">
              <ArrowRight size={20} className="mr-2 text-purple-600" />
              Looking Ahead
            </h3>
            <div className="text-gray-700 leading-relaxed">
              {rendeblueitableText(
                editableData.conclusion,
                "conclusion",
                "Edit conclusion"
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 text-white p-4 sm:p-6 text-center">
          <p className="mb-3 text-xs sm:text-sm">
            {rendeblueitableInput(editableData.footer, "footer", "Edit footer")}
          </p>
          <a
            href="https://www.clipmailo.com"
            className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-300"
          >
            Poweblue by clipmailo.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default MinimalFour;
