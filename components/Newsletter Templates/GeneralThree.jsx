"use client"

import { Input } from "@/components/UI/shadcn-ui/input";
import { Textarea } from "@/components/UI/shadcn-ui/textarea";
import { useEffect, useState } from "react";

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

  const renderEditableInput = (content, field, placeholder = "Edit text") => {
    return isEditing ? (
      <Input
        value={content}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 text-sm border rounded text-black"
      />
    ) : (
      <span>{content}</span>
    );
  };

  const renderEditableTextarea = (
    content,
    field,
    placeholder = "Edit text"
  ) => {
    return isEditing ? (
      <Textarea
        value={content}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 text-sm border rounded"
      />
    ) : (
      <p>{content}</p>
    );
  };

  if (!editableData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <div className=" mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">
            {renderEditableInput(editableData.title, "title", "Edit title")}
          </h1>
          <p className="text-sm sm:text-base opacity-90">
            {renderEditableInput(
              editableData.subtitle,
              "subtitle",
              "Edit subtitle"
            )}
          </p>
        </header>

        <main className="p-3 space-y-4">
          <div className="flex flex-col ">
            <div className="w-full">
              <img
                src={thumbnail}
                alt="AI Concept"
                className="w-full h-32 sm:h-40 object-cover rounded-lg shadow-md blur-sm"
              />
            </div>
            <div className="w-full my-2">
              <h2 className="text-lg sm:text-md font-bold text-gray-800 mb-2">
                {renderEditableInput(
                  editableData.mainTitle,
                  "mainTitle",
                  "Edit main title"
                )}
              </h2>
              <p className="text-sm text-gray-600 ">
                {renderEditableInput(
                  editableData.mainSubtitle,
                  "mainSubtitle",
                  "Edit main subtitle"
                )}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <h3 className="text-md sm:text-lg font-semibold text-blue-800 mb-2">
              Executive Summary
            </h3>
            <div className="text-sm text-gray-700">
              {renderEditableTextarea(
                editableData.executiveSummary,
                "executiveSummary",
                "Edit executive summary"
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Breakthrough Capabilities
            </h3>
            <div className="md:grid md:grid-cols-1 gap-4 flex flex-col">
              {editableData.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded-lg shadow border-l-4 border-blue-500"
                >
                  <h4 className="font-semibold text-blue-700 mb-1">
                    {isEditing ? (
                      <Input
                        value={feature.title}
                        onChange={(e) =>
                          handleArrayInputChange("features", index, {
                            title: e.target.value,
                          })
                        }
                        className="w-full p-1 text-sm bg-white"
                      />
                    ) : (
                      feature.title
                    )}
                  </h4>
                  <div className="text-sm text-gray-600">
                    {isEditing ? (
                      <Textarea
                        value={feature.desc}
                        onChange={(e) =>
                          handleArrayInputChange("features", index, {
                            desc: e.target.value,
                          })
                        }
                        className="w-full p-1 text-sm bg-white"
                      />
                    ) : (
                      <p>{feature.desc}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              Game-Changing Applications
            </h3>
            <div className="md:grid md:grid-cols-1 gap-4 flex flex-col">
              {editableData.applications.map((application, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded-lg shadow border-l-4 border-purple-500"
                >
                  <h4 className="font-semibold text-purple-700 mb-1">
                    {isEditing ? (
                      <Input
                        value={application.title}
                        onChange={(e) =>
                          handleArrayInputChange("applications", index, {
                            title: e.target.value,
                          })
                        }
                        className="w-full p-1 text-sm bg-white"
                      />
                    ) : (
                      application.title
                    )}
                  </h4>
                  <div className="text-sm text-gray-600">
                    {isEditing ? (
                      <Textarea
                        value={application.desc}
                        onChange={(e) =>
                          handleArrayInputChange("applications", index, {
                            desc: e.target.value,
                          })
                        }
                        className="w-full p-1 text-sm bg-white"
                      />
                    ) : (
                      <p>{application.desc}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Future Implications
            </h3>
            <ul className="space-y-2 w-full">
              {editableData.futureImplications.map((implication, index) => (
                <li key={index} className="flex items-start w-full">
                  <span className="text-blue-500 mr-2">•</span>
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
                        className="w-full p-1 text-sm bg-white"
                      />
                    ) : (
                      <p className="text-sm text-gray-600">{implication}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-4 rounded">
            <h3 className="text-md sm:text-lg font-semibold text-blue-800 mb-2">
              Bottom Line
            </h3>
            <div className="text-sm text-gray-700">
              {renderEditableTextarea(
                editableData.bottomLine,
                "bottomLine",
                "Edit bottom line"
              )}
            </div>
          </div>
        </main>

        <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 text-center">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold hover:text-yellow-300 transition block mb-2"
          >
            Watch the full video on Youtube
          </a>
          <a
            href="https://clipmailo.com/"
            className="text-xs opacity-75 hover:opacity-100"
          >
            Powered by clipmailo.com
          </a>
        </footer>
      </div>
    </div>
  );
};

export default GeneralThree;
