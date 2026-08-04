import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Mail, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ================================================================
   CV DATA — DIALLO MAMADOU
   ================================================================ */
const CV = {
  name:     'Diallo Mamadou',
  title:    'Professeur de Lycée',
  initials: 'DM',
  stats:    ["2+ ans d'enseignement", '3 établissements', "Côte d'Ivoire"],

  about: [
    "Passionné de physique-chimie depuis le Lycée Municipal d'Abobo, j'ai construit un parcours académique solide à l'Université Félix Houphouët-Boigny d'Abidjan, où j'ai obtenu ma Licence en Physique-Chimie en 2021.",
    "Intégré à l'École Normale Supérieure depuis 2022, je me consacre aujourd'hui à former et inspirer la nouvelle génération au Lycée Moderne de Téhini, animé par la conviction que l'éducation est le levier le plus puissant du progrès social.",
  ],

  experiences: [
    {
      period:      '2024 — Présent',
      role:        'Professeur de Physique-Chimie',
      company:     'Lycée Moderne de Téhini',
      description: 'Enseignement de la Physique-Chimie en classes de Seconde, Première et Terminale. Animation de cours théoriques et travaux pratiques, suivi pédagogique individualisé et préparation aux examens nationaux.',
    },
    {
      period:      '2023 — 2024',
      role:        'Stagiaire Enseignant',
      company:     'Lycée Moderne de Dabou',
      description: "Stage de formation professionnelle en situation réelle d'enseignement. Conception et animation de séquences pédagogiques sous la supervision de professeurs confirmés.",
    },
    {
      period:      '2017 — 2024',
      role:        'Répétiteur & Formateur Privé',
      company:     'Cours Particuliers',
      description: "Accompagnement personnalisé d'élèves du collège au lycée en Physique, Chimie et Mathématiques. Fort taux de réussite aux examens nationaux (BEPC, BAC).",
    },
  ],

  skills: [
    { name: 'Physique-Chimie',    level: 95 },
    { name: 'Pédagogie',          level: 90 },
    { name: 'Travail en équipe',  level: 85 },
    { name: 'Informatique',       level: 80 },
    { name: 'Excel Avancé',       level: 75 },
    { name: 'Vibe Coding',        level: 65 },
  ],

  formation: [
    { year: '2022', degree: 'École Normale Supérieure (ENS)', school: "Abidjan, Côte d'Ivoire",           detail: 'Formation initiale des professeurs' },
    { year: '2021', degree: 'Licence en Physique-Chimie',     school: 'Univ. Félix Houphouët-Boigny',      detail: "Abidjan, Côte d'Ivoire" },
    { year: '2012', degree: 'Baccalauréat',                   school: "Lycée Municipal d'Abobo",           detail: "Abidjan, Côte d'Ivoire" },
    { year: '2011', degree: 'BEPC',                           school: "Collège Moderne d'Abobo Pk18",      detail: "Abidjan, Côte d'Ivoire" },
  ],

  contact: {
    email:    'diallo.mamadou@ens.ci',
    location: "Côte d'Ivoire",
  },
};

/* ================================================================
   SKILL CIRCLE COMPONENT
   ================================================================ */
function SkillCard({ skill, index }) {
  const R           = 40;
  const CIRC        = 2 * Math.PI * R;
  const targetDash  = (skill.level / 100) * CIRC;

  return (
    <div className="skill-card" id={`skill-${index}`}>
      <div className="skill-circle-wrap">
        <svg viewBox="0 0 100 100" fill="none">
          {/* track */}
          <circle cx="50" cy="50" r={R} stroke="rgba(232,99,74,0.12)" strokeWidth="6" />
          {/* progress arc */}
          <circle
            className="skill-circle"
            data-level={skill.level}
            cx="50" cy="50" r={R}
            stroke="#E8634A" strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`0 ${CIRC}`}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <span className="skill-percent" data-target={skill.level}>0%</span>
      </div>
      <p className="skill-name">{skill.name}</p>
    </div>
  );
}

/* ================================================================
   MAIN APP
   ================================================================ */
