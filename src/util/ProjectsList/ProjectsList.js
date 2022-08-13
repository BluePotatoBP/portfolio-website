const projects = {
    "likealight": {
        name: "likealight",
        decoName: "Like A Light",
        shortDesc: "Discord bot made in JS with DJS and AKAIRO",
        description: "Like a Light is a Discord bot made in JavaScript with Discord.JS and the AKAIRO framework, it has over 50 top level commands, 100+ subcommands and a user friendly prompt system!",
        thumbnail: "https://cdn.discordapp.com/attachments/936748287707471933/1004237392464576593/newLAL.png?size=1024",
        repo: "lal-akairo",
        tags: ["lal", "likealight", "light", "akairo", "discord", "discordjs", "like a light"]
    },

    "portfolio-website": {
        name: "portfolio-website",
        decoName: "Portfolio Website",
        shortDesc: "My portfolio website made in JS with REACT",
        description: "This is my portfolio website made in JavaScript with ReactJS, it is there mostly to show my completed/semi-completed projects and because I had lots of fun learning React!",
        thumbnail: "https://cdn.discordapp.com/attachments/936748287707471933/1006650092880679063/portfolio-icon-512.png?size=1024",
        repo: "portfolio-website",
        tags: ["portfolio", "website", "react", "portfolio website"]
    }
}

export function getProjects() {
    return projects;
}

export function getProject(name) {
    return projects[name];
}