import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, HeartPulse, Brain, BatteryCharging, CheckCircle2, 
  Truck, Package, ChevronDown, Activity, AlertTriangle, Clock, 
  Star, UserCheck, XCircle, ArrowRight, Play, Info, Coffee, HelpCircle, 
  MapPin, Lock, CreditCard
} from 'lucide-react';

export default function App() {
  const WHATSAPP_NUMBER = "573103065773"; 
  const checkoutRef = useRef<HTMLDivElement>(null);

  // Estados para la interactividad
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);

  // Paquetes y Precios
  const packages = {
    muno1: { name: '1 Sobre MUNO T', price: 85000, desc: 'Limpieza hepática inicial' },
    muno2: { name: '2 Sobres MUNO T', price: 165000, desc: 'Desintoxicación profunda' },
    reto: { name: 'Reto 28 Días (Kit 4 Fórmulas)', price: 300000, desc: 'Transformación celular total' }
  };
  type PackageKey = keyof typeof packages;

  // Estado del Formulario
  const [selectedPackage, setSelectedPackage] = useState<PackageKey>('reto'); // Reto marcado por defecto
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    metodoPago: 'contraentrega'
  });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleProduct = (index: number) => {
    setExpandedProduct(expandedProduct === index ? null : index);
  };

  const scrollToCheckout = () => checkoutRef.current?.scrollIntoView({ behavior: 'smooth' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Procesar Pago y enviar a WhatsApp
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    const pkg = packages[selectedPackage];
    const metodoStr = formData.metodoPago === 'contraentrega' ? 'Pago Contra Entrega' : 'Pago Anticipado';
    
    const mensajeWhatsApp = `¡Hola! Quiero realizar mi pedido con los siguientes datos:\n\n` +
                            `📦 *Paquete:* ${pkg.name} ($${pkg.price.toLocaleString('es-CO')})\n` +
                            `💳 *Método de Pago:* ${metodoStr}\n` +
                            `👤 *Nombre:* ${formData.nombre}\n` +
                            `📞 *Teléfono:* ${formData.telefono}\n` +
                            `📍 *Dirección:* ${formData.direccion}\n` +
                            `🏙️ *Ciudad:* ${formData.ciudad}`;
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensajeWhatsApp)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Enviar mensaje general a WhatsApp desde el botón flotante
  const openWhatsAppGeneral = () => {
    const mensajeWhatsApp = `¡Hola! Me gustaría recibir más información sobre el Reto 28 Días y las fórmulas de SaludVital.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensajeWhatsApp)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full min-h-screen bg-[#fafaf8] flex flex-col font-sans text-[#1a1a1a]">
      
      {/* HEADER - STICKY PERMANENTE */}
      <header className="bg-white border-b border-gray-100 py-3 px-4 sm:px-8 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="SaludVital Logo" className="h-10 object-contain" />
          <div className="hidden sm:flex flex-col">
            <span className="text-[#f1560f] font-black text-sm tracking-tight uppercase">SaludVital</span>
            <span className="text-gray-500 text-[10px] uppercase tracking-widest">Fórmulas Biocéuticas</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:flex text-xs font-bold text-[#f1560f] bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
            <Lock className="w-3 h-3 mr-1 inline-block" /> Compra Segura
          </span>
          <button onClick={scrollToCheckout} className="bg-[#f1560f] text-white px-5 py-2 rounded-full font-black text-sm transition-all hover:bg-[#d44808] shadow-[0_4px_14px_0_rgba(241,86,15,0.39)] cursor-pointer">
            PEDIR AHORA
          </button>
        </div>
      </header>

      {/* BLOQUE 1: HERO */}
      <section className="bg-gradient-to-b from-orange-50 to-[#fafaf8] pt-12 pb-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-[#f1560f] px-3 py-1 rounded-full text-xs font-black uppercase mb-6 tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f1560f] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f1560f]"></span>
              </span>
              Envío Gratis en Piedecuesta, al resto del area metropolitana $12.000 
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6">
              Siente la ligereza de un cuerpo libre de toxinas en <span className="text-[#f1560f]">28 Días.</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              El único protocolo biocéutico integrado que <strong>desinflama tu colon, resetea tu metabolismo y elimina la fatiga crónica</strong> actuando directamente sobre la saturación celular.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8">
              <button onClick={scrollToCheckout} className="bg-[#f1560f] text-white text-lg font-black py-4 px-8 rounded-xl shadow-xl hover:scale-105 transition-transform flex justify-center items-center gap-2 animate-bounce cursor-pointer">
                VER OFERTAS Y PRECIOS <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 border-t border-gray-200 pt-4 w-full">
              <div className="flex -space-x-3">
                <img src="https://i.pravatar.cc/100?img=11" alt="user" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" loading="lazy" />
                <img src="https://i.pravatar.cc/100?img=12" alt="user" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" loading="lazy" />
                <img src="https://i.pravatar.cc/100?img=32" alt="user" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" loading="lazy" />
                <div className="w-10 h-10 rounded-full bg-[#f1560f] text-white flex items-center justify-center text-[10px] font-bold border-2 border-white z-10">+5k</div>
              </div>
              <div className="flex flex-col">
                <div className="flex text-[#f1560f] w-4 h-4 gap-1 mb-1">
                  <Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} />
                </div>
                <span className="text-xs text-gray-500 font-medium">Respaldado por resultados clínicos verificados.</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full max-w-md relative">
            <div className="relative aspect-[4/5] bg-black rounded-3xl overflow-hidden shadow-2xl border-8 border-white group">
              {/* VIDEO ORIGINAL HERO */}
              <video controls playsInline className="w-full h-full object-cover" poster="/logo.png">
                <source src="/video-munot.mp4" type="video/mp4" />
              </video>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#f1560f]" /> INVIMA Vigente
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE 2: PUNTOS DE DOLOR AMPLIADOS */}
      <section className="py-20 px-4 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">¿Tu cuerpo te está pidiendo ayuda a gritos y lo estás ignorando?</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              El verdadero problema no es la falta de fuerza de voluntad, es la <strong>acumulación silenciosa de toxinas</strong>. Cuando el hígado y el colon están saturados, el cuerpo entra en modo de supervivencia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-[#f1560f] transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <AlertTriangle className="w-8 h-8 text-[#f1560f]" />
              </div>
              <h3 className="font-black text-xl mb-3 text-gray-900">Abdomen Inflamado y Colon Irritable</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Sientes pesadez inmediata. El tránsito intestinal es lento, acumulando materia orgánica que se fermenta y produce retención de líquidos masiva.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-[#f1560f] transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-[#f1560f]" />
              </div>
              <h3 className="font-black text-xl mb-3 text-gray-900">Fatiga Mental, Estrés y Neblina</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Te despiertas sintiendo que no dormiste nada. Tu enfoque cae a las 2:00 PM y dependes de estimulantes artificiales (cafeína, azúcar).
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-[#f1560f] transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <BatteryCharging className="w-8 h-8 text-[#f1560f]" />
              </div>
              <h3 className="font-black text-xl mb-3 text-gray-900">Estancamiento Físico</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Por más dietas que hagas, la báscula no se mueve. Tu cuerpo carece de la capacidad de sintetizar energía celular de forma eficiente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE 3: ROMPIENDO MITOS */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6">Por qué las soluciones tradicionales solo empeoran tu estado...</h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg text-white">Laxantes Químicos y Tés Agresivos</h4>
                    <p className="text-gray-400 text-sm mt-1">Destruyen las microvellosidades del colon y barren la microbiota benéfica, causando un colon perezoso crónico irreversible.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg text-white">Quemadores de Grasa Hiperestimulantes</h4>
                    <p className="text-gray-400 text-sm mt-1">Sobrecargan tus glándulas suprarrenales con cafeína, alterando el sistema nervioso y deteniendo la pérdida de peso.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-[#f1560f] p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <h3 className="text-2xl font-black mb-4">El Enfoque Clínico Correcto</h3>
              <p className="text-white/90 text-lg mb-6 leading-relaxed">
                El Reto 28 días le aporta fitonutrientes puros a tu cuerpo. Al limpiar el filtro principal (hígado) y el canal de evacuación (colon), tu metabolismo se desbloquea de forma orgánica.
              </p>
              <div className="flex items-center gap-2 font-bold text-white bg-black/20 w-fit px-4 py-2 rounded-full text-xs">
                <CheckCircle2 className="w-4 h-4 text-green-300" /> Sinergia Sin Efecto Rebote
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE 4: LA SOLUCIÓN CON TARJETAS INTERACTIVAS */}
      <section className="py-20 px-4 bg-[#fafaf8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[#f1560f] font-black uppercase tracking-widest text-sm mb-2 block">Acción Sinergica Modular</span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">Las 4 Fórmulas de Tu Transformación</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm bg-orange-50 text-[#f1560f] py-2 px-4 rounded-full font-bold inline-block">
              💡 Haz clic sobre cualquier tarjeta para desplegar sus beneficios
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            
            {/* PRODUCTO 1: MUNO T */}
            <div 
              onClick={() => toggleProduct(1)}
              className={`bg-white p-6 rounded-3xl shadow-md border transition-all duration-300 cursor-pointer flex flex-col items-center text-center relative mt-4 lg:mt-0 ${expandedProduct === 1 ? 'border-[#f1560f] ring-2 ring-orange-100 shadow-xl' : 'border-yellow-400 hover:border-orange-300'}`}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-md whitespace-nowrap animate-bounce flex items-center gap-1 z-10">
                <Star size={14} fill="currentColor" /> Producto Estrella
              </div>

              <div className="w-28 h-28 bg-orange-50 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-105">
                <img src="/muno-t.png" alt="MUNO T" className="w-20 h-20 object-contain" />
              </div>
              <h3 className="font-black text-xl text-gray-900 mb-1">MUNO T</h3>
              <p className="text-[10px] text-gray-500 font-bold mb-2 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">Limpieza Hepática</p>
              
              <div className="text-xs bg-orange-50 text-[#f1560f] font-extrabold px-3 py-1 rounded-lg mb-3">
                1 x $85.000 | 2 x $165.000 | Reto Completo $300.000
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">Desintoxicación hepática de fase I y II, drenaje linfático profundo y modulación digestiva.</p>
              
              <div className="mt-auto flex items-center gap-1 text-xs font-bold text-[#f1560f]">
                <Info size={14} /> {expandedProduct === 1 ? "Ocultar" : "Ver componentes y ciencia"}
              </div>

              {expandedProduct === 1 && (
                <div className="w-full mt-4 pt-4 border-t border-gray-100 text-left bg-orange-50/50 p-3 rounded-xl transition-all">
                  <p className="text-xs text-gray-700 font-bold mb-1">🧬 Rigor Clínico:</p>
                  <p className="text-[11px] text-gray-600 leading-relaxed mb-2">Estimula la síntesis de glutatión hepático y desinflama las vellosidades de la mucosa intestinal, permitiendo que el colon recupere su motilidad.</p>
                  <p className="text-xs text-gray-700 font-bold mb-1">🌿 Componentes Activos:</p>
                  <p className="text-[11px] text-gray-600">Extractos estandarizados de Alcachofa, Boldo, Té Verde y prebióticos.</p>
                </div>
              )}
            </div>
            
            {/* PRODUCTO 2: CELLERGY BOOST */}
            <div 
              onClick={() => toggleProduct(2)}
              className={`bg-white p-6 rounded-3xl shadow-md border transition-all duration-300 cursor-pointer flex flex-col items-center text-center relative ${expandedProduct === 2 ? 'border-[#f1560f] ring-2 ring-orange-100 shadow-xl' : 'border-gray-100 hover:border-orange-300'}`}
            >
              <div className="w-28 h-28 bg-orange-50 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-105">
                <img src="/cllrgy-buust.png" alt="CELLERGY BOOST" className="w-20 h-20 object-contain" />
              </div>
              <h3 className="font-black text-xl text-gray-900 mb-1">CELLERGY®</h3>
              <p className="text-[10px] text-gray-400 font-bold mb-3 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">Soporte Inmune & Energía</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">Vitalidad celular inmediata, blindaje del sistema inmunitario y erradicación de la fatiga crónica.</p>
              
              <div className="mt-auto flex items-center gap-1 text-xs font-bold text-[#f1560f]">
                <Info size={14} /> {expandedProduct === 2 ? "Ocultar" : "Ver componentes"}
              </div>

              {expandedProduct === 2 && (
                <div className="w-full mt-4 pt-4 border-t border-gray-100 text-left bg-orange-50/50 p-3 rounded-xl">
                  <p className="text-xs text-gray-700 font-bold mb-1">🧬 Rigor Clínico:</p>
                  <p className="text-[11px] text-gray-600 leading-relaxed mb-2">Incrementa la absorción de micronutrientes esenciales a nivel mitocondrial y optimiza la respuesta leucocitaria.</p>
                </div>
              )}
            </div>

            {/* PRODUCTO 3: NEURO CELL */}
            <div 
              onClick={() => toggleProduct(3)}
              className={`bg-white p-6 rounded-3xl shadow-md border transition-all duration-300 cursor-pointer flex flex-col items-center text-center relative ${expandedProduct === 3 ? 'border-[#f1560f] ring-2 ring-orange-100 shadow-xl' : 'border-gray-100 hover:border-orange-300'}`}
            >
              <div className="w-28 h-28 bg-orange-50 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-105">
                <img src="/nrcll.png" alt="NEURO CELL" className="w-20 h-20 object-contain" />
              </div>
              <h3 className="font-black text-xl text-gray-900 mb-1">NEURO CELL</h3>
              <p className="text-[10px] text-gray-400 font-bold mb-3 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">Soporte Cognitivo</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">Nutrición cerebral avanzada, control del estrés y restauración del ciclo de sueño reparador.</p>
              
              <div className="mt-auto flex items-center gap-1 text-xs font-bold text-[#f1560f]">
                <Info size={14} /> {expandedProduct === 3 ? "Ocultar" : "Ver componentes"}
              </div>

              {expandedProduct === 3 && (
                <div className="w-full mt-4 pt-4 border-t border-gray-100 text-left bg-orange-50/50 p-3 rounded-xl">
                  <p className="text-xs text-gray-700 font-bold mb-1">🧬 Rigor Clínico:</p>
                  <p className="text-[11px] text-gray-600 leading-relaxed mb-2">Regula los receptores de GABA en el cerebro, reduciendo la hiperactividad neuronal nocturna para inducir descanso profundo.</p>
                </div>
              )}
            </div>

            {/* PRODUCTO 4: CELION POWER */}
            <div 
              onClick={() => toggleProduct(4)}
              className={`bg-white p-6 rounded-3xl shadow-md border transition-all duration-300 cursor-pointer flex flex-col items-center text-center relative ${expandedProduct === 4 ? 'border-[#f1560f] ring-2 ring-orange-100 shadow-xl' : 'border-gray-100 hover:border-orange-300'}`}
            >
              <div className="w-28 h-28 bg-orange-50 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-105">
                <img src="/celion-pwr.png" alt="CELION POWER" className="w-20 h-20 object-contain" />
              </div>
              <h3 className="font-black text-xl text-gray-900 mb-1">CELION PWR</h3>
              <p className="text-[10px] text-gray-400 font-bold mb-3 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">Rendimiento Físico</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">Combustible celular (ATP), alcalinización de la sangre y recuperación de la fatiga muscular.</p>
              
              <div className="mt-auto flex items-center gap-1 text-xs font-bold text-[#f1560f]">
                <Info size={14} /> {expandedProduct === 4 ? "Ocultar" : "Ver componentes"}
              </div>

              {expandedProduct === 4 && (
                <div className="w-full mt-4 pt-4 border-t border-gray-100 text-left bg-orange-50/50 p-3 rounded-xl">
                  <p className="text-xs text-gray-700 font-bold mb-1">🧬 Rigor Clínico:</p>
                  <p className="text-[11px] text-gray-600 leading-relaxed mb-2">Acelera el aclaramiento del ácido láctico acumulado y promueve la oxigenación celular a través de superalimentos densos.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN DE VIDEO 1: ENFOQUE CLÍNICO MUNO T (TEXTOS Y VIDEO REEMPLAZADOS) */}
      <section className="py-16 px-4 bg-orange-50 border-y border-orange-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-5/12 max-w-[320px] mx-auto">
            <div className="relative aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              {/* Nuevo iframe de YouTube embebido */}
              <iframe 
                className="w-full h-full absolute top-0 left-0"
                src="https://www.youtube.com/embed/Gsg59OrmMo4" 
                title="Conoce las fórmulas" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen>
              </iframe>
            </div>
          </div>
          <div className="w-full md:w-7/12">
            <span className="text-[#f1560f] font-black uppercase text-xs tracking-wider bg-orange-200/50 px-3 py-1 rounded">Sinergia Completa</span>
            
            <div className="mt-6 space-y-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 transition-colors">
                <h3 className="text-lg font-black text-gray-900 mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#f1560f]" /> CelionPower: Nutrición Total
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed pl-7">
                  El poder de la naturaleza en una dosis. Más de 240 bioactivos que actúan como combustible premium para tu cuerpo. Ideal para licuados matutinos.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 transition-colors">
                <h3 className="text-lg font-black text-gray-900 mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#f1560f]" /> Celion Boost: Energía sin Límites
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed pl-7">
                  Oxigena y acelera. Un escudo antioxidante que protege tus células y dispara tu producción de energía natural.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 transition-colors">
                <h3 className="text-lg font-black text-gray-900 mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#f1560f]" /> Muno T: Limpieza Profunda
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed pl-7">
                  Tu cuerpo, optimizado. Activa tus sistemas de eliminación natural (hígado, riñones, piel) para una desintoxicación efectiva desde adentro hacia afuera.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE VIDEO 2: RUTINA DIARIA */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-10">
          <div className="w-full md:w-5/12 max-w-[320px] mx-auto">
            <div className="relative aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <video controls playsInline className="w-full h-full object-cover" poster="/logo.png">
                <source src="/video-munot.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="w-full md:w-7/12">
            <span className="text-[#f1560f] font-black uppercase text-xs tracking-wider bg-orange-100 px-3 py-1 rounded">Preparación en Tiempo Real</span>
            <h2 className="text-3xl font-black text-gray-900 mt-3 mb-4">Mira lo Fácil que es Integrar el Reto a tu Rutina Diaria</h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              Nuestras fórmulas han sido diseñadas para disolverse al instante y absorberse de forma ultra veloz. En menos de 2 minutos al día tendrás cubierto tu blindaje celular completo.
            </p>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f1560f] text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Mañana: Energía e Inmunidad</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Disuelve tu dosis de CELLERGY y CELION PWR en agua antes del desayuno.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f1560f] text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Tarde: Regulación Digestiva</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Toma tu porción de MUNO T justo después de tu almuerzo.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Noche: Reparación Nerviosa</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Una dosis de NEURO CELL en agua tibia antes de dormir.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN INFORMATIVA DE ENVÍOS */}
      <section className="py-12 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <Truck className="w-10 h-10 text-[#f1560f] mx-auto mb-3" />
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Información de Envío y Despachos</h2>
            <p className="text-gray-600 text-sm">Garantizamos un servicio logístico seguro, rápido y transparente.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-orange-100 p-2 rounded-xl text-[#f1560f]"><Package className="w-5 h-5" /></div>
                <h4 className="font-black text-lg text-gray-900">Servicio Contra Entrega</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">Pagas en efectivo únicamente cuando el mensajero te entregue el producto en tus manos. <strong>Entrega Gratuita en Piedecuesta.</strong></p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-orange-100 p-2 rounded-xl text-[#f1560f]"><ShieldCheck className="w-5 h-5" /></div>
                <h4 className="font-black text-lg text-gray-900">Pago Anticipado</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">Para agilizar tu proceso o si estás fuera de Piedecuesta, puedes pagar por <strong>Transferencia Bancaria, Nequi o Daviplata</strong>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE CHECKOUT FUSIONADO (SELECCIÓN Y FORMULARIO) */}
      <section ref={checkoutRef} className="py-20 px-4 bg-gray-900 text-white relative">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-start">
          
          {/* COLUMNA IZQUIERDA: SELECCIÓN DE PAQUETE */}
          <div className="lg:w-1/2 w-full">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Elige tu Paquete.</h2>
            <p className="text-gray-300 mb-8 text-lg">Selecciona la oferta y llena tus datos a la derecha para coordinar tu envío.</p>
            
            <div className="space-y-4 mb-6">
              
              {/* Opción 1: MUNO T */}
              <label className={`cursor-pointer block border-2 rounded-2xl p-4 transition-all ${selectedPackage === 'muno1' ? 'border-[#f1560f] bg-white/10' : 'border-white/10 hover:border-white/30'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={selectedPackage === 'muno1'} onChange={() => setSelectedPackage('muno1')} className="w-5 h-5 accent-[#f1560f]" />
                    <div>
                      <h4 className="font-bold text-lg">{packages.muno1.name}</h4>
                      <p className="text-xs text-gray-400">{packages.muno1.desc}</p>
                    </div>
                  </div>
                  <div className="text-xl font-black text-[#f1560f]">${packages.muno1.price.toLocaleString('es-CO')}</div>
                </div>
              </label>

              {/* Opción 2: 2 MUNO T */}
              <label className={`cursor-pointer block border-2 rounded-2xl p-4 transition-all ${selectedPackage === 'muno2' ? 'border-[#f1560f] bg-white/10' : 'border-white/10 hover:border-white/30'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={selectedPackage === 'muno2'} onChange={() => setSelectedPackage('muno2')} className="w-5 h-5 accent-[#f1560f]" />
                    <div>
                      <h4 className="font-bold text-lg">{packages.muno2.name}</h4>
                      <p className="text-xs text-gray-400">{packages.muno2.desc}</p>
                    </div>
                  </div>
                  <div className="text-xl font-black text-[#f1560f]">${packages.muno2.price.toLocaleString('es-CO')}</div>
                </div>
              </label>

              {/* Opción 3: RETO 28 DÍAS (DESTACADO) */}
              <label className={`cursor-pointer block border-2 rounded-2xl p-4 transition-all relative ${selectedPackage === 'reto' ? 'border-[#f1560f] bg-[#f1560f]/10 shadow-[0_0_15px_rgba(241,86,15,0.3)]' : 'border-[#f1560f]/50 hover:border-[#f1560f]'}`}>
                <div className="absolute -top-3 right-4 bg-yellow-400 text-gray-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">Mejor Oferta</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={selectedPackage === 'reto'} onChange={() => setSelectedPackage('reto')} className="w-5 h-5 accent-[#f1560f]" />
                    <div>
                      <h4 className="font-bold text-lg">{packages.reto.name}</h4>
                      <p className="text-xs text-gray-400">{packages.reto.desc}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-black text-[#f1560f]">${packages.reto.price.toLocaleString('es-CO')}</div>
                </div>
              </label>

            </div>

            <div className="flex justify-between items-center mb-4 text-green-400 bg-white/5 p-4 rounded-xl border border-white/10">
              <span className="flex items-center gap-2"><Truck className="w-5 h-5" /> Envío Priority (Piedecuesta)</span>
              <span className="font-bold uppercase tracking-widest">¡GRATIS!</span>
            </div>

            <div className="flex justify-between items-center mb-4 text-green-400 bg-white/5 p-4 rounded-xl border border-white/10">
              <span className="flex items-center gap-2"><Truck className="w-5 h-5" /> Area metropolitana de Bucaramanga </span>
              <span className="font-bold uppercase tracking-widest">¡12000!</span>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
               <div className="flex items-center gap-3 mb-2">
                 <ShieldCheck className="w-8 h-8 text-[#f1560f]" />
                 <span className="text-sm font-bold text-gray-300">Garantía de Calidad Farmacéutica Colombiana</span>
               </div>
               <div className="flex gap-2 flex-wrap opacity-70 mt-3">
                 <span className="text-[9px] font-bold bg-white/10 px-2 py-1 rounded text-white">NSA-1373-2026</span>
                 <span className="text-[9px] font-bold bg-white/10 px-2 py-1 rounded text-white">RSA-1473-2026</span>
               </div>
            </div>
          </div>
          
          {/* COLUMNA DERECHA: FORMULARIO DETALLADO ORIGINAL */}
          <div className="lg:w-1/2 w-full">
            <form onSubmit={handlePayment} className="bg-white text-gray-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative">
              <h3 className="text-2xl font-black mb-6 text-center">📋 Datos de Envío</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1 tracking-wider">Nombre Completo</label>
                  <input required type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f1560f] focus:bg-white transition-colors" placeholder="Ej: Juan Pérez" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1 tracking-wider">Teléfono / WhatsApp</label>
                    <input required type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f1560f] focus:bg-white transition-colors" placeholder="Ej: 3101234567" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1 tracking-wider">Ciudad / Municipio</label>
                    <input required type="text" name="ciudad" value={formData.ciudad} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f1560f] focus:bg-white transition-colors" placeholder="Ej: Piedecuesta" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1 tracking-wider">Dirección Exacta</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
                    <input required type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#f1560f] focus:bg-white transition-colors" placeholder="Barrio, Calle, Número..." />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1 tracking-wider">Método de Pago</label>
                  <select name="metodoPago" value={formData.metodoPago} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f1560f] focus:bg-white transition-colors">
                    <option value="contraentrega">Pago Contra Entrega (Pagas al recibir)</option>
                    <option value="anticipado">Pago Anticipado (Nequi/ Transferencia Bancaria)</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full bg-[#f1560f] text-white text-lg font-black py-4 px-8 rounded-xl shadow-xl hover:bg-[#d44808] transition-colors flex justify-center items-center gap-2 cursor-pointer">
                <CreditCard className="w-5 h-5" /> CONFIRMAR MI PEDIDO
              </button>
              
              <div className="flex justify-center items-center gap-2 mt-4 opacity-50">
                <Lock className="w-4 h-4 text-gray-600" />
                <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Pedido Seguro Vía WhatsApp</span>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* BLOQUE 7: MEGA FAQ AMPLIADO */}
      <section className="py-20 px-4 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="w-12 h-12 text-[#f1560f] mx-auto mb-3" />
            <h2 className="text-3xl font-black text-gray-900 mb-3">Preguntas Frecuentes Clínicas</h2>
            <p className="text-gray-500 text-sm">Respuestas transparentes para derribar cualquier objeción médica o logística.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { 
                q: "¿Genera algún tipo de dependencia o efecto rebote al terminar?", 
                a: "En absoluto. Al estar libre de laxantes irritantes químicos, el tratamiento le enseña a tu organismo a autoregularse de manera orgánica. Una vez completados los 28 días de la limpieza y nutrición, tu cuerpo mantendrá su ritmo natural." 
              },
              { 
                q: "¿A partir de qué día empiezo a ver cambios reales?", 
                a: "La desinflamación del colon y la ligereza estomacal se sienten notablemente desde los primeros 3 a 5 días de iniciado el reto. Por otro lado, la mejora en tus niveles de energía, claridad mental y un mejor descanso, irán escalando de forma progresiva a lo largo de las primeras dos semanas." 
              },
              { 
                q: "¿Cómo funciona exactamente la logística del pago contra entrega?", 
                a: "Es la modalidad más segura y confiable. Solamente debes hacer tu solicitud llenando el formulario de envío. Nosotros prepararemos tu paquete, el mensajero irá hasta tu domicilio y tú pagarás en efectivo únicamente al tener los productos en tus manos. ¡Cero riesgos!" 
              },
              {
                q: "¿Los productos cuentan con algún registro sanitario en Colombia?",
                a: "¡Sí, por supuesto! Todas nuestras fórmulas son desarrolladas en laboratorios certificados y están debidamente avaladas para su libre venta con registros sanitarios vigentes (Ej. NSA-1373-2026 y RSA-1473-2026), lo que te garantiza los más estrictos estándares de calidad y seguridad farmacéutica."
              },
              {
                q: "¿Tienen contraindicaciones para personas hipertensas o diabéticas?",
                a: "Nuestras fórmulas tienen una base de fitonutrientes naturales, plantas y superalimentos. No contienen azúcares refinados añadidos ni estimulantes agresivos para el corazón. Sin embargo, si tienes una condición médica crónica o estás bajo tratamiento farmacológico, siempre te recomendaremos que le muestres los ingredientes a tu médico de cabecera antes de iniciar el reto."
              },
              {
                q: "¿Cuánto tiempo se demora en llegar mi pedido?",
                a: "Si te encuentras en la ciudad de Piedecuesta, tu pedido puede ser entregado el mismo día de tu compra o al día siguiente hábil. Para el resto del Área Metropolitana de Bucaramanga y alrededores, el tiempo de entrega oscila regularmente entre 24 y 48 horas hábiles."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:border-[#f1560f]/50">
                <button onClick={() => toggleFaq(index)} className="w-full px-6 py-5 text-left font-bold text-gray-900 flex justify-between items-center bg-gray-50 hover:bg-orange-50 transition-colors">
                  <span className="pr-4 text-sm md:text-base">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#f1560f] shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 py-5 text-gray-600 text-sm bg-white border-t border-gray-100 leading-relaxed transition-all">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOQUE 8: CONOCE CELION LABS (VIDEO YOUTUBE FINAL) */}
      <section className="py-20 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#f1560f] font-black uppercase tracking-widest text-sm mb-2 block">Respaldo Científico</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Bienvenidos a Celion Labs</h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Conoce el corazón de nuestras operaciones. Descubre dónde la ciencia, la pureza de los ingredientes de alta calidad y el rigor clínico se unen para crear las fórmulas biocéuticas que transformarán tu vida para siempre.
          </p>
          <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <iframe 
              className="w-full h-full absolute top-0 left-0"
              src="https://www.youtube.com/embed/GTDRKlcV76o?autoplay=0" 
              title="Bienvenidos a Celion Labs" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 text-gray-500 py-12 text-center px-4 border-t border-gray-200">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <img src="/logo.png" alt="SaludVital Logo" className="h-8 object-contain mb-6 grayscale opacity-40" />
          <p className="text-sm mb-2 font-bold">© 2026 SaludVital Colombia. Todos los derechos reservados.</p>
          <p className="text-[11px] max-w-2xl leading-relaxed text-gray-400">
            Aviso de responsabilidad: Las declaraciones de esta página web tienen fines meramente informativos y educativos.
          </p>
        </div>
      </footer>

      {/* BOTÓN FLOTANTE WHATSAPP (MODIFICADO CON LOGO SVG OFICIAL) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={openWhatsAppGeneral}
          className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] animate-pulse hover:scale-110 transition-transform cursor-pointer border-2 border-white"
        >
          <svg viewBox="0 0 24 24" width="34" height="34" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </button>
      </div>

    </div>
  );
}