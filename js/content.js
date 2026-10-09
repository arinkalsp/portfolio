/*
  ВСЁ СОДЕРЖИМОЕ САЙТА — В ЭТОМ ФАЙЛЕ.
  Дизайн и вёрстка лежат отдельно, их трогать не нужно.

  Как править:
  • Текст меняйте только внутри кавычек "…". Кавычки, запятые и скобки не удаляйте.
  • Если внутри текста нужны кавычки, используйте ’ или “ ” — обычная " сломает строку.
  • Курсив: <i>текст</i>. Перенос строки: <br>.
  • Пути к файлам пишутся от корня сайта: "media/projects/alaska.jpg".
  • Чтобы добавить проект, ролик или строку — скопируйте соседний блок { … }, вставьте рядом
    и поменяйте значения. Блоки разделяются запятой.
  • Чтобы убрать блок — удалите его целиком, от { до } вместе с запятой после него.
  • Порядок блоков в списке = порядок на сайте.

  Если после правки сайт показал красную плашку с ошибкой — в последней правке
  пропала кавычка или запятая. На GitHub откройте History этого файла и сравните с прошлой версией.
*/

window.SITE = {

  // ─── ШАПКА И ПЕРВЫЙ ЭКРАН ──────────────────────────────────────────
  person: {
    photo: "media/portrait.jpg",
    intro: "AI-first creative developer and production executive with extensive experience in audiovisual production, from social media and branded campaigns to film and animation.",
    mission: "My mission is to prototype workflows, lead and supervise teams, and push the creative boundaries of AI tools.",
    imdb: "https://www.imdb.com/name/nm18338650/", // ссылка показывается в самом низу сайта
    // Резюме: положите PDF в папку files и впишите путь, например "files/Arina_Aksenova_CV.pdf".
    // Пока здесь пусто, кнопки Download CV на сайте не показываются.
    cv: "files/Arina_Aksenova_CV.pdf",
  },

  manifestoNote: "Each project gets its own workflow, built around the story and the team. The quality bar stays the same.",

  // ─── ФЛАГМАНСКИЙ ПРОЕКТ ────────────────────────────────────────────
  flagship: {
    title: "KAYFSK",
    text: "A hybrid series that blends live-action filmmaking with generative AI. I built a production pipeline that didn’t exist before: workflows for hybrid shots, the role of AI supervisor on set, and one visual language across unstable tools.",
    facts: [
      ["Stage", "Pre-production"],
      ["Assets", "40+ characters, 15 locations"],
      ["Year", "2025"],
    ],
    youtube: "https://www.youtube.com/watch?v=M2X9yBqv-ko",
    image: "media/projects/kayfsk.jpg",
    caption: "KAYFSK teaser",
  },

  // ─── КАРУСЕЛЬ ПРОЕКТОВ ─────────────────────────────────────────────
  // image — обложка 16:9 (лучше 960×540 или больше), youtube — ссылка на ролик.
  projects: [
    {
      title: "EDENtity",
      text: "A Neurowood in-house series based on biblical stories and inspired by <i>Love, Death &amp; Robots</i>. Developed a distinctive visual style, the script and the world.",
      youtube: "https://youtu.be/5BlK0KJd4PQ",
      image: "media/projects/edentity.jpg",
    },
    {
      title: "The Night Land",
      text: "Another in-house project to bring William Hope Hodgson’s novel <i>The Night Land</i> to the screen. Built an extensive library of characters, locations and props for its dystopian world, and worked on a 20-minute pilot episode.",
      youtube: "https://youtu.be/RWZpxTlm3FE",
      image: "media/projects/night-land.jpg",
    },
    {
      title: "The Road to Revenge",
      text: "A test teaser made in collaboration with Decon Studio, based on their IP. Full development of characters and locations, plus work on the actors’ performances.",
      youtube: "https://youtu.be/j2WyN_R5lSA",
      image: "media/projects/road-to-revenge.jpg",
    },
    {
      title: "ALASKA",
      text: "A complex historical fiction project, thoroughly fact-checked for accuracy and built for a high degree of cinematic realism.",
      youtube: "https://youtu.be/86ohqDddh-0",
      image: "media/projects/alaska.jpg",
    },
    {
      title: "Wild Wild East",
      text: "A pitch teaser for an original IP: from script breakdown and early concept art to defining the visual style and its technical execution, plus storyboarding with the director.",
      youtube: "https://youtu.be/QKXymWYG3A0",
      image: "media/projects/wild-wild-east.jpg",
    },
    {
      title: "Adrenaline Rush",
      text: "A brand campaign in the run-up to the World Cup, a huge moment for Uzbekistan. The story: victory is built on the mistakes you make along the way.",
      youtube: "https://youtu.be/wTrHgvH7-yE",
      image: "media/projects/adrenaline-rush.jpg",
    },
    {
      title: "Product Placement Studio Showreel",
      text: "A large volume of client brand-integration projects, delivered through a dedicated pipeline that combines AI, compositing, editing and color grading.",
      youtube: "https://youtu.be/J9mEtPfkF9M",
      image: "media/projects/pp-showreel.jpg",
    },
    {
      title: "F1 x RUDI",
      text: "An experimental film testing the limits of AI-generated motion and edit rhythm. Unprecedented for AI video as of fall 2025.",
      youtube: "https://youtu.be/F7tQGuZp8HM",
      image: "media/projects/f1-rudi.jpg",
    },
    {
      title: "HealthIs TV spot",
      text: "Fully AI-generated commercial, aired nationwide. End-to-end production to broadcast standard. Realism at the highest level possible with 2025 technology.",
      youtube: "https://youtu.be/upB7dHABJOE",
      image: "media/projects/healthis-tv.jpg",
    },
  ],

  // ─── ГИБРИДНЫЙ ПРОДАКШН ────────────────────────────────────────────
  // Пара роликов: kind "pair" (верх и низ, у каждого своя плашка).
  // Один ролик, уже склеенный из двух половин: kind "stacked".
  hybrid: {
    intro: "Hybrid production: footage already shot on set, reworked with generative AI. Replacing and adding objects, wardrobe, props and set details",
    introMuted: "while keeping the photorealism, textures, color and light of the original plate.",
    items: [
      {
        kind: "pair",
        top:    { video: "media/hybrid/extras-before.mp4", poster: "media/hybrid/extras-before.jpg", label: "Before" },
        bottom: { video: "media/hybrid/extras-after.mp4",  poster: "media/hybrid/extras-after.jpg",  label: "After" },
        caption: "Short on extras? Our pipeline adds people to the plate with no loss in quality. Built on Kling, before the Seedance era.",
      },
      {
        kind: "pair",
        top:    { video: "media/hybrid/sweater-before.mp4", poster: "media/hybrid/sweater-before.jpg", label: "Before" },
        bottom: { video: "media/hybrid/sweater-after.mp4",  poster: "media/hybrid/sweater-after.jpg",  label: "After" },
        caption: "Wardrobe replacement: a new knitted sweater, matched to the grain, light and grade of the plate.",
      },
      {
        kind: "stacked",
        video: "media/hybrid/greenscreen.mp4", poster: "media/hybrid/greenscreen.jpg",
        labels: ["Before", "After"],
        lead: "R&amp;D.",
        caption: "Green screen test: my team was compositing actors shot on green into AI-generated environments before Higgsfield released it as a feature.",
      },
      {
        kind: "pair",
        top:    { video: "media/hybrid/product-1.mp4", poster: "media/hybrid/product-1.jpg", label: "Product #1" },
        bottom: { video: "media/hybrid/product-2.mp4", poster: "media/hybrid/product-2.jpg", label: "Product #2" },
        caption: "Product placement: one plate, different products integrated with AI.",
      },
    ],
  },

  // ─── КОНТЕНТ-ЗАВОДЫ ────────────────────────────────────────────────
  factories: {
    // Текст справа вверху блока. Пока пусто — блок не показывается.
    text: "I built turnkey systems to mass-produce and scale AI video creatives for social media, focused on organic growth and business results. From fast looks-like-real content to flagship cinema quality, adaptable to any audience or language.",
    process: ["Analytics and planning", "Production", "Testing", "Distribution + SMM", "Data", "Optimization", "Scaling"],
    // highlight: true — салатовая плитка. Остальные тёмные.
    stats: [
      { value: "9M+",   label: "Organic views in six months<br>per factory", highlight: true },
      { value: "22",    label: "Accounts built from zero,<br>over ten of them A/B tested" },
      { value: "$2.57", label: "Lowest blended<br>CPM (Dec 2025)" },
      { value: "10+",   label: "Internal team size" },
    ],
    // Это карусель: роликов можно добавлять сколько угодно.
    // url и handle можно оставить пустыми "", тогда ссылки под роликом не будет.
    channels: [
      { name: "Auntie Lyda | ALWA",      video: "media/factories/lyudmila.mp4",  poster: "media/factories/lyudmila.jpg",  handle: "@lydmila_mikhailovna", url: "https://www.instagram.com/lydmila_mikhailovna", platform: "Instagram" },
      { name: "Albert Vkusstein | ALWA", video: "media/factories/vkusstein.mp4", poster: "media/factories/vkusstein.jpg", handle: "@vkusstein",           url: "https://www.tiktok.com/@vkusstein",             platform: "TikTok" },
      { name: "Chef Enotio | ALWA",      video: "media/factories/enotio.mp4",    poster: "media/factories/enotio.jpg",    handle: "@enotio_chef",         url: "https://www.youtube.com/@enotio_chef",          platform: "YouTube" },
      { name: "L’Oréal",                 video: "media/factories/loreal.mp4",    poster: "media/factories/loreal.jpg",    handle: "",                     url: "",                                              platform: "AI influencer" },
      { name: "Spets",                   video: "media/factories/spets.mp4",     poster: "media/factories/spets.jpg",     handle: "",                     url: "",                                              platform: "Performance creative" },
      { name: "Clarins",                 video: "media/factories/clarins.mp4",   poster: "media/factories/clarins.jpg",   handle: "",                     url: "",                                              platform: "Promo proposal" },
      { name: "Neurowood",               video: "media/factories/neurowood-trends.mp4", poster: "media/factories/neurowood-trends.jpg", handle: "",       url: "",                                              platform: "Viral Seeding" },
      { name: "Micro Drama",             video: "media/factories/micro-drama.mp4", poster: "media/factories/micro-drama.jpg", handle: "",                 url: "",                                              platform: "Video Seeding" },
    ],
  },

  // ─── E-COM ─────────────────────────────────────────────────────────
  ecom: {
    figure: "2.5×",
    figureText: "higher performance than covers made from shoot footage,",
    figureItalic: "in split tests",
    text: "I coordinated the production of animated product covers for marketplaces and built the most cost-effective way to make them: assembling the team and running production at high volume.",
    // Ролики 3:4.
    items: [
      { caption: "Köttur. Intimate gel",     video: "media/ecom/kottur-gel.mp4",   poster: "media/ecom/kottur-gel.jpg" },
      { caption: "Köttur. Beeswax Cream",    video: "media/ecom/kottur-cream.mp4", poster: "media/ecom/kottur-cream.jpg" },
      { caption: "HealthIs. Omega-3",        video: "media/ecom/omega.mp4",        poster: "media/ecom/omega.jpg" },
      { caption: "HealthIs. Collagen",       video: "media/ecom/collagen.mp4",     poster: "media/ecom/collagen.jpg" },
      { caption: "HealthIs. Magnesium + B6", video: "media/ecom/magnesium.mp4",    poster: "media/ecom/magnesium.jpg" },
      { caption: "Makute",                   video: "media/ecom/makute.mp4",       poster: "media/ecom/makute.jpg" },
    ],
  },

  // ─── НАВЫКИ И СОБСТВЕННЫЕ ГЕНЕРАЦИИ ────────────────────────────────
  skills: {
    intro: "I started out generating and editing myself. That’s why my briefs, estimates and reviews come from knowing how the models actually behave.",
    techniques: "Character consistency, style blocks, multi-shot prompting.",
    tools: [
      { group: "Generation", items: ["Runway", "Dreamina AI", "Higgsfield", "Flow", "GPT Image", "Seedance", "Nano Banana", "Veo"] },
      { group: "Edit and post", items: ["Adobe Premiere Pro", "DaVinci Resolve", "Frame.io"] },
      { group: "Production and design", items: ["Cerebro", "Figma", "Miro", "Airtable", "Jira"] },
    ],
    // Свои работы. image — обложка, youtube — ссылка на ролик (если пусто, обложка не кликается).
    // vertical: true — для вертикальных роликов 9:16, они откроются в вертикальном плеере.
    // Первые пять встают в сетку: 1 — крупный вертикальный флагман слева, 2 — широкий сверху,
    // 3 — горизонтальный снизу, 4 и 5 — вертикальные снизу.
    generations: [
      { image: "media/generations/ruslo.jpg",         youtube: "https://youtube.com/shorts/8UiUqPgYtxU", vertical: true, caption: "RUSLŌ campaign" },
      { image: "media/generations/interrogation.jpg", youtube: "https://youtu.be/K2foWtWRFjY",                         caption: "Multi-shot scene with a famous actor" },
      { image: "media/generations/hopper.jpg",        youtube: "https://youtu.be/bsFUSHR1Yy0",                         caption: "Painting brought to life: Edward Hopper’s <i>Nighthawks</i>" },
      { image: "media/generations/ashley.jpg",        youtube: "https://youtube.com/shorts/N66fV7wi0PE", vertical: true, caption: "3D animation test" },
      { image: "media/generations/freeze.jpg",        youtube: "https://youtube.com/shorts/I4S83y_Yhm8", vertical: true, caption: "Viral motion freeze test" },
    ],
  },

  // ─── ОБО МНЕ ───────────────────────────────────────────────────────
  about: {
    statement: "To me, a good producer is a Swiss Army knife: the right tool for every stage, from prep to post. I dive into every process, keep learning, and see each project through from concept to screen.",
    own: [
      { group: "Development", items: ["Scripts and treatments", "Pitch decks for investors and clients"] },
      { group: "Production",  items: ["Pipeline design, from preproduction to final edit", "Budgets over $600k, schedules and production reporting", "Teams of AI artists, directors, editors and post", "Client, vendor and stakeholder relationships"] },
      { group: "Creative",    items: ["Creative supervision across every stage", "Art direction for concept art and look development"] },
    ],
    experience: [
      ["2025–now",  "Creative Production Head, Neurowood"],
      ["2024–2025", "Post-Production Producer, Clandestino Studio"],
      ["2022–2023", "Senior Creative Copywriter, ICE Communication Agency"],
      ["2021–2022", "Creative Producer, TNT TV Channel"],
      ["2019–2021", "Creative Copywriter, Red Communication Group, Progression Group"],
    ],
    education: ["ECIB, Audiovisual Production, 2025", "ESCAC, Filmmaking, 2023", "HSE, Media Communications, 2021"],
    languages: ["English, fluent", "Russian, native", "Spanish, limited working proficiency"],
  },

  earlier: {
    text: "Brand campaigns and TV promo, 2019–2023. Concepts, scripts and production for KFC, Paco Rabanne, Nina Ricci, Ferrero and over 40 brands in total.",
    archiveUrl: "https://aaksenova.tilda.ws/",
  },

  // ─── КОНТАКТЫ (строка ссылок внизу сайта, после них автоматически идёт IMDb) ─
  contacts: [
    { text: "+381 61 158 82 01",   url: "tel:+381611588201" },
    { text: "arinkalsp@gmail.com", url: "mailto:arinkalsp@gmail.com" },
    { text: "LinkedIn",            url: "https://www.linkedin.com/in/arina-aksenova/" },
    { text: "Telegram",            url: "https://t.me/poetry_of_foil" },
  ],
};
