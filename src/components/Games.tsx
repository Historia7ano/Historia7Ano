/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ShieldAlert, Award, Compass, Key, Lock, Unlock, HelpCircle, RefreshCw } from 'lucide-react';

interface GamesProps {
  username: string;
  onAwardPoints: (points: number) => void;
  onUnlockBadge: (badgeId: string) => void;
}

// 1. VERDADEIRO OU FALSO
const TRUE_FALSE_QUESTIONS = [
  {
    text: "O hominídeo do Paleolítico vivia em cabanas sólidas e aldeamentos permanentes.",
    isTrue: false,
    explanation: "Falso! No Paleolítico, o ser humano era caçador-recoletor nómada, mudando-se com as estações. Os aldeamentos permanentes e a sedentarização surgiram apenas no Neolítico."
  },
  {
    text: "O Faraó egípcio detinha um poder sacralizado, sendo adorado como um deus vivo na bacia do Nilo.",
    isTrue: true,
    explanation: "Verdadeiro! O Egito praticava uma monarquia em que o Faraó era venerado pelas populações camponesas com natureza divina."
  },
  {
    text: "Em Atenas da Idade de Ouro, as mulheres, metecos e escravos participavam diretamente na votação de leis na Eclésia.",
    isTrue: false,
    explanation: "Falso! A democracia ateniense era restrita apenas aos homens livres nascidos de pais atenienses e maiores de idade. Mulheres, metecos e escravos não eram cidadãos."
  },
  {
    text: "A romanização consistiu no esforço de unificação provincial através do Latim, das estradas empedradas e do Direito Romano.",
    isTrue: true,
    explanation: "Verdadeiro! Estes três pilares integraram as províncias e criaram uma matriz jurídica e de costumes partilhada."
  },
  {
    text: "No século XIV, a mortalidade devastadora da Peste Negra de 1348 eliminou cerca de um terço da população europeia.",
    isTrue: true,
    explanation: "Verdadeiro! Trata-se da maior pandemia bacteriana medieval, dizimando parcelas substanciais de aldeamentos agrícolas e cidades do país."
  }
];

// 2. CORRESPONDÊNCIA DE CONCEITOS
const CONCEPT_PAIRS = [
  { id: '1', term: "Recoleção", definition: "Modo de vida recoletor em que se colhem produtos da natureza direta sem produção ativa." },
  { id: '2', term: "Público Sacralizado", definition: "Governo teocrático onde a liderança cívica deriva de autoridade divina sagrada." },
  { id: '3', term: "Ostracismo", definition: "Exílio temporário votado em Atenas para afastar cidadãos suspeitos de abusarem do poder político." },
  { id: '4', term: "Foral", definition: "Carta régia definindo tributações feudais e autonomia administrativa autónoma de Concelhos." },
  { id: '5', term: "Cortes", definition: "Assembleia consultiva convocada pelo Rei agregando Clero, Nobreza e Homens Livres do Povo." }
];

