import type { Module, FAQItem, Testimonial } from "@/types";

export const KIWIFY_URL = process.env.NEXT_PUBLIC_KIWIFY_URL ?? "#";

export const MODULES: Module[] = [
  { number: 1, title: "Boas-vindas", description: "Conheça o programa e entenda como a jornada vai transformar sua comunicação." },
  { number: 2, title: "Autoconhecimento", description: "Descubra quem você é de verdade e quais crenças limitantes te travam." },
  { number: 3, title: "Autoconfiança", description: "Construa uma base sólida de segurança interna para se expressar." },
  { number: 4, title: "Assertividade", description: "Aprenda a dizer o que pensa com firmeza e elegância." },
  { number: 5, title: "Autenticidade", description: "Libere a mulher que já existe dentro de você — sem máscaras." },
  { number: 6, title: "Persuasão", description: "Domine a arte de convencer com ética e verdade." },
  { number: 7, title: "Pitch", description: "Crie seu discurso de apresentação poderoso em 60 segundos." },
  { number: 8, title: "Oratória", description: "Técnicas de fala, postura e presença para qualquer palco." },
  { number: 9, title: "Técnicas", description: "Ferramentas práticas para reuniões, vendas, vídeos e networking." },
  { number: 10, title: "Encerramento", description: "Consolide sua transformação e crie seu plano de ação contínuo." },
];

export const FAQ_ITEMS: FAQItem[] = [
  { question: "Como acesso o programa?", answer: "Após a compra, você recebe um e-mail com link de acesso à plataforma Kiwify. Basta clicar e começar." },
  { question: "Quanto tempo de acesso tenho?", answer: "12 meses de acesso a todos os módulos e bônus." },
  { question: "Preciso falar em público?", answer: "Não. O programa desenvolve comunicação para qualquer contexto: reuniões, vídeos, vendas, networking." },
  { question: "Serve para iniciantes?", answer: "Sim. O método começa pela base — autoconhecimento e autoconfiança — e avança progressivamente." },
  { question: "Como funciona a garantia?", answer: "7 dias de garantia incondicional. Se não for para você, devolvemos 100% do valor." },
];

export const TESTIMONIALS: Testimonial[] = [
  { name: "Carla M.", role: "Empreendedora", quote: "Eu travava toda vez que precisava me apresentar. Hoje gravo vídeos naturalmente e vendo com confiança." },
  { name: "Juliana R.", role: "Servidora Pública", quote: "Nunca imaginei que eu, tão tímida, conseguiria falar em reuniões sem gaguejar. O método mudou minha vida." },
  { name: "Fernanda L.", role: "Advogada", quote: "O autoconhecimento foi o módulo que mais me transformou. Entendi por que eu me escondia." },
  { name: "Patrícia A.", role: "Coach", quote: "Já tinha feito outros cursos. Aqui foi diferente: primeiro transformaram a mulher, depois a comunicação." },
  { name: "Mariana S.", role: "Política", quote: "Aprendi a ocupar espaços sem precisar me tornar outra mulher. Isso foi libertador." },
  { name: "Rosa C.", role: "Professora", quote: "Agora falo em público com autoridade. Os alunos me respeitam mais e eu me respeito mais também." },
];

export const COLORS = {
  primary: "#8E1B2C",
  secondary: "#5C1020",
  neutralLight: "#F7F5F3",
  neutralDark: "#1A0508",
  gold: "#D4A574",
  goldDeep: "#A07A3C",
  white: "#FFFFFF",
} as const;
