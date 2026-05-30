/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Theme, HistoricalSource, Badge } from './types';
// @ts-ignore
import temploDianaImg from './assets/images/templo_de_diana_1780161253343.png';

export const THEMES: Theme[] = [
  {
    id: 1,
    title: "Das sociedades recoletoras às primeiras civilizações",
    subtitle: "A Alvorada da Humanidade e o Nascimento das Cidades",
    summary: "As origens da história humana marcam a transição do nomadismo (Paleolítico - recoleção) para o sedentarismo (Neolítico - produção), impulsionando mais tarde o surgimento das grandes civilizações urbanas ao longo dos rios caudalosos.",
    chapters: [
      {
        id: "t1_c1",
        title: "Das Sociedades Recoletoras às Primeiras Sociedades Produtoras",
        text: "Durante o período do Paleolítico, os primeiros seres humanos levavam uma vida recoletora. Alimentavam-se da caça, da pesca e da recoleção de frutos, canas e raízes silvestres. Como dependiam diretamente dos recursos naturais, quando estes escasseavam, eram obrigados a deslocar-se, praticando o nomadismo.\n\nHá cerca de 10 000 anos, deu-se uma revolução climática que deu início ao Neolítico. Com temperaturas mais amenas, a Humanidade desenvolveu a agricultura e a pastorícia/domesticou animais, dando início à economia produtora. Com a necessidade de cuidar das terras e dos rebanhos, surgiu a sedentarização e os primeiros aldeamentos.\n\nNesta época, criaram-se novas técnicas como a olaria, a tecelagem e a moagem. No plano artístico e espiritual, destacam-se a arte rupestre (com pinturas e gravuras em rochas e cavernas, como em Foz Côa, Portugal) e o megalitismo (construções de grandes blocos de pedra para ritos cívicos ou funerários, como menires, dólmenes ou cromeleques, dos quais o Cromeleque dos Almendres é o maior exemplo nacional).",
        keyConcepts: [
          { term: "Recoleção", definition: "Modo de vida em que o ser humano não produz, mas apenas recolhe da Natureza o que necessita (caça, pesca, plantas)." },
          { term: "Nomadismo", definition: "Estilo de vida de grupos humanos que não possuem habitação fixa, mudando de local para encontrar alimentos." },
          { term: "Sedentarização", definition: "Fixação permanente de uma comunidade num determinado território, possibilitada pela agricultura." },
          { term: "Economia Produtora", definition: "Atividade económica em que as comunidades produzem os seus próprios bens e alimentos (agricultura, criação de gado)." },
          { term: "Megalitismo", definition: "Construções com blocos gigantescos de pedra (megálitos), como dólmenes, menires e cromeleques, ligadas a cultos fúnebres e astrológicos." }
        ],
        curiosity: "Sabias que o Cromeleque dos Almendres, perto de Évora, é cerca de 2000 anos mais antigo do que o famoso monumento de Stonehenge em Inglaterra?",
        reflectionQuestion: "Como seria o teu dia-a-dia se tivesses de viver como um caçador-recoletor do Paleolítico?"
      },
      {
        id: "t1_c2",
        title: "Contributos das Primeiras Civilizações",
        text: "Há cerca de 6000 anos, nos vales de grandes rios onde as cheias anuais fertilizavam as margens, desenvolveram-se as primeiras civilizações urbanas da História. É o caso do Egito (rio Nilo), da Mesopotâmia (rios Tigre e Eufrates), da Índia (rio Indo) e da China (rio Amarelo).\n\nO aproveitamento hidráulico e os diques permitiram uma abundante acumulação de excedentes agrícolas. Isto originou a divisão do trabalho e a criação de uma sociedade altamente estratificada: no topo situava-se o governante (como o Faraó no Egito, com um poder sacralizado, considerado parente dos deuses) e os sumos sacerdotes, enquanto na base estavam os camponeses, artesãos e escravos.\n\nPara contabilizar os impostos e controlar as colheitas, surgiu a escrita há cerca de 5500 anos! Inicialmente, tratava-se de uma escrita figurativa (como os hieróglifos egípcios ou a escrita cuneiforme suméria). Mais tarde, os Fenícios revolucionaram a comunicação ao criar a escrita alfabética, baseada em sons individuais (fonemas), facilitando imensamente as trocas comerciais. A nível religioso, a maioria destas nações praticava o politeísmo (adoração de múltiplos deuses), embora com o tempo tenham surgido raras formas de monoteísmo.",
        keyConcepts: [
          { term: "Poder Sacralizado", definition: "Forma de governo onde o governante central concentra autoridade de origem divina (visto pelas populações como um deus vivo)." },
          { term: "Sociedade Estratificada", definition: "Organização social dividida em grupos sociais rígidos e desiguais (estratos/classes), com acesso diferenciado à riqueza e poder." },
          { term: "Excedente Agrícola", definition: "Quantidade de produção que sobra após supridas as necessidades básicas de consumo da própria comunidade produtora." },
          { term: "Escrita Figurativa", definition: "Sistema de grafia onde cada símbolo representa um objeto, ideia ou palavra inteira (p. ex., hieróglifos)." },
          { term: "Politeísmo", definition: "Doutrina religiosa que defende e adora a existência de múltiplos deuses ou divindades." }
        ],
        curiosity: "Os egípcios usavam a planta do papiro não apenas para escrever, mas também para fabricar barcos, cordas e até sandálias comuns de uso diário!",
        reflectionQuestion: "De que forma a invenção da escrita alterou radicalmente a transmissão de conhecimentos ao longo das gerações?"
      }
    ],
    flashcards: [
      { id: "f_1_1", front: "Qual a diferença entre Paleolítico e Neolítico na alimentação?", back: "No Paleolítico praticava-se a recoleção (caça, pesca, colheita); no Neolítico praticava-se a economia produtora (agricultura e pastorícia)." },
      { id: "f_1_2", front: "O que é o nomadismo?", back: "Estilo de vida em que as comunidades se deslocam constantemente sem residência fixa, em busca de recursos alimentares." },
      { id: "f_1_3", front: "O que permitiu o desenvolvimento das primeiras civilizações?", back: "A proximidade a grandes rios, que fertilizavam as terras, gerando excedentes de colheitas abundantes e originando as primeiras cidades." },
      { id: "f_1_4", front: "Qual a grande diferença entre escrita figurativa e alfabética?", back: "A escrita figurativa usa símbolos para ideias ou objetos completos (hieróglifos); a alfabética usa letras representando sons fonéticos isolados." }
    ],
    exercises: [
      {
        id: "ex_1_1",
        question: "Como se chama a transição do nomadismo para a fixação permanente numa povoação ou aldeia?",
        options: ["Arqueologia", "Sedentarização", "Recoleção", "Migração"],
        correctOptionIndex: 1,
        explanation: "A sedentarização é o processo em que comunidades se fixam em habitações definitivas no Neolítico devido à agricultura."
      },
      {
        id: "ex_1_2",
        question: "Que grande monumento do megalitismo português, constituído por dezenas de menires, se situa perto de Évora?",
        options: ["Santuário de Fátima", "Cromeleque dos Almendres", "Dólmen da Barrosa", "Anta Grande do Zambujeiro"],
        correctOptionIndex: 1,
        explanation: "O Cromeleque dos Almendres é o maior conjunto de menires estruturados da Península Ibérica, localizado na região de Évora."
      },
      {
        id: "ex_1_3",
        question: "Em que região geográfica, irrigada pelos rios Tigre e Eufrates, surgiram as primeiras cidades-estado e escrita?",
        options: ["Mesopotâmia", "Gália", "Palestina", "Península Ibérica"],
        correctOptionIndex: 0,
        explanation: "A Mesopotâmia significa literalmente 'terra entre rios', onde hoje se situa o Iraque, fertilizada pelos rios Tigre e Eufrates."
      }
    ]
  },
  {
    id: 2,
    title: "A herança do Mediterrâneo Antigo",
    subtitle: "A Democracia de Atenas, o Império Romano e o Cristianismo",
    summary: "As bases estruturais do mundo ocidental moderno foram fundadas nas margens do Mediterrâneo: a reflexão política de Atenas, o engenho arquitetónico e jurídico de Roma, e os valores éticos do Cristianismo.",
    chapters: [
      {
        id: "t2_c1",
        title: "Os Gregos no século V a.C.: O Exemplo de Atenas",
        text: "No século V a.C., no ápice da Grécia Antiga, Atenas destacou-se pela criação de uma experiência governativa revolucionária: a democracia direta. Os cidadãos reuniam-se na Eclésia (assembleia cívica) para votar leis, fiscalizar magistrados e decidir sobre a guerra ou paz.\n\nContudo, esta democracia era altamente excludente e possuía fortes restrições. Apenas eram reconhecidos como cidadãos os homens livres com mais de 20 anos, nascidos de pai e mãe atenienses. Ficavam de fora todas as mulheres, os escravos (que sustentavam a economia produtiva de minas e afins) e os metecos (estrangeiros autorizados, comerciantes e artesãos, sem direitos políticos).\n\nNo campo cultural, Atenas legou ao mundo contributos fundamentais como a Filosofia (Sócrates, Platão e Aristóteles), o Teatro, a História, as ciências analíticas e o ideal dos Jogos Olímpicos. A arte clássica grega pautava-se por ideais humanistas, racionalistas e de beleza ideal, baseando-se no equilíbrio, na simetria geométrica e na harmonia em templos como o Pártenon.",
        keyConcepts: [
          { term: "Democracia Direta", definition: "Regime político onde os próprios cidadãos participam diretamente nas assembleias e nas decisões e votos municipais." },
          { term: "Cidadão Grego", definition: "Em Atenas, homem livre, maior de idade com pai e mãe atenienses, que participava plenamente no governo da cidade-estado." },
          { term: "Meteco", definition: "Estrangeiro residente em cidades gregas. Pagava impostos mas não podia possuir propriedades rústicas nem participar na política." },
          { term: "Arte Clássica", definition: "Estilo artístico que privilegia a razão, o humanismo, a simetria de proporções nas estátuas e nos templos monumentais." },
          { term: "Cidade-Estado", definition: "Pólis grega. Unidade territorial e política soberana independente, com leis, moedas e cultos próprios." }
        ],
        curiosity: "Sabias que em Atenas existia uma penalidade chamada Ostracismo? O cidadão considerado perigoso para o Estado podia ser banido da cidade por dez anos!",
        reflectionQuestion: "Quais as grandes diferenças entre a democracia direta de Atenas e a democracia representativa que praticamos no Portugal contemporâneo?"
      },
      {
        id: "t2_c2",
        title: "O Mundo Romano no Apogeu do Império",
        text: "Durante os séculos II e III d.C., o Império Romano atingiu a sua máxima extensão sob a designada Pax Romana. Roma controlava toda a bacia mediterrânica — o Mare Nostrum. Era um império de caráter cosmopolita, caracterizado por uma economia marcadamente urbana, comercial, monetária e suportada por milhões de trabalhadores escravos.\n\nA administração imperial centrava-se no papel sagrado do Imperador, o qual detinha o título militar de imperator e o poder supremo, sendo consagrado socialmente e prestando-se-lhe culto oficial religioso.\n\nPara unificar o gigantesco território e todas as etnias conquistadas, os romanos utilizaram três vias:\n1. A língua oficial: o Latim comercial.\n2. O Direito Romano: leis precisas que organizavam a vida e as províncias.\n3. A Romanização: adoção de costumes romanos por toda a parte.\n\nOs romanos revelaram-se também grandes urbanistas e construtores. A arquitetura romana destaca-se pelo pragmatismo e técnica, introduzindo o arco de volta inteira, a abóbada e a cúpula em coliseus, templos, aquedutos, estâncias termais e estradas empedradas que ligavam as fronteiras.",
        keyConcepts: [
          { term: "Pax Romana", definition: "Período de relativa estabilidade, paz interna e prosperidade do Império Romano durante os séculos I e II d.C." },
          { term: "Romanização", definition: "Processo de aculturação e integração das províncias conquistadas pelo império, adotando costumes, religião, planeamento e o latim." },
          { term: "Direito Romano", definition: "Conjunto detalhado de leis jurídicas civis escritas criadas pelos romanos que servem de base ao moderno sistema legal ocidental." },
          { term: "Arco de Volta Inteira", definition: "Elemento arquitetónico semicircular que revolucionou as abóbadas e permitiu a construção de aquedutos e pontes resistentes." }
        ],
        curiosity: "Os romanos eram génios da engenharia e inventaram uma espécie de betão de cinza vulcânica que secava debaixo de água de forma extremamente sólida!",
        reflectionQuestion: "Que vestígios da engenharia romana ainda encontras na tua região ou em monumentos que podes visitar em Portugal?"
      },
      {
        id: "t2_c3",
        title: "Origem e Difusão do Cristianismo",
        text: "Na província romana subjugada da Palestina, no século I, surgiu o Cristianismo baseado nos ensinamentos de Jesus de Nazaré. Esta doutrina baseava-se no monoteísmo, no amor ao próximo, no acolhimento de pobres e na salvação de todos os crentes perante Deus, independentemente de classe social ou raça.\n\nEstas ideias colidiam com o culto sagrado exigido aos imperadores e, por isso, os cristãos foram perseguidos por séculos em várias regiões. Contudo, usando as próprias infraestruturas imperiais, como estradas seguras que uniam o império e a circulação comercial, a fé propagou-se com imensa facilidade de leste para oeste.\n\nA sua herança assenta nas Sagradas Escrituras constituídas pelo Antigo Testamento (oriundo da fé judaica) e pelo Novo Testamento (com evangelhos narrando a vida de Jesus e as cartas dos apóstolos). No século IV, a fé cristã foi legalizada pelo Imperador Constantino (Édit de Milão em 313) e acabou proclamada religião oficial do Estado romano por Teodósio em 380, mudando permanentemente os rumos morais e institucionais da Europa.",
        keyConcepts: [
          { term: "Monoteísmo Cristão", definition: "Doutrina espiritual e religiosa fundamentada no culto a um Único Deus Vivo criador." },
          { term: "Palestina Romana", definition: "Província leste do Império Romano onde se desenvolveu o judaísmo tradicional e nasceu a religião cristã." },
          { term: "Novo Testamento", definition: "Compilação de livros e cartas pós-nascimento de Cristo sobre a Sua vida e os atos e escritos doutrinários da Igreja Primitiva." }
        ],
        curiosity: "No início, os cristãos utilizavam o desenho simples de um peixe (Ichthys) como símbolo secreto de fé para se reconhecerem mutuamente em segredo!",
        reflectionQuestion: "Como conseguiram os valores de igualdade de uma pequena fé perseguida triunfar e converter todo o poderoso Império Romano?"
      }
    ],
    flashcards: [
      { id: "f_2_1", front: "Quem não era considerado cidadão em Atenas?", back: "As mulheres, os metecos (estrangeiros) e os milhões de operários escravos." },
      { id: "f_2_2", front: "Que elementos técnicos ajudaram a arquitetura romana?", back: "O arco de volta inteira, a abóbada de berço e a cúpula em tijolo e betão sólido vulcânico." },
      { id: "f_2_3", front: "Como se realizou a expansão tão rápida do cristianismo?", back: "Aproveitando a segurança e rede de estradas empedradas e rotas comerciais marítimas criadas pela eficiente Pax Romana." },
      { id: "f_2_4", front: "Qual o documento que oficializou a liberdade de culto cristã?", back: "O Édito de Milão, promulgado pelo Imperador Constantino em 313 d.C." }
    ],
    exercises: [
      {
        id: "ex_2_1",
        question: "Como se chamava a assembleia pública onde os cidadãos livres de Atenas votavam as leis no século V a.C.?",
        options: ["Senado", "Fórum", "Eclésia", "Tribunal"],
        correctOptionIndex: 2,
        explanation: "A Eclésia era a assembleia de cidadãos livres que debatia diretamente e votava os dossiers da pólis grega."
      },
      {
        id: "ex_2_2",
        question: "Que termo descreve o processo de adoção dos padrões culturais, políticos, latinos e urbanos de Roma pelas populações conquistadas?",
        options: ["Democratização", "Romanização", "Megalitismo", "Helenização"],
        correctOptionIndex: 1,
        explanation: "A romanização representa a assimilação da língua, religião, planeamento e lazer de Roma nas províncias ultramarinas."
      },
      {
        id: "ex_2_3",
        question: "Qual era a religião dominante no Império Romano antes da conversão política e social ao Cristianismo?",
        options: ["Politeísmo pagão", "Monoteísmo hebraico", "Islamismo sunita", "Laicismo completo"],
        correctOptionIndex: 0,
        explanation: "Os romanos adoravam um forte panteão de deuses (como Júpiter, Juno, Marte e Vénus) originando festas pagãs."
      }
    ]
  },
  {
    id: 3,
    title: "Cristandade ocidental e expansão islâmica",
    subtitle: "A Europa Altomedieval, o Apogeu do Islão e o Nascimento de Portugal",
    summary: "O final do Império Romano deu início à Idade Média. Na Península Ibérica, a coexistência de fés religiosas resultou na Reconquista Cristã e na progressiva formação do Reino de Portugal.",
    chapters: [
      {
        id: "t3_c1",
        title: "A Europa dos séculos VI a IX: A Fragmentação Medieval",
        text: "Em 476 d.C., as invasões de vários povos germanos (chamados de bárbaros por Roma) destruíram o Império Romano do Ocidente. A bacia mediterrânica, dantes integrada, dividiu-se em reinos autónomos e num mosaico feudal precário.\n\nA desorganização administrativa e as guerras instalaram um profundo clima de insegurança. O comércio caiu abruptamente e as pessoas fugiram das cidades para campos fortificados, dando origem a uma economia de subsistência de baixo rendimento, que produzia apenas o necessário para consumir internamente e sobreviver.\n\nPelo meio do colapso geopolítico de reinos, a única instituição que manteve a integridade internacional foi a Igreja Católica. Através de vastos mosteiros e ordens monásticas (como a Ordem de S. Bento), a Igreja desempenhou um papel insubstituível. Preservou e copiou livros clássicos manuscritos, unificou doutrinas e atuou como o grande farol ético regulador da Europa.",
        keyConcepts: [
          { term: "Invasões Bárbaras", definition: "Grandes fluxos migratórios e ataques de vagas germânicas (suevos, visigodos) que desmantelaram as fronteiras seguras de Roma." },
          { term: "Economia de Subsistência", definition: "Prática agrícola fechada, sem comércio mercantil relevante, cujo objetivo é apenas a sobrevivência individual do próprio clã agrícola." },
          { term: "Idade Média", definition: "Época histórica balizada entre a queda de Roma em 476 e a tomada de Constantinopla (ou chegada às Américas) no final do século XV." }
        ],
        curiosity: "Nesta altura, os mosteiros eram verdadeiros centros de saber, onde monges copistas dedicavam toda a sua vida a copiar livros inteiros de forma exaustiva em pergaminho de cabra!",
        reflectionQuestion: "Que consequências tem para a vida quotidiana das pessoas a transição súbita de uma economia de trocas mundiais para uma baseada na subsistência agrícola isolada?"
      },
      {
        id: "t3_c2",
        title: "O Mundo Muçulmano em Expansão",
        text: "No início de 622, na Península Arábica, o profeta Maomé fundou o Islamismo à luz do livro sagrado — o Corão (ou Alcorão), escrito em árabe. Após unificar tribos árabes, seguiu-se uma rápida expansão islâmica sob o pretexto de difundir a fé, o comércio ativo e o cosmopolitismo urbano.\n\nEm 711 d.C., tropas mouras invadiram e dominaram grande parte da Península Ibérica (Al-Andalus). Este vasto Califado era cosmopolita e tolerava minorias como cristãos mozárabes e judeus prósperos.\n\nInovadores natos, os muçulmanos introduziram na Europa o papel, a bússola, o astrolábio e a álgebra, além de partilharem profundas técnicas agrícolas (sistemas de rega por nora e albufeiras) e plantas exóticas (como a laranjeira, o arroz e o limoeiro) que enriqueceram e influenciaram permanentemente os solos portugueses.",
        keyConcepts: [
          { term: "Corão", definition: "Tratado espiritual ditado pelas revelações ao profeta Maomé, constituindo o livro de conduta básico muçulmano." },
          { term: "Cosmopolitismo Islâmico", definition: "Ambiente cultural e urbano aberto, propício às elites intelectuais, ao livre comércio geográfico e às artes requintadas." },
          { term: "Al-Andalus", definition: "Nome atribuído ao soberano território da Península Ibérica ocupado sob a óbvia influência e califado islâmicos." }
        ],
        curiosity: "Muitas palavras em português que começam por 'al-' têm pura origem árabe de Al-Andalus, tais como: alface, algodão, alfaiate, chafariz e até algarismo!",
        reflectionQuestion: "Ao nível cultural, de que formas a convivência pacífico-comercial beneficiou as sabedorias partilhadas do sul de Portugal?"
      },
      {
        id: "t3_c3",
        title: "A Sociedade Europeia dos séculos IX a XII: O Feudalismo",
        text: "Nascida nos séculos IX a XII em tempos de novas invasões (vikings e magiares), a sociedade feudal dividia a Europa em três ordens sociais rigidamente definidas e assentes em deveres divinos e laborais:\n1. O Clero: que rezava pela salvação das almas de todos, detinha o monopólio da escrita e administrava vastas propriedades monásticas.\n2. A Nobreza: que constituía a aristocracia guerreira armada responsável pelo poder militar físico de castelos e vilas.\n3. O Povo (Servos e camponeses): que sustentava, com trabalho exaustivo da terra e pesados impostos agrários, o bem-estar e o modo de vida das ordens privilegiadas superiores.\n\nNo plano das relações políticas, o feudalismo baseava-se na vassalagem e no feudo. O suserano (senhor mais poderoso) entregava terras (feudo) a um herói guerreiro (vassalo) num cerimonial de fidelidade sincera, em troca de auxílio militar na defesa de feudos contra invasores.",
        keyConcepts: [
          { term: "Feudalismo", definition: "Sistema económico, político e social dominante assente em privilégios, enfraquecimento régio e doações de feudos rurais." },
          { term: "Relação de Vassalagem", definition: "Pacto solene entre nobres livres regulado pelo juramento de homenagem e apoio mútuo de armas e conselhos políticos." },
          { term: "Servo da Gleba", definition: "Camponês sem liberdade pessoal livre que se encontrava vinculado à terra senhorial por obrigações físicas perpétuas." }
        ],
        curiosity: "O cavalo de guerra medieval era treinado intensivamente como uma verdadeira arma viva, sendo ensinado a dar couces letais nos inimigos de armadura durante o pânico dos combates!",
        reflectionQuestion: "De que forma esta tripartição rígida ('uns rezam, outros combatem, outros trabalham') se justificava na mentalidade espiritual medieval?"
      },
      {
        id: "t3_c4",
        title: "A Formação do Reino de Portugal nas Guerras da Reconquista",
        text: "Perante a presença islâmica na Península Ibérica, as forças cristãs do norte iniciaram o esforço da Reconquista Cristã para recuperar terras para a fé.\n\nNo âmbito deste avanço, o Rei D. Afonso VI de Leão e Castela recompensou o cruzado francês Conde D. Henrique de Borgonha pela sua bravura militar, doando-lhe o Condado Portucalense em 1096 d.C., com a promessa de o expandir e governar.\n\nCom a morte do conde, o seu herdeiro, D. Afonso Henriques, assumiu a liderança das forças rebeldes, opondo-se à política interna da sua própria mãe, D. Teresa (na célebre Batalha de S. Mamede, em 1128). Determinado a conquistar a independência política nacional para o seu povo, travou memoráveis batalhas contra os mouros e contra o primo soberano castelhano.\n\nOs momentos-chave que marcaram legalmente a declaração de independência de Portugal foram o Tratado de Zamora em 1143 (assinado pelo soberano Afonso VII de Castela) e, decisivamente, em 1179, a Bula Manifestis Probatum emitida pelo Papa Alexandre III, que o reconhecia como primeiro e legítimo Rei de Portugal.",
        keyConcepts: [
          { term: "Reconquista Cristã", definition: "Movimento social e expansionista ibérico onde reis cristãos resgataram terras sob ocupação islâmica." },
          { term: "Condado Portucalense", definition: "Território suserano cedido ao Conde D. Henrique, do qual nasceu Portugal a partir do norte de Guimarães e Porto." },
          { term: "Tratado de Zamora", definition: "Pacto de 1143 por via do qual o imperador de Castela reconheceu a independência de D. Afonso Henriques." },
          { term: "Bula Manifestis Probatum", definition: "Documento oficial do Papa Alexandre III em 1179 que consagrou a autonomia de Portugal perante toda a cristandade europeia." }
        ],
        curiosity: "D. Afonso Henriques governou o reino de Portugal de forma heroica por mais de 50 anos, sendo um dos reis de maior longevidade militar de toda a história ocidental!",
        reflectionQuestion: "Qual seria a importância diplomática de ser formalmente reconhecido pelo Papa num período em que a Igreja dominava a mundividência política da Europa?"
      }
    ],
    flashcards: [
      { id: "f_3_1", front: "Qual a data da queda do Império de Ocidente?", back: "476 d.C., impulsionada pela entrada contínua de várias tribos e soberanos germânicos." },
      { id: "f_3_2", front: "Qual a importância das albufeiras que herdámos?", back: "Introduzidas pelos muçulmanos inovadores, permitiram a retenção racional e produtiva de água em olivais no sul árido." },
      { id: "f_3_3", front: "Como se dividiam as ordens no feudalismo?", back: "O Clero, a Nobreza próspera guerreira e o Povo (principalmente servos desprovidos de direitos de terra)." },
      { id: "f_3_4", front: "Que bula legitimou Portugal perante a Igreja em 1179?", back: "A Bula Manifestis Probatum do Papa Alexandre III, coroando formalmente D. Afonso Henriques." }
    ],
    exercises: [
      {
        id: "ex_3_1",
        question: "Quem se opunha a D. Afonso Henriques na Batalha de S. Mamede em 1128?",
        options: ["As forças de D. Teresa e da nobreza galega apoiantes dos Trava", "Faraó do Egito", "O exército islâmico do Califado de Córdova", "Monges franceses da ordem de Cister"],
        correctOptionIndex: 0,
        explanation: "D. Afonso Henriques enfrentou e venceu as tropas de sua própria mãe, D. Teresa, e da nobreza galega em 1128 perto de Guimarães."
      },
      {
        id: "ex_3_2",
        question: "Que livro sagrado, contendo revelações ao profeta Maomé, serve de alicerce espiritual ao mundo muçulmano?",
        options: ["Tora judaica", "Novo Testamento", "O Corão", "As Epistolas de S. Paulo"],
        correctOptionIndex: 2,
        explanation: "O Corão é a bússola espiritual que uniu o mundo árabe muçulmano no seu vasto processo expansionista."
      },
      {
        id: "ex_3_3",
        question: "Como se chamava o cruzado francês que recebeu o Condado Portucalense no ano de 1096 d.C.?",
        options: ["Conde D. Henrique de Borgonha", "D. Afonso Henriques", "Giraldo Giraldes o Sem Pavor", "Papa Alexandre III"],
        correctOptionIndex: 0,
        explanation: "O Conde D. Henrique de Borgonha casou-se com D. Teresa e herdou as rédeas do Condado Portucalense."
      }
    ]
  },
  {
    id: 4,
    title: "Portugal no contexto europeu dos séculos XII a XIV",
    subtitle: "A Expansão Económica, a Crise e a Revolução de 1383-1385",
    summary: "As transformações medievais provocaram o aparecimento da burguesia e o reatar das feiras, culminando na grande crise da Peste Negra e na afirmação dinástica de Portugal na Revolução de 1383-1385.",
    chapters: [
      {
        id: "t4_c1",
        title: "Desenvolvimento Económico, Relações Sociais e Concelhos",
        text: "Nos séculos XII a XIV, a Europa Ocidental colheu frutos de ventos de estabilidade. Climas solares favoráveis e inovações técnicas agrícolas (como o arado de ferro, os moinhos de vento rurais e a rotação trienal de culturas) originaram um enorme desenvolvimento demográfico rápido.\n\nA economia fechada de subsistência de outrora abriu espaço a uma economia monetária e urbana viva. Renasceram os grandes mercados municipais metropolitanos e estruturaram-se as primeiras redes de feiras régias anuais no país (como as de Coimbra, Guimarães ou Santarém).\n\nNesta ascensão urbana, consolidou-se uma nova e poderosa classe mercantil rica: a burguesia. Os reis portugueses, desejosos de enfraquecer e contrariar o monopólio latifundiário dos grandes senhores nobres e eclesiásticos, decidiram apoiar e fundar os concelhos rurais e urbanos autónomos. Concediam-lhes privilégios administrativos precisos, fixados num foral legal assinado pelo rei.\n\nA representação destes homens livres concelhios realizou-se nas históricas Cortes (Cortes de Leiria de 1254, pioneiras na representação régia de clero, nobreza e homens do povo de concelhos), as quais fortaleceram o poder de decisão real e elevaram Lisboamedieval a porto de relevo internacional do Atlântico.",
        keyConcepts: [
          { term: "Burguesia", definition: "Nova classe social urbana de homens livres ricos que obtém os seus fundos financeiros no negócio do comércio marítimo e cambial." },
          { term: "Foral", definition: "Documento oficial emanado pelo Rei ou Senhor Nobre que estabelecia privilégios cívicos e determinava taxas feudais nos Concelhos." },
          { term: "Cortes", definition: "Assembleia política de convocação extraordinária pelo Rei onde se reuniam as três ordens sociais medievais para aprovar decisões fiscais nacionais." }
        ],
        curiosity: "A cidade medieval de Lisboa era idealmente protegida pela famosa cerca fernandina, e possuía uma frota naval de tal forma prestigiada que exportava mel, azeite, sal e peixe português para portos de toda a Europa!",
        reflectionQuestion: "De que maneira a passagem da economia de subsistência para uma economia centrada na moeda estimulou o aparecimento da moderna burguesia mercadora?"
      },
      {
        id: "t4_c2",
        title: "Cultura Portuguesa face aos Modelos Europeus",
        text: "A produção de literatura e cultura culta na Idade Média esteve intimamente ligada a duas forças centrais: as ordens religiosas monásticas (como a Ordem de Cister, cujos monges rurais do Mosteiro de Alcobaça realizaram admiráveis trabalhos de aragem, escrita poética literária e ensino agrícola aos camponeses) e as cortes régias e senhoriais de grande prestígio poético e musical. Entre estas cortes, destaca-se a de D. Dinis – o rei poeta – célebre pelas suas famosas cantigas de amigo e cantigas de amor, no ápice do trovadorismo lírico ibérico.\n\nD. Dinis destacou-se perpetuamente ao fundar a primeira universidade portuguesa (em Lisboa, em 1290 d.C., mais tarde transferida de vez para Coimbra), democratizando os canais académicos e de administração civil para além da igreja.\n\nNas artes medievais, Portugal seguiu duas grandes fases expressas no património das aldeias e mosteiros:\n1. O estilo Românico (séculos XI-XIII): com igrejas e sés pesadas, escuras e austeras, dotadas de paredes graníticas grossas e janelas frestadas minúsculas, servindo de fortaleza material defensiva (Ex: Sé Velha de Coimbra).\n2. O estilo Gótico (séculos XIII-XV): caracterizado por grandes catedrais esbeltas, luminosas e verticais, com arcobotantes e vitrais mágicos em arco quebrado inspirando leveza mística em busca dos céus (Ex: Mosteiro da Batalha).",
        keyConcepts: [
          { term: "Mosteiro de Cister", definition: "Complexo cívico e religioso em Alcobaça dedicado à oração e cultivo agrícola que influenciou as técnicas camponesas no centro do país." },
          { term: "Trovadorismo", definition: "A primeira manifestação literária em língua galaico-portuguesa, dinamizada por compositores e músicos nas cortes régias medievais." },
          { term: "Românico vs Gótico", definition: "A arte românica é severa, de pedra maciça protetora; a gótica privilegia a altura geométrica, o arco quebrado e vitrais expressivos." }
        ],
        curiosity: "No Mosteiro de Alcobaça, os monges construíram uma imensa chaminé de cozinha com canais desviando as águas do rio Alcoa, para que este trouxesse peixe fresco direto para dentro da cozinha!",
        reflectionQuestion: "Como o aparecimento das sés fortificadas românicas reflete a profunda instabilidade militar das batalhas locais em Portugal?"
      },
      {
        id: "t4_c3",
        title: "Crise e Revolução no século XIV (1383-1385)",
        text: "O século XIV representou um período de profundas tragédias na Europa Ocidental. Invernos frios e colheitas magras resultaram em fomes em larga escala. Em 1348, espalhou-se pela Europa a Peste Negra (uma terrível pandemia bacteriana de peste bubónica), eliminando cerca de um terço da população do continente e provocando uma quebra demográfica dramática e uma óbvia crise económica.\n\nPara agravar a situação, Portugal enfrentou uma terrível crise social e dinástica após a morte do Rei D. Fernando em 1383 sem filhos varões. O casamento da sua única filha, D. Beatriz, com o Rei D. João I de Castela, desencadeou o fantasma iminente da perda de independência nacional e da absorção do país pelo clã castelhano.\n\nEm reação, o Povo livre, a pequena fidalguia rural patriota e as elites mercadoras da burguesia de Lisboa uniram-se contra a regente D. Leonor Teles na famosa Revolução de 1383-1385. Elegeram o Mestre de Avis (irmão bastardo do falecido rei) como Regedor e Defensor do Reino, intitulando-o D. João I de Portugal.\n\nA contenda militar culminou com a invasão castelhana, decidida heroicamente na gloriosa Batalha de Aljubarrota (a 14 de agosto de 1385), sob a liderança genial de D. Nuno Álvares Pereira (o Santo Condestável). Ao vencerem, as forças aliadas garantiram de vez a legitimação do trono à Dinastia de Avis e a salvação perpétua de Portugal.",
        keyConcepts: [
          { term: "Peste Negra", definition: "Pandemia de peste bubónica que em 1348 devastou aldeias ibéricas provocando uma catástrofe demográfica." },
          { term: "Mestre de Avis", definition: "D. João I. Irmão consanguíneo de D. Fernando, aclamado em cortes para liderar a revolução de independência." },
          { term: "Batalha de Aljubarrota", definition: "Épico confronto militar em 1485 onde uma bem estruturada força portuguesa derrotou a poderosa cavalaria real de Castela." },
          { term: "Dinastia de Avis", definition: "Segunda dinastia real nacional que assentou o trono no comércio marítimo exterior, abrindo portas aos Descobrimentos Portugueses." }
        ],
        curiosity: "A Peste Negra era transmitida por pulgas e ratos, mas na Idade Média pensavam que o mal vinha dos 'maus ares', e por isso usavam estranhas máscaras em forma de bico cheias de flores perfumadas!",
        reflectionQuestion: "Que papel desempenhou a burguesia mercadora de Lisboa na revolução, vendo a independência mercantil como a sua grande prioridade de vida?"
      }
    ],
    flashcards: [
      { id: "f_4_1", front: "Para que serviam os forais concedidos pelos reis?", back: "Garantiam a liberdade cívica local das populações dos concelhos face aos abusos da nobreza feudal." },
      { id: "f_4_2", front: "Que rei português fundou a primeira universidade?", back: "D. Dinis, o Lavrador, no ano de 1290, originalmente em Lisboa." },
      { id: "f_4_3", front: "Qual a causa animal da difusão da Peste Negra?", back: "As frotas de barcos mercantes de Génova infestados por ratos com pulgas infetadas pela bactéria da peste." },
      { id: "f_4_4", front: "Quem foi o chefe militar que liderou as defesas em Aljubarrota?", back: "D. Nuno Álvares Pereira, também conhecido como o Santo Condestável de Portugal." }
    ],
    exercises: [
      {
        id: "ex_4_1",
        question: "Que nova e próspera classe social urbana medieval obteve imenso poder ao apoiar D. João I na revolução?",
        options: ["Clero e Monges", "Nobreza Feudal", "Burguesia Comercial", "Servos do Campo"],
        correctOptionIndex: 2,
        explanation: "A burguesia investiu fundos no Mestre de Avis para proteger Lisboa e os seus direitos de comércio mercantil contra Castela."
      },
      {
        id: "ex_4_2",
        question: "Como se chama o estilo artístico românico com aparência pesada de castelo e parede espessa que impera nas sés medievais?",
        options: ["Estilo Neoclássico", "Estilo Românico", "Estilo Gótico", "Arte Barroca"],
        correctOptionIndex: 1,
        explanation: "O Românico pretendia expressar solenidade e força bélica-espiritual defensiva num período de contínuas batalhas reais."
      },
      {
        id: "ex_4_3",
        question: "Em que célebre batalha, em agosto de 1385, as escassas forças portuguesas usaram a tática do quadrado para vencer a cavalaria castelhana?",
        options: ["Batalha de Ourique", "Batalha de Aljubarrota", "Batalha de S. Mamede", "Batalha de Guimarães"],
        correctOptionIndex: 1,
        explanation: "A Batalha de Aljubarrota garantiu a legitimação do jovem trono e o salvamento do reino da absorção castelhana."
      }
    ]
  }
];