export function Games({ username, onAwardPoints, onUnlockBadge }: GamesProps) {
  const [activeGame, setActiveGame] = useState<'menu' | 'tf' | 'match' | 'escape'>('menu');

  // TF State
  const [tfIndex, setTfIndex] = useState(0);
  const [tfSelected, setTfSelected] = useState<boolean | null>(null);
  const [tfScore, setTfScore] = useState(0);
  const [tfFinished, setTfFinished] = useState(false);

  // Match State
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [selectedDefinitionId, setSelectedDefinitionId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [matchError, setMatchError] = useState(false);
  const [matchFinished, setMatchFinished] = useState(false);

  // Escape Room State
  const [escapeStep, setEscapeStep] = useState(1); // 1, 2, 3, 4 (Win)
  const [escapeAnswer, setEscapeAnswer] = useState('');
  const [escapeError, setEscapeError] = useState('');
  const [escapePointsEarned, setEscapePointsEarned] = useState(false);

  // Restart functions
  const restartTf = () => {
    setTfIndex(0);
    setTfSelected(null);
    setTfScore(0);
    setTfFinished(false);
  };

  const restartMatch = () => {
    setSelectedTermId(null);
    setSelectedDefinitionId(null);
    setMatchedIds([]);
    setMatchError(false);
    setMatchFinished(false);
  };

  const restartEscape = () => {
    setEscapeStep(1);
    setEscapeAnswer('');
    setEscapeError('');
    setEscapePointsEarned(false);
  };

  // True-False handle
  const handleTfAnswer = (userChoice: boolean) => {
    if (tfSelected !== null) return;
    setTfSelected(userChoice);
    const correct = TRUE_FALSE_QUESTIONS[tfIndex].isTrue === userChoice;
    if (correct) {
      setTfScore(prev => prev + 1);
      onAwardPoints(20);
    }
  };

  const handleNextTf = () => {
    if (tfIndex + 1 < TRUE_FALSE_QUESTIONS.length) {
      setTfIndex(prev => prev + 1);
      setTfSelected(null);
    } else {
      setTfFinished(true);
      if (tfScore + (tfSelected === (TRUE_FALSE_QUESTIONS[tfIndex].isTrue) ? 1 : 0) === TRUE_FALSE_QUESTIONS.length) {
        onAwardPoints(50);
        onUnlockBadge('game_master');
      }
    }
  };

  // Match handle
  const handleTermClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    setMatchError(false);
    setSelectedTermId(id);
    if (selectedDefinitionId) {
      checkMatch(id, selectedDefinitionId);
    }
  };

  const handleDefClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    setMatchError(false);
    setSelectedDefinitionId(id);
    if (selectedTermId) {
      checkMatch(selectedTermId, id);
    }
  };

  const checkMatch = (termId: string, defId: string) => {
    if (termId === defId) {
      // Success Match
      const newMatches = [...matchedIds, termId];
      setMatchedIds(newMatches);
      setSelectedTermId(null);
      setSelectedDefinitionId(null);
      onAwardPoints(30);
      if (newMatches.length === CONCEPT_PAIRS.length) {
        setMatchFinished(true);
        onUnlockBadge('game_master');
      }
    } else {
      // Error
      setMatchError(true);
      setTimeout(() => {
        setSelectedTermId(null);
        setSelectedDefinitionId(null);
        setMatchError(false);
      }, 1000);
    }
  };

  // Escape Room riddle validation
  const handleEscapeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEscapeError('');
    const cleanAnswer = escapeAnswer.toLowerCase().trim();

    if (escapeStep === 1) {
      // Riddle 1: "Qual o nome do documento assinado no ano 1143 d.C. em que o primo de D. Afonso Henriques reconhece a soberania régia portucalense?"
      // Correct: Tratado de Zamora or Zamora
      if (cleanAnswer.includes('zamora')) {
        setEscapeStep(2);
        setEscapeAnswer('');
        onAwardPoints(40);
      } else {
        setEscapeError('Dica: Foi na cidade de Zamora que D. Afonso Henriques assinou este histórico acordo com Afonso VII. Tenta de novo!');
      }
    } else if (escapeStep === 2) {
      // Riddle 2: "Sou a terrível bactéria assassina que em 1348 chegou nos navios mercantes genoveses vinda de leste. Que nome terrível possuo?"
      // Correct: Peste Negra or Peste
      if (cleanAnswer.includes('peste') || cleanAnswer.includes('peste negra')) {
        setEscapeStep(3);
        setEscapeAnswer('');
        onAwardPoints(40);
      } else {
        setEscapeError('Dica: É um tipo de peste associada à cor preta devido às manchas na pele dos enfermos. Tenta de novo!');
      }
    } else if (escapeStep === 3) {
      // Riddle 3: "Diga o nome do grande Condestável e chefe de táticas militares herói que organizou as nossas tropas em Aljubarrota."
      // Correct: Nuno Alvares Pereira or D. Nuno Alvares Pereira
      if (cleanAnswer.includes('nuno') || cleanAnswer.includes('pereira') || cleanAnswer.includes('álvares')) {
        setEscapeStep(4);
        setEscapeAnswer('');
        if (!escapePointsEarned) {
          onAwardPoints(100);
          onUnlockBadge('game_master');
          setEscapePointsEarned(true);
        }
      } else {
        setEscapeError('Dica: Trata-se do Santo Condestável, D. Nuno Álvares... Como era o apelido completo dele?');
      }
    }
  };

  return (
    <div className="space-y-6" id="games_section_root">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b p-4 border-gray-100 dark:border-gray-800 pb-4">
        <div>
          <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Jogos e Desafios Educativos</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Olá, <span className="font-semibold text-amber-600 dark:text-amber-400">{username}</span>! Desejo-te boa sorte para acumulares muitos pontos e medalhas.
          </p>
        </div>
        {activeGame !== 'menu' && (
          <button
            onClick={() => setActiveGame('menu')}
            className="mt-3 md:mt-0 flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white font-medium px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            ← Voltar ao Menu Lúdico
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {activeGame === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* TF CARD */}
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-sm hover:shadow-md transition duration-300 rounded-2xl p-6 flex flex-col justify-between" id="game_card_tf">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 dark:bg-slate-800 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4 text-2xl font-bold">
                  V/F
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">Verdadeiro ou Falso</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed font-sans">
                  Testa a tua precisão cronológica e conceitual julgando sentenças rápidas alinhadas com as Aprendizagens Essenciais do 7.º ano.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono font-medium text-amber-700 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-950/40 p-2 rounded-lg">
                  <span>🎯 +20 Pontos por acerto</span>
                  <span>🏆 Medalha de Game Master</span>
                </div>
              </div>
              <button
                onClick={() => { setActiveGame('tf'); restartTf(); }}
                className="mt-6 w-full text-center bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-4 rounded-xl transition cursor-pointer"
              >
                Começar Desafio
              </button>
            </div>

            {/* MATCH CARD */}
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-sm hover:shadow-md transition duration-300 rounded-2xl p-6 flex flex-col justify-between" id="game_card_match">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 dark:bg-slate-800 flex items-center justify-center text-amber-500 dark:text-amber-400 mb-4">
                  <Compass className="w-6 h-6 animate-spin-slow" />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">Correspondência de Conceitos</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed font-sans">
                  Liga mecanicamente os conceitos mais importantes (como Foral e Ostracismo) às suas devidas e oficiais descrições pedagógicas.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/40 p-2 rounded-lg">
                  <span>🎯 +30 Pontos por par correto</span>
                  <span>🎓 Ótimo para rever exames</span>
                </div>
              </div>
              <button
                onClick={() => { setActiveGame('match'); restartMatch(); }}
                className="mt-6 w-full text-center bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-4 rounded-xl transition cursor-pointer"
              >
                Associar Conceitos
              </button>
            </div>

            {/* ESCAPE CARD */}
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-sm hover:shadow-md transition duration-300 rounded-2xl p-6 flex flex-col justify-between" id="game_card_escape">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 dark:bg-slate-800 flex items-center justify-center text-amber-500 dark:text-amber-400 mb-4">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">Escape Room: Castelo de Guimarães</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed font-sans">
                  Estás preso no cimo da masmorra feudal da torre de menagem! Decifra três enigmas rigorosos da História de Portugal para fugir.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono font-medium text-amber-700 dark:text-amber-400 bg-amber-500/10 dark:bg-slate-950/40 p-2 rounded-lg">
                  <span>🎯 +40 Pontos por pista decifrada</span>
                  <span>🏆 Grande Prémio final de +100 Pontos</span>
                </div>
              </div>
              <button
                onClick={() => { setActiveGame('escape'); restartEscape(); }}
                className="mt-6 w-full text-center bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-4 rounded-xl transition shadow-md cursor-pointer"
              >
                Entrar no Castelo
              </button>
            </div>
          </motion.div>
        )}
               {/* 1. VR / F COMPONENT */}
        {activeGame === 'tf' && (
          <motion.div
            key="tf_game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-205 dark:border-slate-800 shadow-sm"
          >
            {!tfFinished ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center text-sm font-mono text-slate-500">
                  <span>Questão {tfIndex + 1} de {TRUE_FALSE_QUESTIONS.length}</span>
                  <span className="text-amber-600 font-semibold">Acertos: {tfScore}</span>
                </div>

                <div className="p-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-amber-500 rounded-full transition-all duration-300"
                    style={{ width: `${((tfIndex + 1) / TRUE_FALSE_QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <div className="py-4">
                  <h4 className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-150 leading-relaxed text-center font-display">
                    &ldquo;{TRUE_FALSE_QUESTIONS[tfIndex].text}&rdquo;
                  </h4>
                </div>

                {tfSelected === null ? (
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleTfAnswer(true)}
                      className="flex flex-col items-center justify-center p-4 border-2 border-green-500 rounded-2xl hover:bg-green-50 dark:hover:bg-green-950/20 text-green-600 text-lg font-bold transition"
                    >
                      <Check className="w-8 h-8 mb-2" />
                      Verdadeiro
                    </button>
                    <button
                      onClick={() => handleTfAnswer(false)}
                      className="flex flex-col items-center justify-center p-4 border-2 border-red-500 rounded-2xl hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 text-lg font-bold transition"
                    >
                      <X className="w-8 h-8 mb-2" />
                      Falso
                    </button>
                  </div>
                ) : (
                  <div className={`p-4 rounded-xl border ${TRUE_FALSE_QUESTIONS[tfIndex].isTrue === tfSelected ? 'bg-green-50 dark:bg-green-950/20 border-green-200' : 'bg-red-50 dark:bg-red-950/20 border-red-200'}`}>
                    <div className="flex items-center gap-2 font-bold mb-2">
                      {TRUE_FALSE_QUESTIONS[tfIndex].isTrue === tfSelected ? (
                        <>
                          <Check className="text-green-600 w-5 h-5" />
                          <span className="text-green-700 dark:text-green-400">Resposta Correta! Excelente, {username}!</span>
                        </>
                      ) : (
                        <>
                          <X className="text-red-500 w-5 h-5" />
                          <span className="text-red-700 dark:text-red-400">Ups, não foi desta vez!</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {TRUE_FALSE_QUESTIONS[tfIndex].explanation}
                    </p>
                    <button
                      onClick={handleNextTf}
                      className="mt-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-medium py-2 px-6 rounded-lg float-right transition hover:opacity-90"
                    >
                      {tfIndex + 1 < TRUE_FALSE_QUESTIONS.length ? 'Avançar →' : 'Ver Resultados'}
                    </button>
                    <div className="clear-both"></div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center space-y-6 py-6 animate-fade-in">
                <div className="w-16 h-16 bg-amber-500/10 dark:bg-slate-800 text-amber-500 rounded-full flex items-center justify-center mx-auto text-3xl">
                  🏆
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Desafio Completado!</h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-2 font-sans">
                    Excelente trabalho, <span className="font-semibold text-amber-500">{username}</span>! Conseguiste acertar em <span className="font-bold">{tfScore}</span> de <span className="font-bold">{TRUE_FALSE_QUESTIONS.length}</span> afirmações.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl max-w-sm mx-auto font-mono text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Pontos Acumulados:</span>
                    <span className="font-semibold text-green-600">+{tfScore * 20} PE</span>
                  </div>
                  {tfScore === TRUE_FALSE_QUESTIONS.length && (
                    <div className="text-amber-500 font-bold mt-1">
                      🎉 Bónus de Perfeição: +50 PE!
                    </div>
                  )}
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={restartTf}
                    className="flex items-center gap-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 py-3 px-6 rounded-xl font-medium hover:opacity-90 transition"
                  >
                    <RefreshCw className="w-4 h-4" /> Jogar Novamente
                  </button>
                  <button
                    onClick={() => setActiveGame('menu')}
                    className="border border-gray-300 dark:border-gray-700 py-3 px-6 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    Outros Jogos
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* 2. MATCH COMPONENT */}
        {activeGame === 'match' && (
          <motion.div
            key="match_game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-205 dark:border-slate-800 shadow-sm space-y-6"
          >
            <div className="text-center">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white font-display">Ligação de Conceitos Históricos</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 font-sans">
                Associa cada conceito chave pedagógico da esquerda com a sua correta e precisa definição à direita.
              </p>
            </div>

            {matchError && (
              <div className="bg-red-50 dark:bg-red-950/25 border border-red-200 text-red-600 p-3 rounded-lg flex items-center gap-2 justify-center font-medium animate-bounce text-sm">
                <ShieldAlert className="w-4 h-4" /> Par Incorreto! Revê os conceitos com paciência.
              </div>
            )}

            {!matchFinished ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {/* Terms Column */}
                <div className="space-y-3">
                  <h5 className="font-mono text-xs font-semibold uppercase text-gray-500 tracking-wider">Conceitos</h5>
                  {CONCEPT_PAIRS.map((pair) => {
                    const isMatched = matchedIds.includes(pair.id);
                    const isSelected = selectedTermId === pair.id;
                    return (
                      <button
                        key={`term-${pair.id}`}
                        disabled={isMatched}
                        onClick={() => handleTermClick(pair.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-semibold flex justify-between items-center cursor-pointer ${
                          isMatched
                            ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 text-emerald-600 cursor-not-allowed opacity-60'
                            : isSelected
                            ? 'bg-amber-500 border-amber-500 text-slate-950 shadow'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-205 hover:border-amber-500'
                        }`}
                      >
                        <span>{pair.term}</span>
                        {isMatched && <Check className="w-4 h-4 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Definitions Column */}
                <div className="space-y-3">
                  <h5 className="font-mono text-xs font-semibold uppercase text-gray-500 tracking-wider">Definições Curriculares</h5>
                  {[...CONCEPT_PAIRS].sort((a,b) => b.id.localeCompare(a.id)).map((pair) => {
                    const isMatched = matchedIds.includes(pair.id);
                    const isSelected = selectedDefinitionId === pair.id;
                    return (
                      <button
                        key={`def-${pair.id}`}
                        disabled={isMatched}
                        onClick={() => handleDefClick(pair.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all text-xs leading-relaxed flex justify-between items-center cursor-pointer ${
                          isMatched
                            ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 text-emerald-600 cursor-not-allowed opacity-60'
                            : isSelected
                            ? 'bg-amber-500 border-amber-500 text-slate-950 shadow'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-205 hover:border-amber-500'
                        }`}
                      >
                        <span>{pair.definition}</span>
                        {isMatched && <Check className="w-4 h-4 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 bg-emerald-500/10 dark:bg-slate-800 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-3xl">
                  🏆
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Ligação Perfeita Realizada!</h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-2 font-sans">
                    Parabéns, <span className="font-semibold text-amber-500">{username}</span>! Demonstras um domínio magnífico do vocabulário oficial exigido ao longo do 7.º ano.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl max-w-sm mx-auto font-mono text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Pontos Acumulados:</span>
                    <span className="font-semibold text-green-600">+{CONCEPT_PAIRS.length * 30} PE</span>
                  </div>
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={restartMatch}
                    className="flex items-center gap-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 py-3 px-6 rounded-xl font-medium hover:opacity-90 transition"
                  >
                    <RefreshCw className="w-4 h-4" /> Recomeçar Jogo
                  </button>
                  <button
                    onClick={() => setActiveGame('menu')}
                    className="border border-gray-300 dark:border-gray-700 py-3 px-6 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    Outros Jogos
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* 3. ESCAPE ROOM COMPONENT */}
        {activeGame === 'escape' && (
          <motion.div
            key="escape_game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl mx-auto bg-slate-950 border border-slate-800 text-slate-100 p-6 rounded-3xl shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-850 pb-4">
                <div className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-amber-500 animate-pulse" />
                  <span className="font-bold font-display text-slate-100">MISÃO: ESCAPE EM GUIMARÃES</span>
                </div>
                <div className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold px-3 py-1 rounded-full">
                  Fase {escapeStep} de 3
                </div>
              </div>

              {escapeStep === 1 && (
                <div className="space-y-4">
                  <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-sm leading-relaxed text-slate-300">
                    Estás preso nas catacumbas frias do lendário Castelum de Afonso Henriques! A pesada porta de ferro exige um palpite para se abrir. Uma inscrição gasta diz:
                    <p className="italic text-amber-400 font-serif my-3 text-center text-base">
                      &ldquo;O ano é de 1143. D. Afonso Henriques e o seu primo espanhol decidem selar as pazes e a independência militar nesta vila histórica. Que pacto político foi este?&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {escapeStep === 2 && (
                <div className="space-y-4">
                  <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-sm leading-relaxed text-slate-300">
                    A porta de ferro range e abre-se! Corres pelas escadas de granito espiraladas, mas dás de caras com uma porta reforçada por pregos de chumbo. Há uma nova charada na madeira:
                    <p className="italic text-amber-400 font-serif my-3 text-center text-base">
                      &ldquo;Chegando de surpresa nas frotas marítimas infestadas de roedores em 1348, espalhei o pânico pelas sés feudais eliminando um terço dos homens livres. Quem sou eu?&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {escapeStep === 3 && (
                <div className="space-y-4">
                  <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-sm leading-relaxed text-slate-300">
                    Incrível! A porta cai com estrondo. Estás na varanda ameada do castelo, vendo a liberdade ao longe. Mas para descer a ponte levadiça secreta, o painel do suserano requer a última password:
                    <p className="italic text-amber-400 font-serif my-3 text-center text-base">
                      &ldquo;Fui o Santo Condestável, o genial general audaz que usou as táticas de retaguarda rústicas para salvar Portugal do pavor castelhano nos solos de Aljubarrota. O meu nome completo?&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {escapeStep <= 3 ? (
                <form onSubmit={handleEscapeSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Introduz a tua Resposta Escrita:</label>
                    <input
                      type="text"
                      required
                      value={escapeAnswer}
                      onChange={(e) => setEscapeAnswer(e.target.value)}
                      placeholder="Escreve o teu palpite histórico aqui..."
                      className="w-full bg-slate-900 border border-slate-750 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>

                  {escapeError && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-amber-500 bg-amber-950/20 border border-amber-900 p-3 rounded-lg text-xs leading-relaxed"
                    >
                      {escapeError}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Unlock className="w-4 h-4" /> Validar Mecanismo
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-6">
                  <div className="w-20 h-20 bg-amber-500/10 border border-amber-500 text-amber-500 rounded-full flex items-center justify-center mx-auto text-4xl animate-bounce">
                    🔓
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-display text-amber-400">Escapaste do Castelo!</h3>
                    <p className="text-slate-350 text-sm mt-2 leading-relaxed">
                      Parabéns, <span className="font-bold text-white">{username}</span>! Conseguiste decifrar todos os enigmas secretos da masmorra utilizando os teus conhecimentos das Aprendizagens Essenciais do 7.º ano.
                    </p>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl font-mono text-xs space-y-1 text-slate-450 max-w-xs mx-auto">
                    <div className="flex justify-between">
                      <span>Pontos de Escape:</span>
                      <span className="font-bold text-green-400">+180 PE</span>
                    </div>
                    <div className="flex justify-between font-bold text-amber-400 mt-1">
                      <span>Bónus de Sobrevivente:</span>
                      <span>+100 PE</span>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={restartEscape}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-6 rounded-xl transition flex items-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" /> Jogar Novamente
                    </button>
                    <button
                      onClick={() => setActiveGame('menu')}
                      className="border border-slate-705 py-3 px-6 rounded-xl font-medium text-slate-300 hover:bg-slate-900 transition cursor-pointer"
                    >
                      Outros Jogos
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
