"use client";

import { useState, useEffect } from "react";

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

  const textAreaStyles = {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "white",
    color: "#333",
    resize: "none",
    overflow: "hidden",
    minHeight: "100px",
  };

  const inputStyles = {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "white",
    color: "#333",
  };

  const renderEditableText = (content, field, placeholder = "Edit text") => {
    return isEditing ? (
      <textarea
        value={content}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        style={textAreaStyles}
        onInput={(e) => {
          e.target.style.height = 'auto'; // Reset height
          e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scrollHeight
        }}
      />
    ) : (
      <div dangerouslySetInnerHTML={{ __html: content }} />
    );
  };

  const renderEditableInput = (content, field, placeholder = "Edit text") => {
    return isEditing ? (
      <input
        type="text"
        value={content}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        style={inputStyles}
      />
    ) : (
      <span>{content}</span>
    );
  };

  if (!editableData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        fontSize: "18px",
        lineHeight: "1.6",
        color: "#333",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#2c3e50",
            marginBottom: "10px",
            fontFamily: "Playfair Display, serif",
          }}
        >
          {renderEditableInput(editableData.title, "title", "Edit title")}
        </h1>
        <p style={{ fontSize: "18px", color: "#7f8c8d", fontStyle: "italic" }}>
          By {renderEditableInput(editableData.author, "author", "Edit author")}{" "}
          | {renderEditableInput(editableData.date, "date", "Edit date")}
        </p>
      </header>

      <div style={{ marginBottom: "30px" }}>
        <img
          src={thumbnail}
          alt="Story Thumbnail"
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
      </div>

      <div
        style={{
          fontSize: "20px",
          color: "#34495e",
          marginBottom: "30px",
          fontStyle: "italic",
          borderLeft: "4px solid #3498db",
          paddingLeft: "20px",
        }}
      >
        {renderEditableText(
          editableData.introduction,
          "introduction",
          "Edit introduction"
        )}
      </div>

      {editableData.sections.map((section, index) => (
        <div key={index} style={{ marginBottom: "30px" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#2c3e50",
              marginBottom: "15px",
              fontFamily: "Playfair Display, serif",
            }}
          >
            {isEditing ? (
              <input
                type="text"
                value={section.title}
                onChange={(e) =>
                  handleSectionChange(index, "title", e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "24px",
                  border: "none",
                  borderBottom: "2px solid #3498db",
                  backgroundColor: "transparent",
                  color: "#2c3e50",
                  fontWeight: "bold",
                  fontFamily: "Playfair Display, serif",
                }}
              />
            ) : (
              section.title
            )}
          </h2>
          <div style={{ fontSize: "18px", color: "#34495e" }}>
            {isEditing ? (
              <textarea
                value={section.content}
                onChange={(e) =>
                  handleSectionChange(index, "content", e.target.value)
                }
                style={textAreaStyles}
                onInput={(e) => {
                  e.target.style.height = 'auto'; // Reset height
                  e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scrollHeight
                }}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            )}
          </div>
        </div>
      ))}

      <div
        style={{
          backgroundColor: "#f0f0f0",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <h3
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#2c3e50",
            marginBottom: "15px",
            fontFamily: "Playfair Display, serif",
          }}
        >
          Key Takeaways
        </h3>
        <ul style={{ paddingLeft: "20px", marginBottom: "0" }}>
          {editableData.keyTakeaways.map((point, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                fontSize: "18px",
                color: "#34495e",
              }}
            >
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
                  style={inputStyles}
                />
              ) : (
                <span>{point}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h3
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#2c3e50",
            marginBottom: "15px",
            fontFamily: "Playfair Display, serif",
          }}
        >
          Conclusion
        </h3>
        <div style={{ fontSize: "18px", color: "#34495e" }}>
          {renderEditableText(
            editableData.conclusion,
            "conclusion",
            "Edit conclusion"
          )}
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <a
          href="#"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            backgroundColor: "#3498db",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            fontSize: "18px",
            transition: "background-color 0.3s",
          }}
        >
          Watch Full Video
        </a>
      </div>

      <footer
        style={{
          borderTop: "1px solid #bdc3c7",
          paddingTop: "20px",
          textAlign: "center",
          fontSize: "16px",
          color: "#7f8c8d",
        }}
      >
        <p>
          {renderEditableInput(editableData.footer, "footer", "Edit footer")}
        </p>
        <p style={{ marginTop: "10px" }}>
          <a
            href="https://www.clipmailo.com"
            style={{ color: "#3498db", textDecoration: "none" }}
          >
            Powered by clipmailo.com
          </a>
        </p>
      </footer>
    </div>
  );
}