export const HISTORICAL_SOURCES: HistoricalSource[] = [
  {
    id: "source_coalesces_p1",
    title: "Gravuras de Animais em Foz Côa",
    type: "arqueologico",
    era: "Paleolítico Superior (aprox. 25.000 a.C.)",
    location: "Vila Nova de Foz Côa, Portugal",
    description: "Estas famosas gravuras rupestres ao ar livre mostram cavalos e bisontes desenhados na pedra de xisto. Revelam as crenças mágicas e ritos religiosos das comunidades recoletoras e caçadoras de há dezenas de milhares de anos.",
    imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=800&q=80", // representational
    questions: [
      "Quais os animais representados na rocha de xisto?",
      "De que forma este tipo de arte ao ar livre nos ajuda a compreender as atitudes espirituais do caçador do Paleolítico?",
      "Se as comunidades do Paleolítico eram nómadas, por que razão decidiram gravar em pedras fixas ao longo de rios?"
    ],
    suggestedAnswers: [
      "Auroques, cavalos medievais, bisontes e cabras montesas selvagens.",
      "Demonstram um culto ligado à fertilidade e magia simpática, pintando os animais para que a caça física real corresse bem nas encostas.",
      "Porque esses rios (rio Côa) serviam de locais de encontro sagrados entre vários bandos nómadas de caçadores em épocas de migrações de presas."
    ]
  },
  {
    id: "source_almendres_p1",
    title: "O Cromeleque dos Almendres",
    type: "monumento",
    era: "Neolítico Médio (aprox. 5.000 a.C.)",
    location: "Évora, Portugal",
    description: "Trata-se de um círculo gigante (cromeleque) composto por dezenas de monólitos de pedra esculpidas (menires) organizados de acordo com os ciclos astronómicos dos equinócios solares. É o maior e mais preservado monumento do megalitismo na Península Ibérica.",
    imageUrl: "https://images.unsplash.com/photo-1543872084-c7bd3822856f?auto=format&fit=crop&w=800&q=80", // representational ancient stones
    questions: [
      "Que mudança social e económica permitiu a estas grandes comunidades realizarem um esforço coletivo para erguer pedras tão pesadas?",
      "Como era organizado este santuário megalítico?",
      "Qual o significado astronómico-religioso que os historiadores atribuem às pedras dos Almendres?"
    ],
    suggestedAnswers: [
      "A sedentarização e a agricultura do Neolítico, que resultavam em grandes aldeamentos estojados com fartura alimentar e tempo disponível.",
      "Disposto sob a forma de uma ampla elipse de menires esculpidos apontando rigorosamente para as direções dos eixos celestes.",
      "Serviam de marcos astronómicos para calendarizar os equinócios/solstícios de veraneio cruciais para as agrícolas sementeiras rurais."
    ]
  },
  {
    id: "source_temple_evora",
    title: "Templo Romano de Évora (Templo de Diana)",
    type: "monumento",
    era: "Século I d.C. (Época Imperial)",
    location: "Évora, Portugal",
    description: "Construído em mármore local no centro do antigo fórum (fórum romano) de Évora, este templo clássico constitui o mais imponente monumento da romanização em Portugal, consagrado ao culto divino do Imperador Augusto de Roma.",
    imageUrl: temploDianaImg,
    questions: [
      "Que características estéticas da arquitetura clássica romana identificas no Templo de Évora?",
      "Qual a importância das cidades e dos seus espaços do 'Fórum romano' na romanização da antiga província da Lusitânia?",
      "Qual a função política do culto sagrado imperial praticado nestes templos públicos?"
    ],
    suggestedAnswers: [
      "Pilares de granito, capitéis coríntios esculpidos em mármore, simetria equilibrada e robusta base retangular elevada.",
      "As cidades eram as molas centrais da Pax Romana, instalando templos de lazer, estâncias termais e fóruns cívicos para atrair elites tribais.",
      "Assegurar fidelidade patriótica e teológica inabalável de todos os povos ultramarinos conquistados à figura suprema do Imperador romano."
    ]
  },
  {
    id: "source_monastery_alcobaca",
    title: "Mosteiro e Igreja de Alcobaça",
    type: "monumento",
    era: "Século XII d.C. (Arte Gótica / Românica)",
    location: "Alcobaça, Portugal",
    description: "Doador célebre por D. Afonso Henriques à poderosa Ordem dos Monges de Cister no esforço agrário militar da Reconquista. A magnífica nave central foi erguida no novo estilo gótico medieval, inspirando elevação vertical de suntuosa luz interior.",
    imageUrl: "https://images.unsplash.com/photo-1599809275671-b5941cabc7a5?auto=format&fit=crop&w=800&q=80", // representational gothic nave
    questions: [
      "Qual era a dupla função (espiritual e económica) exercida pela influente Ordem de Cister no início do Reino de Portugal?",
      "Distingue as inovações arquitetónicas da sua nave suntuosa gótica face ao anterior estilo tradicional românico.",
      "Como este fabuloso monumento gótico contribuiu para glorificar a autoridade militar rústica do fundador D. Afonso Henriques?"
    ],
    suggestedAnswers: [
      "A oração eclesiástica pela paz e o inovador desbravamento e desenvolvimento agrário sistemático da fertilização dos campos portugueses.",
      "Introduziu tetos de abóbada de cruzaria de ogivas imensamente altas, colunas leves de capitéis arejados e vitrais iluminando o altar.",
      "Mostrava à Europa cristã que o novo reino possuía riquezas e canais com as grandes ordens monásticas da Europa central."
    ]
  },
  {
    id: "source_carta_foral",
    title: "Carta de Foral de D. Afonso Henriques",
    type: "texto",
    era: "Século XII (1179)",
    location: "Santarém (Arquivo Nacional da Torre do Tombo), Portugal",
    description: "Este histórico pergaminho redigido em latim constitui um documento oficial assinado de próprio punho de D. Afonso Henriques. Trata-se do foral municipal outorgado aos homens livres concelhios de Santarém, fixando as suas regras comerciais.",
    imageUrl: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80", // representational scroll
    questions: [
      "O que era uma 'Carta de Foral' em Portugal?",
      "Por que razão os primeiros reis de Portugal (como D. Afonso Henriques e D. Dinis) outorgavam tantos privilégios locais aos Concelhos do Povo livre?",
      "Deduza a importância da preservação destes raros pergaminhos jurídicos medievais na Torre do Tombo nos dias de hoje."
    ],
    suggestedAnswers: [
      "Um pergaminho real autêntico regulando as taxas tributárias camponesas, garantindo imunidade de multas contra fidalgos arrogantes.",
      "Para povoar as encostas conquistadas e criar núcleos milicianos do povo para repelir rápidas contra-ofensivas muçulmanas moras.",
      "Estes manuscritos registam cientificamente as leis medievais, os limites territoriais e as origens da moderna língua portuguesa."
    ]
  }
];

