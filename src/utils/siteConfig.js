module.exports = {
	siteTitle: "Advent of Code | Zero To Mastery",
	publisher: "Zero To Mastery Contributors",
	siteDescription:
		"Zero to Mastery site to post and rate solutions for Advent of Code",
	siteUrl: "https://aoc.zerotomastery.io/",
	author: "Zero to Mastery Contributors",
	authorUrl: "https://aoc.zerotomastery.io/about",
	shortTitle: "ZTM AOC",
	shareImage: "images/advent.png",
	shareImageWidth: 1920,
	shareImageHeight: 1071,
	siteLogo: "android-chrome-512x512.png",
	backgroundColor: "#3f51b5",
	themeColor: "#3f51b5",
	copyright: `Copyright © ${new Date().getFullYear()}, Zero to Mastery`,
	menuLinks: [
		{
			name: "Home",
			route: "",
			icon: "HomeOutline"
		},
		{
			name: "About",
			route: "/about",
			icon: "InformationOutline",
			dividerAfter: true
		},
		{
			name: "Archive",
			route: "/archive",
			icon: "",
			dividerAfter: true
		},
		{
			name: "View Solutions",
			route: "/solutions",
			icon: "EyeOutline"
		},
		{
			name: "Submit Solution",
			route: "/submit",
			icon: "Send",
			dividerAfter: true
		},
		{
			name: "Leaderboard",
			route: "/leaderboard",
			icon: "EmojiEvents"
		}
	]
};
