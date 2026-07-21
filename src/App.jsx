import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowRight,
  Star,
  Layers,
  Zap,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Compass,
  Code2,
  Send,
  CheckCircle2,
  Wrench,
  Smartphone,
  Layout,
  ShoppingBag,
  Database,
  Lightbulb,
  Plug,
  Briefcase,
  GraduationCap,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`rv ${visible ? "rv--in" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}


/* ------------------------------------------------------------------ */
/* Data — sourced from Haseeb's CV                                     */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { label: "Home", id: "home", type: "section" },
  { label: "About", id: "about", type: "page" },
  { label: "Services", id: "services", type: "page" },
  { label: "Projects", id: "projects", type: "page" },
  { label: "Process", id: "process", type: "section" },
  { label: "Contact", id: "contact", type: "page" },
];

const ABOUT_CARDS = [
  { icon: Code2, title: "Frontend Implementation", desc: "React and custom interfaces built from approved designs", color: "#8B5CF6" },
  { icon: Layers, title: "WordPress & CMS", desc: "Custom websites, themes, builders, and content systems", color: "#3B82F6" },
  { icon: ShoppingBag, title: "E-commerce Development", desc: "Shopify, WooCommerce, products, and checkout experiences", color: "#F5A623" },
  { icon: Zap, title: "Responsive & Performance-Minded", desc: "Reliable experiences across modern devices and browsers", color: "#22C55E" },
];

const TECH = [
  { label: "React", slug: "react", color: "61DAFB", fallback: "R" },
  { label: "JavaScript", slug: "javascript", color: "F7DF1E", fallback: "JS", darkTile: true },
  { label: "HTML5", slug: "html5", color: "E34F26", fallback: "H5" },
  { label: "CSS3", slug: "css3", color: "1572B6", fallback: "C3" },
  { label: "WordPress", slug: "wordpress", color: "21759B", fallback: "W" },
  { label: "Shopify", slug: "shopify", color: "7AB55C", fallback: "S" },
  { label: "WooCommerce", slug: "woocommerce", color: "96588A", fallback: "WC" },
  { label: "Elementor", slug: "elementor", color: "92003B", fallback: "E" },
  { label: "Webflow", slug: "webflow", color: "146EF5", fallback: "W" },
  { label: "Wix", slug: "wix", color: "0C0C0C", fallback: "WIX" },
  { label: "Squarespace", slug: "squarespace", color: "111111", fallback: "SQ" },
  { label: "Git", slug: "git", color: "F05032", fallback: "G" },
  { label: "GitHub", slug: "github", color: "181717", fallback: "GH" },
  { label: "Vite", slug: "vite", color: "646CFF", fallback: "V" },
];

const TECH_GROUPS = [
  { title: "Frontend", desc: "Component-based, responsive interfaces", items: ["React", "JavaScript", "HTML5", "CSS3"] },
  { title: "CMS & E-commerce", desc: "Editable websites and online stores", items: ["WordPress", "Shopify", "WooCommerce", "Elementor"] },
  { title: "Website Platforms", desc: "Flexible visual-development platforms", items: ["Webflow", "Wix", "Squarespace"] },
  { title: "Workflow & Delivery", desc: "Version control and modern development tooling", items: ["Git", "GitHub", "Vite"] },
];

const HERO_TECH = ["React", "WordPress", "Shopify", "JavaScript", "WooCommerce"];

const FILTERS = ["All", "WordPress", "Shopify", "React", "Custom Sites"];

const PROJECTS = [
  {
    code: "WP",
    category: "WordPress",
    projectType: "Client Website",
    title: "Julien Solar Solutions",
    desc: "A responsive website for a solar solutions company, structured around clear services, trust, and lead generation.",
    highlight: "Service clarity · Lead generation · Mobile usability",
    stack: ["WordPress", "Elementor", "JavaScript", "Responsive UI"],
    badgeBg: "#21759B",
    visual: "solar",
    accent: "#F5A623",
    previewBg: "#12211B",
  },
  {
    code: "WP",
    category: "WordPress",
    projectType: "Client Website",
    title: "Straight Ahead Credit & Funding",
    desc: "A professional credit and funding website that turns complex services into a clear, conversion-focused experience.",
    highlight: "Trust building · Service hierarchy · Conversion flow",
    stack: ["WordPress", "Custom CSS", "Forms", "Responsive UI"],
    badgeBg: "#7C3AED",
    visual: "finance",
    accent: "#8B5CF6",
    previewBg: "#111A32",
  },
  {
    code: "CMS",
    category: "Custom Sites",
    projectType: "Content Website",
    title: "Holiday Weekly",
    desc: "A content-led holiday and travel experience designed for easy browsing, readable publishing, and responsive discovery.",
    highlight: "Content structure · Readability · Responsive publishing",
    stack: ["CMS", "HTML5", "CSS3", "JavaScript"],
    badgeBg: "#0F766E",
    visual: "editorial",
    accent: "#14B8A6",
    previewBg: "#13201F",
  },
  {
    code: "SH",
    category: "Shopify",
    projectType: "E-commerce Website",
    title: "Shopify Storefront Experience",
    desc: "A polished storefront focused on product discovery, responsive merchandising, and a smooth path from browsing to checkout.",
    highlight: "Product discovery · Mobile commerce · Checkout usability",
    stack: ["Shopify", "Liquid", "Product UX", "E-commerce"],
    badgeBg: "#7AB55C",
    visual: "commerce",
    accent: "#95BF47",
    previewBg: "#162116",
  },
  {
    code: "RX",
    category: "React",
    projectType: "Frontend Project",
    title: "React Frontend Experience",
    desc: "A component-based frontend project demonstrating reusable UI patterns, responsive behavior, and API-ready structure.",
    highlight: "Reusable components · Responsive UI · API-ready architecture",
    stack: ["React", "JavaScript", "CSS3", "Component UI"],
    badgeBg: "#2563EB",
    visual: "react",
    accent: "#61DAFB",
    previewBg: "#101B2C",
  },
];

const ACADEMIC_PROJECTS = [
  {
    icon: Database,
    color: "#8B5CF6",
    title: "School Management System",
    tag: "OOP / Software Engineering",
    desc: "Object-oriented desktop application for managing academic records, enrollment, and user roles.",
  },
  {
    icon: Lightbulb,
    color: "#F5A623",
    title: "Music Rhythm LED Flasher",
    tag: "Embedded Electronics",
    desc: "Audio-reactive LED circuit built around the 555 Timer IC, syncing light pulses to music rhythm.",
  },
  {
    icon: Plug,
    color: "#22C55E",
    title: "DC Buck Converter",
    tag: "Power Electronics",
    desc: "Step-down power converter design, built as coursework in basic electronic engineering.",
  },
];

const PROCESS = [
  { n: "01", title: "Discover", desc: "Understand the goals, users, content, and technical requirements.", icon: Compass, color: "#8B5CF6" },
  { n: "02", title: "Plan", desc: "Define the structure, user experience, technology, and implementation approach.", icon: Layout, color: "#F5A623" },
  { n: "03", title: "Build", desc: "Develop the experience with clean, responsive, and maintainable code.", icon: Code2, color: "#3B82F6" },
  { n: "04", title: "Refine", desc: "Test, optimize, improve performance, and prepare a polished final handoff.", icon: CheckCircle, color: "#22C55E" },
];

const SERVICES = [
  {
    icon: Layers,
    color: "#8B5CF6",
    title: "WordPress Website Development",
    desc: "Custom WordPress builds, theme customization, and plugin configuration for a site you can keep growing.",
    tags: ["WordPress", "Gutenberg", "Plugins"],
  },
  {
    icon: ShoppingBag,
    color: "#95BF47",
    title: "Shopify Store Development",
    desc: "Shopify storefronts built for clean product presentation and a smooth path to checkout.",
    tags: ["Shopify", "Liquid", "E-commerce"],
  },
  {
    icon: Layout,
    color: "#146EF5",
    title: "Website Builder Platforms",
    desc: "Fast, design-forward builds on Wix, Webflow, and Squarespace when speed and visual polish matter most.",
    tags: ["Wix", "Webflow", "Squarespace"],
  },
  {
    icon: Wrench,
    color: "#F5A623",
    title: "Custom Theme & Builder Customization",
    desc: "Elementor, WPBakery, Divi, and Gutenberg customization matched precisely to your brand and layout.",
    tags: ["Elementor", "WPBakery", "Divi"],
  },
  {
    icon: Code2,
    color: "#EC4899",
    title: "React & Front-End Development",
    desc: "Component-based React interfaces and custom HTML, CSS, and JavaScript for responsive experiences beyond page builders.",
    tags: ["React", "JavaScript", "HTML5 / CSS3"],
  },
  {
    icon: Smartphone,
    color: "#22C55E",
    title: "Website Optimization & Responsive Design",
    desc: "Performance tuning, cross-browser testing, and full mobile responsiveness for every build I ship.",
    tags: ["Performance", "Responsive", "Cross-Browser"],
  },
];

const WEB_SKILL_AREAS = [
  {
    number: "01",
    icon: Layers,
    color: "#8B5CF6",
    title: "WordPress Development",
    desc: "Custom WordPress builds, builder-based implementation, theme customization, and extendable CMS functionality.",
    wide: true,
    groups: [
      {
        title: "Page Builders",
        items: ["Elementor", "Elementor Pro", "WPBakery", "Divi Builder", "Gutenberg"],
      },
      {
        title: "Themes & Customization",
        items: [
          "WordPress Theme Customization",
          "Child Theme Customization",
          "Template Customization",
          "Theme Functionality Modifications",
          "BeTheme",
        ],
      },
      {
        title: "Custom WordPress Development",
        items: [
          "Custom WordPress Websites",
          "Custom Templates",
          "Custom Post Types",
          "Custom PHP Functionality",
          "Plugin Integrations",
          "API Integrations",
          "WooCommerce Customization",
        ],
      },
    ],
  },
  {
    number: "02",
    icon: Code2,
    color: "#EC4899",
    title: "Custom Development",
    desc: "Responsive, component-based interfaces developed with modern front-end technologies and clean custom code.",
    wide: true,
    groups: [
      {
        title: "Technologies",
        items: ["React.js", "JavaScript", "HTML5", "CSS3"],
      },
      {
        title: "Development Capabilities",
        items: [
          "Responsive Web Development",
          "Component-Based UI Development",
          "Interactive Web Interfaces",
          "API Integration",
          "Custom Frontend Development",
        ],
      },
    ],
  },
  {
    number: "03",
    icon: Layout,
    color: "#146EF5",
    title: "CMS & Website Builders",
    desc: "Professional websites built and customized on modern CMS and visual website-building platforms.",
    groups: [
      {
        title: "Platforms",
        items: ["Shopify", "Wix", "Webflow", "Squarespace"],
      },
    ],
  },
  {
    number: "04",
    icon: ShoppingBag,
    color: "#95BF47",
    title: "E-commerce Development",
    desc: "Storefront development and checkout experiences designed around clarity, usability, and reliable integrations.",
    groups: [
      {
        title: "Commerce Capabilities",
        items: [
          "WooCommerce",
          "Shopify",
          "Payment Gateway Integrations",
          "Stripe Integration",
          "Custom Product & Checkout Experiences",
        ],
      },
    ],
  },
];

const SUPPORTING_SKILLS = [
  "Website Optimization",
  "Responsive Design",
  "Problem Solving",
  "Communication",
  "Team Collaboration",
  "Quick Learner",
];

const LANGUAGES = ["English — Professional", "Urdu — Native"];

const EDUCATION = [
  { yr: "2020 — 2024", title: "Bachelor of Computer Engineering", org: "Sir Syed University of Engineering & Technology (SSUET), Karachi" },
  { yr: "2017 — 2019", title: "Higher Secondary Certificate — Pre-Engineering", org: "SAL College, Mirpurkhas" },
  { yr: "2015 — 2017", title: "Secondary School Certificate — Science", org: "The Lings School System, Mirpurkhas" },
];

const EXPERIENCE = [
  {
    yr: "2023 — Present",
    title: "Web Developer",
    org: "JTECH Solutions — Karachi, Pakistan",
    bullets: [
      "Develop and maintain responsive websites using WordPress and leading page builders.",
      "Customize themes, layouts, and plugins to match precise client requirements.",
      "Implement HTML, CSS, and JavaScript for custom functionality and UI enhancements.",
      "Ensure performance, cross-browser compatibility, and full mobile responsiveness.",
    ],
  },
  {
    yr: "2022 — Present",
    title: "Freelance Web Developer",
    org: "Independent — Remote",
    bullets: [
      "Delivered multiple projects across WordPress, Shopify, Wix, and Webflow.",
      "Built business websites, landing pages, and CMS-driven solutions end-to-end.",
      "Partnered with clients to translate requirements into optimized web solutions.",
      "Prioritized clean design, intuitive UX, and SEO-friendly structure.",
    ],
  },
];

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "haseebmujeeb360@gmail.com", href: "mailto:haseebmujeeb360@gmail.com" },
  { icon: Phone, label: "Phone", value: "+92 335 3832477", href: "tel:+923353832477" },
  { icon: MapPin, label: "Location", value: "Karachi, Pakistan", href: null },
];


/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */
function Eyebrow({ children }) {
  return <span className="eyebrow2">{children}</span>;
}

function TechBadge({ t, compact = false }) {
  const logoUrl = `https://cdn.simpleicons.org/${t.slug}/${t.color}`;
  return (
    <div className={`tech-badge ${compact ? "tech-badge--compact" : ""}`} title={t.label}>
      <span className={`tech-badge__logo ${t.darkTile ? "tech-badge__logo--dark" : ""}`}>
        <img
          src={logoUrl}
          alt={`${t.label} logo`}
          loading={compact ? "eager" : "lazy"}
          onError={(event) => {
            event.currentTarget.style.display = "none";
            event.currentTarget.parentElement?.classList.add("tech-badge__logo--fallback");
          }}
        />
        <b>{t.fallback}</b>
      </span>
      {!compact && <span className="tech-badge__label">{t.label}</span>}
    </div>
  );
}


