"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, 
  Users, 
  Calendar, 
  Target, 
  CheckCircle, 
  ArrowRight,
  Star,
  Building,
  GraduationCap,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

export default function App() {
  const [language, setLanguage] = useState<'de' | 'en'>('de');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1618593158420-ec88ec1c69fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3JrcGxhY2UlMjBkaXZlcnNpdHl8ZW58MXx8fHwxNzY5MTE4Nzc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "TechBridge Switzerland",
      subtitle: "Dein Weg in den Schweizer Tech-Arbeitsmarkt"
    },
    {
      url: "https://images.unsplash.com/photo-1765438863717-49fca900f861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRyYWluaW5nJTIwd29ya3Nob3B8ZW58MXx8fHwxNzY5MDU2ODQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Praxisorientiertes Training",
      subtitle: "3-Monats-Programm für nachhaltigen Erfolg"
    },
    {
      url: "https://images.unsplash.com/photo-1554686177-87b3c0e1a575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjBjb2FjaGluZyUyMHNlc3Npb258ZW58MXx8fHwxNzY5MTIwODIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Persönliches Coaching",
      subtitle: "Individuelle Unterstützung auf deinem Karriereweg"
    },
    {
      url: "https://images.unsplash.com/photo-1763739527636-d3d8cac52d6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBuZXR3b3JraW5nJTIwZXZlbnR8ZW58MXx8fHwxNzY5MTIwODIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Networking & Kontakte",
      subtitle: "Verbinde dich mit Top-Unternehmen in der Schweiz"
    }
  ];

  const teamMembers = [
    {
      name: "Tamara Weber",
      position: "Programmleiterin & Career Coach",
      bio: "10+ Jahre Erfahrung in der Karriereberatung und Arbeitsmarktintegration. Spezialisiert auf Tech-Recruiting und internationale Talentförderung.",
      email: "tamara@techbridge.ch",
      linkedin: "https://linkedin.com/in/tamara-weber",
      image: "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTA1MzcyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Julia Schneider",
      position: "Integration Specialist",
      bio: "Expertin für interkulturelle Kommunikation und Arbeitsmarktintegration. Mehrjährige Erfahrung in der Begleitung von Geflüchteten und Migranten.",
      email: "julia@techbridge.ch",
      linkedin: "https://linkedin.com/in/julia-schneider",
      image: "https://images.unsplash.com/photo-1590650467980-8eadfa86ff48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMHdvcmtwbGFjZXxlbnwxfHx8fDE3NjkxMjA4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Alper Yilmaz",
      position: "Tech Mentor & Employer Relations",
      bio: "Tech-Industrie-Veteran mit umfangreichem Netzwerk in der Schweizer IT-Branche. Baut Brücken zwischen Talenten und Top-Arbeitgebern.",
      email: "alper@techbridge.ch",
      linkedin: "https://linkedin.com/in/alper-yilmaz",
      image: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjkxMTcyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const content = {
    de: {
      nav: {
        program: "Programm",
        structure: "Struktur",
        outcomes: "Resultate",
        team: "Team",
        contact: "Kontakt"
      },
      hero: {
        badge: "NEXT STEP CH ⭐",
        title: "TechBridge Program",
        organizer: "Organisiert von TechLegion Verein",
        subtitle: "Der nächste Schritt in den Schweizer Tech-Arbeitsmarkt",
        description: "Ein 3-monatiges Integrationsprogramm für Personen mit bestehendem Potenzial – gezielt befähigt für rasche und nachhaltige Arbeitsmarktintegration.",
        cta: "Jetzt bewerben",
        secondary: "Mehr erfahren",
        cohortAnnouncement: "Nächste Kohorte startet im März 2026 • Jetzt anmelden!"
      },
      applicationForm: {
        title: "Bewerbung für TechBridge Programm",
        subtitle: "Werde Teil der nächsten Kohorte",
        firstName: "Vorname",
        lastName: "Nachname",
        email: "E-Mail-Adresse",
        phone: "Telefonnummer",
        status: "Status",
        statusOptions: [
          "Schutzstatus S (Ukraine)",
          "Sozialhilfe",
          "Integrationsleistungen",
          "Andere"
        ],
        background: "Beruflicher Hintergrund",
        backgroundPlaceholder: "Beschreibe kurz deine berufliche Erfahrung...",
        motivation: "Motivation",
        motivationPlaceholder: "Warum möchtest du am TechBridge Programm teilnehmen?",
        germanLevel: "Deutschkenntnisse",
        germanLevels: ["A1", "A2", "B1", "B2", "C1", "C2"],
        submit: "Bewerbung absenden",
        cancel: "Abbrechen"
      },
      stats: [
        { number: "3", label: "Monate", sublabel: "Strukturiertes Programm" },
        { number: "15-25", label: "Teilnehmer", sublabel: "Pro Kohorte" },
        { number: "100%", label: "Praxisnah", sublabel: "Arbeitsmarktorientiert" }
      ],
      about: {
        title: "Arbeitsmarktintegration durch gezieltes Coaching",
        subtitle: "Pilotprojekt Kanton Zürich",
        description: "Das Projekt unterstützt die kantonalen Integrationsziele, indem es Personen mit bestehendem Potenzial gezielt befähigt, rasch und nachhaltig in den Schweizer Arbeitsmarkt einzutreten.",
        goal: {
          title: "Programmziel",
          text: "Stärkung der Arbeitsmarktfähigkeit von Personen in der Schweiz, die soziale oder integrationsbezogene Unterstützung erhalten, mit besonderem Fokus auf Personen mit Schutzstatus S."
        },
        target: {
          title: "Zielgruppe",
          groups: [
            "Personen mit Sozialhilfe",
            "Integrationsleistungen",
            "Status-S-Unterstützung (Ukrainer*innen)",
            "Bestehende berufliche oder Ausbildungshintergründe",
            "Hohe Motivation zur Arbeitsaufnahme"
          ]
        }
      },
      structure: {
        title: "Programmstruktur",
        subtitle: "3 Monate – Aktivierungsmassnahme",
        phases: [
          {
            month: "Monat 1",
            title: "Orientierung & Standortbestimmung",
            focus: "Sich selbst und den Schweizer Arbeitsmarkt verstehen",
            items: [
              "CV-Überprüfung und Anpassung an Schweizer Standards",
              "Geheimnisse von Bewerbungsschreiben und Zeugnissen",
              "Identifikation persönlicher Stärken",
              "Professionelle Selbstpräsentation",
              "Einführung in die Schweizer Arbeitskultur",
              "Aufbau von Sprachkompetenz"
            ]
          },
          {
            month: "Monat 2",
            title: "Aktivierung & Praxiseinblicke",
            focus: "Reale Orientierung und Vertrauen aufbauen",
            items: [
              "Mock-Interviews und Coaching",
              "Bewerbungsstrategie (wo & wie)",
              "Besuche bei lokalen Unternehmen",
              "Jobmessen und Networking-Events",
              "Gastvorträge von Arbeitgebenden",
              "Erfahrungsaustausch mit erfolgreichen Teilnehmenden"
            ]
          },
          {
            month: "Monat 3",
            title: "Übergang in Erwerbstätigkeit",
            focus: "Vermittlung und nachhaltige Platzierung",
            items: [
              "Individuelle Karriereplanung",
              "Persönlicher Entwicklungsplan",
              "Finales CV & LinkedIn Review",
              "Direkte Unternehmensvorstellungen",
              "Kontakte zu Recruitern",
              "Bewerbungsunterstützung und Verhandlungsgrundlagen"
            ]
          }
        ]
      },
      outcomes: {
        title: "Zielerreichung & Wirkung",
        subtitle: "Messbare Erfolge für nachhaltige Integration",
        primary: {
          title: "Primäres Ziel",
          metric: "Anzahl Teilnehmende mit Jobangeboten",
          description: "Während oder kurz nach dem Programm"
        },
        secondary: [
          "Reduktion der Abhängigkeit von Sozialhilfe",
          "Programm-Abschlussrate",
          "Teilnehmerzufriedenheit",
          "Arbeitgeber-Feedback",
          "Verkürzte Dauer bis Arbeitsmarkteintritt"
        ]
      },
      benefits: {
        title: "Warum dieses Programm funktioniert",
        items: [
          {
            icon: Target,
            title: "Schnell & Praktisch",
            description: "Fokus auf Aktivierung statt langwierige Umschulungen"
          },
          {
            icon: Building,
            title: "Auf Kompetenzen aufbauen",
            description: "Nutzt bestehende Fähigkeiten statt bei Null anzufangen"
          },
          {
            icon: TrendingUp,
            title: "Reduktion der Langzeitabhängigkeit",
            description: "Schnellere Integration = weniger Unterstützungskosten"
          },
          {
            icon: Users,
            title: "Win-Win-Situation",
            description: "Teilnehmende gewinnen Eigenständigkeit, Arbeitgebende gewinnen Talente"
          }
        ]
      },
      alignment: {
        title: "Strategische Ausrichtung",
        description: "Das Programm unterstützt direkt die Ziele von:",
        programs: [
          "Kantonale Integrationsprogramme (KIP)",
          "Integrationsagenda Schweiz (IAS)",
          "Arbeitsmarktintegration von Personen mit Schutzstatus S",
          "Reduktion langfristiger Sozialhilfeabhängigkeit"
        ]
      },
      team: {
        title: "Unser Team",
        subtitle: "Erfahrene Experten für deine Karriere"
      },
      contact: {
        title: "Jetzt teilnehmen oder Partner werden",
        description: "Interessiert am Programm? Kontaktieren Sie uns für weitere Informationen oder eine Zusammenarbeit.",
        info: {
          location: "Pilotprojekt: Kanton Zürich / Zug",
          email: "info@techbridge.ch",
          phone: "+41 XX XXX XX XX"
        },
        form: {
          name: "Ihr Name",
          email: "E-Mail-Adresse",
          message: "Ihre Nachricht",
          role: "Ich bin...",
          roles: [
            "Teilnehmer*in",
            "Gemeinde / Sozialdienst",
            "Arbeitgeber / Partner",
            "Andere"
          ],
          submit: "Nachricht senden"
        }
      },
      newsletter: {
        title: "Bleiben Sie informiert",
        subtitle: "Abonnieren Sie unseren Newsletter für Updates über das Programm, Erfolgsgeschichten und Karrieretipps.",
        emailPlaceholder: "Ihre E-Mail-Adresse",
        subscribe: "Abonnieren"
      }
    },
    en: {
      nav: {
        program: "Program",
        structure: "Structure",
        outcomes: "Outcomes",
        team: "Team",
        contact: "Contact"
      },
      hero: {
        badge: "NEXT STEP CH ⭐",
        title: "TechBridge Program",
        organizer: "Organized by TechLegion Verein",
        subtitle: "The next step into the Swiss tech labor market",
        description: "A 3-month integration program for people with existing potential - specifically empowered for rapid and sustainable labor market integration.",
        cta: "Apply Now",
        secondary: "Learn More",
        cohortAnnouncement: "Next cohort starts March 2026 • Register now!"
      },
      applicationForm: {
        title: "Application for TechBridge Program",
        subtitle: "Join the next cohort",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        phone: "Phone Number",
        status: "Status",
        statusOptions: [
          "Protection Status S (Ukraine)",
          "Social Assistance",
          "Integration Support",
          "Other"
        ],
        background: "Professional Background",
        backgroundPlaceholder: "Briefly describe your professional experience...",
        motivation: "Motivation",
        motivationPlaceholder: "Why do you want to participate in the TechBridge Program?",
        germanLevel: "German Language Level",
        germanLevels: ["A1", "A2", "B1", "B2", "C1", "C2"],
        submit: "Submit Application",
        cancel: "Cancel"
      },
      stats: [
        { number: "3", label: "Months", sublabel: "Structured Program" },
        { number: "15-25", label: "Participants", sublabel: "Per Cohort" },
        { number: "100%", label: "Practical", sublabel: "Employment-Focused" }
      ],
      about: {
        title: "Workforce Integration through Targeted Coaching",
        subtitle: "Pilot Project Canton Zurich",
        description: "The program supports cantonal integration goals by specifically empowering people with existing potential to enter the Swiss labor market quickly and sustainably.",
        goal: {
          title: "Program Goal",
          text: "To strengthen the employability of people residing in Switzerland who receive social or integration-related support, with a particular focus on people with protection status S."
        },
        target: {
          title: "Target Group",
          groups: [
            "People receiving social assistance",
            "Integration support",
            "Status S support (Ukrainians)",
            "Existing professional or educational backgrounds",
            "High motivation to work"
          ]
        }
      },
      structure: {
        title: "Program Structure",
        subtitle: "3 Months – Activation Measure",
        phases: [
          {
            month: "Month 1",
            title: "Orientation & Assessment",
            focus: "Understanding yourself and the Swiss job market",
            items: [
              "CV review and adaptation to Swiss standards",
              "Secrets of cover letters and certificates",
              "Identification of personal strengths",
              "Professional self-presentation",
              "Introduction to Swiss workplace culture",
              "Language confidence building"
            ]
          },
          {
            month: "Month 2",
            title: "Activation & Market Exposure",
            focus: "Real-world orientation and confidence building",
            items: [
              "Mock interviews and coaching",
              "Job application strategy (where & how)",
              "Visits to local companies",
              "Job fairs and networking events",
              "Guest talks from employers",
              "Exchange with successful participants"
            ]
          },
          {
            month: "Month 3",
            title: "Transition to Employment",
            focus: "Placement and sustainable integration",
            items: [
              "Individual career pathway definition",
              "Personal development plan",
              "Final CV & LinkedIn review",
              "Direct company introductions",
              "Recruiter contacts",
              "Application support and negotiation basics"
            ]
          }
        ]
      },
      outcomes: {
        title: "Outcomes & Impact",
        subtitle: "Measurable success for sustainable integration",
        primary: {
          title: "Primary Goal",
          metric: "Number of participants receiving job offers",
          description: "During or shortly after the program"
        },
        secondary: [
          "Reduction of dependency on social assistance",
          "Program completion rate",
          "Participant satisfaction",
          "Employer feedback",
          "Shortened duration until labor market entry"
        ]
      },
      benefits: {
        title: "Why This Program Works",
        items: [
          {
            icon: Target,
            title: "Fast & Practical",
            description: "Focus on activation instead of lengthy retraining"
          },
          {
            icon: Building,
            title: "Build on Competencies",
            description: "Leverages existing skills instead of starting from zero"
          },
          {
            icon: TrendingUp,
            title: "Reduce Long-term Dependency",
            description: "Faster integration = lower support costs"
          },
          {
            icon: Users,
            title: "Win-Win Situation",
            description: "Participants gain independence, employers gain talent"
          }
        ]
      },
      alignment: {
        title: "Strategic Alignment",
        description: "The program directly supports the objectives of:",
        programs: [
          "Cantonal Integration Programs (KIP)",
          "Swiss Integration Agenda (IAS)",
          "Labor market integration of persons with protection status S",
          "Reduction of long-term social assistance dependency"
        ]
      },
      team: {
        title: "Our Team",
        subtitle: "Experienced experts for your career"
      },
      contact: {
        title: "Join Now or Become a Partner",
        description: "Interested in the program? Contact us for more information or collaboration.",
        info: {
          location: "Pilot Project: Canton Zurich / Zug",
          email: "info@techbridge.ch",
          phone: "+41 XX XXX XX XX"
        },
        form: {
          name: "Your Name",
          email: "Email Address",
          message: "Your Message",
          role: "I am...",
          roles: [
            "Participant",
            "Municipality / Social Service",
            "Employer / Partner",
            "Other"
          ],
          submit: "Send Message"
        }
      },
      newsletter: {
        title: "Stay Informed",
        subtitle: "Subscribe to our newsletter for program updates, success stories, and career tips.",
        emailPlaceholder: "Your email address",
        subscribe: "Subscribe"
      }
    }
  };

  const t = content[language];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Briefcase className="w-8 h-8 text-blue-600" />
              <div>
                <div className="font-bold text-xl text-gray-900">TechBridge</div>
                <div className="text-xs text-gray-600">by TechLegion Verein</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('program')} className="text-gray-700 hover:text-blue-600 transition-colors">
                {t.nav.program}
              </button>
              <button onClick={() => scrollToSection('structure')} className="text-gray-700 hover:text-blue-600 transition-colors">
                {t.nav.structure}
              </button>
              <button onClick={() => scrollToSection('outcomes')} className="text-gray-700 hover:text-blue-600 transition-colors">
                {t.nav.outcomes}
              </button>
              <button onClick={() => scrollToSection('team')} className="text-gray-700 hover:text-blue-600 transition-colors">
                {t.nav.team}
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors">
                {t.nav.contact}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
                className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700"
              >
                {language === 'de' ? 'EN' : 'DE'}
              </button>
              <button 
                onClick={() => setShowApplicationForm(true)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                {t.hero.cta}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Carousel Banner */}
      <section className="pt-16 relative">
        <div className="relative h-[500px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={carouselImages[currentSlide].url}
                alt={carouselImages[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white font-medium mb-4"
                  >
                    {t.hero.badge}
                  </motion.div>
                  
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl md:text-6xl font-bold mb-3"
                  >
                    {carouselImages[currentSlide].title}
                  </motion.h1>
                  
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-2xl mb-6"
                  >
                    {carouselImages[currentSlide].subtitle}
                  </motion.p>
                  
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => setShowApplicationForm(true)}
                    className="px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors inline-flex items-center gap-2"
                  >
                    {t.hero.cta}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Cohort Announcement Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 text-center">
          <p className="text-lg font-semibold flex items-center justify-center gap-2">
            <Star className="w-5 h-5 animate-pulse" />
            {t.hero.cohortAnnouncement}
          </p>
        </div>
      </section>

      {/* Application Form Modal */}
      <AnimatePresence>
        {showApplicationForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowApplicationForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.applicationForm.title}</h2>
              <p className="text-gray-600 mb-6">{t.applicationForm.subtitle}</p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      {t.applicationForm.firstName}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      {t.applicationForm.lastName}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      {t.applicationForm.email}
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      {t.applicationForm.phone}
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      {t.applicationForm.status}
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all">
                      {t.applicationForm.statusOptions.map((status, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      {t.applicationForm.germanLevel}
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all">
                      {t.applicationForm.germanLevels.map((level, index) => (
                        <option key={index} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {t.applicationForm.background}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={t.applicationForm.backgroundPlaceholder}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {t.applicationForm.motivation}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={t.applicationForm.motivationPlaceholder}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    className="flex-1 px-8 py-4 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold transition-colors"
                  >
                    {t.applicationForm.cancel}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    {t.applicationForm.submit}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="program" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {t.about.title}
              </h2>
              <p className="text-xl text-blue-600 mb-6">{t.about.subtitle}</p>
              <p className="text-lg text-gray-600 mb-8">
                {t.about.description}
              </p>

              <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  {t.about.goal.title}
                </h3>
                <p className="text-gray-700">
                  {t.about.goal.text}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  {t.about.target.title}
                </h3>
                <ul className="space-y-2">
                  {t.about.target.groups.map((group, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{group}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1590650467980-8eadfa86ff48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMHdvcmtwbGFjZXxlbnwxfHx8fDE3NjkxMjA4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Professional woman in workplace"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Structure Section */}
      <section id="structure" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.structure.title}
            </h2>
            <p className="text-xl text-gray-600">{t.structure.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.structure.phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-blue-600">{phase.month}</div>
                    <div className="text-xl font-bold text-gray-900">{phase.title}</div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 italic">"{phase.focus}"</p>
                
                <ul className="space-y-3">
                  {phase.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section id="outcomes" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.outcomes.title}
            </h2>
            <p className="text-xl text-gray-600">{t.outcomes.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-8 h-8" />
                <h3 className="text-2xl font-bold">{t.outcomes.primary.title}</h3>
              </div>
              <div className="text-3xl font-bold mb-3">{t.outcomes.primary.metric}</div>
              <p className="text-blue-100">{t.outcomes.primary.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sekundäre Ziele</h3>
              <ul className="space-y-3">
                {t.outcomes.secondary.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {t.benefits.items.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <Icon className="w-10 h-10 text-blue-600 mb-4" />
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Strategic Alignment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              {t.alignment.title}
            </h3>
            <p className="text-gray-700 mb-6">{t.alignment.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.alignment.programs.map((program, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{program}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.team.title}
            </h2>
            <p className="text-xl text-gray-600">{t.team.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="h-80 overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-6">{member.bio}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <a href={`mailto:${member.email}`} className="hover:text-blue-600 transition-colors">
                        {member.email}
                      </a>
                    </div>
                  </div>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.contact.title}
            </h2>
            <p className="text-xl text-gray-600">{t.contact.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Kontaktinformationen</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Standort</div>
                      <div className="text-gray-600">{t.contact.info.location}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">E-Mail</div>
                      <a href={`mailto:${t.contact.info.email}`} className="text-blue-600 hover:text-blue-700">
                        {t.contact.info.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Telefon</div>
                      <a href={`tel:${t.contact.info.phone}`} className="text-blue-600 hover:text-blue-700">
                        {t.contact.info.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1739298061740-5ed03045b280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NjkxMDY4NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Team collaboration"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      {t.contact.form.name}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      placeholder="Max Mustermann"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      {t.contact.form.email}
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      placeholder="max@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      {t.contact.form.role}
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all">
                      {t.contact.form.roles.map((role, index) => (
                        <option key={index} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      {t.contact.form.message}
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Ihre Nachricht..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    {t.contact.form.submit}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              {t.newsletter.title}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {t.newsletter.subtitle}
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder={t.newsletter.emailPlaceholder}
                className="flex-1 px-6 py-4 rounded-lg border-2 border-transparent focus:border-white outline-none transition-all"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-lg bg-white text-blue-600 hover:bg-blue-50 font-semibold transition-colors whitespace-nowrap"
              >
                {t.newsletter.subscribe}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="font-bold text-xl">TechBridge</div>
                  <div className="text-sm text-gray-400">by TechLegion Verein</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {language === 'de' 
                  ? 'Der nächste Schritt in den Schweizer Tech-Arbeitsmarkt'
                  : 'The next step into the Swiss tech labor market'
                }
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => scrollToSection('program')} className="hover:text-white transition-colors">
                    {language === 'de' ? 'Programm' : 'Program'}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('structure')} className="hover:text-white transition-colors">
                    {language === 'de' ? 'Struktur' : 'Structure'}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('outcomes')} className="hover:text-white transition-colors">
                    {language === 'de' ? 'Resultate' : 'Outcomes'}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('team')} className="hover:text-white transition-colors">
                    {language === 'de' ? 'Team' : 'Team'}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">
                    {language === 'de' ? 'Kontakt' : 'Contact'}
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Programm</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => setShowApplicationForm(true)} className="hover:text-white transition-colors">
                    {language === 'de' ? 'Jetzt bewerben' : 'Apply Now'}
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {language === 'de' ? 'Erfolgsgeschichten' : 'Success Stories'}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {language === 'de' ? 'FAQ' : 'FAQ'}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {language === 'de' ? 'Partner werden' : 'Become a Partner'}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>{t.contact.info.location}</li>
                <li>
                  <a href={`mailto:${t.contact.info.email}`} className="hover:text-white transition-colors">
                    {t.contact.info.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${t.contact.info.phone}`} className="hover:text-white transition-colors">
                    {t.contact.info.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2026 TechBridge Program - TechLegion Verein. {language === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}</p>
            <p className="mt-2">
              {language === 'de' 
                ? 'Pilotprojekt in Zusammenarbeit mit Kanton Zürich, Sozialdiensten und Integrationspartnern.'
                : 'Pilot project in collaboration with Canton Zurich, social services, and integration partners.'
              }
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
