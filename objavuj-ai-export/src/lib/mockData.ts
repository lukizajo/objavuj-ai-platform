// Mock Data for Development
// This data is used when DATA_SOURCE = 'mock' or when Supabase is not configured

export interface MockCourse {
  id: string
  slug: string
  title: string
  description: string
  imageUrl: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  lessonsCount: number
  isPublished: boolean
}

export interface MockModule {
  id: string
  courseId: string
  title: string
  description: string
  order: number
  isFree: boolean
  isLocked: boolean
}

export interface MockLesson {
  id: string
  moduleId: string
  title: string
  description: string
  content: string
  type: 'video' | 'text' | 'quiz' | 'interactive' | 'project'
  duration: string
  order: number
  audioUrl: string | null
  videoUrl: string | null
  applications?: string[]  // AI tools used in this lesson (e.g., 'chatgpt', 'claude', 'midjourney')
  materials: Array<{
    id: string
    name: string
    url: string
    fileType: string
    fileSize: number | null
  }>
}

export interface MockUserProgress {
  userId: string
  courseId: string
  lessonId: string
  isCompleted: boolean
  completedAt: string | null
  progressPercent: number
}

export interface MockUser {
  id: string
  email: string
  fullName: string
  avatarUrl: string
  preferredLanguage: 'sk' | 'cz' | 'en'
}

// Sample audio URLs for lessons
const SAMPLE_AUDIO_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

// Mock Users
export const mockUsers: MockUser[] = [
  {
    id: 'user-1',
    email: 'demo@objavuj.ai',
    fullName: 'Demo User',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    preferredLanguage: 'sk'
  }
]

// Mock Courses
export const mockCourses: MockCourse[] = [
  {
    id: 'course-1',
    slug: 'ai-fundamentals',
    title: 'Zaklady Umelej Inteligencie',
    description: 'Kompletny kurz pre pochopenie zakladov AI, strojoveho ucenia a neuronových sieti. Naucte sa, ako AI funguje a ako ju mozete vyuzit vo vasej praci.',
    imageUrl: '/images/courses/ai-fundamentals.jpg',
    category: 'AI Fundamentals',
    difficulty: 'beginner',
    duration: '8 hodin',
    lessonsCount: 24,
    isPublished: true
  },
  {
    id: 'course-2',
    slug: 'prompt-engineering',
    title: 'Prompt Engineering Masterclass',
    description: 'Naucte sa pist efektivne prompty pre ChatGPT, Claude a dalsie AI nastroje. Zvyste svoju produktivitu s pokrocilymi technikami.',
    imageUrl: '/images/courses/prompt-engineering.png',
    category: 'Practical AI',
    difficulty: 'intermediate',
    duration: '6 hodin',
    lessonsCount: 18,
    isPublished: true
  },
  {
    id: 'course-3',
    slug: 'ai-for-business',
    title: 'AI pre Podnikanie',
    description: 'Implementujte AI vo vasom podniku. Automatizacia, analyza dat, zakaznicka podpora a viac.',
    imageUrl: '/images/courses/ai-business.png',
    category: 'Business',
    difficulty: 'intermediate',
    duration: '10 hodin',
    lessonsCount: 30,
    isPublished: true
  },
  {
    id: 'course-4',
    slug: 'generative-ai-art',
    title: 'Generativna AI a Umenie',
    description: 'Tvorte obrazy, grafiku a vizualni obsah pomocou AI nastrojov ako Midjourney, DALL-E a Stable Diffusion.',
    imageUrl: '/images/courses/generative-art.jpg',
    category: 'Creative AI',
    difficulty: 'beginner',
    duration: '5 hodin',
    lessonsCount: 15,
    isPublished: true
  },
  {
    id: 'course-5',
    slug: 'objavuj-ai',
    title: 'OBJAVUJ-AI: Prakticky Kurz AI Nastrojov',
    description: 'Kompletny prakticky kurz o vyuzivani AI nastrojov v kazdennom zivote. Naucte sa pracovat s ChatGPT, Claude, Midjourney, Gemini a dalsimi AI aplikaciami.',
    imageUrl: '/images/courses/ai-fundamentals.jpg',
    category: 'Practical AI',
    difficulty: 'beginner',
    duration: '12 hodin',
    lessonsCount: 36,
    isPublished: true
  }
]