function TechPill({ t }) {
  return (
    <div className="tech-pill">
      <TechBadge t={t} compact />
      <span>{t.label}</span>
    </div>
  );
}

function ProjectPreview({ project }) {
  const commerce = project.visual === "commerce";
  const dashboard = project.visual === "react" || project.visual === "finance";

  return (
    <div
      className={`project-preview project-preview--${project.visual}`}
      style={{ "--project-accent": project.accent, "--project-bg": project.previewBg }}
      aria-label={`${project.title} website preview`}
    >
      <div className="project-preview__browser">
        <span className="project-preview__dots"><i /><i /><i /></span>
        <span className="project-preview__url">project-preview.dev</span>
      </div>
      <div className="project-preview__site">
        <div className="project-preview__nav">
          <span className="project-preview__brand" />
          <span className="project-preview__navlinks"><i /><i /><i /></span>
        </div>

        {commerce ? (
          <div className="project-preview__commerce">
            <div className="project-preview__commerce-copy">
              <span className="project-preview__kicker" />
              <span className="project-preview__headline" />
              <span className="project-preview__headline project-preview__headline--short" />
              <span className="project-preview__button" />
            </div>
            <div className="project-preview__products">
              <span /><span /><span />
            </div>
          </div>
        ) : dashboard ? (
          <div className="project-preview__dashboard">
            <div className="project-preview__sidebar"><i /><i /><i /><i /></div>
            <div className="project-preview__dashboard-main">
              <span className="project-preview__headline" />
              <div className="project-preview__metric-row"><i /><i /><i /></div>
              <div className="project-preview__chart"><span /></div>
            </div>
          </div>
        ) : (
          <div className="project-preview__editorial">
            <div className="project-preview__editorial-copy">
              <span className="project-preview__kicker" />
              <span className="project-preview__headline" />
              <span className="project-preview__headline project-preview__headline--short" />
              <span className="project-preview__textline" />
              <span className="project-preview__textline project-preview__textline--short" />
              <span className="project-preview__button" />
            </div>
            <div className="project-preview__art"><span /><i /><b /></div>
          </div>
        )}
      </div>
    </div>
  );
}

