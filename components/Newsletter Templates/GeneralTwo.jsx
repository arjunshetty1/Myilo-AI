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

  const renderEditableText = (content, field, placeholder = "Edit text") => {
    if (isEditing) {
      return (
        <Textarea
          value={content}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full p-2 text-sm border rounded"
        />
      );
    }
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  const renderEditableInput = (content, field, placeholder = "Edit text") => {
    if (isEditing) {
      return (
        <Input
          value={content}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full p-2 text-sm border rounded text-black"
        />
      );
    }
    return <span>{content}</span>;
  };

  if (!editableData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans bg-gray-100">
      <div className=" mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <header className="relative">
          <div className="w-full h-40 sm:h-48 overflow-hidden">
            <img
              src={thumbnail}
              alt="Newsletter Thumbnail"
              className="w-full h-full object-cover blur-sm"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-teal-800 flex flex-col justify-end p-3 sm:p-4">
            <h1 className="text-xl sm:text-2xl font-semibold text-white mb-1 sm:mb-2">
              {renderEditableInput(editableData.title, "title", "Edit title")}
            </h1>
            {/* <div className="flex flex-wrap gap-2 items-center text-xs text-white">
              <span className="bg-teal-700 px-2 py-1 rounded-full">
                {renderEditableInput(
                  editableData.author,
                  "author",
                  "Edit author"
                )}
              </span>
              <span className="bg-teal-700 px-2 py-1 rounded-full">
                {renderEditableInput(editableData.date, "date", "Edit date")}
              </span>
            </div> */}
          </div>
        </header>

        <main className="p-3 sm:p-4 space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            {renderEditableInput(
              editableData.mainTitle,
              "mainTitle",
              "Edit main title"
            )}
          </h2>

          <div className="text-sm text-gray-600">
            {renderEditableText(
              editableData.summary,
              "summary",
              "Edit summary"
            )}
          </div>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-3 rounded-r-lg">
            <h3 className="text-md sm:text-lg font-semibold text-teal-800 mb-2">
              Key Points:
            </h3>
            <ul className="space-y-2">
              {editableData.keyPoints.map((point, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-teal-500">•</span>
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
                      className="flex-grow p-1 text-sm bg-white text-gray-800"
                    />
                  ) : (
                    <span className="text-sm">{point}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {editableData.sections.map((section, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg">
              <h3 className="text-md sm:text-lg font-bold text-gray-800 mb-2">
                {isEditing ? (
                  <Input
                    value={section.title}
                    onChange={(e) =>
                      handleSectionChange(index, "title", e.target.value)
                    }
                    className="w-full p-1 text-sm bg-white text-gray-800"
                  />
                ) : (
                  section.title
                )}
              </h3>
              <div className="text-sm text-gray-600">
                {isEditing ? (
                  <Textarea
                    value={section.content}
                    onChange={(e) =>
                      handleSectionChange(index, "content", e.target.value)
                    }
                    className="w-full p-1 text-sm bg-white text-gray-800"
                  />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                )}
              </div>
            </div>
          ))}

          <div className="bg-gray-100 p-3 rounded-lg">
            <h3 className="text-md sm:text-lg font-bold text-gray-800 mb-2">
              Conclusion
            </h3>
            <div className="text-sm text-gray-600">
              {renderEditableText(
                editableData.conclusion,
                "conclusion",
                "Edit conclusion"
              )}
            </div>
          </div>

          <div className="text-center">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
            >
              Watch Full Video
            </a>
          </div>
        </main>

        <footer className="bg-gray-800 text-white p-3 text-center">
          <p className="text-sm font-semibold mb-1">
            {renderEditableInput(editableData.footer, "footer", "Edit footer")}
          </p>
          <a href="https://www.clipmailo.com" className="text-xs text-gray-400">
            Powered by clipmailo.com
          </a>
        </footer>
      </div>
    </div>
  );
};

export default GeneralTwo;
