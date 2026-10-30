export interface CharacterDialogue {
  speaker: "Gian" | "Nobita" | "Suneo" | "Doraemon" | "Shizuka";
  avatar: string;
  role: string;
  mood: "angry" | "panic" | "smug" | "helpful" | "cheerful";
  bubbleColor: string;
  message: string;
}

export interface TerminalSimulation {
  command: string;
  output: string;
  explanation: string;
}

export interface GitStoryChapter {
  id: string;
  chapterNumber: number;
  title: string;
  tagline: string;
  conceptBadge: string;
  xpReward: number;
  dialogues: CharacterDialogue[];
  analogyStory: {
    heading: string;
    narrative: string;
    moral: string;
  };
  keyCommands: {
    cmd: string;
    desc: string;
  }[];
  simulation: TerminalSimulation;
  quiz: {
    question: string;
    options: { id: number; text: string; isCorrect: boolean }[];
    hint: string;
    explanation: string;
  };
}

export const gitStoryChapters: GitStoryChapter[] = [
  {
    id: "chapter-1-chaos",
    chapterNumber: 1,
    title: "The Chaos Without Version Control",
    tagline: "When Gian's laptop crashed and Nobita overwrote styles.txt",
    conceptBadge: "FOUNDATION · WHY GIT",
    xpReward: 60,
    dialogues: [
      {
        speaker: "Gian",
        avatar: "🦍",
        role: "Team Lead & Project Boss",
        mood: "angry",
        bubbleColor: "#ef476f",
        message: "NOBITA! You emailed me your 'homepage.txt' and completely overwrote my code! Now the school project tracker won't even launch!",
      },
      {
        speaker: "Nobita",
        avatar: "👓",
        role: "Frontend Dev (In Distress)",
        mood: "panic",
        bubbleColor: "#ffd166",
        message: "Doraemonnnn! Save me! Gian is going to beat me up! I only wanted to make the buttons blue, but my file was named 'app_final_FINAL_v2_real.txt' and everything got mixed up!",
      },
      {
        speaker: "Suneo",
        avatar: "🦊",
        role: "Backend Dev (Smug)",
        mood: "smug",
        bubbleColor: "#118ab2",
        message: "Hmph! If you two used my cousin's ultra-expensive USB flash drives with 50 color-coded copies, this would never happen. Though even my folder has 12 copies of 'database_gian_fixed.txt'...",
      },
      {
        speaker: "Doraemon",
        avatar: "🐱",
        role: "DevOps Wizard",
        mood: "helpful",
        bubbleColor: "#06d6a0",
        message: "No need to panic or fight! From my 22nd-century pocket, I give you: GIT! A Version Control System that records every single keystroke, tracks who changed what, and lets you travel back in time to any working version!",
      },
    ],
    analogyStory: {
      heading: "The 'File Naming Nightmare' Analogy",
      narrative: "Without Git, teams resort to renaming files: 'project_v1', 'project_final', 'project_FINAL_v2', 'project_REALLY_FINAL_DONOTTOUCH'. When multiple people edit simultaneously via email or WhatsApp, someone's code is guaranteed to be deleted permanently.",
      moral: "Git replaces manual file copying with cryptographic snapshots. You never lose code again.",
    },
    keyCommands: [
      { cmd: "git --version", desc: "Verifies Git is properly installed in your terminal." },
      { cmd: "git init", desc: "Summons a magical hidden .git database inside your project folder." },
    ],
    simulation: {
      command: "git init",
      output: `Initialized empty Git repository in /Users/nobita/school-project-tracker/.git/
Created default branch: main`,
      explanation: "Git created the hidden .git chamber. From this moment on, your folder is shielded by version control!",
    },
    quiz: {
      question: "Why is saving files as 'app_final_v2_really_final.txt' dangerous for Gian and Nobita's team?",
      options: [
        { id: 0, text: "It consumes too much battery power.", isCorrect: false },
        { id: 1, text: "It creates collaboration chaos and overwrites previous working versions.", isCorrect: true },
        { id: 2, text: "Operating systems do not allow underscores in filenames.", isCorrect: false },
        { id: 3, text: "Doraemon's gadgets cannot read text files.", isCorrect: false },
      ],
      hint: "Remember what happened when Nobita emailed his file to Gian!",
      explanation: "Correct! Manual versioning leads to lost work, merge confusion, and zero traceable history.",
    },
  },
  {
    id: "chapter-2-config",
    chapterNumber: 2,
    title: "Setting Identities: No More Blame Game",
    tagline: "Configuring user.name and user.email for Gian, Nobita, and Suneo",
    conceptBadge: "SETUP · GIT CONFIG",
    xpReward: 80,
    dialogues: [
      {
        speaker: "Gian",
        avatar: "🦍",
        role: "Team Lead & Project Boss",
        mood: "angry",
        bubbleColor: "#ef476f",
        message: "From now on, I want proof of who wrote every single line! If someone breaks the build at 3 AM, I need to know whose house to march over to!",
      },
      {
        speaker: "Doraemon",
        avatar: "🐱",
        role: "DevOps Wizard",
        mood: "helpful",
        bubbleColor: "#06d6a0",
        message: "Exactly, Gian! Git solves this with 'git config'. Every developer registers their name and email once. Every commit becomes signed forever!",
      },
      {
        speaker: "Nobita",
        avatar: "👓",
        role: "Frontend Dev",
        mood: "cheerful",
        bubbleColor: "#ffd166",
        message: "Look! I set mine to 'Nobita Nobi <nobita@doraemon.com>'. Now Shizuka will see my name on all the beautiful UI commits!",
      },
      {
        speaker: "Suneo",
        avatar: "🦊",
        role: "Backend Dev",
        mood: "smug",
        bubbleColor: "#118ab2",
        message: "Mine is 'Suneo Honekawa <suneo@doraemon.com>'. My database commits will show true architectural sophistication.",
      },
    ],
    analogyStory: {
      heading: "The 'Digital Signature Stamp' Analogy",
      narrative: "Imagine an artist signing their painting in ink before hanging it in the museum. Git stamps your name and email onto every snapshot. It doesn't ask for a password—it's simply your authorship signature on the project ledger.",
      moral: "Always configure git user.name and user.email before making your first commit.",
    },
    keyCommands: [
      { cmd: 'git config --global user.name "Nobita Nobi"', desc: "Registers your author display name globally." },
      { cmd: 'git config --global user.email "nobita@doraemon.com"', desc: "Registers your email tied to commits." },
      { cmd: "git config --list", desc: "Prints all active Git configurations." },
    ],
    simulation: {
      command: 'git config --global user.name "Nobita Nobi"',
      output: `user.name=Nobita Nobi
user.email=nobita@doraemon.com
core.editor=code --wait`,
      explanation: "Git now knows who is sitting at the terminal keyboard!",
    },
    quiz: {
      question: "Which command correctly registers Gian's name for all future commits on his laptop?",
      options: [
        { id: 0, text: 'git login Gian', isCorrect: false },
        { id: 1, text: 'git config --global user.name "Gian"', isCorrect: true },
        { id: 2, text: 'git set author "Gian"', isCorrect: false },
        { id: 3, text: 'git user = "Gian"', isCorrect: false },
      ],
      hint: "Look for the command that configures global user settings.",
      explanation: "Perfect! 'git config --global user.name' records the author identifier.",
    },
  },
  {
    id: "chapter-3-stages",
    chapterNumber: 3,
    title: "The Three Sacred Stages of Git",
    tagline: "Working Directory → Staging Area → Local Repository",
    conceptBadge: "CORE · 3 STAGES",
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
        bubbleColor: "#06d6a0",
        message: "Think of my 4D Pocket or a supermarket shopping cart! 1: Working Directory is the store shelves. 2: Staging Area (git add) is putting items into your shopping cart. 3: Commit (git commit) is paying at the cash counter and getting a permanent receipt!",
      },
      {
        speaker: "Gian",
        avatar: "🦍",
        role: "Team Lead",
        mood: "cheerful",
        bubbleColor: "#ef476f",
        message: "Aha! So if I edit 5 files, but only want to save the login bugfix, I only 'git add' the login file into my cart! That's genius!",
      },
      {
        speaker: "Suneo",
        avatar: "🦊",
        role: "Backend Dev",
        mood: "smug",
        bubbleColor: "#118ab2",
        message: "Obviously. You wouldn't commit half-written test scripts to the permanent repository, would you, Nobita?",
      },
    ],
    analogyStory: {
      heading: "The Supermarket Shopping Cart Analogy",
      narrative: "Stage 1 (Working Directory): You browse store aisles and pick up snacks. Stage 2 (Staging Area via `git add`): You place selected items into your cart. You can take things in and out. Stage 3 (Commit via `git commit`): The cashier prints a non-erasable receipt with a timestamp. That receipt is your immutable Git commit hash!",
      moral: "Never commit blindly. Stage only the related files that solve one specific task.",
    },
    keyCommands: [
      { cmd: "git status", desc: "Inspects which files are modified, untracked, or staged." },
      { cmd: "git add <file>", desc: "Moves modified files into the Staging Area (shopping cart)." },
      { cmd: 'git commit -m "feat: message"', desc: "Permanently snapshots staged changes into the local repo." },
    ],
    simulation: {
      command: "git add index.html && git commit -m 'feat: add school tracker header'",
      output: `[main (root-commit) 4a8b2c1] feat: add school tracker header
 1 file changed, 24 insertions(+)
 create mode 100644 index.html`,
      explanation: "Boom! Commit hash 4a8b2c1 is permanently locked into Git history. Even if your power cuts out, this state is immortalized.",
    },
    quiz: {
      question: "Which stage acts like placing items into your shopping cart before buying?",
      options: [
        { id: 0, text: "Working Directory", isCorrect: false },
        { id: 1, text: "The Staging Area (Index)", isCorrect: true },
        { id: 2, text: "The GitHub Cloud", isCorrect: false },
        { id: 3, text: "The Recycle Bin", isCorrect: false },
      ],
      hint: "It sits between your local editor and the permanent commit.",
      explanation: "Spot on! The Staging Area lets you prepare and curate exactly what changes go into the next commit.",
    },
  },
  {
    id: "chapter-4-branches",
    chapterNumber: 4,
    title: "Branches: Parallel Universes",
    tagline: "Gian protects 'main' while Nobita builds 'feature-login'",
    conceptBadge: "WORKFLOW · BRANCHES",
    xpReward: 120,
    dialogues: [
      {
        speaker: "Gian",
        avatar: "🦍",
        role: "Team Lead & Main Guard",
        mood: "angry",
        bubbleColor: "#ef476f",
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
        bubbleColor: "#06d6a0",
        message: "Nobita, use 'git checkout -b feature-login'! A branch creates an alternate parallel universe. You can experiment, break things, and rebuild freely. Gian's 'main' universe stays 100% untouched and working!",
      },
      {
        speaker: "Suneo",
        avatar: "🦊",
        role: "Backend Dev",
        mood: "cheerful",
        bubbleColor: "#118ab2",
        message: "And I'm working on 'feature-database' in my own branch! We can both code at the exact same time without stepping on each other's toes.",
      },
    ],
    analogyStory: {
      heading: "The 'Parallel Time Travel' Analogy",
      narrative: "In Doraemon's time machine, branching creates a split timeline. Timeline A ('main') stays calm and working. Timeline B ('feature-login') is where Nobita experiments with laser cannons. If the experiment succeeds, you merge timelines. If it fails, you simply delete the branch!",
      moral: "Always isolate new features in dedicated git branches.",
    },
    keyCommands: [
      { cmd: "git branch", desc: "Lists all local branches (* denotes your current active branch)." },
      { cmd: "git checkout -b <name>", desc: "Creates a brand new branch and switches into it instantly." },
      { cmd: "git switch <name>", desc: "Modern syntax to hop between existing branches." },
    ],
    simulation: {
      command: "git checkout -b feature-login",
      output: `Switched to a new branch 'feature-login'
Branch 'feature-login' set up to track local state.`,
      explanation: "You have jumped into a safe sandbox. Whatever you commit here cannot affect Gian's main branch!",
    },
    quiz: {
      question: "Why should Nobita work on 'feature-login' instead of directly on 'main'?",
      options: [
        { id: 0, text: "Branches make your computer run faster.", isCorrect: false },
        { id: 1, text: "It isolates experimental changes so Gian's stable main code never breaks.", isCorrect: true },
        { id: 2, text: "Git requires all files to have their own branch.", isCorrect: false },
        { id: 3, text: "Because Nobita doesn't have an internet connection.", isCorrect: false },
      ],
      hint: "Think about protecting the working demo from broken code.",
      explanation: "Exactly! Branches keep untested work quarantined from stable production code.",
    },
  },
  {
    id: "chapter-5-conflicts",
    chapterNumber: 5,
    title: "The Great Merge Conflict Battle",
    tagline: "Gian writes 'Score: 100', Nobita writes 'Score: 200' on the same line",
    conceptBadge: "BATTLE · MERGE CONFLICTS",
    xpReward: 150,
    dialogues: [
      {
        speaker: "Nobita",
        avatar: "👓",
        role: "Frontend Dev",
        mood: "panic",
        bubbleColor: "#ffd166",
        message: "Doraemon! The screen is covered in strange alien arrows: '<<<<<<< HEAD' and '=======' and '>>>>>>>'! Git crashed! Is my computer hacked?!",
      },
      {
        speaker: "Gian",
        avatar: "🦍",
        role: "Team Lead",
        mood: "angry",
        bubbleColor: "#ef476f",
        message: "NOBITA! In score.txt, on line 1, I set 'Total Score: 100'. But on your branch you changed line 1 to 'Total Score: 200'! Git doesn't know who is boss!",
      },
      {
        speaker: "Doraemon",
        avatar: "🐱",
        role: "DevOps Wizard",
        mood: "helpful",
        bubbleColor: "#06d6a0",
        message: "Calm down, both of you! That is a MERGE CONFLICT. Git is smart, but it refuses to guess which human is right when both edit the same line. The markers show: <<<<<<< HEAD is Gian's code, and >>>>>>> is Nobita's code. Talk together, delete the markers, keep the correct line, and commit!",
      },
      {
        speaker: "Shizuka",
        avatar: "🎀",
        role: "Lead QA & Mediator",
        mood: "cheerful",
        bubbleColor: "#ef476f",
        message: "Why don't we compromise and make it 'Total Score: 150'? Let's remove the conflict markers and save the file cleanly together!",
      },
    ],
    analogyStory: {
      heading: "The 'Two Chefs, One Recipe' Analogy",
      narrative: "Chef Gian writes 'Add 1 spoon of salt' on Step 4. Chef Nobita writes 'Add 2 spoons of sugar' on Step 4. The kitchen helper (Git) freezes and asks: 'Which one do you want me to cook?' You must open the recipe, choose the right flavor, erase the conflict scribble, and declare it resolved.",
      moral: "Conflicts are not errors—they are Git asking you to make an editorial decision.",
    },
    keyCommands: [
      { cmd: "git merge <branch>", desc: "Merges changes from the target branch into your active branch." },
      { cmd: "git status", desc: "Identifies both modified files that have conflict markers." },
      { cmd: "git add <resolved-file>", desc: "Marks the conflict as resolved after you edit the file." },
    ],
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
        { id: 0, text: "It randomly chooses the file with the newer timestamp.", isCorrect: false },
        { id: 1, text: "It deletes both files from the hard drive.", isCorrect: false },
        { id: 2, text: "It flags a merge conflict with markers (<<<<<<<, =======, >>>>>>>) and asks the developer to decide.", isCorrect: true },
        { id: 3, text: "It automatically calls GitHub support.", isCorrect: false },
      ],
      hint: "Git refuses to guess your intentions silently.",
      explanation: "Bullseye! Git places conflict markers in the file and waits for human resolution.",
    },
  },
  {
    id: "chapter-6-github-pr",
    chapterNumber: 6,
    title: "GitHub Cloud, Remote Sync & Pull Requests",
    tagline: "Collaborating across computers: Push, Pull & Code Review",
    conceptBadge: "COLLABORATION · PULL REQUESTS",
    xpReward: 200,
    dialogues: [
      {
        speaker: "Suneo",
        avatar: "🦊",
        role: "Backend Dev",
        mood: "smug",
        bubbleColor: "#118ab2",
        message: "I just created our remote repository on GitHub: 'gian-doraemon/school-project'. I pushed my database code to the cloud. You two can clone it now!",
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
        speaker: "Shizuka",
        avatar: "🎀",
        role: "Lead QA & Code Reviewer",
        mood: "helpful",
        bubbleColor: "#ef476f",
        message: "I reviewed Nobita's Pull Request on GitHub. The code is clean, all tests pass, and he even included an OSI license! Gian, can you give the final merge approval?",
      },
      {
        speaker: "Gian",
        avatar: "🦍",
        role: "Team Lead & Repo Owner",
        mood: "cheerful",
        bubbleColor: "#06d6a0",
        message: "Bwahaha! Excellent work, team! Clicking 'Merge Pull Request'! Our school project tracker is live on GitHub and ready for Hacktoberfest!",
      },
    ],
    analogyStory: {
      heading: "The 'School Bulletin Board' Analogy",
      narrative: "Git is your personal notebook on your desk. GitHub is the school bulletin board in the main hallway. When you 'push', you pin a copy to the board. When teammates 'pull', they copy the board updates into their notebooks. A 'Pull Request' is politely asking the teacher (Gian) to review your page before pinning it to the board permanently.",
      moral: "GitHub turns local version control into global open-source collaboration.",
    },
    keyCommands: [
      { cmd: "git clone <url>", desc: "Downloads a full project repository from GitHub to your computer." },
      { cmd: "git push origin <branch>", desc: "Uploads your local branch commits to GitHub." },
      { cmd: "git pull origin main", desc: "Fetches and integrates the latest changes from GitHub." },
    ],
    simulation: {
      command: "git push origin feature-ui",
      output: `Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Writing objects: 100% (5/5), 1.24 KiB | 1.24 MiB/s, done.
Total 5 (delta 2), reused 0 (delta 0)
remote: Create a pull request for 'feature-ui' on GitHub by visiting:
remote:      https://github.com/gian-doraemon/school-project/pull/new/feature-ui
To https://github.com/gian-doraemon/school-project.git
 * [new branch]      feature-ui -> feature-ui`,
      explanation: "Your code is safely on the GitHub cloud! A Pull Request URL is ready for Gian and Shizuka to review.",
    },
    quiz: {
      question: "What is a Pull Request (PR) on GitHub?",
      options: [
        { id: 0, text: "A request to delete someone's account.", isCorrect: false },
        { id: 1, text: "A formal request to review and merge your branch's changes into another branch (e.g., main).", isCorrect: true },
        { id: 2, text: "An error message when your internet disconnects.", isCorrect: false },
        { id: 3, text: "A command to download files without Git.", isCorrect: false },
      ],
      hint: "It lets teammates inspect, comment, and test your code before merging.",
      explanation: "Victory! A Pull Request is the core collaboration mechanism of open source.",
    },
  },
];