function Masthead({ crumb, title, subtitle }) {
  return (
    <section className="masthead">
      <div className="wrap">
        <Reveal className="crumb">
          <span>Haseeb.dev</span> <ChevronRight size={12} /> <b>{crumb}</b>
        </Reveal>
        <Reveal delay={60}><h1>{title}</h1></Reveal>
        <Reveal delay={110}><p>{subtitle}</p></Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Main App                                                             */
/* ------------------------------------------------------------------ */
export default function App() {
  const [page, setPage] = useState("home"); // home | about | services | projects | contact
  const [pendingScroll, setPendingScroll] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [website, setWebsite] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth >= 960) setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [menuOpen]);


  useEffect(() => {
    if (page === "home" && pendingScroll) {
      const t = setTimeout(() => {
        const el = document.getElementById(pendingScroll);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        setPendingScroll(null);
      }, 80);
      return () => clearTimeout(t);
    }
  }, [page, pendingScroll]);

  const navigateTo = useCallback(
    (id, type) => {
      setMenuOpen(false);
      if (type === "page") {
        setPage(id);
        window.scrollTo(0, 0);
      } else if (page !== "home") {
        setPendingScroll(id);
        setPage("home");
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [page]
  );


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (website.trim()) return; // Honeypot: silently ignore automated submissions.

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFormError("Please fill in your name, email and message.");
      setFormSent(false);
      return;
    }

    setIsSubmitting(true);
    setFormError("");
    setFormSent(false);

    try {
      const response = await fetch("https://formsubmit.co/ajax/haseebmujeeb360@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim() || "Portfolio website enquiry",
          message: form.message.trim(),
          _subject: `New portfolio enquiry from ${form.name.trim()}`,
          _replyto: form.email.trim(),
          _template: "table",
          _captcha: "false",
          _url: typeof window !== "undefined" ? window.location.href : "Portfolio contact form",
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false || result.success === "false") {
        throw new Error(result.message || "Unable to send your message right now.");
      }

      setFormSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setWebsite("");
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please email me directly at haseebmujeeb360@gmail.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProjects = activeFilter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="ds">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');

        :root{
          --bg-dark:#0A0A12;
          --bg-dark-2:#0D0D17;
          --bg-darkest:#07070C;
          --panel-dark:#12121D;
          --line-dark:rgba(255,255,255,0.09);
          --bg-light:#F5F5FA;
          --bg-white:#FFFFFF;
          --line-light:rgba(20,20,35,0.08);
          --ink:#0E0E16;
          --gray-on-dark:#9CA0AE;
          --gray-on-dark-2:#6D7180;
          --gray-on-light:#6B7080;
          --purple:#8B5CF6;
          --purple-2:#7C3AED;
          --orange:#F5A623;
          --pink:#EC4899;
          --blue:#3B82F6;
          --green:#22C55E;
          --grad: linear-gradient(95deg, #8B5CF6 0%, #C875E8 45%, #F5A623 100%);
          --font: 'Plus Jakarta Sans', sans-serif;
          --mono: 'JetBrains Mono', monospace;
        }
        .ds *{ box-sizing:border-box; }
        .ds{ font-family:var(--font); background:var(--bg-white); color:var(--ink); overflow-x:hidden; }
        .ds img{ max-width:100%; display:block; }
        .ds a{ color:inherit; text-decoration:none; cursor:pointer; }
        .ds button{ font-family:inherit; cursor:pointer; }
        ::selection{ background:var(--purple); color:#fff; }

        .wrap{ max-width:1240px; margin:0 auto; padding:0 24px; }
        @media (min-width:900px){ .wrap{ padding:0 40px; } }

        .rv{ opacity:0; transform:translateY(24px); transition:opacity .75s cubic-bezier(.16,.8,.24,1), transform .75s cubic-bezier(.16,.8,.24,1); }
        .rv--in{ opacity:1; transform:translateY(0); }
        @media (prefers-reduced-motion:reduce){ .rv{ opacity:1; transform:none; transition:none; } }

        .eyebrow2{
          font-family:var(--mono); font-size:12px; font-weight:600; letter-spacing:.03em;
          background:linear-gradient(95deg, var(--purple), var(--pink));
          -webkit-background-clip:text; background-clip:text; color:transparent;
          display:inline-block; margin-bottom:12px;
        }

        /* ============ NAV ============ */
        .navbar{ position:fixed; top:0; left:0; right:0; z-index:200; padding:18px 0; transition:all .35s ease; }
        .navbar.scrolled{ background:rgba(10,10,18,0.82); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); border-bottom:1px solid var(--line-dark); padding:12px 0; }
        .navbar__inner{ display:flex; align-items:center; justify-content:space-between; }
        .logo{ display:flex; align-items:center; gap:9px; }
        .logo__mark{ width:32px; height:32px; border-radius:9px; background:var(--grad); position:relative; flex:none; }
        .logo__mark::after{ content:''; position:absolute; inset:9px; background:#0A0A12; border-radius:4px; }
        .logo__text{ font-size:17px; font-weight:800; color:#fff; letter-spacing:-0.01em; }
        .logo__text span{ color:var(--orange); }

        .nav-links{ display:none; gap:30px; align-items:center; }
        @media (min-width:960px){ .nav-links{ display:flex; } }
        .nav-links button{ background:none; border:none; font-size:13.5px; font-weight:500; color:var(--gray-on-dark); position:relative; padding:4px 0; transition:color .25s ease; }
        .nav-links button.active{ color:#fff; }
        .nav-links button.active::after{ content:''; position:absolute; left:0; right:0; bottom:-14px; height:2px; background:var(--orange); border-radius:2px; }
        .nav-links button:hover{ color:#fff; }

        .nav-cta{ display:none; background:#fff; color:#0A0A12; font-size:13px; font-weight:700; padding:11px 20px; border-radius:100px; border:none; align-items:center; gap:7px; transition:transform .25s ease; }
        @media (min-width:960px){ .nav-cta{ display:inline-flex; } }
        .nav-cta:hover{ transform:translateY(-2px); }

        .nav-burger{ display:flex; background:none; border:1px solid var(--line-dark); color:#fff; border-radius:8px; padding:8px; position:relative; z-index:260; }
        @media (min-width:960px){ .nav-burger{ display:none; } }

        .mmenu{ position:fixed; inset:0; z-index:250; background:var(--bg-darkest); padding:96px 28px 40px; display:flex; flex-direction:column; transform:translateX(100%); transition:transform .45s cubic-bezier(.16,.8,.24,1); }
        .mmenu.open{ transform:translateX(0); }
        .mmenu-close{ position:absolute; top:20px; right:20px; border:1px solid var(--line-dark); background:none; color:#fff; border-radius:8px; padding:8px; }
        .mmenu button.mlink{ background:none; border:none; text-align:left; font-size:26px; font-weight:700; color:#fff; padding:14px 0; border-bottom:1px solid var(--line-dark); }

        /* ============ MASTHEAD (inner pages) ============ */
        .masthead{
          background:
            radial-gradient(circle at 80% 10%, rgba(139,92,246,0.26), transparent 45%),
            radial-gradient(circle at 10% 90%, rgba(245,166,35,0.12), transparent 40%),
            var(--bg-dark);
          color:#fff; padding:150px 0 60px;
        }
        .masthead .crumb{ display:flex; align-items:center; gap:6px; font-size:12px; color:var(--gray-on-dark-2); margin-bottom:16px; }
        .masthead .crumb b{ color:var(--orange); font-weight:600; }
        .masthead h1{ font-size:clamp(28px,4.4vw,42px); font-weight:800; letter-spacing:-0.02em; margin:0 0 12px; }
        .masthead p{ font-size:14.5px; color:var(--gray-on-dark); max-width:600px; margin:0; line-height:1.75; }

        /* ============ HERO ============ */
        .hero{
          background:
            radial-gradient(circle at 78% 18%, rgba(139,92,246,0.28), transparent 42%),
            radial-gradient(circle at 12% 75%, rgba(245,166,35,0.14), transparent 40%),
            var(--bg-dark);
          color:#fff; padding:150px 0 70px; position:relative;
        }
        .hero__grid{ display:grid; grid-template-columns:1fr; gap:60px; align-items:center; }
        @media (min-width:980px){ .hero__grid{ grid-template-columns:.88fr 1.12fr; gap:52px; } }

        .hi-badge{ display:inline-flex; align-items:center; gap:8px; font-size:13px; color:var(--gray-on-dark); border:1px solid var(--line-dark); padding:6px 14px 6px 10px; border-radius:100px; margin-bottom:22px; }

        .hero h1{ font-size:clamp(34px,5.2vw,52px); font-weight:800; line-height:1.1; letter-spacing:-0.035em; margin:0 0 22px; max-width:650px; }
        .hero h1 .grad-text{ background:linear-gradient(95deg, var(--orange), #F06AA8); -webkit-background-clip:text; background-clip:text; color:transparent; }

        .hero p.lead{ font-size:15.5px; color:var(--gray-on-dark); max-width:610px; line-height:1.78; margin:0 0 32px; }
        .hero p.lead strong{ color:#fff; font-weight:700; }

        .btn-row{ display:flex; flex-wrap:wrap; gap:14px; margin-bottom:44px; }
        .btn{ font-size:13.5px; font-weight:700; padding:14px 24px; border-radius:100px; display:inline-flex; align-items:center; gap:8px; border:1px solid transparent; transition:transform .3s cubic-bezier(.16,.8,.24,1), box-shadow .3s ease; }
        .btn-grad{ background:var(--grad); color:#fff; }
        .btn-grad:hover{ transform:translateY(-3px); box-shadow:0 16px 32px -14px rgba(139,92,246,0.55); }
        .btn-outline-dark{ background:transparent; color:#fff; border-color:var(--line-dark); }
        .btn-outline-dark:hover{ transform:translateY(-3px); border-color:#fff; }
        .btn-outline-light{ background:transparent; color:var(--ink); border-color:var(--line-light); }
        .btn-outline-light:hover{ transform:translateY(-3px); border-color:var(--ink); }
        .btn-white{ background:#fff; color:#0A0A12; }
        .btn-white:hover{ transform:translateY(-3px); box-shadow:0 16px 32px -16px rgba(0,0,0,0.4); }

        .stats-row{ display:flex; gap:34px; flex-wrap:wrap; }
        .stat-item{ display:flex; align-items:center; gap:10px; }
        .stat-ic{ width:38px; height:38px; border-radius:11px; display:flex; align-items:center; justify-content:center; flex:none; }
        .stat-item b{ display:block; font-size:19px; font-weight:800; }
        .stat-item span{ font-size:11px; color:var(--gray-on-dark); }

        .hero__visual{ position:relative; width:100%; max-width:560px; margin-left:auto; }
        .hero-showcase{
          background:linear-gradient(145deg,rgba(18,18,29,.98),rgba(10,10,18,.98));
          border:1px solid var(--line-dark); border-radius:22px; overflow:hidden;
          box-shadow:0 44px 100px -38px rgba(0,0,0,.72); min-height:0;
          position:relative; isolation:isolate;
        }
        .hero-showcase::before{
          content:''; position:absolute; width:220px; height:220px; border-radius:50%; right:-86px; top:-110px;
          background:radial-gradient(circle,rgba(139,92,246,.28),transparent 70%); z-index:-1;
        }
        .hero-showcase__bar{ min-height:52px; padding:0 18px; display:flex; align-items:center; justify-content:space-between; gap:14px; border-bottom:1px solid var(--line-dark); }
        .hero-showcase__dots{ display:flex; gap:6px; }
        .hero-showcase__dots i{ width:9px; height:9px; border-radius:50%; }
        .hero-showcase__path{ font-family:var(--mono); font-size:9px; color:var(--gray-on-dark-2); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .hero-showcase__status{ display:flex; align-items:center; gap:7px; font-size:9.5px; font-weight:700; color:#D8FBE5; white-space:nowrap; }
        .hero-showcase__status::before{ content:''; width:7px; height:7px; border-radius:50%; background:var(--green); box-shadow:0 0 0 5px rgba(34,197,94,.12); }
        .hero-showcase__body{ display:grid; grid-template-columns:.88fr 1.12fr; gap:18px; padding:24px; align-items:start; }
        .hero-showcase__copy{ display:flex; flex-direction:column; justify-content:center; padding-top:6px; }
        .hero-showcase__eyebrow{ font-family:var(--mono); font-size:9.5px; font-weight:700; color:var(--orange); text-transform:uppercase; letter-spacing:.08em; margin-bottom:10px; }
        .hero-showcase__copy h4{ font-size:20px; line-height:1.24; letter-spacing:-.02em; margin:0 0 12px; max-width:240px; }
        .hero-showcase__copy p{ font-size:12px; color:var(--gray-on-dark); line-height:1.72; margin:0 0 16px; max-width:250px; }
        .hero-showcase__services{ display:flex; flex-wrap:wrap; gap:7px; }
        .hero-showcase__services span{ font-size:9px; font-weight:700; color:#D8D9E2; border:1px solid var(--line-dark); background:rgba(255,255,255,.04); padding:6px 9px; border-radius:100px; }
        .hero-showcase__stack{ display:flex; flex-direction:column; gap:12px; }
        .hero-code-panel{
          background:linear-gradient(180deg,rgba(16,16,28,.98),rgba(11,11,20,.98)); border:1px solid rgba(255,255,255,.06); border-radius:16px;
          padding:14px 15px 16px; box-shadow:0 22px 54px -30px rgba(0,0,0,.68);
        }
        .hero-code-panel__top{ display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:12px; }
        .hero-code-panel__title{ font-size:9px; font-family:var(--mono); color:var(--gray-on-dark-2); letter-spacing:.08em; text-transform:uppercase; }
        .hero-code-panel__label{ font-size:9px; font-weight:700; color:#D8FBE5; padding:5px 8px; border-radius:100px; border:1px solid rgba(34,197,94,.26); background:rgba(34,197,94,.09); }
        .hero-code-panel__lines{ display:grid; gap:8px; }
        .hero-code-line{ display:flex; align-items:center; gap:10px; }
        .hero-code-line__no{ font-family:var(--mono); font-size:10px; color:rgba(152,160,183,.72); width:16px; flex:none; }
        .hero-code-line__bar{ height:8px; border-radius:100px; background:linear-gradient(90deg,rgba(255,255,255,.16),rgba(255,255,255,.07)); position:relative; overflow:hidden; flex:1; }
        .hero-code-line__bar::after{ content:''; position:absolute; inset:0 auto 0 0; width:var(--line-width); background:linear-gradient(90deg,var(--line-start),var(--line-end)); border-radius:100px; }
        .hero-code-panel__footer{ display:flex; gap:8px; flex-wrap:wrap; margin-top:14px; }
        .hero-code-panel__footer span{ font-size:9px; font-weight:700; color:#C7CAD9; border:1px solid rgba(255,255,255,.07); background:rgba(255,255,255,.03); border-radius:100px; padding:6px 8px; }
        .hero-mini-grid{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
        .hero-mini-card{ border:1px solid rgba(255,255,255,.06); background:rgba(255,255,255,.03); border-radius:14px; padding:13px 12px; min-height:88px; }
        .hero-mini-card__icon{ width:32px; height:32px; border-radius:10px; display:flex; align-items:center; justify-content:center; margin-bottom:10px; }
        .hero-mini-card b{ display:block; font-size:13px; margin-bottom:4px; }
        .hero-mini-card p{ margin:0; font-size:10.5px; line-height:1.55; color:var(--gray-on-dark); }
        .hero-showcase__footer{ border-top:1px solid var(--line-dark); padding:14px 18px; display:flex; align-items:center; justify-content:space-between; gap:16px; }
        .hero-showcase__footer-copy{ font-size:10px; color:var(--gray-on-dark); }
        .hero-showcase__brands{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; justify-content:flex-end; }
        .hero-showcase__brands .tech-badge{ width:30px; height:30px; min-height:0; padding:0; border-radius:9px; border-color:var(--line-dark); background:rgba(255,255,255,.05); }
        .hero-showcase__brands .tech-badge__logo{ width:18px; height:18px; border-radius:5px; background:#fff; }
        .hero-showcase__brands .tech-badge__logo img{ width:12px; height:12px; }
        @media (max-width:1180px){
          .hero__visual{ max-width:520px; }
          .hero-showcase__body{ grid-template-columns:1fr; }
          .hero-showcase__copy h4,.hero-showcase__copy p{ max-width:none; }
        }
        @media (max-width:560px){
          .hero__visual{ max-width:none; }
          .hero-showcase{ border-radius:18px; }
          .hero-showcase__path{ display:none; }
          .hero-showcase__bar{ padding:0 14px; }
          .hero-showcase__body{ padding:18px; gap:16px; }
          .hero-showcase__copy h4{ font-size:18px; }
          .hero-mini-grid{ grid-template-columns:1fr; }
          .hero-showcase__footer{ align-items:flex-start; flex-direction:column; }
          .hero-showcase__brands{ justify-content:flex-start; }
        }

        .scroll-cue{ display:none; text-align:center; margin-top:56px; color:var(--gray-on-dark-2); font-size:11px; }
        @media (min-width:640px){ .scroll-cue{ display:block; } }
        .scroll-cue .mouse{ width:20px; height:32px; border:2px solid var(--gray-on-dark-2); border-radius:12px; margin:0 auto 8px; position:relative; }
        .scroll-cue .mouse::after{ content:''; position:absolute; top:6px; left:50%; width:3px; height:6px; background:var(--gray-on-dark-2); border-radius:2px; transform:translateX(-50%); animation:scrolldown 1.6s ease infinite; }
        @keyframes scrolldown{ 0%{ opacity:1; transform:translate(-50%,0);} 100%{ opacity:0; transform:translate(-50%,8px);} }

        /* ============ SECTION shared ============ */
        .sec{ padding:96px 0; }
        .sec-head{ margin-bottom:48px; max-width:640px; }
        .sec-head h2{ font-size:clamp(26px,3.6vw,38px); font-weight:800; letter-spacing:-0.02em; line-height:1.2; margin:0; }
        .sec-head p{ font-size:14.5px; color:var(--gray-on-light); margin-top:12px; line-height:1.7; }
        .sec-head--white p{ color:var(--gray-on-dark); }

        /* ============ ABOUT ============ */
        .about{ background:var(--bg-light); }
        .about__grid{ display:grid; grid-template-columns:1fr; gap:44px; margin-bottom:56px; }
        @media (min-width:960px){ .about__grid{ grid-template-columns:0.95fr 1.05fr; gap:56px; align-items:center; } }
        .about h2{ font-size:clamp(26px,3.6vw,36px); font-weight:800; line-height:1.28; letter-spacing:-0.02em; margin:0 0 16px; }
        .about h2 .link-word{ color:var(--purple-2); text-decoration:underline; text-decoration-color:rgba(124,58,237,0.35); text-underline-offset:4px; }
        .about-copy p{ font-size:14.5px; color:var(--gray-on-light); line-height:1.8; margin:0 0 26px; max-width:480px; }

        .card-grid2{ display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .about-card{ background:#fff; border:1px solid var(--line-light); border-radius:16px; padding:22px 20px; transition:transform .35s cubic-bezier(.16,.8,.24,1), box-shadow .35s ease; }
        .about-card:hover{ transform:translateY(-6px); box-shadow:0 26px 48px -26px rgba(20,20,35,0.22); }
        .about-card__ic{ width:42px; height:42px; border-radius:11px; display:flex; align-items:center; justify-content:center; margin-bottom:14px; }
        .about-card h4{ font-size:14px; font-weight:700; margin:0 0 4px; }
        .about-card p{ font-size:12px; color:var(--gray-on-light); margin:0; }

        .tech-row{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
        @media (min-width:560px){ .tech-row{ grid-template-columns:repeat(4,minmax(0,1fr)); } }
        @media (min-width:980px){ .tech-row{ grid-template-columns:repeat(8,minmax(0,1fr)); } }
        .tech-badge{ min-height:104px; background:#fff; border:1px solid var(--line-light); border-radius:15px; padding:15px 10px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; transition:transform .3s ease, box-shadow .3s ease, border-color .3s ease; }
        .tech-badge:hover{ transform:translateY(-5px); border-color:rgba(124,58,237,.2); box-shadow:0 20px 34px -22px rgba(20,20,35,0.28); }
        .tech-badge__logo{ width:45px; height:45px; border-radius:13px; background:var(--bg-light); display:flex; align-items:center; justify-content:center; position:relative; }
        .tech-badge__logo--dark{ background:#111; }
        .tech-badge__logo img{ width:27px; height:27px; object-fit:contain; }
        .tech-badge__logo b{ display:none; font-size:10px; color:var(--ink); }
        .tech-badge__logo--dark b{ color:#fff; }
        .tech-badge__logo--fallback img{ display:none; }
        .tech-badge__logo--fallback b{ display:block; }
        .tech-badge__label{ font-size:10.5px; font-weight:700; color:var(--gray-on-light); text-align:center; }
        .tech-badge--compact{ min-height:0; width:32px; height:32px; padding:0; border-radius:9px; gap:0; }

        .stack-intro{ display:flex; align-items:end; justify-content:space-between; gap:24px; margin:10px 0 22px; }
        .stack-intro h3{ font-size:18px; font-weight:800; margin:0; }
        .stack-intro p{ font-size:12.5px; color:var(--gray-on-light); margin:5px 0 0; }
        .tech-groups{ display:grid; grid-template-columns:1fr; gap:14px; }
        @media (min-width:720px){ .tech-groups{ grid-template-columns:1fr 1fr; } }
        .tech-group{ background:#fff; border:1px solid var(--line-light); border-radius:16px; padding:20px; }
        .tech-group__head{ margin-bottom:14px; }
        .tech-group__head h4{ font-size:13.5px; font-weight:800; margin:0 0 4px; }
        .tech-group__head p{ font-size:11.5px; color:var(--gray-on-light); line-height:1.55; margin:0; }
        .tech-group__items{ display:flex; flex-wrap:wrap; gap:9px; }
        .tech-pill{ display:inline-flex; align-items:center; gap:8px; min-height:40px; padding:4px 11px 4px 5px; border:1px solid var(--line-light); border-radius:11px; background:var(--bg-light); transition:transform .25s ease, border-color .25s ease, background .25s ease; }
        .tech-pill:hover{ transform:translateY(-2px); border-color:rgba(124,58,237,.22); background:#fff; }
        .tech-pill .tech-badge{ width:30px; height:30px; min-height:0; padding:0; border:none; border-radius:8px; background:#fff; box-shadow:none; }
        .tech-pill .tech-badge:hover{ transform:none; box-shadow:none; }
        .tech-pill .tech-badge__logo{ width:23px; height:23px; border-radius:6px; }
        .tech-pill .tech-badge__logo img{ width:15px; height:15px; }
        .tech-pill > span{ font-size:10.5px; font-weight:700; color:#3C3E49; }

        /* ============ INFO GRID (about page) ============ */
        .info-grid{ display:grid; grid-template-columns:1fr 1fr; gap:20px 32px; margin:26px 0 30px; max-width:460px; }
        .info-grid .label{ font-size:10.5px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:var(--gray-on-light); margin-bottom:5px; }
        .info-grid .value{ font-size:14px; font-weight:700; }

        /* ============ WEB DEVELOPMENT SKILLS ============ */
        .web-skills-grid{ display:grid; grid-template-columns:1fr; gap:18px; }
        @media (min-width:900px){ .web-skills-grid{ grid-template-columns:1fr 1fr; } }
        .skill-domain{
          border:1px solid var(--line-light); border-radius:18px; padding:26px; background:#fff;
          position:relative; overflow:hidden; transition:transform .35s cubic-bezier(.16,.8,.24,1), box-shadow .35s ease;
        }
        .skill-domain::before{ content:''; position:absolute; top:0; left:0; right:0; height:3px; background:var(--domain-color); }
        .skill-domain:hover{ transform:translateY(-5px); box-shadow:0 28px 55px -34px rgba(20,20,35,0.28); }
        @media (min-width:900px){ .skill-domain--wide{ grid-column:1 / -1; } }
        .skill-domain__head{ display:grid; grid-template-columns:auto 1fr auto; gap:14px; align-items:start; margin-bottom:24px; }
        .skill-domain__icon{ width:46px; height:46px; border-radius:13px; display:flex; align-items:center; justify-content:center; flex:none; }
        .skill-domain__title h3{ font-size:17px; font-weight:800; margin:0 0 7px; line-height:1.3; }
        .skill-domain__title p{ font-size:12.5px; color:var(--gray-on-light); line-height:1.7; margin:0; max-width:680px; }
        .skill-domain__number{ font-family:var(--mono); font-size:11px; font-weight:700; color:var(--domain-color); padding-top:4px; }
        .skill-domain__groups{ display:grid; grid-template-columns:1fr; gap:14px; }
        @media (min-width:680px){ .skill-domain--wide .skill-domain__groups{ grid-template-columns:repeat(2,minmax(0,1fr)); } }
        @media (min-width:1040px){ .skill-domain--wordpress .skill-domain__groups{ grid-template-columns:repeat(3,minmax(0,1fr)); } }
        .skill-subgroup{ background:var(--bg-light); border:1px solid var(--line-light); border-radius:14px; padding:18px; }
        .skill-subgroup h4{ font-size:12px; font-weight:800; letter-spacing:.01em; margin:0 0 12px; color:var(--ink); }
        .skill-subgroup__items{ display:flex; flex-wrap:wrap; gap:7px; }
        .skill-subgroup__items span{ font-size:10.5px; font-weight:600; line-height:1.35; color:var(--gray-on-light); background:#fff; border:1px solid var(--line-light); padding:6px 9px; border-radius:8px; }
        .skill-meta{ display:grid; grid-template-columns:1fr; gap:14px; margin-top:18px; }
        @media (min-width:760px){ .skill-meta{ grid-template-columns:1.5fr .5fr; } }
        .skill-meta__item{ border:1px solid var(--line-light); border-radius:14px; padding:18px 20px; background:var(--bg-light); }
        .skill-meta__item h4{ font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:.06em; margin:0 0 10px; color:var(--gray-on-light); }
        .skill-meta__tags{ display:flex; flex-wrap:wrap; gap:7px; }
        .skill-meta__tags span{ font-size:10.5px; font-weight:600; background:#fff; border:1px solid var(--line-light); border-radius:8px; padding:5px 9px; }
        @media (max-width:520px){
          .skill-domain{ padding:22px 18px; }
          .skill-domain__head{ grid-template-columns:auto 1fr; }
          .skill-domain__number{ display:none; }
        }

        /* ============ TIMELINE (education / experience) ============ */
        .timeline{ position:relative; max-width:760px; }
        .timeline::before{ content:''; position:absolute; left:7px; top:6px; bottom:6px; width:1px; background:var(--line-light); }
        .t-item{ position:relative; padding-left:34px; padding-bottom:36px; }
        .t-item:last-child{ padding-bottom:0; }
        .t-item::before{ content:''; position:absolute; left:0; top:4px; width:15px; height:15px; border-radius:50%; background:#fff; border:2px solid var(--purple-2); }
        .t-item .yr{ font-family:var(--mono); font-size:11px; color:var(--purple-2); font-weight:600; margin-bottom:6px; display:block; }
        .t-item h4{ font-size:16.5px; font-weight:800; margin:0 0 3px; }
        .t-item .org{ font-size:12.5px; color:var(--gray-on-light); margin-bottom:12px; }
        .t-item ul{ margin:0; padding-left:18px; }
        .t-item ul li{ font-size:13px; color:var(--gray-on-light); line-height:1.8; margin-bottom:5px; }

        .subhead{ font-size:19px; font-weight:800; margin:0 0 26px; display:flex; align-items:center; gap:10px; }

        /* ============ PROJECTS ============ */
        .projects{ background:#fff; }
        .filter-row{ display:flex; flex-wrap:wrap; gap:10px; margin-bottom:40px; }
        .filter-pill{ font-size:12.5px; font-weight:600; padding:10px 18px; border-radius:100px; border:1px solid var(--line-light); background:#fff; color:var(--gray-on-light); transition:all .3s ease; }
        .filter-pill.active{ background:var(--purple-2); color:#fff; border-color:var(--purple-2); }
        .filter-pill:hover:not(.active){ border-color:var(--purple-2); color:var(--purple-2); }

        .proj-grid2{ display:grid; grid-template-columns:1fr; gap:26px; margin-bottom:44px; }
        @media (min-width:680px){ .proj-grid2{ grid-template-columns:1fr 1fr; } }
        @media (min-width:1020px){ .proj-grid2{ grid-template-columns:1fr 1fr 1fr; } }

        .pcard{ border-radius:18px; overflow:hidden; border:1px solid var(--line-light); background:#fff; transition:transform .4s cubic-bezier(.16,.8,.24,1), box-shadow .4s ease; }
        .pcard:hover{ transform:translateY(-8px); box-shadow:0 40px 70px -32px rgba(20,20,35,0.28); }
        .pcard__img-wrap{ position:relative; height:220px; overflow:hidden; background:#10111A; padding:14px; }
        .pcard__badge{ position:absolute; left:18px; bottom:-17px; min-width:42px; height:42px; padding:0 9px; border-radius:11px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:10px; font-weight:800; box-shadow:0 12px 24px -9px rgba(0,0,0,0.45); z-index:4; }
        .pcard__body{ padding:29px 20px 22px; }
        .pcard__eyebrow{ font-family:var(--mono); font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:var(--purple-2); margin-bottom:7px; }
        .pcard__body h3{ font-size:16px; font-weight:800; margin:0 0 8px; line-height:1.35; }
        .pcard__body p{ font-size:12.5px; color:var(--gray-on-light); margin:0 0 13px; line-height:1.68; }
        .pcard__highlight{ font-size:10.5px; color:#3B3D48; border-left:2px solid var(--purple-2); padding-left:9px; margin:0 0 14px; line-height:1.55; }
        .pcard__stack{ display:flex; flex-wrap:wrap; gap:6px; }
        .pcard__stack span{ font-size:9.5px; font-weight:650; color:var(--gray-on-light); border:1px solid var(--line-light); padding:4px 8px; border-radius:7px; background:var(--bg-light); }

        .project-preview{ width:100%; height:100%; border-radius:13px; overflow:hidden; background:var(--project-bg); border:1px solid rgba(255,255,255,.1); box-shadow:0 24px 46px -28px rgba(0,0,0,.8); transition:transform .55s cubic-bezier(.16,.8,.24,1); }
        .pcard:hover .project-preview{ transform:scale(1.025); }
        .project-preview__browser{ height:27px; display:flex; align-items:center; justify-content:space-between; padding:0 10px; background:rgba(6,7,12,.7); border-bottom:1px solid rgba(255,255,255,.08); }
        .project-preview__dots{ display:flex; gap:4px; }
        .project-preview__dots i{ width:5px; height:5px; border-radius:50%; background:#FF5F57; }
        .project-preview__dots i:nth-child(2){ background:#FEBC2E; }
        .project-preview__dots i:nth-child(3){ background:#28C840; }
        .project-preview__url{ font-family:var(--mono); font-size:7px; color:rgba(255,255,255,.38); }
        .project-preview__site{ height:calc(100% - 27px); padding:12px; background:linear-gradient(145deg,rgba(255,255,255,.05),transparent 50%); }
        .project-preview__nav{ display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:12px; }
        .project-preview__brand{ width:44px; height:6px; border-radius:20px; background:var(--project-accent); }
        .project-preview__navlinks{ display:flex; gap:4px; }
        .project-preview__navlinks i{ width:15px; height:3px; border-radius:9px; background:rgba(255,255,255,.25); }
        .project-preview__editorial,.project-preview__commerce{ height:calc(100% - 18px); display:grid; grid-template-columns:1.02fr .98fr; gap:12px; align-items:center; }
        .project-preview__editorial-copy,.project-preview__commerce-copy{ display:flex; flex-direction:column; }
        .project-preview__kicker{ width:38px; height:4px; border-radius:10px; background:var(--project-accent); margin-bottom:8px; opacity:.9; }
        .project-preview__headline{ width:88%; height:8px; border-radius:10px; background:#fff; margin-bottom:6px; }
        .project-preview__headline--short{ width:62%; opacity:.78; }
        .project-preview__textline{ width:92%; height:4px; border-radius:10px; background:rgba(255,255,255,.25); margin-top:7px; }
        .project-preview__textline--short{ width:66%; margin-top:5px; }
        .project-preview__button{ width:48px; height:15px; border-radius:100px; background:var(--project-accent); margin-top:13px; }
        .project-preview__art{ min-height:112px; border-radius:12px; background:linear-gradient(145deg,var(--project-accent),rgba(255,255,255,.08)); position:relative; overflow:hidden; }
        .project-preview__art span{ position:absolute; width:82px; height:82px; border-radius:50%; right:-16px; top:-20px; background:rgba(255,255,255,.22); }
        .project-preview__art i{ position:absolute; width:58px; height:77px; border-radius:10px; left:14px; bottom:-18px; background:rgba(10,10,18,.48); transform:rotate(-7deg); }
        .project-preview__art b{ position:absolute; width:34px; height:34px; border-radius:9px; right:17px; bottom:16px; background:rgba(255,255,255,.78); }
        .project-preview__products{ display:grid; grid-template-columns:repeat(2,1fr); gap:7px; }
        .project-preview__products span{ height:55px; border-radius:10px; background:linear-gradient(145deg,rgba(255,255,255,.92),rgba(255,255,255,.62)); position:relative; }
        .project-preview__products span::before{ content:''; position:absolute; inset:8px 12px 19px; border-radius:6px; background:var(--project-accent); opacity:.35; }
        .project-preview__products span::after{ content:''; position:absolute; left:10px; bottom:9px; width:50%; height:4px; border-radius:8px; background:rgba(10,10,18,.22); }
        .project-preview__products span:first-child{ grid-row:span 2; height:117px; }
        .project-preview__dashboard{ height:calc(100% - 18px); display:grid; grid-template-columns:42px 1fr; gap:10px; background:rgba(255,255,255,.04); border-radius:11px; padding:8px; }
        .project-preview__sidebar{ border-radius:8px; background:rgba(8,9,16,.56); padding:9px; display:flex; flex-direction:column; gap:8px; }
        .project-preview__sidebar i{ width:100%; height:8px; border-radius:4px; background:rgba(255,255,255,.13); }
        .project-preview__sidebar i:first-child{ background:var(--project-accent); opacity:.8; }
        .project-preview__dashboard-main{ padding:4px; }
        .project-preview__metric-row{ display:grid; grid-template-columns:repeat(3,1fr); gap:6px; margin:10px 0; }
        .project-preview__metric-row i{ height:32px; border-radius:7px; background:rgba(255,255,255,.09); border:1px solid rgba(255,255,255,.06); }
        .project-preview__chart{ height:58px; border-radius:8px; background:rgba(255,255,255,.06); position:relative; overflow:hidden; }
        .project-preview__chart::before,.project-preview__chart::after{ content:''; position:absolute; left:8px; right:8px; height:1px; background:rgba(255,255,255,.08); }
        .project-preview__chart::before{ top:19px; } .project-preview__chart::after{ top:38px; }
        .project-preview__chart span{ position:absolute; left:9px; right:9px; bottom:12px; height:27px; border-left:2px solid var(--project-accent); border-bottom:2px solid var(--project-accent); transform:skewY(-9deg); opacity:.9; }

        .center-row{ display:flex; justify-content:center; }
        .empty-state{ text-align:center; padding:50px 20px; color:var(--gray-on-light); font-size:14px; }

        /* academic projects */
        .mini-grid{ display:grid; grid-template-columns:1fr; gap:16px; }
        @media (min-width:760px){ .mini-grid{ grid-template-columns:repeat(3,1fr); } }
        .mini-card{ background:var(--bg-light); border:1px solid var(--line-light); border-radius:16px; padding:24px; transition:transform .3s ease, box-shadow .3s ease; }
        .mini-card:hover{ transform:translateY(-5px); box-shadow:0 22px 40px -26px rgba(20,20,35,0.2); }
        .mini-card__ic{ width:42px; height:42px; border-radius:11px; display:flex; align-items:center; justify-content:center; margin-bottom:14px; }
        .mini-card h4{ font-size:14.5px; font-weight:800; margin:0 0 6px; }
        .mini-card .tag{ display:inline-block; font-size:10px; font-weight:700; color:var(--purple-2); background:rgba(124,58,237,0.08); padding:3px 9px; border-radius:100px; margin-bottom:10px; }
        .mini-card p{ font-size:12.5px; color:var(--gray-on-light); line-height:1.7; margin:0; }

        /* ============ SERVICES ============ */
        .services-grid{ display:grid; grid-template-columns:1fr; gap:22px; }
        @media (min-width:700px){ .services-grid{ grid-template-columns:1fr 1fr; } }
        @media (min-width:1040px){ .services-grid{ grid-template-columns:repeat(3,1fr); } }
        .service-card{ background:#fff; border:1px solid var(--line-light); border-radius:18px; padding:28px 24px; transition:transform .35s cubic-bezier(.16,.8,.24,1), box-shadow .35s ease; }
        .service-card:hover{ transform:translateY(-8px); box-shadow:0 30px 60px -32px rgba(20,20,35,0.25); }
        .service-card__ic{ width:46px; height:46px; border-radius:13px; display:flex; align-items:center; justify-content:center; margin-bottom:18px; }
        .service-card h3{ font-size:16.5px; font-weight:800; margin:0 0 10px; line-height:1.35; }
        .service-card p{ font-size:13px; color:var(--gray-on-light); line-height:1.75; margin:0 0 16px; }
        .service-card__tags{ display:flex; flex-wrap:wrap; gap:7px; }
        .service-card__tags span{ font-size:10.5px; font-weight:600; color:var(--gray-on-light); border:1px solid var(--line-light); padding:4px 10px; border-radius:100px; }

        /* ============ PROCESS ============ */
        .process{ background:var(--bg-dark); color:#fff; }
        .process-row{ display:grid; grid-template-columns:1fr; gap:16px; position:relative; }
        @media (min-width:860px){ .process-row{ grid-template-columns:repeat(4,1fr); gap:24px; } }
        @media (min-width:860px){
          .process-row::before{
            content:''; display:block; position:absolute; top:26px; left:12%; right:12%; height:1px;
            background-image:linear-gradient(90deg, var(--line-dark) 50%, transparent 50%); background-size:14px 1px;
          }
        }
        .p-step{ position:relative; z-index:2; }
        .p-step__top{ display:flex; align-items:center; gap:12px; margin-bottom:14px; }
        .p-step__num{ font-family:var(--mono); font-size:13px; font-weight:700; }
        .p-step__ic{ width:52px; height:52px; border-radius:14px; display:flex; align-items:center; justify-content:center; background:var(--panel-dark); border:1px solid var(--line-dark); }
        .p-step h3{ font-size:16.5px; font-weight:700; margin:0 0 8px; }
        .p-step p{ font-size:13px; color:var(--gray-on-dark); line-height:1.7; margin:0; max-width:230px; }
        @media (max-width:859px){
          .process .sec-head{ text-align:center; margin-left:auto; margin-right:auto; margin-bottom:32px; }
          .process-row{ max-width:430px; margin:0 auto; }
          .p-step{ text-align:center; padding:24px 22px; border:1px solid var(--line-dark); border-radius:17px; background:linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.018)); }
          .p-step__top{ justify-content:center; margin-bottom:14px; }
          .p-step__ic{ width:56px; height:56px; border-radius:16px; box-shadow:0 18px 34px -22px rgba(0,0,0,.8); }
          .p-step p{ max-width:310px; margin:0 auto; }
          .p-step::after{ content:''; position:absolute; left:50%; bottom:-17px; width:1px; height:17px; background:linear-gradient(var(--line-dark),transparent); }
          .p-step:last-child::after{ display:none; }
        }

        /* ============ CONTACT ============ */
        .contact{ background:var(--bg-light); }
        .contact-grid{ display:grid; grid-template-columns:1fr; gap:40px; }
        @media (min-width:960px){ .contact-grid{ grid-template-columns:0.85fr 1.15fr; gap:56px; align-items:start; } }

        .c-info-card{ display:flex; align-items:center; gap:14px; background:#fff; border:1px solid var(--line-light); border-radius:14px; padding:16px 18px; margin-bottom:14px; transition:transform .3s ease, box-shadow .3s ease; }
        .c-info-card:hover{ transform:translateX(4px); box-shadow:0 20px 34px -24px rgba(20,20,35,0.25); }
        .c-info-card__ic{ width:42px; height:42px; border-radius:11px; background:rgba(245,166,35,0.15); color:var(--orange); display:flex; align-items:center; justify-content:center; flex:none; }
        .c-info-card .label{ font-size:10.5px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; color:var(--gray-on-light); margin-bottom:3px; }
        .c-info-card .value{ font-size:14px; font-weight:700; }

        .c-form{ background:#fff; border:1px solid var(--line-light); border-radius:20px; padding:34px; box-shadow:0 40px 80px -46px rgba(20,20,35,0.25); }
        .c-form h3{ font-size:18px; font-weight:800; margin:0 0 22px; }
        .c-form-row{ display:grid; grid-template-columns:1fr; gap:18px; margin-bottom:18px; }
        @media (min-width:560px){ .c-form-row.two{ grid-template-columns:1fr 1fr; } }
        .c-field label{ font-size:10.5px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:var(--gray-on-light); display:block; margin-bottom:8px; }
        .c-field input, .c-field textarea{
          width:100%; border:1px solid var(--line-light); border-radius:10px; padding:12px 14px; font-family:var(--font); font-size:13.5px;
          background:var(--bg-light); color:var(--ink); transition:border-color .25s ease, box-shadow .25s ease;
        }
        .c-field input:focus, .c-field textarea:focus{ outline:none; border-color:var(--purple-2); box-shadow:0 0 0 3px rgba(124,58,237,0.14); background:#fff; }
        .c-field textarea{ resize:vertical; min-height:130px; }
        .c-success{ display:flex; align-items:center; gap:8px; color:var(--green); font-size:12.5px; font-weight:600; margin-top:16px; }
        .c-error{ font-size:12px; color:#EF4444; margin-top:10px; line-height:1.6; }
        .c-form button[disabled]{ opacity:.65; cursor:not-allowed; transform:none; box-shadow:none; }
        .hp-field{ position:absolute !important; left:-9999px !important; width:1px !important; height:1px !important; overflow:hidden !important; opacity:0 !important; pointer-events:none !important; }

        /* ============ OPPORTUNITIES ============ */
        .opportunity{ background:var(--bg-light); padding:86px 0; }
        .opportunity-card{ position:relative; overflow:hidden; border-radius:24px; background:linear-gradient(120deg,#0A0A12 0%,#11101D 56%,#251943 100%); border:1px solid var(--line-dark); padding:44px; color:#fff; display:grid; grid-template-columns:1fr; gap:30px; align-items:center; box-shadow:0 42px 90px -48px rgba(20,20,35,.58); }
        .opportunity-card::after{ content:''; position:absolute; width:310px; height:310px; right:-130px; top:-150px; border-radius:50%; background:radial-gradient(circle,rgba(139,92,246,.48),transparent 68%); }
        @media (min-width:880px){ .opportunity-card{ grid-template-columns:1.25fr .75fr; padding:52px 56px; } }
        .opportunity-copy{ position:relative; z-index:1; }
        .opportunity-copy h2{ font-size:clamp(27px,4vw,42px); line-height:1.14; letter-spacing:-.03em; margin:0 0 14px; max-width:700px; }
        .opportunity-copy p{ color:var(--gray-on-dark); font-size:14px; line-height:1.75; margin:0; max-width:660px; }
        .opportunity-details{ position:relative; z-index:1; display:flex; flex-direction:column; gap:14px; align-items:flex-start; }
        .opportunity-availability{ display:inline-flex; align-items:center; gap:9px; color:#D7FBE4; font-size:11px; font-weight:700; }
        .opportunity-availability::before{ content:''; width:8px; height:8px; border-radius:50%; background:var(--green); box-shadow:0 0 0 6px rgba(34,197,94,.12); }
        .opportunity-actions{ display:flex; flex-wrap:wrap; gap:11px; }
        .opportunity-actions .btn{ width:auto; }
        .opportunity-email{ font-size:11.5px; color:var(--gray-on-dark); display:flex; align-items:center; gap:7px; }
        @media (max-width:620px){ .opportunity{ padding:64px 0; } .opportunity-card{ padding:32px 24px; border-radius:20px; text-align:center; } .opportunity-details{ align-items:center; } .opportunity-actions{ justify-content:center; } }

        /* ============ CTA BANNER ============ */
        .cta-banner{ background:var(--bg-darkest); padding:64px 0; color:#fff; position:relative; overflow:hidden; }
        .cta-banner::before{ content:''; position:absolute; inset:0; background:radial-gradient(circle at 85% 30%, rgba(139,92,246,0.22), transparent 45%); }
        .cta-row{ display:flex; flex-direction:column; align-items:center; text-align:center; gap:24px; position:relative; z-index:2; }
        .cta-row .btn{ width:auto; align-self:center; flex:none; }
        @media (min-width:860px){ .cta-row{ flex-direction:row; align-items:center; justify-content:space-between; text-align:left; } .cta-row .btn{ align-self:auto; } }
        .cta-row h3{ font-size:clamp(22px,3vw,30px); font-weight:800; margin:0 0 8px; letter-spacing:-0.01em; }
        .cta-row p{ font-size:13.5px; color:var(--gray-on-dark); margin:0; }

        /* ============ FOOTER ============ */
        .footer{ background:var(--bg-darkest); color:var(--gray-on-dark); padding:60px 0 24px; border-top:1px solid var(--line-dark); }
        .footer-grid{ display:grid; grid-template-columns:1fr; gap:40px; margin-bottom:48px; }
        @media (min-width:760px){ .footer-grid{ grid-template-columns:1.3fr 1fr 1fr 1.1fr; gap:30px; } }
        .footer-brand p{ font-size:13px; line-height:1.8; margin:14px 0 20px; max-width:260px; color:var(--gray-on-dark-2); }
        .footer h5{ color:#fff; font-size:13.5px; font-weight:700; margin:0 0 18px; }
        .footer-links{ display:flex; flex-direction:column; gap:11px; }
        .footer-links a{ font-size:13px; color:var(--gray-on-dark-2); transition:color .25s ease; background:none; border:none; text-align:left; padding:0; }
        .footer-links a:hover{ color:#fff; }
        .footer-contact{ display:flex; flex-direction:column; gap:12px; margin-bottom:18px; }
        .footer-contact div{ display:flex; align-items:center; gap:10px; font-size:12.5px; color:var(--gray-on-dark-2); }
        .footer-bottom{ border-top:1px solid var(--line-dark); padding-top:22px; display:flex; flex-wrap:wrap; gap:12px; justify-content:space-between; font-size:12px; }
        .footer-bottom a{ color:var(--gray-on-dark-2); margin-left:18px; }
        .footer-bottom a:hover{ color:#fff; }
      `}</style>

      {/* ============ NAV ============ */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="wrap navbar__inner">
          <button className="logo" onClick={() => navigateTo("home", "page")} style={{ background: "none", border: "none", padding: 0 }}>
            <span className="logo__mark" />
            <span className="logo__text">Haseeb<span>.dev</span></span>
          </button>
          <div className="nav-links">
            {NAV_LINKS.map((item) => {
              const isActive = item.type === "page" ? page === item.id : page === "home" && item.id === "home";
              return (
                <button
                  key={item.id}
                  className={isActive ? "active" : ""}
                  onClick={() => navigateTo(item.id, item.type)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <button className="nav-cta" onClick={() => navigateTo("contact", "page")}>
            Let's Work Together <ArrowRight size={14} />
          </button>
          <button className="nav-burger" onClick={() => setMenuOpen((o) => !o)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div id="mobile-navigation" className={`mmenu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <button className="mmenu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <X size={22} />
        </button>
        {NAV_LINKS.map((item) => (
          <button key={item.id} className="mlink" onClick={() => navigateTo(item.id, item.type)}>
            {item.label}
          </button>
        ))}
      </div>

      {/* ================================================================ */}
      {/* HOME PAGE                                                        */}
      {/* ================================================================ */}
      {page === "home" && (
        <>
          <section id="home" className="hero">
            <div className="wrap hero__grid">
              <div>
                <Reveal><span className="hi-badge">Web Developer · Computer Engineer</span></Reveal>
                <Reveal delay={70}>
                  <h1>
                    I build digital experiences that look sharp and
                    <span className="grad-text"> work beautifully.</span>
                  </h1>
                </Reveal>
                <Reveal delay={130}>
                  <p className="lead">
                    <strong>I'm Haseeb</strong> — a Computer Engineer and Web Developer specializing in
                    React, WordPress, Shopify, and responsive frontend experiences built for real users.
                  </p>
                </Reveal>
                <Reveal delay={190}>
                  <div className="btn-row">
                    <button className="btn btn-grad" onClick={() => navigateTo("projects", "page")}>
                      View My Work <ArrowRight size={15} />
                    </button>
                    <button className="btn btn-outline-dark" onClick={() => navigateTo("contact", "page")}>
                      Start a Conversation <Mail size={15} />
                    </button>
                  </div>
                </Reveal>
                <Reveal delay={250}>
                  <div className="stats-row">
                    <div className="stat-item">
                      <div className="stat-ic" style={{ background: "rgba(139,92,246,0.15)" }}>
                        <Layers size={17} color="#8B5CF6" />
                      </div>
                      <div><b>4+</b><span>Years Building Websites</span></div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-ic" style={{ background: "rgba(245,166,35,0.15)" }}>
                        <Zap size={17} color="#F5A623" />
                      </div>
                      <div><b>20+</b><span>Projects Delivered</span></div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-ic" style={{ background: "rgba(59,130,246,0.15)" }}>
                        <Star size={17} color="#3B82F6" />
                      </div>
                      <div><b>15+</b><span>Client Collaborations</span></div>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={150} className="hero__visual">
                <div className="hero-showcase">
                  <div className="hero-showcase__bar">
                    <div className="hero-showcase__dots">
                      <i style={{ background: "#FF5F57" }} />
                      <i style={{ background: "#FEBC2E" }} />
                      <i style={{ background: "#28C840" }} />
                    </div>
                    <span className="hero-showcase__path">src / components / hero-preview.jsx</span>
                    <span className="hero-showcase__status">Available for projects</span>
                  </div>

                  <div className="hero-showcase__body">
                    <div className="hero-showcase__copy">
                      <span className="hero-showcase__eyebrow">React · WordPress · Shopify</span>
                      <h4>Clean, scalable code for polished web experiences.</h4>
                      <p>
                        Thoughtful frontend structure, CMS flexibility, and e-commerce functionality — delivered with responsive detail and maintainable code.
                      </p>
                      <div className="hero-showcase__services">
                        <span>Reusable UI</span>
                        <span>Clean Structure</span>
                        <span>CMS-ready</span>
                        <span>Launch-ready</span>
                      </div>
                    </div>

                    <div className="hero-showcase__stack" aria-hidden="true">
                      <div className="hero-code-panel">
                        <div className="hero-code-panel__top">
                          <span className="hero-code-panel__title">Selected build approach</span>
                          <span className="hero-code-panel__label">Production ready</span>
                        </div>
                        <div className="hero-code-panel__lines">
                          <span className="hero-code-line"><span className="hero-code-line__no">01</span><span className="hero-code-line__bar" style={{ "--line-width": "82%", "--line-start": "#8B5CF6", "--line-end": "#C084FC" }} /></span>
                          <span className="hero-code-line"><span className="hero-code-line__no">02</span><span className="hero-code-line__bar" style={{ "--line-width": "68%", "--line-start": "#F5A623", "--line-end": "#F59E0B" }} /></span>
                          <span className="hero-code-line"><span className="hero-code-line__no">03</span><span className="hero-code-line__bar" style={{ "--line-width": "74%", "--line-start": "#3B82F6", "--line-end": "#60A5FA" }} /></span>
                          <span className="hero-code-line"><span className="hero-code-line__no">04</span><span className="hero-code-line__bar" style={{ "--line-width": "58%", "--line-start": "#22C55E", "--line-end": "#4ADE80" }} /></span>
                          <span className="hero-code-line"><span className="hero-code-line__no">05</span><span className="hero-code-line__bar" style={{ "--line-width": "44%", "--line-start": "#F06AA8", "--line-end": "#FB7185" }} /></span>
                        </div>
                        <div className="hero-code-panel__footer">
                          <span>Responsive UI</span>
                          <span>Component-based</span>
                          <span>API ready</span>
                        </div>
                      </div>

                      <div className="hero-mini-grid">
                        <div className="hero-mini-card">
                          <div className="hero-mini-card__icon" style={{ background: "rgba(139,92,246,.15)" }}><Code2 size={16} color="#8B5CF6" /></div>
                          <b>Frontend</b>
                          <p>React interfaces with strong visual consistency and clean structure.</p>
                        </div>
                        <div className="hero-mini-card">
                          <div className="hero-mini-card__icon" style={{ background: "rgba(245,166,35,.16)" }}><ShoppingBag size={16} color="#F5A623" /></div>
                          <b>CMS & Commerce</b>
                          <p>Flexible WordPress and Shopify builds with content editing in mind.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hero-showcase__footer">
                    <span className="hero-showcase__footer-copy">Built across leading platforms</span>
                    <div className="hero-showcase__brands">
                      {HERO_TECH.map((label) => {
                        const tech = TECH.find((item) => item.label === label);
                        return tech ? <TechBadge key={tech.label} t={tech} compact /> : null;
                      })}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="scroll-cue">
              <div className="mouse" />
              Scroll Down
            </div>
          </section>

          {/* ---- About teaser ---- */}
          <section className="about sec">
            <div className="wrap">
              <div className="about__grid">
                <div className="about-copy">
                  <Reveal><Eyebrow>About Me</Eyebrow></Reveal>
                  <Reveal delay={60}>
                    <h2>
                      I started with a curiosity for how websites work.
                      <span className="link-word"> Today, I build them.</span>
                    </h2>
                  </Reveal>
                  <Reveal delay={120}>
                    <p>
                      I'm Haseeb Mujeeb Ansari, a Computer Engineer and Web Developer from Karachi.
                      I turn ideas, approved designs, and business requirements into responsive digital
                      experiences — from React interfaces and custom frontend work to WordPress,
                      Shopify, performance optimization, and CMS implementation.
                    </p>
                  </Reveal>
                  <Reveal delay={170}>
                    <button className="btn btn-outline-light" onClick={() => navigateTo("about", "page")}>
                      More About Me <ArrowRight size={15} />
                    </button>
                  </Reveal>
                </div>

                <Reveal delay={120} className="card-grid2">
                  {ABOUT_CARDS.map((c) => (
                    <div className="about-card" key={c.title}>
                      <div className="about-card__ic" style={{ background: `${c.color}22` }}>
                        <c.icon size={19} color={c.color} />
                      </div>
                      <h4>{c.title}</h4>
                      <p>{c.desc}</p>
                    </div>
                  ))}
                </Reveal>
              </div>

              <Reveal delay={80}>
                <div className="stack-intro">
                  <div>
                    <h3>Development stack</h3>
                    <p>Organized by how I use each technology in production work.</p>
                  </div>
                </div>
                <div className="tech-groups">
                  {TECH_GROUPS.map((group) => (
                    <div className="tech-group" key={group.title}>
                      <div className="tech-group__head">
                        <h4>{group.title}</h4>
                        <p>{group.desc}</p>
                      </div>
                      <div className="tech-group__items">
                        {group.items.map((label) => {
                          const tech = TECH.find((item) => item.label === label);
                          return tech ? <TechPill key={label} t={tech} /> : null;
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* ---- Featured projects teaser ---- */}
          <section className="projects sec">
            <div className="wrap">
              <Reveal className="sec-head">
                <Eyebrow>My Work</Eyebrow>
                <h2>Featured Projects</h2>
                <p>Real client-facing work and frontend projects, presented with the platform, purpose, and implementation focus.</p>
              </Reveal>

              <div className="proj-grid2">
                {PROJECTS.slice(0, 3).map((p, i) => (
                  <Reveal as="div" delay={i * 90} key={p.title} className="pcard">
                    <div className="pcard__img-wrap">
                      <ProjectPreview project={p} />
                      <span className="pcard__badge" style={{ background: p.badgeBg }}>{p.code}</span>
                    </div>
                    <div className="pcard__body">
                      <div className="pcard__eyebrow">{p.projectType}</div>
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>
                      <div className="pcard__highlight">{p.highlight}</div>
                      <div className="pcard__stack">
                        {p.stack.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={100} className="center-row">
                <button className="btn btn-outline-light" onClick={() => navigateTo("projects", "page")}>
                  View All Projects <ArrowRight size={15} />
                </button>
              </Reveal>
            </div>
          </section>

          {/* ---- Process ---- */}
          <section id="process" className="process sec">
            <div className="wrap">
              <Reveal className="sec-head sec-head--white">
                <Eyebrow>My Process</Eyebrow>
                <h2>How I Work</h2>
                <p>A practical path from requirements to a tested, production-ready experience.</p>
              </Reveal>

              <div className="process-row">
                {PROCESS.map((s, i) => (
                  <Reveal delay={i * 100} key={s.n} className="p-step">
                    <div className="p-step__top">
                      <div className="p-step__ic">
                        <s.icon size={22} color={s.color} />
                      </div>
                      <span className="p-step__num" style={{ color: s.color }}>{s.n}</span>
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>


          {/* ---- Contact & opportunities ---- */}
          <section className="opportunity">
            <div className="wrap">
              <Reveal className="opportunity-card">
                <div className="opportunity-copy">
                  <Eyebrow>Contact & Opportunities</Eyebrow>
                  <h2>Let's build something worth visiting.</h2>
                  <p>
                    Have a project, opportunity, or idea? Whether you're building something new,
                    improving an existing website, or looking for a dependable developer, I'd be glad to hear about it.
                  </p>
                </div>
                <div className="opportunity-details">
                  <span className="opportunity-availability">Available for freelance, remote, and full-time roles</span>
                  <div className="opportunity-actions">
                    <button className="btn btn-grad" onClick={() => navigateTo("contact", "page")}>
                      Start a Conversation <ArrowRight size={15} />
                    </button>
                    <button className="btn btn-outline-dark" onClick={() => navigateTo("projects", "page")}>
                      View My Work <ExternalLink size={14} />
                    </button>
                  </div>
                  <a className="opportunity-email" href="mailto:haseebmujeeb360@gmail.com">
                    <Mail size={14} /> haseebmujeeb360@gmail.com
                  </a>
                </div>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* ================================================================ */}
      {/* ABOUT PAGE                                                       */}
      {/* ================================================================ */}
      {page === "about" && (
        <>
          <Masthead
            crumb="About"
            title="From curiosity to production-ready websites."
            subtitle="I combine a Computer Engineering mindset with practical frontend, WordPress, Shopify, and CMS development experience to build responsive websites that are clear, maintainable, and ready for real use."
          />

          <section className="about sec" style={{ paddingBottom: 40 }}>
            <div className="wrap">
              <Reveal><Eyebrow>Profile</Eyebrow></Reveal>
              <Reveal delay={50}><h2 style={{ marginBottom: 6 }}>Haseeb Mujeeb Ansari</h2></Reveal>
              <Reveal delay={90}>
                <p style={{ color: "var(--gray-on-light)", fontSize: 14.5, maxWidth: 640, lineHeight: 1.8, marginTop: 14 }}>
                  I started by wanting to understand how websites work; that curiosity grew into
                  building them professionally. Today, I work as a Web Developer at JTECH Solutions
                  and independently with clients, translating designs and requirements into responsive
                  React interfaces, WordPress websites, Shopify stores, and CMS-driven experiences.
                  My Computer Engineering background keeps the work structured, practical, and tested
                  against real-world use.
                </p>
              </Reveal>
              <Reveal delay={130}>
                <div className="info-grid">
                  <div><div className="label">Name</div><div className="value">Haseeb M. Ansari</div></div>
                  <div><div className="label">Location</div><div className="value">Karachi, Pakistan</div></div>
                  <div><div className="label">Email</div><div className="value">haseebmujeeb360@gmail.com</div></div>
                  <div><div className="label">Phone</div><div className="value">+92 335 3832477</div></div>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <button className="btn btn-outline-light" onClick={() => navigateTo("contact", "page")}>
                  Let's Connect <ArrowRight size={15} />
                </button>
              </Reveal>
            </div>
          </section>

          <section className="sec" style={{ paddingTop: 20 }}>
            <div className="wrap">
              <Reveal className="sec-head">
                <Eyebrow>Web Development</Eyebrow>
                <h2>Development expertise, clearly organized.</h2>
                <p>
                  My work spans custom WordPress development, hand-coded front-end interfaces,
                  modern CMS platforms, and e-commerce implementation.
                </p>
              </Reveal>

              <div className="web-skills-grid">
                {WEB_SKILL_AREAS.map((area, i) => {
                  const AreaIcon = area.icon;
                  return (
                    <Reveal
                      delay={(i % 2) * 80}
                      key={area.title}
                      className={`skill-domain ${area.wide ? "skill-domain--wide" : ""} ${area.number === "01" ? "skill-domain--wordpress" : ""}`}
                      style={{ "--domain-color": area.color }}
                    >
                      <div className="skill-domain__head">
                        <div className="skill-domain__icon" style={{ background: `${area.color}18` }}>
                          <AreaIcon size={21} color={area.color} />
                        </div>
                        <div className="skill-domain__title">
                          <h3>{area.title}</h3>
                          <p>{area.desc}</p>
                        </div>
                        <span className="skill-domain__number">{area.number}</span>
                      </div>

                      <div className="skill-domain__groups">
                        {area.groups.map((group) => (
                          <div className="skill-subgroup" key={group.title}>
                            <h4>{group.title}</h4>
                            <div className="skill-subgroup__items">
                              {group.items.map((item) => (
                                <span key={item}>{item}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              <Reveal delay={100} className="skill-meta">
                <div className="skill-meta__item">
                  <h4>Professional Strengths</h4>
                  <div className="skill-meta__tags">
                    {SUPPORTING_SKILLS.map((skill) => <span key={skill}>{skill}</span>)}
                  </div>
                </div>
                <div className="skill-meta__item">
                  <h4>Languages</h4>
                  <div className="skill-meta__tags">
                    {LANGUAGES.map((language) => <span key={language}>{language}</span>)}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="about sec">
            <div className="wrap">
              <Reveal className="subhead"><Briefcase size={19} color="var(--purple-2)" /> Professional Experience</Reveal>
              <Reveal delay={60} className="timeline" style={{ marginBottom: 60 }}>
                {EXPERIENCE.map((e) => (
                  <div className="t-item" key={e.title}>
                    <span className="yr">{e.yr}</span>
                    <h4>{e.title}</h4>
                    <div className="org">{e.org}</div>
                    <ul>
                      {e.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Reveal>

              <Reveal className="subhead"><GraduationCap size={19} color="var(--purple-2)" /> Education</Reveal>
              <Reveal delay={60} className="timeline">
                {EDUCATION.map((e) => (
                  <div className="t-item" key={e.title}>
                    <span className="yr">{e.yr}</span>
                    <h4>{e.title}</h4>
                    <div className="org" style={{ marginBottom: 0 }}>{e.org}</div>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          <section className="cta-banner">
            <div className="wrap cta-row">
              <div>
                <h3>Like what you see?</h3>
                <p>Let's talk about what you're building.</p>
              </div>
              <button className="btn btn-grad" onClick={() => navigateTo("contact", "page")}>
                Get In Touch <ArrowRight size={15} />
              </button>
            </div>
          </section>
        </>
      )}

      {/* ================================================================ */}
      {/* SERVICES PAGE                                                    */}
      {/* ================================================================ */}
      {page === "services" && (
        <>
          <Masthead
            crumb="Services"
            title="What I can build for you."
            subtitle="From full CMS builds to hand-coded front-end work — here's how I can help get your site live and performing."
          />

          <section className="sec">
            <div className="wrap">
              <Reveal className="sec-head">
                <Eyebrow>Services</Eyebrow>
                <h2>Every part of the build, covered.</h2>
                <p>Pick a starting point, or bring a project that spans a few of these — most real builds do.</p>
              </Reveal>

              <div className="services-grid">
                {SERVICES.map((s, i) => (
                  <Reveal delay={(i % 3) * 90} key={s.title} className="service-card">
                    <div className="service-card__ic" style={{ background: `${s.color}22` }}>
                      <s.icon size={21} color={s.color} />
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <div className="service-card__tags">
                      {s.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="process sec">
            <div className="wrap">
              <Reveal className="sec-head sec-head--white">
                <Eyebrow>How It Works</Eyebrow>
                <h2>A simple, four-step process.</h2>
              </Reveal>
              <div className="process-row">
                {PROCESS.map((s, i) => (
                  <Reveal delay={i * 100} key={s.n} className="p-step">
                    <div className="p-step__top">
                      <div className="p-step__ic">
                        <s.icon size={22} color={s.color} />
                      </div>
                      <span className="p-step__num" style={{ color: s.color }}>{s.n}</span>
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="cta-banner">
            <div className="wrap cta-row">
              <div>
                <h3>Not sure what you need?</h3>
                <p>Tell me about the project and I'll point you in the right direction.</p>
              </div>
              <button className="btn btn-grad" onClick={() => navigateTo("contact", "page")}>
                Start a Conversation <ArrowRight size={15} />
              </button>
            </div>
          </section>
        </>
      )}

      {/* ================================================================ */}
      {/* PROJECTS PAGE                                                    */}
      {/* ================================================================ */}
      {page === "projects" && (
        <>
          <Masthead
            crumb="Projects"
            title="Selected development work."
            subtitle="Client-facing websites and frontend projects presented with their platform, purpose, and development focus — followed by selected technical work from my engineering background."
          />

          <section className="projects sec">
            <div className="wrap">
              <Reveal className="filter-row">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    className={`filter-pill ${activeFilter === f ? "active" : ""}`}
                    onClick={() => setActiveFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </Reveal>

              {filteredProjects.length > 0 ? (
                <div className="proj-grid2">
                  {filteredProjects.map((p, i) => (
                    <Reveal as="div" delay={(i % 3) * 90} key={p.title} className="pcard">
                      <div className="pcard__img-wrap">
                        <ProjectPreview project={p} />
                        <span className="pcard__badge" style={{ background: p.badgeBg }}>{p.code}</span>
                      </div>
                      <div className="pcard__body">
                        <div className="pcard__eyebrow">{p.projectType}</div>
                        <h3>{p.title}</h3>
                        <p>{p.desc}</p>
                        <div className="pcard__highlight">{p.highlight}</div>
                        <div className="pcard__stack">
                          {p.stack.map((s) => (
                            <span key={s}>{s}</span>
                          ))}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="empty-state">No projects tagged "{activeFilter}" yet — check back soon.</div>
              )}
            </div>
          </section>

          <section className="sec" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <Reveal className="sec-head">
                <Eyebrow>Academic &amp; Technical</Eyebrow>
                <h2>From my engineering coursework.</h2>
                <p>A few projects from my Computer Engineering degree — the systems-and-hardware side of how I think about building things.</p>
              </Reveal>
              <div className="mini-grid">
                {ACADEMIC_PROJECTS.map((p, i) => (
                  <Reveal delay={i * 90} key={p.title} className="mini-card">
                    <div className="mini-card__ic" style={{ background: `${p.color}22` }}>
                      <p.icon size={19} color={p.color} />
                    </div>
                    <span className="tag">{p.tag}</span>
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="cta-banner">
            <div className="wrap cta-row">
              <div>
                <h3>See something you like?</h3>
                <p>Let's talk about building something similar for you.</p>
              </div>
              <button className="btn btn-grad" onClick={() => navigateTo("contact", "page")}>
                Get In Touch <ArrowRight size={15} />
              </button>
            </div>
          </section>
        </>
      )}

      {/* ================================================================ */}
      {/* CONTACT PAGE                                                     */}
      {/* ================================================================ */}
      {page === "contact" && (
        <>
          <Masthead
            crumb="Contact"
            title="Let's Build Something Amazing Together! 🚀"
            subtitle="Have a project in mind? Let's talk and turn your ideas into reality."
          />
          <section className="contact sec">
            <div className="wrap contact-grid">
              <div>
                <Reveal>
                  {CONTACT_INFO.map((c) => {
                    const Wrap = c.href ? "a" : "div";
                    return (
                      <Wrap className="c-info-card" key={c.label} href={c.href || undefined}>
                        <div className="c-info-card__ic"><c.icon size={18} /></div>
                        <div>
                          <div className="label">{c.label}</div>
                          <div className="value">{c.value}</div>
                        </div>
                      </Wrap>
                    );
                  })}
                </Reveal>
              </div>

              <Reveal delay={100} className="c-form">
                <h3>Send a message</h3>
                <form onSubmit={handleFormSubmit} noValidate>
                  <div className="hp-field" aria-hidden="true">
                    <label htmlFor="cf-website">Website</label>
                    <input
                      id="cf-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                  <div className="c-form-row two">
                    <div className="c-field">
                      <label htmlFor="cf-name">Name</label>
                      <input
                        id="cf-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div className="c-field">
                      <label htmlFor="cf-email">Email</label>
                      <input
                        id="cf-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="c-form-row">
                    <div className="c-field">
                      <label htmlFor="cf-subject">Subject</label>
                      <input
                        id="cf-subject"
                        name="subject"
                        type="text"
                        placeholder="What's this about?"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="c-form-row">
                    <div className="c-field">
                      <label htmlFor="cf-message">Message</label>
                      <textarea
                        id="cf-message"
                        name="message"
                        required
                        placeholder="Tell me about your project..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-grad" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Get in Touch"} <Send size={14} />
                  </button>
                  {formSent && (
                    <div className="c-success" role="status" aria-live="polite">
                      <CheckCircle2 size={15} /> Message sent successfully. I'll reply as soon as possible.
                    </div>
                  )}
                  {formError && <div className="c-error" role="alert">{formError}</div>}
                </form>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <span className="logo__mark" />
                <span className="logo__text">Haseeb<span>.dev</span></span>
              </div>
              <p>Building responsive React, WordPress, Shopify, and CMS experiences with clean implementation and practical delivery.</p>
            </div>

            <div>
              <h5>Quick Links</h5>
              <div className="footer-links">
                <a onClick={() => navigateTo("about", "page")}>About</a>
                <a onClick={() => navigateTo("services", "page")}>Services</a>
                <a onClick={() => navigateTo("projects", "page")}>Projects</a>
                <a onClick={() => navigateTo("process", "section")}>Process</a>
                <a onClick={() => navigateTo("contact", "page")}>Contact</a>
              </div>
            </div>

            <div>
              <h5>Services</h5>
              <div className="footer-links">
                {SERVICES.slice(0, 5).map((s) => (
                  <a key={s.title} onClick={() => navigateTo("services", "page")}>{s.title}</a>
                ))}
              </div>
            </div>

            <div>
              <h5>Let's Connect</h5>
              <div className="footer-contact">
                <div><Mail size={14} /> haseebmujeeb360@gmail.com</div>
                <div><Phone size={14} /> +92 335 3832477</div>
                <div><MapPin size={14} /> Karachi, Pakistan</div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Haseeb Mujeeb Ansari. All rights reserved.</span>
            <div>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
