// TODO: Update repository_list.txt with repository names seperated by commas

const fs = require('fs');
const { Octokit } = require('@octokit/rest');
const { env } = require('process');

// TODO: Replace with access key that has the following access:
//    Repository access: All repositories
//    Permissions > Repository permissions > Administration > Read & Write
const octokit = new Octokit({
  auth: 'REPLACE_WITH_GITHUB_ACCESS_KEY',
});

async function deleteRepositories(repoNames) {
  for (const repo of repoNames) {
    try {
      await octokit.repos.delete({
        // TODO: 
        owner: 'REPLACE_WITH_USERNAME',
        repo: repo.trim(),
      });
      console.log(`Repository ${repo.trim()} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting repository ${repo}:`, error.message);
    }
  }
}

fs.readFile('repository_list.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  
  const repoNames = data.split(','); 

  deleteRepositories(repoNames);
});
