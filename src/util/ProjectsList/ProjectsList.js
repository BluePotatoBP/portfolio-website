const projects = {
    "likealight": {
        name: "likealight",
        decoName: "Like A Light",
        shortDesc: "Discord bot made in JS with DJS and AKAIRO",
        thumbnail: "https://cdn.discordapp.com/attachments/936748287707471933/1004237392464576593/newLAL.png?size=512",
        repo: "bluepotatobp/lal-akairo",
        tags: ["lal", "likealight", "light", "akairo", "discord", "discordjs", "like a light"]
    },

    "portfolio-website": {
        name: "portfolio-website",
        decoName: "Portfolio Website",
        shortDesc: "My portfolio website made in JS with REACT",
        thumbnail: "logo512.png",
        repo: "bluepotatobp/portfolio-website",
        tags: ["portfolio", "website", "react", "portfolio website"]
    },

    "void": {
        name: "void",
        decoName: "VOID",
        shortDesc: "Discord bot using the Sapphire framework",
        thumbnail: "",
        repo: "voidbotsprod/void-sapphire",
        tags: ["void", "sapphire", "discord", "discordjs", "voidbots"]
    },
}

export function getProjects() {
    return projects;
}

export function getProject(name) {
    return projects[name];
}