import React from "react";
import "./ProjectLanguage.css";

const ProjectLanguage = ({ language }) => {

    const LANG_ENUMS = {
        "JavaScript": {
            name: "js",
            background_color: "#f1e05a",
            text_color: "#2e2e2c"
        },
        "TypeScript": {
            name: "ts",
            background_color: "#007acc",
            text_color: "#ffffff"
        },
        "Java": {
            name: "java",
            background_color: "#ffffff",
            text_color: "#e06c00"
        },
        "C": {
            name: "c",
            background_color: "#669ad3",
            text_color: "#ffffff"
        },
        "C#": {
            name: "c#",
            background_color: "#9b4f97",
            text_color: "#ffffff"
        },
        "C++": {
            name: "C++",
            background_color: "#0180cd",
            text_color: "#ffffff"
        },
        "Python": {
            name: "py",
            background_color: "#3674a5",
            text_color: "#fed346"
        },
        "Ruby": {
            name: "rb",
            background_color: "#701516",
            text_color: ""
        },
        "PHP": {
            name: "php",
            background_color: "#777bb3",
            text_color: "#222530"
        },
        "Swift": {
            name: "swift",
            background_color: "#f05138",
            text_color: "#ffffff"
        },
        "Go": {
            name: "go",
            background_color: "#007d9c",
            text_color: "#ffffff"
        },
        "Kotlin": {
            name: "kt",
            background_color: "#5b7cff",
            text_color: "#000000"
        },
        "Rust": {
            name: "rust",
            background_color: "#ffffff",
            text_color: "#000000"
        },
        "Shell": {
            name: "sh",
            background_color: "#0277bd",
            text_color: "#ffffff"
        },
        "PowerShell": {
            name: "ps",
            background_color: "#0277bd",
            text_color: "#ffffff"
        },
        "R": {
            name: "r",
            background_color: "#bbbdc0",
            text_color: "#2268bc"
        },
        "F#": {
            name: "f#",
            background_color: "#378bba",
            text_color: "#30b9db"
        },
        "Dart": {
            name: "dart",
            background_color: "#0076be",
            text_color: "#000000"
        },
    };

    const styledLanguage = LANG_ENUMS[language] ? LANG_ENUMS[language].name.toUpperCase() : language;

    return (
        <div className="project-language" title={language} style=
            {
                {
                    background: LANG_ENUMS[language] ? LANG_ENUMS[language].background_color : "#ffffff",
                    color: LANG_ENUMS[language] ? LANG_ENUMS[language].text_color : "#000000"
                }
            }>

            {styledLanguage}
        </div>
    )
}

export default ProjectLanguage;