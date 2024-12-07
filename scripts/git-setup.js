import simpleGit from 'simple-git';
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';

const git = simpleGit();

// GitHub repository configuration
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'your-username';
const REPO_NAME = 'vexur-login';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function setupAndPush() {
  try {
    // Initialize Git repository
    await git.init();
    
    // Create .gitignore
    writeFileSync('.gitignore', `
node_modules
dist
.DS_Store
.env
.env.local
.env.*.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`);

    // Add all files
    await git.add('.');
    
    // Create initial commit
    await git.commit('Initial commit: Vexur Login implementation');

    // Create repository using GitHub API
    const createRepoCommand = `
      curl -X POST \
      -H "Authorization: token ${GITHUB_TOKEN}" \
      -H "Accept: application/vnd.github.v3+json" \
      https://api.github.com/user/repos \
      -d '{"name":"${REPO_NAME}","private":false}'
    `;

    execSync(createRepoCommand);

    // Add remote and push
    await git.addRemote('origin', `https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git`);
    await git.push('origin', 'main');

    console.log('Successfully pushed to GitHub!');
    console.log(`Repository URL: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

setupAndPush();