import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type Language = "en" | "pt" | "es" | "fr" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const getBrowserLanguage = (): Language => {
  const browserLang = navigator.language.slice(0, 2).toLowerCase();
  const supported: Language[] = ["en", "pt", "es", "fr", "de"];
  return supported.includes(browserLang as Language)
    ? (browserLang as Language)
    : "en";
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.writing": "Writing",
    "nav.contact": "Contact",

    // Hero
    "hero.tagline": "Frontend Developer",
    "hero.intro":
      "I craft interfaces that feel inevitable — clean logic made beautiful.",
    "hero.sub":
      "I'm a frontend developer who believes great UI is the product of equal parts code and obsession. I work at the intersection of design systems, animation, and accessibility.",
    "hero.cta": "View my work",

    // About section
    "about.title": "About me",
    "about.bio1":
      "I'm a frontend developer who believes great UI is the product of equal parts code and obsession. I work at the intersection of design systems, animation, and accessibility.",
    "about.bio2":
      "Currently open to freelance projects and full-time roles. Based wherever the wifi is good.",
    "about.location": "Location",
    "about.experience": "Experience",
    "about.experience_value":
      "3+ years of hands-on experience building user-centric applications",
    "about.currently": "Currently",
    "about.available": "Available for new projects",
    "about.loves": "Loves working with",

    // Skills section
    "skills.title": "Skills & stack",
    "skills.core": "Core",
    "skills.tooling": "Tooling",
    "skills.fluent": "Also fluent in",

    // Projects section
    "projects.title": "Selected work",
    "projects.live": "Live site",
    "projects.source": "Source",
    "projects.demo": "Demo",

    // Blog section
    "blog.title": "Writing & thoughts",
    "blog.read": "Read article",

    // Contact section
    "contact.title": "Let's talk",
    "contact.big": "Got a project\nin mind?",
    "contact.open": "Currently open to freelance & full-time opportunities.",
    "contact.name": "Your name",
    "contact.email": "Your email",
    "contact.subject": "Subject",
    "contact.message": "Tell me about your project…",
    "contact.send": "Send message",

    // Footer
    "footer.rights": "All rights reserved.",

    // Blog posts
    "blog.post1.title":
      "The Real Hustle of Freelance Web Dev (Nobody Talks About)",
    "blog.post1.excerpt":
      "Nowadays, freelance web devs need to be a swiss army knife, check out why",
    "blog.post2.title": "Why too many animations are actually self-defeating",
    "blog.post2.excerpt":
      "A deep dive into why too many animations actually make a website's performance a lot more poor and the user experience a lot less pleasant. (SOON AVAILABLE TO READ)",
    "blog.post3.title": "Accessibility is a design problem, not a dev problem",
    "blog.post3.excerpt":
      "On why accessibility debt starts in Figma and what frontend devs can do to push back — constructively. (SOON AVAILABLE TO READ)",

    // Shared project UI labels
    "project.viewLive": "Live site",
    "project.viewCode": "Source",
    "project.role": "Role",
    "project.year": "Year",
    "project.stack": "Stack",
    "project.close": "Close",
    "project.openProject": "View details",
    "project.demoUnavailable": "Demo not available",
    "project.comingSoon": "Soon available to showcase",
    "project.comingSoon.sub": "Currently in development",

    // Nexus Dashboard
    "project.nexus.name": "Nexus Dashboard",
    "project.nexus.tagline": "Real-time crypto analytics & portfolio tracker",
    "project.nexus.description":
      "A full-stack crypto dashboard consuming the CoinGecko API to display live data on 100+ cryptocurrencies — prices, OHLC charts, market cap, and trends. Users can sign up and log in via Supabase Auth to manage a personal portfolio and track their own holdings.",
    "project.nexus.role": "Full-stack Developer",
    "project.nexus.year": "2025",

    // Québec.
    "project.quebec.name": "Québec.",
    "project.quebec.tagline": "Tourism promotion website for Québec",
    "project.quebec.description":
      "A 50+ page tourism website that showcases the beauty of Québec — its landscapes, culture, cities, and gastronomy. Built with a strong emphasis on visual storytelling, smooth page transitions with Framer Motion, and a fully responsive layout using Tailwind CSS.",
    "project.quebec.role": "Frontend Developer",
    "project.quebec.year": "2025",

    // Community Scheduler
    "project.scheduler.name": "Community Scheduler",
    "project.scheduler.tagline":
      "Local scheduling platform — 84 users, 100+ schedules/month",
    "project.scheduler.description":
      "A private scheduling platform built for a local community, currently serving 84 active users with over 100 schedules generated per month. Features real-time data sync via Firebase, an intuitive scheduling interface, and admin controls. Demo and source code are unavailable due to sensitive client data.",
    "project.scheduler.role": "Creator & Developer",
    "project.scheduler.year": "2025 – Present",

    // Hairdresser I
    "project.haircut1.name": "Local Hairdresser — I",
    "project.haircut1.tagline": "Coming soon",
    "project.haircut1.description":
      "A website currently in development for a local hairdresser. Will feature online booking, a gallery of work, service pricing, and contact details.",
    "project.haircut1.role": "Frontend Developer",
    "project.haircut1.year": "2026",

    // Hairdresser II
    "project.haircut2.name": "Local Hairdresser — II",
    "project.haircut2.tagline": "Coming soon",
    "project.haircut2.description":
      "A second local hairdresser website in progress. Focused on a bold, brand-forward design with an emphasis on first impressions and mobile experience.",
    "project.haircut2.role": "Frontend Developer",
    "project.haircut2.year": "2026",

    "contact.sending": "Sending",
    "contact.error":
      "Something went wrong. Please try again or email me directly.",
    "contact.modal.tag": "Message received",
    "contact.modal.title": "Got it — I'll be in touch.",
    "contact.modal.sub":
      "Thanks for reaching out. I typically reply within 24–48 hours.",
    "contact.modal.close": "Back to portfolio",
  },

  pt: {
    // Navigation
    "nav.about": "Sobre",
    "nav.skills": "Habilidades",
    "nav.projects": "Projetos",
    "nav.writing": "Artigos",
    "nav.contact": "Contato",

    // Hero
    "hero.tagline": "Desenvolvedor Frontend",
    "hero.intro":
      "Crio interfaces que parecem inevitáveis — lógica limpa tornada bela.",
    "hero.sub":
      "Sou um desenvolvedor frontend que acredita que uma boa UI é produto de código e obsessão em partes iguais. Trabalho na interseção de sistemas de design, animação e acessibilidade.",
    "hero.cta": "Veja meu trabalho",

    // About section
    "about.title": "Sobre mim",
    "about.bio1":
      "Sou um desenvolvedor frontend que acredita que uma boa UI é produto de código e obsessão em partes iguais. Trabalho na interseção de sistemas de design, animação e acessibilidade.",
    "about.bio2":
      "Atualmente aberto para projetos freelance e oportunidades em tempo integral. Baseado onde o wifi é bom.",
    "about.location": "Localização",
    "about.experience": "Experiência",
    "about.experience_value":
      "Mais de 3 anos de experiência prática desenvolvendo aplicações centradas no usuário",
    "about.currently": "Atualmente",
    "about.available": "Disponível para novos projetos",
    "about.loves": "Adoro trabalhar com",

    // Skills section
    "skills.title": "Habilidades & stack",
    "skills.core": "Principais",
    "skills.tooling": "Ferramentas",
    "skills.fluent": "Também fluente em",

    // Projects section
    "projects.title": "Trabalhos selecionados",
    "projects.live": "Site ao vivo",
    "projects.source": "Código",
    "projects.demo": "Demo",

    // Blog section
    "blog.title": "Artigos & reflexões",
    "blog.read": "Ler artigo",

    // Contact section
    "contact.title": "Vamos conversar",
    "contact.big": "Tem um projeto\nem mente?",
    "contact.open":
      "Atualmente aberto para projetos freelance e oportunidades em tempo integral.",
    "contact.name": "Seu nome",
    "contact.email": "Seu email",
    "contact.subject": "Assunto",
    "contact.message": "Conte-me sobre seu projeto…",
    "contact.send": "Enviar mensagem",

    // Footer
    "footer.rights": "Todos os direitos reservados.",

    // Blog posts
    "blog.post1.title":
      "O verdadeiro desafio do dev freelancer (que ninguém fala)",
    "blog.post1.excerpt":
      "Hoje em dia, devs freelancers precisam ser um canivete suíço. Descubra o porquê.",
    "blog.post2.title":
      "Por que animações demais são, na verdade, contraproducentes",
    "blog.post2.excerpt":
      "Uma análise aprofundada de por que animações em excesso prejudicam a performance do site e tornam a experiência do usuário muito menos agradável. (EM BREVE)",
    "blog.post3.title":
      "Acessibilidade é um problema de design, não de desenvolvimento",
    "blog.post3.excerpt":
      "Sobre por que a dívida de acessibilidade começa no Figma e o que desenvolvedores frontend podem fazer para contestar — de forma construtiva. (EM BREVE)",

    // Shared project UI labels
    "project.viewLive": "Ver site",
    "project.viewCode": "Código",
    "project.role": "Função",
    "project.year": "Ano",
    "project.stack": "Stack",
    "project.close": "Fechar",
    "project.openProject": "Ver detalhes",
    "project.demoUnavailable": "Demo indisponível",
    "project.comingSoon": "Em breve para apresentar",
    "project.comingSoon.sub": "Atualmente em desenvolvimento",

    // Nexus Dashboard
    "project.nexus.name": "Nexus Dashboard",
    "project.nexus.tagline":
      "Análise de criptomoedas e rastreamento de portfólio em tempo real",
    "project.nexus.description":
      "Um dashboard full-stack que consome a API do CoinGecko para exibir dados ao vivo de mais de 100 criptomoedas — preços, gráficos OHLC, capitalização de mercado e tendências. Usuários podem se cadastrar e fazer login via Supabase Auth para gerenciar um portfólio pessoal e acompanhar seus ativos.",
    "project.nexus.role": "Desenvolvedor Full-stack",
    "project.nexus.year": "2025",

    // Québec.
    "project.quebec.name": "Québec.",
    "project.quebec.tagline": "Site de promoção turística do Québec",
    "project.quebec.description":
      "Um site de turismo com mais de 50 páginas que apresenta as belezas do Québec — suas paisagens, cultura, cidades e gastronomia. Desenvolvido com grande ênfase em narrativa visual, transições suaves com Framer Motion e layout totalmente responsivo com Tailwind CSS.",
    "project.quebec.role": "Desenvolvedor Frontend",
    "project.quebec.year": "2025",

    // Community Scheduler
    "project.scheduler.name": "Agendador Comunitário",
    "project.scheduler.tagline":
      "Plataforma de agendamento local — 84 usuários, mais de 100 agendamentos/mês",
    "project.scheduler.description":
      "Uma plataforma de agendamento privada desenvolvida para uma comunidade local, atendendo atualmente 84 usuários ativos com mais de 100 agendamentos gerados por mês. Possui sincronização de dados em tempo real via Firebase, interface intuitiva e controles de administração. Demo e código-fonte indisponíveis por conter dados sensíveis do cliente.",
    "project.scheduler.role": "Criador e Desenvolvedor",
    "project.scheduler.year": "2025 – Presente",

    // Hairdresser I
    "project.haircut1.name": "Cabeleireiro Local — I",
    "project.haircut1.tagline": "Em breve",
    "project.haircut1.description":
      "Um site atualmente em desenvolvimento para um cabeleireiro local. Contará com agendamento online, galeria de trabalhos, tabela de preços e informações de contato.",
    "project.haircut1.role": "Desenvolvedor Frontend",
    "project.haircut1.year": "2026",

    // Hairdresser II
    "project.haircut2.name": "Cabeleireiro Local — II",
    "project.haircut2.tagline": "Em breve",
    "project.haircut2.description":
      "Um segundo site para cabeleireiro local em andamento. Com foco em um design marcante e voltado à identidade da marca, com ênfase em primeiras impressões e experiência mobile.",
    "project.haircut2.role": "Desenvolvedor Frontend",
    "project.haircut2.year": "2026",

    "contact.sending": "Enviando",
    "contact.error":
      "Algo deu errado. Tente novamente ou me envie um e-mail diretamente.",
    "contact.modal.tag": "Mensagem recebida",
    "contact.modal.title": "Recebi — entrarei em contato.",
    "contact.modal.sub":
      "Obrigado pelo contato. Geralmente respondo em 24–48 horas.",
    "contact.modal.close": "Voltar ao portfólio",
  },

  es: {
    // Navigation
    "nav.about": "Sobre",
    "nav.skills": "Habilidades",
    "nav.projects": "Proyectos",
    "nav.writing": "Artículos",
    "nav.contact": "Contacto",

    // Hero
    "hero.tagline": "Desarrollador Frontend",
    "hero.intro":
      "Creo interfaces que se sienten inevitables — lógica limpia hecha belleza.",
    "hero.sub":
      "Soy un desarrollador frontend que cree que una buena UI es producto de código y obsesión en partes iguales. Trabajo en la intersección de sistemas de diseño, animación y accesibilidad.",
    "hero.cta": "Ver mi trabajo",

    // About section
    "about.title": "Sobre mí",
    "about.bio1":
      "Soy un desarrollador frontend que cree que una buena UI es producto de código y obsesión en partes iguales. Trabajo en la intersección de sistemas de diseño, animación y accesibilidad.",
    "about.bio2":
      "Actualmente abierto a proyectos freelance y roles de tiempo completo. Basado donde el wifi es bueno.",
    "about.location": "Ubicación",
    "about.experience": "Experiencia",
    "about.experience_value":
      "Más de 3 años de experiencia práctica desarrollando aplicaciones centradas en el usuario",
    "about.currently": "Actualmente",
    "about.available": "Disponible para nuevos proyectos",
    "about.loves": "Me encanta trabajar con",

    // Skills section
    "skills.title": "Habilidades & stack",
    "skills.core": "Principales",
    "skills.tooling": "Herramientas",
    "skills.fluent": "También fluido en",

    // Projects section
    "projects.title": "Trabajos seleccionados",
    "projects.live": "Sitio web",
    "projects.source": "Código",
    "projects.demo": "Demo",

    // Blog section
    "blog.title": "Artículos & reflexiones",
    "blog.read": "Leer artículo",

    // Contact section
    "contact.title": "Hablemos",
    "contact.big": "¿Tienes un proyecto\nen mente?",
    "contact.open":
      "Actualmente abierto a proyectos freelance y oportunidades de tiempo completo.",
    "contact.name": "Tu nombre",
    "contact.email": "Tu email",
    "contact.subject": "Asunto",
    "contact.message": "Cuéntame sobre tu proyecto…",
    "contact.send": "Enviar mensaje",

    // Footer
    "footer.rights": "Todos los derechos reservados.",

    // Blog posts
    "blog.post1.title":
      "El verdadero reto del dev freelancer (que nadie menciona)",
    "blog.post1.excerpt":
      "Hoy en día, los devs freelancers necesitan ser una navaja suiza. Descubre por qué.",
    "blog.post2.title": "Por qué demasiadas animaciones son contraproducentes",
    "blog.post2.excerpt":
      "Un análisis profundo de por qué el exceso de animaciones perjudica el rendimiento del sitio y hace la experiencia de usuario mucho menos agradable. (PRÓXIMAMENTE)",
    "blog.post3.title":
      "La accesibilidad es un problema de diseño, no de desarrollo",
    "blog.post3.excerpt":
      "Sobre por qué la deuda de accesibilidad comienza en Figma y qué pueden hacer los desarrolladores frontend para contrarrestarlo — de manera constructiva. (PRÓXIMAMENTE)",

    // Shared project UI labels
    "project.viewLive": "Ver sitio",
    "project.viewCode": "Código",
    "project.role": "Rol",
    "project.year": "Año",
    "project.stack": "Stack",
    "project.close": "Cerrar",
    "project.openProject": "Ver detalles",
    "project.demoUnavailable": "Demo no disponible",
    "project.comingSoon": "Próximamente disponible",
    "project.comingSoon.sub": "Actualmente en desarrollo",

    // Nexus Dashboard
    "project.nexus.name": "Nexus Dashboard",
    "project.nexus.tagline":
      "Análisis de criptomonedas y seguimiento de portafolio en tiempo real",
    "project.nexus.description":
      "Un dashboard full-stack que consume la API de CoinGecko para mostrar datos en vivo de más de 100 criptomonedas — precios, gráficos OHLC, capitalización de mercado y tendencias. Los usuarios pueden registrarse e iniciar sesión con Supabase Auth para gestionar un portafolio personal y hacer seguimiento de sus activos.",
    "project.nexus.role": "Desarrollador Full-stack",
    "project.nexus.year": "2025",

    // Québec.
    "project.quebec.name": "Québec.",
    "project.quebec.tagline": "Sitio de promoción turística de Québec",
    "project.quebec.description":
      "Un sitio de turismo de más de 50 páginas que muestra las maravillas de Québec — sus paisajes, cultura, ciudades y gastronomía. Construido con énfasis en la narrativa visual, transiciones suaves con Framer Motion y diseño completamente responsivo con Tailwind CSS.",
    "project.quebec.role": "Desarrollador Frontend",
    "project.quebec.year": "2025",

    // Community Scheduler
    "project.scheduler.name": "Agenda Comunitaria",
    "project.scheduler.tagline":
      "Plataforma de agendamiento local — 84 usuarios, más de 100 agendas/mes",
    "project.scheduler.description":
      "Una plataforma de agendamiento privada para una comunidad local, con 84 usuarios activos y más de 100 agendas generadas al mes. Incluye sincronización en tiempo real con Firebase, interfaz intuitiva y controles de administración. Demo y código fuente no disponibles por datos sensibles del cliente.",
    "project.scheduler.role": "Creador y Desarrollador",
    "project.scheduler.year": "2025 – Presente",

    // Hairdresser I
    "project.haircut1.name": "Peluquería Local — I",
    "project.haircut1.tagline": "Próximamente",
    "project.haircut1.description":
      "Un sitio web en desarrollo para una peluquería local. Contará con reservas en línea, galería de trabajos, precios y datos de contacto.",
    "project.haircut1.role": "Desarrollador Frontend",
    "project.haircut1.year": "2026",

    // Hairdresser II
    "project.haircut2.name": "Peluquería Local — II",
    "project.haircut2.tagline": "Próximamente",
    "project.haircut2.description":
      "Un segundo sitio web para peluquería local en proceso. Enfocado en un diseño audaz centrado en la marca, con énfasis en la primera impresión y la experiencia móvil.",
    "project.haircut2.role": "Desarrollador Frontend",
    "project.haircut2.year": "2026",

    "contact.sending": "Enviando",
    "contact.error":
      "Algo salió mal. Inténtalo de nuevo o escríbeme directamente.",
    "contact.modal.tag": "Mensaje recibido",
    "contact.modal.title": "Recibido — estaré en contacto.",
    "contact.modal.sub":
      "Gracias por escribir. Suelo responder en 24–48 horas.",
    "contact.modal.close": "Volver al portafolio",
  },

  fr: {
    // Navigation
    "nav.about": "À propos",
    "nav.skills": "Compétences",
    "nav.projects": "Projets",
    "nav.writing": "Articles",
    "nav.contact": "Contact",

    // Hero
    "hero.tagline": "Développeur Frontend",
    "hero.intro":
      "Je crée des interfaces qui semblent inévitables — une logique épurée rendue belle.",
    "hero.sub":
      "Je suis un développeur frontend qui croit qu'une bonne UI est le produit d'un code et d'une obsession à parts égales. Je travaille à l'intersection des systèmes de design, de l'animation et de l'accessibilité.",
    "hero.cta": "Voir mon travail",

    // About section
    "about.title": "À propos de moi",
    "about.bio1":
      "Je suis un développeur frontend qui croit qu'une bonne UI est le produit d'un code et d'une obsession à parts égales. Je travaille à l'intersection des systèmes de design, de l'animation et de l'accessibilité.",
    "about.bio2":
      "Actuellement ouvert aux projets freelance et aux postes à temps plein. Basé là où le wifi est bon.",
    "about.location": "Emplacement",
    "about.experience": "Expérience",
    "about.experience_value":
      "Plus de 3 ans d'expérience pratique dans le développement d'applications centrées sur l'utilisateur",
    "about.currently": "Actuellement",
    "about.available": "Disponible pour de nouveaux projets",
    "about.loves": "J'adore travailler avec",

    // Skills section
    "skills.title": "Compétences & stack",
    "skills.core": "Principales",
    "skills.tooling": "Outils",
    "skills.fluent": "Également compétent en",

    // Projects section
    "projects.title": "Travaux sélectionnés",
    "projects.live": "Site en ligne",
    "projects.source": "Code source",
    "projects.demo": "Démo",

    // Blog section
    "blog.title": "Articles & réflexions",
    "blog.read": "Lire l'article",

    // Contact section
    "contact.title": "Parlons-en",
    "contact.big": "Un projet\nen tête ?",
    "contact.open":
      "Actuellement ouvert aux projets freelance et aux opportunités à temps plein.",
    "contact.name": "Votre nom",
    "contact.email": "Votre email",
    "contact.subject": "Sujet",
    "contact.message": "Parlez-moi de votre projet…",
    "contact.send": "Envoyer le message",

    // Footer
    "footer.rights": "Tous droits réservés.",

    // Blog posts
    "blog.post1.title":
      "Le vrai défi du dev freelance (dont personne ne parle)",
    "blog.post1.excerpt":
      "Aujourd'hui, les devs freelances doivent être un couteau suisse. Découvrez pourquoi.",
    "blog.post2.title":
      "Pourquoi trop d'animations sont en réalité contre-productives",
    "blog.post2.excerpt":
      "Une analyse approfondie de pourquoi un excès d'animations nuit aux performances du site et rend l'expérience utilisateur bien moins agréable. (BIENTÔT DISPONIBLE)",
    "blog.post3.title":
      "L'accessibilité est un problème de design, pas de développement",
    "blog.post3.excerpt":
      "Pourquoi la dette d'accessibilité commence dans Figma et ce que les développeurs frontend peuvent faire pour la contrer — de manière constructive. (BIENTÔT DISPONIBLE)",

    // Shared project UI labels
    "project.viewLive": "Voir le site",
    "project.viewCode": "Code source",
    "project.role": "Rôle",
    "project.year": "Année",
    "project.stack": "Stack",
    "project.close": "Fermer",
    "project.openProject": "Voir les détails",
    "project.demoUnavailable": "Démo non disponible",
    "project.comingSoon": "Bientôt disponible",
    "project.comingSoon.sub": "Actuellement en développement",

    // Nexus Dashboard
    "project.nexus.name": "Nexus Dashboard",
    "project.nexus.tagline":
      "Analyse crypto et suivi de portefeuille en temps réel",
    "project.nexus.description":
      "Un dashboard full-stack consommant l'API CoinGecko pour afficher des données en direct sur plus de 100 cryptomonnaies — prix, graphiques OHLC, capitalisation boursière et tendances. Les utilisateurs peuvent s'inscrire et se connecter via Supabase Auth pour gérer un portefeuille personnel et suivre leurs actifs.",
    "project.nexus.role": "Développeur Full-stack",
    "project.nexus.year": "2025",

    // Québec.
    "project.quebec.name": "Québec.",
    "project.quebec.tagline": "Site de promotion touristique du Québec",
    "project.quebec.description":
      "Un site touristique de plus de 50 pages mettant en valeur les beautés du Québec — ses paysages, sa culture, ses villes et sa gastronomie. Réalisé avec un fort accent sur la narration visuelle, des transitions fluides avec Framer Motion et une mise en page entièrement responsive avec Tailwind CSS.",
    "project.quebec.role": "Développeur Frontend",
    "project.quebec.year": "2025",

    // Community Scheduler
    "project.scheduler.name": "Agenda Communautaire",
    "project.scheduler.tagline":
      "Plateforme de planification locale — 84 utilisateurs, plus de 100 agendas/mois",
    "project.scheduler.description":
      "Une plateforme de planification privée développée pour une communauté locale, desservant actuellement 84 utilisateurs actifs avec plus de 100 agendas générés par mois. Synchronisation en temps réel via Firebase, interface intuitive et contrôles d'administration. Démo et code source indisponibles en raison de données client sensibles.",
    "project.scheduler.role": "Créateur & Développeur",
    "project.scheduler.year": "2025 – Présent",

    // Hairdresser I
    "project.haircut1.name": "Coiffeur Local — I",
    "project.haircut1.tagline": "Bientôt disponible",
    "project.haircut1.description":
      "Un site web en cours de développement pour un coiffeur local. Comprendra une réservation en ligne, une galerie de réalisations, les tarifs et les coordonnées.",
    "project.haircut1.role": "Développeur Frontend",
    "project.haircut1.year": "2026",

    // Hairdresser II
    "project.haircut2.name": "Coiffeur Local — II",
    "project.haircut2.tagline": "Bientôt disponible",
    "project.haircut2.description":
      "Un second site pour coiffeur local en cours de réalisation. Axé sur un design audacieux centré sur la marque, avec un accent particulier sur les premières impressions et l'expérience mobile.",
    "project.haircut2.role": "Développeur Frontend",
    "project.haircut2.year": "2026",

    "contact.sending": "Envoi en cours",
    "contact.error":
      "Une erreur est survenue. Réessayez ou écrivez-moi directement.",
    "contact.modal.tag": "Message reçu",
    "contact.modal.title": "Reçu — je vous recontacterai.",
    "contact.modal.sub":
      "Merci pour votre message. Je réponds généralement sous 24–48 heures.",
    "contact.modal.close": "Retour au portfolio",
  },

  de: {
    // Navigation
    "nav.about": "Über",
    "nav.skills": "Fähigkeiten",
    "nav.projects": "Projekte",
    "nav.writing": "Artikel",
    "nav.contact": "Kontakt",

    // Hero
    "hero.tagline": "Frontend-Entwickler",
    "hero.intro":
      "Ich gestalte Schnittstellen, die unvermeidlich wirken — saubere Logik, die schön wird.",
    "hero.sub":
      "Ich bin ein Frontend-Entwickler, der glaubt, dass eine gute UI zu gleichen Teilen aus Code und Besessenheit besteht. Ich arbeite an der Schnittstelle von Designsystemen, Animation und Barrierefreiheit.",
    "hero.cta": "Meine Arbeit ansehen",

    // About section
    "about.title": "Über mich",
    "about.bio1":
      "Ich bin ein Frontend-Entwickler, der glaubt, dass eine gute UI zu gleichen Teilen aus Code und Besessenheit besteht. Ich arbeite an der Schnittstelle von Designsystemen, Animation und Barrierefreiheit.",
    "about.bio2":
      "Derzeit offen für freiberufliche Projekte und Vollzeitstellen. Überall dort, wo das WLAN gut ist.",
    "about.location": "Standort",
    "about.experience": "Erfahrung",
    "about.experience_value":
      "Über 3 Jahre praktische Erfahrung in der Entwicklung nutzerzentrierter Anwendungen",
    "about.currently": "Derzeit",
    "about.available": "Verfügbar für neue Projekte",
    "about.loves": "Arbeite gerne mit",

    // Skills section
    "skills.title": "Fähigkeiten & Stack",
    "skills.core": "Kernkompetenzen",
    "skills.tooling": "Werkzeuge",
    "skills.fluent": "Auch fließend in",

    // Projects section
    "projects.title": "Ausgewählte Arbeiten",
    "projects.live": "Live-Website",
    "projects.source": "Quellcode",
    "projects.demo": "Demo",

    // Blog section
    "blog.title": "Schreiben & Gedanken",
    "blog.read": "Artikel lesen",

    // Contact section
    "contact.title": "Lass uns reden",
    "contact.big": "Haben Sie ein Projekt\nim Kopf?",
    "contact.open":
      "Derzeit offen für freiberufliche Projekte und Vollzeitstellen.",
    "contact.name": "Ihr Name",
    "contact.email": "Ihre E-Mail",
    "contact.subject": "Betreff",
    "contact.message": "Erzählen Sie mir von Ihrem Projekt…",
    "contact.send": "Nachricht senden",

    // Footer
    "footer.rights": "Alle Rechte vorbehalten.",

    // Blog posts
    "blog.post1.title":
      "Der wahre Alltag als Freelance-Webentwickler (worüber niemand spricht)",
    "blog.post1.excerpt":
      "Heutzutage müssen Freelance-Webentwickler ein Schweizer Taschenmesser sein. Erfahre warum.",
    "blog.post2.title":
      "Warum zu viele Animationen tatsächlich kontraproduktiv sind",
    "blog.post2.excerpt":
      "Eine tiefgehende Analyse, warum übermäßige Animationen die Performance einer Website verschlechtern und das Nutzererlebnis deutlich weniger angenehm machen. (DEMNÄCHST VERFÜGBAR)",
    "blog.post3.title":
      "Barrierefreiheit ist ein Designproblem, kein Entwicklungsproblem",
    "blog.post3.excerpt":
      "Warum Barrierefreiheitsschulden in Figma beginnen und was Frontend-Entwickler tun können, um konstruktiv dagegen vorzugehen. (DEMNÄCHST VERFÜGBAR)",

    // Shared project UI labels
    "project.viewLive": "Live-Site",
    "project.viewCode": "Quellcode",
    "project.role": "Rolle",
    "project.year": "Jahr",
    "project.stack": "Stack",
    "project.close": "Schließen",
    "project.openProject": "Details ansehen",
    "project.demoUnavailable": "Demo nicht verfügbar",
    "project.comingSoon": "Demnächst verfügbar",
    "project.comingSoon.sub": "Derzeit in Entwicklung",

    // Nexus Dashboard
    "project.nexus.name": "Nexus Dashboard",
    "project.nexus.tagline": "Echtzeit-Krypto-Analyse und Portfolio-Tracker",
    "project.nexus.description":
      "Ein Full-Stack-Dashboard, das die CoinGecko API nutzt, um Live-Daten von über 100 Kryptowährungen anzuzeigen — Preise, OHLC-Charts, Marktkapitalisierung und Trends. Nutzer können sich über Supabase Auth registrieren und anmelden, um ein persönliches Portfolio zu verwalten und ihre Bestände zu verfolgen.",
    "project.nexus.role": "Full-stack-Entwickler",
    "project.nexus.year": "2025",

    // Québec.
    "project.quebec.name": "Québec.",
    "project.quebec.tagline": "Tourismus-Webseite für Québec",
    "project.quebec.description":
      "Eine Tourismus-Website mit über 50 Seiten, die die Schönheiten Québecs präsentiert — Landschaften, Kultur, Städte und Gastronomie. Mit starkem Fokus auf visuelle Erzählweise, flüssigen Seitenübergängen mit Framer Motion und vollständig responsivem Layout mit Tailwind CSS.",
    "project.quebec.role": "Frontend-Entwickler",
    "project.quebec.year": "2025",

    // Community Scheduler
    "project.scheduler.name": "Gemeinschafts-Kalender",
    "project.scheduler.tagline":
      "Lokale Planungsplattform — 84 Nutzer, über 100 Termine/Monat",
    "project.scheduler.description":
      "Eine private Planungsplattform für eine lokale Gemeinschaft mit derzeit 84 aktiven Nutzern und über 100 generierten Terminen pro Monat. Echtzeit-Datensynchronisation via Firebase, intuitive Benutzeroberfläche und Admin-Kontrollen. Demo und Quellcode nicht verfügbar wegen sensibler Kundendaten.",
    "project.scheduler.role": "Entwickler & Ersteller",
    "project.scheduler.year": "2025 – Heute",

    // Hairdresser I
    "project.haircut1.name": "Lokaler Friseur — I",
    "project.haircut1.tagline": "Demnächst",
    "project.haircut1.description":
      "Eine Website in Entwicklung für einen lokalen Friseursalon. Geplant sind Online-Buchung, Galerie, Preisliste und Kontaktdaten.",
    "project.haircut1.role": "Frontend-Entwickler",
    "project.haircut1.year": "2026",

    // Hairdresser II
    "project.haircut2.name": "Lokaler Friseur — II",
    "project.haircut2.tagline": "Demnächst",
    "project.haircut2.description":
      "Eine zweite Website für einen lokalen Friseursalon in Arbeit. Fokus auf ein markantes, markenorientiertes Design mit Betonung auf ersten Eindruck und mobiler Nutzung.",
    "project.haircut2.role": "Frontend-Entwickler",
    "project.haircut2.year": "2026",

    "contact.sending": "Wird gesendet",
    "contact.error":
      "Etwas ist schiefgelaufen. Versuche es erneut oder schreib mir direkt.",
    "contact.modal.tag": "Nachricht erhalten",
    "contact.modal.title": "Erhalten — ich melde mich.",
    "contact.modal.sub":
      "Danke für deine Nachricht. Ich antworte in der Regel innerhalb von 24–48 Stunden.",
    "contact.modal.close": "Zurück zum Portfolio",
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(getBrowserLanguage);
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
