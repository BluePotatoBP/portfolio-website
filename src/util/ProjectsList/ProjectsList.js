const projects = {
	likealight: {
		name: "likealight",
		decoName: "Like A Light",
		shortDesc: "Discord bot made in JS with DJS and AKAIRO",
		thumbnail: "lalLogo512.png",
		repo: "bluepotatobp/lal-akairo",
		tags: [
			"lal",
			"likealight",
			"light",
			"akairo",
			"discord",
			"discordjs",
			"like a light",
		],
		featured: true,
	},

	void: {
		name: "void",
		decoName: "VOID",
		shortDesc: "Discord bot using the Sapphire framework",
		thumbnail: "voidLogo.png",
		repo: "voidbotsprod/void-sapphire",
		tags: ["void", "sapphire", "discord", "discordjs", "voidbots"],
		featured: true,
	},

	"portfolio-website": {
		name: "portfolio-website",
		decoName: "Portfolio Website",
		shortDesc: "My portfolio website made in JS with REACT",
		thumbnail: "logo512.png",
		repo: "bluepotatobp/portfolio-website",
		tags: ["portfolio", "website", "react", "portfolio website"],
		featured: true,
	},

	nicetry: {
		name: "",
		decoName: "Nice Try",
		shortDesc: "But it's not going to work buddy",
		thumbnail: "clown_transform.gif",
		repo: "",
		tags: ["<", ">"],
		hidden: true,
	},
};

/**
 * Helper function for getting projects
 * @param {boolean} showHidden Should hidden results be included
 * @returns Array of projects
 */
export function getProjects(showHidden = false) {
	let filteredProjects = []
	if (showHidden) {
		filteredProjects =
			Object.values(projects).filter((p) => {
				if (p.hidden) return null;
				return p;
			});
		return filteredProjects
	} else return projects
}

export function getProject(name) {
	return projects[name];
}
