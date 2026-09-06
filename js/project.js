async function readFileContent() {
  try {
    const response = await fetch('/github_repo.json'); 
    
    if (!response.ok) {
      throw new Error(`Could not fetch file: ${response.status}`);
    }

    const Data = await response.json(); 
    console.log("File Contents:\n", textData);

  } catch (error) {
    console.error("Error reading file:", error);
  }
}

readFileContent();

