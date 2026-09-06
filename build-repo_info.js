const fs = require('fs');

async function buildDatabase() {
 
  const username = process.env.GITHUB_REPOSITORY_OWNER; 
  
  try {
    console.log(`Contacting GitHub API for user: ${username}...`);
    
 
    const response = await fetch(`https://github.com{username}/repos`);
    const repos = await response.json();
    
    if (!Array.isArray(repos)) {
      throw new Error("Invalid API response received from GitHub.");
    }

    const portfolioList = [];

   
    for (const repo of repos) {
      if (repo.fork) continue;

      console.log(`Extracting data for: ${repo.name}`);
      
     
      const langResponse = await fetch(repo.languages_url);
      const languages = await langResponse.json();

     
      const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);
      const languagePercentages = {};
      for (const [lang, bytes] of Object.entries(languages)) {
        languagePercentages[lang] = ((bytes / totalBytes) * 100).toFixed(1) + "%";
      }

     
      portfolioList.push({
        name: repo.name,
        description: repo.description || "No description written yet.",
        url: repo.html_url,
        languages: languagePercentages,
        stars: repo.stargazers_count
      });
    }

    fs.writeFileSync('./repo-info.json', JSON.stringify(portfolioList, null, 2));
    console.log(`  Created portfolio.json containing ${portfolioList.length} items.`);

  } catch (error) {
    console.error("Pipeline failure:", error);
    process.exit(1); 
  }
}

buildDatabase();

