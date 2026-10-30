export interface InteractiveLesson {
  id: string;
  stepNumber: number;
  title: string;
  category: string;
  markdownDoc: string;
  objectiveQuiz: {
    question: string;
    options: { id: number; text: string; isCorrect: boolean }[];
    hint: string;
    explanation: string;
  };
  terminalChallenge: {
    taskPrompt: string;
    workingDir: string;
    acceptedCommands: string[];
    simulatedOutput: string;
    hint: string;
  };
}

export const interactiveLessons: InteractiveLesson[] = [
  {
    id: "lesson-git-init",
    stepNumber: 1,
    title: "Summoning the Repository: git init",
    category: "Repository Setup",
    markdownDoc: `# Initializing a Git Repository

Welcome to the **DevForge Git Dojo**! In this mission, you will learn how to turn an ordinary directory into a time-traveling, version-controlled repository.

---

### 📖 The Lore & Problem
Three friends—**Gian (Team Lead)**, **Nobita (Frontend)**, and **Suneo (Backend)**—are building a school web application. Previously, Gian saved files like \`app_final_v2_really_final.txt\`, and whenever Nobita emailed changes, files were lost or overwritten.

> **💡 The Doraemon Analogy:**  
> Think of \`git init\` as casting an invisible protective forcefield around your project folder. It summons a hidden **\`.git\`** chamber that silently observes every file change from this moment forward.

---

### ⚙️ How \`git init\` Works
When you type \`git init\` in any project folder:
1. Git creates a hidden directory named \`.git\` inside the current folder.
2. Inside \`.git\`, Git initializes:
   - **Objects database**: stores file contents and compression blobs.
   - **Refs**: tracks branches (like \`main\`) and commit pointers.
   - **HEAD**: points to your currently active branch.
3. Your local folder is now officially a **Local Git Repository**.

\`\`\`bash
# Run this once in the root folder of any project
$ git init
\`\`\`

---

### 🚨 Common Rookie Pitfalls
- **Never nest repositories:** Do not run \`git init\` inside a folder that is already inside another Git repo.
- **Do not delete \`.git\`:** Deleting the hidden \`.git\` folder erases your entire project history forever!
`,
    objectiveQuiz: {
      question: "What does Git create inside your project folder when you execute 'git init'?",
      options: [
        { id: 0, text: "A public GitHub cloud server", isCorrect: false },
        { id: 1, text: "A hidden '.git' directory containing all version history and object databases", isCorrect: true },
        { id: 2, text: "A copy of your code on every team member's computer", isCorrect: false },
        { id: 3, text: "A node_modules folder", isCorrect: false },
      ],
      hint: "It starts with a dot (.) and stores your local commit history.",
      explanation: "Correct! The hidden '.git' folder contains the complete history, branches, and object storage for your project.",
    },
    terminalChallenge: {
      taskPrompt: "Initialize a new Git repository in this folder to begin tracking the school project.",
      workingDir: "~/school-project",
      acceptedCommands: ["git init", "git init ."],
      simulatedOutput: `Initialized empty Git repository in /home/nobita/school-project/.git/
Created default branch: main
* Ready to track staged changes!`,
      hint: "Type 'git init' and hit Enter.",
    },
  },
  {
    id: "lesson-git-add",
    stepNumber: 2,
    title: "The Staging Cart: git add",
    category: "Staging Workflow",
    markdownDoc: `# The Staging Area: Curation Before Commitment

Now that your repository is initialized, you need to understand Git's most crucial mechanism: **The Staging Area**.

---

### 🛒 The Supermarket Cart Analogy
Imagine walking into a grocery store with store aisles, a shopping cart, and a cashier:

1. **Aisles (Working Directory):** You pick up items from shelves. You can inspect or put them back.
2. **Shopping Cart (Staging Area via \`git add\`):** You curate specifically what you want to buy. You don't have to purchase everything in the store—only what is in your cart!
3. **Cashier Receipt (Commit via \`git commit\`):** You pay and receive a stamped, permanent receipt.

> **Gian's Lesson:**  
> *"If you edit 5 files—3 for the login feature and 2 experimental test scripts—you only 'git add' the 3 login files! Keep your commits clean!"*

---

### 💻 Key Syntax
\`\`\`bash
# Stage a specific file
$ git add index.html

# Stage all modified and new files in the current folder
$ git add .
\`\`\`

---

### 🔍 Checking the Cart
Use \`git status\` at any time to see which files are staged in green and which are untracked in red.
`,
    objectiveQuiz: {
      question: "Why does Git use a 'Staging Area' instead of committing all file edits immediately?",
      options: [
        { id: 0, text: "Because computers cannot save multiple files simultaneously.", isCorrect: false },
        { id: 1, text: "To allow developers to select and group only related changes into meaningful commits.", isCorrect: true },
        { id: 2, text: "To compress files before uploading to the internet.", isCorrect: false },
        { id: 3, text: "It is required only on Windows machines.", isCorrect: false },
      ],
      hint: "Think about grouping only login-related files instead of mixing unfinished experimental code.",
      explanation: "Spot on! The staging area provides fine-grained control over exactly which changes belong to the next commit.",
    },
    terminalChallenge: {
      taskPrompt: "Stage 'index.html' into the shopping cart so it is prepared for commit.",
      workingDir: "~/school-project",
      acceptedCommands: ["git add index.html", "git add ."],
      simulatedOutput: `Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   index.html`,
      hint: "Type 'git add index.html' and press Enter.",
    },
  },
  {
    id: "lesson-git-commit",
    stepNumber: 3,
    title: "Sealing the Snapshot: git commit",
    category: "Recording History",
    markdownDoc: `# Making Permanent Snapshots: git commit

A commit is an immutable snapshot of your staged files at a specific point in time.

---

### 📸 The Photo Album Analogy
When you take a Polaroid photo at a party:
- You capture the exact arrangement of everyone in the room.
- On the white border, you write a caption: *"Nobita's birthday party - July 2026"*.
- You can never alter that Polaroid photo—it is forever frozen in history.

In Git, each commit produces a unique **SHA-1 hash** (e.g., \`4a8b2c1\`) along with the author, timestamp, and message.

> **Suneo's Pro-Tip:**  
> *"Never write vague commit messages like 'fixed stuff' or 'asdfgh'. Write semantic messages like \`feat: add school tracker header\` or \`fix: resolve null pointer in auth\`!"*

---

### 💻 The Command
\`\`\`bash
# The -m flag attaches a mandatory commit message
$ git commit -m "feat: initial commit"
\`\`\`
`,
    objectiveQuiz: {
      question: "What does the '-m' flag specify in 'git commit -m \"message\"'?",
      options: [
        { id: 0, text: "Main branch designation", isCorrect: false },
        { id: 1, text: "The commit description message explaining what changed", isCorrect: true },
        { id: 2, text: "Merge mode", isCorrect: false },
        { id: 3, text: "Master repository key", isCorrect: false },
      ],
      hint: "It tells future teammates what this snapshot contains.",
      explanation: "Exactly! The -m flag provides the commit message describing the snapshot.",
    },
    terminalChallenge: {
      taskPrompt: "Commit the staged files with the message: feat: initial commit",
      workingDir: "~/school-project",
      acceptedCommands: [
        'git commit -m "feat: initial commit"',
        "git commit -m 'feat: initial commit'",
      ],
      simulatedOutput: `[main (root-commit) 4a8b2c1] feat: initial commit
 1 file changed, 28 insertions(+)
 create mode 100644 index.html
✓ Snapshot permanently sealed into local repository!`,
      hint: 'Type: git commit -m "feat: initial commit"',
    },
  },
  {
    id: "lesson-git-branch",
    stepNumber: 4,
    title: "Parallel Universes: git checkout -b",
    category: "Branching & Isolation",
    markdownDoc: `# Branching: Coding in Alternate Realities

Branches allow multiple developers to work simultaneously on different features without breaking the working code.

---

### 🌌 The Parallel Timelines Analogy
- **Timeline A (\`main\`):** Gian's verified, bug-free production code.
- **Timeline B (\`feature-login\`):** Nobita's experimental workshop where he builds the login form.

Even if Nobita writes code that crashes his browser, Gian's \`main\` timeline is completely unaffected! Once Nobita's feature is tested and polished, he merges his timeline back into \`main\`.

---

### 💻 Command Syntax
\`\`\`bash
# Create and switch to a new branch in one command
$ git checkout -b feature-login

# Or modern Git syntax
$ git switch -c feature-login
\`\`\`
`,
    objectiveQuiz: {
      question: "What happens to the 'main' branch when Nobita makes broken commits on 'feature-login'?",
      options: [
        { id: 0, text: "The main branch breaks immediately.", isCorrect: false },
        { id: 1, text: "The main branch remains untouched and fully functional.", isCorrect: true },
        { id: 2, text: "Git deletes the main branch automatically.", isCorrect: false },
        { id: 3, text: "The entire computer restarts.", isCorrect: false },
      ],
      hint: "Branches provide complete isolation between feature environments.",
      explanation: "Correct! Branch isolation ensures experiments never destabilize the main branch.",
    },
    terminalChallenge: {
      taskPrompt: "Create and switch to a new branch named 'feature-login'.",
      workingDir: "~/school-project",
      acceptedCommands: [
        "git checkout -b feature-login",
        "git switch -c feature-login",
      ],
      simulatedOutput: `Switched to a new branch 'feature-login'
* You are now coding in an isolated timeline!`,
      hint: "Type: git checkout -b feature-login",
    },
  },
  {
    id: "lesson-git-status",
    stepNumber: 5,
    title: "The Oracle: git status",
    category: "Diagnostic & Inspection",
    markdownDoc: `# Checking Repository Health: git status

Whenever you sit down at your terminal, your first reflex should always be running \`git status\`.

---

### 🔍 What git status Tells You:
1. **Which branch are you currently on?** (e.g., \`On branch feature-login\`)
2. **Are you up to date with remote origin?**
3. **Changes to be committed (Green):** Files currently sitting in your Staging Area.
4. **Changes not staged for commit (Red):** Tracked files that were modified but not yet staged with \`git add\`.
5. **Untracked files (Red):** Newly created files that Git has never seen before.

> **Doraemon's Pro-Tip:**  
> *"Think of \`git status\` like a medical check-up for your project. Run it before and after every single command!"*
`,
    objectiveQuiz: {
      question: "Which command shows the current branch, staged files, and untracked changes?",
      options: [
        { id: 0, text: "git check", isCorrect: false },
        { id: 1, text: "git status", isCorrect: true },
        { id: 2, text: "git show-all", isCorrect: false },
        { id: 3, text: "git inspect", isCorrect: false },
      ],
      hint: "It checks the status of your working tree.",
      explanation: "Bravo! 'git status' is the primary command for inspecting your repository's working tree.",
    },
    terminalChallenge: {
      taskPrompt: "Check the status of your current branch and working directory.",
      workingDir: "~/school-project (feature-login)",
      acceptedCommands: ["git status"],
      simulatedOutput: `On branch feature-login
nothing to commit, working tree clean
* All changes saved. Ready for next adventure!`,
      hint: "Type 'git status' and press Enter.",
    },
  },
];

