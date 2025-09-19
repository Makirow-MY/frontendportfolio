import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCalendarDays, FaFacebookF, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { IoArrowForward, IoChevronBack, IoChevronForward, IoDownloadOutline, IoLogoYoutube } from "react-icons/io5";
import { RiDownload2Fill } from "react-icons/ri";
import { GoArrowUpRight } from "react-icons/go";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { LuGraduationCap, LuMedal } from "react-icons/lu";
import { useRouter } from "next/router";
import { Autoplay, EffectCoverflow, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from 'react-i18next';

const HeroSection = ({ handleMouseMove, glowPosition, displayText, alldata, allRev }) => {
  const { t } = useTranslation();

  return (
    <section className="hero" onMouseMove={handleMouseMove}>
      <div
        className="footer-glow"
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
        }}
      ></div>
      
      <div className="intro_text">
        <svg viewBox="0 0 1320 300">
          <text x='50%' y='50%' textAnchor="middle" className="animate-stroke">{t('hero.greeting')}</text>
        </svg>
      </div>
      
      <div className="container">
        <div className="flex w-100">
          <div className="heroinfoleft">
            <span
              className="hero_sb_title"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              {t('hero.subtitle')}
            </span>
            
            <h1
              className="hero_title"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {t('hero.title_part1')} <br/>
              <span className="typed-text">{displayText} |</span>
            </h1>
            
            <div
              className="hero_img_box heroimgbox"
              data-aos="flip-right"
              data-aos-delay="300"
            >
              <img src="/img/me1.jpg" alt="myprofile" />
            </div>
            
            <div
              className="lead"
              id="resume"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {t('hero.lead')}
            </div>
            
            <div
              className="hero_btn_box"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <Link
                target="_blank"
                download="resume.pdf"
                href="/img/resume.pdf"
                className="download_cv"
              >
                {t('hero.download_cv')} <RiDownload2Fill />
              </Link>
              
              <ul className="hero_social">
                <li data-aos="fade-up" data-aos-delay="600">
                  <Link href="https://www.facebook.com/share/1FSdz8Gfe8/">
                    <FaFacebookF />
                  </Link>
                </li>
                <li data-aos="fade-up" data-aos-delay="650">
                  <Link href="https://www.instagram.com/engineermakiayengue?utm_source=qr&igsh=YmVsbTh2b3N0aGpz">
                    <FaInstagram />
                  </Link>
                </li>
                <li data-aos="fade-up" data-aos-delay="700">
                  <Link href="https://youtube.com/@Makirow_Vibe">
                    <IoLogoYoutube />
                  </Link>
                </li>
                <li data-aos="fade-up" data-aos-delay="750">
                  <Link href="https://github.com/Makirow-MY">
                    <FaGithub />
                  </Link>
                </li>
                <li data-aos="fade-up" data-aos-delay="800">
                  <Link href="https://linkedin.com/in/makia-yengue-godwill-lavie-7aba12258/">
                    <FaLinkedin />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="heroimageright">
            <div
              className="hero_img_box"
              data-aos="flip-left"
              data-aos-delay="400"
            >
              <img src="/img/me1.png" alt="profile" />
            </div>
          </div>
        </div>
        
        <div className="funfect_area flex flex-sb">
          <div
            className="funfect_item"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h3>3+</h3>
            <h4>{t('hero.experience')}</h4>
          </div>
          
          <div
            className="funfect_item"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {allRev.length > 0 ? (
              <h3>{alldata.length > 10 ? alldata.length > 20 ? '20+' : alldata.length : `0${alldata.length}`}</h3>
            ) : <h3>20</h3>}
            <h4>{t('hero.projects')}</h4>
          </div>
          
          <div
            className="funfect_item"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            {allRev.length > 0 ? (
              <h3>{allRev.length > 10 ? allRev.length > 100 ? '100+' : allRev.length : `0${allRev.length}`}</h3>
            ) : <h3>100</h3>}
            <h4>{t('hero.customers')}</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceEducation = ({ handleMouseMove, glowPosition }) => {
  const { t } = useTranslation();

  return (
    <section className="exstudy" onMouseMove={handleMouseMove}>
      <div
        className="footer-glow"
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
        }}
      ></div>
      
      <div className="container flex flex-left flex-sb">
        <div className="experience">
          <div
            className="experience_title flex gap-1"
            data-aos="fade-right"
          >
            <LuMedal />
            <h2>{t('experience_education.experience_title')}</h2>
          </div>
          
          <div className="exper_cards">
            <div
              className="exper_card"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <span>2024 - Present</span>
              <h3>{t('experience_education.freelance.title')}</h3>
              <p>{t('experience_education.freelance.description')}</p>
            </div>
            
            <div
              className="exper_card"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <span>2023 - 2024</span>
              <h3>{t('experience_education.intern.title')}</h3>
              <p>{t('experience_education.intern.description')}</p>
            </div>
            
            <div
              className="exper_card"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <span>2023</span>
              <h3>{t('experience_education.contributor.title')}</h3>
              <p>{t('experience_education.contributor.description')}</p>
            </div>
            
            <div
              className="exper_card"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <span>2022 - 2023</span>
              <h3>{t('experience_education.junior.title')}</h3>
              <p>{t('experience_education.junior.description')}</p>
            </div>
          </div>
        </div>
        
        <div className="education">
          <div
            className="experience_title flex gap-1"
            data-aos="fade-left"
          >
            <LuGraduationCap />
            <h2>{t('experience_education.education_title')}</h2>
          </div>
          
          <div className="exper_cards">
            <div
              className="exper_card"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <span>2022 - Present</span>
              <h3>{t('experience_education.university.title')}</h3>
              <p>{t('experience_education.university.description')}</p>
            </div>
            
            <div
              className="exper_card"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <span>2021 - 2022</span>
              <h3>{t('experience_education.gce_advanced.title')}</h3>
              <p>{t('experience_education.gce_advanced.description')}</p>
            </div>
            
            <div
              className="exper_card"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <span>2019 - 2020</span>
              <h3>{t('experience_education.gce_ordinary.title')}</h3>
              <p>{t('experience_education.gce_ordinary.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SkillsSection = ({ handleMouseMove, glowPosition }) => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="myskills" onMouseMove={handleMouseMove}>
      <div
        className="footer-glow"
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
        }}
      ></div>
      
      <div className="container">
        <div
          className="myskills_title"
          data-aos="fade-up"
        >
          <h2>{t('skills.title')}</h2>
          <p>{t('skills.description')}</p>
        </div>
        
        <div className="myskils_cards">
          <div
            className="mys_card"
            data-aos="flip-left"
            data-aos-delay="100"
          >
            <div className="mys_inner">
              <img src="/img/react.svg" />
              <h3>95%</h3>
            </div>
            <p className="text-center">{t('skills.react')}</p>
          </div>
          
          <div
            className="mys_card"
            data-aos="flip-left"
            data-aos-delay="200"
          >
            <div className="mys_inner">
              <img src="/img/nodejs.png" />
              <h3>89%</h3>
            </div>
            <p className="text-center">{t('skills.nodejs')}</p>
          </div>
          
          <div
            className="mys_card"
            data-aos="flip-left"
            data-aos-delay="300"
          >
            <div className="mys_inner">
              <img src="/img/mongodb.svg" />
              <h3>90%</h3>
            </div>
            <p className="text-center">{t('skills.mongodb')}</p>
          </div>
          
          <div
            className="mys_card"
            data-aos="flip-left"
            data-aos-delay="400"
          >
            <div className="mys_inner">
              <img src="/img/Figma.png" />
              <h3>93%</h3>
            </div>
            <p className="text-center">{t('skills.figma')}</p>
          </div>
          
          <div
            className="mys_card"
            data-aos="flip-left"
            data-aos-delay="500"
          >
            <div className="mys_inner">
              <img src="/img/Photoshop.png" />
              <h3>93%</h3>
            </div>
            <p className="text-center">{t('skills.photoshop')}</p>
          </div>
          
          <div
            className="mys_card"
            data-aos="flip-left"
            data-aos-delay="600"
          >
            <div className="mys_inner">
              <img src="/img/Flutter.png" />
              <h3>85%</h3>
            </div>
            <p className="text-center">{t('skills.flutter')}</p>
          </div>

          <div
            className="mys_card"
            data-aos="flip-left"
            data-aos-delay="700"
          >
            <div className="mys_inner">
              <img src="/img/gns3.png" />
              <h3>80%</h3>
            </div>
            <p className="text-center">{t('skills.gns3')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = ({ handleMouseMove, glowPosition, services, HoverFunct, mouseOut, activeLink }) => {
  const { t } = useTranslation();

  return (
    <section className="services" onMouseMove={handleMouseMove}>
      <div
        className="footer-glow"
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
        }}
      ></div>
      
      <div className="container">
        <div
          className="services_titles"
          data-aos="fade-up"
        >
          <h2>{t('services.title')}</h2>
          <p>{t('services.description')}</p>
        </div>
        
        <div className="services_menu">
          {services.map((service, index) => (
            <a
              href={`/services#${service.title.replace(' ', '-')}`}
              key={index}
              onMouseOver={() => HoverFunct(index)}
              onMouseOut={mouseOut}
              className={`services_item ${activeLink === index ? 'sactive' : ''}`}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="left_s_box">
                <span>0{index + 1}</span>
                <h3>{t(`services.${service.id}.title`)}</h3>
              </div>
              <div className="right_s_box">
                <p>{t(`services.${service.id}.description`)}</p>
              </div>
              <GoArrowUpRight />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = ({
  handleMouseMove,
  glowPosition,
  categories,
  activeCategory,
  setActiveCategory,
  loading,
  curreproject,
  index
}) => {
  const { t } = useTranslation();

  return (
    <section className="projects" onMouseMove={handleMouseMove}>
      <div
        className="footer-glow"
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
        }}
      ></div>
      
      <div className="conatiner">
        <div
          className="project_titles"
          data-aos="fade-up"
        >
          <h2>{t('projects.title')}</h2>
          <p>{t('projects.description')}</p>
        </div>
        
        <div
          style={{ padding: "0 2rem" }}
          className="project_buttons"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {categories.map(category => (
            <button
              key={category}
              className={`${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
              data-aos="zoom-in"
              data-aos-delay={categories.indexOf(category) * 50}
            >
              {(category.charAt(0).toUpperCase() + category.slice(1)).split(' ')[0]}
            </button>
          ))}
        </div>
        
        <div className="projects_cards">
          {loading ? (
            <div className="wh_50 flex flex-center">
              <Spinner />
            </div>
          ) : curreproject.length === 0 ? (
            <h1 className="w-100 flex flex-center mt-3">{t('projects.no_projects')}</h1>
          ) : (
            curreproject.map((pro, i) => (
              <Link
                href={`/projects/${pro.slug}`}
                key={pro._id}
                className="procard"
                data-aos="zoom-in-up"
                data-aos-delay={i * 100}
              >
                <div className="proimgbox">
                  <img src={pro.images[index]} alt={pro.title} />
                </div>
                <div className="procontentbox">
                  <h2>{pro.title}</h2>
                  <GoArrowUpRight />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const RecentBlogs = ({ handleMouseMove, glowPosition, allwork, index, formatDate }) => {
  const { t } = useTranslation();

  return (
    <section className="recentblogs" onMouseMove={handleMouseMove}>
      <div
        className="footer-glow"
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
        }}
      ></div>
      
      <div className="container">
        <div
          className="myskills_title"
          data-aos="fade-up"
        >
          <h2>{t('blogs.title')}</h2>
          <p>{t('blogs.description')}</p>
        </div>
        
        <div className="recent_blogs">
          {allwork.length === 0 && (
            <h1 className="w-100 flex flex-center mt-3">{t('blogs.no_blogs')}</h1>
          )}
          
          {allwork.length > 0 && allwork.slice(0, 3).map((blog, i) => (
            <Link
              href={`/blogs/${blog.slug}`}
              className="re_blog"
              key={blog._id}
              data-aos="fade-up"
              data-aos-delay={i * 150}
            >
              <div className="re_blogimg">
                <img src={blog.images[index]} alt={blog.title}/>
                <span>{blog.blogcategory}</span>
              </div>
              <div className="re_bloginfo">
                <div className="re_topdate flex gap-1">
                  <div className="res_date">
                    <FaCalendarDays />
                    <span>{formatDate(new Date(blog.createdAt))}</span>
                  </div>
                </div>
                <h2>{blog.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const { t } = useTranslation();
  const [activeLink, setActiveLink] = useState(0);
  const router = useRouter();

  const HoverFunct = (index) => {
    setActiveLink(index);
  };
  const mouseOut = () => {
    setActiveLink(0);
  };

  const services = [
    {
      id: 'website',
      title: 'Website Development',
      image: '/img/website_icon.svg',
      description: 'Transform your digital presence with our premium web development services. We craft blazing-fast, SEO-optimized websites that convert visitors into customers.',
      highlights: [
        "Full-stack development",
        "RESTful API integration",
        "Database design",
        "Performance optimization",
        "Robust Security"
      ],
      category: 'Website Development'
    },
    {
      id: 'mobile',
      title: 'Mobile Development',
      image: '/img/mobile_logo.svg',
      description: 'Native-quality mobile apps that delight users and drive engagement. Built with React Native for cross-platform excellence.',
      highlights: [
        'iOS & Android deployment',
        'Offline-first architecture',
        'Biometric authentication',
        'App Store optimization'
      ],
      category: 'Mobile Development'
    },
    {
      id: 'design',
      title: 'Graphic & UI/UX Design',
      image: '/img/UI.png',
      description: 'Comprehensive design solutions that bridge visual identity and digital experience. From brand aesthetics to intuitive interfaces, we create designs that captivate and convert.',
      highlights: [
        'Logo & brand identity design',
        'User interface design',
        'User experience optimization',
        'Marketing collateral',
        'Interactive prototypes',
        'Design system creation'
      ],
      category: 'Graphic & UI/UX Design'
    },
    {
      id: 'network',
      title: 'Network Administration',
      image: '/img/networking.svg',
      description: 'Reliable and secure network infrastructure solutions that keep your business connected and protected.',
      highlights: [
        'Network setup & configuration',
        'Security implementation',
        'Performance monitoring',
        'Troubleshooting'
      ],
      category: 'Network Design'
    },
    {
      id: 'video',
      title: 'Video Editing',
      image: '/img/video_editing.svg',
      description: 'Professional video production services that tell your story with impact and cinematic quality.',
      highlights: [
        '4K video editing',
        'Motion graphics',
        'Color grading',
        'Sound design'
      ],
      category: 'Video Editing'
    }
  ];

  const [currP, setCurrP] = useState(1);
  const [pagePage] = useState(4);
  const [loading, setLoading] = useState(true);
  const [alldata, setAlldata] = useState([]);
  const [allwork, setAllwork] = useState([]);
  const [allRev, setAllRev] = useState([]);
  const [index, setIndex] = useState(0);
  const [searchQ, setSearchQ] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [BlogAllData, setBlogAllData] = useState(alldata);
  const [searchInput, setSearchInput] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [selectCat, setSelectCat] = useState("All");
  const [activeCategory, setActiveCategory] = useState('all');
  const [filterProj, setFilterProj] = useState([]);

  const handleSearchOpen = () => {
    setSearchInput(!searchInput);
  };
  const handleSearchClose = () => {
    setSearchInput(false);
  };

  const handleMouseMove = (e) => {
    setGlowPosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectResponse, blogResponse, ReviewResponse] = await Promise.all([
          fetch('/api/project'),
          fetch('/api/blogs'),
          fetch('/api/reviews')
        ]);
        const projectData = await projectResponse.json();
        setAlldata(projectData);
        const blogsData = await blogResponse.json();
        setAllwork(blogsData);
        const revData = await ReviewResponse.json();
        setAllRev(revData);
      } catch (error) {
        toast.error("Error Occurred while Fetching Data", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCurrP(1);
    if (activeCategory === "all") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setFilterProj(alldata.filter((item) => item.status === "publish"));
      }, 2500);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setFilterProj(alldata.filter((item) => item.status === "publish" && item.projectcategory === activeCategory));
      }, 2500);
    }
  }, [selectCat, alldata, activeCategory]);

  const allproject = filterProj.length;
  const indexfirstString = (currP - 1) * pagePage;
  const indexlastString = currP * pagePage;
  const curreproject = filterProj.slice(indexfirstString, indexlastString);
  const pageNum = [];
  for (let index = 1; index <= Math.ceil(allproject / pagePage); index++) {
    pageNum.push(index);
  }

  const categories = ['all', ...new Set(alldata.map(project => project.projectcategory))];

  const formatDate = (date) => {
    if (!date || isNaN(date)) {
      return '';
    }
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour12: true
    };
    return new Intl.DateTimeFormat(t('header.brand') === 'MYG Tech' ? 'en-US' : 'fr-FR', options).format(date);
  };

  const texts = t('hero.roles', { returnObjects: true });

  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typingSpeed = 150;
    const pauseBetweenTexts = 2000;
    if (isTyping) {
      if (displayText.length < texts[currentIndex].length) {
        const timeout = setTimeout(() => {
          setDisplayText(texts[currentIndex].substring(0, displayText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseBetweenTexts);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, typingSpeed / 2);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }
  }, [displayText, currentIndex, isTyping, texts]);

  return (
    <>
      <Head>
        <title>{t('header.brand')} - Portfolio</title>
        <meta name="description" content={t('hero.lead')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/ficon.png" />
      </Head>
      <>
        <HeroSection
          handleMouseMove={handleMouseMove}
          glowPosition={glowPosition}
          displayText={displayText}
          alldata={alldata}
          allRev={allRev}
        />
        
        <ExperienceEducation
          handleMouseMove={handleMouseMove}
          glowPosition={glowPosition}
        />
        
        <SkillsSection
          handleMouseMove={handleMouseMove}
          glowPosition={glowPosition}
        />
        
        <ServicesSection
          handleMouseMove={handleMouseMove}
          glowPosition={glowPosition}
          services={services}
          HoverFunct={HoverFunct}
          mouseOut={mouseOut}
          activeLink={activeLink}
        />
        
        <ProjectsSection
          handleMouseMove={handleMouseMove}
          glowPosition={glowPosition}
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          loading={loading}
          curreproject={curreproject}
          index={index}
        />
        
        <RecentBlogs
          handleMouseMove={handleMouseMove}
          glowPosition={glowPosition}
          allwork={allwork}
          index={index}
          formatDate={formatDate}
        />
      </>
    </>
  );
}