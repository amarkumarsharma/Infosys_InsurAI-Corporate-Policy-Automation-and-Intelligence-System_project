import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* =========================
   FUTURISTIC DESIGN SYSTEM
========================= */
const theme = {
  bg: "#020617",
  surface: "rgba(15,23,42,0.65)",
  border: "rgba(148,163,184,0.15)",

  textPrimary: "#F8FAFC",
  textSecondary: "#94A3B8",

  neonBlue: "#38BDF8",
  neonPurple: "#818CF8",
  neonPink: "#F472B6",
  neonGreen: "#10B981",

  gradientMain:
    "linear-gradient(135deg, #020617 0%, #020617 40%, #0F172A 100%)",

  gradientNeon:
    "linear-gradient(135deg, #38BDF8 0%, #818CF8 50%, #F472B6 100%)",

  glow:
    "0 0 40px rgba(56,189,248,0.35), 0 0 80px rgba(129,140,248,0.15)",
};

/* =========================
   ANIMATIONS
========================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const glowHover = {
  whileHover: {
    y: -8,
    boxShadow: theme.glow,
    transition: { duration: 0.3 },
  },
};

const scaleHover = {
  whileHover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
  whileTap: {
    scale: 0.98,
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const floatAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

/* =========================
   MAIN COMPONENT
========================= */
const HomePage = () => {
  const navigate = useNavigate();
   const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNavClick = (event, sectionId) => {
    event.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <div style={styles.page}>

      {/* ================= NAVBAR ================= */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={styles.navbar}
      >
        <div style={styles.navContent}>
          <div style={styles.brand}>
            <img 
              src="project-logo-img-dark.svg" 
              alt="InsurAI Logo" 
              style={styles.logo}
            />
          </div>

          <div style={styles.navLinks}>
            <a
              href="#platform"
              style={styles.navLink}
              onClick={(e) => handleNavClick(e, "platform")}
            >
              Platform
            </a>
            <a
              href="#features"
              style={styles.navLink}
              onClick={(e) => handleNavClick(e, "features")}
            >
              Features
            </a>
            <a
              href="#workflow"
              style={styles.navLink}
              onClick={(e) => handleNavClick(e, "workflow")}
            >
              Workflow
            </a>
            <a
              href="#technology"
              style={styles.navLink}
              onClick={(e) => handleNavClick(e, "technology")}
            >
              Technology
            </a>
            <a
              href="#about"
              style={styles.navLink}
              onClick={(e) => handleNavClick(e, "about")}
            >
              About
            </a>
            <a
              href="#login"
              style={styles.navBtn}
              onClick={(e) => handleNavClick(e, "login")}
            >
              Get Started
            </a>
          </div>
        </div>
      </motion.nav>

      {/* ================= HERO ================= */}
      <section style={styles.hero}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.9 }}
          style={styles.heroContent}
        >
          <h1 style={styles.heroTitle}>
            Insurance, Reinvented with
            <span style={styles.heroGradient}> Artificial Intelligence</span>
          </h1>

          <p style={styles.heroSubtitle}>
            A next-generation insurance platform powered by advanced AI algorithms,
            featuring automated claims processing, intelligent fraud detection,
            real-time analytics, and enterprise-grade security. Transform your
            insurance operations with cutting-edge technology and seamless workflow automation.
          </p>

          <motion.div
            style={styles.heroActions}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              type="button"
              style={styles.primaryBtn}
              onClick={() => scrollToSection("login")}
            >
              Get Started
            </button>
            <button
              type="button"
              style={styles.secondaryBtn}
              onClick={() => scrollToSection("workflow")}
            >
              Explore System
            </button>
          </motion.div>
        </motion.div>

        {/* GLOW ORBS */}
        <div style={styles.orbBlue} />
        <div style={styles.orbPurple} />
      </section>

      {/* ================= PLATFORM ================= */}
      <section id="platform" style={styles.section}>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={styles.sectionTitle}
        >
          Platform <span style={styles.heroGradient}>Capabilities</span>
        </motion.h2>

        <motion.div 
          style={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ 
                y: -12,
                boxShadow: theme.glow,
                borderColor: "rgba(56,189,248,0.5)"
              }}
              viewport={{ once: true }}
              style={styles.card}
            >
              <motion.div 
                style={styles.icon}
                animate={{
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {f.icon}
              </motion.div>
              <h3 style={styles.cardTitle}>{f.title}</h3>
              <p style={styles.cardText}>{f.desc}</p>
              <div style={styles.cardGlow} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= FEATURES SHOWCASE ================= */}
      <section id="features" style={styles.section}>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={styles.sectionTitle}
        >
          Advanced <span style={styles.heroGradient}>Features</span>
        </motion.h2>

        <div style={styles.featuresShowcase}>
          {advancedFeatures.map((feature, i) => (
            <motion.div
              key={i}
              {...glowHover}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              style={styles.featureShowcaseCard}
            >
              <div style={styles.featureShowcaseIcon}>{feature.icon}</div>
              <div style={styles.featureShowcaseContent}>
                <h3 style={styles.featureShowcaseTitle}>{feature.title}</h3>
                <p style={styles.featureShowcaseDesc}>{feature.desc}</p>
                <ul style={styles.featureList}>
                  {feature.points.map((point, idx) => (
                    <li key={idx} style={styles.featureListItem}>
                      <span style={styles.checkmark}>✓</span> {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= STATISTICS ================= */}
      <section style={styles.statsSection}>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={styles.sectionTitle}
        >
          Platform <span style={styles.heroGradient}>Performance</span>
        </motion.h2>

        <div style={styles.statsGrid}>
          {statistics.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              style={styles.statCard}
            >
              <div style={styles.statIcon}>{stat.icon}</div>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
              <div style={styles.statDesc}>{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= WORKFLOW ================= */}
      <section id="workflow" style={styles.sectionAlt}>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={styles.sectionTitle}
        >
          Intelligent <span style={styles.heroGradient}>Workflow</span>
        </motion.h2>

        <motion.div 
          style={styles.workflow}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div style={styles.workflowLine} />
          {workflow.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 0 40px rgba(56,189,248,0.4), 0 8px 32px rgba(0,0,0,0.4)",
                borderColor: "rgba(56,189,248,0.5)"
              }}
              viewport={{ once: true }}
              style={styles.workflowStep}
            >
              <motion.div 
                style={styles.stepIndex}
                animate={floatAnimation}
              >
                {i + 1}
              </motion.div>
              <div style={{ flex: 1 }}>
                <h4 style={styles.stepTitle}>{step.title}</h4>
                <p style={styles.stepText}>{step.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= ROLE SELECTION (NEW) ================= */}
      <section id="login" style={styles.section}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <h2 style={styles.sectionTitle}>
            Choose Your <span style={styles.heroGradient}>Access Portal</span>
          </h2>
          <p style={{ ...styles.cardText, fontSize: "1.1rem", marginTop: "1rem" }}>
            Select your role to access your personalized dashboard
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={styles.accessGrid}
        >
          {accessActions.map((action, idx) => (
            <motion.div
              key={action.title}
              {...scaleHover}
              transition={{ delay: idx * 0.1 }}
              style={{
                ...styles.accessCard,
                borderColor: action.accent,
              }}
            >
              <div style={styles.accessIcon}>{action.icon}</div>
              <div>
                <p style={styles.accessLabel}>{action.title}</p>
                <p style={styles.accessDesc}>{action.desc}</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  ...styles.accessButton,
                  color: action.accent,
                  borderColor: action.accent,
                }}
                onClick={() => navigate(action.path)}
              >
                {action.button}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= TECHNOLOGY STACK (HUB-SPOKE DESIGN) ================= */}
      <section id="technology" style={styles.section}>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={styles.sectionTitle}
        >
          Core Application <span style={styles.heroGradient}>Modules</span>
        </motion.h2>

        <motion.div 
          style={styles.techHubContainer}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* SVG for all connecting lines - single SVG for all arrows */}
          <svg
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 1,
            }}
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <marker
                id="arrowhead-main"
                markerWidth="12"
                markerHeight="10"
                refX="10"
                refY="5"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <polygon 
                  points="0 0, 12 5, 0 10" 
                  fill="#7DD3FC"
                />
              </marker>
            </defs>
            
            {/* Draw all 6 arrows from center to each card position */}
            {techStack.map((item, i) => {
              const totalItems = techStack.length; // 6 items
              const angleDeg = (i * 360) / totalItems - 90; // Start from top, go clockwise
              const angleRad = angleDeg * (Math.PI / 180);
              
              const centerX = 500; // Center of viewBox
              const centerY = 500;
              const hubRadius = 90; // Radius of central hub
              const cardDistance = 340; // Distance to card center
              const cardRadius = 120; // Half of card width (approximate)
              const gap = 16; // 1rem gap
              
              // modules that should be moved 20% farther from hub
              const outerModules = ["Policy Manager", "Fraud Detection", "Analytics Dashboard", "Integrations & API"];
              const distanceMultiplier = outerModules.includes(item.name) ? 1.2 : 1;
              const effectiveCardDistance = cardDistance * distanceMultiplier;
               
              // Line starts from hub edge + gap
              const startX = centerX + Math.cos(angleRad) * (hubRadius + gap);
              const startY = centerY + Math.sin(angleRad) * (hubRadius + gap);
              
              // Line ends at card edge - gap
              const endX = centerX + Math.cos(angleRad) * (effectiveCardDistance - cardRadius - gap);
              const endY = centerY + Math.sin(angleRad) * (effectiveCardDistance - cardRadius - gap);
              
              return (
                <motion.line
                  key={i}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="#7DD3FC"
                  strokeWidth="3"
                  strokeDasharray="14 10"
                  strokeLinecap="round"
                  markerEnd="url(#arrowhead-main)"
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(125,211,252,0.5))",
                  }}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  viewport={{ once: true }}
                />
              );
            })}
          </svg>

          {/* Central Hub */}
          <motion.div 
            style={styles.techCentralHub}
            animate={{
              boxShadow: [
                "0 0 40px rgba(56,189,248,0.4), 0 0 80px rgba(129,140,248,0.3)",
                "0 0 60px rgba(129,140,248,0.5), 0 0 100px rgba(56,189,248,0.4)",
                "0 0 40px rgba(56,189,248,0.4), 0 0 80px rgba(129,140,248,0.3)",
              ],
              transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div style={styles.hubIcon}>🚀</div>
            <div style={styles.hubTitle}>InsurAI</div>
            <div style={styles.hubSubtitle}>Core Platform</div>
          </motion.div>

          {techStack.map((mod, i) => {
            const totalItems = techStack.length; // 6 items
            const angleDeg = (i * 360) / totalItems - 90; // Start from top, go clockwise
            const angleRad = angleDeg * (Math.PI / 180);
            const cardDistance = 340; // base used by SVG above
            
            const outerModules = ["Policy Manager", "Fraud Detection", "Analytics Dashboard", "Integrations & API"];
            const multiplier = outerModules.includes(mod.name) ? 1.2 : 1;
            const basePercent = 36; // original percent distance
            const xPercent = Math.cos(angleRad) * (basePercent * multiplier);
            const yPercent = Math.sin(angleRad) * (basePercent * multiplier);
 
             return (
               <motion.div
                 key={i}
                 style={{
                   ...styles.techModuleCard,
                   left: `calc(50% + ${xPercent}%)`,
                   top: `calc(50% + ${yPercent}%)`,
                 }}
                 initial={{ opacity: 0, scale: 0.5 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                 whileHover={{
                   scale: 1.06,
                   boxShadow: "0 0 50px rgba(56,189,248,0.5), 0 15px 50px rgba(0,0,0,0.5)",
                   borderColor: "rgba(56,189,248,0.8)",
                 }}
                 viewport={{ once: true }}
               >
                 <div style={styles.moduleIcon}>{mod.icon}</div>
                 <h4 style={styles.moduleName}>{mod.name}</h4>
                 <div style={styles.moduleCategory}>{mod.category}</div>
                 <p style={styles.moduleDesc}>{mod.desc}</p>
               </motion.div>
             );
           })}
        </motion.div>
      </section>

      {/* ================= ROLES INFO ================= */}
      <section id="roles" style={styles.section}>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={styles.sectionTitle}
        >
          Role-Based Architecture
        </motion.h2>

        <div style={styles.grid}>
          {roles.map((r, i) => (
            <motion.div
              key={i}
              {...glowHover}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              style={styles.card}
            >
              <div style={styles.icon}>{r.icon}</div>
              <h3 style={styles.cardTitle}>{r.title}</h3>
              <p style={styles.cardText}>{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT / TESTIMONIALS ================= */}
      <section id="about" style={styles.section}>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={styles.sectionTitle}
        >
          Why Choose <span style={styles.heroGradient}>InsurAI</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={styles.aboutContent}
        >
          <div style={styles.aboutContainer}>
            <p style={styles.aboutText}>
              InsurAI is revolutionizing the insurance industry by combining artificial intelligence
              with enterprise-grade infrastructure. Our platform automates complex workflows, reduces
              processing time by up to 90%, and provides real-time insights that drive better business
              decisions. Built for scale and designed for security, InsurAI serves organizations of
              all sizes with a flexible, role-based architecture.
            </p>
            <p style={styles.aboutText}>
              From automated claim processing to intelligent fraud detection, our AI-powered engine
              handles millions of transactions while maintaining accuracy and compliance. With
              comprehensive dashboards for every role—Employee, HR, Agent, and Admin—everyone gets
              the tools they need to succeed.
            </p>
          </div>
        </motion.div>

        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ ...styles.sectionTitle, fontSize: "2rem", marginTop: "4rem", marginBottom: "3rem" }}
        >
          What Our <span style={styles.heroGradient}>Clients Say</span>
        </motion.h3>

        <div style={styles.testimonialsWrapper}>
          <motion.div 
            style={styles.testimonialsScroller}
            animate={{
              x: [0, -2000],
            }}
            transition={{
              x: {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, i) => (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(56,189,248,0.4), 0 12px 48px rgba(0,0,0,0.5)",
                  borderColor: "rgba(56,189,248,0.6)",
                }}
                style={styles.testimonialCard}
              >
                <div style={styles.quoteIcon}>"</div>
                <p style={styles.testimonialText}>{testimonial.text}</p>
                <div style={styles.testimonialAuthor}>
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    style={styles.authorAvatar}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/60/667eea/ffffff?text=' + testimonial.name.charAt(0);
                    }}
                  />
                  <div>
                    <div style={styles.authorName}>{testimonial.name}</div>
                    <div style={styles.authorRole}>{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div>
            <div style={styles.footerBrand}>
              Insur<span style={styles.brandAccent}>AI</span>
            </div>
            <p style={styles.footerText}>
              AI-first infrastructure for automated, intelligent insurance.
            </p>
          </div>

          <div style={styles.footerLinks}>
            <button
              type="button"
              style={styles.footerLink}
              onClick={() => scrollToSection("platform")}
            >
              Platform
            </button>
            <button
              type="button"
              style={styles.footerLink}
              onClick={() => scrollToSection("workflow")}
            >
              Workflow
            </button>
            <button
              type="button"
              style={styles.footerLink}
              onClick={() => scrollToSection("roles")}
            >
              Roles
            </button>
            <button
              type="button"
              style={styles.footerLink}
              onClick={() => scrollToSection("login")}
            >
              Access
            </button>
          </div>

          <div style={styles.footerMeta}>
            <span>© 2025 InsurAI</span>
            <span>Enterprise Insurance Automation</span>
          </div>
        </div>
      </footer>

      {/* Global Scrollbar Styles */}
      <style>{`
        ::-webkit-scrollbar {
          width: 12px;
        }
        ::-webkit-scrollbar-track {
          background: linear-gradient(180deg, rgba(2,6,23,0.95) 0%, rgba(15,23,42,0.9) 100%);
          border-left: 1px solid rgba(56,189,248,0.25);
          box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(56,189,248,0.9) 0%, rgba(129,140,248,0.85) 50%, rgba(244,114,182,0.9) 100%);
          borderRadius: 6px;
          border: 2px solid rgba(2,6,23,0.9);
          boxShadow: 0 0 15px rgba(56,189,248,0.6), inset 0 0 5px rgba(255,255,255,0.2);
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(56,189,248,1) 0%, rgba(129,140,248,1) 50%, rgba(244,114,182,1) 100%);
          boxShadow: 0 0 25px rgba(56,189,248,0.9), inset 0 0 8px rgba(255,255,255,0.3);
          transform: scale(1.05);
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(56,189,248,0.8) rgba(15,23,42,0.9);
        }
      `}</style>
    </div>
  );
};

/* =========================
   DATA
========================= */
const features = [
  { icon: "🧠", title: "AI Claim Engine", desc: "Automated validation and fraud detection using intelligent rules." },
  { icon: "📊", title: "Real-Time Analytics", desc: "Live dashboards for Admin and HR decision making." },
  { icon: "🔐", title: "Zero-Trust Security", desc: "Enterprise-grade authentication and role-based access." },
  { icon: "⚡", title: "Instant Processing", desc: "Optimized backend pipelines for fast approvals." }
];

const advancedFeatures = [
  {
    icon: "🤖",
    title: "AI-Powered Automation",
    desc: "Leverage machine learning algorithms to automate claim processing, policy validation, and risk assessment.",
    points: [
      "Automated fraud detection with 95%+ accuracy",
      "Smart claim routing and prioritization",
      "Predictive analytics for risk management",
      "Natural language processing for document analysis"
    ]
  },
  {
    icon: "📈",
    title: "Advanced Analytics Dashboard",
    desc: "Comprehensive real-time insights across all business operations with customizable reporting.",
    points: [
      "Real-time KPI tracking and monitoring",
      "Custom report generation and exports",
      "Predictive trend analysis",
      "Multi-dimensional data visualization"
    ]
  },
  {
    icon: "🛡️",
    title: "Enterprise Security",
    desc: "Bank-grade security with multi-layer protection, encryption, and compliance standards.",
    points: [
      "End-to-end encryption (AES-256)",
      "Multi-factor authentication (MFA)",
      "Role-based access control (RBAC)",
      "Compliance with GDPR, HIPAA, and SOC 2"
    ]
  },
  {
    icon: "⚙️",
    title: "Seamless Integration",
    desc: "Connect with existing systems and third-party services through our robust API infrastructure.",
    points: [
      "RESTful API with comprehensive documentation",
      "Pre-built integrations with major platforms",
      "Webhook support for real-time events",
      "Scalable microservices architecture"
    ]
  }
];

const statistics = [
  {
    icon: "⚡",
    value: "90%",
    label: "Faster Processing",
    desc: "Average reduction in claim processing time"
  },
  {
    icon: "🎯",
    value: "95%",
    label: "Accuracy Rate",
    desc: "AI-powered fraud detection accuracy"
  },
  {
    icon: "👥",
    value: "10K+",
    label: "Active Users",
    desc: "Employees and agents using the platform"
  },
  {
    icon: "💰",
    value: "$5M+",
    label: "Saved Annually",
    desc: "Cost reduction through automation"
  }
];

const techStack = [
  {
    icon: "🧠",
    name: "AI Claim Engine",
    category: "Core",
    desc: "Automated claim validation, fraud scoring and priority routing — integrated with policy state."
  },
  {
    icon: "🗂️",
    name: "Policy Manager",
    category: "Core",
    desc: "Full lifecycle policy creation, versioning, endorsements and rule-driven validations."
  },
  {
    icon: "🛡️",
    name: "Fraud Detection",
    category: "Security",
    desc: "Real-time anomaly detection using ML models and rule-based heuristics for high-risk flags."
  },
  {
    icon: "🔁",
    name: "Workflow Orchestrator",
    category: "Platform",
    desc: "Configurable pipelines for approvals, escalations and automated settlements."
  },
  {
    icon: "📊",
    name: "Analytics Dashboard",
    category: "Observability",
    desc: "Role-based insights, trend analysis and exportable reports for Agents, HR and Admins."
  },
  {
    icon: "🔗",
    name: "Integrations & API",
    category: "Integration",
    desc: "REST/GraphQL APIs, webhooks and prebuilt connectors for third-party systems and payroll."
  }
];

const testimonials = [
  {
    text: "InsurAI has transformed our claim processing workflow. What used to take days now takes hours. The AI-powered fraud detection alone has saved us millions.",
    name: "Sarah Johnson",
    role: "Chief Operations Officer, GlobalInsure",
    avatar: "https://i.pravatar.cc/150?img=1",
    company: "GlobalInsure"
  },
  {
    text: "The role-based dashboards are incredibly intuitive. Our HR team can now manage policies for thousands of employees with ease. Game-changing platform!",
    name: "Michael Chen",
    role: "HR Director, TechCorp Industries",
    avatar: "https://i.pravatar.cc/150?img=13",
    company: "TechCorp"
  },
  {
    text: "As an agent, I can now assist 3x more customers per day. The automated workflows and real-time data access make my job so much more efficient.",
    name: "Emily Rodriguez",
    role: "Senior Insurance Agent, SecureLife",
    avatar: "https://i.pravatar.cc/150?img=5",
    company: "SecureLife"
  },
  {
    text: "The AI-driven insights have revolutionized how we assess risk. Our underwriting accuracy has improved by 40% since implementing InsurAI.",
    name: "David Kumar",
    role: "Chief Risk Officer, PrimeShield Insurance",
    avatar: "https://i.pravatar.cc/150?img=12",
    company: "PrimeShield"
  },
  {
    text: "Implementation was seamless and our team was up and running in just two weeks. The support team is exceptional and always responsive.",
    name: "Jennifer Martinez",
    role: "IT Director, Apex Financial Services",
    avatar: "https://i.pravatar.cc/150?img=9",
    company: "Apex Financial"
  },
  {
    text: "The real-time analytics dashboard gives us visibility we never had before. Decision-making has become data-driven and significantly faster.",
    name: "Robert Thompson",
    role: "VP of Operations, MegaCorp Insurance",
    avatar: "https://i.pravatar.cc/150?img=14",
    company: "MegaCorp"
  },
  {
    text: "Our customer satisfaction scores have increased by 35% since adopting InsurAI. The platform has truly elevated our service quality.",
    name: "Lisa Anderson",
    role: "Customer Success Manager, SafeGuard Inc",
    avatar: "https://i.pravatar.cc/150?img=10",
    company: "SafeGuard"
  },
  {
    text: "The fraud detection capabilities are unmatched. We've identified and prevented over $2M in fraudulent claims in just six months.",
    name: "James Wilson",
    role: "Fraud Investigation Lead, TrustSecure",
    avatar: "https://i.pravatar.cc/150?img=15",
    company: "TrustSecure"
  }
];

const workflow = [
  { title: "Policy Creation", text: "Admin defines coverage, premiums, and lifecycle." },
  { title: "Enrollment", text: "Employees select policies aligned to their needs." },
  { title: "Claim Submission", text: "Digital claim filing with incident metadata." },
  { title: "AI Verification", text: "System validates policy and claim authenticity." },
  { title: "Settlement", text: "Approval and disbursement workflow." }
];

const roles = [
  { icon: "👤", title: "Employee", desc: "Claims, policies, and coverage tracking." },
  { icon: "🏢", title: "HR", desc: "Policy allocation and workforce insights." },
  { icon: "🧑‍💼", title: "Agent", desc: "Customer onboarding and assistance." },
  { icon: "⚙️", title: "Admin", desc: "System governance and analytics." }
];

const accessActions = [
   {
    title: "Employee Portal",
    desc: "Manage policies, claims, and support.",
    button: "Employee Login",
    path: "/employee/login",
    icon: "👤",
    accent: theme.neonPurple,
  },
  {
    title: "HR Command",
    desc: "Oversee policies and workforce analytics.",
    button: "HR Login",
    path: "/hr/login",
    icon: "🏢",
    accent: theme.neonPink,
  },
  {
    title: "Agent Desk",
    desc: "Assist customers and process requests.",
    button: "Agent Login",
    path: "/agent/login",
    icon: "🧑‍💼",
    accent: theme.neonGreen,
  },
  {
    title: "Admin Control",
    desc: "Configure systems and monitor analytics.",
    button: "Admin Login",
    path: "/admin/login",
    icon: "⚙️",
    accent: theme.neonPurple,
  },
];

/* =========================
   STYLES
========================= */
const styles = {
  page: {
    fontFamily: "Inter, system-ui, sans-serif",
    background: theme.gradientMain,
    color: theme.textPrimary,
    overflowX: "hidden",
  },

  '@global': {
    '::-webkit-scrollbar': {
      width: '12px',
    },
    '::-webkit-scrollbar-track': {
      background: 'linear-gradient(180deg, rgba(2,6,23,0.9) 0%, rgba(15,23,42,0.8) 100%)',
      borderLeft: '1px solid rgba(56,189,248,0.2)',
    },
    '::-webkit-scrollbar-thumb': {
      background: 'linear-gradient(180deg, rgba(56,189,248,0.8) 0%, rgba(129,140,248,0.8) 50%, rgba(244,114,182,0.8) 100%)',
      borderRadius: '6px',
      border: '2px solid rgba(2,6,23,0.9)',
      boxShadow: '0 0 10px rgba(56,189,248,0.5)',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: 'linear-gradient(180deg, rgba(56,189,248,1) 0%, rgba(129,140,248,1) 50%, rgba(244,114,182,1) 100%)',
      boxShadow: '0 0 20px rgba(56,189,248,0.8)',
    },
  },

  navbar: {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 100,
    background: "rgba(2,6,23,0.85)",
    backdropFilter: "blur(20px) saturate(180%)",
    borderBottom: `1px solid rgba(56,189,248,0.2)`,
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  },

  navContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  brand: {
    fontSize: "1.6rem",
    fontWeight: 700,
    letterSpacing: "0.5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.7rem",
  },

  logo: {
    height: "45px",
    width: "auto",
    display: "block",
    objectFit: "contain",
  },

  brandAccent: {
    background: theme.gradientNeon,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  navLinks: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },

  navLink: {
    color: theme.textSecondary,
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.3s",
    cursor: "pointer",
  },

  navBtn: {
    background: theme.gradientNeon,
    padding: "0.5rem 1.3rem",
    borderRadius: "10px",
    color: "#020617",
    fontWeight: 700,
    textDecoration: "none",
    transition: "transform 0.3s",
    cursor: "pointer",
  },

  hero: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingTop: "6rem",
    background: "radial-gradient(ellipse at top, rgba(56,189,248,0.15) 0%, transparent 50%)",
    overflow: "hidden",
  },

  heroContent: {
    maxWidth: "900px",
    textAlign: "center",
    zIndex: 2,
  },

  heroTitle: {
    fontSize: "3.2rem",
    fontWeight: 800,
    lineHeight: 1.2,
  },

  heroGradient: {
    background: theme.gradientNeon,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  heroSubtitle: {
    marginTop: "1.5rem",
    fontSize: "1.15rem",
    color: theme.textSecondary,
  },

  heroActions: {
    marginTop: "2.5rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },

  primaryBtn: {
    background: theme.gradientNeon,
    padding: "0.9rem 1.8rem",
    borderRadius: "14px",
    color: "#020617",
    fontWeight: 700,
    textDecoration: "none",
    transition: "transform 0.3s",
    border: "none",
    cursor: "pointer",
  },

  secondaryBtn: {
    border: `1px solid ${theme.border}`,
    padding: "0.9rem 1.8rem",
    borderRadius: "14px",
    color: theme.textPrimary,
    textDecoration: "none",
    transition: "all 0.3s",
    background: "transparent",
    cursor: "pointer",
  },

  orbBlue: {
    position: "absolute",
    width: "420px",
    height: "420px",
    background: "rgba(56,189,248,0.25)",
    filter: "blur(140px)",
    top: "20%",
    left: "-10%",
  },

  orbPurple: {
    position: "absolute",
    width: "420px",
    height: "420px",
    background: "rgba(129,140,248,0.25)",
    filter: "blur(160px)",
    bottom: "10%",
    right: "-10%",
  },

  section: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "6rem 2rem",
  },

  sectionAlt: {
    maxWidth: "1200px",
    margin: "4rem auto",
    padding: "6rem 3rem",
    background: "linear-gradient(135deg, rgba(15,23,42,0.6) 0%, rgba(2,6,23,0.8) 100%)",
    borderRadius: "40px",
    border: "1px solid rgba(56,189,248,0.2)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
    position: "relative",
    overflow: "hidden",
  },

  sectionTitle: {
    textAlign: "center",
    fontSize: "2.8rem",
    fontWeight: 800,
    marginBottom: "4rem",
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "2rem",
  },

  card: {
    background: "linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.6) 100%)",
    border: `1px solid rgba(56,189,248,0.2)`,
    borderRadius: "24px",
    padding: "2.5rem",
    backdropFilter: "blur(24px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
    position: "relative",
    overflow: "hidden",
  },

  icon: {
    fontSize: "2.8rem",
    marginBottom: "1.2rem",
    filter: "drop-shadow(0 4px 12px rgba(56,189,248,0.3))",
  },

  cardGlow: {
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)",
    pointerEvents: "none",
    opacity: 0,
    transition: "opacity 0.5s ease",
  },

  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
  },

  cardText: {
    fontSize: "0.95rem",
    color: theme.textSecondary,
  },

  workflow: {
    maxWidth: "920px",
    margin: "0 auto",
    display: "grid",
    gap: "1.5rem",
    position: "relative",
    padding: "3rem 2.5rem",
    borderRadius: "32px",
    background: "linear-gradient(180deg, rgba(15,23,42,0.85) 0%, rgba(2,6,23,0.95) 100%)",
    border: "1px solid rgba(56,189,248,0.25)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 0 40px rgba(56,189,248,0.08)",
  },

  workflowLine: {
    position: "absolute",
    left: "50%",
    top: "2rem",
    bottom: "2rem",
    width: "4px",
    transform: "translateX(-50%)",
    background: "linear-gradient(180deg, rgba(56,189,248,0) 0%, rgba(56,189,248,1) 35%, rgba(56,189,248,0.2) 100%)",
    boxShadow: "0 0 20px rgba(56,189,248,0.6)",
    borderRadius: "8px",
  },

  workflowStep: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
    position: "relative",
    background: "rgba(2,6,23,0.85)",
    padding: "1.8rem 2.2rem",
    borderRadius: "24px",
    border: "1px solid rgba(56,189,248,0.25)",
    backdropFilter: "blur(24px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.6), inset 0 0 25px rgba(56,189,248,0.05)",
    overflow: "hidden",
  },

  stepIndex: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "rgba(56,189,248,0.15)",
    color: theme.neonBlue,
    fontWeight: 700,
    fontSize: "1.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    border: "2px solid rgba(56,189,248,0.4)",
    boxShadow: "0 0 25px rgba(56,189,248,0.4)",
  },

  stepTitle: {
    fontWeight: 700,
    fontSize: "1.4rem",
    color: theme.textPrimary,
    marginBottom: "0.35rem",
  },

  stepText: {
    fontSize: "1rem",
    color: theme.textSecondary,
    lineHeight: 1.6,
  },

 accessGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.5rem",
    marginBottom: "3rem",
  },

 accessCard: {
    background: "linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.6) 100%)",
    border: `1px solid ${theme.border}`,
    borderRadius: "24px",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    minHeight: "220px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    position: "relative",
    overflow: "hidden",
  },

 accessIcon: {
    fontSize: "2.8rem",
    filter: "drop-shadow(0 4px 12px rgba(56,189,248,0.4))",
  },

 accessLabel: {
    fontSize: "1.1rem",
    fontWeight: 600,
    marginBottom: "0.4rem",
  },

  accessDesc: {
    color: theme.textSecondary,
    fontSize: "0.9rem",
    lineHeight: 1.4,
    marginBottom: "0.6rem",
  },

  roleFeatures: {
    marginBottom: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },

  accessButton: {
    marginTop: "auto",
    borderRadius: "14px",
    border: "2px solid transparent",
    background: "rgba(15,23,42,0.6)",
    fontWeight: 700,
    padding: "0.9rem 1.5rem",
    cursor: "pointer",
    fontSize: "0.95rem",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
  },

  footer: {
    padding: "3rem 2rem",
    color: theme.textSecondary,
    fontSize: "0.9rem",
    borderTop: `1px solid ${theme.border}`,
    background: "rgba(2,6,23,0.9)",
  },


  footerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.5rem",
    alignItems: "center",
  },

  footerBrand: {
    fontSize: "1.4rem",
    fontWeight: 700,
    marginBottom: "0.4rem",
  },

  footerText: {
    margin: 0,
    color: theme.textSecondary,
    lineHeight: 1.5,
  },

  footerLinks: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  footerLink: {
    background: "transparent",
    border: `1px solid ${theme.border}`,
    borderRadius: "10px",
    padding: "0.6rem 1rem",
    color: theme.textPrimary,
    cursor: "pointer",
    fontWeight: 500,
  },

  footerMeta: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    alignItems: "flex-end",
  },

  featuresShowcase: {
    display: "grid",
    gap: "2rem",
    maxWidth: "1000px",
    margin: "0 auto",
  },

  featureShowcaseCard: {
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    borderRadius: "20px",
    padding: "2.5rem",
    display: "flex",
    gap: "2rem",
    backdropFilter: "blur(20px)",
    alignItems: "flex-start",
  },

  featureShowcaseIcon: {
    fontSize: "3.5rem",
    flexShrink: 0,
  },

  featureShowcaseContent: {
    flex: 1,
  },

  featureShowcaseTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    marginBottom: "0.8rem",
  },

  featureShowcaseDesc: {
    color: theme.textSecondary,
    marginBottom: "1.2rem",
    lineHeight: 1.6,
  },

  featureList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "grid",
    gap: "0.7rem",
  },

  featureListItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.7rem",
    color: theme.textSecondary,
    fontSize: "0.95rem",
  },

  checkmark: {
    color: theme.neonGreen,
    fontWeight: 700,
    fontSize: "1.1rem",
  },

  statsSection: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "6rem 2rem",
    background: "rgba(15,23,42,0.35)",
    borderRadius: "32px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
  },

  statCard: {
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    borderRadius: "20px",
    padding: "2.5rem",
    textAlign: "center",
    backdropFilter: "blur(20px)",
  },

  statIcon: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },

  statValue: {
    fontSize: "3rem",
    fontWeight: 800,
    background: theme.gradientNeon,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "0.5rem",
  },

  statLabel: {
    fontSize: "1.1rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
  },

  statDesc: {
    fontSize: "0.9rem",
    color: theme.textSecondary,
  },

  techHubContainer: {
    position: "relative",
    width: "1000px",
    height: "1000px",
    maxWidth: "100%",
    margin: "2rem auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  techCentralHub: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, rgba(56,189,248,0.3) 0%, rgba(129,140,248,0.3) 50%, rgba(244,114,182,0.3) 100%)",
    border: "3px solid rgba(56,189,248,0.6)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(20px)",
    zIndex: 10,
  },

  hubIcon: {
    fontSize: "2.8rem",
    marginBottom: "0.3rem",
    filter: "drop-shadow(0 4px 12px rgba(56,189,248,0.6))",
  },

  hubTitle: {
    fontSize: "1.3rem",
    fontWeight: 800,
    color: theme.textPrimary,
    textAlign: "center",
    marginBottom: "0.2rem",
  },

  hubSubtitle: {
    fontSize: "0.75rem",
    color: theme.neonBlue,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "1px",
  },

  techModuleCard: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    width: "260px",
    background: "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.85) 100%)",
    border: "2px solid rgba(56,189,248,0.3)",
    borderRadius: "16px",
    padding: "1.25rem",
    backdropFilter: "blur(24px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
    zIndex: 5,
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",
    marginLeft: "-8.2rem",
    marginTop: "-8rem",
  },

  moduleIcon: {
    fontSize: "2.2rem",
    marginBottom: "0.8rem",
    display: "flex",
    justifyContent: "center",
    filter: "drop-shadow(0 4px 12px rgba(56,189,248,0.4))",
  },

  moduleName: {
    fontSize: "1.05rem",
    fontWeight: 700,
    marginBottom: "0.4rem",
    color: theme.textPrimary,
    textAlign: "center",
  },

  moduleCategory: {
    display: "inline-block",
    padding: "0.25rem 0.7rem",
    borderRadius: "999px",
    background: "rgba(56,189,248,0.15)",
    color: theme.neonBlue,
    fontSize: "0.7rem",
    fontWeight: 700,
    marginBottom: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    width: "100%",
    textAlign: "center",
  },

  moduleDesc: {
    fontSize: "0.8rem",
    color: theme.textSecondary,
    lineHeight: 1.4,
    textAlign: "center",
  },

  moduleGlow: {
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)",
    pointerEvents: "none",
    opacity: 0,
    transition: "opacity 0.5s ease",
  },

  aboutContent: {
    maxWidth: "900px",
    margin: "0 auto 3rem",
    textAlign: "center",
  },

  aboutContainer: {
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    padding: "2rem",
    borderRadius: "16px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 30px rgba(2,6,23,0.45)",
  },

  aboutText: {
    fontSize: "1.1rem",
    color: theme.textSecondary,
    lineHeight: 1.8,
    marginBottom: "1.5rem",
  },

  testimonialsWrapper: {
    width: "100%",
    overflow: "hidden",
    position: "relative",
    padding: "2rem 0",
    maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
    WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
  },

  testimonialsScroller: {
    display: "flex",
    gap: "2rem",
    width: "fit-content",
  },

  testimonialCard: {
    background: "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.7) 100%)",
    border: `2px solid rgba(56,189,248,0.3)`,
    borderRadius: "24px",
    padding: "2.5rem",
    backdropFilter: "blur(24px)",
    position: "relative",
    minWidth: "400px",
    maxWidth: "400px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
    flexShrink: 0,
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  quoteIcon: {
    fontSize: "4rem",
    color: theme.neonBlue,
    opacity: 0.3,
    position: "absolute",
    top: "1rem",
    right: "1.5rem",
    fontFamily: "Georgia, serif",
  },

  testimonialText: {
    fontSize: "1rem",
    color: theme.textSecondary,
    lineHeight: 1.7,
    marginBottom: "1.5rem",
    fontStyle: "italic",
  },

  testimonialAuthor: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },

  authorAvatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid rgba(56,189,248,0.4)",
    boxShadow: "0 4px 12px rgba(56,189,248,0.3)",
  },

  authorName: {
    fontWeight: 600,
    fontSize: "1rem",
  },

  authorRole: {
    fontSize: "0.85rem",
    color: theme.textSecondary,
  },
};

export default HomePage;
