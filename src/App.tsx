import { Play } from 'lucide-react';
import React from 'react';

export default function App() {
  // CONFIGURACIÓN DE CONTACTO
  const WHATSAPP_NUMBER = "573103065773"; 
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola. vengo de la página web y quiero empezar mi Reto de 28 días.")}`;

  return (
    <div className="w-full min-h-screen bg-[#fafaf8] flex flex-col font-sans text-[#1a1a1a]">
      
      {/* ENCABEZADO / HEADER */}
      <header className="bg-[#2c5e2e] text-white py-4 px-4 sm:px-8 flex justify-between items-center shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          {/* Ruta corregida para el logo */}
          <img 
            src="/logo.png" 
            alt="SaludVital Logo" 
            className="h-10 sm:h-12 w-auto object-contain" 
          />
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-center leading-tight">
              Productos con<br/>Sello INVIMA
            </span>
          </div>
          <a href="#comprar" className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 rounded-full font-bold text-xs sm:text-sm uppercase transition-all shadow-md items-center justify-center flex">
            Comprar
          </a>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-0 overflow-visible">
        
        {/* SECCIÓN DE ATENCIÓN (IZQUIERDA) - LAYOUT ORIGINAL */}
        <section className="lg:col-span-5 bg-white lg:border-r border-gray-100 p-6 sm:p-8 flex flex-col justify-center min-h-[50vh] lg:min-h-[calc(100vh-80px)]">
          <div className="mb-6 lg:mb-8 text-center flex flex-col items-center">
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded text-[10px] sm:text-xs font-black uppercase mb-4 inline-block">
              Desafío de Transformación
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-[#2c5e2e] leading-tight mb-4">
              RETO<br/>28 DÍAS
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-sm mb-8">
              Desintoxica, revitaliza y fortalece tu sistema inmune con nuestro combo de alta eficiencia.
            </p>
            
            {/* VIDEO VSL VERTICAL 9/16 */}
            <div className="relative w-full aspect-[9/16] max-w-[280px] sm:max-w-[320px] bg-black rounded-xl overflow-hidden shadow-2xl flex items-center justify-center mb-6 lg:mb-0">
              <video 
                controls 
                className="w-full h-full object-cover"
                poster="/logo.png"
              >
                <source src="/video-munot.mp4" type="video/mp4" />
                Tu navegador no soporta la reproducción de videos.
              </video>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-auto lg:border-t lg:pt-6">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold z-30">+5k</div>
              <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white z-20"></div>
              <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white z-10"></div>
            </div>
            <p className="text-xs font-medium text-gray-500">
              Más de <span className="text-[#2c5e2e] font-bold">5,000 personas</span> han iniciado su cambio este mes.
            </p>
          </div>
        </section>

        {/* SECCIÓN DE PRODUCTOS (DERECHA) - LAYOUT ORIGINAL */}
        <section className="lg:col-span-7 p-6 sm:p-8 flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:content-center bg-[#fafaf8] min-h-[50vh] lg:min-h-[calc(100vh-80px)]">
          
          {/* MUNO T */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
            <img src="/muno-t.png" alt="MUNO T" className="w-16 h-16 sm:w-20 sm:h-20 object-contain flex-shrink-0" />
            <div className="flex flex-col">
              <h3 className="font-black text-lg text-[#2c5e2e]">MUNO T</h3>
              <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase">NSA-1373-2026</p>
              <p className="text-xs text-gray-600 leading-tight">Desinflama y Desintoxica hígado y colon.</p>
            </div>
          </div>

          {/* CELLERGY BOOST® */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
            <img src="/cllrgy-buust.png" alt="CELLERGY BOOST®" className="w-16 h-16 sm:w-20 sm:h-20 object-contain flex-shrink-0" />
            <div className="flex flex-col">
              <h3 className="font-black text-lg text-[#2c5e2e]">CELLERGY BOOST®</h3>
              <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase">RSA-1473-2026</p>
              <p className="text-xs text-gray-600 leading-tight">Vitalidad natural y enfoque mental.</p>
            </div>
          </div>

          {/* NEURO CELL */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
            <img src="/nrcll.png" alt="NEURO CELL" className="w-16 h-16 sm:w-20 sm:h-20 object-contain flex-shrink-0" />
            <div className="flex flex-col">
              <h3 className="font-black text-lg text-[#2c5e2e]">NEURO CELL</h3>
              <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase">RSA-1474-2026</p>
              <p className="text-xs text-gray-600 leading-tight">Nutrición cerebral y sueño reparador.</p>
            </div>
          </div>

          {/* CELION POWER */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
            <img src="/celion-pwr.png" alt="CELION POWER" className="w-16 h-16 sm:w-20 sm:h-20 object-contain flex-shrink-0" />
            <div className="flex flex-col">
              <h3 className="font-black text-lg text-[#2c5e2e]">CELION POWER</h3>
              <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase">RSA-1475-2026</p>
              <p className="text-xs text-gray-600 leading-tight">Moringa y Espirulina para tus defensas.</p>
            </div>
          </div>

          {/* CTA DE COMPRA */}
          <div id="comprar" className="lg:col-span-2 bg-[#2c5e2e] rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between shadow-lg gap-4 mt-4 w-full">
            <div className="flex flex-col">
              <h4 className="text-3xl font-black">$335.000 COP</h4>
              <p className="text-[10px] opacity-70 uppercase">Envío gratis + Pago contraentrega</p>
            </div>
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-xl font-black uppercase text-sm shadow-xl transition-transform hover:scale-105"
            >
              Comprar el Combo
            </a>
          </div>

        </section>
      </main>

      {/* BOTÓN FLOTANTE WHATSAPP */}
      <div className="fixed bottom-6 right-6 z-50">
        <a href={WHATSAPP_URL} target="_blank" className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl animate-pulse">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>

    </div>
  );
}