// Mock Modules
export const mockModules: MockModule[] = [
  // Course 5: OBJAVUJ-AI - Module 0 (Introduction)
  {
    id: 'm0',
    courseId: 'course-5',
    title: 'Uvod do kurzu',
    description: 'Zoznámte sa s kurzom a AI nástrojmi, ktoré budeme používať',
    order: 0,
    isFree: true,
    isLocked: false
  },
  // Course 1: AI Fundamentals
  {
    id: 'm1',
    courseId: 'course-1',
    title: 'Uvod do Umelej Inteligencie',
    description: 'Zakladne koncepty a historia AI',
    order: 1,
    isFree: true,
    isLocked: false
  },
  {
    id: 'm2',
    courseId: 'course-1',
    title: 'Strojove Ucenie',
    description: 'Ako pocitace sa ucia z dat',
    order: 2,
    isFree: false,
    isLocked: false
  },
  {
    id: 'm3',
    courseId: 'course-1',
    title: 'Neuronove Siete',
    description: 'Zaklady hlbokeho ucenia',
    order: 3,
    isFree: false,
    isLocked: true
  },
  // Course 2: Prompt Engineering
  {
    id: 'm4',
    courseId: 'course-2',
    title: 'Zaklady Promptov',
    description: 'Ako komunikovat s AI',
    order: 1,
    isFree: true,
    isLocked: false
  },
  {
    id: 'm5',
    courseId: 'course-2',
    title: 'Pokrocile Techniky',
    description: 'Chain-of-thought, Few-shot learning',
    order: 2,
    isFree: false,
    isLocked: false
  }
]

