import type { LocaleCode } from "./languages";

export type Messages = {
  nav: {
    markets: string;
    platform: string;
    about: string;
    contact: string;
    login: string;
    signUp: string;
    tradeNow: string;
    language: string;
    comingSoon: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    createAccount: string;
    login: string;
    instruments: string;
    markets: string;
    coverage: string;
  };
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  benefits: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  instruments: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  stats: {
    eyebrow: string;
    title: string;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  finalCta: {
    title: string;
    subtitle: string;
    getStarted: string;
    login: string;
  };
  footer: {
    blurb: string;
    platform: string;
    company: string;
    account: string;
    legal: string;
    markets: string;
    dashboard: string;
    features: string;
    howItWorks: string;
    about: string;
    contact: string;
    faq: string;
    login: string;
    register: string;
    resetPassword: string;
    terms: string;
    privacy: string;
    rights: string;
  };
};

export const messages: Record<LocaleCode, Messages> = {
  en: {
    nav: {
      markets: "Markets",
      platform: "Platform",
      about: "About",
      contact: "Contact",
      login: "Login",
      signUp: "Sign up",
      tradeNow: "Trade Now",
      language: "Language",
      comingSoon: "Coming soon",
    },
    hero: {
      badge: "Multi-asset trading workspace",
      title: "Trade global markets with institutional clarity.",
      subtitle:
        "Sowegan brings forex, crypto, commodities, and indices into one professional platform. Read the tape, manage your book, and act with a workspace built for focus.",
      createAccount: "Create account",
      login: "Login",
      instruments: "Instruments",
      markets: "Markets",
      coverage: "Coverage",
    },
    features: {
      eyebrow: "Platform",
      title: "Built like a trading desk, not a brochure.",
      subtitle:
        "Sowegan is structured around the information traders actually use: prices, movement, exposure, and a workspace that stays out of the way.",
    },
    benefits: {
      eyebrow: "Why Sowegan",
      title: "A premium market view without the visual noise.",
      subtitle:
        "Most trading products either oversimplify or overwhelm. Sowegan holds a middle ground: dense enough for professionals, spacious enough to stay readable on every screen.",
    },
    instruments: {
      eyebrow: "Instruments",
      title: "Four markets. One consistent board.",
      subtitle: "Monitor live-style quotes across forex, crypto, commodities, and indices.",
    },
    howItWorks: {
      eyebrow: "How it works",
      title: "From account to desk in three steps.",
      subtitle: "A simple path into a professional trading workspace.",
    },
    stats: {
      eyebrow: "At a glance",
      title: "Built for serious market coverage.",
    },
    testimonials: {
      eyebrow: "Reviews",
      title: "What traders say about Sowegan.",
      subtitle: "Feedback from people who care about clarity, layout, and market focus.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Answers before you open an account.",
      subtitle: "Common questions about markets, accounts, and the Sowegan experience.",
    },
    finalCta: {
      title: "Open a Sowegan workspace.",
      subtitle:
        "Create an account, review the markets, and step into a dashboard designed for professional trading presentation.",
      getStarted: "Get started",
      login: "Login",
    },
    footer: {
      blurb:
        "Sowegan is a professional multi-asset trading workspace for forex, crypto, commodities, and indices. Built for clarity, speed, and institutional-grade presentation.",
      platform: "Platform",
      company: "Company",
      account: "Account",
      legal: "Legal",
      markets: "Markets",
      dashboard: "Dashboard",
      features: "Features",
      howItWorks: "How it works",
      about: "About",
      contact: "Contact",
      faq: "FAQ",
      login: "Login",
      register: "Register",
      resetPassword: "Reset password",
      terms: "Terms",
      privacy: "Privacy",
      rights: "All rights reserved.",
    },
  },
  ko: {
    nav: {
      markets: "마켓",
      platform: "플랫폼",
      about: "소개",
      contact: "문의",
      login: "로그인",
      signUp: "회원가입",
      tradeNow: "지금 거래",
      language: "언어",
      comingSoon: "준비 중",
    },
    hero: {
      badge: "멀티 자산 트레이딩 워크스페이스",
      title: "기관급 명확함으로 글로벌 시장을 거래하세요.",
      subtitle:
        "Sowegan은 외환, 암호화폐, 원자재, 지수를 하나의 전문 플랫폼으로 모읍니다. 시세를 읽고, 포지션을 관리하며, 집중을 위해 설계된 워크스페이스에서 실행하세요.",
      createAccount: "계정 만들기",
      login: "로그인",
      instruments: "상품",
      markets: "마켓",
      coverage: "커버리지",
    },
    features: {
      eyebrow: "플랫폼",
      title: "브로슈어가 아닌, 실제 트레이딩 데스크처럼.",
      subtitle:
        "Sowegan은 트레이더가 실제로 쓰는 정보인 가격, 변동, 노출, 그리고 방해하지 않는 워크스페이스를 중심으로 구성됩니다.",
    },
    benefits: {
      eyebrow: "왜 Sowegan인가",
      title: "시각적 잡음 없는 프리미엄 시장 뷰.",
      subtitle:
        "대부분의 트레이딩 제품은 지나치게 단순하거나 과도하게 복잡합니다. Sowegan은 전문가에게 충분할 만큼 밀도 있고, 모든 화면에서 읽기 쉬울 만큼 여유 있는 중간 지점을 지킵니다.",
    },
    instruments: {
      eyebrow: "상품",
      title: "네 개의 마켓. 하나의 일관된 보드.",
      subtitle: "외환, 암호화폐, 원자재, 지수 시세를 한곳에서 확인하세요.",
    },
    howItWorks: {
      eyebrow: "이용 방법",
      title: "계정에서 데스크까지 세 단계.",
      subtitle: "전문 트레이딩 워크스페이스로 가는 간단한 경로.",
    },
    stats: {
      eyebrow: "한눈에",
      title: "진지한 시장 커버리지를 위해 설계됨.",
    },
    testimonials: {
      eyebrow: "리뷰",
      title: "트레이더들이 말하는 Sowegan.",
      subtitle: "명확함, 레이아웃, 시장 집중을 중시하는 사람들의 피드백.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "계정을 열기 전 답변.",
      subtitle: "마켓, 계정, Sowegan 경험에 대한 자주 묻는 질문.",
    },
    finalCta: {
      title: "Sowegan 워크스페이스를 여세요.",
      subtitle:
        "계정을 만들고 마켓을 확인한 뒤, 전문 트레이딩 프레젠테이션을 위해 설계된 대시보드로 들어가세요.",
      getStarted: "시작하기",
      login: "로그인",
    },
    footer: {
      blurb:
        "Sowegan은 외환, 암호화폐, 원자재, 지수를 위한 전문 멀티 자산 트레이딩 워크스페이스입니다. 명확함, 속도, 기관급 프레젠테이션을 위해 만들어졌습니다.",
      platform: "플랫폼",
      company: "회사",
      account: "계정",
      legal: "법적 고지",
      markets: "마켓",
      dashboard: "대시보드",
      features: "기능",
      howItWorks: "이용 방법",
      about: "소개",
      contact: "문의",
      faq: "FAQ",
      login: "로그인",
      register: "회원가입",
      resetPassword: "비밀번호 재설정",
      terms: "이용약관",
      privacy: "개인정보",
      rights: "모든 권리 보유.",
    },
  },
  sw: {
    nav: {
      markets: "Masoko",
      platform: "Jukwaa",
      about: "Kuhusu",
      contact: "Wasiliana",
      login: "Ingia",
      signUp: "Jisajili",
      tradeNow: "Fanya Biashara Sasa",
      language: "Lugha",
      comingSoon: "Inakuja hivi karibuni",
    },
    hero: {
      badge: "Nafasi ya biashara ya mali nyingi",
      title: "Fanya biashara katika masoko ya dunia kwa uwazi wa kitaalamu.",
      subtitle:
        "Sowegan inaleta forex, crypto, bidhaa, na fahirisi katika jukwaa moja la kitaalamu. Soma bei, simamia kitabu chako, na fanya kazi katika nafasi iliyojengwa kwa umakini.",
      createAccount: "Fungua akaunti",
      login: "Ingia",
      instruments: "Vyombo",
      markets: "Masoko",
      coverage: "Ufunikaji",
    },
    features: {
      eyebrow: "Jukwaa",
      title: "Imejengwa kama dawati la biashara, si brosha.",
      subtitle:
        "Sowegan imeundwa kuzunguka taarifa wanazotumia wafanyabiashara: bei, mienendo, hatari, na nafasi ya kazi isiyoingilia.",
    },
    benefits: {
      eyebrow: "Kwa nini Sowegan",
      title: "Mwonekano wa soko wa hali ya juu bila kelele za kuona.",
      subtitle:
        "Bidhaa nyingi za biashara huzidisha au kurahisisha mno. Sowegan inashikilia katikati: yenye kina kwa wataalamu, na yenye nafasi ya kusomeka kwenye kila skrini.",
    },
    instruments: {
      eyebrow: "Vyombo",
      title: "Masoko manne. Bodi moja thabiti.",
      subtitle: "Fuatilia nukuu za forex, crypto, bidhaa, na fahirisi mahali pamoja.",
    },
    howItWorks: {
      eyebrow: "Jinsi inavyofanya kazi",
      title: "Kutoka akaunti hadi dawati kwa hatua tatu.",
      subtitle: "Njia rahisi kuelekea nafasi ya biashara ya kitaalamu.",
    },
    stats: {
      eyebrow: "Kwa mtazamo",
      title: "Imejengwa kwa ufunikaji mkubwa wa soko.",
    },
    testimonials: {
      eyebrow: "Maoni",
      title: "Wafanyabiashara wanasema nini kuhusu Sowegan.",
      subtitle: "Maoni kutoka kwa watu wanaojali uwazi, mpangilio, na umakini wa soko.",
    },
    faq: {
      eyebrow: "Maswali",
      title: "Majibu kabla ya kufungua akaunti.",
      subtitle: "Maswali ya kawaida kuhusu masoko, akaunti, na uzoefu wa Sowegan.",
    },
    finalCta: {
      title: "Fungua nafasi yako ya Sowegan.",
      subtitle:
        "Fungua akaunti, angalia masoko, na ingia kwenye dashibodi iliyoundwa kwa biashara ya kitaalamu.",
      getStarted: "Anza sasa",
      login: "Ingia",
    },
    footer: {
      blurb:
        "Sowegan ni nafasi ya biashara ya mali nyingi kwa forex, crypto, bidhaa, na fahirisi. Imejengwa kwa uwazi, kasi, na uwasilishaji wa kiwango cha kitaalamu.",
      platform: "Jukwaa",
      company: "Kampuni",
      account: "Akaunti",
      legal: "Kisheria",
      markets: "Masoko",
      dashboard: "Dashibodi",
      features: "Vipengele",
      howItWorks: "Jinsi inavyofanya kazi",
      about: "Kuhusu",
      contact: "Wasiliana",
      faq: "Maswali",
      login: "Ingia",
      register: "Jisajili",
      resetPassword: "Weka upya nenosiri",
      terms: "Sheria",
      privacy: "Faragha",
      rights: "Haki zote zimehifadhiwa.",
    },
  },
};
