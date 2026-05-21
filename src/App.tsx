import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, HeartPulse, Brain, BatteryCharging, CheckCircle2, 
  Truck, Package, ChevronDown, Activity, AlertTriangle, Clock, 
  Star, UserCheck, XCircle, ArrowRight, Play, Info, Coffee, HelpCircle, 
  MapPin, Lock, CreditCard, Sparkles, Loader2, Check
} from 'lucide-react';
export default function App() {
  const WHATSAPP_NUMBER = "573103065773"; 
  const checkoutRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);

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

  // Quiz de Toxicidad Celular
  const quizQuestions = [
    {
      question: "¿Sientes pesadez, inflamación abdominal o gases molestos después de comer?",
      options: [
        { text: "Casi nunca, mi digestión es ligera", points: 1 },
        { text: "A veces, especialmente con ciertas comidas", points: 2 },
        { text: "Con frecuencia, me siento inflamado casi a diario", points: 3 }
      ]
    },
    {
      question: "¿Cómo calificarías tu nivel de energía y enfoque durante el día?",
      options: [
        { text: "Excelente, me siento activo y vital", points: 1 },
        { text: "Moderado, sufro de cansancio o neblina mental por la tarde", points: 2 },
        { text: "Bajo, dependo del café/azúcar y me despierto cansado", points: 3 }
      ]
    },
    {
      question: "¿Sientes que tu metabolismo está lento o te cuesta perder peso?",
      options: [
        { text: "No, mi cuerpo responde bien", points: 1 },
        { text: "Un poco, noto que me cuesta más que antes", points: 2 },
        { text: "Sí, me siento estancado sin importar las dietas", points: 3 }
      ]
    },
    {
      question: "¿Presentas antojos de dulce, dolores de cabeza frecuentes o imperfecciones en la piel?",
      options: [
        { text: "Rara vez o nunca", points: 1 },
        { text: "Ocasionalmente tengo alguno de estos síntomas", points: 2 },
        { text: "Sí, tengo varios de estos problemas regularmente", points: 3 }
      ]
    }
  ];

  const loadingSteps = [
    "Analizando permeabilidad intestinal...",
    "Evaluando congestión en filtros hepáticos...",
    "Mapeando niveles de inflamación mitocondrial...",
    "Calculando requerimiento óptimo de fitonutrientes..."
  ];

  const [quizStep, setQuizStep] = useState<number>(-1); // -1 significa no iniciado
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [calcStep, setCalcStep] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<{ score: number; level: string; percent: number; desc: string; recKey: PackageKey } | null>(null);

  const startQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizFinished(false);
    setQuizResult(null);
  };

  const handleQuizAnswer = (points: number) => {
    const nextAnswers = [...quizAnswers, points];
    setQuizAnswers(nextAnswers);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setIsCalculating(true);
      setCalcStep(0);
      
      const interval = setInterval(() => {
        setCalcStep(prev => {
          if (prev >= 3) {
            clearInterval(interval);
            setIsCalculating(false);
            
            const totalScore = nextAnswers.reduce((a, b) => a + b, 0);
            let level = "Leve";
            let percent = 35;
            let desc = "Tu saturación de toxinas es moderada/baja. Se recomienda realizar una limpieza hepática inicial.";
            let recKey: PackageKey = "muno1";

            if (totalScore >= 10) {
              level = "Crítico";
              percent = 92;
              desc = "Saturación celular severa detectada. Tu colon e hígado necesitan un reseteo biológico urgente. El Reto de 28 Días es indispensable para tu caso.";
              recKey = "reto";
            } else if (totalScore >= 7) {
              level = "Alto";
              percent = 74;
              desc = "Nivel de congestión elevado. Presentas inflamación recurrente y fatiga física/mental. Se recomiendan 2 sobres de MUNO T o el Reto 28 Días completo.";
              recKey = "muno2";
            }

            setQuizResult({ score: totalScore, level, percent, desc, recKey });
            setQuizFinished(true);
            setSelectedPackage(recKey);
            return 3;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleProduct = (index: number) => {
    setExpandedProduct(expandedProduct === index ? null : index);
  };

  const scrollToCheckout = () => checkoutRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToQuiz = () => quizRef.current?.scrollIntoView({ behavior: 'smooth' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'telefono') {
      // 1. Filtrar y permitir únicamente la escritura de caracteres numéricos
      let onlyNums = value.replace(/[^0-9]/g, '');

      // 2. Normalizar: Si el usuario copia con código de país de Colombia (+57 3...), remover el prefijo '57'
      if (onlyNums.startsWith('573') && onlyNums.length > 3) {
        onlyNums = onlyNums.substring(2);
      }

      // 3. Bloquear la entrada si el número ingresado no inicia con el dígito 3 (Estándar Celular Colombia)
      if (onlyNums.length > 0 && !onlyNums.startsWith('3')) {
        return;
      }

      // 4. Imponer restricción estricta de longitud máxima a 10 dígitos
      if (onlyNums.length > 10) {
        return;
      }

      setFormData({
        ...formData,
        [name]: onlyNums
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Procesar Pago y enviar a WhatsApp
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Limpieza de datos (Trimming) para evitar envíos con espacios en blanco vacíos
    const nombreClean = formData.nombre.trim();
    const direccionClean = formData.direccion.trim();
    const ciudadClean = formData.ciudad.trim();
    const telefonoClean = formData.telefono.trim();

    if (!nombreClean || !direccionClean || !ciudadClean || telefonoClean.length !== 10) {
      alert('Por favor, completa todos los campos del formulario con información válida y sin espacios vacíos.');
      return;
    }
    
    const pkg = packages[selectedPackage];
    const metodoStr = formData.metodoPago === 'contraentrega' ? 'Pago Contra Entrega' : 'Pago Anticipado';
    
    const mensajeWhatsApp = `¡Hola! Quiero realizar mi pedido con los siguientes datos:\n\n` +
                            `📦 *Paquete:* ${pkg.name} ($${pkg.price.toLocaleString('es-CO')})\n` +
                            `💳 *Método de Pago:* ${metodoStr}\n` +
                            `👤 *Nombre:* ${nombreClean}\n` +
                            `📞 *Teléfono:* ${telefonoClean}\n` +
                            `📍 *Dirección:* ${direccionClean}\n` +
                            `🏙️ *Ciudad:* ${ciudadClean}`;
    
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
            <span className="text-[#ff5a1f] font-black text-sm tracking-tight uppercase">SaludVital</span>
            <span className="text-gray-500 text-[10px] uppercase tracking-widest">Fórmulas Biocéuticas</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:flex text-xs font-bold text-[#ff5a1f] bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
            <Lock className="w-3 h-3 mr-1 inline-block" /> Compra Segura
          </span>
          <button onClick={scrollToCheckout} className="bg-[#ff5a1f] text-white px-6 py-2.5 rounded-full font-black text-sm transition-all hover:bg-[#e24a13] shadow-[0_4px_14px_0_rgba(255,90,31,0.25)] cursor-pointer">
            PEDIR AHORA
          </button>
        </div>
      </header>

      {/* BLOQUE 1: HERO */}
      <section className="bg-gradient-to-b from-orange-50/70 via-white to-[#fafaf8] pt-16 pb-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-[#ff5a1f] px-4 py-1.5 rounded-full text-xs font-bold uppercase mb-8 tracking-wider">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5a1f] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff5a1f]"></span>
              </span>
              Envío Gratis en Piedecuesta, área metropolitana $12.000 
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.08] mb-6 tracking-tight">
              Siente la ligereza de un cuerpo libre de toxinas en <span className="text-[#ff5a1f] bg-gradient-to-r from-[#ff5a1f] to-[#ff7d47] bg-clip-text text-transparent">28 Días.</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed font-medium">
              El único protocolo biocéutico integrado que <strong>desinflama tu colon, resetea tu metabolismo y elimina la fatiga crónica</strong> actuando directamente sobre la saturación celular.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
              <button 
                onClick={scrollToQuiz} 
                className="bg-[#ff5a1f] text-white text-base font-bold py-4 px-8 rounded-2xl shadow-[0_10px_25px_-5px_rgba(255,90,31,0.4)] hover:bg-[#e24a13] hover:scale-[1.02] transition-all flex justify-center items-center gap-2 cursor-pointer duration-300"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" /> MEDIR MI TOXICIDAD CELULAR (TEST GRATIS)
              </button>
              <button 
                onClick={scrollToCheckout} 
                className="bg-white text-gray-700 border border-gray-200 text-base font-bold py-4 px-8 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all flex justify-center items-center gap-2 cursor-pointer duration-300 shadow-sm"
              >
                Ver ofertas directo
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 border-t border-gray-100 pt-6 w-full">
              <div className="flex -space-x-3">
                <img src="https://i.pravatar.cc/100?img=11" alt="user" className="w-10 h-10 rounded-full border-2 border-white shadow-md" loading="lazy" />
                <img src="https://i.pravatar.cc/100?img=12" alt="user" className="w-10 h-10 rounded-full border-2 border-white shadow-md" loading="lazy" />
                <img src="https://i.pravatar.cc/100?img=32" alt="user" className="w-10 h-10 rounded-full border-2 border-white shadow-md" loading="lazy" />
                <div className="w-10 h-10 rounded-full bg-[#ff5a1f] text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-md z-10">+5k</div>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex text-yellow-400 gap-0.5 mb-1">
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                </div>
                <span className="text-xs text-gray-500 font-semibold">Respaldado por resultados clínicos verificados.</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full max-w-[360px] mx-auto relative">
            <div className="relative aspect-[9/16] bg-black rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-4 border-white group">
              {/* VIDEO ORIGINAL HERO YOUTUBE SHORTS */}
              <iframe
                className="w-full h-full absolute top-0 left-0"
                src="https://www.youtube.com/embed/TLVQyLr_U80?autoplay=1&mute=1&loop=1&playlist=TLVQyLr_U80&controls=1&rel=0"
                title="SaludVital Hero Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-gray-800 shadow-md flex items-center gap-1.5 border border-gray-100 z-10">
                <ShieldCheck className="w-4 h-4 text-[#ff5a1f]" /> INVIMA Vigente
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
      <section className="py-20 px-4 bg-gradient-to-br from-white via-orange-50/20 to-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 text-gray-900 leading-tight">
                Por qué las soluciones tradicionales solo empeoran tu estado...
              </h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Laxantes Químicos y Tés Agresivos</h4>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                      Destruyen las microvellosidades del colon y barren la microbiota benéfica, causando un colon perezoso crónico difícil de revertir.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Quemadores de Grasa Hiperestimulantes</h4>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                      Sobrecargan tus glándulas suprarrenales con cafeína, alterando el sistema nervioso, aumentando el cortisol y deteniendo la quema natural de grasas.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-white/90 to-emerald-50/60 p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-emerald-100 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/40 rounded-full blur-2xl"></div>
              <h3 className="text-2xl font-black mb-4 text-[#047857] flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-emerald-600" /> El Enfoque Clínico Correcto
              </h3>
              <p className="text-gray-700 text-base mb-6 leading-relaxed">
                El Reto 28 días le aporta fitonutrientes puros a tu cuerpo. Al limpiar el filtro principal (hígado) y el canal de evacuación (colon), tu metabolismo se desbloquea de forma orgánica y sostenible.
              </p>
              <div className="flex items-center gap-2 font-bold text-emerald-700 bg-emerald-100/80 border border-emerald-200 w-fit px-4 py-2 rounded-full text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-pulse" /> Sinergia Sin Efecto Rebote
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE 4: LA SOLUCIÓN CON TARJETAS INTERACTIVAS */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#fafaf8] to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#ff5a1f] font-bold uppercase tracking-widest text-[11px] bg-orange-100 px-4 py-1.5 rounded-full inline-block">
              Acción Sinergica Modular
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-4">Las 4 Fórmulas de Tu Transformación</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-xs bg-orange-50 text-[#ff5a1f] py-2 px-6 rounded-full font-bold inline-block">
              💡 Haz clic sobre cualquier tarjeta para desplegar sus beneficios y componentes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            
            {/* PRODUCTO 1: MUNO T */}
            <div 
              onClick={() => toggleProduct(1)}
              className={`bg-white p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.02)] border transition-all duration-300 cursor-pointer flex flex-col items-center text-center relative hover:-translate-y-1 hover:shadow-lg ${expandedProduct === 1 ? 'border-[#ff5a1f] ring-4 ring-orange-50' : 'border-gray-100 hover:border-orange-200'}`}
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md whitespace-nowrap animate-bounce flex items-center gap-1 z-10">
                <Star size={12} fill="currentColor" stroke="none" /> Producto Estrella
              </div>
 
              <div className="w-28 h-28 bg-orange-50 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-105 shadow-inner border border-orange-100/50">
                <img src="/muno-t.png" alt="MUNO T" className="w-20 h-20 object-contain" />
              </div>
              <h3 className="font-black text-xl text-gray-900 mb-1">MUNO T</h3>
              <p className="text-[10px] text-[#ff5a1f] font-bold mb-3 uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full">Limpieza Hepática</p>
              
              <div className="text-[11px] bg-orange-50 text-[#ff5a1f] font-extrabold px-3 py-1.5 rounded-xl mb-4 border border-orange-100/30">
                1 Sob: $85k | 2 Sob: $165k | Reto: $300k
              </div>
 
              <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">Desintoxicación hepática de fase I y II, drenaje linfático profundo y modulación digestiva de amplio espectro.</p>
              
              <div className="mt-auto flex items-center gap-1.5 text-xs font-bold text-[#ff5a1f]">
                <Info size={14} /> {expandedProduct === 1 ? "Ocultar detalles" : "Ver componentes y ciencia"}
              </div>
 
              {expandedProduct === 1 && (
                <div className="w-full mt-4 pt-4 border-t border-gray-100 text-left bg-[#faf9f6] p-4 rounded-2xl transition-all">
                  <p className="text-[11px] text-[#ff5a1f] font-bold mb-1 uppercase tracking-wider">🧬 Rigor Clínico:</p>
                  <p className="text-[11px] text-gray-600 leading-relaxed mb-3 font-medium">Estimula la síntesis de glutatión hepático y desinflama las vellosidades de la mucosa intestinal, permitiendo que el colon recupere su motilidad de forma natural.</p>
                  <p className="text-[11px] text-[#ff5a1f] font-bold mb-1 uppercase tracking-wider">🌿 Componentes Activos:</p>
                  <p className="text-[11px] text-gray-600 leading-relaxed font-medium">Extractos estandarizados de Alcachofa, Boldo, Té Verde y prebióticos de alta asimilación.</p>
                </div>
              )}
            </div>
            
            {/* PRODUCTO 2: CELLERGY BOOST */}
            <div 
              onClick={() => toggleProduct(2)}
              className={`bg-white p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.02)] border transition-all duration-300 cursor-pointer flex flex-col items-center text-center relative hover:-translate-y-1 hover:shadow-lg ${expandedProduct === 2 ? 'border-blue-500 ring-4 ring-blue-50' : 'border-gray-100 hover:border-blue-200'}`}
            >
              <div className="w-28 h-28 bg-blue-50 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-105 shadow-inner border border-blue-100/50">
                <img src="/cllrgy-buust.png" alt="CELLERGY BOOST" className="w-20 h-20 object-contain" />
              </div>
              <h3 className="font-black text-xl text-gray-900 mb-1">CELLERGY®</h3>
              <p className="text-[10px] text-blue-600 font-bold mb-4 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">Soporte Inmune & Energía</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">Vitalidad celular inmediata a nivel mitocondrial, blindaje del sistema inmunitario y erradicación de la fatiga crónica.</p>
              
              <div className="mt-auto flex items-center gap-1.5 text-xs font-bold text-blue-600">
                <Info size={14} /> {expandedProduct === 2 ? "Ocultar detalles" : "Ver componentes y ciencia"}
              </div>
 
              {expandedProduct === 2 && (
                <div className="w-full mt-4 pt-4 border-t border-gray-100 text-left bg-[#faf9f6] p-4 rounded-2xl">
                  <p className="text-[11px] text-blue-600 font-bold mb-1 uppercase tracking-wider">🧬 Rigor Clínico:</p>
                  <p className="text-[11px] text-gray-600 leading-relaxed mb-3 font-medium">Incrementa la absorción de micronutrientes esenciales a nivel mitocondrial y optimiza la respuesta leucocitaria protectora.</p>
                  <p className="text-[11px] text-blue-600 font-bold mb-1 uppercase tracking-wider">🌿 Componentes Activos:</p>
                  <p className="text-[11px] text-gray-600 leading-relaxed font-medium">Vitamina C liposomada, Zinc, Selenio, Extracto de Astrágalo y hongo Ganoderma.</p>
                </div>
              )}
            </div>
 
            {/* PRODUCTO 3: NEURO CELL */}
            <div 
              onClick={() => toggleProduct(3)}
              className={`bg-white p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.02)] border transition-all duration-300 cursor-pointer flex flex-col items-center text-center relative hover:-translate-y-1 hover:shadow-lg ${expandedProduct === 3 ? 'border-purple-500 ring-4 ring-purple-50' : 'border-gray-100 hover:border-purple-200'}`}
            >
              <div className="w-28 h-28 bg-purple-50 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-105 shadow-inner border border-purple-100/50">
                <img src="/nrcll.png" alt="NEURO CELL" className="w-20 h-20 object-contain" />
              </div>
              <h3 className="font-black text-xl text-gray-900 mb-1">NEURO CELL</h3>
              <p className="text-[10px] text-purple-600 font-bold mb-4 uppercase tracking-wider bg-purple-50 px-3 py-1 rounded-full">Soporte Cognitivo</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">Nutrición cerebral avanzada, control adaptógeno del estrés y restauración del ciclo de sueño reparador.</p>
              
              <div className="mt-auto flex items-center gap-1.5 text-xs font-bold text-purple-600">
                <Info size={14} /> {expandedProduct === 3 ? "Ocultar detalles" : "Ver componentes y ciencia"}
              </div>
 
              {expandedProduct === 3 && (
                <div className="w-full mt-4 pt-4 border-t border-gray-100 text-left bg-[#faf9f6] p-4 rounded-2xl">
                  <p className="text-[11px] text-purple-600 font-bold mb-1 uppercase tracking-wider">🧬 Rigor Clínico:</p>
                  <p className="text-[11px] text-gray-600 leading-relaxed mb-3 font-medium">Regula la síntesis de neurotransmisores y modula los receptores de GABA en el cerebro, reduciendo el estrés nocturno para inducir descanso profundo.</p>
                  <p className="text-[11px] text-purple-600 font-bold mb-1 uppercase tracking-wider">🌿 Componentes Activos:</p>
                  <p className="text-[11px] text-gray-600 leading-relaxed font-medium">L-Teanina, Magnesio Bisglicinato, Melisa, Ashwagandha KSM-66 y Vitaminas del grupo B.</p>
                </div>
              )}
            </div>
 
            {/* PRODUCTO 4: CELION POWER */}
            <div 
              onClick={() => toggleProduct(4)}
              className={`bg-white p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.02)] border transition-all duration-300 cursor-pointer flex flex-col items-center text-center relative hover:-translate-y-1 hover:shadow-lg ${expandedProduct === 4 ? 'border-emerald-500 ring-4 ring-emerald-50' : 'border-gray-100 hover:border-emerald-200'}`}
            >
              <div className="w-28 h-28 bg-emerald-50 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-105 shadow-inner border border-emerald-100/50">
                <img src="/celion-pwr.png" alt="CELION POWER" className="w-20 h-20 object-contain" />
              </div>
              <h3 className="font-black text-xl text-gray-900 mb-1">CELION PWR</h3>
              <p className="text-[10px] text-emerald-600 font-bold mb-4 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">Rendimiento Físico</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">Combustible celular (ATP), alcalinización del plasma sanguíneo y recuperación acelerada de la fatiga muscular.</p>
              
              <div className="mt-auto flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <Info size={14} /> {expandedProduct === 4 ? "Ocultar detalles" : "Ver componentes y ciencia"}
              </div>
 
              {expandedProduct === 4 && (
                <div className="w-full mt-4 pt-4 border-t border-gray-100 text-left bg-[#faf9f6] p-4 rounded-2xl">
                  <p className="text-[11px] text-emerald-600 font-bold mb-1 uppercase tracking-wider">🧬 Rigor Clínico:</p>
                  <p className="text-[11px] text-gray-600 leading-relaxed mb-3 font-medium">Acelera la eliminación del ácido láctico acumulado y promueve la oxigenación y regeneración celular tras el esfuerzo físico.</p>
                  <p className="text-[11px] text-emerald-600 font-bold mb-1 uppercase tracking-wider">🌿 Componentes Activos:</p>
                  <p className="text-[11px] text-gray-600 leading-relaxed font-medium">Spirulina estandarizada, Clorela, Coenzima Q10, Hierro Aminoquelado y electrolitos naturales.</p>
                </div>
              )}
            </div>
 
          </div>
        </div>
      </section>

      {/* SECCIÓN DE VIDEO 1: ENFOQUE CLÍNICO MUNO T */}
      <section className="py-16 px-4 bg-orange-50 border-y border-orange-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-5/12 max-w-[320px] mx-auto">
            <div className="relative aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-xl border-4 border-white">
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
              {/* VIDEO YOUTUBE SHORTS RUTINA */}
              <iframe
                className="w-full h-full absolute top-0 left-0"
                src="https://www.youtube.com/embed/kEnXwATDzHM?rel=0"
                title="SaludVital Rutina Diaria"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="w-full md:w-7/12">
            <span className="text-[#f1560f] font-black uppercase text-xs tracking-wider bg-orange-100 px-3 py-1 rounded">Preparación en Tiempo Real</span>
            <h2 className="text-3xl font-black text-gray-900 mt-3 mb-4">Mira lo Fácil que es Preparar tu Muno T</h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              Nuestra fórmula biocéutica ha sido diseñada para una disolución instantánea y una absorción celular ultra veloz. En menos de un minuto tendrás lista tu dosis diaria de limpieza hepática.
            </p>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f1560f] text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Paso 1: Servir el Agua</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Sirve entre 150ml y 200ml de agua fresca en tu vaso o termo de preferencia.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f1560f] text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Paso 2: Agregar Muno T</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Vierte el sobre completo en el vaso. La fórmula comenzará a disolverse de inmediato.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Paso 3: Mezclar y Consumir</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Remueve suavemente durante unos segundos hasta disolver por completo y tómalo en el acto.</p>
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

      {/* SECCIÓN TESTIMONIOS: RESULTADOS REALES DE PACIENTES */}
      <section className="py-24 px-4 bg-white border-t border-gray-100 relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-[#ff5a1f] font-bold uppercase tracking-widest text-[11px] bg-orange-100 px-4 py-1.5 rounded-full inline-block mb-3">
              Historias de Éxito
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              Testimonios Reales y Resultados
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base font-medium">
              Conoce las opiniones y fotos de personas reales que decidieron desintoxicar su cuerpo y recuperar su vitalidad con el Reto 28 Días.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Testimonio 1: Alejandra Duque */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_15px_30px_rgba(0,0,0,0.02)] border border-gray-100/80 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-orange-100 bg-orange-50 flex items-center justify-center font-bold text-[#ff5a1f] text-sm">
                    AD
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 leading-tight">Alejandra Duque</h4>
                    <span className="text-[11px] text-gray-400 font-semibold">Piedecuesta, Santander</span>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3 text-amber-400">
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  "Mi digestión cambió por completo en las primeras dos semanas. Logré desinflamar mi abdomen y recuperar mi energía diaria de manera notable."
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner group-hover:border-orange-100 transition-colors">
                  <img 
                    src="/alejandra_duque.jpeg" 
                    alt="Alejandra Duque Testimonio" 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" 
                  />
                  <div className="absolute top-3 right-3 bg-[#ff5a1f] text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    1 Mes
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 bg-[#faf9f6] p-3 rounded-2xl text-[10px] font-bold text-gray-700">
                  <div className="flex justify-between border-r border-gray-200/80 pr-2">
                    <span className="text-gray-400">Abdomen:</span>
                    <span className="text-emerald-600">-6 cm</span>
                  </div>
                  <div className="flex justify-between pl-2">
                    <span className="text-gray-400">Digestión:</span>
                    <span className="text-emerald-600">Excelente</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonio 2: Luisa Buitrago */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_15px_30px_rgba(0,0,0,0.02)] border border-gray-100/80 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-orange-100 bg-orange-50 flex items-center justify-center font-bold text-[#ff5a1f] text-sm">
                    LB
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 leading-tight">Luisa Buitrago</h4>
                    <span className="text-[11px] text-gray-400 font-semibold">Bucaramanga</span>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3 text-amber-400">
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  "Estaba cansada de tomar laxantes irritantes. Con este reto logré regular mi tránsito intestinal y deshincharme de forma totalmente natural."
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner group-hover:border-orange-100 transition-colors">
                  <img 
                    src="/luisa_buitrago.jpeg" 
                    alt="Luisa Buitrago Testimonio" 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" 
                  />
                  <div className="absolute top-3 right-3 bg-[#ff5a1f] text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Salud Digestiva
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 bg-[#faf9f6] p-3 rounded-2xl text-[10px] font-bold text-gray-700">
                  <div className="flex justify-between border-r border-gray-200/80 pr-2">
                    <span className="text-gray-400">Tránsito:</span>
                    <span className="text-emerald-600">Regular</span>
                  </div>
                  <div className="flex justify-between pl-2">
                    <span className="text-gray-400">Energía:</span>
                    <span className="text-emerald-600">Estable</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonio 3: Paula Prada */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_15px_30px_rgba(0,0,0,0.02)] border border-gray-100/80 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-orange-100 bg-orange-50 flex items-center justify-center font-bold text-[#ff5a1f] text-sm">
                    PP
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 leading-tight">Paula Prada</h4>
                    <span className="text-[11px] text-gray-400 font-semibold">Floridablanca</span>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3 text-amber-400">
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  "Logré bajar de peso sin aguantar hambre, sintiéndome vital y muy liviana. Los hábitos del reto son súper fáciles de incorporar día a día."
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner group-hover:border-orange-100 transition-colors">
                  <img 
                    src="/paula_prada.jpeg" 
                    alt="Paula Prada Testimonio" 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" 
                  />
                  <div className="absolute top-3 right-3 bg-[#ff5a1f] text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Fit & Vital
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 bg-[#faf9f6] p-3 rounded-2xl text-[10px] font-bold text-gray-700">
                  <div className="flex justify-between border-r border-gray-200/80 pr-2">
                    <span className="text-gray-400">Peso:</span>
                    <span className="text-emerald-600">-5 kg</span>
                  </div>
                  <div className="flex justify-between pl-2">
                    <span className="text-gray-400">Vitalidad:</span>
                    <span className="text-emerald-600">Alta</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonio 4: Sirley */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_15px_30px_rgba(0,0,0,0.02)] border border-gray-100/80 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-orange-100 bg-orange-50 flex items-center justify-center font-bold text-[#ff5a1f] text-sm">
                    S
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 leading-tight">Sirley</h4>
                    <span className="text-[11px] text-gray-400 font-semibold">Girón, Santander</span>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3 text-amber-400">
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                  <Star fill="currentColor" size={14} stroke="none" />
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  "Mi piel mejoró muchísimo, me siento más liviana y volví a dormir profundo. La sinergia de los productos limpia desde adentro y se nota."
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner group-hover:border-orange-100 transition-colors">
                  <img 
                    src="/sirley.jpeg" 
                    alt="Sirley Testimonio" 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" 
                  />
                  <div className="absolute top-3 right-3 bg-[#ff5a1f] text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Detox Celular
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 bg-[#faf9f6] p-3 rounded-2xl text-[10px] font-bold text-gray-700">
                  <div className="flex justify-between border-r border-gray-200/80 pr-2">
                    <span className="text-gray-400">Piel:</span>
                    <span className="text-emerald-600">Luminosa</span>
                  </div>
                  <div className="flex justify-between pl-2">
                    <span className="text-gray-400">Sueño:</span>
                    <span className="text-emerald-600">Reparador</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN INTERACTIVA: QUIZ DE TOXICIDAD CELULAR */}
      <section ref={quizRef} className="py-24 px-4 bg-gradient-to-b from-[#fafaf8] to-orange-50/20 border-t border-gray-100 relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="text-[#ff5a1f] font-bold uppercase tracking-widest text-[11px] bg-orange-100 px-4 py-1.5 rounded-full inline-block">
              Evaluación Gratuita
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-4 mb-3">
              ¿Tu cuerpo está acumulando toxinas?
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-base leading-relaxed font-medium">
              Responde estas 4 preguntas rápidas para evaluar tu nivel de congestión digestiva, saturación hepática y celular.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-white/55 relative overflow-hidden">
            {/* Círculos decorativos de fondo */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl"></div>

            {quizStep === -1 ? (
              // Pantalla de Inicio del Quiz
              <div className="text-center py-6 relative z-10">
                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-orange-100">
                  <Activity className="w-10 h-10 text-[#ff5a1f] animate-pulse" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">Test Clínico de Saturación Celular</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                  Descubre qué áreas de tu organismo (colon, hígado o sistema mitocondrial) necesitan una limpieza biológica prioritaria.
                </p>
                <button 
                  onClick={startQuiz} 
                  className="bg-[#ff5a1f] text-white font-bold py-4 px-10 rounded-2xl shadow-lg hover:bg-[#e24a13] hover:scale-[1.02] transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-yellow-300" /> INICIAR EVALUACIÓN GRATIS
                </button>
              </div>
            ) : isCalculating ? (
              // Pantalla de Cargando con micro-animaciones
              <div className="text-center py-12 relative z-10">
                <Loader2 className="w-12 h-12 text-[#ff5a1f] animate-spin mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Calculando Diagnóstico</h3>
                <div className="w-full bg-gray-100 h-2 rounded-full max-w-xs mx-auto overflow-hidden mb-6">
                  <div 
                    className="bg-[#ff5a1f] h-full transition-all duration-1000 ease-out" 
                    style={{ width: `${(calcStep + 1) * 25}%` }}
                  ></div>
                </div>
                <p className="text-[#ff5a1f] font-bold text-sm tracking-wide animate-pulse">
                  {loadingSteps[calcStep]}
                </p>
              </div>
            ) : quizFinished && quizResult ? (
              // Pantalla de Resultados
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center gap-1.5 border px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 animate-bounce ${
                    quizResult.level === 'Crítico' ? 'bg-red-50 text-red-700 border-red-100' :
                    quizResult.level === 'Alto' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                    'bg-emerald-50 text-emerald-700 border-emerald-100'
                  }`}>
                    <AlertTriangle className="w-4 h-4" /> Saturación: {quizResult.level}
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-2">Resultado de tu Test</h3>
                  
                  <div className="relative w-full bg-gray-100 h-6 rounded-full max-w-md mx-auto overflow-hidden mt-6 shadow-inner border border-gray-200">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        quizResult.percent > 80 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                        quizResult.percent > 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                        'bg-gradient-to-r from-emerald-500 to-yellow-500'
                      }`}
                      style={{ width: `${quizResult.percent}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-gray-800">
                      Nivel de Saturación Celular: {quizResult.percent}%
                    </div>
                  </div>
                </div>

                <div className="bg-[#faf9f6] p-6 rounded-2xl border border-gray-100 mb-8">
                  <h4 className="font-bold text-gray-900 mb-2 text-base">Análisis de Sintomatología:</h4>
                  <p className="text-gray-700 text-sm leading-relaxed font-medium">{quizResult.desc}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button 
                    onClick={scrollToCheckout}
                    className="w-full sm:w-auto bg-[#ff5a1f] text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:bg-[#e24a13] hover:scale-[1.02] transition-all cursor-pointer flex justify-center items-center gap-2"
                  >
                    VER MI TRATAMIENTO RECOMENDADO <ArrowRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={startQuiz}
                    className="w-full sm:w-auto bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 font-bold py-4 px-6 rounded-2xl transition-all cursor-pointer"
                  >
                    Repetir Test
                  </button>
                </div>
              </div>
            ) : (
              // Preguntas del Quiz
              <div className="relative z-10">
                <div className="flex justify-between items-center text-xs text-gray-400 font-bold uppercase tracking-wider mb-6">
                  <span>Pregunta {quizStep + 1} de {quizQuestions.length}</span>
                  <span>{Math.round(((quizStep) / quizQuestions.length) * 100)}% Completado</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-8">
                  <div 
                    className="bg-[#ff5a1f] h-full transition-all duration-300"
                    style={{ width: `${((quizStep) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-8 leading-tight">
                  {quizQuestions[quizStep].question}
                </h3>

                <div className="space-y-4">
                  {quizQuestions[quizStep].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(option.points)}
                      className="w-full text-left bg-white hover:bg-orange-50/50 border border-gray-100 hover:border-[#ff5a1f] p-5 rounded-2xl font-semibold text-gray-800 hover:text-gray-900 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex items-center justify-between group"
                    >
                      <span className="text-sm md:text-base">{option.text}</span>
                      <div className="w-6 h-6 rounded-full border border-gray-200 group-hover:border-[#ff5a1f] group-hover:bg-[#ff5a1f] flex items-center justify-center shrink-0 transition-colors">
                        <Check className="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BLOQUE CHECKOUT FUSIONADO (SELECCIÓN Y FORMULARIO) */}
      <section ref={checkoutRef} className="py-24 px-4 bg-gradient-to-b from-white to-[#fafaf8] border-t border-gray-100 relative">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          
          {/* COLUMNA IZQUIERDA: SELECCIÓN DE PAQUETE */}
          <div className="lg:w-1/2 w-full">
            <span className="text-[#ff5a1f] font-bold uppercase tracking-widest text-[11px] bg-orange-100 px-4 py-1.5 rounded-full inline-block mb-4">
              Realiza tu Pedido Hoy
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">Elige tu Paquete.</h2>
            <p className="text-gray-600 mb-8 text-base font-medium">Selecciona la oferta que mejor se adapte a tus necesidades y completa el formulario para coordinar tu entrega.</p>
            
            <div className="space-y-4 mb-6">
              
              {/* Opción 1: MUNO T */}
              <label className={`cursor-pointer block border-2 rounded-3xl p-5 transition-all relative ${selectedPackage === 'muno1' ? 'border-[#ff5a1f] bg-orange-50/20 ring-4 ring-orange-50 shadow-md' : 'border-gray-100 hover:border-orange-200 bg-white shadow-sm'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={selectedPackage === 'muno1'} onChange={() => setSelectedPackage('muno1')} className="w-5 h-5 accent-[#ff5a1f]" />
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{packages.muno1.name}</h4>
                      <p className="text-xs text-gray-500 font-medium">{packages.muno1.desc}</p>
                    </div>
                  </div>
                  <div className="text-xl font-black text-[#ff5a1f]">${packages.muno1.price.toLocaleString('es-CO')}</div>
                </div>
              </label>

              {/* Opción 2: 2 MUNO T */}
              <label className={`cursor-pointer block border-2 rounded-3xl p-5 transition-all relative ${selectedPackage === 'muno2' ? 'border-[#ff5a1f] bg-orange-50/20 ring-4 ring-orange-50 shadow-md' : 'border-gray-100 hover:border-orange-200 bg-white shadow-sm'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={selectedPackage === 'muno2'} onChange={() => setSelectedPackage('muno2')} className="w-5 h-5 accent-[#ff5a1f]" />
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{packages.muno2.name}</h4>
                      <p className="text-xs text-gray-500 font-medium">{packages.muno2.desc}</p>
                    </div>
                  </div>
                  <div className="text-xl font-black text-[#ff5a1f]">${packages.muno2.price.toLocaleString('es-CO')}</div>
                </div>
              </label>

              {/* Opción 3: RETO 28 DÍAS (DESTACADO) */}
              <label className={`cursor-pointer block border-2 rounded-3xl p-6 transition-all relative bg-white ${selectedPackage === 'reto' ? 'border-[#ff5a1f] bg-orange-50/30 ring-4 ring-orange-100 shadow-md' : 'border-orange-200 hover:border-[#ff5a1f] shadow-sm'}`}>
                <div className="absolute -top-3.5 right-6 bg-yellow-400 text-gray-900 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm animate-pulse">Mejor Oferta</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={selectedPackage === 'reto'} onChange={() => setSelectedPackage('reto')} className="w-5 h-5 accent-[#ff5a1f]" />
                    <div>
                      <h4 className="font-bold text-xl text-gray-900">{packages.reto.name}</h4>
                      <p className="text-xs text-gray-500 font-semibold">{packages.reto.desc}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-black text-[#ff5a1f]">${packages.reto.price.toLocaleString('es-CO')}</div>
                </div>
              </label>

            </div>

            <div className="flex justify-between items-center mb-4 text-emerald-800 bg-emerald-50/80 border border-emerald-100 p-4 rounded-2xl">
              <span className="flex items-center gap-2 font-semibold text-sm"><Truck className="w-5 h-5 text-emerald-600" /> Envío Priority en Piedecuesta</span>
              <span className="font-black text-xs uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full text-emerald-700">¡GRATIS!</span>
            </div>

            <div className="flex justify-between items-center mb-6 text-[#ff5a1f] bg-orange-50/50 border border-orange-100/60 p-4 rounded-2xl">
              <span className="flex items-center gap-2 font-semibold text-sm text-gray-700"><Truck className="w-5 h-5 text-[#ff5a1f]" /> Bucaramanga y resto de área metropolitana</span>
              <span className="font-black text-xs uppercase tracking-widest bg-orange-100 text-[#ff5a1f] px-3 py-1 rounded-full">$12.000</span>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
               <div className="flex items-center gap-3 mb-2">
                 <ShieldCheck className="w-8 h-8 text-emerald-600" />
                 <span className="text-sm font-bold text-gray-700">Garantía de Calidad y Registro Invima</span>
               </div>
               <div className="flex gap-2 flex-wrap mt-3">
                 <span className="text-[10px] font-bold bg-orange-50 text-[#ff5a1f] border border-orange-100 px-3 py-1.5 rounded-full">Registro MUNO T: NSA-0013391-2023</span>
                 <span className="text-[10px] font-bold bg-orange-50 text-[#ff5a1f] border border-orange-100 px-3 py-1.5 rounded-full">Sinergia Fitoterapéutica Certificada</span>
               </div>
            </div>
          </div>
          
          {/* COLUMNA DERECHA: FORMULARIO DETALLADO */}
          <div className="lg:w-1/2 w-full">
            <form onSubmit={handlePayment} className="bg-white text-gray-900 p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100/20 rounded-full blur-3xl"></div>
              <h3 className="text-2xl font-black mb-6 text-gray-900 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-[#ff5a1f]" /> Datos de Envío
              </h3>
              
              <div className="space-y-5 mb-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2 tracking-widest">Nombre Completo</label>
                  <input required maxLength={80} type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className="w-full bg-[#faf9f6] border border-gray-200 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#ff5a1f] focus:bg-white transition-all font-medium" placeholder="Ej: Juan Pérez" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2 tracking-widest">Teléfono / WhatsApp</label>
                    <input 
                      required 
                      type="tel" 
                      name="telefono" 
                      value={formData.telefono} 
                      onChange={handleInputChange} 
                      pattern="3[0-9]{9}"
                      maxLength={10}
                      minLength={10}
                      className="w-full bg-[#faf9f6] border border-gray-200 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#ff5a1f] focus:bg-white transition-all font-medium" 
                      placeholder="Ej: 3101234567" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2 tracking-widest">Ciudad / Municipio</label>
                    <input required maxLength={60} type="text" name="ciudad" value={formData.ciudad} onChange={handleInputChange} className="w-full bg-[#faf9f6] border border-gray-200 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#ff5a1f] focus:bg-white transition-all font-medium" placeholder="Ej: Piedecuesta" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2 tracking-widest">Dirección Exacta</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-4 top-4" />
                    <input required maxLength={120} type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} className="w-full bg-[#faf9f6] border border-gray-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#ff5a1f] focus:bg-white transition-all font-medium" placeholder="Barrio, Calle, Número..." />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2 tracking-widest">Método de Pago</label>
                  <select name="metodoPago" value={formData.metodoPago} onChange={handleInputChange} className="w-full bg-[#faf9f6] border border-gray-200 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#ff5a1f] focus:bg-white transition-all font-semibold">
                    <option value="contraentrega">Pago Contra Entrega (Pagas al recibir)</option>
                    <option value="anticipado">Pago Anticipado (Nequi / Bancolombia / Daviplata)</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full bg-[#ff5a1f] text-white text-base font-extrabold py-4 px-8 rounded-2xl shadow-lg hover:bg-[#e24a13] hover:scale-[1.01] active:scale-[0.99] transition-all flex justify-center items-center gap-2 cursor-pointer">
                <CreditCard className="w-5 h-5 text-yellow-300" /> ENVIAR PEDIDO POR WHATSAPP
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
            <HelpCircle className="w-12 h-12 text-[#ff5a1f] mx-auto mb-3" />
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
                a: "Es la modalida más segura y confiable. Solamente debes hacer tu solicitud llenando el formulario de envío. Nosotros prepararemos tu paquete, el mensajero irá hasta tu domicilio y tú pagarás en efectivo únicamente al tener los productos en tus manos. ¡Cero riesgos!" 
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
              <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:border-[#ff5a1f]/50">
                <button onClick={() => toggleFaq(index)} className="w-full px-6 py-5 text-left font-bold text-gray-900 flex justify-between items-center bg-[#faf9f6] hover:bg-orange-50/50 transition-colors">
                  <span className="pr-4 text-sm md:text-base">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#ff5a1f] shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
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
          <span className="text-[#ff5a1f] font-black uppercase tracking-widest text-sm mb-2 block">Respaldo Científico</span>
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