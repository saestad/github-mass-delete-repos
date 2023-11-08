/* 
TODO: Update repository_list.txt with repository names seperated by commas

TODO: Replace GITHUB_ACCESS_KEY with key that has the following access:
    Repository access: All repositories
    Permissions > Repository permissions > Administration > Read & Write

TODO: Replace GITHUB_USERNAME

Run in terminal:
npm install
node index.js

Console logs deleted and failed operations
*/


const fs = require('fs');
const { Octokit } = require('@octokit/rest');
const { env } = require('process');


const octokit = new Octokit({
  auth: 'GITHUB_ACCESS_KEY',
});

async function deleteRepositories(repoNames) {
  for (const repo of repoNames) {
    try {
      await octokit.repos.delete({
        owner: 'GITHUB_USERNAME',
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
