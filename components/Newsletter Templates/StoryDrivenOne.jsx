"use client";

import { useState, useEffect } from "react";
import LoaderSecondary from "../App Components/LoaderSecondary";


export default function StoryDrivenOne({
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

  const textAreaStyles = "w-full p-2 text-base md:text-lg border rounded bg-white text-gray-700 resize-none overflow-hidden min-h-[100px]";
  const inputStyles = "w-full p-2 text-base md:text-lg border rounded bg-white text-gray-700";

  const rendeblueitableText = (content, field, placeholder = "Edit text") => {
    return isEditing ? (
      <textarea
        value={content}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        className={textAreaStyles}
        onInput={(e) => {
          e.target.style.height = 'auto';
          e.target.style.height = `${e.target.scrollHeight}px`;
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
        className={inputStyles}
      />
    ) : (
      <span>{content}</span>
    );
  };

  if (!editableData) {
    return <LoaderSecondary/>;
  }

  return (
    <div className="font-serif text-base md:text-lg leading-relaxed text-gray-700 max-w-screen-lg mx-auto p-4 md:p-6">
      <header className="text-center mb-6 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 font-playfair">
          {rendeblueitableInput(editableData.title, "title", "Edit title")}
        </h1>
        <p className="text-gray-600 italic">
          By {rendeblueitableInput(editableData.author, "author", "Edit author")}{" "}
          | {rendeblueitableInput(editableData.date, "date", "Edit date")}
        </p>
      </header>

      <div className="mb-6 md:mb-10">
        <img
          src={thumbnail}
          alt="Story Thumbnail"
          className="w-full h-auto rounded-lg"
        />
      </div>

      <div className="text-lg md:text-xl text-gray-700 mb-6 md:mb-10 italic border-l-4 border-blue-500 pl-4 md:pl-6">
        {rendeblueitableText(
          editableData.introduction,
          "introduction",
          "Edit introduction"
        )}
      </div>

      {editableData.sections.map((section, index) => (
        <div key={index} className="mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-playfair">
            {isEditing ? (
              <input
                type="text"
                value={section.title}
                onChange={(e) =>
                  handleSectionChange(index, "title", e.target.value)
                }
                className="w-full p-2 text-2xl md:text-3xl border-b-2 border-blue-500 bg-transparent text-gray-800 font-bold font-playfair"
              />
            ) : (
              section.title
            )}
          </h2>
          <div className="text-gray-700">
            {isEditing ? (
              <textarea
                value={section.content}
                onChange={(e) =>
                  handleSectionChange(index, "content", e.target.value)
                }
                className={textAreaStyles}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            )}
          </div>
        </div>
      ))}

      <div className="bg-gray-100 p-4 md:p-6 rounded-lg mb-6 md:mb-10">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-playfair">
          Key Takeaways
        </h3>
        <ul className="pl-4 md:pl-6 space-y-2">
          {editableData.keyTakeaways.map((point, index) => (
            <li key={index} className="text-gray-700">
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
                  className={inputStyles}
                />
              ) : (
                <span>{point}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6 md:mb-10">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-playfair">
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

      

      <footer className="border-t border-gray-300 pt-6 text-center text-gray-600">
        <p>
          {rendeblueitableInput(editableData.footer, "footer", "Edit footer")}
        </p>
        <p className="mt-2">
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