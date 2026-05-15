import { Play } from 'lucide-react';
import React from 'react';

export default function App() {
  const WHATSAPP_NUMBER = "573001234567"; // Replace with actual number
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola. vengo de la página web y quiero empezar mi Reto de 28 días.")}`;

  return (
    <div className="w-full min-h-screen bg-[#fafaf8] flex flex-col font-sans text-[#1a1a1a]">
      <header className="bg-[#2c5e2e] text-white py-4 px-4 sm:px-8 flex justify-between items-center shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex-shrink-0"></div>
          <span className="font-bold text-lg sm:text-xl tracking-tight uppercase">SaludVital</span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-center">Registro INVIMA<br/>RSAD13I89215</span>
          </div>
          <a href="#comprar" className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 rounded-full font-bold text-xs sm:text-sm uppercase transition-all shadow-md mt-1 sm:mt-0 items-center justify-center flex">
            Comprar
          </a>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-0 overflow-visible">
        {/* ATTENTION SECTION */}
        <section className="lg:col-span-5 bg-white lg:border-r border-gray-100 p-6 sm:p-8 flex flex-col justify-center min-h-[50vh] lg:min-h-[calc(100vh-80px)]">
          <div className="mb-6 lg:mb-8">
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded text-[10px] sm:text-xs font-black uppercase mb-4 inline-block">Desafío de Transformación</span>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-[#2c5e2e] leading-tight sm:leading-none mb-4">
              RETO<br/>28 DÍAS
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-sm mb-6">
              Desintoxica, revitaliza y fortalece tu sistema inmune con nuestro combo de alta eficiencia.
            </p>
            
            <div className="relative w-full max-w-md aspect-video bg-black rounded-xl overflow-hidden shadow-2xl flex items-center justify-center group cursor-pointer mb-6 lg:mb-0">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <Play className="w-8 h-8 text-white ml-1 fill-white" />
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-white text-[10px] uppercase font-bold tracking-widest">VSL Video Autoplay</span>
              </div>
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

        {/* INTEREST / DESIRE / ACTION SECTION */}
        <section className="lg:col-span-7 p-6 sm:p-8 flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:content-center bg-[#fafaf8] min-h-[50vh] lg:min-h-[calc(100vh-80px)]">
          
          {/* MUNO T */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-black text-lg sm:text-xl text-[#2c5e2e]">MUNO T</h3>
              <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded uppercase">Estrella</span>
            </div>
            <p className="text-xs text-gray-500 italic mb-4">Té Detox / Infusión</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold mt-0.5">•</span> <div><strong>Desinflama:</strong> Ayuda a reducir la inflamación celular.</div></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold mt-0.5">•</span> <div><strong>Estimula:</strong> Favorece y estimula la digestión.</div></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold mt-0.5">•</span> <div><strong>Desintoxica:</strong> Promueve la desintoxicación del hígado, el colon y los riñones.</div></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold mt-0.5">•</span> <div><strong>Purifica:</strong> Contribuye a la eliminación de metales pesados del organismo.</div></li>
            </ul>
          </div>

          {/* CELLERGY BOOST */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <h3 className="font-black text-lg sm:text-xl text-[#2c5e2e] mb-2">CELLERGY BOOST</h3>
            <p className="text-xs text-gray-500 italic mb-4">Bebida energética / Revitalizante</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold mt-0.5">•</span> <div><strong>Energiza:</strong> Promueve un aumento en la energía a nivel celular.</div></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold mt-0.5">•</span> <div><strong>Enfoque:</strong> Ayuda con la concentración y la claridad mental.</div></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold mt-0.5">•</span> <div><strong>Antioxidante:</strong> Proporciona antioxidantes que combaten el daño celular.</div></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold mt-0.5">•</span> <div><strong>Fortalece:</strong> Apoya y fortalece la salud cardiovascular.</div></li>
            </ul>
          </div>

          {/* NEURO CELL */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <h3 className="font-black text-lg sm:text-xl text-[#2c5e2e] mb-2">NEURO CELL</h3>
            <p className="text-xs text-gray-500 italic mb-4">Bebida en polvo</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold mt-0.5">•</span> <div><strong>Concentración:</strong> Ayuda a mejorar la concentración y el estado de alerta.</div></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold mt-0.5">•</span> <div><strong>Descanso:</strong> Contribuye a reducir los riesgos asociados a la salud del sueño.</div></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold mt-0.5">•</span> <div><strong>Biorritmo Cerebral:</strong> Promueve una correcta función cerebral.</div></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold mt-0.5">•</span> <div><strong>Bienestar:</strong> Brinda una sensación general de bienestar y plenitud.</div></li>
            </ul>
          </div>

          {/* CELION POWER */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <h3 className="font-black text-lg sm:text-xl text-[#2c5e2e] mb-2">CELION POWER</h3>
            <p className="text-xs text-gray-500 italic mb-4">Bebida en polvo</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold mt-0.5">•</span> <div><strong>Antioxidante:</strong> Actúa como un poderoso antioxidante que combate radicales libres.</div></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold mt-0.5">•</span> <div><strong>Oxigenación:</strong> Oxigena la sangre, lo cual mejora la función celular.</div></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold mt-0.5">•</span> <div><strong>Nutrición:</strong> Nutre el cuerpo aportando más de 240 micronutrientes.</div></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold mt-0.5">•</span> <div><strong>Sistema Inmune:</strong> Fortalece el sistema inmune, ayudando a combatir enfermedades.</div></li>
            </ul>
          </div>

          {/* PURCHASE COMBO CTA */}
          <div id="comprar" className="lg:col-span-2 bg-[#2c5e2e] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between shadow-lg gap-6 mt-4 lg:mt-0 w-full overflow-hidden">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest opacity-80 mb-1">Combo Completo</span>
              <h4 className="text-3xl sm:text-4xl font-black">$335.000 COP</h4>
              <p className="text-[10px] sm:text-xs opacity-70 mt-1 uppercase font-semibold">Envío gratis a todo el país</p>
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs w-full">
                <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                <span className="whitespace-normal">¡Pocas unidades disponibles hoy!</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-orange-500 hover:bg-orange-600 text-white py-3 sm:py-4 px-4 sm:px-8 rounded-xl font-black uppercase text-sm shadow-xl text-center transition-transform hover:scale-105 whitespace-nowrap"
              >
                Comprar el Combo
              </a>
              <button className="bg-transparent border border-white/30 hover:bg-white/10 transition-colors text-white py-2 px-4 sm:px-8 rounded-xl font-bold uppercase text-[10px] sm:text-xs text-center whitespace-nowrap">
                Ver más detalles
              </button>
            </div>
          </div>

        </section>
      </main>

      {/* WHATSAPP STICKY BUTTON */}
      <div className="fixed bottom-6 right-6 flex items-center gap-4 z-50 animate-bounce">
        <div className="hidden sm:block bg-white py-2 px-4 rounded-full shadow-xl border border-gray-100 text-xs font-bold text-gray-800">
          ¡Habla con un asesor!
        </div>
        <a 
          href={WHATSAPP_URL} 
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
        >
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
