"use client";
import { useState, useEffect } from "react";

const MinimalOne = ({ thumbnail, dataToTemplate, isEditing, onUpdate }) => {
  const [editabledataToTemplate, setEditabledataToTemplate] =
    useState(dataToTemplate);

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
    const updateddataToTemplate = {
      ...editabledataToTemplate,
      [field]: updatedArray,
    };
    setEditabledataToTemplate(updateddataToTemplate);
    onUpdate(updateddataToTemplate);
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = editabledataToTemplate.sections.map((section, i) =>
      i === index ? { ...section, [field]: value } : section
    );
    const updateddataToTemplate = {
      ...editabledataToTemplate,
      sections: updatedSections,
    };
    setEditabledataToTemplate(updateddataToTemplate);
    onUpdate(updateddataToTemplate);
  };

  const adjustHeight = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const rendeblueitableText = (content, field, placeholder = "Edit text") => {
    if (isEditing) {
      return (
        <textarea
          value={content || ""}
          onChange={(e) => {
            handleInputChange(field, e.target.value);
            adjustHeight(e);
          }}
          placeholder={placeholder}
          className="w-full p-2 text-sm md:text-base bg-white/50 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-800 resize-y min-h-[120px]"
          onInput={adjustHeight}
        />
      );
    }
    return (
      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: content || "" }}
      />
    );
  };

  const rendeblueitableInput = (content, field, placeholder = "Edit text") => {
    if (isEditing) {
      return (
        <input
          type="text"
          value={content || ""}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full p-1 text-sm md:text-base bg-transparent border-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
        />
      );
    }
    return <span className="break-words">{content}</span>;
  };

  return (
    <div className="font-sans min-h-screen p-4 sm:p-6">
      <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl">
      <div className="relative">
  <div className="w-full aspect-video md:aspect-[3/1] overflow-hidden">
    <img
      src={thumbnail}
      alt="Newsletter Thumbnail"
      className="w-full h-full object-cover object-center"
    />
  </div>
  <div className="p-4 md:p-6">
    <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 text-gray-900 leading-tight">
      {isEditing ? (
        <input
          type="text"
          value={editabledataToTemplate.title || ""}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Edit title"
          className="w-full p-1 px-4 text-2xl md:text-4xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
        />
      ) : (
        editabledataToTemplate.title
      )}
    </h1>
    <p className="text-lg md:text-xl text-gray-700">
      {isEditing ? (
        <input
          type="text"
          value={editabledataToTemplate.subtitle || ""}
          onChange={(e) => handleInputChange("subtitle", e.target.value)}
          placeholder="Edit subtitle"
          className="w-full p-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-500"
        />
      ) : (
        editabledataToTemplate.subtitle
      )}
    </p>
  </div>
</div>


        <div className="p-4 md:p-6 lg:p-8">
          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
            {editabledataToTemplate.tags &&
              editabledataToTemplate.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs md:text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded"
                >
                  {isEditing ? (
                    <input
                      type="text"
                      value={tag || ""}
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

          <div className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
            {rendeblueitableText(
              editabledataToTemplate.summary,
              "summary",
              "Edit summary"
            )}
          </div>

          <div className="space-y-6 md:space-y-8 mb-6">
            {editabledataToTemplate.sections &&
              editabledataToTemplate.sections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                    {isEditing ? (
                      <input
                        type="text"
                        value={section.title || ""}
                        onChange={(e) =>
                          handleSectionChange(index, "title", e.target.value)
                        }
                        className="w-full p-1 text-lg md:text-xl bg-transparent border-none font-semibold"
                      />
                    ) : (
                      section.title
                    )}
                  </h3>
                  <div className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {isEditing ? (
                      <textarea
                        value={section.content || ""}
                        onChange={(e) =>
                          handleSectionChange(index, "content", e.target.value)
                        }
                        className="w-full p-2 text-sm md:text-base bg-white/50 border rounded-md focus:ring-2 focus:ring-blue-500 resize-y min-h-[120px]"
                        onInput={adjustHeight}
                      />
                    ) : (
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: section.content || "",
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
          </div>

          <div className="flex justify-center mb-6 md:mb-8"></div>
        </div>

        <div className="bg-gray-100 text-gray-600 p-4 md:p-6 text-center">
          <p className="text-sm md:text-base w-full">
            {rendeblueitableInput(
              editabledataToTemplate.footer,
              "footer",
              "Edit footer"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MinimalOne;
