/* ==========================================================
   多言語化（Palette Bullet と同じ 10 言語）
   - 初回はブラウザの言語から自動で選び、選んだ言語は覚えておく
   - ?lang=en のように URL でも指定できる
   - 文言を直すときは下の DICT を編集する（HTML の data-i18n="キー" と対応）
   ========================================================== */
(() => {
  const LANGS = [
    ['ja', '日本語', 'JA'], ['en', 'English', 'EN'], ['zh-Hans', '简体中文', '简'], ['zh-Hant', '繁體中文', '繁'],
    ['ko', '한국어', 'KO'], ['es', 'Español', 'ES'], ['fr', 'Français', 'FR'], ['de', 'Deutsch', 'DE'],
    ['pt', 'Português', 'PT'], ['it', 'Italiano', 'IT'],
  ];
  const FONTS = { 'zh-Hans': 'Noto+Sans+SC', 'zh-Hant': 'Noto+Sans+TC', ko: 'Noto+Sans+KR' };

  const DICT = {
    ja: {
      bcCatch: 'バーテンダーの技を学ぶ',
      bcDesc: '本物のバーに立つように、カクテルの技を一杯ずつ。67種のレシピ、シェイク・ステア・フロート、そして提供の所作まで。',
      review: '審査中・まもなく公開',
      desc: 'TKYSOFT は iPhone / iPad 向けのゲームとアプリをつくるインディーデベロッパーです。Palette Bullet 配信中。',
      news: '<b>Palette Bullet</b> 配信中',
      lead: '回路のように、<br><em>アイデア</em>をつなぐ。',
      p1: 'TKYSOFT は、iPhone / iPad 向けのゲームとアプリをつくるインディーデベロッパーです。',
      p2: 'ひとつの点（ノード）から線がのび、別のアイデアとつながって、ひとつの遊びになる。ロゴに込めたのは、そんなものづくりの姿勢です。企画・デザイン・プログラム・運営まで、すべてを自分の手で回しています。',
      s1: 'ゲーム &amp; アプリ', s2: '多言語対応', s4: '企画から運営まで',
      pbCatch: '撃って描く、色彩シューティング',
      pbDesc: 'キャンバスに迫る色たちを、絵の具で撃って弾けさせよう。飛び散った色はそのまま絵になり、ステージの終わりには額縁に入った一枚の名画に。',
      store: 'App Store で入手', support: 'サポート', soon: '近日公開予定',
      snCatch: '星を融合させる重力パズル',
      snDesc: '同じ星の核をぶつけて、より大きな星へ。重力の地平線からあふれる前に、銀河最大の超新星をつくりだせ。',
      boCatch: '棒人間たちの大乱闘パーティー',
      boDesc: 'ふにゃふにゃの棒人間で、なぐって、けって、ほうり投げて大乱闘！ 近くの友だちやオンラインで最大4人、ステージから落とし合おう。',
      dzCatch: 'ペルソナで語り、考えをつなぐ',
      dzDesc: 'ひとつのアカウントで、いくつものペルソナを。枝分かれするスレッドと、人とテーマの距離が見えるリレーションで、あなたの考えが誰かの考えとつながっていく。',
      endSub: '次の作品を開発中です。',
      moviesP: 'トレーラーやプレイ動画を YouTube・TikTok で公開していきます。',
      ph1: '紹介ムービー 公開予定', ph2: 'フリーペイント 公開予定', ph3: '4人対戦プレイ動画 公開予定', ph4: 'トレーラー公開予定',
      chanYt: 'YouTube チャンネル',
      craftTitle: 'つくり方も、<em>回路</em>のように。',
      c1h: 'ひらめきを設計する', c1p: '遊びの核になる「ひとつの手ざわり」から考え、ルールとステージを組み立てます。',
      c2h: 'Unity / Swift で実装', c2p: '物理演算・ラグドール・通信対戦まで。iPhone と iPad の両方で気持ちよく動くよう磨きます。',
      c3h: '遊ばれながら育てる', c3p: 'いただいた声をもとにアップデート。リリースしてからが本番だと考えています。',
      contactP: 'ゲームの感想・不具合のご報告・お仕事のご相談など、お気軽にどうぞ。',
      fStore: 'Palette Bullet（App Store）', fSupport: 'Palette Bullet サポート',
      lang: '言語',
    },
    en: {
      bcCatch: 'Learn the bartender’s craft',
      bcDesc: 'Step behind a realistic bar and learn the craft, one glass at a time — 67 recipes, shaking, stirring, layering and the art of the serve.',
      review: 'In review — coming soon',
      desc: 'TKYSOFT is an indie developer making games and apps for iPhone and iPad. Palette Bullet is out now.',
      news: '<b>Palette Bullet</b> is out now',
      lead: 'Like a circuit,<br>we connect <em>ideas</em>.',
      p1: 'TKYSOFT is an indie developer making games and apps for iPhone and iPad.',
      p2: 'A line grows from a single point — a node — connects with another idea, and becomes something to play. That is the spirit behind our logo. Planning, design, programming and running the games: everything is done in-house, by hand.',
      s1: 'Games &amp; apps', s2: 'Languages', s4: 'From idea to live ops',
      pbCatch: 'Shoot to paint — a color-splashing shooter',
      pbDesc: 'Blast the colors closing in on your canvas with paint. Every splash stays on the page, and at the end of each stage your canvas is framed as a masterpiece.',
      store: 'Get it on the App Store', support: 'Support', soon: 'Coming soon',
      snCatch: 'A gravity puzzle where stars fuse',
      snDesc: 'Smash matching star cores together to grow bigger stars. Create the greatest supernova in the galaxy before the gravity horizon overflows.',
      boCatch: 'A wobbly stick-figure party brawler',
      boDesc: 'Punch, kick and throw your floppy stick figures into an all-out brawl! Knock each other off the stage with up to 4 players, nearby or online.',
      dzCatch: 'Speak through personas, connect ideas',
      dzDesc: 'One account, many personas. With branching threads and a relation map that shows how close people and topics are, your thoughts connect with someone else’s.',
      endSub: 'Our next game is in development.',
      moviesP: 'Trailers and gameplay videos are coming to YouTube and TikTok.',
      ph1: 'Intro movie — coming soon', ph2: 'Free Paint — coming soon', ph3: '4-player battle — coming soon', ph4: 'Trailer — coming soon',
      chanYt: 'YouTube channel',
      craftTitle: 'We build like a <em>circuit</em>, too.',
      c1h: 'Designing the spark', c1p: 'We start from the one “feel” at the core of the fun, then build the rules and stages around it.',
      c2h: 'Built with Unity / Swift', c2p: 'From physics and ragdolls to online play — polished to feel great on both iPhone and iPad.',
      c3h: 'Growing with players', c3p: 'We update based on your feedback. To us, launch day is just the beginning.',
      contactP: 'Feedback, bug reports or business inquiries — feel free to get in touch.',
      fStore: 'Palette Bullet (App Store)', fSupport: 'Palette Bullet Support',
      lang: 'Language',
    },
    'zh-Hans': {
      bcCatch: '学习调酒师的技艺',
      bcDesc: '像站在真正的吧台后一样，一杯一杯地学习鸡尾酒技艺。67 种配方，摇和、搅拌、漂浮，直到出品的礼仪。',
      review: '审核中 · 即将上架',
      desc: 'TKYSOFT 是一家为 iPhone / iPad 开发游戏和应用的独立开发者。Palette Bullet 现已上架。',
      news: '<b>Palette Bullet</b> 现已上架',
      lead: '像电路一样，<br>把<em>创意</em>连接起来。',
      p1: 'TKYSOFT 是一家为 iPhone / iPad 开发游戏和应用的独立开发者。',
      p2: '从一个点（节点）延伸出线条，与另一个创意相连，最终成为一种玩法。这就是我们的标志所蕴含的创作理念。从策划、设计、编程到运营，全部亲手完成。',
      s1: '游戏与应用', s2: '多语言支持', s4: '从策划到运营',
      pbCatch: '射击作画，色彩射击游戏',
      pbDesc: '用颜料射击逼近画布的色彩，让它们迸裂开来。飞溅的颜色会直接变成画作，关卡结束时就是一幅装进画框的名画。',
      store: '前往 App Store 下载', support: '支持', soon: '即将推出',
      snCatch: '让星星融合的重力解谜',
      snDesc: '让相同的星核相撞，合成更大的星星。在溢出重力地平线之前，创造银河中最大的超新星。',
      boCatch: '火柴人大乱斗派对',
      boDesc: '操控软绵绵的火柴人，拳打、脚踢、抛摔，展开大乱斗！与身边的朋友或在线最多 4 人，把对手打下舞台。',
      dzCatch: '以人格发言，连接思考',
      dzDesc: '一个账号，多重人格。通过不断分支的讨论串，以及能看到人与话题距离的关系图，让你的想法与他人的想法相连。',
      endSub: '下一款作品正在开发中。',
      moviesP: '我们将在 YouTube 和 TikTok 上发布预告片和游戏视频。',
      ph1: '介绍视频 即将发布', ph2: '自由绘画 即将发布', ph3: '4 人对战视频 即将发布', ph4: '预告片 即将发布',
      chanYt: 'YouTube 频道',
      craftTitle: '创作方式，也像<em>电路</em>一样。',
      c1h: '设计灵感', c1p: '从构成乐趣核心的“手感”出发，构建规则与关卡。',
      c2h: '用 Unity / Swift 实现', c2p: '从物理运算、布娃娃系统到联网对战，精心打磨，让 iPhone 和 iPad 都能流畅运行。',
      c3h: '与玩家一同成长', c3p: '根据大家的反馈持续更新。我们认为，发布之后才是真正的开始。',
      contactP: '游戏感想、问题反馈、商务合作等，欢迎随时联系。',
      fStore: 'Palette Bullet（App Store）', fSupport: 'Palette Bullet 支持',
      lang: '语言',
    },
    'zh-Hant': {
      bcCatch: '學習調酒師的技藝',
      bcDesc: '像站在真正的吧檯後一樣，一杯一杯地學習調酒技藝。67 種酒譜，搖盪、攪拌、漂浮，直到出杯的禮儀。',
      review: '審核中・即將上架',
      desc: 'TKYSOFT 是一家為 iPhone / iPad 開發遊戲與 App 的獨立開發者。Palette Bullet 現已上架。',
      news: '<b>Palette Bullet</b> 現已上架',
      lead: '像電路一樣，<br>把<em>創意</em>連結起來。',
      p1: 'TKYSOFT 是一家為 iPhone / iPad 開發遊戲與 App 的獨立開發者。',
      p2: '從一個點（節點）延伸出線條，與另一個創意相連，最終成為一種玩法。這就是我們標誌所蘊含的創作理念。從企劃、設計、程式到營運，全部親手完成。',
      s1: '遊戲與 App', s2: '多語言支援', s4: '從企劃到營運',
      pbCatch: '射擊作畫，色彩射擊遊戲',
      pbDesc: '用顏料射擊逼近畫布的色彩，讓它們迸裂開來。飛濺的顏色會直接變成畫作，關卡結束時就是一幅裱進畫框的名畫。',
      store: '前往 App Store 下載', support: '支援', soon: '即將推出',
      snCatch: '讓星星融合的重力解謎',
      snDesc: '讓相同的星核相撞，合成更大的星星。在溢出重力地平線之前，創造銀河中最大的超新星。',
      boCatch: '火柴人大亂鬥派對',
      boDesc: '操控軟綿綿的火柴人，拳打、腳踢、拋摔，展開大亂鬥！與身邊的朋友或線上最多 4 人，把對手打下舞台。',
      dzCatch: '以人格發言，連結思考',
      dzDesc: '一個帳號，多重人格。透過不斷分支的討論串，以及能看見人與話題距離的關係圖，讓你的想法與他人的想法相連。',
      endSub: '下一款作品正在開發中。',
      moviesP: '我們將在 YouTube 與 TikTok 上發布預告片和遊戲影片。',
      ph1: '介紹影片 即將發布', ph2: '自由繪畫 即將發布', ph3: '4 人對戰影片 即將發布', ph4: '預告片 即將發布',
      chanYt: 'YouTube 頻道',
      craftTitle: '創作方式，也像<em>電路</em>一樣。',
      c1h: '設計靈感', c1p: '從構成樂趣核心的「手感」出發，建構規則與關卡。',
      c2h: '以 Unity / Swift 實作', c2p: '從物理運算、布娃娃系統到連線對戰，細心打磨，讓 iPhone 與 iPad 都能流暢運作。',
      c3h: '與玩家一同成長', c3p: '根據大家的回饋持續更新。我們認為，發布之後才是真正的開始。',
      contactP: '遊戲心得、問題回報、商務合作等，歡迎隨時聯絡。',
      fStore: 'Palette Bullet（App Store）', fSupport: 'Palette Bullet 支援',
      lang: '語言',
    },
    ko: {
      bcCatch: '바텐더의 기술을 배우다',
      bcDesc: '진짜 바에 선 것처럼, 칵테일 기술을 한 잔씩. 67가지 레시피, 셰이크·스터·플로트, 그리고 서빙의 몸가짐까지.',
      review: '심사 중 · 곧 출시',
      desc: 'TKYSOFT는 iPhone / iPad용 게임과 앱을 만드는 인디 개발자입니다. Palette Bullet 출시.',
      news: '<b>Palette Bullet</b> 출시',
      lead: '회로처럼,<br><em>아이디어</em>를 잇다.',
      p1: 'TKYSOFT는 iPhone / iPad용 게임과 앱을 만드는 인디 개발자입니다.',
      p2: '하나의 점(노드)에서 선이 뻗어 나와 다른 아이디어와 이어지고, 하나의 놀이가 됩니다. 로고에 담은 것은 바로 그런 창작의 자세입니다. 기획·디자인·프로그래밍·운영까지 모든 것을 직접 해내고 있습니다.',
      s1: '게임 &amp; 앱', s2: '다국어 지원', s4: '기획부터 운영까지',
      pbCatch: '쏴서 그리는 컬러 슈팅',
      pbDesc: '캔버스로 다가오는 색들을 물감으로 쏴서 터뜨리세요. 흩뿌려진 색은 그대로 그림이 되고, 스테이지가 끝나면 액자에 담긴 한 장의 명화가 됩니다.',
      store: 'App Store에서 받기', support: '지원', soon: '출시 예정',
      snCatch: '별을 합치는 중력 퍼즐',
      snDesc: '같은 별의 핵을 부딪쳐 더 큰 별로. 중력의 지평선이 넘치기 전에 은하 최대의 초신성을 만들어 보세요.',
      boCatch: '흐물흐물 막대 인간 난투 파티',
      boDesc: '흐물흐물한 막대 인간으로 때리고, 차고, 던지며 대난투! 가까운 친구 또는 온라인으로 최대 4명이 스테이지에서 서로 떨어뜨려 보세요.',
      dzCatch: '페르소나로 말하고, 생각을 잇다',
      dzDesc: '하나의 계정에 여러 개의 페르소나를. 갈라지는 스레드와 사람·주제 사이의 거리가 보이는 관계도로, 당신의 생각이 누군가의 생각과 이어집니다.',
      endSub: '다음 작품을 개발 중입니다.',
      moviesP: '트레일러와 플레이 영상을 YouTube와 TikTok에 공개할 예정입니다.',
      ph1: '소개 영상 공개 예정', ph2: '프리 페인트 공개 예정', ph3: '4인 대전 영상 공개 예정', ph4: '트레일러 공개 예정',
      chanYt: 'YouTube 채널',
      craftTitle: '만드는 방식도 <em>회로</em>처럼.',
      c1h: '번뜩임을 설계하다', c1p: '재미의 핵심이 되는 ‘하나의 손맛’에서 출발해 규칙과 스테이지를 짜 나갑니다.',
      c2h: 'Unity / Swift로 구현', c2p: '물리 연산, 래그돌, 온라인 대전까지. iPhone과 iPad 모두에서 기분 좋게 움직이도록 다듬습니다.',
      c3h: '플레이어와 함께 성장', c3p: '보내 주신 의견을 바탕으로 업데이트합니다. 출시 후가 진짜 시작이라고 생각합니다.',
      contactP: '게임 소감, 버그 제보, 업무 문의 등 편하게 연락 주세요.',
      fStore: 'Palette Bullet (App Store)', fSupport: 'Palette Bullet 지원',
      lang: '언어',
    },
    es: {
      bcCatch: 'Aprende el oficio del bartender',
      bcDesc: 'Ponte tras una barra realista y aprende el oficio copa a copa: 67 recetas, agitar, remover, crear capas y el arte de servir.',
      review: 'En revisión — muy pronto',
      desc: 'TKYSOFT es un desarrollador independiente de juegos y apps para iPhone y iPad. Palette Bullet ya disponible.',
      news: '<b>Palette Bullet</b> ya disponible',
      lead: 'Como un circuito,<br>conectamos <em>ideas</em>.',
      p1: 'TKYSOFT es un desarrollador independiente que crea juegos y apps para iPhone y iPad.',
      p2: 'De un solo punto —un nodo— nace una línea que se conecta con otra idea y se convierte en un juego. Ese es el espíritu de nuestro logo. Planificación, diseño, programación y mantenimiento: todo lo hacemos con nuestras propias manos.',
      s1: 'Juegos y apps', s2: 'Idiomas', s4: 'De la idea al lanzamiento',
      pbCatch: 'Dispara para pintar: un shooter de colores',
      pbDesc: 'Revienta con pintura los colores que se acercan a tu lienzo. Cada salpicadura se queda en la obra y, al final de cada fase, tu lienzo se enmarca como una obra maestra.',
      store: 'Descargar en App Store', support: 'Soporte', soon: 'Próximamente',
      snCatch: 'Un puzle de gravedad para fusionar estrellas',
      snDesc: 'Choca núcleos estelares iguales para crear estrellas más grandes. Crea la mayor supernova de la galaxia antes de que se desborde el horizonte gravitatorio.',
      boCatch: 'Una fiesta de peleas con monigotes',
      boDesc: '¡Golpea, patea y lanza a tus blandos monigotes en una pelea sin reglas! Hasta 4 jugadores, en local u online, intentando tirarse del escenario.',
      dzCatch: 'Habla a través de personajes, conecta ideas',
      dzDesc: 'Una cuenta, muchos personajes. Con hilos que se ramifican y un mapa de relaciones que muestra la cercanía entre personas y temas, tus ideas se conectan con las de los demás.',
      endSub: 'Nuestro próximo juego está en desarrollo.',
      moviesP: 'Pronto publicaremos tráileres y vídeos de juego en YouTube y TikTok.',
      ph1: 'Vídeo de presentación — próximamente', ph2: 'Pintura libre — próximamente', ph3: 'Batalla de 4 jugadores — próximamente', ph4: 'Tráiler — próximamente',
      chanYt: 'Canal de YouTube',
      craftTitle: 'También creamos como un <em>circuito</em>.',
      c1h: 'Diseñar la chispa', c1p: 'Partimos de la «sensación» que está en el corazón de la diversión y construimos las reglas y las fases a su alrededor.',
      c2h: 'Hecho con Unity / Swift', c2p: 'Desde físicas y ragdolls hasta juego online, pulido para sentirse genial en iPhone y iPad.',
      c3h: 'Crecer con los jugadores', c3p: 'Actualizamos a partir de vuestros comentarios. Para nosotros, el lanzamiento es solo el comienzo.',
      contactP: 'Opiniones, informes de errores o consultas de trabajo: escríbenos cuando quieras.',
      fStore: 'Palette Bullet (App Store)', fSupport: 'Soporte de Palette Bullet',
      lang: 'Idioma',
    },
    fr: {
      bcCatch: 'Apprenez l’art du barman',
      bcDesc: 'Passez derrière un bar réaliste et apprenez le métier, un verre à la fois : 67 recettes, shaker, mélanger, superposer et l’art du service.',
      review: 'En cours de validation — bientôt',
      desc: 'TKYSOFT est un développeur indépendant de jeux et d’apps pour iPhone et iPad. Palette Bullet est disponible.',
      news: '<b>Palette Bullet</b> est disponible',
      lead: 'Comme un circuit,<br>nous relions les <em>idées</em>.',
      p1: 'TKYSOFT est un développeur indépendant qui crée des jeux et des apps pour iPhone et iPad.',
      p2: 'D’un simple point — un nœud — naît une ligne qui rejoint une autre idée et devient un jeu. C’est l’esprit de notre logo. Conception, design, programmation et exploitation : tout est fait à la main, en interne.',
      s1: 'Jeux et apps', s2: 'Langues', s4: 'De l’idée à l’exploitation',
      pbCatch: 'Tirer pour peindre : un shooter tout en couleurs',
      pbDesc: 'Faites éclater à coups de peinture les couleurs qui envahissent votre toile. Chaque éclaboussure reste sur la toile et, à la fin de chaque niveau, elle est encadrée comme un chef-d’œuvre.',
      store: 'Télécharger sur l’App Store', support: 'Assistance', soon: 'Bientôt disponible',
      snCatch: 'Un puzzle gravitationnel où les étoiles fusionnent',
      snDesc: 'Faites se percuter des noyaux d’étoiles identiques pour en former de plus grosses. Créez la plus grande supernova de la galaxie avant que l’horizon gravitationnel ne déborde.',
      boCatch: 'Une baston festive de bonshommes bâtons',
      boDesc: 'Frappez, cognez et projetez vos bonshommes bâtons tout mous dans une mêlée générale ! Jusqu’à 4 joueurs, à proximité ou en ligne, pour s’éjecter de l’arène.',
      dzCatch: 'Parler à travers des personas, relier les idées',
      dzDesc: 'Un seul compte, plusieurs personas. Avec des fils de discussion qui se ramifient et une carte des relations entre personnes et sujets, vos idées rejoignent celles des autres.',
      endSub: 'Notre prochain jeu est en développement.',
      moviesP: 'Bandes-annonces et vidéos de gameplay arrivent bientôt sur YouTube et TikTok.',
      ph1: 'Vidéo de présentation — bientôt', ph2: 'Peinture libre — bientôt', ph3: 'Combat à 4 joueurs — bientôt', ph4: 'Bande-annonce — bientôt',
      chanYt: 'Chaîne YouTube',
      craftTitle: 'Nous créons aussi comme un <em>circuit</em>.',
      c1h: 'Concevoir l’étincelle', c1p: 'Nous partons de la « sensation » au cœur du plaisir de jeu, puis construisons les règles et les niveaux autour.',
      c2h: 'Développé avec Unity / Swift', c2p: 'De la physique aux ragdolls jusqu’au jeu en ligne, peaufiné pour être agréable sur iPhone comme sur iPad.',
      c3h: 'Grandir avec les joueurs', c3p: 'Nous faisons évoluer nos jeux grâce à vos retours. Pour nous, la sortie n’est qu’un début.',
      contactP: 'Avis, signalement de bugs ou demandes professionnelles : n’hésitez pas à nous écrire.',
      fStore: 'Palette Bullet (App Store)', fSupport: 'Assistance Palette Bullet',
      lang: 'Langue',
    },
    de: {
      bcCatch: 'Lerne das Handwerk des Barkeepers',
      bcDesc: 'Stell dich hinter eine realistische Bar und lerne das Handwerk Glas für Glas – 67 Rezepte, Shaken, Rühren, Schichten und die Kunst des Servierens.',
      review: 'In Prüfung – bald verfügbar',
      desc: 'TKYSOFT ist ein Indie-Entwickler von Spielen und Apps für iPhone und iPad. Palette Bullet ist jetzt erhältlich.',
      news: '<b>Palette Bullet</b> ist jetzt erhältlich',
      lead: 'Wie ein Schaltkreis<br>verbinden wir <em>Ideen</em>.',
      p1: 'TKYSOFT ist ein Indie-Entwickler, der Spiele und Apps für iPhone und iPad entwickelt.',
      p2: 'Aus einem einzigen Punkt – einem Knoten – wächst eine Linie, verbindet sich mit einer anderen Idee und wird zu einem Spiel. Dafür steht unser Logo. Konzept, Design, Programmierung und Betrieb: Alles entsteht in Eigenregie.',
      s1: 'Spiele &amp; Apps', s2: 'Sprachen', s4: 'Von der Idee bis zum Betrieb',
      pbCatch: 'Schießen und malen – ein farbenfroher Shooter',
      pbDesc: 'Bring die Farben, die auf deine Leinwand zurasen, mit Farbschüssen zum Platzen. Jeder Spritzer bleibt auf dem Bild – und am Ende jeder Stage wird deine Leinwand als Meisterwerk gerahmt.',
      store: 'Im App Store laden', support: 'Support', soon: 'Demnächst',
      snCatch: 'Ein Gravitationspuzzle, in dem Sterne verschmelzen',
      snDesc: 'Lass gleiche Sternkerne zusammenprallen und erschaffe größere Sterne. Erzeuge die größte Supernova der Galaxie, bevor der Gravitationshorizont überläuft.',
      boCatch: 'Die wackelige Strichmännchen-Prügelparty',
      boDesc: 'Schlagen, treten, werfen – mit labberigen Strichmännchen ins große Getümmel! Mit bis zu 4 Spielern, lokal oder online, werft ihr euch gegenseitig von der Stage.',
      dzCatch: 'Mit Personas sprechen, Gedanken verbinden',
      dzDesc: 'Ein Konto, viele Personas. Mit verzweigten Threads und einer Beziehungskarte, die zeigt, wie nah sich Menschen und Themen sind, verbinden sich deine Gedanken mit denen anderer.',
      endSub: 'Unser nächstes Spiel ist in Entwicklung.',
      moviesP: 'Trailer und Gameplay-Videos erscheinen bald auf YouTube und TikTok.',
      ph1: 'Vorstellungsvideo – demnächst', ph2: 'Freies Malen – demnächst', ph3: '4-Spieler-Kampf – demnächst', ph4: 'Trailer – demnächst',
      chanYt: 'YouTube-Kanal',
      craftTitle: 'Auch wir arbeiten wie ein <em>Schaltkreis</em>.',
      c1h: 'Den Funken entwerfen', c1p: 'Wir beginnen beim „Spielgefühl“, das den Kern des Spaßes bildet, und bauen Regeln und Stages darum herum.',
      c2h: 'Mit Unity / Swift umgesetzt', c2p: 'Von Physik und Ragdolls bis zum Online-Multiplayer – so poliert, dass es sich auf iPhone und iPad großartig anfühlt.',
      c3h: 'Mit den Spielern wachsen', c3p: 'Wir aktualisieren unsere Spiele anhand eures Feedbacks. Für uns ist der Release erst der Anfang.',
      contactP: 'Feedback, Fehlerberichte oder geschäftliche Anfragen – schreib uns gern.',
      fStore: 'Palette Bullet (App Store)', fSupport: 'Palette Bullet Support',
      lang: 'Sprache',
    },
    pt: {
      bcCatch: 'Aprenda o ofício do bartender',
      bcDesc: 'Fique atrás de um balcão realista e aprenda o ofício, um copo de cada vez — 67 receitas, bater, mexer, fazer camadas e a arte de servir.',
      review: 'Em análise — em breve',
      desc: 'A TKYSOFT é uma desenvolvedora independente de jogos e apps para iPhone e iPad. Palette Bullet já disponível.',
      news: '<b>Palette Bullet</b> já disponível',
      lead: 'Como um circuito,<br>conectamos <em>ideias</em>.',
      p1: 'A TKYSOFT é uma desenvolvedora independente que cria jogos e apps para iPhone e iPad.',
      p2: 'De um único ponto — um nó — nasce uma linha que se conecta a outra ideia e vira um jogo. Esse é o espírito do nosso logo. Planejamento, design, programação e operação: fazemos tudo com as próprias mãos.',
      s1: 'Jogos e apps', s2: 'Idiomas', s4: 'Da ideia à operação',
      pbCatch: 'Atire para pintar: um shooter cheio de cor',
      pbDesc: 'Estoure com tinta as cores que avançam sobre a sua tela. Cada respingo vira parte da pintura e, no fim de cada fase, sua tela é emoldurada como uma obra-prima.',
      store: 'Baixar na App Store', support: 'Suporte', soon: 'Em breve',
      snCatch: 'Um quebra-cabeça de gravidade para fundir estrelas',
      snDesc: 'Faça núcleos estelares iguais colidirem para formar estrelas maiores. Crie a maior supernova da galáxia antes que o horizonte gravitacional transborde.',
      boCatch: 'Uma festa de pancadaria com bonecos de palito',
      boDesc: 'Soque, chute e arremesse seus bonecos de palito molengas numa pancadaria geral! Até 4 jogadores, por perto ou online, tentando derrubar uns aos outros do cenário.',
      dzCatch: 'Fale por meio de personas, conecte ideias',
      dzDesc: 'Uma conta, várias personas. Com tópicos que se ramificam e um mapa de relações que mostra a proximidade entre pessoas e temas, suas ideias se conectam às de outras pessoas.',
      endSub: 'Nosso próximo jogo está em desenvolvimento.',
      moviesP: 'Trailers e vídeos de gameplay chegarão em breve ao YouTube e ao TikTok.',
      ph1: 'Vídeo de apresentação — em breve', ph2: 'Pintura livre — em breve', ph3: 'Batalha de 4 jogadores — em breve', ph4: 'Trailer — em breve',
      chanYt: 'Canal no YouTube',
      craftTitle: 'Também criamos como um <em>circuito</em>.',
      c1h: 'Projetar a faísca', c1p: 'Começamos pela “sensação” que está no centro da diversão e construímos as regras e as fases em torno dela.',
      c2h: 'Feito com Unity / Swift', c2p: 'De física e ragdolls a partidas online, tudo refinado para ficar ótimo no iPhone e no iPad.',
      c3h: 'Crescer com os jogadores', c3p: 'Atualizamos com base no seu feedback. Para nós, o lançamento é só o começo.',
      contactP: 'Opiniões, relatos de bugs ou propostas de trabalho: fique à vontade para entrar em contato.',
      fStore: 'Palette Bullet (App Store)', fSupport: 'Suporte do Palette Bullet',
      lang: 'Idioma',
    },
    it: {
      bcCatch: 'Impara l’arte del bartender',
      bcDesc: 'Mettiti dietro un bancone realistico e impara il mestiere, un bicchiere alla volta: 67 ricette, shakerare, mescolare, stratificare e l’arte del servizio.',
      review: 'In revisione — a breve',
      desc: 'TKYSOFT è uno sviluppatore indipendente di giochi e app per iPhone e iPad. Palette Bullet è disponibile.',
      news: '<b>Palette Bullet</b> è disponibile',
      lead: 'Come un circuito,<br>colleghiamo le <em>idee</em>.',
      p1: 'TKYSOFT è uno sviluppatore indipendente che crea giochi e app per iPhone e iPad.',
      p2: 'Da un singolo punto — un nodo — nasce una linea che si collega a un’altra idea e diventa un gioco. È lo spirito del nostro logo. Ideazione, design, programmazione e gestione: facciamo tutto con le nostre mani.',
      s1: 'Giochi e app', s2: 'Lingue', s4: 'Dall’idea alla gestione',
      pbCatch: 'Spara per dipingere: uno sparatutto a colori',
      pbDesc: 'Fai esplodere a colpi di vernice i colori che invadono la tua tela. Ogni schizzo resta sul dipinto e, alla fine di ogni livello, la tela viene incorniciata come un capolavoro.',
      store: 'Scarica su App Store', support: 'Assistenza', soon: 'Prossimamente',
      snCatch: 'Un puzzle gravitazionale per fondere le stelle',
      snDesc: 'Fai scontrare nuclei stellari uguali per creare stelle più grandi. Crea la supernova più grande della galassia prima che l’orizzonte gravitazionale trabocchi.',
      boCatch: 'Una festa di zuffe tra omini stilizzati',
      boDesc: 'Pugni, calci e lanci con i tuoi molleggianti omini stilizzati in una rissa scatenata! Fino a 4 giocatori, in locale o online, per buttarsi giù dall’arena.',
      dzCatch: 'Parla con diverse identità, collega le idee',
      dzDesc: 'Un account, tante identità. Con discussioni che si ramificano e una mappa delle relazioni che mostra la vicinanza tra persone e temi, i tuoi pensieri si collegano a quelli degli altri.',
      endSub: 'Il nostro prossimo gioco è in sviluppo.',
      moviesP: 'Trailer e video di gameplay arriveranno presto su YouTube e TikTok.',
      ph1: 'Video di presentazione — prossimamente', ph2: 'Pittura libera — prossimamente', ph3: 'Sfida a 4 giocatori — prossimamente', ph4: 'Trailer — prossimamente',
      chanYt: 'Canale YouTube',
      craftTitle: 'Anche il nostro modo di creare è un <em>circuito</em>.',
      c1h: 'Progettare la scintilla', c1p: 'Partiamo dalla “sensazione” al cuore del divertimento e costruiamo regole e livelli intorno a essa.',
      c2h: 'Realizzato con Unity / Swift', c2p: 'Dalla fisica ai ragdoll fino al multigiocatore online, rifinito per dare il meglio su iPhone e iPad.',
      c3h: 'Crescere con i giocatori', c3p: 'Aggiorniamo i giochi in base ai vostri commenti. Per noi, l’uscita è solo l’inizio.',
      contactP: 'Opinioni, segnalazioni di bug o richieste di lavoro: scrivici quando vuoi.',
      fStore: 'Palette Bullet (App Store)', fSupport: 'Assistenza Palette Bullet',
      lang: 'Lingua',
    },
  };

  const codes = LANGS.map(l => l[0]);
  const store = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const save = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

  function detect() {
    const q = new URLSearchParams(location.search).get('lang');
    if (q && codes.includes(q)) return q;
    const s = store('tky-lang'); if (s && codes.includes(s)) return s;
    for (const raw of (navigator.languages || [navigator.language || 'en'])) {
      const l = raw.toLowerCase();
      if (l.startsWith('zh')) return /hant|tw|hk|mo/.test(l) ? 'zh-Hant' : 'zh-Hans';
      const base = l.split('-')[0];
      if (codes.includes(base)) return base;
    }
    return 'en';
  }

  let cur = detect();
  const t = k => (DICT[cur] && DICT[cur][k]) ?? DICT.en[k] ?? k;

  function loadFont(lang) {
    const fam = FONTS[lang]; if (!fam || document.getElementById('font-' + lang)) return;
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.id = 'font-' + lang;
    l.href = `https://fonts.googleapis.com/css2?family=${fam}:wght@400;500;700;900&display=swap`;
    document.head.appendChild(l);
  }

  function apply(lang, fire) {
    cur = codes.includes(lang) ? lang : 'en';
    document.documentElement.lang = cur;
    loadFont(cur);
    document.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    refreshStore();
    const md = document.querySelector('meta[name="description"]'); if (md) md.content = t('desc');
    const L = LANGS.find(l => l[0] === cur);
    const btn = document.querySelector('.lang__cur'); if (btn) btn.textContent = L[2];
    const lb = document.querySelector('.lang__btn'); if (lb) lb.setAttribute('aria-label', `${t('lang')}: ${L[1]}`);
    document.querySelectorAll('.lang__menu [data-lang]').forEach(o => o.setAttribute('aria-selected', o.dataset.lang === cur));
    if (fire) document.dispatchEvent(new CustomEvent('tky:lang', { detail: cur }));
  }

  // App Store のリンク：日本語なら日本のストア、それ以外は各国のストア（data-store にアプリ ID、空なら Palette Bullet）
  function refreshStore() {
    document.querySelectorAll('[data-store]').forEach(a => {
      const id = a.dataset.store || '6831254343';
      a.href = (cur === 'ja' ? 'https://apps.apple.com/jp/app/id' : 'https://apps.apple.com/app/id') + id;
    });
  }

  // 言語メニュー
  function buildMenu() {
    const wrap = document.querySelector('.lang'); if (!wrap) return;
    const btn = wrap.querySelector('.lang__btn'), menu = wrap.querySelector('.lang__menu');
    menu.innerHTML = LANGS.map(([c, n]) => `<li><button type="button" role="option" data-lang="${c}" lang="${c}">${n}</button></li>`).join('');
    const close = () => { wrap.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); };
    btn.addEventListener('click', e => { e.stopPropagation(); const o = wrap.classList.toggle('is-open'); btn.setAttribute('aria-expanded', o); });
    menu.addEventListener('click', e => {
      const b = e.target.closest('[data-lang]'); if (!b) return;
      save('tky-lang', b.dataset.lang);
      const u = new URL(location.href); if (u.searchParams.has('lang')) { u.searchParams.set('lang', b.dataset.lang); history.replaceState(null, '', u); }
      apply(b.dataset.lang, true); close();
    });
    document.addEventListener('click', e => { if (!wrap.contains(e.target)) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  window.TKY_I18N = { t, get lang() { return cur; }, apply: l => apply(l, true), refreshStore };
  buildMenu();
  apply(cur, false);
})();