// Mock Lessons
export const mockLessons: MockLesson[] = [
  // Module 0: Uvod do kurzu OBJAVUJ-AI
  {
    id: 'l0-1',
    moduleId: 'm0',
    title: 'Vitajte v kurze OBJAVUJ-AI',
    description: 'Úvodná lekcia kurzu - ciele, štruktúra a čo sa naučíte',
    content: `# Vitajte v kurze OBJAVUJ-AI

Tento kurz vás naučí prakticky používať najmodernejšie AI nástroje v každodennom živote a práci.

## Ciele kurzu

- Naučiť sa efektívne používať ChatGPT, Claude, Gemini a ďalšie AI asistenty
- Vytvárať úžasné obrazy pomocou Midjourney a DALL-E
- Automatizovať rutinné úlohy pomocou AI
- Zvýšiť produktivitu a kreativitu

## Štruktúra kurzu

Kurz je rozdelený do modulov podľa jednotlivých AI nástrojov a oblastí použitia.`,
    type: 'video',
    duration: '10 min',
    order: 1,
    audioUrl: SAMPLE_AUDIO_URL,
    videoUrl: null,
    applications: ['chatgpt', 'claude', 'midjourney', 'gemini', 'perplexity'],
    materials: [
      { id: 'f0-1', name: 'Prehlad_kurzu.pdf', url: '#', fileType: 'pdf', fileSize: 1500000 }
    ]
  },
  {
    id: 'l0-2',
    moduleId: 'm0',
    title: 'Prehľad AI nástrojov',
    description: 'Zoznámte sa s nástrojmi, ktoré budeme používať v kurze',
    content: `# Prehľad AI nástrojov

V tomto kurze sa naučíte pracovať s nasledujúcimi AI nástrojmi:

## Textové AI asistenty

### ChatGPT
- Najrozšírenejší AI chatbot od OpenAI
- Vynikajúci na písanie, programovanie, brainstorming

### Claude
- AI asistent od Anthropic
- Špecializuje sa na dlhé kontexty a analýzu dokumentov

### Gemini
- AI od Google
- Integrovaný s Google službami

### Perplexity
- AI vyhľadávač
- Kombinuje chatbot s webovým vyhľadávaním

## Generátory obrazov

### Midjourney
- Špičkový nástroj na tvorbu AI obrazov
- Fotorealistické a umelecké výstupy

Každý nástroj má svoje silné stránky a naučíte sa, kedy ktorý použiť.`,
    type: 'text',
    duration: '15 min',
    order: 2,
    audioUrl: SAMPLE_AUDIO_URL,
    videoUrl: null,
    applications: ['chatgpt', 'claude', 'midjourney', 'gemini', 'perplexity'],
    materials: [
      { id: 'f0-2', name: 'Porovnanie_AI_nastrojov.pdf', url: '#', fileType: 'pdf', fileSize: 3000000 }
    ]
  },
  {
    id: 'l0-3',
    moduleId: 'm0',
    title: 'Ako sa prihlásiť a začať používať AI nástroje',
    description: 'Praktický návod na registráciu a prvé kroky s AI nástrojmi',
    content: `# Ako sa prihlásiť a začať používať AI nástroje

## ChatGPT
1. Navštívte chat.openai.com
2. Vytvorte účet pomocou e-mailu alebo Google účtu
3. Bezplatná verzia je dostupná okamžite
4. ChatGPT Plus (platená verzia) stojí $20/mesiac

## Claude
1. Navštívte claude.ai
2. Prihlásenie cez e-mail
3. Bezplatná verzia dostupná
4. Claude Pro za $20/mesiac

## Gemini
1. Navštívte gemini.google.com
2. Prihlásenie Google účtom
3. Bezplatné používanie
4. Gemini Advanced v rámci Google One AI Premium

## Midjourney
1. Vyžaduje Discord účet
2. Navštívte midjourney.com
3. Základný plán od $10/mesiac

## Perplexity
1. Navštívte perplexity.ai
2. Bezplatné používanie bez registrácie
3. Pro verzia za $20/mesiac`,
    type: 'interactive',
    duration: '20 min',
    order: 3,
    audioUrl: SAMPLE_AUDIO_URL,
    videoUrl: null,
    applications: ['chatgpt', 'claude', 'midjourney', 'gemini', 'perplexity'],
    materials: [
      { id: 'f0-3', name: 'Registracny_navod.pdf', url: '#', fileType: 'pdf', fileSize: 2000000 },
      { id: 'f0-4', name: 'Cenove_plany.xlsx', url: '#', fileType: 'xlsx', fileSize: 500000 }
    ]
  },
  // Module 1: Uvod do AI
  {
    id: 'l1',
    moduleId: 'm1',
    title: 'Co je Umela Inteligencia?',
    description: 'Definicia a zakladne koncepty AI',
    content: `# Co je Umela Inteligencia?

Umela inteligencia (AI) je odvetvie informatiky zamerane na vytvaranie strojov schopnych vykonavat ulohy, ktore typicky vyzaduju ludsku inteligenciu.

## Klucove koncepty

- **Strojove ucenie**: Schopnost ucit sa z dat
- **Spracovanie prirodzeneho jazyka**: Porozumenie a generovanie textu
- **Pocitacove videnie**: Analyza obrazov a videa

## Historia AI

AI sa zacala rozvijat v 50. rokoch 20. storocia. Alan Turing polozil zaklady s otazkou "Mozu stroje mysliet?"

### Dolezite milniky

1. 1956 - Dartmouth konferencia - zrod AI ako vedneho odboru
2. 1997 - Deep Blue porazi sveoveho sampiona v sachoch
3. 2016 - AlphaGo porazi svetoveho sampiona v Go
4. 2022 - ChatGPT revolucionalizuje interakciu s AI`,
    type: 'video',
    duration: '15 min',
    order: 1,
    audioUrl: SAMPLE_AUDIO_URL,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    materials: [
      { id: 'f1', name: 'Prezentacia.pdf', url: '#', fileType: 'pdf', fileSize: 2500000 },
      { id: 'f2', name: 'Zhrnutie.docx', url: '#', fileType: 'docx', fileSize: 150000 }
    ]
  },
  {
    id: 'l2',
    moduleId: 'm1',
    title: 'Typy Umelej Inteligencie',
    description: 'Slaba AI vs Silna AI, ANI, AGI, ASI',
    content: `# Typy Umelej Inteligencie

## Rozdelenie podla schopnosti

### 1. Uzka AI (ANI - Artificial Narrow Intelligence)
- Specializovana na jednu ulohu
- Priklady: Siri, Alexa, sachove programy

### 2. Vseobecna AI (AGI - Artificial General Intelligence)  
- Schopna vykonat akukolvek intelektualnu ulohu
- Zatial neexistuje

### 3. Superinteligencia (ASI)
- Prevysuje ludsku inteligenciu vo vsetkych oblastiach
- Teoreticky koncept

## Rozdelenie podla pristupu

- **Symbolicka AI**: Pravidla a logika
- **Konekcionisticka AI**: Neuronove siete
- **Hybridna AI**: Kombinacia pristupov`,
    type: 'text',
    duration: '12 min',
    order: 2,
    audioUrl: SAMPLE_AUDIO_URL,
    videoUrl: null,
    materials: [
      { id: 'f3', name: 'Infografika.png', url: '#', fileType: 'image', fileSize: 500000 }
    ]
  },
  {
    id: 'l3',
    moduleId: 'm1',
    title: 'Quiz: Zaklady AI',
    description: 'Otestujte si svoje vedomosti',
    content: `# Quiz: Zaklady AI

Tento kviz overi vase pochopenie zakladnych konceptov umelej inteligencie.

## Otazky

1. Kto je povazovany za otca umelej inteligencie?
2. Aky typ AI predstavuje ChatGPT?
3. Co znamena skratka AGI?

*(Interaktivny kviz bude k dispozicii po integrácii backendu)*`,
    type: 'quiz',
    duration: '10 min',
    order: 3,
    audioUrl: null,
    videoUrl: null,
    materials: []
  },
  // Module 2: Strojove Ucenie
  {
    id: 'l4',
    moduleId: 'm2',
    title: 'Uvod do Strojoveho Ucenia',
    description: 'Co je ML a ako funguje',
    content: `# Uvod do Strojoveho Ucenia

Strojove ucenie (Machine Learning) je podoblast AI, ktora umoznuje pocitacom ucit sa z dat bez explicitneho programovania.

## Zakladne typy

### Ucenie s ucitelom (Supervised Learning)
- Treningove data obsahuju spravne odpovede
- Priklady: klasifikacia emailov, predikcia cien

### Ucenie bez ucitela (Unsupervised Learning)
- Algoritmus hlada vzory v datach
- Priklady: zhlukovanie zakaznikov, detekcia anomalii

### Posilnovane ucenie (Reinforcement Learning)
- Agent sa uci interakciou s prostredim
- Priklady: hry, robotika`,
    type: 'video',
    duration: '20 min',
    order: 1,
    audioUrl: SAMPLE_AUDIO_URL,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    materials: [
      { id: 'f4', name: 'ML_Cheatsheet.pdf', url: '#', fileType: 'pdf', fileSize: 1200000 }
    ]
  },
  {
    id: 'l5',
    moduleId: 'm2',
    title: 'Prakticke Cvicenie: Vas Prvy Model',
    description: 'Vytvorte jednoduchy ML model',
    content: `# Prakticke Cvicenie: Vas Prvy Model

V tomto cviceni vytvorime jednoduchy klasifikacny model.

## Kroky

1. Pripravte data
2. Vyberte algoritmus
3. Trenujte model
4. Vyhodnodte vysledky

## Kod

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Priprava dat
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Trenovanie modelu
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Vyhodnotenie
accuracy = model.score(X_test, y_test)
print(f"Presnost: {accuracy:.2%}")
\`\`\``,
    type: 'interactive',
    duration: '30 min',
    order: 2,
    audioUrl: null,
    videoUrl: null,
    materials: [
      { id: 'f5', name: 'jupyter_notebook.ipynb', url: '#', fileType: 'notebook', fileSize: 85000 },
      { id: 'f6', name: 'sample_data.csv', url: '#', fileType: 'csv', fileSize: 45000 }
    ]
  },
  // Module 3: Neuronove Siete
  {
    id: 'l6',
    moduleId: 'm3',
    title: 'Ako Funguju Neuronove Siete',
    description: 'Architektura a principy',
    content: `# Ako Funguju Neuronove Siete

Neuronove siete su inspírovane biologickym mozgom.

## Zakladne komponenty

- **Neurony**: Zakladne vypoctove jednotky
- **Vrstvy**: Organizacia neuronov
- **Vahy**: Parametre, ktore sa ucia

## Typy vrstiev

1. Vstupna vrstva
2. Skryte vrstvy
3. Vystupna vrstva`,
    type: 'video',
    duration: '25 min',
    order: 1,
    audioUrl: SAMPLE_AUDIO_URL,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    materials: []
  },
  // Module 4: Zaklady Promptov
  {
    id: 'l7',
    moduleId: 'm4',
    title: 'Anatomia Dobreho Promptu',
    description: 'Struktura a elementy efektivneho promptu',
    content: `# Anatomia Dobreho Promptu

Efektivny prompt ma jasnu strukturu a obsahuje vsetky potrebne informacie.

## Klucove elementy

### 1. Kontext
Poskytnite AI relevantne pozadie.

### 2. Instrukcia
Jasne definujte, co chcete dosiahnut.

### 3. Format
Specifikujte ocakavany format vystupu.

### 4. Priklady
Ukazte AI, co ocakavate.

## Priklad

\`\`\`
Kontext: Si expertny copywriter.
Instrukcia: Napis reklamny text pre novu kaviaren.
Format: 3 varianty, kazda max 50 slov.
Priklad: "Zacnite den s kavou, ktora vas prebudí..."
\`\`\``,
    type: 'text',
    duration: '15 min',
    order: 1,
    audioUrl: SAMPLE_AUDIO_URL,
    videoUrl: null,
    materials: [
      { id: 'f7', name: 'Prompt_Templates.pdf', url: '#', fileType: 'pdf', fileSize: 890000 }
    ]
  }
]

