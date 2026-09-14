import type { HomeEntity } from './home.entity'

export const defaultHomeData: HomeEntity = {
  hero: {
    kicker: 'Bradesco llega a México',
    title: 'Tu dinero, en\nmovimiento\ncontigo.',
    lead: 'Una cuenta digital para pagar, organizar y avanzar hacia tus planes desde una sola app.',
    legal: 'La información, beneficios y condiciones mostrados son ilustrativos y están sujetos a disponibilidad, validación y términos aplicables.',
    primaryButton: { text: 'Conoce la cuenta', url: '#cuenta' },
    secondaryButton: { text: 'Descubre Bradesco', url: '#nosotros' },
  },
  experience: {
    title: 'Diseñada para acompañar tu ritmo.',
    lead: 'Dos escenas de producto muestran cómo puede sentirse una experiencia digital cercana, simple y dinámica.',
    features: [
      { title: 'Una experiencia\ndigital.', description: 'Pensada para consultar y gestionar desde tu celular.', icon: '' },
      { title: 'Información\nclara.', description: 'Beneficios, requisitos y condiciones antes de decidir.', icon: '' },
      { title: 'Respaldo\nBradesco.', description: 'Una marca que inicia una nueva historia en México.', icon: '' },
    ],
  },
  account: {
    title: 'Una cuenta para lo\nque pasa todos los\ndías.',
    lead: 'Consulta, organiza y toma decisiones desde una experiencia simple y diseñada para darte claridad.',
  },
  steps: {
    title: 'De conocerla a usarla.',
    list: [
      { title: 'Descarga la app.', description: 'Entra desde la tienda disponible para tu dispositivo.' },
      { title: 'Confirma tu identidad.', description: 'Sigue un proceso guiado, claro y protegido.' },
      { title: 'Empieza a usarla.', description: 'Consulta tu cuenta y descubre sus posibilidades.' },
    ],
  },
  promo: {
    title: 'Una tarjeta para llevar contigo.',
    lead: 'Exploración visual con los recursos recibidos. Los productos, nombres y beneficios definitivos quedan sujetos a validación.',
    button: 'Conoce más',
  },
  security: {
    title: 'Tu dinero merece un espacio seguro.',
    lead: 'Diseñamos cada interacción para ayudarte a reconocer lo que sucede y actuar cuando lo necesites.',
  },
  learn: {
    title: 'Entender también es avanzar.',
    lead: 'Contenidos breves para tomar decisiones con más contexto.',
  },
  newsletter: {
    title: 'Información útil, directo en tu correo.',
    lead: 'Recibe contenidos de educación financiera y novedades de Bradesco México. Sin saturar tu bandeja.',
  },
  faq: {
    title: 'Respuestas antes de empezar.',
    list: [
      { question: '¿Qué es la cuenta digital de Bradesco México?', answer: 'Es una propuesta digital actualmente en definición. La información definitiva se incorporará después de la validación de Producto y Legal.' },
      { question: '¿Dónde podré solicitarla?', answer: 'El recorrido propuesto conecta la web con la aplicación. Los enlaces y requisitos se publicarán cuando estén confirmados.' },
      { question: '¿Cómo se informarán los costos y condiciones?', answer: 'La home y las páginas de producto mostrarán la información relevante antes de cada llamada a la acción.' },
    ],
  },
  footer: {
    copyright: '© 2026 Bradesco México. Contenido de muestra.',
    links: [
      { label: 'Términos y condiciones', url: '#' },
      { label: 'Costos y comisiones', url: '#' },
      { label: 'Contratos y formularios', url: '#' },
    ],
  },
}
