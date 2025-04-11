"use client"

import keidyLogo from '/keidy-productos.png';
import familiaImage from '/familia.jpg';
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Facebook, MapPin, ChevronUp, Menu, X, Phone, Mail, Clock } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

// Componente para el botón de scroll hacia arriba
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-[#1d63aa] text-white shadow-lg hover:bg-[#12286C] transition-colors z-50"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// Componente para la tarjeta de producto
const ProductCard = ({ name, description }) => {
  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
      className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center text-center"
    >

      <h3 className="text-xl font-bold text-[#12286C] mb-2">{name}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      })
      closeMobileMenu()
    }
  }

  const navLinks = [
    { id: "inicio", label: "Inicio" },
    { id: "nosotros", label: "Nosotros" },
    { id: "mision", label: "Misión y Visión" },
    { id: "contacto", label: "Contacto" },
  ]

  const heroSlides = [
    {
      title: "Productos de Limpieza de Alta Calidad",
      subtitle: "Para un hogar impecable y saludable",
      cta: "Ver Productos",
    },
    {
      title: "Precios Accesibles",
      subtitle: "Calidad que cuida tu bolsillo",
      cta: "Conocer Más",
    },
    {
      title: "Atención Personalizada",
      subtitle: "Expertos en soluciones de limpieza",
      cta: "Contáctanos",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar */}
      <nav className="bg-white text-[#12286C] p-4 sticky top-0 z-40 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-12 w-12"
            >
              <img src="/keidy-productos.png?height=48&width=48" alt="Logo Keidy" className="object-contain" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl font-bold"
            >
              Productos de Limpieza "Keidy"
            </motion.span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`hover:text-[#5F9ED2] transition-colors relative ${activeSection === link.id ? "font-semibold text-[#1d63aa]" : ""
                  }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#5F9ED2]"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-[#12286C]" onClick={toggleMobileMenu}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 md:hidden"
          >
            <div className="flex justify-end p-4">
              <button onClick={closeMobileMenu}>
                <X size={24} className="text-[#12286C]" />
              </button>
            </div>
            <div className="flex flex-col items-center space-y-6 p-8">
              <div className="flex items-center space-x-2 mb-8">
                <div className="relative h-12 w-12">
                  <img src="/keidy-productos.png?height=48&width=48" alt="Logo Keidy" className="object-contain" />
                </div>
                <span className="text-xl font-bold text-[#12286C]">Productos de Limpieza "Keidy"</span>
              </div>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-lg ${activeSection === link.id ? "font-semibold text-[#1d63aa]" : "text-[#12286C]"}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Slider */}
      <section id="inicio" className="relative">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          effect="fade"
          loop={true}
          className="h-[500px] md:h-[600px]"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-full w-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-[#12286C] bg-opacity-70"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold mb-4"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl mb-8"
                  >
                    {slide.subtitle}
                  </motion.p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* About Us Section with Animation */}
      <section id="nosotros" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#12286C] mb-4">Acerca de Nosotros</h2>
            <div className="w-24 h-1 bg-[#5F9ED2] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Conoce nuestra historia y compromiso con la calidad y el servicio.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                {/* <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#9DCFEB] rounded-lg -z-10"></div> */}
                <img
                  src={familiaImage}
                  alt="Nuestra Tienda"
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
                {/* <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#5F9ED2] rounded-lg -z-10"></div> */}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-[#1d63aa]">Historia de la empresa</h3>
              <p className="text-gray-700 leading-relaxed">
                Con la necesidad de seguir adelante en el mantenimiento de la familia, se abrió el negocio Productos de
                Limpieza Keidy. Tiene como enfoque principal atender las necesidades del hogar en relación con la
                limpieza, esto gracias a que la dueña es una persona sumamente conectada con su hogar, por eso la unión
                calidad-precio.
              </p>

              <h3 className="text-2xl font-semibold text-[#1d63aa] pt-4">Giro</h3>
              <p className="text-gray-700 leading-relaxed">
                Venta a mayoreo y a menudeo de productos químicos y materiales de limpieza.
              </p>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section with Parallax Effect */}
      <section id="mision" className="py-20 bg-[#9DCFEB] bg-opacity-10 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/.svg?height=800&width=1600')" }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#12286C] mb-4">Misión y Visión</h2>
            <div className="w-24 h-1 bg-[#5F9ED2] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Nuestros principios y objetivos que guían nuestro trabajo diario.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >

              <h3 className="text-2xl font-bold text-[#12286C] mb-4 text-center">Misión</h3>
              <p className="text-gray-700 leading-relaxed">
                Nuestra misión es satisfacer las necesidades de limpieza y abastecimiento de los hogares mexicanos,
                ofreciendo productos y servicios de calidad a precios accesibles. Atendemos a familias en toda la zona,
                enfocándose en compromiso con el crecimiento y responsabilidad financiera. Promovemos prácticas éticas y
                sostenibles, y respondemos a las preocupaciones sociales. Nuestra ventaja competitiva radica en la
                combinación de calidad y atención personalizada.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold text-[#12286C] mb-4 text-center">Visión</h3>
              <p className="text-gray-700 leading-relaxed">
                "Ser el negocio líder en nuestra comunidad en la venta y distribución de productos de limpieza,
                reconocidos por ofrecer calidad y precios accesibles, y por nuestro compromiso con el bienestar del
                hogar y el impulso al desarrollo económico local."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section with Animation */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#12286C] mb-4">Nuestros Valores</h2>
            <div className="w-24 h-1 bg-[#5F9ED2] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Los principios que guían nuestras acciones y decisiones día a día.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <ProductCard
              name="Respeto"
            />
            <ProductCard
              name="Integridad"
            />
            <ProductCard
              name="Responsabilidad"
            />
            <ProductCard
              name="Lealtad"
            />
            <ProductCard
              name="Solidaridad"
            />
            <ProductCard
              name="Transparencia"
            />


          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#1d63aa]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Listo para mejorar la limpieza de tu hogar?
            </h2>
            <p className="text-white text-lg mb-8">
              Visítanos hoy mismo y descubre nuestra amplia gama de productos de limpieza de alta calidad a precios
              accesibles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#12286C] mb-4">Encuéntranos</h2>
            <div className="w-24 h-1 bg-[#5F9ED2] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">Visítanos o contáctanos, estamos para servirte.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold text-[#1d63aa] mb-6">Información de Contacto</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-[#5F9ED2] mr-4 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700">Blas Chumacero 418, Fernando Amilpa, 66052 Cdad. Gral. Escobedo, N.L.</p>
                </div>


              </div>

              <h3 className="text-xl font-semibold text-[#1d63aa] mt-8 mb-4">Redes Sociales</h3>
              <div className="flex items-center space-x-4">
                <a
                  href="https://www.facebook.com/share/19CZsdeNSw/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#5F9ED2] text-white p-2 rounded-full hover:bg-[#1d63aa] transition-colors"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  //src="https://www.google.com/maps/embed?pb=!1m18!1m12  !1m3!1d3592.5!2d-100.269!3d5.8076532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQ4JzAwLjAiTiAxMDDCsDE4JzAwLjAiVw!5e0!3m2!1ses!2smx   !4v1600000000000!5m2!1ses!2smx"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0!2d-100.2696905!3d25.8076532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQ4JzI3LjYiTiAxMDDCsDE2JzEwLjkiVw!5e0!3m2!1ses!2smx!4v1713011000000!5m2!1ses!2smx"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#12286C] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative h-10 w-10">
                  <img src={keidyLogo} alt="Logo Keidy" className="object-contain" />
                </div>
                <span className="text-xl font-bold">Productos de Limpieza "Keidy"</span>
              </div>
              <p className="text-gray-300 mb-4">
                Ofrecemos productos de limpieza de alta calidad a precios accesibles para satisfacer todas las
                necesidades de tu hogar.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p>© {new Date().getFullYear()} Productos de Limpieza "Keidy". Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  )
}