// Mock User Progress
export const mockUserProgress: MockUserProgress[] = [
  {
    userId: 'user-1',
    courseId: 'course-1',
    lessonId: 'l1',
    isCompleted: true,
    completedAt: '2024-01-15T10:30:00Z',
    progressPercent: 100
  },
  {
    userId: 'user-1',
    courseId: 'course-1',
    lessonId: 'l2',
    isCompleted: true,
    completedAt: '2024-01-16T14:20:00Z',
    progressPercent: 100
  }
]

// Helper to get mock user
export const getMockUser = (): MockUser => mockUsers[0]

// ============================================
// NEW DATA STRUCTURES FOR PLATFORM ENHANCEMENT
// ============================================

// Podcast Episodes
export interface MockPodcastEpisode {
  id: string
  title: string
  description: string
  duration: string
  publishedAt: string
  audioUrl: string
  spotifyUrl: string
  youtubeUrl: string
  thumbnailUrl: string
  category: string
  guests?: string[]
}

export const mockPodcastEpisodes: MockPodcastEpisode[] = [
  {
    id: 'ep-1',
    title: 'Buducnost AI v Slovenskom Vzdelavani',
    description: 'Diskutujeme o tom, ako umelá inteligencia transformuje vzdelavaci system na Slovensku. Hosť: Prof. Dr. Ján Novák z FIIT STU.',
    duration: '45:32',
    publishedAt: '2024-12-01',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    spotifyUrl: 'https://open.spotify.com/episode/example',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: '/images/podcast/education.jpg',
    category: 'Vzdelavanie',
    guests: ['Prof. Dr. Ján Novák']
  },
  {
    id: 'ep-2',
    title: 'ChatGPT a Prompt Engineering v Praxi',
    description: 'Praktické tipy a triky na prácu s ChatGPT. Ako písať efektívne prompty pre rôzne scenáre v práci a biznis prostredí.',
    duration: '38:15',
    publishedAt: '2024-11-25',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    spotifyUrl: 'https://open.spotify.com/episode/example2',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: '/images/podcast/chatgpt.jpg',
    category: 'Praktické AI',
    guests: ['Ing. Peter Kovács']
  },
  {
    id: 'ep-3',
    title: 'AI v Podnikani: Prípadové Štúdie',
    description: 'Reálne príklady implementácie AI v slovenských firmách. Úspechy, výzvy a poučenia z praxe.',
    duration: '52:18',
    publishedAt: '2024-11-18',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    spotifyUrl: 'https://open.spotify.com/episode/example3',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: '/images/podcast/business.jpg',
    category: 'Business',
    guests: ['Mgr. Mária Horváthová', 'Bc. Tomáš Szabó']
  },
  {
    id: 'ep-4',
    title: 'Etika a Bezpečnosť v AI',
    description: 'Diskusia o etických otázkach umelej inteligencie, ochrane súkromia a bezpečnosti AI systémov.',
    duration: '41:27',
    publishedAt: '2024-11-11',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    spotifyUrl: 'https://open.spotify.com/episode/example4',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: '/images/podcast/ethics.png',
    category: 'Etika & Bezpečnosť',
    guests: ['Dr. Eva Nováková']
  }
]

