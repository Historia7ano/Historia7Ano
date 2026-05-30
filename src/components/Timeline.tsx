/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Key, Award, Flame, Shield, HelpCircle, Check, BookOpen } from 'lucide-react';

interface TimelineProps {
  onAwardPoints: (points: number) => void;
  username: string;
}

interface TimelineEventData {
  id: string;
  year: string;
  title: string;
  themeId: number;
  description: string;
  curiosity: string;
  badgeRequired?: string;
  testQuestion: string;
  options: string[];
  correctIdx: number;
}

const TIMELINE_EVENTS: TimelineEventData[] = [
  {
    id: "ev1",
    year: "c. 25.000 a.C.",
    title: "Arte Rupestre no Paleolítico",
    themeId: 1,
    description: "Os primeiros seres humanos caçadores-recoletores nómadas gravavam gravuras de animais selvagens (como auroques e cavalos) nas rochas de xisto ao ar livre de Foz Côa, celebrando cultos mágicos e funerários.",
    curiosity: "A arte rupestre de Foz Côa constitui o maior conjunto de arte paleolítica ao ar livre do mundo inteiro, classificado como Património da UNESCO!",
    testQuestion: "Que estilo de vida caraterizava os caçadores do Paleolítico?",
    options: ["Sedentarismo em herdades", "Nomadismo e recoleção", "Construção de templos góticos", "Comércio marítimo regular"],
    correctIdx: 1
  },
  {
    id: "ev2",
    year: "c. 10.000 a.C.",
    title: "Revolução Agrícola no Neolítico",
    themeId: 1,
    description: "Ventos de clima ameno transformaram radicalmente a terra. O ser humano desenvolveu a agricultura e pastorícia, fixando-se no solo (sedentarização) e erguendo conjuntos de megálitos como os do Alentejo (Cromeleque dos Almendres).",
    curiosity: "Nesta altura foram inventadas a faiança (olaria em barro), a tecelagem de peles e lã e a moagem manual de cereais silvestres.",
    testQuestion: "Que tipo de monumentos compõem o Megalitismo do Neolítico?",
    options: ["Aquedutos romanos em arco", "Grandes catedrais ogivais", "Construções duras com blocos de pedra gigante (menires, dólmenes)", "Teatros circulares de mármore"],
    correctIdx: 2
  },
  {
    id: "ev3",
    year: "c. 3.100 a.C.",
    title: "Início da Civilização do Egito",
    themeId: 1,
    description: "Ao longo do caudaloso rio Nilo, formou-se o robusto reino do Egito, marcado por colheitas abundantes com excedentes, uma escrita figurativa rica (hieróglifos) e uma sociedade altamente estratificada.",
    curiosity: "O faraó tinha um poder sacralizado derivado de ser visto como um elo teológico indispensável entre as divindades e as cheias do Nilo.",
    testQuestion: "Como se chama a crença na adoração de múltiplos deuses praticada no Antigo Egito?",
    options: ["Monoteísmo", "Politeísmo", "Laicismo", "Ateísmo"],
    correctIdx: 1
  },
  {
    id: "ev4",
    year: "Século V a.C.",
    title: "Democracia Direta em Atenas",
    themeId: 2,
    description: "Os cidadãos atenienses livres reuniam-se na assembleia da Eclésia para ditar leis e votar decisões, criando as bases da democracia, embora excluíssem de forma rígida mulheres, metecos e escravos.",
    curiosity: "A palavra 'democracia' provém do grego antigo e significa literalmente 'governo do povo' (demos + kratos).",
    testQuestion: "Quem participava nas votações políticas em Atenas?",
    options: ["Toda a população e servos", "Mulheres aristocráticas", "Apenas homens livres cidadãos maiores de idade", "Os escravos de lavoura"],
    correctIdx: 2
  },
  {
    id: "ev5",
    year: "Século II d.C.",
    title: "O Apogeu do Império Romano",
    themeId: 2,
    description: "Roma controlava toda a Bacia do Mediterrâneo ('Mare Nostrum'). Sob a Pax Romana, instalou-se uma sólida administração civil, baseada na língua comum (o latim), nas leis do Direito Romano e em obras de urbanismo admiráveis.",
    curiosity: "A Lusitânia (atual território de Portugal) foi intensamente romanizada, deixando pontes (Chaves, Coimbra) e ruínas residenciais luxuosas (Conímbriga).",
    testQuestion: "Como se apelidou o processo de adoção e integração cultural da Lusitânia à vida de Roma?",
    options: ["Vassalagem feudal", "Reconquista militar", "Nomadismo de subsistência", "Romanização"],
    correctIdx: 3
  },
  {
    id: "ev6",
    year: "Século I d.C.",
    title: "Nascimento do Cristianismo na Palestina",
    themeId: 2,
    description: "Jesus de Nazaré prega a compaixão e o amor universal na Palestina ocupada. Apesar das violentas perseguições do império pagão, a nova fé difunde-se aproveitando a excelente infraestrutura das vias terrestres militares romanas.",
    curiosity: "O Cristianismo acabou por se sagrar a religião oficial exclusiva de todo o Império de Roma no ano de 380 d.C.!",
    testQuestion: "Que imperador emitiu o Édito de Milão em 313 d.C., dando liberdade de culto à fé cristã?",
    options: ["Imperador Constantino", "Imperador Teodósio", "Faraó Tutankhamon", "D. Afonso Henriques"],
    correctIdx: 0
  },
  {
    id: "ev7",
    year: "476 d.C.",
    title: "Fim do Império Romano do Ocidente",
    themeId: 3,
    description: "As violentas invasões dos povos germanos (suevos, visigodos) desmantelam o poder de Roma. Instala-se um prolongado clima de insegurança militar, que forçou o isolamento populacional em aldeias medievais de simples economia de subsistência.",
    curiosity: "Com o colapso das instituições romanas, a Igreja Católica ergueu-se como a única entidade capaz de manter a coesão moral e a conservação das cópias de livros clássicos.",
    testQuestion: "Que tipo de produção caracterizou os séculos medievais iniciais pós-queda de Roma?",
    options: ["Economia monetária naval", "Comércio livre de ouro", "Economia agropastoril fechada de pura subsistência", "Industrialização de teares"],
    correctIdx: 2
  },
  {
    id: "ev8",
    year: "711 d.C.",
    title: "Invasão Islâmica e o Al-Andalus",
    themeId: 3,
    description: "Forças árabes atravessam o estreito de Gibraltar e dominam quase toda a Península Ibérica. O Al-Andalus tornou-se um brilhante polo cultural, científico e mercantil, rico em novas técnicas agrícolas e partilha de fés.",
    curiosity: "Os muçulmanos introduziram na nossa mesa plantas como laranjas e limões, e em termos de engenharia introduziram a nora (para irrigar lavouras de pomares).",
    testQuestion: "Que livro sagrado rege a vida religiosa e social do Islão?",
    options: ["Antigo Testamento", "O Alcorão (Corão)", "As Lusiadas", "Leis Românicas"],
    correctIdx: 1
  },
  {
    id: "ev9",
    year: "1096 d.C.",
    title: "Doação do Condado Portucalense",
    themeId: 3,
    description: "Em recompensa das suas lutas militares cruzadas contra os governantes mouros de Al-Andalus, o nobre cavaleiro borgonhês Conde D. Henrique recebe de D. Afonso VI de Leão o Condado Portucalense.",
    curiosity: "A capital senhorial e administrativa do jovem condado portucalense localizava-se na histórica vila muralhada de Guimarães.",
    testQuestion: "Como se chamava a esposa do Conde D. Henrique, mãe do nosso primeiro Rei, que administrou o território?",
    options: ["D. Leonor Teles", "D. Teresa de Leão", "D. Beatriz de Portugal", "D. Inês de Castro"],
    correctIdx: 1
  },
  {
    id: "ev10",
    year: "1143 d.C.",
    title: "Tratado de Zamora: Independência",
    themeId: 3,
    description: "Após heróicas conquistas militares e a vitória em S. Mamede (1128), D. Afonso Henriques reúne-se com Afonso VII de Castela para assinar o Tratado de Zamora, oficializando a sua soberania autónoma.",
    curiosity: "A independência portuguesa foi posteriormente coroada pela Santa Sé em 1179 por meio da célebre Bula Manifestis Probatum transmitida pelo Papa.",
    testQuestion: "Qual a batalha em que D. Afonso Henriques assegura o poder contra sua mãe D. Teresa em 1128?",
    options: ["Batalha de Ourique", "Batalha de Aljubarrota", "Batalha de S. Mamede", "Batalha de Zamora"],
    correctIdx: 2
  },
  {
    id: "ev11",
    year: "1254 d.C.",
    title: "Cortes de Leiria: Voz ao Povo",
    themeId: 4,
    description: "O Rei D. Afonso III convoca e reúne cortes extraordinárias na cidade de Leiria. Pela primeira vez na história medieval peninsular, autoriza-se a entrada de representantes concelhios do Povo (homens bons livres), ao lado do clero e da fidalguia.",
    curiosity: "Estas cortes de Leiria foram pioneiras em toda a Europa ocidental no alargamento da representação cívica das massas agrícolas populares.",
    testQuestion: "Quem compunha as 'três ordens' presentes na mesa das Cortes?",
    options: ["Imperadores, Cônsules e Plebeus", "Clero, Nobreza e Povo dos Concelhos", "Monges, Cruzados e Escravos", "Marinheiros, Burgueses e Cavaleiros"],
    correctIdx: 1
  },
  {
    id: "ev12",
    year: "1348 d.C.",
    title: "A devastadora Peste Negra",
    themeId: 4,
    description: "A terrível pandemia de peste bubónica alastra de leste para as rústicas vilas e portos de Portugal. Causa terríveis estragos demográficos, fomes e uma profunda quebra demográfica económica por falta de braços na lavoura camponesa.",
    curiosity: "Foi no reinado de D. Afonso IV que Portugal enfrentou a fúria máxima da Peste. As leis de sesmarias foram redigidas mais tarde para obrigar mendigos a arrendarem propriedades agrícolas ao abandono.",
    testQuestion: "Por que vetor animal era transmitida a bactéria da Peste Negra?",
    options: ["Mosquitos tropicais", "Por via de vacas raivosas", "Pelas pulgas alojadas em ratos de frotas comerciais", "Aves migratórias do sul"],
    correctIdx: 2
  },
  {
    id: "ev13",
    year: "1385 d.C.",
    title: "Aljubarrota: Consolidação Nacional",
    themeId: 4,
    description: "Em solo de Porto de Mós, o general D. Nuno Álvares Pereira e o recém-aclamado Monarca D. João I de Avis unem camponeses livres e militares contra a poderosa cavalaria real de Castela. A glória de Aljubarrota salva de vez a soberania de Portugal.",
    curiosity: "A vitória histórica foi celebrada através da magnífica fundação por voto régio do sumptuoso Mosteiro da Batalha (Estilo Gótico de extrema elegância).",
    testQuestion: "Que dinastia real se iniciou com o êxito da revolução popular em 1385?",
    options: ["Dinastia de Borgonha", "Dinastia Filipina", "Dinastia de Avis", "Dinastia de Bragança"],
    correctIdx: 2
  }
];

