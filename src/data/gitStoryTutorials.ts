export interface CharacterDialogue {
  speaker: "Gian" | "Nobita" | "Suneo" | "Doraemon" | "Shizuka" | "Ravi";
  avatar: string;
  role: string;
  mood: "angry" | "panic" | "smug" | "helpful" | "cheerful";
  bubbleColor: string;
  message: string;
}

export interface StepCard {
  num: number;
  cmd: string;
  desc: string;
  colorType: "blue" | "yellow" | "green" | "pink";
}

export interface QuizOption {
  id: string;
  letter: string;
  text: string;
  isCorrect: boolean;
}

export interface GitStoryChapter {
  id: string;
  chapterNumber: number;
  heroTitle: string;
  heroSubtitle: string;
  lessonTitle: string;
  nextLessonTitle: string;
  xpReward: number;
  dialogues: CharacterDialogue[];
  problem: {
    heading: string;
    description: string;
    badChips: string[];
    takeaway: string;
  };
  solution: {
    heading: string;
    description: string;
    steps: StepCard[];
    note: string;
  };
  simulation: {
    command: string;
    output: string;
    explanation: string;
  };
  quiz: {
    question: string;
    options: QuizOption[];
    hint: string;
    explanation: string;
  };
}

export const gitStoryChapters: GitStoryChapter[] = [
  {
    id: "chapter-1-chaos",
    chapterNumber: 1,
    heroTitle: "Git Made Simple",
    heroSubtitle: "Stop losing your work. Learn it in 5 minutes.",
    lessonTitle: "Why Git?",
    nextLessonTitle: "Set your developer identity",
    xpReward: 60,
    dialogues: [
      {
        speaker: "Ravi",
        avatar: "🧑‍💼",
        role: "Team Lead",
        mood: "angry",
        bubbleColor: "#ff6b9a",
        message: "Three versions of the project plan exist, and nobody knows which one is current! Nobita, you emailed me a file that overwrote Gian's code!",
      },
      {
        speaker: "Nobita",
        avatar: "👓",
        role: "Frontend Dev",
        mood: "panic",
        bubbleColor: "#ffd166",
        message: "Doraemon save me! I only wanted to make the buttons blue, but my file was named 'plan_FINAL_v2_real.txt' and everything got mixed up!",
      },
      {
        speaker: "Doraemon",
        avatar: "🐱",
        role: "DevOps Wizard",
        mood: "helpful",
        bubbleColor: "#2ee59d",
        message: "No need to fight! Git takes automatic cryptographic snapshots of your project. You can jump back in time to any working version whenever you want!",
      },
    ],
    problem: {
      heading: "The Problem",
      description: "Without Git, people keep renaming files:",
      badChips: ["plan.txt", "plan_v2.txt", "plan_FINAL.txt", "plan_FINAL_v2.txt"],
      takeaway: "Nobody knows which file is real, and work gets lost.",
    },
    solution: {
      heading: "The Git Fix",
      description: "Git saves snapshots of your project. Three commands do most of the work:",
      steps: [
        {
          num: 1,
          cmd: "git init",
          desc: "Starts Git in your project folder. You run it once.",
          colorType: "blue",
        },
        {
          num: 2,
          cmd: "git add",
          desc: "Picks the files you want in your next save.",
          colorType: "yellow",
        },
        {
          num: 3,
          cmd: "git commit",
          desc: "Saves the snapshot with a short message.",
          colorType: "green",
        },
      ],
      note: "Think of a commit like a save point in a game. You can always go back to it.",
    },
    simulation: {
      command: "git init",
      output: `Initialized empty Git repository in /Users/nobita/school-project/.git/
Created default branch: main`,
      explanation: "Git created the hidden .git chamber. From this moment on, your folder is shielded by version control!",
    },
    quiz: {
      question: "Why is naming files like plan_final_v2 a problem for a team?",
      options: [
        { id: "a", letter: "A", text: "It uses too much storage.", isCorrect: false },
        { id: "b", letter: "B", text: "Nobody can tell which version is current, and work gets overwritten.", isCorrect: true },
        { id: "c", letter: "C", text: "Computers cannot open text files.", isCorrect: false },
        { id: "d", letter: "D", text: "Underscores are not allowed in names.", isCorrect: false },
      ],
      hint: "Think about what happens when 2 people email each other different versions.",
      explanation: "Correct! Manual versioning leads to lost work, merge confusion, and zero traceable history.",
    },
  },
  {
    id: "chapter-2-config",
    chapterNumber: 2,
    heroTitle: "Who Wrote This Code?",
    heroSubtitle: "Set your developer identity once and never get blamed falsely.",
    lessonTitle: "Setting Identities",
    nextLessonTitle: "The 3 Sacred Stages of Git",
    xpReward: 80,
    dialogues: [
      {
        speaker: "Gian",
        avatar: "🦍",
        role: "Team Boss",
        mood: "angry",
        bubbleColor: "#ff6b9a",
        message: "From now on, I want proof of who wrote every single line! If someone breaks the build at 3 AM, I need to know whose house to march over to!",
      },
      {
        speaker: "Doraemon",
        avatar: "🐱",
        role: "DevOps Wizard",
        mood: "helpful",
        bubbleColor: "#2ee59d",
        message: "Git solves this with 'git config'. Every developer registers their name and email once. Every commit becomes permanently signed with your author mark!",
      },
      {
        speaker: "Nobita",
        avatar: "👓",
        role: "Frontend Dev",
        mood: "cheerful",
        bubbleColor: "#ffd166",
        message: "Look! I set mine to 'Nobita Nobi <nobita@doraemon.com>'. Now Shizuka will see my name on all the beautiful UI commits!",
      },
    ],
    problem: {
      heading: "The Problem",
      description: "Without author configuration, commits have anonymous or broken author tags:",
      badChips: ["Author: unknown@localhost", "Author: root (who is this?)", "Author: desktop-39x12"],
      takeaway: "Nobody knows who made what change, leading to finger-pointing and chaos.",
    },
    solution: {
      heading: "The Git Fix",
      description: "Git stamps your verified name and email onto every project snapshot:",
      steps: [
        {
          num: 1,
          cmd: 'git config --global user.name "Nobita"',
          desc: "Sets your permanent author display name across all projects.",
          colorType: "blue",
        },
        {
          num: 2,
          cmd: 'git config --global user.email "nobita@gmail.com"',
          desc: "Binds your commits to your verified developer email address.",
          colorType: "yellow",
        },
        {
          num: 3,
          cmd: "git config --list",
          desc: "Prints all active settings to verify everything is registered.",
          colorType: "green",
        },
      ],
      note: "Think of git config like signing your artist signature on a canvas before hanging it in the gallery.",
    },
    simulation: {
      command: 'git config --global user.name "Nobita Nobi"',
      output: `user.name=Nobita Nobi
user.email=nobita@doraemon.com
core.editor=code --wait`,
      explanation: "Git now knows who is sitting at the keyboard! All future commits will bear your badge.",
    },
    quiz: {
      question: "Which command correctly registers Gian's name for all future commits on his laptop?",
      options: [
        { id: "a", letter: "A", text: "git login Gian", isCorrect: false },
        { id: "b", letter: "B", text: 'git config --global user.name "Gian"', isCorrect: true },
        { id: "c", letter: "C", text: 'git set author "Gian"', isCorrect: false },
        { id: "d", letter: "D", text: 'git user = "Gian"', isCorrect: false },
      ],
      hint: "Look for the command that configures global user settings.",
      explanation: "Perfect! 'git config --global user.name' records the author identifier permanently.",
    },
  },
  {
    id: "chapter-3-stages",
    chapterNumber: 3,
    heroTitle: "The 3 Sacred Stages",
    heroSubtitle: "Working Directory ➔ Staging Area ➔ Commit History.",
    lessonTitle: "The 3 Stages",
    nextLessonTitle: "Branching into Parallel Universes",
    xpReward: 100,
    dialogues: [
      {
        speaker: "Nobita",
        avatar: "👓",
        role: "Frontend Dev",
        mood: "panic",
        bubbleColor: "#ffd166",
        message: "Wait! I edited index.html, but when I typed 'git status', it said 'Untracked files'. Why didn't Git save it automatically?",
      },
      {
        speaker: "Doraemon",
        avatar: "🐱",
        role: "DevOps Wizard",
        mood: "helpful",
        bubbleColor: "#2ee59d",
        message: "Think of a supermarket shopping cart! 1: Working Directory is the store aisles. 2: Staging Area (git add) is putting items into your cart. 3: Commit (git commit) is paying at the cash counter and getting a permanent receipt!",
      },
      {
        speaker: "Gian",
        avatar: "🦍",
        role: "Team Boss",
        mood: "cheerful",
        bubbleColor: "#ff6b9a",
        message: "Aha! So if I edit 5 files, but only want to save the login bugfix, I only 'git add' the login file into my cart! That's genius!",
      },
    ],
    problem: {
      heading: "The Problem",
      description: "Auto-saving everything immediately commits unfinished bugs and secret passwords:",
      badChips: ["half_written_bug.js", "accidental_delete.css", "secret_api_key.env"],
      takeaway: "Without a staging area, you cannot curate what is ready to be locked into history.",
    },
    solution: {
      heading: "The Git Fix",
      description: "Git provides an intermediate staging cart so you pick exact changes:",
      steps: [
        {
          num: 1,
          cmd: "Working Directory",
          desc: "Your local files on disk where you write and edit code.",
          colorType: "blue",
        },
        {
          num: 2,
          cmd: "git add <file>",
          desc: "Staging Area: places selected files into your save cart.",
          colorType: "yellow",
        },
        {
          num: 3,
          cmd: 'git commit -m "msg"',
          desc: "Saves an immutable snapshot with an official receipt hash.",
          colorType: "green",
        },
      ],
      note: "Think of git add like putting groceries into a cart, and commit like paying at the checkout.",
    },
    simulation: {
      command: "git add index.html && git commit -m 'feat: add school tracker header'",
      output: `[main (root-commit) 4a8b2c1] feat: add school tracker header
 1 file changed, 24 insertions(+)
 create mode 100644 index.html`,
      explanation: "Boom! Commit hash 4a8b2c1 is permanently locked into Git history with an immutable snapshot.",
    },
    quiz: {
      question: "Which stage acts like placing items into your shopping cart before buying?",
      options: [
        { id: "a", letter: "A", text: "Working Directory", isCorrect: false },
        { id: "b", letter: "B", text: "The Staging Area (Index)", isCorrect: true },
        { id: "c", letter: "C", text: "The GitHub Cloud", isCorrect: false },
        { id: "d", letter: "D", text: "The Recycle Bin", isCorrect: false },
      ],
      hint: "It sits between your local editor and the permanent commit.",
      explanation: "Spot on! The Staging Area lets you prepare and curate exactly what changes go into the next commit.",
    },
  },
  {
    id: "chapter-4-branches",
    chapterNumber: 4,
    heroTitle: "Parallel Universes",
    heroSubtitle: "Isolate experiments so the working main app never breaks.",
    lessonTitle: "Branches",
    nextLessonTitle: "The Great Merge Conflict Battle",
    xpReward: 120,
    dialogues: [
      {
        speaker: "Gian",
        avatar: "🦍",
        role: "Team Boss",
        mood: "angry",
        bubbleColor: "#ff6b9a",
        message: "LISTEN UP! Nobody touches the 'main' branch directly! The teacher is testing the demo tomorrow. If anyone commits broken code to 'main', they answer to my fists!",
      },
      {
        speaker: "Nobita",
        avatar: "👓",
        role: "Frontend Dev",
        mood: "panic",
        bubbleColor: "#ffd166",
        message: "Eeeeek! But I need to experiment with a new animated login screen! What if my experimental code is half-broken for 3 hours?",
      },
      {
        speaker: "Doraemon",
        avatar: "🐱",
        role: "DevOps Wizard",
        mood: "helpful",
        bubbleColor: "#2ee59d",
        message: "Nobita, use 'git checkout -b feature-login'! A branch creates an alternate parallel universe. You can experiment, break things, and rebuild freely. Gian's 'main' universe stays 100% untouched and working!",
      },
    ],
    problem: {
      heading: "The Problem",
      description: "When everyone works on the same 'main' branch simultaneously:",
      badChips: ["broken_test_crash.ts", "500_internal_error", "half_built_navbar.jsx"],
      takeaway: "A single broken commit halts the entire team and ruins the live demo.",
    },
    solution: {
      heading: "The Git Fix",
      description: "Branches create isolated alternate timelines for each feature:",
      steps: [
        {
          num: 1,
          cmd: "git checkout -b feature-login",
          desc: "Creates a new branch and jumps into its safe sandbox.",
          colorType: "blue",
        },
        {
          num: 2,
          cmd: "git branch",
          desc: "Inspects which alternate universe you are currently standing in.",
          colorType: "yellow",
        },
        {
          num: 3,
          cmd: "git merge feature-login",
          desc: "Combines your tested feature back into the stable main branch.",
          colorType: "green",
        },
      ],
      note: "Think of a branch like a video game sandbox save. If you die, your main save file is untouched.",
    },
    simulation: {
      command: "git checkout -b feature-login",
      output: `Switched to a new branch 'feature-login'
Branch 'feature-login' set up to track local state.`,
      explanation: "You have jumped into a safe sandbox. Whatever you commit here cannot affect Gian's main branch!",
    },
    quiz: {
      question: "Why should Nobita work on 'feature-login' instead of directly on 'main'?",
      options: [
        { id: "a", letter: "A", text: "Branches make your computer run faster.", isCorrect: false },
        { id: "b", letter: "B", text: "It isolates experimental changes so Gian's stable main code never breaks.", isCorrect: true },
        { id: "c", letter: "C", text: "Git requires all files to have their own branch.", isCorrect: false },
        { id: "d", letter: "D", text: "Because Nobita doesn't have an internet connection.", isCorrect: false },
      ],
      hint: "Think about protecting the working demo from broken code.",
      explanation: "Exactly! Branches keep untested work quarantined from stable production code.",
    },
  },
  {
    id: "chapter-5-conflicts",
    chapterNumber: 5,
    heroTitle: "The Merge Conflict Battle",
    heroSubtitle: "When two developers edit the same line, Git asks you to decide.",
    lessonTitle: "Merge Conflicts",
    nextLessonTitle: "GitHub Cloud & Pull Requests",
    xpReward: 150,
    dialogues: [
      {
        speaker: "Nobita",
        avatar: "👓",
        role: "Frontend Dev",
        mood: "panic",
        bubbleColor: "#ffd166",
        message: "Doraemon! The screen is covered in strange arrows: '<<<<<<< HEAD' and '=======' and '>>>>>>>'! Git crashed! Is my computer hacked?!",
      },
      {
        speaker: "Gian",
        avatar: "🦍",
        role: "Team Boss",
        mood: "angry",
        bubbleColor: "#ff6b9a",
        message: "NOBITA! In score.txt, on line 1, I set 'Total Score: 100'. But on your branch you changed line 1 to 'Total Score: 200'! Git doesn't know who is boss!",
      },
      {
        speaker: "Shizuka",
        avatar: "🎀",
        role: "Lead QA & Mediator",
        mood: "cheerful",
        bubbleColor: "#2ee59d",
        message: "Why don't we compromise and make it 'Total Score: 150'? Let's remove the conflict markers and save the file cleanly together!",
      },
    ],
    problem: {
      heading: "The Problem",
      description: "Gian and Nobita edited Line 1 of score.txt differently at the same time:",
      badChips: ["<<<<<<< HEAD (Score: 100)", "======= (Divider)", ">>>>>>> feature (Score: 200)"],
      takeaway: "Git refuses to guess who is right. It halts and marks the exact collision.",
    },
    solution: {
      heading: "The Git Fix",
      description: "Resolve the conflict in 3 clear steps:",
      steps: [
        {
          num: 1,
          cmd: "Open conflicting file",
          desc: "Review <<<<<<< and >>>>>>> markers with your teammate.",
          colorType: "blue",
        },
        {
          num: 2,
          cmd: "Choose the correct code",
          desc: "Delete collision markers and keep the agreed line (Score: 150).",
          colorType: "yellow",
        },
        {
          num: 3,
          cmd: "git add & git commit",
          desc: "Stages the clean file and records the completed merge.",
          colorType: "green",
        },
      ],
      note: "Think of a merge conflict like two co-authors writing two different endings for the same chapter.",
    },
    simulation: {
      command: "git merge feature-scoring",
      output: `Auto-merging score.txt
CONFLICT (content): Merge conflict in score.txt
Automatic merge failed; fix conflicts and then commit the result.`,
      explanation: "Git encountered conflicting lines. Open score.txt, remove the <<<<<<< markers, pick the right score, and run git commit!",
    },
    quiz: {
      question: "What does Git do when Gian and Nobita edit the exact same line in different ways?",
      options: [
        { id: "a", letter: "A", text: "It randomly chooses the file with the newer timestamp.", isCorrect: false },
        { id: "b", letter: "B", text: "It deletes both files from the hard drive.", isCorrect: false },
        { id: "c", letter: "C", text: "It flags a merge conflict with markers (<<<<<<<, =======, >>>>>>>) and asks you to decide.", isCorrect: true },
        { id: "d", letter: "D", text: "It automatically calls GitHub support.", isCorrect: false },
      ],
      hint: "Git refuses to guess your intentions silently.",
      explanation: "Bullseye! Git places conflict markers in the file and waits for human resolution.",
    },
  },
  {
    id: "chapter-6-github-pr",
    chapterNumber: 6,
    heroTitle: "GitHub Cloud & PRs",
    heroSubtitle: "Collaborate across computers: Push, Pull & Code Review.",
    lessonTitle: "GitHub & Pull Requests",
    nextLessonTitle: "Course Completed! 🏆",
    xpReward: 200,
    dialogues: [
      {
        speaker: "Suneo",
        avatar: "🦊",
        role: "Backend Dev",
        mood: "smug",
        bubbleColor: "#5aa8ff",
        message: "I just created our remote repo on GitHub: 'gian-doraemon/school-project'. I pushed my database code to the cloud. You two can clone it now!",
      },
      {
        speaker: "Nobita",
        avatar: "👓",
        role: "Frontend Dev",
        mood: "cheerful",
        bubbleColor: "#ffd166",
        message: "I ran 'git clone' and have the whole codebase! I finished the UI on 'feature-ui' and pushed it with 'git push origin feature-ui'. Now I opened a Pull Request!",
      },
      {
        speaker: "Gian",
        avatar: "🦍",
        role: "Team Boss",
        mood: "cheerful",
        bubbleColor: "#2ee59d",
        message: "Bwahaha! Excellent work, team! Clicking 'Merge Pull Request'! Our school project tracker is live on GitHub and ready for Hacktoberfest!",
      },
    ],
    problem: {
      heading: "The Problem",
      description: "Code stored only on your local laptop cannot be accessed by teammates:",
      badChips: ["laptop_battery_dead.zip", "stale_email_attachment.rar", "usb_drive_lost"],
      takeaway: "Without a remote cloud hub, teammates code in isolation and lose sync.",
    },
    solution: {
      heading: "The Git Fix",
      description: "GitHub serves as the central cloud hub for open-source teamwork:",
      steps: [
        {
          num: 1,
          cmd: "git clone <url>",
          desc: "Downloads the entire project and full history to your machine.",
          colorType: "blue",
        },
        {
          num: 2,
          cmd: "git push origin <branch>",
          desc: "Uploads your branch commits to the GitHub cloud.",
          colorType: "yellow",
        },
        {
          num: 3,
          cmd: "Open Pull Request",
          desc: "Requests peer code review and merges into main with 1 click.",
          colorType: "green",
        },
      ],
      note: "Think of Git as your local offline sketchbook, and GitHub as the school exhibition gallery.",
    },
    simulation: {
      command: "git push origin feature-ui",
      output: `Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Writing objects: 100% (5/5), 1.24 KiB | 1.24 MiB/s, done.
remote: Create a pull request for 'feature-ui' on GitHub by visiting:
remote:      https://github.com/gian-doraemon/school-project/pull/new/feature-ui
To https://github.com/gian-doraemon/school-project.git
 * [new branch]      feature-ui -> feature-ui`,
      explanation: "Your code is now in the cloud! Teammates can review, comment, and merge into production.",
    },
    quiz: {
      question: "What is a GitHub Pull Request (PR)?",
      options: [
        { id: "a", letter: "A", text: "A tool to delete broken files from teammates' computers.", isCorrect: false },
        { id: "b", letter: "B", text: "A formal request to review and merge your branch code into the main repository.", isCorrect: true },
        { id: "c", letter: "C", text: "An email invoice sent to open-source users.", isCorrect: false },
        { id: "d", letter: "D", text: "A command to shut down the server.", isCorrect: false },
      ],
      hint: "It allows teammates to inspect code before it joins the main branch.",
      explanation: "Exact match! Pull Requests power modern software engineering and open-source review.",
    },
  },
];