// Community Posts
export interface MockCommunityPost {
  id: string
  authorId: string
  authorName: string
  authorAvatar: string
  title: string
  content: string
  category: 'discussion' | 'question' | 'showcase' | 'resource'
  tags: string[]
  likes: number
  comments: number
  createdAt: string
  isResolved?: boolean
}

export const mockCommunityPosts: MockCommunityPost[] = [
  {
    id: 'post-1',
    authorId: 'user-1',
    authorName: 'Martina Kováčová',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    title: 'Ako najlepšie využiť ChatGPT pre marketing?',
    content: 'Ahoj komunita! Skúšam ChatGPT na tvorbu marketingového obsahu. Máte osvedčené prompty alebo tipy? Zvlášť ma zaujíma copywriting pre sociálne siete.',
    category: 'question',
    tags: ['ChatGPT', 'Marketing', 'Copywriting'],
    likes: 24,
    comments: 8,
    createdAt: '2024-12-02T10:30:00Z',
    isResolved: false
  },
  {
    id: 'post-2',
    authorId: 'user-2',
    authorName: 'Ján Novotný',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    title: 'Vytvoril som AI chatbota pre zákaznícku podporu',
    content: 'Chcel by som sa podeliť o svoj projekt - AI chatbot postavený na GPT-4, ktorý odpoveda na otázky zákazníkov. Za týždeň znížil čas odpovede o 60%. Ak máte záujem o technické detaily, rád odpoviem!',
    category: 'showcase',
    tags: ['Projekt', 'Chatbot', 'GPT-4', 'Zákaznícka podpora'],
    likes: 47,
    comments: 15,
    createdAt: '2024-12-01T14:20:00Z'
  },
  {
    id: 'post-3',
    authorId: 'user-3',
    authorName: 'Peter Horváth',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    title: 'Najlepšie AI nástroje pre programátorov 2024',
    content: 'Zoznam AI nástrojov, ktoré denne používam: GitHub Copilot, Cursor, ChatGPT, Claude. Každý má svoje výhody. GitHub Copilot je super na boilerplate kód, Cursor na refactoring, ChatGPT na komplexnejšie problémy...',
    category: 'resource',
    tags: ['AI nástroje', 'Programovanie', 'Produktivita'],
    likes: 63,
    comments: 22,
    createdAt: '2024-11-30T09:15:00Z'
  },
  {
    id: 'post-4',
    authorId: 'user-4',
    authorName: 'Lucia Szabová',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    title: 'Diskusia: AI nahradí ľudí v kreatívnych profesiách?',
    content: 'Zaujímavá téma na diskusiu. Čo si myslíte o budúcnosti kreatívnych profesií v ére AI? Osobne verím, že AI je nástroj, ktorý posilňuje ľudskú kreativitu, nie ju nahrádza.',
    category: 'discussion',
    tags: ['Budúcnosť práce', 'Kreativita', 'AI a spoločnosť'],
    likes: 31,
    comments: 19,
    createdAt: '2024-11-29T16:45:00Z'
  }
]

// Reward System
export interface MockReward {
  id: string
  title: string
  description: string
  icon: string
  pointsRequired: number
  type: 'badge' | 'level' | 'streak' | 'achievement'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  isUnlocked: boolean
  unlockedAt?: string
}

export interface MockUserReward {
  userId: string
  rewardId: string
  unlockedAt: string
  pointsEarned: number
}

export interface MockLeaderboardEntry {
  userId: string
  userName: string
  userAvatar: string
  totalPoints: number
  completedCourses: number
  rank: number
  streakDays: number
  level: string
}

