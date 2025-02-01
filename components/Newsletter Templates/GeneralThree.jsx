"use client";

import { Input } from "@/components/UI/shadcn-ui/input";
import { Textarea } from "@/components/UI/shadcn-ui/textarea";
import { useEffect, useState } from "react";
import LoaderSecondary from "../App Components/LoaderSecondary";


const GeneralThree = ({ thumbnail, dataToTemplate, isEditing, onUpdate }) => {
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
      i === index ? { ...item, ...value } : item
    );
    const updatedData = { ...editableData, [field]: updatedArray };
    setEditableData(updatedData);
    onUpdate(updatedData);
  };

  const rendeblueitableInput = (content, field, placeholder = "Edit text") => {
    return isEditing ? (
      <Input
        value={content}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 text-sm md:text-base border rounded text-black bg-white/90"
      />
    ) : (
      <span className="break-words">{content}</span>
    );
  };

  const rendeblueitableTextarea = (
    content,
    field,
    placeholder = "Edit text"
  ) => {
    return isEditing ? (
      <Textarea
        value={content}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 text-sm md:text-base border rounded resize-y min-h-[100px]"
      />
    ) : (
      <p className="prose prose-sm max-w-none">{content}</p>
    );
  };

  if (!editableData) {
    return <LoaderSecondary/>;
  }

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4 md:my-8">
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3 leading-tight">
            {rendeblueitableInput(editableData.title, "title", "Edit title")}
          </h1>
          <p className="text-sm sm:text-base md:text-lg opacity-90 leading-relaxed">
            {rendeblueitableInput(
              editableData.subtitle,
              "subtitle",
              "Edit subtitle"
            )}
          </p>
        </header>

        <main className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="w-full aspect-video md:aspect-[3/1]">
              <img
                src={thumbnail}
                alt="AI Concept"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="w-full space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 leading-snug">
                {rendeblueitableInput(
                  editableData.mainTitle,
                  "mainTitle",
                  "Edit main title"
                )}
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {rendeblueitableInput(
                  editableData.mainSubtitle,
                  "mainSubtitle",
                  "Edit main subtitle"
                )}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 md:p-6 rounded-lg">
            <h3 className="text-lg md:text-xl font-semibold text-blue-800 mb-3">
              Executive Summary
            </h3>
            <div className="text-base text-gray-700 leading-relaxed">
              {rendeblueitableTextarea(
                editableData.executiveSummary,
                "executiveSummary",
                "Edit executive summary"
              )}
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-800 mb-3">
              Breakthrough Capabilities
            </h3>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {editableData.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-blue-700 mb-2 md:mb-3">
                    {isEditing ? (
                      <Input
                        value={feature.title}
                        onChange={(e) =>
                          handleArrayInputChange("features", index, {
                            title: e.target.value,
                          })
                        }
                        className="w-full p-1 text-sm md:text-base bg-white"
                      />
                    ) : (
                      feature.title
                    )}
                  </h4>
                  <div className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {isEditing ? (
                      <Textarea
                        value={feature.desc}
                        onChange={(e) =>
                          handleArrayInputChange("features", index, {
                            desc: e.target.value,
                          })
                        }
                        className="w-full p-1 text-sm md:text-base bg-white min-h-[80px]"
                      />
                    ) : (
                      <p className="prose prose-sm max-w-none">{feature.desc}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h3 className="text-xl md:text-2xl font-semibold text-purple-800 mb-3">
              Game-Changing Applications
            </h3>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {editableData.applications.map((application, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500 hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-purple-700 mb-2 md:mb-3">
                    {isEditing ? (
                      <Input
                        value={application.title}
                        onChange={(e) =>
                          handleArrayInputChange("applications", index, {
                            title: e.target.value,
                          })
                        }
                        className="w-full p-1 text-sm md:text-base bg-white"
                      />
                    ) : (
                      application.title
                    )}
                  </h4>
                  <div className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {isEditing ? (
                      <Textarea
                        value={application.desc}
                        onChange={(e) =>
                          handleArrayInputChange("applications", index, {
                            desc: e.target.value,
                          })
                        }
                        className="w-full p-1 text-sm md:text-base bg-white min-h-[80px]"
                      />
                    ) : (
                      <p className="prose prose-sm max-w-none">{application.desc}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-800 mb-3">
              Future Implications
            </h3>
            <ul className="space-y-3 md:space-y-4">
              {editableData.futureImplications.map((implication, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <div className="flex-1">
                    {isEditing ? (
                      <Input
                        value={implication}
                        onChange={(e) =>
                          handleArrayInputChange(
                            "futureImplications",
                            index,
                            e.target.value
                          )
                        }
                        className="w-full p-1 text-sm md:text-base bg-white"
                      />
                    ) : (
                      <p className="text-base text-gray-600 leading-relaxed">{implication}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-4 md:p-6 rounded-lg">
            <h3 className="text-lg md:text-xl font-semibold text-blue-800 mb-3">
              Bottom Line
            </h3>
            <div className="text-base text-gray-700 leading-relaxed">
              {rendeblueitableTextarea(
                editableData.bottomLine,
                "bottomLine",
                "Edit bottom line"
              )}
            </div>
          </div>
        </main>

        <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 md:p-6 text-center">
          {/* <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base font-semibold hover:text-yellow-300 transition-colors block mb-2 md:mb-3"
          >
            Watch the full video on Youtube
          </a> */}
          <a
            href="https://clipmailo.com/"
            className="text-xs md:text-sm opacity-75 hover:opacity-100 transition-opacity"
          >
            Powered by clipmailo.com
          </a>
        </footer>
      </div>
    </div>
  );
};

export default GeneralThree;