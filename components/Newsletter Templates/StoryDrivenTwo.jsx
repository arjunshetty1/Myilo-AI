"use client";

import { useState, useEffect } from "react";

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
        className="w-full p-2 text-base border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 min-h-[120px] resize-none"
        style={{
          height: "auto",
          overflow: "hidden",
        }}
        onInput={(e) => {
          e.target.style.height = "auto"; // Reset the height
          e.target.style.height = e.target.scrollHeight + "px"; // Set the height to the scroll height
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
        className="w-full p-2 text-base border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
      />
    ) : (
      <span>{content}</span>
    );
  };

  if (!editableData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-['Roboto'] text-base leading-relaxed text-gray-800 max-w-4xl mx-auto p-5 bg-white">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 font-['Playfair_Display']">
          {rendeblueitableInput(editableData.title, "title", "Edit title")}
        </h1>
        <p className="text-lg text-gray-600 mb-5">
          By{" "}
          {rendeblueitableInput(editableData.author, "author", "Edit author")} |{" "}
          {rendeblueitableInput(editableData.date, "date", "Edit date")}
        </p>
        <div className="relative h-[400px] overflow-hidden rounded-lg">
          <img
            src={thumbnail}
            alt="Hero Image"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-white text-xl italic m-0">
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
        <div key={index} className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-5 font-['Playfair_Display']">
            {isEditing ? (
              <input
                type="text"
                value={section.title}
                onChange={(e) =>
                  handleSectionChange(index, "title", e.target.value)
                }
                className="w-full p-2 text-2xl border-none border-b-2 border-blue-500 focus:ring-2 focus:ring-blue-500 bg-transparent text-gray-900 font-semibold font-['Playfair_Display']"
              />
            ) : (
              section.title
            )}
          </h2>
          <div
            className={`flex ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            } gap-8 items-center`}
          >
            <div className="flex-1 text-base text-gray-800">
              {isEditing ? (
                <textarea
                  value={section.content}
                  onChange={(e) =>
                    handleSectionChange(index, "content", e.target.value)
                  }
                  className="w-full p-2 text-base border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 min-h-[120px] resize-none"
                  style={{
                    height: "auto",
                    overflow: "hidden",
                  }}
                  onInput={(e) => {
                    e.target.style.height = "auto"; // Reset the height
                    e.target.style.height = e.target.scrollHeight + "px"; // Set the height to the scroll height
                  }}
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="bg-gray-50 p-8 rounded-lg mb-10 shadow-sm">
        <h3 className="text-2xl font-semibold text-gray-900 mb-5 font-['Playfair_Display']">
          Key Takeaways
        </h3>
        <ul className="pl-5 m-0">
          {editableData.keyTakeaways.map((point, index) => (
            <li key={index} className="mb-3 text-base text-gray-800">
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
                  className="w-full p-2 text-base border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              ) : (
                <span>{point}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-10">
        <h3 className="text-2xl font-semibold text-gray-900 mb-5 font-['Playfair_Display']">
          Conclusion
        </h3>
        <div className="text-base text-gray-800 italic">
          {rendeblueitableText(
            editableData.conclusion,
            "conclusion",
            "Edit conclusion"
          )}
        </div>
      </div>

      <div className="text-center mb-10">
        <a
          href="#"
          className="inline-block px-6 py-3 bg-blue-500 text-white no-underline rounded-full font-medium text-lg transition-colors duration-300 hover:bg-blue-600 shadow-md"
        >
          Watch Full Video
        </a>
      </div>

      <footer className="border-t border-gray-200 pt-5 text-center text-sm text-gray-600">
        <p>
          {rendeblueitableInput(editableData.footer, "footer", "Edit footer")}
        </p>
        <p className="mt-3">
          <a
            href="https://www.clipmailo.com"
            className="text-blue-500 no-underline hover:text-blue-600"
          >
            Poweblue by clipmailo.com
          </a>
        </p>
      </footer>
    </div>
  );
}
