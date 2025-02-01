"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import LoaderSecondary from "../App Components/LoaderSecondary";


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

  const rendeblueitableText = (content, field, placeholder = "Edit text") => {
    if (isEditing) {
      return (
        <textarea
          value={content}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full p-2 text-sm md:text-base border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 resize-y min-h-[100px] md:min-h-[120px]"
        />
      );
    }
    return (
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="prose max-w-none"
      />
    );
  };

  const rendeblueitableInput = (content, field, placeholder = "Edit text") => {
    if (isEditing) {
      return (
        <input
          type="text"
          value={content}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full p-2 text-sm md:text-base border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
        />
      );
    }
    return <span className="break-words">{content}</span>;
  };

  if (!editableData) {
    return <LoaderSecondary/>;
  }

  return (
    <div className="font-sans text-sm bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative">
          <div className="w-full aspect-video overflow-hidden">
            <img
              src={thumbnail}
              alt="Thumbnail"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-4 md:p-6">
            <h1 className="text-xl md:text-3xl font-semibold text-[#eae9e9] mb-2 leading-tight">
              {rendeblueitableInput(editableData.title, "title", "Edit title")}
            </h1>
          </div>
        </div>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <h2 className="text-lg md:text-2xl font-semibold text-gray-800">
            {rendeblueitableInput(
              editableData.mainTitle,
              "mainTitle",
              "Edit main title"
            )}
          </h2>

          <div className="flex flex-wrap gap-2">
            {editableData.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs md:text-sm"
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) =>
                      handleArrayInputChange("tags", index, e.target.value)
                    }
                    className="min-w-[80px] p-0 text-xs md:text-sm bg-transparent border-none"
                  />
                ) : (
                  tag
                )}
              </span>
            ))}
          </div>

          <div className="text-sm md:text-base text-gray-600 leading-relaxed">
            {rendeblueitableText(
              editableData.summary,
              "summary",
              "Edit summary"
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg space-y-3">
            <h3 className="text-base md:text-lg font-semibold text-gray-800">
              Key Highlights
            </h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              {editableData.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <ChevronRight
                    size={16}
                    className="mr-1 md:mr-2 text-blue-500 flex-shrink-0 mt-1"
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
                      className="w-full p-1 md:p-2 text-sm bg-white/50 border-none"
                    />
                  ) : (
                    <span className="break-words">{point}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 md:space-y-6">
            {editableData.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) =>
                        handleSectionChange(index, "title", e.target.value)
                      }
                      className="w-full p-1 md:p-2 text-base md:text-lg bg-transparent border-none font-semibold"
                    />
                  ) : (
                    section.title
                  )}
                </h3>
                <div className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {isEditing ? (
                    <textarea
                      value={section.content}
                      onChange={(e) =>
                        handleSectionChange(index, "content", e.target.value)
                      }
                      className="w-full p-2 text-sm border rounded-md resize-y min-h-[80px]"
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{ __html: section.content }}
                      className="prose max-w-none"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg space-y-3">
            <h3 className="text-base md:text-lg font-semibold text-gray-800">
              Conclusion
            </h3>
            <div className="text-sm md:text-base text-gray-600 leading-relaxed">
              {rendeblueitableText(
                editableData.conclusion,
                "conclusion",
                "Edit conclusion"
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 text-white p-4 text-center space-y-1">
          <p className="text-xs md:text-sm break-words px-2">
            {rendeblueitableInput(editableData.footer, "footer", "Edit footer")}
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



export default GeneralOne;
