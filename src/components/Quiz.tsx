/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Trophy, Bookmark, Check, X, RefreshCw, Printer, ShieldCheck, Heart } from 'lucide-react';

interface QuizProps {
  username: string;
  onAwardPoints: (points: number) => void;
  onUnlockBadge: (badgeId: string) => void;
  onSaveQuizResult: (scorePercent: number) => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Qual foi a transição económica crucial que baliza a passagem do Paleolítico para o Neolítico?",
    options: [
      "A transição da economia de recoleção e caça nómada para a economia produtora (agricultura e pastorícia) e fixação permanente.",
      "O aparecimento do Direito Romano e das moedas de bronze.",
      "A dispersão territorial devido à quebra populacional da Peste Negra.",
      "O aparecimento da burguesia e dos forais municipais."
    ],
    correctIdx: 0,
    explanation: "A domesticação de animais e agricultura marcam a Revolução do Neolítico, viabilizando a subsistência durável sem nomadismo."
  },
  {
    question: "O Faraó do Egito e os governantes das primeiras civilizações exerciam um poder de que tipo?",
    options: [
      "Poder laico e democrático representativo.",
      "Poder sacralizado, em que a autoridade do líder político tinha origem divina.",
      "Poder descentralizado, repartido igualmente por assembleias de escravos.",
      "Vassalagem senhorial."
    ],
    correctIdx: 1,
    explanation: "O poder sacralizado teocrático imperou nos vales de rios férteis, divinizando imperadores e faraós."
  },
  {
    question: "Na democracia tradicional grega do século V a.C. em Atenas, quem detinha o direito legal de cidadania?",
    options: [
      "Todos os residentes, incluindo mulheres, camponeses e camponesas portuguesas.",
      "Apenas os nobres militares detentores de castelos e cavalos de guerra.",
      "Apenas homens livres, maiores de idade, nascidos de pai e mãe atenienses.",
      "Os escravos filósofos e os metecos ricos mercadores."
    ],
    correctIdx: 2,
    explanation: "Mulheres, metecos (estrangeiros) e escravos eram rigorosamente privados de representação e voto político na Eclésia."
  },
  {
    question: "A eficácia e difusão rápida do Cristianismo primitivo pelo Ocidente nos séculos I a III d.C. residiu principalmente em que fator do Império Romano?",
    options: [
      "Nas leis de Sesmarias.",
      "Na utilização das estradas pavimentadas estacionais e nas conexões comerciais marinhas da Pax Romana.",
      "Nos acordos assinados no Tratado de Zamora.",
      "Na proteção armada de sés feudais medievais."
    ],
    correctIdx: 1,
    explanation: "As estradas e portos romanos proporcionaram rotas ágeis e seguras de comunicação para os apóstolos e evangelizadores."
  },
  {
    question: "Qual era a dupla utilidade dos mosteiros medievais na Alta Idade Média (séculos VI a IX d.C.)?",
    options: [
      "Proporcionar torneios de cavalgaria e cunhar novas moedas régias.",
      "Conservar a escrita e o saber clássico por monges copistas e dinamizar desbravamentos e cultivos agrícolas.",
      "Fabricar barcos de descobrimentos e arrecadar dízimos de feiras de concelhos.",
      "Organizar as legiões de defesa de Roma nos fóruns públicos."
    ],
    correctIdx: 1,
    explanation: "Os mosteiros atuaram como refúgios culturais essenciais na desorganização medieval, mantendo colheitas rurais e sementes vivas."
  },
  {
    question: "Qual o nome da herança muçulmana deixada em Al-Andalus na Península Ibérica de que ainda hoje beneficiamos em termos de termos e regas agrícolas?",
    options: [
      "A criação do estilo Românico fortificado de sés de Évora.",
      "O Direito Romano cívico e o Latim litúrgico.",
      "As noras de regadio árabe e vocábulos começados pelo prefixo 'al-' (alface, algodão).",
      "A convocatória de Cortes democráticas no Algarve."
    ],
    correctIdx: 2,
    explanation: "O Al-Andalus era extremamente avançado, modificando pomares por canais hídricos inovadores e vocabulários duradouros."
  },
  {
    question: "Quais os marcos diplomáticos que selaram formalmente a independência do Reino de Portugal em 1143 e 1179, respetivamente?",
    options: [
      "O Tratado de Tordesilhas e a Batalha de Aljubarrota.",
      "O Tratado de Zamora e a emissão oficial da Bula papal Manifestis Probatum por Alexandre III.",
      "As Leis de Almada e a coroação do Mestre de Avis.",
      "Os forais municipais de Santarém e de Guimarães."
    ],
    correctIdx: 1,
    explanation: "Zamora formaliza a paz militar ibérica, e a Bula Manifestis Probatum legitima Portugal perante toda a cristandade ocidental."
  },
  {
    question: "Ao nível dos Concelhos medievais, qual era o documento regulador real outorgado que fixava direitos aos moradores?",
    options: [
      "O Corão islâmico.",
      "A Carta de Foral.",
      "O Novo Testamento bíblico.",
      "O Cromeleque megalítico."
    ],
    correctIdx: 1,
    explanation: "O foral estipulava taxas alfandegárias autónomas, protegendo o morador do concelho de coerções injustas de nobres."
  },
  {
    question: "Que estilo arquitetónico medieval se destaca por catedrais elevadas esbeltas, repletas de vitrais e arcos quebrados luminosos?",
    options: [
      "Estilo Românico severo.",
      "Estilo Clássico romano antigo.",
      "Estilo Gótico.",
      "Arte Barroca portuguesa."
    ],
    correctIdx: 2,
    explanation: "O Gótico elevou os mosteiros aos céus através da engenhosidade de arcobotantes e vitrais em arco quebrado decorados."
  },
  {
    question: "Como se solucionou a crise de sucessão dinástica de 1383-1385, salvaguardando a soberania de Portugal?",
    options: [
      "Aceitando a rainha D. Beatriz de Castela com regência de D. Leonor Teles.",
      "Proclamando D. Afonso Henriques líder das Cortes na Batalha de Ourique.",
      "Aclamando o Mestre de Avis nas Cortes de Coimbra e vencendo a invasão na heróica Batalha de Aljubarrota (1385).",
      "Cedendo o Condado Portucalense à armada francesa de Borgonha."
    ],
    correctIdx: 2,
    explanation: "A revolução aclamou D. João I (Mestre de Avis) e uniu camponeses e burgueses, cuja táctica travou os cavaleiros espanhóis."
  }
];

