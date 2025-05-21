"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Menu,
  MoveDown,
  X,
  Sun,
  Moon,
  Instagram,
  Linkedin,
  Github,
  Send,
  CheckCircle2,
  Phone,
  MapPin,
  Youtube,
  Facebook,
  Code,
  Database,
  Shield,
  Layers,
  Server,
  FileCode,
} from "lucide-react";
import { Montserrat, Poppins, Playfair_Display } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
});

interface Project {
  id: string;
  title: string;
  category: string;
  description: string[];
  link?: string;
  duration: string;
  featured?: boolean;
  tags?: string[];
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  number: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

interface Skill {
  name: string;
  percentage: number;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSuccess, setFormSuccess] = useState(false);
  const controls = useAnimation();

  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const showToast = (message: string, type: string = "info") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "" }), 3000);
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value.trim() !== "") {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { name: "", email: "", subject: "", message: "" };

    if (contactForm.name.trim() === "") {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (contactForm.email.trim() === "") {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(contactForm.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (contactForm.subject.trim() === "") {
      newErrors.subject = "Subject is required";
      valid = false;
    }

    if (contactForm.message.trim() === "") {
      newErrors.message = "Message is required";
      valid = false;
    }

    setFormErrors(newErrors);

    if (valid) {
      const form = document.createElement("form");
      form.action = "https://formspree.io/f/xleqrrjq";
      form.method = "POST";
      form.style.display = "none";

      Object.entries(contactForm).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      setFormSuccess(true);
      showToast("Your message has been sent successfully!", "success");

      setTimeout(() => {
        setFormSuccess(false);
        setContactForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 2000);
    }
  };

  const services: Service[] = [
    {
      id: "fullstack",
      title: "Full-Stack Development",
      description:
        "End-to-end development across front-end and back-end, creating responsive and dynamic web applications tailored to your business needs.",
      icon: <Code size={24} />,
      number: "01",
    },
    {
      id: "database",
      title: "Database Design & Management",
      description:
        "Optimized and scalable database solutions, including SQL and NoSQL, to store and manage data effectively and securely.",
      icon: <Database size={24} />,
      number: "02",
    },
    {
      id: "api",
      title: "API Development & Integration",
      description:
        "Building and integrating RESTful APIs for seamless communication between different software components and third-party services.",
      icon: <Shield size={24} />,
      number: "03",
    },
    {
      id: "uiux",
      title: "UI/UX Design & Development",
      description:
        "Creating intuitive, user-friendly interfaces with attention to detail, ensuring a smooth and enjoyable user experience across all devices.",
      icon: <Layers size={24} />,
      number: "04",
    },
    {
      id: "cloud",
      title: "Cloud Integration & Deployment",
      description:
        "Deploying and managing applications on cloud platforms like AWS and Google Cloud, ensuring scalability, reliability, and performance.",
      icon: <Server size={24} />,
      number: "05",
    },
    {
      id: "code-review",
      title: "Code Review & Optimization",
      description:
        "Improving code quality and performance through detailed review and optimization, ensuring maintainable, efficient, and robust solutions.",
      icon: <FileCode size={24} />,
      number: "06",
    },
  ];

  const projects: Project[] = [
    {
      id: "portfolio",
      title: "Personal Portfolio Website",
      category: "Full-Stack Web App",
      duration: "May 2025",
      featured: true,
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      link: "https://atulguptag.github.io",
      description: [
        "Developed a modern, responsive portfolio website using Next.js 13+ with TypeScript, showcasing professional experience and projects with an elegant design.",
        "Implemented smooth animations and transitions using Framer Motion, creating an engaging user experience with scroll-triggered animations and interactive elements.",
        "Built a fully responsive design with Tailwind CSS, featuring a glass-morphism aesthetic, gradient effects, and a seamless dark/light mode toggle.",
        "Integrated a functional contact form with validation, toast notifications for user feedback, and optimized performance for fast loading times.",
      ],
    },
    {
      id: "joke-generator",
      title: "AI-Powered Joke Generator",
      category: "Full-Stack Web App",
      duration: "Jan 2025",
      featured: true,
      tags: ["React", "Go", "OAuth", "JWT"],
      link: "https://jokemaster-go.netlify.app/",
      description: [
        "Developed a full-stack joke generator web application using React for the frontend and Go with the Gin framework for the backend.",
        "Integrated Google OAuth 2.0 for secure user authentication and implemented JWT-based session management.",
        "Designed and deployed RESTful APIs to handle joke creation, retrieval, and manage user-specific joke histories.",
        "Configured continuous deployment to Google App Engine, enabling automatic deployment whenever code is pushed to the GitHub repository.",
      ],
    },
    {
      id: "ecommerce",
      title: "Django e-Commerce Website",
      category: "Web Application",
      duration: "June - July 2024",
      featured: true,
      tags: ["Django", "Python", "OAuth", "SQLite"],
      link: "https://djangoecommercewebsite.pythonanywhere.com/",
      description: [
        "Built a robust e-commerce platform using Python Django that incorporated secure user authentication, email verification for new accounts, and OAuth integration with Google/Facebook.",
        "Designed essential e-commerce functionalities, including product browsing, category filters, and an advanced cart systems which improved user experience and engagement.",
        "Established a live deployment of the project on PythonAnywhere, featuring seamless integration with existing systems; enhanced user experience for 10+ testers.",
        "Utilized a full-stack tech, including Python, HTML, CSS, JavaScript, and SQLite, optimizing the user interface for seamless browsing and purchase flow across devices.",
      ],
    },
    {
      id: "user-auth",
      title: "User Authentication System",
      category: "Full-Stack App",
      duration: "Oct - Nov 2023",
      featured: true,
      tags: ["React", "Django", "JWT", "REST API"],
      link: "https://user-auth-using-react-django.netlify.app/",
      description: [
        "Developed a robust full-stack web application for user authentication using React for the frontend and Django REST Framework for the backend.",
        "Implemented a token-based authentication system using JSON Web Tokens (JWT), allowing users to authenticate without the need for traditional sessions.",
        "Built a secure login and registration system with email verification, password strength validation, and bcrypt for hashing passwords.",
        "Developed a password reset functionality with email verification to help users recover their accounts securely and effortlessly.",
      ],
    },
  ];

  const experiences: Experience[] = [
    {
      id: "moneyy",
      title: "Python Developer Intern",
      company: "Moneyy.ai",
      duration: "Feb 2025 - Present",
      responsibilities: [
        "Developed and maintained multiple Python scripts for stocks processing and analysis, ensuring high efficiency and accuracy.",
        "Collaborated with the team members to design and implement backtesting on Stocks, improving the accuracy of predictions by 25%.",
        "Worked on integrating multiple APIs to fetch real-time stocks, enhancing the overall code efficiency.",
      ],
    },
    {
      id: "worksnet",
      title: "Software Developer Intern",
      company: "WorksNet Pvt. Limited",
      duration: "June 2024 - December 2024",
      responsibilities: [
        "Architected and implemented full-stack educational management system using Python (Django) and React.js, resulting in 20% revenue growth through automation of examination workflows.",
        "Designed and implemented a Social Auto Posting features especially LinkedIn auto-posting system to schedule and share posts automatically on the company's page.",
        "Integrated AI-driven content generation to create engaging topics, detailed write-ups, and concise key points, making content creation faster and more efficient.",
        "Spearheaded development of AI-powered content automation pipeline using Python, increasing social media engagement by 15% and reducing content creation time by 60%.",
      ],
    },
  ];

  const skills: Skill[] = [
    { name: "Python / Django", percentage: 85 },
    { name: "HTML, CSS & JavaScript", percentage: 80 },
    { name: "React.js", percentage: 70 },
    { name: "Go", percentage: 40 },
    { name: "MySQL / PostgreSQL", percentage: 70 },
    { name: "Redis", percentage: 50 },
    { name: "Git & GitHub", percentage: 80 },
    { name: "AWS / GCP", percentage: 60 },
    { name: "TypeScript / Next.js", percentage: 60 },
    { name: "Tailwind CSS", percentage: 65 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        controls.start({ opacity: 1, y: 0 });
      } else {
        controls.start({ opacity: 0, y: 50 });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  const mainBgClass = darkMode
    ? "bg-black text-white"
    : "bg-white text-gray-900";

  const navBgClass = darkMode
    ? "bg-black/80 backdrop-blur-md border-b border-gray-800"
    : "bg-white/80 backdrop-blur-md border-b border-gray-200";

  const cardBgClass = darkMode
    ? "bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-md border border-white/10"
    : "bg-gradient-to-br from-gray-100 to-white/90 backdrop-blur-md border border-gray-200";

  const buttonClass = darkMode
    ? "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:border-white/40"
    : "bg-black/10 backdrop-blur-md border border-black/20 text-gray-900 hover:border-black/40";

  const inputClass = darkMode
    ? "bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-500"
    : "bg-gray-100/50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:border-purple-500";

  const borderClass = darkMode ? "border-gray-800" : "border-gray-200";

  const subtextClass = darkMode ? "text-gray-400" : "text-gray-600";

  const gradientTextClass = darkMode
    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text"
    : "bg-gradient-to-r from-indigo-600 to-purple-700 text-transparent bg-clip-text";

  return (
    <main
      className={`${montserrat.variable} ${poppins.variable} ${playfair.variable} font-sans ${mainBgClass} min-h-screen overflow-x-hidden relative transition-colors duration-300`}
    >
      {darkMode ? (
        <div className="fixed inset-0 bg-black z-0">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-black to-black"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071')] mix-blend-overlay opacity-10 bg-cover"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-white z-0">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200 via-white to-white"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071')] mix-blend-color-burn opacity-5 bg-cover"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
        </div>
      )}

      <nav
        className={`fixed top-0 left-0 right-0 ${navBgClass} z-50 px-4 md:px-12 py-6 flex justify-between items-center transition-colors duration-300`}
      >
        <div className="hidden md:flex space-x-8">
          <button
            onClick={() => scrollToSection(homeRef)}
            className={`text-md ${
              darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-700 hover:text-black"
            } transition-colors cursor-pointer font-medium`}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection(aboutRef)}
            className={`text-md ${
              darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-700 hover:text-black"
            } transition-colors cursor-pointer font-medium`}
          >
            About
          </button>
          <button
            onClick={() => scrollToSection(skillsRef)}
            className={`text-md ${
              darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-700 hover:text-black"
            } transition-colors cursor-pointer font-medium`}
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection(projectsRef)}
            className={`text-md ${
              darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-700 hover:text-black"
            } transition-colors cursor-pointer font-medium`}
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection(experienceRef)}
            className={`text-md ${
              darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-700 hover:text-black"
            } transition-colors cursor-pointer font-medium`}
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection(servicesRef)}
            className={`text-md ${
              darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-700 hover:text-black"
            } transition-colors cursor-pointer font-medium`}
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection(contactRef)}
            className={`text-md ${
              darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-700 hover:text-black"
            } transition-colors cursor-pointer font-medium`}
          >
            Contact
          </button>
        </div>

        <div className="flex items-center">
          <span className={`text-2xl font-bold ${gradientTextClass}`}>
            Atul Gupta
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full cursor-pointer ${
              darkMode
                ? "bg-gray-800 text-yellow-400"
                : "bg-gray-200 text-gray-800"
            } transition-all`}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="hidden md:flex items-center space-x-2">
            <Mail
              size={16}
              className={darkMode ? "text-pink-400" : "text-purple-600"}
            />
            <span className={`text-md ${gradientTextClass} font-medium`}>
              atulguptag23@gmail.com
            </span>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden fixed top-20 left-0 right-0 ${
              darkMode ? "bg-black/95" : "bg-white/95"
            } backdrop-blur-md z-50 p-6 border-b ${borderClass}`}
          >
            <div className="flex flex-col space-y-6">
              <button
                onClick={() => scrollToSection(homeRef)}
                className={`text-left cursor-pointer ${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-black"
                } font-medium text-lg`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection(aboutRef)}
                className={`text-left cursor-pointer ${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-black"
                } font-medium text-lg`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection(skillsRef)}
                className={`text-left cursor-pointer ${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-black"
                } font-medium text-lg`}
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection(projectsRef)}
                className={`text-left cursor-pointer ${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-black"
                } font-medium text-lg`}
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection(experienceRef)}
                className={`text-left cursor-pointer ${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-black"
                } font-medium text-lg`}
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection(servicesRef)}
                className={`text-left cursor-pointer ${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-black"
                } font-medium text-lg`}
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection(contactRef)}
                className={`text-left cursor-pointer ${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-black"
                } font-medium text-lg`}
              >
                Contact
              </button>
              <div className="flex items-center space-x-2 pt-4 border-t border-gray-800">
                <Mail
                  size={16}
                  className={darkMode ? "text-pink-400" : "text-purple-600"}
                />
                <span className={`text-sm ${gradientTextClass} font-medium`}>
                  atulguptag23@gmail.com
                </span>
              </div>
              <div className="flex space-x-4 pt-2">
                <a
                  href="https://www.linkedin.com/in/atulguptag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    darkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-black"
                  } cursor-pointer transition-colors`}
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://www.youtube.com/@atulgupta-g/?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    darkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-black"
                  } cursor-pointer transition-colors`}
                >
                  <Youtube size={18} />
                </a>
                <a
                  href="https://www.instagram.com/itsatulguptag/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    darkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-black"
                  } cursor-pointer transition-colors`}
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://github.com/atulguptag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    darkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-black"
                  } cursor-pointer transition-colors`}
                >
                  <Github size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        ref={homeRef}
        className="relative z-10 pt-32 md:pt-40 pb-24 px-4 md:px-12 max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:space-y-24">
          <div className="flex items-center flex-col gap-24 md:gap-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div
                className={`inline-block px-4 py-1 rounded-full ${
                  darkMode ? "bg-white/10" : "bg-black/5"
                } backdrop-blur-sm text-sm font-medium mb-6`}
              >
                <span className={gradientTextClass}>
                  Full Stack Engineer & Cloud Enthusiast
                </span>
              </div>
              <h1 className="text-5xl md:text-8xl font-semibold tracking-tighter">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  HI
                  <span className="inline-block ml-1 overflow-hidden">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: 0.4,
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "mirror",
                      }}
                      className={`inline-block ${
                        darkMode ? "text-pink-500" : "text-purple-600"
                      }`}
                    >
                      ||||||||
                    </motion.span>
                  </span>{" "}
                  THERE
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  I&apos;M ATUL
                </motion.span>
                <br />
                <div className="relative h-[1.2em]">
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`${gradientTextClass} absolute`}
                    style={{ fontWeight: 700 }}
                    key="software"
                    animate={{
                      opacity: [1, 0, 0, 1],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "loop",
                      times: [0, 0.4, 0.6, 1],
                    }}
                  >
                    SOFTWARE
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`${gradientTextClass} absolute`}
                    style={{ fontWeight: 700 }}
                    key="python"
                    animate={{
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      repeatType: "loop",
                      times: [0, 0.4, 0.6, 1],
                    }}
                  >
                    PYTHON
                  </motion.span>
                </div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  DEVELOPER
                </motion.span>
              </h1>
            </motion.div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-12 md:space-y-0 md:space-x-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="space-y-4"
              >
                <h2 className="text-2xl md:text-4xl font-medium tracking-tight font-display">
                  DISCOVER THE
                  <br />
                  PROFESSIONAL
                  <br />
                  JOURNEY OF A
                  <br />
                  <span className={gradientTextClass}>DEVELOPER.</span>
                </h2>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: darkMode
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(0,0,0,0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(aboutRef)}
                  className={`flex cursor-pointer items-center space-x-2 ${buttonClass} rounded-full px-5 py-2 text-md mt-6 transition-all`}
                >
                  <span>About me</span>
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="relative"
              >
                <div
                  className={`text-lg ${subtextClass} space-y-4 max-w-md ml-auto`}
                >
                  <p className="font-sans leading-relaxed">
                    A dedicated and skilled Python Programmer with
                    specialization in Django framework, committed to staying
                    current with new technologies & industry trends. Quick
                    learning in adapting to Generative AI and new tech stacks,
                    ensuring seamless integration of cutting-edge innovations
                    into projects.
                  </p>
                  <div className="flex space-x-4 mt-6 pt-4 border-t border-gray-800">
                    <a
                      href="https://www.linkedin.com/in/atulguptag"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        darkMode
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-black"
                      } cursor-pointer transition-colors`}
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href="https://www.youtube.com/@atulgupta-g/?sub_confirmation=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        darkMode
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-black"
                      } cursor-pointer transition-colors`}
                    >
                      <Youtube size={20} />
                    </a>
                    <a
                      href="https://www.instagram.com/itsatulguptag/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        darkMode
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-black"
                      } cursor-pointer transition-colors`}
                    >
                      <Instagram size={20} />
                    </a>
                    <a
                      href="https://github.com/atulguptag"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        darkMode
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-black"
                      } cursor-pointer transition-colors`}
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
          >
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              onClick={() => scrollToSection(aboutRef)}
              className="cursor-pointer"
            >
              <MoveDown
                className={darkMode ? "text-white/70" : "text-gray-700/70"}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section
        ref={aboutRef}
        className="relative z-10 py-24 px-4 md:px-12 max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <span
              className={`text-sm ${
                darkMode ? "text-pink-500" : "text-purple-700"
              } font-medium`}
            >
              ABOUT ME
            </span>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mt-2 mb-8">
              <span className={gradientTextClass}>
                Passionate about creating meaningful digital experiences
              </span>
            </h2>

            <div
              className={`${
                darkMode ? "bg-gray-900/60" : "bg-gray-100"
              } rounded-3xl p-8 mb-8`}
            >
              <div className="flex flex-col md:flex-row gap-8 justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">21</h3>
                  <p className={subtextClass}>Years Old</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">B.Tech</h3>
                  <p className={subtextClass}>CSE Degree</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">8.46</h3>
                  <p className={subtextClass}>CGPA</p>
                </div>
              </div>
            </div>

            <p className={`text-lg ${subtextClass} mb-6 leading-relaxed`}>
              I am a self-taught python programmer with a deep passion for
              creating innovative and engaging web projects. I am committed to
              staying up-to-date with the latest trends and best practices in
              the industry. I&apos;ve gained a wealth of knowledge and skills
              through my personal projects.
            </p>

            <p className={`text-lg ${subtextClass} leading-relaxed`}>
              Any fool can write code that a computer can understand. Good
              programmers write code that humans can understand. Sometimes it
              pays to stay in bed on Monday, rather than spending the rest of
              the week debugging Monday&apos;s code.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(contactRef)}
                className={`flex cursor-pointer items-center justify-center space-x-2 ${buttonClass} rounded-full px-5 py-2 text-md transition-all`}
              >
                <span>Contact Me</span>
                <ArrowRight size={16} />
              </motion.button>

              <motion.a
                href="https://drive.google.com/your-resume-link"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Resume download coming soon!");
                }}
                className={`flex cursor-pointer items-center justify-center space-x-2 ${
                  darkMode
                    ? "bg-pink-600/20 text-pink-400 border border-pink-600/30"
                    : "bg-purple-100 text-purple-700 border border-purple-200"
                } rounded-full px-5 py-2 text-md transition-all`}
              >
                <span>Download Resume</span>
                <ArrowUpRight size={16} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2"
          >
            <div className={`${cardBgClass} rounded-3xl p-8 mb-8`}>
              <h3 className="text-2xl font-semibold mb-6">Personal Details</h3>

              <div className="space-y-4">
                <div>
                  <p className={`font-medium ${subtextClass}`}>Email</p>
                  <p className="text-lg">atulguptag23@gmail.com</p>
                </div>
                <div>
                  <p className={`font-medium ${subtextClass}`}>Location</p>
                  <p className="text-lg">Bhopal, Madhya Pradesh, India</p>
                </div>
                <div>
                  <p className={`font-medium ${subtextClass}`}>Freelance</p>
                  <p className="text-lg">Available</p>
                </div>
              </div>
            </div>

            <div className={`${cardBgClass} rounded-3xl p-8`}>
              <h3 className="text-2xl font-semibold mb-6">
                Hobbies & Interests
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`px-4 py-3 rounded-xl ${
                    darkMode ? "bg-gray-800/50" : "bg-gray-100"
                  } flex items-center space-x-2`}
                >
                  <span>🏸 Badminton</span>
                </div>
                <div
                  className={`px-4 py-3 rounded-xl ${
                    darkMode ? "bg-gray-800/50" : "bg-gray-100"
                  } flex items-center space-x-2`}
                >
                  <span>🎧 Music</span>
                </div>
                <div
                  className={`px-4 py-3 rounded-xl ${
                    darkMode ? "bg-gray-800/50" : "bg-gray-100"
                  } flex items-center space-x-2`}
                >
                  <span>🎬 Movies</span>
                </div>
                <div
                  className={`px-4 py-3 rounded-xl ${
                    darkMode ? "bg-gray-800/50" : "bg-gray-100"
                  } flex items-center space-x-2`}
                >
                  <span>💻 Coding</span>
                </div>
                <div
                  className={`px-4 py-3 rounded-xl ${
                    darkMode ? "bg-gray-800/50" : "bg-gray-100"
                  } flex items-center space-x-2`}
                >
                  <span>📚 Reading</span>
                </div>
                <div
                  className={`px-4 py-3 rounded-xl ${
                    darkMode ? "bg-gray-800/50" : "bg-gray-100"
                  } flex items-center space-x-2`}
                >
                  <span>✈️ Traveling</span>
                </div>
                <div
                  className={`px-4 py-3 rounded-xl ${
                    darkMode ? "bg-gray-800/50" : "bg-gray-100"
                  } flex items-center space-x-2`}
                >
                  <span>🏊 Swimming</span>
                </div>
                <div
                  className={`px-4 py-3 rounded-xl ${
                    darkMode ? "bg-gray-800/50" : "bg-gray-100"
                  } flex items-center space-x-2`}
                >
                  <span>🎮 Gaming</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        ref={skillsRef}
        className="relative z-10 py-24 px-4 md:px-12 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <span
                className={`text-sm ${
                  darkMode ? "text-pink-500" : "text-purple-700"
                } font-medium`}
              >
                MY EXPERTISE
              </span>
              <h2 className="text-4xl md:text-7xl font-semibold tracking-tight mt-2">
                <span className={gradientTextClass}>SKILLS</span>
              </h2>
            </div>
            <p className={`text-lg ${subtextClass} mt-4 md:mt-0 max-w-md`}>
              Attitude is more important than the past, than education, than
              money, than circumstances, than what people do or say.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${cardBgClass} rounded-2xl p-6`}
            >
              <div className="flex justify-between mb-3">
                <span className="font-medium text-lg">{skill.name}</span>
                <span
                  className={`font-medium ${
                    darkMode ? "text-pink-400" : "text-purple-600"
                  }`}
                >
                  {skill.percentage}%
                </span>
              </div>
              <div
                className={`h-3 rounded-full ${
                  darkMode ? "bg-gray-800" : "bg-gray-200"
                } overflow-hidden`}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className={`h-full ${
                    darkMode
                      ? "bg-gradient-to-r from-pink-500 to-purple-600"
                      : "bg-gradient-to-r from-indigo-600 to-purple-700"
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`mt-12 ${cardBgClass} rounded-3xl p-8`}
        >
          <h3 className="text-2xl font-semibold mb-6">Education</h3>

          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-medium">
                Bachelor of Technology - Computer Science Engineering
              </h4>
              <p className={`${subtextClass} mt-1`}>
                Lakshmi Narain College of Technology and Science, Bhopal
              </p>
              <p
                className={`${
                  darkMode ? "text-pink-400" : "text-purple-600"
                } mt-2`}
              >
                Sept 2020 - June 2024 | CGPA: 8.46
              </p>
            </div>
            <div>
              <h4 className="text-xl font-medium">12th & 10th - MPBSE</h4>
              <p className={`${subtextClass} mt-1`}>
                Govt. Model High Secondary School, Chanderi
              </p>
              <p
                className={`${
                  darkMode ? "text-pink-400" : "text-purple-600"
                } mt-2`}
              >
                2017 - 2020
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section
        ref={projectsRef}
        className="relative z-10 py-24 px-4 md:px-12 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <span
                className={`text-sm ${
                  darkMode ? "text-pink-500" : "text-purple-700"
                } font-medium`}
              >
                MY PORTFOLIO
              </span>
              <h2 className="text-4xl md:text-7xl font-semibold tracking-tight mt-2">
                <span className={gradientTextClass}>PROJECTS</span>
              </h2>
            </div>
            <p className={`text-lg ${subtextClass} mt-4 md:mt-0 max-w-md`}>
              A curated selection of my best development projects that showcase
              my skills and expertise.
            </p>
          </div>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${cardBgClass} rounded-3xl p-8`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-2">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transition-colors ${
                          darkMode
                            ? "text-white hover:text-pink-400"
                            : "text-black hover:text-purple-700"
                        }`}
                      >
                        {project.title}
                      </a>
                    ) : (
                      <span className={darkMode ? "text-white" : "text-black"}>
                        {project.title}
                      </span>
                    )}
                  </h3>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span
                      className={`text-sm ${
                        darkMode ? "text-pink-400" : "text-purple-600"
                      }`}
                    >
                      {project.category}
                    </span>
                    <span className={`text-sm ${subtextClass}`}>
                      • {project.duration}
                    </span>
                  </div>
                </div>
                {project.link && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className={`mt-4 md:mt-0 ${
                      darkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-black"
                    } transition-colors`}
                  >
                    <ArrowUpRight size={24} />
                  </motion.a>
                )}
              </div>

              <div className="space-y-3 mb-6">
                {project.description.map((desc, i) => (
                  <p
                    key={i}
                    className={`${subtextClass} text-md leading-relaxed`}
                  >
                    • {desc}
                  </p>
                ))}
              </div>

              {project.tags && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        darkMode
                          ? "bg-gray-800 text-gray-400"
                          : "bg-gray-200 text-gray-600"
                      } px-3 py-1 rounded-full`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <section
        ref={experienceRef}
        className="relative z-10 py-24 px-4 md:px-12 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <span
                className={`text-sm ${
                  darkMode ? "text-pink-500" : "text-purple-700"
                } font-medium`}
              >
                WORK HISTORY
              </span>
              <h2 className="text-4xl md:text-7xl font-semibold tracking-tight mt-2">
                <span className={gradientTextClass}>EXPERIENCE</span>
              </h2>
            </div>
            <p className={`text-lg ${subtextClass} mt-4 md:mt-0 max-w-md`}>
              Aspiring Software Engineer with hands-on experience in Python,
              Django, React.js, and Cloud Solutions.
            </p>
          </div>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${cardBgClass} rounded-3xl p-8`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-semibold">{exp.title}</h3>
                  <p
                    className={`text-lg ${
                      darkMode ? "text-pink-400" : "text-purple-600"
                    } mt-1`}
                  >
                    {exp.company}
                  </p>
                </div>
                <span className={`text-md ${subtextClass} mt-2 md:mt-0`}>
                  {exp.duration}
                </span>
              </div>

              <div className="space-y-3">
                {exp.responsibilities.map((resp, i) => (
                  <p
                    key={i}
                    className={`${subtextClass} text-md leading-relaxed`}
                  >
                    • {resp}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        ref={servicesRef}
        className="relative z-10 py-24 px-4 md:px-12 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <span
                className={`text-sm ${
                  darkMode ? "text-pink-500" : "text-purple-700"
                } font-medium`}
              >
                WHAT I OFFER
              </span>
              <h2 className="text-4xl md:text-7xl font-semibold tracking-tight mt-2">
                <span className={gradientTextClass}>SERVICES</span>
              </h2>
            </div>
            <p className={`text-lg ${subtextClass} mt-4 md:mt-0 max-w-md`}>
              Bringing ideas to life with full-stack development and scalable
              solutions tailored to your needs.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`${cardBgClass} rounded-3xl p-8 relative overflow-hidden group cursor-pointer`}
            >
              <div
                className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t ${
                  darkMode ? "from-purple-900/20" : "from-purple-100/50"
                } to-transparent`}
              ></div>
              <div className="space-y-6 relative z-10">
                <div
                  className={`p-4 rounded-2xl ${
                    darkMode ? "bg-pink-500/20" : "bg-purple-100"
                  } inline-block`}
                >
                  <div
                    className={darkMode ? "text-pink-400" : "text-purple-600"}
                  >
                    {service.icon}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } text-sm`}
                  >
                    {service.description}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className={`${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    } text-2xl font-light`}
                  >
                    {service.number}
                  </span>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className={`${
                      darkMode
                        ? "text-gray-400 group-hover:text-white"
                        : "text-gray-600 group-hover:text-black"
                    } transition-colors`}
                  >
                    <ArrowUpRight size={20} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        ref={contactRef}
        className="relative z-10 py-24 px-4 md:px-12 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <span
                className={`text-sm ${
                  darkMode ? "text-pink-500" : "text-purple-700"
                } font-medium`}
              >
                GET IN TOUCH
              </span>
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mt-2">
                <span className={gradientTextClass}>CONTACT ME</span>
              </h2>
            </div>
            <p className={`text-lg ${subtextClass} mt-4 md:mt-0 max-w-md`}>
              Have a project in mind? Feel free to reach out and let&apos;s
              create something amazing together.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <div className={`${cardBgClass} rounded-3xl p-8`}>
              <h3 className="text-2xl font-semibold mb-8">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-full ${
                      darkMode ? "bg-pink-500/20" : "bg-purple-100"
                    }`}
                  >
                    <Mail
                      size={20}
                      className={darkMode ? "text-pink-400" : "text-purple-600"}
                    />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className={`text-md ${subtextClass}`}>
                      atulguptag23@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-full ${
                      darkMode ? "bg-pink-500/20" : "bg-purple-100"
                    }`}
                  >
                    <Phone
                      size={20}
                      className={darkMode ? "text-pink-400" : "text-purple-600"}
                    />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className={`text-md ${subtextClass}`}>+91 7000950845</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-full ${
                      darkMode ? "bg-pink-500/20" : "bg-purple-100"
                    }`}
                  >
                    <MapPin
                      size={20}
                      className={darkMode ? "text-pink-400" : "text-purple-600"}
                    />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className={`text-md ${subtextClass}`}>
                      Bhopal, Madhya Pradesh, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <p className="font-medium mb-4">Connect with me</p>
                <div className="flex space-x-4">
                  <a
                    href="https://www.linkedin.com/in/atulguptag"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      darkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-200 hover:bg-gray-300"
                    } p-3 rounded-full cursor-pointer transition-colors`}
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="https://www.youtube.com/@atulgupta-g/?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      darkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-200 hover:bg-gray-300"
                    } p-3 rounded-full cursor-pointer transition-colors`}
                  >
                    <Youtube size={18} />
                  </a>
                  <a
                    href="https://www.instagram.com/itsatulguptag/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      darkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-200 hover:bg-gray-300"
                    } p-3 rounded-full cursor-pointer transition-colors`}
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    href="https://www.facebook.com/itsatulguptag/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      darkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-200 hover:bg-gray-300"
                    } p-3 rounded-full cursor-pointer transition-colors`}
                  >
                    <Facebook size={18} />
                  </a>
                  <a
                    href="https://github.com/atulguptag"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      darkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-200 hover:bg-gray-300"
                    } p-3 rounded-full cursor-pointer transition-colors`}
                  >
                    <Github size={18} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2"
          >
            <div className={`${cardBgClass} rounded-3xl p-8`}>
              <h3 className="text-2xl font-semibold mb-8">Send a Message</h3>

              {formSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div
                    className={`p-4 rounded-full ${
                      darkMode ? "bg-green-500/20" : "bg-green-100"
                    } mb-6`}
                  >
                    <CheckCircle2
                      size={32}
                      className={darkMode ? "text-green-400" : "text-green-600"}
                    />
                  </div>
                  <h4 className="text-xl font-medium mb-2">
                    Message Sent Successfully!
                  </h4>
                  <p className={subtextClass}>
                    Thank you for reaching out. I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label
                      className={`block mb-2 text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      className={`w-full ${inputClass} rounded-xl p-4 focus:outline-none focus:ring-2 ${
                        darkMode
                          ? "focus:ring-pink-500/50"
                          : "focus:ring-purple-500/50"
                      } transition-all`}
                      placeholder="John Doe"
                    />
                    {formErrors.name && (
                      <p className="mt-2 text-sm text-red-500">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block mb-2 text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      className={`w-full ${inputClass} rounded-xl p-4 focus:outline-none focus:ring-2 ${
                        darkMode
                          ? "focus:ring-pink-500/50"
                          : "focus:ring-purple-500/50"
                      } transition-all`}
                      placeholder="johndoe@example.com"
                    />
                    {formErrors.email && (
                      <p className="mt-2 text-sm text-red-500">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block mb-2 text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleContactChange}
                      className={`w-full ${inputClass} rounded-xl p-4 focus:outline-none focus:ring-2 ${
                        darkMode
                          ? "focus:ring-pink-500/50"
                          : "focus:ring-purple-500/50"
                      } transition-all`}
                      placeholder="Project Inquiry"
                    />
                    {formErrors.subject && (
                      <p className="mt-2 text-sm text-red-500">
                        {formErrors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block mb-2 text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      rows={5}
                      className={`w-full ${inputClass} rounded-xl p-4 focus:outline-none focus:ring-2 ${
                        darkMode
                          ? "focus:ring-pink-500/50"
                          : "focus:ring-purple-500/50"
                      } transition-all`}
                      placeholder="Hello, I'd like to discuss a project..."
                    />
                    {formErrors.message && (
                      <p className="mt-2 text-sm text-red-500">
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className={`w-full flex justify-center items-center space-x-2 ${
                      darkMode
                        ? "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    } text-white rounded-xl py-4 cursor-pointer transition-all`}
                  >
                    <span>Send Message</span>
                    <Send size={16} />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <footer
        className={`relative z-10 py-12 px-4 md:px-12 border-t ${borderClass} transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-8 md:mb-0">
              <span className={`text-2xl font-bold ${gradientTextClass}`}>
                Atul Gupta
              </span>
              <p className={`mt-4 text-sm ${subtextClass} max-w-md`}>
                Thank you for visiting my personal portfolio website. Connect
                with me over socials.
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-16 space-y-8 md:space-y-0">
              <div>
                <h4 className="font-semibold mb-4">Navigation</h4>
                <ul className={`space-y-2 ${subtextClass}`}>
                  <li>
                    <button
                      onClick={() => scrollToSection(homeRef)}
                      className="hover:underline cursor-pointer"
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection(aboutRef)}
                      className="hover:underline cursor-pointer"
                    >
                      About
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection(skillsRef)}
                      className="hover:underline cursor-pointer"
                    >
                      Skills
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection(projectsRef)}
                      className="hover:underline cursor-pointer"
                    >
                      Projects
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection(experienceRef)}
                      className="hover:underline cursor-pointer"
                    >
                      Experience
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection(servicesRef)}
                      className="hover:underline cursor-pointer"
                    >
                      Services
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection(contactRef)}
                      className="hover:underline cursor-pointer"
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Social</h4>
                <ul className={`space-y-2 ${subtextClass}`}>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/atulguptag"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline cursor-pointer"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/@atulgupta-g/?sub_confirmation=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline cursor-pointer"
                    >
                      YouTube
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/itsatulguptag/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline cursor-pointer"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/itsatulguptag/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline cursor-pointer"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/atulguptag"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline cursor-pointer"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`pt-8 border-t ${borderClass} flex flex-col md:flex-row justify-between items-center`}
          >
            <div className={`text-sm ${subtextClass}`}>
              <span>© {new Date().getFullYear()} All Rights Reserved</span>
            </div>

            <div className={`text-sm ${subtextClass} mt-4 md:mt-0`}>
              <span>
                Designed and Developed 💛 by{" "}
                <a
                  href="https://www.linkedin.com/in/atulguptag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Atul Gupta
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>

      <motion.button
        initial={{ opacity: 0 }}
        animate={controls}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed cursor-pointer bottom-6 right-6 ${
          darkMode
            ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white"
            : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
        } w-12 h-12 rounded-full flex items-center justify-center z-50 shadow-lg`}
        aria-label="Scroll to top"
      >
        <ArrowUpRight size={20} />
      </motion.button>

      {toast.visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 ${
            toast.type === "success"
              ? darkMode
                ? "bg-green-500/80"
                : "bg-green-500"
              : darkMode
              ? "bg-gradient-to-r from-purple-600 to-pink-600"
              : "bg-gradient-to-r from-indigo-600 to-purple-600"
          } text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-4`}
        >
          <div>
            {toast.type === "success" ? (
              <CheckCircle2 size={20} />
            ) : (
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/30"></span>
            )}
          </div>
          <div>{toast.message}</div>
          <X
            size={18}
            className="cursor-pointer"
            onClick={() => setToast({ visible: false, message: "", type: "" })}
          />
        </motion.div>
      )}
    </main>
  );
}
