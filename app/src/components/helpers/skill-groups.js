// Навыки из API приходят плоским списком. Группируем их, чтобы 30 тегов
// читались по смыслу. Порядок внутри группы — как в API; всё, чего нет
// в группах, попадает в «Другое».
const GROUPS = [
	{ title: "Языки", items: ["Java", "PHP", "JavaScript", "Python"] },
	{
		title: "Backend",
		items: ["Spring Boot", "Node.js", "Laravel", "Lumen", "Twig", "REST", "RESTful API"],
	},
	{ title: "Frontend", items: ["React JS", "VueJS", "jQuery", "HTML", "CSS"] },
	{ title: "Базы данных", items: ["PostgreSQL", "MySQL"] },
	{
		title: "DevOps",
		items: ["Docker", "Docker Compose", "Jenkins", "CI/CD", "Pipeline", "Linux", "Bash", "Git", "Grafana"],
	},
	{ title: "Процессы", items: ["BPMN", "Atlassian Jira", "Agile"] },
];

const normalize = skill => skill.trim().toLowerCase();

export const groupSkills = (skills = []) => {
	const groupOf = new Map();
	GROUPS.forEach(({ title, items }) =>
		items.forEach(item => groupOf.set(normalize(item), title))
	);

	const grouped = new Map(GROUPS.map(({ title }) => [title, []]));
	const rest = [];

	skills.forEach(skill => {
		const title = groupOf.get(normalize(skill));
		(title ? grouped.get(title) : rest).push(skill);
	});

	return [
		...[...grouped].map(([title, items]) => ({ title, items })),
		{ title: "Другое", items: rest },
	].filter(({ items }) => items.length);
};