export default function App() {
  const navRef  = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── NAVBAR morphing ────────────────────────────── */
      ScrollTrigger.create({
        trigger: heroRef.current,
        start:   'bottom 80px',
        onEnter:     () => navRef.current?.classList.add('scrolled'),
        onLeaveBack: () => navRef.current?.classList.remove('scrolled'),
      });

      /* ── HERO entrance ──────────────────────────────── */
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.hero-photo',       { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.85 })
        .fromTo('.hero-name',        { y: 60, opacity: 0 },      { y: 0, opacity: 1, duration: 0.85 }, '-=0.5')
        .fromTo('.hero-title',       { y: 40, opacity: 0 },      { y: 0, opacity: 1, duration: 0.75 }, '-=0.65')
        .fromTo('.hero-stats',       { y: 30, opacity: 0 },      { y: 0, opacity: 1, duration: 0.7  }, '-=0.6')
        .fromTo('.hero-ctas',        { y: 30, opacity: 0 },      { y: 0, opacity: 1, duration: 0.7  }, '-=0.55')
        .fromTo('.hero-scroll-hint', { opacity: 0 },             { opacity: 1, duration: 0.5 },         '-=0.35');

      /* ── ABOUT ─────────────────────────────────────── */
      const aboutST = { trigger: '.about-section', start: 'top 72%' };
      gsap.fromTo('.about-left',    { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: aboutST });
      gsap.fromTo('.about-divider', { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 1.1, ease: 'power2.out', transformOrigin: 'top', scrollTrigger: aboutST });
      gsap.fromTo('.about-right',   { x: 50, opacity: 0 },  { x: 0, opacity: 1, duration: 0.9, delay: 0.15, ease: 'power3.out', scrollTrigger: aboutST });

      /* ── EXPERIENCE CARDS ───────────────────────────── */
      gsap.utils.toArray('.exp-card').forEach((card, i) => {
        gsap.fromTo(card,
          { x: i % 2 === 0 ? -70 : 70, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 80%' } }
        );
        // dot pulse on enter
        const dot = card.querySelector('.timeline-dot');
        if (dot) {
          gsap.fromTo(dot,
            { scale: 0 },
            { scale: 1, duration: 0.5, ease: 'back.out(2)',
              scrollTrigger: { trigger: card, start: 'top 80%' } }
          );
        }
      });

      /* ── SKILL CARDS entrance ───────────────────────── */
      gsap.utils.toArray('.skill-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 55, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: '.skills-section', start: 'top 70%' } }
        );
      });

      /* ── SKILL CIRCLES animation ────────────────────── */
      gsap.utils.toArray('.skill-circle').forEach((circle) => {
        const level = parseInt(circle.dataset.level, 10);
        const r = 40;
        const circ = 2 * Math.PI * r;
        const targetDash = (level / 100) * circ;
        gsap.fromTo(circle,
          { strokeDasharray: `0 ${circ}` },
          { strokeDasharray: `${targetDash} ${circ}`, duration: 1.6, ease: 'power2.out',
            scrollTrigger: { trigger: '.skills-section', start: 'top 70%' } }
        );
      });

      /* ── SKILL COUNTERS ─────────────────────────────── */
      gsap.utils.toArray('.skill-percent').forEach((el) => {
        const target = parseInt(el.dataset.target, 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 1.6, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.val) + '%'; },
          scrollTrigger: { trigger: '.skills-section', start: 'top 70%' },
        });
      });

      /* ── FORMATION CARDS ────────────────────────────── */
      gsap.utils.toArray('.formation-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 45, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, delay: i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: '.formation-section', start: 'top 72%' } }
        );
      });

      /* ── CONTACT ────────────────────────────────────── */
      gsap.fromTo('.contact-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-section', start: 'top 75%' } }
      );

    });

    return () => ctx.revert();
  }, []);

  /* ── RENDER ───────────────────────────────────────────────── */
  return (
    <div className="app">

      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* ══════════════════════════════════════════════
          NAVBAR
          ══════════════════════════════════════════════ */}
      <nav ref={navRef} className="navbar" aria-label="Navigation principale">
        <span className="nav-initials">DM</span>

        <div className="nav-links">
          <a href="#about">À propos</a>
          <a href="#experience">Expérience</a>
          <a href="#competences">Compétences</a>
          <a href="#contact">Contact</a>
        </div>

        <a href="/cv-diallo-mamadou.pdf" download className="nav-cta" id="nav-download-btn">
          <Download size={13} aria-hidden="true" />
          Télécharger CV
        </a>
      </nav>

      {/* ══════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════ */}
      <section ref={heroRef} className="hero-section" aria-label="Introduction">
        <div className="hero-content">
          {/* Photo placeholder */}
          <div className="hero-photo" role="img" aria-label="Photo de profil de Diallo Mamadou">
            DM
          </div>

          <h1 className="hero-name">Diallo Mamadou</h1>
          <p className="hero-title">Professeur de Lycée</p>

          <div className="hero-stats" aria-label="Statistiques clés">
            <span>2+ ans d'enseignement</span>
            <span className="sep" aria-hidden="true">|</span>
            <span>3 établissements</span>
            <span className="sep" aria-hidden="true">|</span>
            <span>Côte d'Ivoire</span>
          </div>

          <div className="hero-ctas">
            <a href="/cv-diallo-mamadou.pdf" download className="btn-primary" id="hero-download-btn">
              <Download size={16} aria-hidden="true" />
              Télécharger mon CV
            </a>
            <a href="#contact" className="btn-outline" id="hero-contact-btn">
              Me contacter
            </a>
          </div>
        </div>

        <div className="hero-scroll-hint" aria-hidden="true">
          <span>Défiler</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          À PROPOS
          ══════════════════════════════════════════════ */}
      <section id="about" className="about-section" aria-label="À propos">
        <div className="about-inner">
          <div className="about-left">
            <span className="section-label">01</span>
            <h2 className="section-title">
              À <em>propos</em>
            </h2>
          </div>

          <div className="about-divider" aria-hidden="true" />

          <div className="about-right">
            {CV.about.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          EXPÉRIENCES
          ══════════════════════════════════════════════ */}
      <section id="experience" className="exp-section" aria-label="Expériences professionnelles">
        <div className="section-header">
          <span className="section-label">02</span>
          <h2 className="section-title">
            Expé<em>riences</em>
          </h2>
        </div>

        <div className="timeline" role="list">
          <div className="timeline-line" aria-hidden="true" />

          {CV.experiences.map((exp, i) => (
            <article
              key={i}
              className={`exp-card exp-card--${i % 2 === 0 ? 'left' : 'right'}`}
              role="listitem"
              id={`exp-${i}`}
            >
              <div className="timeline-dot" aria-hidden="true" />
              <div className="exp-card-inner">
                <span className="exp-period">{exp.period}</span>
                <h3>{exp.role}</h3>
                <p className="exp-company">{exp.company}</p>
                <p className="exp-desc">{exp.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          COMPÉTENCES
          ══════════════════════════════════════════════ */}
      <section id="competences" className="skills-section" aria-label="Compétences">
        <div className="section-header">
          <span className="section-label">03</span>
          <h2 className="section-title light">
            Compé<em>tences</em>
          </h2>
        </div>

        <div className="skills-grid" role="list">
          {CV.skills.map((skill, i) => (
            <SkillCard key={i} skill={skill} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FORMATION
          ══════════════════════════════════════════════ */}
      <section id="formation" className="formation-section" aria-label="Formation académique">
        <div className="section-header">
          <span className="section-label">04</span>
          <h2 className="section-title light">
            For<em>mation</em>
          </h2>
        </div>

        <div className="formation-list" role="list">
          {CV.formation.map((f, i) => (
            <article key={i} className="formation-card" role="listitem" id={`formation-${i}`}>
              <span className="formation-year">{f.year}</span>
              <div className="formation-info">
                <h3>{f.degree}</h3>
                <p>{f.school}</p>
                {f.detail && <span className="formation-detail">{f.detail}</span>}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CONTACT
          ══════════════════════════════════════════════ */}
      <section id="contact" className="contact-section" aria-label="Contact">
        <div className="contact-content">
          <span className="section-label light">05</span>
          <h2 className="section-title">
            <em>Travaillons</em> ensemble
          </h2>
          <p>
            Disponible pour des opportunités d'enseignement, de formation
            ou de collaboration pédagogique en Côte d'Ivoire.
          </p>

          <div className="contact-links">
            <a href={`mailto:${CV.contact.email}`} className="contact-link" id="contact-email-link">
              <Mail size={19} aria-hidden="true" />
              <span>{CV.contact.email}</span>
            </a>
            <a href="#" className="contact-link" id="contact-location-link">
              <MapPin size={19} aria-hidden="true" />
              <span>{CV.contact.location}</span>
            </a>
          </div>

          <a href="/cv-diallo-mamadou.pdf" download className="btn-primary large" id="contact-download-btn">
            <Download size={18} aria-hidden="true" />
            Télécharger mon CV
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════ */}
      <footer className="site-footer" role="contentinfo">
        <p>
          <strong>Diallo Mamadou</strong>
          {' '}— Fait avec le vibe coding · 2024
        </p>
        <div className="online-indicator" aria-label="Statut : en ligne">
          <span className="dot-pulse" aria-hidden="true" />
          <span>En ligne</span>
        </div>
      </footer>

    </div>
  );
}
