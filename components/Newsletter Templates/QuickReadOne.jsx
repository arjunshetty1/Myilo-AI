"use client";

import { useEffect, useState } from "react";
import { Clock, Tag, ChevronRight } from "lucide-react";

const QuickReadOne = ({ thumbnail, dataToTemplate, isEditing, onUpdate }) => {
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
          className="w-full p-3 text-sm md:text-base border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white/90 text-gray-800 resize-y min-h-[120px]"
        />
      );
    }
    return (
      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
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
          className="w-full p-2 text-sm md:text-base border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white/90 text-gray-800"
        />
      );
    }
    return <span className="break-words">{content}</span>;
  };

  if (!editableData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden m-4">
      <div className="relative aspect-video bg-gray-100">
        <img
          src={thumbnail}
          alt="Video thumbnail"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6 flex flex-col justify-end">
          <div className="text-white space-y-2">
            <h1 className="text-xl md:text-2xl font-bold">
              {rendeblueitableInput(editableData.title, "title", "Edit title")}
            </h1>
            <div className="flex items-center space-x-2 text-xs md:text-sm">
              <Clock size={16} className="flex-shrink-0" />
              <span>{editableData.date}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          {rendeblueitableInput(
            editableData.mainTitle,
            "mainTitle",
            "Edit main title"
          )}
        </h2>

        <div className="flex flex-wrap gap-2">
          {editableData.tags.map((tag, index) => (
            <div
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs md:text-sm"
            >
              <Tag size={12} className="mr-1 flex-shrink-0" />
              {isEditing ? (
                <input
                  type="text"
                  value={tag}
                  onChange={(e) =>
                    handleArrayInputChange("tags", index, e.target.value)
                  }
                  className="min-w-[80px] bg-transparent border-none p-0"
                />
              ) : (
                tag
              )}
            </div>
          ))}
        </div>

        <div className="text-gray-600 leading-relaxed">
          {rendeblueitableText(editableData.summary, "summary", "Edit summary")}
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 md:p-6 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-3 md:mb-4">
            Quick Takeaways
          </h3>
          <ul className="space-y-2 md:space-y-3">
            {editableData.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <ChevronRight
                  size={16}
                  className="text-purple-500 mt-1 flex-shrink-0"
                />
                <div className="ml-2 flex-1">
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
                      className="w-full p-2 text-sm md:text-base bg-white border rounded-md"
                    />
                  ) : (
                    point
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 p-4 md:p-6 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-3 md:mb-4">
            Bottom Line
          </h3>
          <div className="text-gray-600 leading-relaxed">
            {rendeblueitableText(
              editableData.conclusion,
              "conclusion",
              "Edit conclusion"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickReadOne;
