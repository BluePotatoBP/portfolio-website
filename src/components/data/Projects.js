let projects = [
    {
        name: "portfoliowebsite",
        styled_name: "Portfolio Website",
        short_desc: "Portfolio Website made in JS with React framework.",
        desc: "Portfolio Website made in JS with React framework.\nNo additional information.",
        url: "https://github.com/bluepotatobp/portfolio-website",
        id: 0
    },
    {
        name: "likealight",
        styled_name: "Like A Light",
        short_desc: "Discord bot made in JS with Akairo framework.",
        desc: "Discord bot made in JS with Akairo framework.\nNo additional information.",
        url: "https://github.com/bluepotatobp/LAL-Akairo",
        id: 1
    }
]

export function getProjects() {
    return projects;
}

export function getProject(name) {
    let project = projects.find((proj) => proj.name === name);
    return project ? project : '404';
}