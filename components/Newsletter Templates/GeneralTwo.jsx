"use client";

import { Input } from "@/components/UI/shadcn-ui/input";
import { Textarea } from "@/components/UI/shadcn-ui/textarea";
import { useEffect, useState } from "react";

const GeneralTwo = ({ thumbnail, dataToTemplate, isEditing, onUpdate }) => {
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
        <Textarea
          value={content}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full p-2 text-sm md:text-base border rounded resize-y min-h-[100px]"
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
        <Input
          value={content}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full p-2 text-sm md:text-base border rounded text-black bg-white/90"
        />
      );
    }
    return <span className="break-words">{content}</span>;
  };

  if (!editableData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-4 md:my-8">
        <header className="relative">
          <div className="w-full aspect-video md:aspect-[3/1] overflow-hidden">
            <img
              src={thumbnail}
              alt="Newsletter Thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent/20 to-teal-800/90 flex flex-col justify-end p-4 md:p-6">
            <h1 className="text-2xl md:text-4xl font-semibold text-white mb-2 md:mb-3 leading-tight">
              {rendeblueitableInput(editableData.title, "title", "Edit title")}
            </h1>
          </div>
        </header>

        <main className="p-4 md:p-6 space-y-4 md:space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-snug">
            {rendeblueitableInput(
              editableData.mainTitle,
              "mainTitle",
              "Edit main title"
            )}
          </h2>

          <div className="text-base md:text-lg text-gray-600 leading-relaxed">
            {rendeblueitableText(
              editableData.summary,
              "summary",
              "Edit summary"
            )}
          </div>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg">
            <h3 className="text-lg md:text-xl font-semibold text-teal-800 mb-3">
              Key Points:
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {editableData.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-teal-500 mt-1">•</span>
                  {isEditing ? (
                    <Input
                      value={point}
                      onChange={(e) =>
                        handleArrayInputChange(
                          "keyPoints",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-grow p-1 text-sm md:text-base bg-white text-gray-800"
                    />
                  ) : (
                    <span className="text-sm md:text-base break-words">
                      {point}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {editableData.sections.map((section, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                {isEditing ? (
                  <Input
                    value={section.title}
                    onChange={(e) =>
                      handleSectionChange(index, "title", e.target.value)
                    }
                    className="w-full p-1 text-sm md:text-base bg-white text-gray-800"
                  />
                ) : (
                  section.title
                )}
              </h3>
              <div className="text-base text-gray-600 leading-relaxed">
                {isEditing ? (
                  <Textarea
                    value={section.content}
                    onChange={(e) =>
                      handleSectionChange(index, "content", e.target.value)
                    }
                    className="w-full p-1 text-sm md:text-base bg-white text-gray-800 min-h-[120px]"
                  />
                ) : (
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                )}
              </div>
            </div>
          ))}

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
              Conclusion
            </h3>
            <div className="text-base md:text-lg text-gray-600 leading-relaxed">
              {rendeblueitableText(
                editableData.conclusion,
                "conclusion",
                "Edit conclusion"
              )}
            </div>
          </div>
        </main>

        <footer className="bg-gray-800 text-white p-4 md:p-6 text-center">
          <p className="text-sm md:text-base font-semibold mb-2">
            {rendeblueitableInput(editableData.footer, "footer", "Edit footer")}
          </p>
          <a
            href="https://www.clipmailo.com"
            className="text-xs md:text-sm text-gray-400 hover:text-gray-300"
          >
            Powered by clipmailo.com
          </a>
        </footer>
      </div>
    </div>
  );
};

export default GeneralTwo;
