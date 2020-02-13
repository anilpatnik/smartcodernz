## Software Requirements

- node - [10.13.0 _node -v_](https://nodejs.org/fr/blog/release/v8.11.3)

- npm - 5.6.0 _npm -v_ installs with node

- yarn - [1.16.0 _yarn -v_](https://yarnpkg.com/en/docs/install#windows-stable)

- firebase-tools - 6.8.0 _npm install -g firebase-tools@6.8.0_

- [Visual Studio Code](https://code.visualstudio.com)

##### Visual Studio Code Extensions

- ESLint - Dirk Baeumer

- Prettier - Code formatter - Esben Petersen

##### Visual Studio Code Workspace Settings - Search with Right colon Text and Enable

- Editor: Format On Save

- ESLint: Auto Fix On Save

- Prettier: Eslint Integration

- Prettier: Print Width - _Fit code within this line limit = 100_

## GitLab Settings

- _c:\users\<user>_ delete files and folders inside `.config` and `.ssh`

- Create a project in GitLab

##### Add an SSH key

- `ssh-keygen -t ed25519 -C "user@mail.com"` _-C flag adds a comment in the key in case of multiple. It is optional_

- `ssh-keygen -p -o -f <keyname>` _SSH key pair password. It is optional. use the -p to add or change the password_

- `cat ~/.ssh/id_ed25519.pub | clip` _copy public SSH key to the clipboard on windows_

- Go to [SSH Keys](https://gitlab.com/profile/keys) and paste the key in the box and click `Add key`

- Test SSH key was added correctly `ssh -T git@gitlab.com`

- Answer `yes` to add gitLab.com to the list of trusted hosts if prompted

- Generate auth token `firebase login:ci`

- Go to [CI / CD Settings](https://gitlab.com/code/-/settings/ci_cd) **Variables** add `FIREBASE_TOKEN`

## Git Settings

- List existing remotes `git remote -v`

- Change remote URL from SSH to HTTPS `git remote set-url origin git@gitlab.com:user/code.git`

## Firebase Settings

- `firebase logout`

- `firebase login`

- Update projects in `.firebaserc`

- `firebase use --clear`

- `firebase use --add`

- `firebase use --alias <name>`

- `functions\config\serviceAccount.json`

- `functions\config\serviceAccountTest.json`

- Update `databaseURL` in `functions\config\firebase.js`

- Update `API_KEY` in `functions\common\constants.js`

- `client\src\config\firebase.js`

- Update `SITE_URL` in `client\src\common\constants.js`

## Build and Run Locally

##### Node.js - _firebase functions_

- Open VS Code Terminal and enter `cd .\functions`

- Enter command `yarn`

- Enter command `firebase use <default or staging or production>`

- Enter command `yarn start`

- It will start the firebase api `http://localhost:3001`

##### React.js

- Open VS Code Terminal and enter `cd .\client`

- Enter command `yarn`

- Enter command `yarn start`

- It will start the web app `http://localhost:3000`

**Note: `master` code will be deployed to firebase using `.gitlab-ci.yml` CI/CD**

## React UI

![login](/images/login.png)

![lookup](/images/lookup.png)

## GitLab CI / CD Pipeline

![pipeline](/images/gitlab.png)
