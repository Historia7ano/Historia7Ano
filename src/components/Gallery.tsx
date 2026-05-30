/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HISTORICAL_SOURCES } from '../data';
import { HistoricalSource } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Compass, BookOpen, Layers, CheckCircle } from 'lucide-react';

interface GalleryProps {
  onAwardPoints: (points: number) => void;
  onUnlockBadge: (badgeId: string) => void;
  username: string;
}

export function Gallery({ onAwardPoints, onUnlockBadge, username }: GalleryProps) {
  const [filterType, setFilterType] = useState<'all' | 'monumento' | 'arqueologico' | 'texto'>('all');
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [revealedSolutions, setRevealedSolutions] = useState<string[]>([]);
  const [vettedSources, setVettedSources] = useState<string[]>([]);

  const handleRevealSolution = (sourceId: string, qIdx: number) => {
    const key = `${sourceId}-${qIdx}`;
    if (revealedSolutions.includes(key)) return;
    setRevealedSolutions(prev => [...prev, key]);
    onAwardPoints(10);
  };

  const handleMarkAsVetted = (sourceId: string) => {
    if (vettedSources.includes(sourceId)) return;
    const newVetted = [...vettedSources, sourceId];
    setVettedSources(newVetted);
    onAwardPoints(30);

    if (newVetted.length === HISTORICAL_SOURCES.length) {
      onUnlockBadge('arqueologo');
    }
  };

  const filteredSources = HISTORICAL_SOURCES.filter(
    s => filterType === 'all' || s.type === filterType
  );

  return (
    <div className="space-y-6" id="gallery_section_root">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b p-4 border-gray-100 dark:border-gray-800 pb-4">
        <div>
          <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Galeria de Fontes e Monumentos</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Análise científica de fontes do 7.º ano. Clica no monumento ou manuscrito para responderes às perguntas orientadoras da Prof.ª Carla!
          </p>
        </div>

        {/* Categories Tab buttons */}
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0 font-display">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              filterType === 'all'
                ? 'bg-amber-500 text-slate-950 border-amber-500'
                : 'bg-white dark:bg-slate-800 border-slate-205 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-500'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilterType('monumento')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              filterType === 'monumento'
                ? 'bg-amber-500 text-slate-950 border-amber-500'
                : 'bg-white dark:bg-slate-800 border-slate-205 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-500'
            }`}
          >
            Monumentos
          </button>
          <button
            onClick={() => setFilterType('arqueologico')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              filterType === 'arqueologico'
                ? 'bg-amber-500 text-slate-950 border-amber-500'
                : 'bg-white dark:bg-slate-800 border-slate-205 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-500'
            }`}
          >
            Arqueológicos
          </button>
          <button
            onClick={() => setFilterType('texto')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              filterType === 'texto'
                ? 'bg-amber-500 text-slate-950 border-amber-500'
                : 'bg-white dark:bg-slate-800 border-slate-205 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-500'
            }`}
          >
            Textos/Pergaminhos
          </button>
        </div>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSources.map((source) => {
          const isSelected = selectedSourceId === source.id;
          const isVetted = vettedSources.includes(source.id);

          return (
            <div
              key={source.id}
              className={`bg-white dark:bg-slate-900 border ${
                isSelected
                  ? 'border-amber-500 ring-2 ring-amber-500/20'
                  : 'border-slate-200 dark:border-slate-800'
              } rounded-2xl shadow-sm hover:shadow transition duration-300 overflow-hidden flex flex-col justify-between`}
              id={`source_item_${source.id}`}
            >
              {/* IMAGE HEADER */}
              <div className="h-48 relative overflow-hidden bg-slate-100">
                <img
                  src={source.imageUrl}
                  alt={source.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 border border-white/20 text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {source.type}
                </div>
                {isVetted && (
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white font-bold p-1 rounded-full shadow flex items-center justify-center">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* CARD DETAILS */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg font-display text-slate-900 dark:text-white leading-tight">{source.title}</h3>
                  </div>
                  <div className="flex gap-2 items-center text-[11px] text-slate-400 font-mono mt-1 font-bold">
                    <span>{source.era}</span>
                    <span>&bull;</span>
                    <span>{source.location}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mt-2.5 font-sans">
                    {source.description}
                  </p>
                </div>

                <div className="space-y-3 border-t border-slate-105 dark:border-slate-800 pt-3">
                  <span className="text-[11px] font-bold font-mono text-amber-600 dark:text-amber-400">PERGUNTAS ORIENTADORAS:</span>
                  <div className="space-y-2">
                    {source.questions.map((question, qIdx) => {
                      const isRevealed = revealedSolutions.includes(`${source.id}-${qIdx}`);
                      return (
                        <div key={qIdx} className="bg-[#FAF9F6] dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-200/55 dark:border-slate-800 space-y-1.5">
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                            {qIdx + 1}. {question}
                          </p>
                          {isRevealed ? (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-[11px] text-emerald-600 font-medium leading-relaxed italic bg-emerald-55/15 p-2 rounded border border-emerald-110"
                            >
                              Pista da Professora: {source.suggestedAnswers[qIdx]}
                            </motion.p>
                          ) : (
                            <button
                              onClick={() => handleRevealSolution(source.id, qIdx)}
                              className="text-[10px] font-bold text-amber-600 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              🔍 Ver Pista de Resposta (+10 PE)
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  {!isVetted ? (
                    <button
                      onClick={() => handleMarkAsVetted(source.id)}
                      className="w-full text-center bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-xs font-semibold py-2 px-4 rounded-xl transition hover:opacity-90 cursor-pointer"
                    >
                      Concluir Análise Arqueológica (+30 PE)
                    </button>
                  ) : (
                    <div className="text-center text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 py-2 rounded-xl border border-emerald-100">
                      Análise Validada e Guardada!
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
