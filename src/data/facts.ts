export interface Fact {
  id: number
  category: 'histoire' | 'sciences' | 'geo' | 'art' | 'sport' | 'nature' | 'corps' | 'espace' | 'techno' | 'cuisine'
  title: string
  content: string
  emoji: string
  source?: string
}

export const facts: Fact[] = [
  // HISTOIRE
  { id: 1, category: 'histoire', emoji: '🏛️', title: 'Les pyramides', content: 'Les pyramides de Gizeh ont été construites il y a 4 500 ans et étaient recouvertes de calcaire blanc brillant.' },
  { id: 2, category: 'histoire', emoji: '⚔️', title: 'Jules César', content: 'Jules César a été poignardé 23 fois par des sénateurs romains, dont son ami Brutus.' },
  { id: 3, category: 'histoire', emoji: '🗼', title: 'La Tour Eiffel', content: 'La Tour Eiffel devait être démontée après 20 ans. Elle a été sauvée car elle servait d\'antenne radio.' },
  { id: 4, category: 'histoire', emoji: '🎭', title: 'Cléopâtre', content: 'Cléopâtre vivait plus proche dans le temps de l\'iPhone que de la construction des pyramides.' },
  { id: 5, category: 'histoire', emoji: '🏰', title: 'Moyen Âge', content: 'Au Moyen Âge, les gens se lavaient régulièrement. Le mythe de la saleté médiévale est faux.' },
  { id: 6, category: 'histoire', emoji: '🚢', title: 'Titanic', content: 'Le Titanic avait sa propre boulangerie qui a produit 1 000 pains par jour pendant le voyage.' },
  { id: 7, category: 'histoire', emoji: '👑', title: 'Louis XIV', content: 'Louis XIV a pris seulement 3 bains dans toute sa vie, préférant se frotter avec des serviettes parfumées.' },
  { id: 8, category: 'histoire', emoji: '🏺', title: 'Pompéi', content: 'À Pompéi, on a retrouvé des graffitis antiques comme "Marcus aime Spendusa" gravés sur les murs.' },
  { id: 9, category: 'histoire', emoji: '📜', title: 'Déclaration US', content: 'La Déclaration d\'indépendance américaine a été écrite sur du papier de chanvre.' },
  { id: 10, category: 'histoire', emoji: '🗽', title: 'Statue de la Liberté', content: 'La Statue de la Liberté était à l\'origine de couleur cuivre brillant avant de devenir verte.' },

  // SCIENCES
  { id: 11, category: 'sciences', emoji: '⚡', title: 'Foudre', content: 'La foudre est 5 fois plus chaude que la surface du Soleil, atteignant 30 000°C.' },
  { id: 12, category: 'sciences', emoji: '💎', title: 'Diamants', content: 'On peut créer des diamants à partir de beurre de cacahuète en le soumettant à une pression extrême.' },
  { id: 13, category: 'sciences', emoji: '🧬', title: 'ADN', content: 'Si on déroulait tout l\'ADN d\'une cellule humaine, il mesurerait environ 2 mètres de long.' },
  { id: 14, category: 'sciences', emoji: '🔬', title: 'Atomes', content: 'Un atome est constitué à 99,9999% de vide. Si on enlevait ce vide, l\'humanité tiendrait dans un sucre.' },
  { id: 15, category: 'sciences', emoji: '💧', title: 'Eau chaude', content: 'L\'eau chaude gèle plus vite que l\'eau froide. C\'est l\'effet Mpemba, et on ne sait pas vraiment pourquoi.' },
  { id: 16, category: 'sciences', emoji: '🌡️', title: 'Zéro absolu', content: 'Le zéro absolu (-273,15°C) est la température où les atomes cessent tout mouvement.' },
  { id: 17, category: 'sciences', emoji: '⚛️', title: 'Radioactivité', content: 'Les bananes sont légèrement radioactives à cause du potassium-40 qu\'elles contiennent.' },
  { id: 18, category: 'sciences', emoji: '🧲', title: 'Aimants', content: 'On ne peut jamais avoir un aimant avec un seul pôle. Même coupé en deux, il aura toujours 2 pôles.' },
  { id: 19, category: 'sciences', emoji: '💡', title: 'Ampoule de Livermore', content: 'Une ampoule à Livermore, Californie, brûle sans interruption depuis 1901.' },
  { id: 20, category: 'sciences', emoji: '🔋', title: 'Pile de Bagdad', content: 'Une pile électrique vieille de 2 000 ans a été découverte à Bagdad. On ignore son usage.' },

  // GEOGRAPHIE
  { id: 21, category: 'geo', emoji: '🗺️', title: 'Russie', content: 'La Russie a 11 fuseaux horaires et s\'étend sur deux continents.' },
  { id: 22, category: 'geo', emoji: '🏔️', title: 'Everest', content: 'Le sommet de l\'Everest était autrefois sous l\'eau. On y trouve des fossiles marins.' },
  { id: 23, category: 'geo', emoji: '🌊', title: 'Océan Pacifique', content: 'L\'océan Pacifique est plus grand que toutes les terres émergées réunies.' },
  { id: 24, category: 'geo', emoji: '🏜️', title: 'Sahara', content: 'Le Sahara était verdoyant il y a 6 000 ans, avec des lacs et des hippopotames.' },
  { id: 25, category: 'geo', emoji: '🌋', title: 'Islande', content: 'L\'Islande grandit de 5 cm par an car elle est située sur deux plaques tectoniques qui s\'écartent.' },
  { id: 26, category: 'geo', emoji: '🇫🇷', title: 'France', content: 'La France est le pays avec le plus de fuseaux horaires au monde (12) grâce à ses territoires d\'outre-mer.' },
  { id: 27, category: 'geo', emoji: '🏝️', title: 'Maldives', content: 'Les Maldives sont le pays le plus plat du monde avec une altitude moyenne de 1,5 mètre.' },
  { id: 28, category: 'geo', emoji: '🌍', title: 'Afrique', content: 'L\'Afrique est le seul continent traversé par le tropique du Cancer, l\'équateur ET le tropique du Capricorne.' },
  { id: 29, category: 'geo', emoji: '🗻', title: 'Mauna Kea', content: 'Le Mauna Kea à Hawaï est plus haut que l\'Everest si on mesure depuis sa base sous-marine (10 203 m).' },
  { id: 30, category: 'geo', emoji: '🌲', title: 'Forêt amazonienne', content: 'L\'Amazonie produit 20% de l\'oxygène mondial et abrite 10% de toutes les espèces connues.' },

  // ART & CULTURE
  { id: 31, category: 'art', emoji: '🎨', title: 'La Joconde', content: 'La Joconde n\'a pas de sourcils. La mode de l\'époque était de les raser.' },
  { id: 32, category: 'art', emoji: '🖼️', title: 'Van Gogh', content: 'Van Gogh n\'a vendu qu\'un seul tableau de son vivant : "La Vigne rouge".' },
  { id: 33, category: 'art', emoji: '🎬', title: 'Premier film', content: 'Le premier film de l\'histoire montrait des ouvriers sortant d\'une usine Lumière en 1895.' },
  { id: 34, category: 'art', emoji: '📚', title: 'Don Quichotte', content: 'Don Quichotte est le livre le plus traduit au monde après la Bible.' },
  { id: 35, category: 'art', emoji: '🎵', title: 'Mozart', content: 'Mozart a composé sa première symphonie à 8 ans et connaissait plus de 600 œuvres à sa mort.' },
  { id: 36, category: 'art', emoji: '🎭', title: 'Shakespeare', content: 'Shakespeare a inventé plus de 1 700 mots anglais, dont "assassination" et "lonely".' },
  { id: 37, category: 'art', emoji: '🗿', title: 'Moaï', content: 'Les statues de l\'île de Pâques ont des corps enterrés. Seules les têtes dépassent.' },
  { id: 38, category: 'art', emoji: '🎪', title: 'Cirque', content: 'Le mot "cirque" vient du latin "circus" signifiant cercle, forme de l\'arène romaine.' },
  { id: 39, category: 'art', emoji: '📖', title: 'Harry Potter', content: 'J.K. Rowling a été refusée par 12 éditeurs avant que Harry Potter soit publié.' },
  { id: 40, category: 'art', emoji: '🎸', title: 'Beatles', content: 'Les Beatles ont été refusés par Decca Records qui a dit que "les groupes de guitare sont démodés".' },

  // SPORT
  { id: 41, category: 'sport', emoji: '⚽', title: 'Football', content: 'Le football est le sport le plus populaire au monde avec 4 milliards de fans.' },
  { id: 42, category: 'sport', emoji: '🏀', title: 'NBA', content: 'Michael Jordan a été recalé de l\'équipe de basket de son lycée en seconde.' },
  { id: 43, category: 'sport', emoji: '🏊', title: 'Natation', content: 'Michael Phelps a gagné plus de médailles olympiques que 80% des pays participants.' },
  { id: 44, category: 'sport', emoji: '🎾', title: 'Tennis', content: 'Les balles de tennis étaient blanches jusqu\'en 1972, changées en jaune pour la TV.' },
  { id: 45, category: 'sport', emoji: '🏃', title: 'Marathon', content: 'Le marathon fait 42,195 km car la reine d\'Angleterre voulait voir le départ de son balcon en 1908.' },
  { id: 46, category: 'sport', emoji: '🥊', title: 'Boxe', content: 'Muhammad Ali a refusé d\'aller au Vietnam, perdant son titre et 3 ans de carrière.' },
  { id: 47, category: 'sport', emoji: '⛳', title: 'Golf', content: 'Le golf est le seul sport pratiqué sur la Lune. Alan Shepard y a joué en 1971.' },
  { id: 48, category: 'sport', emoji: '🏈', title: 'Super Bowl', content: 'Le Super Bowl est le 2e jour de consommation de nourriture aux USA après Thanksgiving.' },
  { id: 49, category: 'sport', emoji: '🎿', title: 'Ski', content: 'Les plus anciens skis découverts ont 8 000 ans et viennent de Russie.' },
  { id: 50, category: 'sport', emoji: '🏋️', title: 'Haltérophilie', content: 'Le record du monde de soulevé de terre est de 501 kg, par Hafthor Björnsson (La Montagne dans GoT).' },

  // NATURE & ANIMAUX
  { id: 51, category: 'nature', emoji: '🐙', title: 'Pieuvre', content: 'Les pieuvres ont 3 cœurs, du sang bleu et peuvent changer de couleur en 0,3 seconde.' },
  { id: 52, category: 'nature', emoji: '🦋', title: 'Papillon', content: 'Les papillons goûtent avec leurs pattes et peuvent détecter le nectar en se posant.' },
  { id: 53, category: 'nature', emoji: '🐝', title: 'Abeilles', content: 'Une abeille visite 2 000 fleurs par jour et produit 1/12 de cuillère de miel dans sa vie.' },
  { id: 54, category: 'nature', emoji: '🦈', title: 'Requins', content: 'Les requins existent depuis plus longtemps que les arbres (450 millions vs 350 millions d\'années).' },
  { id: 55, category: 'nature', emoji: '🐘', title: 'Éléphants', content: 'Les éléphants sont les seuls animaux qui ne peuvent pas sauter.' },
  { id: 56, category: 'nature', emoji: '🦩', title: 'Flamants roses', content: 'Les flamants roses naissent blancs et deviennent roses à cause des crevettes qu\'ils mangent.' },
  { id: 57, category: 'nature', emoji: '🐌', title: 'Escargots', content: 'Les escargots peuvent dormir pendant 3 ans si les conditions ne sont pas favorables.' },
  { id: 58, category: 'nature', emoji: '🦑', title: 'Calmar géant', content: 'Les yeux du calmar géant font la taille d\'un ballon de basket (27 cm de diamètre).' },
  { id: 59, category: 'nature', emoji: '🐬', title: 'Dauphins', content: 'Les dauphins dorment avec un œil ouvert et la moitié du cerveau éveillée.' },
  { id: 60, category: 'nature', emoji: '🦎', title: 'Caméléon', content: 'Les caméléons ne changent pas de couleur pour se camoufler mais pour communiquer.' },

  // CORPS HUMAIN
  { id: 61, category: 'corps', emoji: '🧠', title: 'Cerveau', content: 'Le cerveau utilise 20% de l\'énergie du corps alors qu\'il ne représente que 2% de sa masse.' },
  { id: 62, category: 'corps', emoji: '❤️', title: 'Cœur', content: 'Le cœur bat environ 100 000 fois par jour et pompe 7 500 litres de sang.' },
  { id: 63, category: 'corps', emoji: '👁️', title: 'Yeux', content: 'Vos yeux peuvent distinguer environ 10 millions de couleurs différentes.' },
  { id: 64, category: 'corps', emoji: '👃', title: 'Odorat', content: 'Le nez humain peut détecter plus de 1 000 milliards d\'odeurs différentes.' },
  { id: 65, category: 'corps', emoji: '🦴', title: 'Os', content: 'Un bébé naît avec 300 os, mais un adulte n\'en a que 206 (certains fusionnent).' },
  { id: 66, category: 'corps', emoji: '💪', title: 'Muscles', content: 'Il faut 17 muscles pour sourire et 43 pour froncer les sourcils.' },
  { id: 67, category: 'corps', emoji: '👅', title: 'Langue', content: 'L\'empreinte de la langue est unique, comme les empreintes digitales.' },
  { id: 68, category: 'corps', emoji: '🦷', title: 'Dents', content: 'L\'émail des dents est la substance la plus dure du corps humain.' },
  { id: 69, category: 'corps', emoji: '💅', title: 'Ongles', content: 'Les ongles des mains poussent 4 fois plus vite que ceux des pieds.' },
  { id: 70, category: 'corps', emoji: '🫁', title: 'Poumons', content: 'Si on dépliait les poumons, leur surface couvrirait un terrain de tennis.' },

  // ESPACE
  { id: 71, category: 'espace', emoji: '🌙', title: 'Lune', content: 'La Lune s\'éloigne de la Terre de 3,8 cm chaque année.' },
  { id: 72, category: 'espace', emoji: '☀️', title: 'Soleil', content: 'La lumière du Soleil met 8 minutes et 20 secondes pour atteindre la Terre.' },
  { id: 73, category: 'espace', emoji: '🪐', title: 'Saturne', content: 'Saturne flotterait sur l\'eau si on trouvait un océan assez grand.' },
  { id: 74, category: 'espace', emoji: '⭐', title: 'Étoiles', content: 'Il y a plus d\'étoiles dans l\'univers que de grains de sable sur Terre.' },
  { id: 75, category: 'espace', emoji: '🌌', title: 'Voie lactée', content: 'Notre galaxie contient entre 100 et 400 milliards d\'étoiles.' },
  { id: 76, category: 'espace', emoji: '🚀', title: 'Voyager 1', content: 'Voyager 1, lancé en 1977, est l\'objet humain le plus éloigné de la Terre.' },
  { id: 77, category: 'espace', emoji: '🕳️', title: 'Trou noir', content: 'Au centre de notre galaxie, il y a un trou noir 4 millions de fois plus massif que le Soleil.' },
  { id: 78, category: 'espace', emoji: '🔴', title: 'Mars', content: 'Un jour sur Mars dure 24h37, presque comme sur Terre.' },
  { id: 79, category: 'espace', emoji: '💫', title: 'Neutrons', content: 'Une cuillère d\'étoile à neutrons pèserait 6 milliards de tonnes sur Terre.' },
  { id: 80, category: 'espace', emoji: '🛸', title: 'ISS', content: 'La Station Spatiale Internationale fait le tour de la Terre en 90 minutes.' },

  // TECHNOLOGIE
  { id: 81, category: 'techno', emoji: '📱', title: 'Smartphone', content: 'Votre smartphone est plus puissant que tous les ordinateurs de la NASA en 1969.' },
  { id: 82, category: 'techno', emoji: '💻', title: 'Premier ordinateur', content: 'Le premier ordinateur ENIAC pesait 27 tonnes et occupait une pièce entière.' },
  { id: 83, category: 'techno', emoji: '🌐', title: 'Internet', content: 'Le premier message envoyé sur Internet était "LO" (crash avant "LOGIN").' },
  { id: 84, category: 'techno', emoji: '📧', title: 'Email', content: 'Le premier email a été envoyé en 1971 par Ray Tomlinson, à lui-même.' },
  { id: 85, category: 'techno', emoji: '🎮', title: 'Jeux vidéo', content: 'Le premier jeu vidéo "Tennis for Two" a été créé en 1958 sur un oscilloscope.' },
  { id: 86, category: 'techno', emoji: '📸', title: 'Photo', content: 'La première photo a nécessité 8 heures d\'exposition en 1826.' },
  { id: 87, category: 'techno', emoji: '🤖', title: 'Robot', content: 'Le mot "robot" vient du tchèque "robota" signifiant travail forcé.' },
  { id: 88, category: 'techno', emoji: '📺', title: 'Télévision', content: 'La première émission TV a été diffusée en 1928 avec une image de 30 lignes.' },
  { id: 89, category: 'techno', emoji: '🔊', title: 'MP3', content: 'Le format MP3 compresse la musique en supprimant les sons que l\'oreille ne perçoit pas.' },
  { id: 90, category: 'techno', emoji: '🛜', title: 'WiFi', content: 'Le WiFi a été inventé par une actrice hollywoodienne, Hedy Lamarr, pendant la guerre.' },

  // CUISINE & ALIMENTATION
  { id: 91, category: 'cuisine', emoji: '🍫', title: 'Chocolat', content: 'Le chocolat était utilisé comme monnaie par les Aztèques.' },
  { id: 92, category: 'cuisine', emoji: '🍕', title: 'Pizza', content: 'La pizza Margherita a été créée en 1889 en l\'honneur de la reine d\'Italie.' },
  { id: 93, category: 'cuisine', emoji: '🍜', title: 'Nouilles instantanées', content: 'Les nouilles instantanées ont été inventées au Japon en 1958.' },
  { id: 94, category: 'cuisine', emoji: '🥐', title: 'Croissant', content: 'Le croissant n\'est pas français mais autrichien, inventé à Vienne.' },
  { id: 95, category: 'cuisine', emoji: '🍿', title: 'Pop-corn', content: 'Le pop-corn éclate car l\'eau dans le grain se transforme en vapeur à 180°C.' },
  { id: 96, category: 'cuisine', emoji: '🧀', title: 'Fromage', content: 'Il existe plus de 1 800 variétés de fromages dans le monde.' },
  { id: 97, category: 'cuisine', emoji: '☕', title: 'Café', content: 'Le café est la 2e marchandise la plus échangée au monde après le pétrole.' },
  { id: 98, category: 'cuisine', emoji: '🍯', title: 'Miel', content: 'Le miel est le seul aliment qui ne se périme jamais. Du miel de 3 000 ans est encore comestible.' },
  { id: 99, category: 'cuisine', emoji: '🥜', title: 'Cacahuète', content: 'La cacahuète n\'est pas une noix mais une légumineuse, comme les lentilles.' },
  { id: 100, category: 'cuisine', emoji: '🍌', title: 'Banane', content: 'Les bananes sont légèrement radioactives et courbées car elles poussent vers le soleil.' },

  // PLUS DE FAITS VARIÉS
  { id: 101, category: 'sciences', emoji: '🌈', title: 'Arc-en-ciel', content: 'Un arc-en-ciel est en fait un cercle complet. On ne voit que la moitié depuis le sol.' },
  { id: 102, category: 'nature', emoji: '🌳', title: 'Arbres', content: 'Les arbres communiquent entre eux via un réseau de champignons souterrains.' },
  { id: 103, category: 'histoire', emoji: '🎩', title: 'Abraham Lincoln', content: 'Abraham Lincoln était lutteur et a gagné 300 combats avant de devenir président.' },
  { id: 104, category: 'geo', emoji: '🇧🇷', title: 'Brésil', content: 'Le Brésil tire son nom d\'un arbre : le bois de braise (pau-brasil).' },
  { id: 105, category: 'corps', emoji: '😴', title: 'Sommeil', content: 'On passe en moyenne 26 ans de sa vie à dormir et 7 ans à essayer de s\'endormir.' },
  { id: 106, category: 'espace', emoji: '🌍', title: 'Terre', content: 'La Terre ralentit. Dans 140 millions d\'années, un jour durera 25 heures.' },
  { id: 107, category: 'techno', emoji: '🔍', title: 'Google', content: 'Le nom Google vient de "googol", le chiffre 1 suivi de 100 zéros.' },
  { id: 108, category: 'art', emoji: '🎪', title: 'Charlie Chaplin', content: 'Charlie Chaplin a participé à un concours de sosies de lui-même et a fini 3e.' },
  { id: 109, category: 'nature', emoji: '🐜', title: 'Fourmis', content: 'Le poids total de toutes les fourmis sur Terre égale celui de tous les humains.' },
  { id: 110, category: 'cuisine', emoji: '🍅', title: 'Tomate', content: 'La tomate a été considérée comme toxique en Europe pendant 200 ans.' },

  { id: 111, category: 'histoire', emoji: '🎖️', title: 'Guerre 14-18', content: 'Pendant la trêve de Noël 1914, soldats allemands et britanniques ont joué au football ensemble.' },
  { id: 112, category: 'sciences', emoji: '🧪', title: 'Verre', content: 'Le verre met 1 million d\'années à se décomposer dans la nature.' },
  { id: 113, category: 'sport', emoji: '🏆', title: 'Coupe du monde', content: 'Le trophée de la Coupe du monde de foot est en or 18 carats et pèse 6,1 kg.' },
  { id: 114, category: 'nature', emoji: '🦜', title: 'Perroquet', content: 'Les perroquets peuvent vivre plus de 80 ans et apprendre 1 000 mots.' },
  { id: 115, category: 'geo', emoji: '🇯🇵', title: 'Japon', content: 'Le Japon a plus de 6 800 îles, mais seulement 430 sont habitées.' },
  { id: 116, category: 'corps', emoji: '🤧', title: 'Éternuement', content: 'Un éternuement peut atteindre 160 km/h et projeter 40 000 gouttelettes.' },
  { id: 117, category: 'espace', emoji: '🌠', title: 'Étoile filante', content: 'Les étoiles filantes sont en fait des grains de poussière qui brûlent en entrant dans l\'atmosphère.' },
  { id: 118, category: 'techno', emoji: '🖱️', title: 'Souris', content: 'La première souris d\'ordinateur était en bois, inventée en 1964.' },
  { id: 119, category: 'art', emoji: '🎬', title: 'Hollywood', content: 'Le panneau Hollywood disait à l\'origine "Hollywoodland" pour une pub immobilière.' },
  { id: 120, category: 'cuisine', emoji: '🌶️', title: 'Piment', content: 'Boire de l\'eau après un piment empire la sensation. Le lait est plus efficace.' },

  { id: 121, category: 'histoire', emoji: '🗿', title: 'Sphinx', content: 'Le Sphinx de Gizeh a perdu son nez il y a 600 ans, probablement à cause d\'un vandale.' },
  { id: 122, category: 'sciences', emoji: '🌪️', title: 'Tornades', content: 'Les tornades peuvent atteindre 500 km/h et soulever des maisons entières.' },
  { id: 123, category: 'nature', emoji: '🐋', title: 'Baleine bleue', content: 'Le cœur d\'une baleine bleue est si gros qu\'un enfant pourrait ramper dans ses artères.' },
  { id: 124, category: 'geo', emoji: '🏜️', title: 'Antarctique', content: 'L\'Antarctique est techniquement un désert car il ne reçoit que 166 mm de précipitations par an.' },
  { id: 125, category: 'corps', emoji: '💤', title: 'Rêves', content: 'On oublie 95% de nos rêves dans les 5 minutes qui suivent le réveil.' },
  { id: 126, category: 'espace', emoji: '🛰️', title: 'Satellites', content: 'Il y a plus de 9 000 satellites en orbite autour de la Terre, dont beaucoup sont des débris.' },
  { id: 127, category: 'techno', emoji: '📞', title: 'Téléphone', content: 'Les premières sonneries de téléphone étaient des cloches mécaniques.' },
  { id: 128, category: 'art', emoji: '🎻', title: 'Stradivarius', content: 'Les violons Stradivarius sont si précieux car on ne sait toujours pas reproduire leur son.' },
  { id: 129, category: 'sport', emoji: '⚾', title: 'Baseball', content: 'Une balle de baseball est cousue avec exactement 108 points de couture.' },
  { id: 130, category: 'cuisine', emoji: '🥖', title: 'Baguette', content: 'La baguette française a été inscrite au patrimoine mondial de l\'UNESCO en 2022.' },

  { id: 131, category: 'histoire', emoji: '👸', title: 'Marie-Antoinette', content: 'Marie-Antoinette n\'a jamais dit "Qu\'ils mangent de la brioche". C\'est une légende.' },
  { id: 132, category: 'sciences', emoji: '🧊', title: 'Glace', content: 'L\'eau chaude gèle plus vite que l\'eau froide dans certaines conditions (effet Mpemba).' },
  { id: 133, category: 'nature', emoji: '🦥', title: 'Paresseux', content: 'Les paresseux sont si lents que des algues poussent sur leur fourrure.' },
  { id: 134, category: 'geo', emoji: '🇨🇦', title: 'Canada', content: 'Le Canada a plus de lacs que tous les autres pays du monde réunis.' },
  { id: 135, category: 'corps', emoji: '👂', title: 'Oreilles', content: 'Vos oreilles et votre nez continuent de grandir toute votre vie.' },
  { id: 136, category: 'espace', emoji: '🪨', title: 'Astéroïdes', content: 'L\'astéroïde qui a tué les dinosaures faisait 10 km de diamètre.' },
  { id: 137, category: 'techno', emoji: '💾', title: 'Disquette', content: 'L\'icône "enregistrer" représente une disquette, objet inconnu des moins de 20 ans.' },
  { id: 138, category: 'art', emoji: '🎭', title: 'Théâtre', content: 'Le mot "drame" vient du grec "dran" qui signifie "agir".' },
  { id: 139, category: 'sport', emoji: '🏌️', title: 'Hole in one', content: 'La probabilité de faire un hole-in-one au golf est de 1 sur 12 500.' },
  { id: 140, category: 'cuisine', emoji: '🧈', title: 'Beurre', content: 'Il faut 21 litres de lait pour produire 1 kg de beurre.' },

  { id: 141, category: 'histoire', emoji: '📿', title: 'Vikings', content: 'Les Vikings ne portaient pas de casques à cornes. C\'est un mythe du 19e siècle.' },
  { id: 142, category: 'sciences', emoji: '⏰', title: 'Temps', content: 'Le temps passe plus vite en altitude qu\'au niveau de la mer (relativité).' },
  { id: 143, category: 'nature', emoji: '🦔', title: 'Hérisson', content: 'Les hérissons sont immunisés contre le venin de serpent.' },
  { id: 144, category: 'geo', emoji: '🌴', title: 'Hawaii', content: 'Hawaii s\'éloigne du Japon de 10 cm par an à cause des plaques tectoniques.' },
  { id: 145, category: 'corps', emoji: '🫀', title: 'Sang', content: 'En une journée, votre sang parcourt environ 19 000 km dans votre corps.' },
  { id: 146, category: 'espace', emoji: '🔭', title: 'Galaxies', content: 'Il y a environ 2 000 milliards de galaxies dans l\'univers observable.' },
  { id: 147, category: 'techno', emoji: '🎧', title: 'Bluetooth', content: 'Le Bluetooth tire son nom d\'un roi viking du 10e siècle, Harald "Bluetooth".' },
  { id: 148, category: 'art', emoji: '🖌️', title: 'Picasso', content: 'Picasso savait dessiner de façon réaliste dès l\'âge de 7 ans.' },
  { id: 149, category: 'sport', emoji: '🥇', title: 'JO anciens', content: 'Les athlètes des Jeux Olympiques antiques concouraient entièrement nus.' },
  { id: 150, category: 'cuisine', emoji: '🍦', title: 'Glace', content: 'Le cornet de glace a été inventé par accident à la foire de Saint-Louis en 1904.' },
]

export const categories = {
  histoire: { name: 'Histoire', color: 'from-amber-500 to-orange-600', emoji: '📜' },
  sciences: { name: 'Sciences', color: 'from-green-500 to-emerald-600', emoji: '🔬' },
  geo: { name: 'Géographie', color: 'from-blue-500 to-cyan-600', emoji: '🌍' },
  art: { name: 'Art & Culture', color: 'from-purple-500 to-pink-600', emoji: '🎨' },
  sport: { name: 'Sport', color: 'from-red-500 to-rose-600', emoji: '⚽' },
  nature: { name: 'Nature', color: 'from-lime-500 to-green-600', emoji: '🌿' },
  corps: { name: 'Corps Humain', color: 'from-pink-500 to-rose-600', emoji: '🫀' },
  espace: { name: 'Espace', color: 'from-indigo-500 to-violet-600', emoji: '🚀' },
  techno: { name: 'Technologie', color: 'from-cyan-500 to-blue-600', emoji: '💻' },
  cuisine: { name: 'Cuisine', color: 'from-orange-500 to-amber-600', emoji: '🍳' },
}
