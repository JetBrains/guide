module.exports = {
	overrides: [
		{
			files: ["./site/**/*.md"],
			parser: "eslint-plugin-markdownlint/parser",
			extends: ["plugin:markdownlint/recommended", "prettier"],
			rules: {
				"markdownlint/md014": "warn",
				// consistency rules
				"markdownlint/md004": "off",
				"markdownlint/md013": "off",
				"markdownlint/md022": "off",
				"markdownlint/md032": "off",
				"markdownlint/md033": "off",
				"markdownlint/md048": "off",
				"markdownlint/md029": "off",
				"markdownlint/md036": "off",
				"markdownlint/md040": "off",
				"markdownlint/md049": "off",
				"markdownlint/md050": "off",
			},
		},
	],
};
