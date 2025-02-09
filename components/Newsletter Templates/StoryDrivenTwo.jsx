"use client";

import { useState, useEffect } from "react";
import LoaderSecondary from "../App Components/LoaderSecondary";

export default function StoryDrivenTwo({
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
        className="w-full p-2 text-base md:text-lg border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 min-h-[120px] resize-none"
        style={{
          height: "auto",
          overflow: "hidden",
        }}
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
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
        className="w-full p-2 text-base md:text-lg border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
      />
    ) : (
      <span>{content}</span>
    );
  };

  if (!editableData) {
    return <LoaderSecondary />;
  }

  return (
    <div className="font-sans text-gray-800 max-w-4xl mx-auto p-4 md:p-6 lg:p-8 bg-white">
      <header className="mb-8 md:mb-12">
      
        <div className="relative aspect-video overflow-hidden rounded-lg shadow-md">
          <img
            src={thumbnail}
            alt="Hero Image"
            className="w-full h-full object-cover"
          />
          <div className="p-4 md:p-6">
            <p className="text-gray-900 text-lg md:text-xl italic m-0 leading-snug">
              {rendeblueitableText(
                editableData.introduction,
                "introduction",
                "Edit introduction"
              )}
            </p>
          </div>
        </div>
      </header>

      {editableData.sections.map((section, index) => (
        <div key={index} className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 font-playfair">
            {isEditing ? (
              <input
                type="text"
                value={section.title}
                onChange={(e) =>
                  handleSectionChange(index, "title", e.target.value)
                }
                className="w-full p-2 text-xl md:text-2xl border-b-2 border-blue-500 focus:ring-2 focus:ring-blue-500 bg-transparent text-gray-900 font-semibold font-playfair"
              />
            ) : (
              section.title
            )}
          </h2>
          <div
            className={`flex flex-col md:flex-row ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-6 md:gap-8 items-start`}
          >
            <div className="w-full md:flex-1 text-base md:text-lg text-gray-800">
              {isEditing ? (
                <textarea
                  value={section.content}
                  onChange={(e) =>
                    handleSectionChange(index, "content", e.target.value)
                  }
                  className="w-full p-2 text-base md:text-lg border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 min-h-[120px] resize-none"
                  style={{
                    height: "auto",
                    overflow: "hidden",
                  }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="bg-gray-50 p-6 md:p-8 rounded-lg mb-8 md:mb-12 shadow-sm">
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 font-playfair">
          Key Takeaways
        </h3>
        <ul className="pl-4 md:pl-6 space-y-3">
          {editableData.keyTakeaways.map((point, index) => (
            <li key={index} className="text-base md:text-lg text-gray-800">
              {isEditing ? (
                <input
                  type="text"
                  value={point}
                  onChange={(e) =>
                    handleArrayInputChange(
                      "keyTakeaways",
                      index,
                      e.target.value
                    )
                  }
                  className="w-full p-2 text-base md:text-lg border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              ) : (
                <span>{point}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8 md:mb-12">
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 font-playfair">
          Conclusion
        </h3>
        <div className="text-base md:text-lg text-gray-800 italic">
          {rendeblueitableText(
            editableData.conclusion,
            "conclusion",
            "Edit conclusion"
          )}
        </div>
      </div>

      <footer className="border-t border-gray-200 pt-6 text-center text-sm md:text-base text-gray-600">
        <p>
          {rendeblueitableInput(editableData.footer, "footer", "Edit footer")}
        </p>
        <p className="mt-3 md:mt-4">
          <a
            href="https://www.clipmailo.com"
            className="text-blue-500 hover:text-blue-600"
          >
            Powered by clipmailo.com
          </a>
        </p>
      </footer>
    </div>
  );
}