// Mock Rewards Data
export const mockRewards: MockReward[] = [
  // Level-based rewards
  {
    id: 'level-beginner',
    title: 'Začiatočník',
    description: 'Začnite svoju cestu AI',
    icon: '🌱',
    pointsRequired: 0,
    type: 'level',
    rarity: 'common',
    isUnlocked: true,
    unlockedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'level-intermediate',
    title: 'Stredne pokročilý',
    description: 'Pokročilý AI používateľ',
    icon: '🚀',
    pointsRequired: 500,
    type: 'level',
    rarity: 'common',
    isUnlocked: false
  },
  {
    id: 'level-advanced',
    title: 'Pokročilý',
    description: 'Skúsený AI expert',
    icon: '⚡',
    pointsRequired: 1500,
    type: 'level',
    rarity: 'rare',
    isUnlocked: false
  },
  {
    id: 'level-expert',
    title: 'Expert',
    description: 'AI expert a mentor',
    icon: '🏆',
    pointsRequired: 3000,
    type: 'level',
    rarity: 'epic',
    isUnlocked: false
  },
  {
    id: 'level-master',
    title: 'Majster',
    description: 'Majster AI technológií',
    icon: '👑',
    pointsRequired: 5000,
    type: 'level',
    rarity: 'legendary',
    isUnlocked: false
  },
  
  // Achievement badges
  {
    id: 'achievement-first-lesson',
    title: 'Prvá lekcia',
    description: 'Dokončili ste svoju prvú lekciu',
    icon: '🎯',
    pointsRequired: 10,
    type: 'achievement',
    rarity: 'common',
    isUnlocked: true,
    unlockedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'achievement-first-course',
    title: 'Prvý kurz',
    description: 'Dokončili ste svoj prvý kurz',
    icon: '📚',
    pointsRequired: 100,
    type: 'achievement',
    rarity: 'common',
    isUnlocked: false
  },
  {
    id: 'achievement-perfect-score',
    title: 'Perfektné skóre',
    description: 'Získali ste 100% v teste',
    icon: '💯',
    pointsRequired: 200,
    type: 'achievement',
    rarity: 'rare',
    isUnlocked: false
  },
  {
    id: 'achievement-quick-learner',
    title: 'Rýchly študent',
    description: 'Dokončili ste lekciu za menej ako 30 minút',
    icon: '⚡',
    pointsRequired: 150,
    type: 'achievement',
    rarity: 'rare',
    isUnlocked: false
  },
  {
    id: 'achievement-dedicated-learner',
    title: 'Oddaný študent',
    description: 'Študovali ste 7 dní v rade',
    icon: '🔥',
    pointsRequired: 300,
    type: 'streak',
    rarity: 'epic',
    isUnlocked: false
  },
  {
    id: 'achievement-ai-explorer',
    title: 'AI prieskumník',
    description: 'Použili ste všetky AI nástroje v kurze',
    icon: '🔍',
    pointsRequired: 250,
    type: 'achievement',
    rarity: 'rare',
    isUnlocked: false
  },
  {
    id: 'achievement-prompt-master',
    title: 'Majster promptov',
    description: 'Vytvorili ste 50 efektívnych promptov',
    icon: '✍️',
    pointsRequired: 400,
    type: 'achievement',
    rarity: 'epic',
    isUnlocked: false
  },
  {
    id: 'achievement-course-completer',
    title: 'Dokončovateľ kurzov',
    description: 'Dokončili ste 5 kurzov',
    icon: '🎓',
    pointsRequired: 1000,
    type: 'achievement',
    rarity: 'epic',
    isUnlocked: false
  },
  {
    id: 'achievement-streak-7',
    title: '7-dňová séria',
    description: 'Študovali ste 7 dní v rade',
    icon: '📅',
    pointsRequired: 70,
    type: 'streak',
    rarity: 'common',
    isUnlocked: true,
    unlockedAt: '2024-01-20T14:00:00Z'
  },
  {
    id: 'achievement-streak-30',
    title: '30-dňová séria',
    description: 'Študovali ste 30 dní v rade',
    icon: '🏃‍♂️',
    pointsRequired: 300,
    type: 'streak',
    rarity: 'epic',
    isUnlocked: false
  }
]

// Mock User Rewards
export const mockUserRewards: MockUserReward[] = [
  {
    userId: 'user-1',
    rewardId: 'level-beginner',
    unlockedAt: '2024-01-01T00:00:00Z',
    pointsEarned: 0
  },
  {
    userId: 'user-1',
    rewardId: 'achievement-first-lesson',
    unlockedAt: '2024-01-15T10:30:00Z',
    pointsEarned: 10
  },
  {
    userId: 'user-1',
    rewardId: 'achievement-streak-7',
    unlockedAt: '2024-01-20T14:00:00Z',
    pointsEarned: 70
  }
]