export const BADGES: Badge[] = [
  {
    id: "primeiros_passos",
    title: "Explorador Aprendiz",
    description: "Inseriu o seu nome e deu os primeiros passos nas Aulas da Professora Carla Oliveira!",
    icon: "Navigation",
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: "explorer_t1",
    title: "Mestre das Civilizações",
    description: "Concluiu satisfatoriamente o Tema de Paleolítico às Primeiras Civilizações!",
    icon: "Flame",
    color: "from-amber-500 to-orange-500"
  },
  {
    id: "roma_vicit_t2",
    title: "Patrício Romano",
    description: "Concluiu as lições sobre a Democracia Grega, o Direito de Roma e a sua herança!",
    icon: "Shield",
    color: "from-rose-500 to-red-500"
  },
  {
    id: "reconquistador_t3",
    title: "Cavaleiro do Condado",
    description: "Estudou a Europa feudal, Al-Andalus e as façanhas de fundação do fundador D. Afonso Henriques!",
    icon: "Sword",
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: "mestre_medieval_t4",
    title: "Burguês das Cortes",
    description: "Estudou a passagem económica para as moedas, as cortes e a crise de 1383-1385, no século XIV!",
    icon: "Crown",
    color: "from-purple-500 to-violet-500"
  },
  {
    id: "mente_brilhante",
    title: "Cérebro Brilhante de 100%",
    description: "Obteve a pontuação máxima excelente num Quiz ou Exercício de Consolidação!",
    icon: "Compass",
    color: "from-yellow-400 to-amber-600"
  },
  {
    id: "arqueologo",
    title: "Detetive de Fontes",
    description: "Analisou detalhadamente as nossas fontes históricas reais nacionais de Foz Côa a Alcobaça!",
    icon: "Search",
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: "game_master",
    title: "Campeão de Desafios",
    description: "Demonstrou destreza ao ultrapassar com sucesso os nossos jogos e desafios lúdicos!",
    icon: "Trophy",
    color: "from-pink-500 to-purple-600"
  }
];