export function Quiz({ username, onAwardPoints, onUnlockBadge, onSaveQuizResult }: QuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState<'intro' | 'active' | 'finished'>('intro');

  const startQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setQuizState('active');
  };

  const handleSelectOption = (idx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    if (idx === QUIZ_QUESTIONS[currentIdx].correctIdx) {
      setScore(prev => prev + 1);
      onAwardPoints(30);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
    } else {
      setQuizState('finished');
      const finalPercent = (score / QUIZ_QUESTIONS.length) * 100;
      onSaveQuizResult(finalPercent);
      if (finalPercent === 100) {
        onAwardPoints(100);
        onUnlockBadge('mente_brilhante');
      } else if (finalPercent >= 70) {
        onAwardPoints(50);
      }
    }
  };

  const handlePrintCertificate = () => {
    // Elegant system action print
    window.print();
  };

  return (
    <div className="space-y-6" id="quiz_section_root">
      <div className="border-b p-4 border-gray-100 dark:border-gray-800 pb-4">
        <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Quiz Final Sumativo</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          O derradeiro desafio para provares o teu sucesso nas Aprendizagens Essenciais do 7.º ano ministradas pela professora Carla Oliveira.
        </p>
      </div>

      {quizState === 'intro' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl p-8 text-center space-y-6 shadow-sm">
          <div className="w-20 h-20 bg-amber-500/10 dark:bg-slate-800 text-amber-500 rounded-2xl flex items-center justify-center mx-auto text-4xl">
            🎓
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Pronto para o Desafio Sumativo, {username}?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              O teste é composto por <span className="font-bold">10 questões de escolha múltipla</span> focadas estritamente no currículo. Concluir com boa pontuação liberta o teu diploma digital!
            </p>
          </div>
          <div className="bg-[#FAF9F6] dark:bg-slate-800/45 p-4 rounded-xl max-w-sm mx-auto text-left text-xs text-slate-500 font-mono space-y-1 border border-slate-100 dark:border-slate-800">
            <p>📝 10 Questões de múltipla escolha</p>
            <p>💎 +30 PE por cada acerto imediato</p>
            <p>🌟 Obter 100% libera a medalha "Cérebro Brilhante"</p>
          </div>
          <button
            onClick={startQuiz}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 px-10 rounded-xl transition shadow cursor-pointer"
          >
            Começar Avaliação
          </button>
        </div>
      )}

      {quizState === 'active' && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-400">
            <span>Questão {currentIdx + 1} de {QUIZ_QUESTIONS.length}</span>
            <span className="text-amber-500">Acertos Atuais: {score}</span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-lg md:text-xl font-bold font-display leading-snug text-gray-900 dark:text-white">
              {QUIZ_QUESTIONS[currentIdx].question}
            </h4>

            <div className="space-y-3 pt-2">
              {QUIZ_QUESTIONS[currentIdx].options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                const isCorrect = QUIZ_QUESTIONS[currentIdx].correctIdx === idx;

                let stateStyle = "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200";
                if (selectedOpt !== null) {
                  if (isCorrect) {
                     stateStyle = "bg-green-105 dark:bg-green-950/40 border-green-500 text-green-800 dark:text-green-305 font-semibold";
                  } else if (isSelected) {
                     stateStyle = "bg-red-105 dark:bg-red-950/40 border-red-500 text-red-800 dark:text-red-305 line-through";
                  } else {
                     stateStyle = "bg-slate-50 dark:bg-slate-850 opacity-40 text-slate-400 dark:text-slate-600 cursor-not-allowed";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedOpt !== null}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition duration-200 flex items-start gap-3 cursor-pointer ${stateStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-amber-500/10 dark:bg-slate-800 text-amber-605 dark:text-amber-450 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedOpt !== null && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border ${selectedOpt === QUIZ_QUESTIONS[currentIdx].correctIdx ? 'bg-green-50 dark:bg-green-950/20 border-green-200' : 'bg-red-50 dark:bg-red-950/20 border-red-200'}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                {selectedOpt === QUIZ_QUESTIONS[currentIdx].correctIdx ? (
                  <>
                    <Check className="text-green-600 w-5 h-5 shrink-0" />
                    <span className="text-green-800 dark:text-green-400 font-bold text-sm">Resposta Correta! Mais +30 PE obtidos.</span>
                  </>
                ) : (
                  <>
                    <X className="text-red-500 w-5 h-5 shrink-0" />
                    <span className="text-red-800 dark:text-red-400 font-bold text-sm">Quase acertaste! Deixa-me explicar:</span>
                  </>
                )}
              </div>
              <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {QUIZ_QUESTIONS[currentIdx].explanation}
              </p>

              <button
                onClick={handleNext}
                className="mt-4 bg-amber-500 hover:bg-amber-605 text-slate-950 font-bold py-2.5 px-6 rounded-lg float-right transition cursor-pointer"
              >
                {currentIdx + 1 < QUIZ_QUESTIONS.length ? 'Próxima Questão →' : 'Ver Nota Final'}
              </button>
              <div className="clear-both"></div>
            </motion.div>
          )}
        </div>
      )}

      {quizState === 'finished' && (
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* RESULTS CARD */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-8 shadow-sm text-center space-y-6">
            <div className="inline-flex relative">
              <Trophy className="w-16 h-16 text-amber-500 animate-bounce" />
              <div className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full text-xs font-bold leading-none font-mono">
                {Math.round((score / QUIZ_QUESTIONS.length) * 105)}%
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-bold font-display text-slate-900 dark:text-white">
                Avaliação Concluída!
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed font-sans">
                Excelente empenho, <span className="font-bold text-amber-500">{username}</span>! Respondeste acertadamente a <span className="font-bold text-slate-900 dark:text-white">{score} de {QUIZ_QUESTIONS.length}</span> perguntas.
              </p>
            </div>

            {/* Score rating feedback */}
            <div className="text-center font-display text-lg font-bold text-amber-600 dark:text-amber-400">
              {score === 100 ? "🌟 Nota de Excelência Perfeita! (Menção de Ouro)" :
               score >= 70 ? "👏 Excelente nível cognitivo! Parabéns." :
               score >= 50 ? "👍 Nível Suficiente. Bom empenho." :
               "🤔 Queres tentar de novo para obteres nota maior?"}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={startQuiz}
                className="flex items-center gap-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition shadow"
              >
                <RefreshCw className="w-4 h-4" /> Repetir Avaliação
              </button>
            </div>
          </div>

          {/* DIPLOMATIC CERTIFICATE OF COMPLETION (GOLD FRAME) */}
          {score >= 50 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-amber-50 dark:bg-amber-950/20 border-4 border-amber-400 dark:border-amber-700 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden"
              id="printable_diploma_frame"
            >
              {/* Decorative side borders */}
              <div className="absolute inset-2 border border-amber-300 dark:border-amber-900/60 pointer-events-none rounded-2xl" />

              {/* Watermark Logo representational */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0">
                <Bookmark className="w-[300px] h-[300px]" />
              </div>

              <div className="relative z-10 text-center space-y-6">
                <div className="flex justify-center flex-col items-center">
                  <ShieldCheck className="w-16 h-16 text-amber-500 animate-pulse mb-2" />
                  <span className="font-mono text-xs uppercase tracking-widest text-amber-800 dark:text-amber-500 font-bold">
                    REPÚBLICA PORTUGUESA &bull; MINISTÉRIO DA EDUCAÇÃO
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-2xl md:text-4xl font-extrabold font-display text-gray-900 dark:text-white uppercase tracking-tight">
                    Certificado de Excelência Histórica
                  </h4>
                  <p className="text-xs text-gray-500 uppercase font-mono tracking-wider">
                    História do 7.º Ano &bull; Ensino Básico
                  </p>
                </div>

                <div className="space-y-4 max-w-2xl mx-auto py-4">
                  <p className="text-gray-600 dark:text-gray-400 text-sm italic font-serif leading-relaxed">
                    Certifica-se com louvor e orgulho institucional que o(a) ilustre discente
                  </p>
                  <h3 className="text-3xl md:text-4xl font-extrabold font-display text-amber-500 dark:text-amber-400 border-b border-amber-200 dark:border-amber-900/40 pb-2 inline-block px-12">
                    {username}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                    demonstrou com distinção os conhecimentos pedagógicos essenciais exigidos nas avaliações curriculares oficiais, obtendo um aproveitamento de <span className="font-bold text-slate-950 dark:text-white leading-none font-mono underline">{Math.round((score / QUIZ_QUESTIONS.length) * 100)}%</span> sob a tutoria educacional direta de:
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto pt-4 text-xs font-mono border-t border-dashed border-amber-300 dark:border-amber-900">
                  <div className="text-center space-y-1">
                    <div className="h-6 font-serif italic text-amber-600 font-bold">Carla Oliveira</div>
                    <div className="border-t border-gray-300 dark:border-gray-700 pt-1 text-gray-500 font-semibold">Profª de História do 7.º Ano</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="h-6 font-medium text-gray-600 dark:text-gray-400">{new Date().toLocaleDateString('pt-PT')}</div>
                    <div className="border-t border-gray-300 dark:border-gray-700 pt-1 text-gray-500 font-semibold">Data de Concessão</div>
                  </div>
                </div>

                <div className="pt-6 flex justify-center gap-4 no-printme">
                  <button
                    onClick={handlePrintCertificate}
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold px-6 py-3 rounded-xl transition cursor-pointer shadow-md"
                  >
                    <Printer className="w-4 h-4 shrink-0" /> Imprimir / PDF
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