// Mock Leaderboard
export const mockLeaderboard: MockLeaderboardEntry[] = [
  {
    userId: 'user-1',
    userName: 'Demo User',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    totalPoints: 280,
    completedCourses: 2,
    rank: 1,
    streakDays: 7,
    level: 'Začiatočník'
  },
  {
    userId: 'user-2',
    userName: 'Martina Kováčová',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    totalPoints: 1240,
    completedCourses: 5,
    rank: 2,
    streakDays: 15,
    level: 'Stredne pokročilý'
  },
  {
    userId: 'user-3',
    userName: 'Ján Novotný',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    totalPoints: 890,
    completedCourses: 3,
    rank: 3,
    streakDays: 12,
    level: 'Stredne pokročilý'
  },
  {
    userId: 'user-4',
    userName: 'Peter Horváth',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    totalPoints: 756,
    completedCourses: 3,
    rank: 4,
    streakDays: 8,
    level: 'Pokročilý'
  },
  {
    userId: 'user-5',
    userName: 'Lucia Szabová',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    totalPoints: 520,
    completedCourses: 2,
    rank: 5,
    streakDays: 5,
    level: 'Pokročilý'
  },
  {
    userId: 'user-6',
    userName: 'Tomáš Krajčír',
    userAvatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face',
    totalPoints: 445,
    completedCourses: 2,
    rank: 6,
    streakDays: 4,
    level: 'Začiatočník'
  },
  {
    userId: 'user-7',
    userName: 'Anna Moravčíková',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
    totalPoints: 380,
    completedCourses: 1,
    rank: 7,
    streakDays: 3,
    level: 'Začiatočník'
  },
  {
    userId: 'user-8',
    userName: 'Marek Dvořák',
    userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    totalPoints: 320,
    completedCourses: 1,
    rank: 8,
    streakDays: 2,
    level: 'Začiatočník'
  },
  {
    userId: 'user-9',
    userName: 'Zuzana Fialová',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    totalPoints: 180,
    completedCourses: 1,
    rank: 9,
    streakDays: 1,
    level: 'Začiatočník'
  },
  {
    userId: 'user-10',
    userName: 'Roman Veselý',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    totalPoints: 120,
    completedCourses: 0,
    rank: 10,
    streakDays: 0,
    level: 'Začiatočník'
  }
]

// News Articles
export interface MockNewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  imageUrl: string
  category: string
  publishedAt: string
  readTime: string
  author: string
}

export const mockNewsArticles: MockNewsArticle[] = [
  {
    id: 'news-1',
    title: 'OpenAI Predstavuje GPT-5: Revolúcia v AI',
    excerpt: 'Najnovšia verzia ChatGPT prináša multimodálne schopnosti a ešte lepšie porozumenie kontextu.',
    content: 'OpenAI dnes oznámila vydanie GPT-5, ktorá posúva hranice umelej inteligencie. Nový model prináša významné vylepšenia v multimodálnom spracovaní, lepšie logické uvažovanie a rozšírené kontextové okno až na 1 milión tokenov...',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
    category: 'AI Novinky',
    publishedAt: '2024-12-01',
    readTime: '5 min',
    author: 'Redakcia OBJAVUJ-AI'
  },
  {
    id: 'news-2',
    title: 'Slovenské Startupy Adoptujú AI v Rekordnom Tempe',
    excerpt: 'Prieskum ukazuje, že až 78% slovenských startupov už využíva AI technológie vo svojom biznise.',
    content: 'Podľa najnovšieho prieskumu Slovak Startup Awards, slovenské startupy masívne adoptujú AI technológie. Najpopulárnejšie oblasti použitia sú zákaznícka podpora, automatizácia procesov a dátová analýza...',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    category: 'Business',
    publishedAt: '2024-11-28',
    readTime: '4 min',
    author: 'Mgr. Anna Moravčíková'
  },
  {
    id: 'news-3',
    title: 'AI v Školstve: Prvé Školy Spúšťajú Pilotné Programy',
    excerpt: 'Ministerstvo školstva podporuje integráciu AI nástrojov do vzdelávacieho procesu na slovenských školách.',
    content: 'Ministerstvo školstva, vedy, výskumu a športu SR spustilo pilotný program integrácie AI do výučby. Do programu sa zapojilo 25 základných a stredných škôl po celom Slovensku...',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop',
    category: 'Vzdelávanie',
    publishedAt: '2024-11-25',
    readTime: '6 min',
    author: 'Bc. Tomáš Krajčír'
  }
]

// Use Cases
export interface MockUseCase {
  id: string
  title: string
  company: string
  industry: string
  description: string
  challenge: string
  solution: string
  results: string[]
  imageUrl: string
  tags: string[]
}