export function Timeline({ onAwardPoints, username }: TimelineProps) {
  const [selectedEventId, setSelectedEventId] = useState<string>("ev1");
  const [userGuess, setUserGuess] = useState<number | null>(null);
  const [answeredEvents, setAnsweredEvents] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>("");

  const activeEvent = TIMELINE_EVENTS.find(e => e.id === selectedEventId) || TIMELINE_EVENTS[0];

  const handleTimelineClick = (id: string) => {
    setSelectedEventId(id);
    setUserGuess(null);
    setFeedback("");
  };

  const handleAnswerSubmit = (idx: number) => {
    if (userGuess !== null) return;
    setUserGuess(idx);
    const correct = activeEvent.correctIdx === idx;
    if (correct) {
      setFeedback(`Excelente resposta, ${username}! Está absolutamente correto.`);
      onAwardPoints(30);
      setAnsweredEvents(prev => [...prev, activeEvent.id]);
    } else {
      setFeedback("Tenta novamente! Consulta a descrição pedagógica acima para tirar dúvidas de datação.");
    }
  };

  return (
    <div className="space-y-6" id="timeline_section_root">
      <div className="border-b p-4 border-slate-150 dark:border-slate-800 pb-4">
        <h2 className="text-3xl font-bold font-display text-slate-905 dark:text-white">Linha do Tempo Transversal</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-1 font-sans">
          Navega cronologicamente pelas épocas essenciais do 7.º ano de escolaridade. Clica nos marcos para veres curiosidades reais e resolvas enigmas!
        </p>
      </div>

      {/* HORIZONTAL TIMELINE RAIL */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 md:p-6 overflow-x-auto shadow-sm" id="timeline_horizontal_rail">
        <div className="min-w-[1100px] py-4 relative">
          {/* Central Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-[3px] bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0" />

          {/* Active Progress colored highlight */}
          <div
            className="absolute top-1/2 left-0 h-[3px] bg-amber-500 z-0 transition-all duration-500 -translate-y-1/2"
            style={{
              width: `${(TIMELINE_EVENTS.findIndex(e => e.id === selectedEventId) / (TIMELINE_EVENTS.length - 1)) * 105}%`
            }}
          />

          <div className="flex justify-between relative z-10">
            {TIMELINE_EVENTS.map((item, idx) => {
              const isSelected = item.id === selectedEventId;
              const hasAnswered = answeredEvents.includes(item.id);

              return (
                <button
                  key={item.id}
                  onClick={() => handleTimelineClick(item.id)}
                  className="flex flex-col items-center gap-1 group focus:outline-none focus:ring-0 cursor-pointer"
                  style={{ width: `${100 / TIMELINE_EVENTS.length}%` }}
                >
                  {/* Indicator Dot */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition border-2 font-bold font-mono text-xs ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md scale-110'
                        : hasAnswered
                        ? 'bg-emerald-500 text-white border-emerald-500'
                        : 'bg-white dark:bg-slate-800 text-slate-650 dark:text-slate-300 border-slate-200 dark:border-slate-700 group-hover:border-amber-500'
                    }`}
                  >
                    {idx + 1}
                  </div>

                  {/* Tiny metadata Year */}
                  <span className={`text-[10px] font-mono font-bold mt-2 ${isSelected ? 'text-amber-500 dark:text-amber-400' : 'text-slate-400'}`}>
                    {item.year.replace("c. ", "")}
                  </span>

                  {/* Truncated header label */}
                  <span className={`text-[11px] font-medium max-w-[80px] text-center font-display truncate ${isSelected ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-550 group-hover:text-slate-700'}`}>
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* EVENT DETAILED DETAILS */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeEvent.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Narrative description */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4" id="timeline_detail_card">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-150 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase font-bold tracking-wider block">
                  Marco Cronológico {TIMELINE_EVENTS.indexOf(activeEvent) + 1} de {TIMELINE_EVENTS.length}
                </span>
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">{activeEvent.title}</h3>
              </div>
              <div className="flex items-center gap-2 font-mono text-base font-extrabold bg-amber-500/10 dark:bg-slate-850 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-xl border border-amber-500/15 dark:border-slate-800">
                <Clock className="w-4 h-4 animate-spin-slow text-amber-500" />
                <span>{activeEvent.year}</span>
              </div>
            </div>

            <p className="text-slate-705 dark:text-slate-300 leading-relaxed text-sm md:text-base font-sans">
              {activeEvent.description}
            </p>

            {/* Suserano Curiosity Block */}
            <div className="bg-amber-500/10 dark:bg-amber-955 border border-amber-300/30 p-4 rounded-xl">
              <h5 className="font-display font-bold text-sm text-amber-800 dark:text-amber-400 flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500 animate-pulse" /> Sabias Que? (Curiosidade Real)
              </h5>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed italic">
                {activeEvent.curiosity}
              </p>
            </div>
          </div>

          {/* Interactive validation quiz */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6" id="timeline_interactive_quiz">
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <HelpCircle className="w-5 h-5 text-amber-500" />
                <h4 className="font-bold font-display text-slate-900 dark:text-white">Verifica a tua Aprendizagem</h4>
              </div>

              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {activeEvent.testQuestion}
              </p>

              <div className="space-y-2">
                {activeEvent.options.map((option, idx) => {
                  const isCurSelected = userGuess === idx;
                  const isCorrectAnswer = activeEvent.correctIdx === idx;

                  // Styling helper
                  let btnStyle = "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700";
                  if (userGuess !== null) {
                    if (isCorrectAnswer) {
                      btnStyle = "bg-green-100 dark:bg-green-950 border-green-500 text-green-700 dark:text-green-300 font-bold";
                    } else if (isCurSelected) {
                      btnStyle = "bg-red-100 dark:bg-red-950 border-red-500 text-red-700 dark:text-red-300 line-through";
                    } else {
                      btnStyle = "opacity-50 bg-gray-50 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={userGuess !== null}
                      onClick={() => handleAnswerSubmit(idx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs leading-tight transition duration-200 cursor-pointer ${btnStyle}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback dynamic banner */}
            {userGuess !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-3 rounded-xl text-xs leading-relaxed border ${
                  userGuess === activeEvent.correctIdx
                    ? 'bg-green-55/70 dark:bg-green-950/20 border-green-200 text-green-700 dark:text-green-300'
                    : 'bg-red-55/70 dark:bg-red-950/20 border-red-200 text-red-700 dark:text-red-300'
                }`}
              >
                <div className="flex gap-2 items-start">
                  {userGuess === activeEvent.correctIdx ? (
                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  ) : (
                    <Shield className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <p>{feedback}</p>
                </div>
                {userGuess === activeEvent.correctIdx && !answeredEvents.includes(activeEvent.id) && (
                  <div className="text-[10px] font-mono mt-1 font-bold text-green-600">
                    🎉 +30 Pontos de Experiência obtidos!
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
