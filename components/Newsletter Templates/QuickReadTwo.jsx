"use client";

import { useEffect, useState } from "react";
import { Clock, Zap, ArrowRight, Sparkles } from "lucide-react";

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
          className="w-full p-3 text-sm md:text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white/90 text-gray-800 resize-y min-h-[120px]"
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
          className="w-full p-2 text-sm md:text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white/90 text-gray-800"
        />
      );
    }
    return <span className="break-words">{content}</span>;
  };

  if (!editableData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="relative">
            <div className="aspect-video bg-gray-100 overflow-hidden">
              <img
                src={thumbnail}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/80 to-purple-500/80">
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-2 text-sm md:text-base">
                    <Clock size={18} className="flex-shrink-0" />
                    <span>{editableData.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 md:px-6 -mt-8 relative z-10">
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                {rendeblueitableInput(
                  editableData.title,
                  "title",
                  "Edit title"
                )}
              </h1>
              <h2 className="text-lg md:text-xl text-indigo-600 mt-2">
                {rendeblueitableInput(
                  editableData.mainTitle,
                  "mainTitle",
                  "Edit main title"
                )}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {editableData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium text-xs md:text-sm"
                >
                  {isEditing ? (
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) =>
                        handleArrayInputChange("tags", index, e.target.value)
                      }
                      className="min-w-[100px] bg-transparent border-none text-white placeholder-white/70"
                    />
                  ) : (
                    <span className="flex items-center">
                      <Sparkles size={12} className="mr-1 flex-shrink-0" />
                      {tag}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 md:p-6 mb-6">
              <div className="text-gray-700 leading-relaxed">
                {rendeblueitableText(
                  editableData.summary,
                  "summary",
                  "Edit summary"
                )}
              </div>
            </div>

            <div className="space-y-3 md:space-y-4 mb-6">
              {editableData.keyPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start bg-white rounded-xl p-3 shadow-sm border border-indigo-100"
                >
                  <Zap
                    size={20}
                    className="text-indigo-500 mt-1 flex-shrink-0"
                  />
                  <div className="ml-3 flex-1">
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
                        className="w-full p-2 text-sm md:text-base bg-transparent border-none"
                      />
                    ) : (
                      point
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-4 md:p-6 text-white mb-6">
              <h3 className="font-semibold mb-3 md:mb-4 flex items-center">
                <ArrowRight size={20} className="mr-2 flex-shrink-0" />
                Final Thoughts
              </h3>
              <div className="text-white/90 leading-relaxed">
                {rendeblueitableText(
                  editableData.conclusion,
                  "conclusion",
                  "Edit conclusion"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickReadTwo;