export const mockUseCases: MockUseCase[] = [
  {
    id: 'case-1',
    title: 'Automatizácia Zákazníckej Podpory pomocou AI',
    company: 'Slovak E-shop s.r.o.',
    industry: 'E-commerce',
    description: 'Implementácia AI chatbota pre 24/7 zákaznícku podporu v online obchode s elektronikou.',
    challenge: 'Zákaznícka podpora nezvládala nápor otázok počas sezóny. Priemerný čas odpovede bol 4 hodiny, čo viedlo k stratám zákazníkov.',
    solution: 'Nasadili sme AI chatbota postaveného na GPT-4, natrénovaného na produktovom katalógu a FAQ. Chatbot rieši 85% bežných otázok automaticky, komplexnejšie prípady eskaluje na ľudí.',
    results: [
      'Zníženie času odpovede z 4 hodín na 30 sekúnd',
      'Vyriešených 85% otázok bez ľudského zásahu',
      '40% zvýšenie spokojnosti zákazníkov',
      'Úspora 3 pracovných pozícií v call centre'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=450&fit=crop',
    tags: ['Chatbot', 'Zákaznícka podpora', 'E-commerce', 'GPT-4']
  },
  {
    id: 'case-2',
    title: 'AI pre Personalizovaný Marketing',
    company: 'Finančná Skupina NOVA',
    industry: 'Finančné služby',
    description: 'Využitie AI na personalizáciu marketingových kampaní a zvýšenie konverzií.',
    challenge: 'Nízka konverzia emailových kampaní (1.2%) a vysoká miera odhlasovania. Generický obsah nerezonoval s rôznymi segmentami zákazníkov.',
    solution: 'Implementovali sme AI systém na generovanie personalizovaného obsahu pre každý segment. AI analyzuje správanie, preferencie a históriu zákazníkov a vytvára relevantný obsah.',
    results: [
      'Zvýšenie konverzie z 1.2% na 4.8%',
      'Zníženie odhlasovania o 60%',
      '3x vyšší engagement rate',
      'ROI marketingových kampaní vzrástol o 180%'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    tags: ['Marketing', 'Personalizácia', 'Email kampane', 'Machine Learning']
  },
  {
    id: 'case-3',
    title: 'Predikcia Dopravných Zápch pomocou AI',
    company: 'Bratislava Smart City',
    industry: 'Verejná správa',
    description: 'AI systém na predikciu dopravných zápch a optimalizáciu svetelnej signalizácie.',
    challenge: 'Dopravné zápchy v ranných a večerných špičkách spôsobovali ekonomické straty a zhoršovali kvalitu života obyvateľov.',
    solution: 'Nasadili sme AI systém, ktorý analyzuje historické dáta, aktuálny traffic, počasie a udalosti. Dynamicky optimalizuje svetelnú signalizáciu pre minimalizáciu zápch.',
    results: [
      'Zníženie priemerného času v zápchach o 28%',
      'Úspora 12 miliónov eur ročne (vypočítaná z času strateného v zápchach)',
      'Zníženie emisií CO2 o 15% v centre mesta',
      'Pozitívny feedback od 82% obyvateľov'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=450&fit=crop',
    tags: ['Smart City', 'Predikcia', 'Optimalizácia', 'Verejná správa']
  }
]

// Subscription Tiers
export interface MockSubscriptionTier {
  id: string
  name: string
  price: number
  currency: string
  billingPeriod: 'month' | 'year'
  description: string
  features: string[]
  isPopular?: boolean
  ctaText: string
}

export const mockSubscriptionTiers: MockSubscriptionTier[] = [
  {
    id: 'tier-free',
    name: 'Zadarmo',
    price: 0,
    currency: 'EUR',
    billingPeriod: 'month',
    description: 'Pre začiatočníkov, ktorí chcú objaviť svet AI',
    features: [
      'Prístup k 3 bezplatným kurzom',
      'Základné lekcie o AI',
      'Prístup k podcast epizódam',
      'Účasť v komunitnom fóre',
      'Mesačný newsletter'
    ],
    ctaText: 'Začať zadarmo'
  },
  {
    id: 'tier-pro',
    name: 'Pro',
    price: 29,
    currency: 'EUR',
    billingPeriod: 'month',
    description: 'Pre profesionálov hľadajúcich pokročilé znalosti',
    features: [
      'Všetko zo Zadarmo',
      'Prístup ku všetkým kurzom',
      'Pokročilé moduly a projekty',
      'AI asistent pri učení',
      'Certifikáty po ukončení',
      'Prioritná podpora',
      'Offline prístup k obsahu',
      'Mesačné Q&A session s expertmi'
    ],
    isPopular: true,
    ctaText: 'Začať 14-dňovú skúšobnú verziu'
  },
  {
    id: 'tier-enterprise',
    name: 'Enterprise',
    price: 99,
    currency: 'EUR',
    billingPeriod: 'month',
    description: 'Pre firmy a tímy, ktoré chcú vzdelávať zamestnancov',
    features: [
      'Všetko z Pro',
      'Neomedzený počet užívateľov',
      'Firemný dashboard s analytkou',
      'Vlastné kurzy a obsah',
      'Dedikovaný account manager',
      'SLA garantované',
      'Prispôsobený branding',
      'API prístup',
      'On-site školenia (2x ročne)'
    ],
    ctaText: 'Kontaktujte predaj'
  }
]
