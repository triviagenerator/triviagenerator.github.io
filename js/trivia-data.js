/**
 * Trivia Generator — Question Bank
 * Each entry: category, difficulty (easy | medium | hard), question,
 * options (array of 4), answer (index of correct option), fact (bonus context shown after reveal)
 */

const TRIVIA_CATEGORIES = [
  { id: "science",   label: "Science & Nature",     icon: "🧪", tab: "01" },
  { id: "history",   label: "History",              icon: "🏛️", tab: "02" },
  { id: "geography", label: "Geography",            icon: "🌍", tab: "03" },
  { id: "pop",       label: "Pop Culture",          icon: "🎬", tab: "04" },
  { id: "sports",    label: "Sports",               icon: "🏅", tab: "05" },
  { id: "arts",      label: "Literature & Arts",    icon: "📚", tab: "06" },
  { id: "tech",      label: "Technology",           icon: "💻", tab: "07" },
  { id: "general",   label: "General Knowledge",    icon: "🎓", tab: "08" }
];

const TRIVIA_QUESTIONS = [
  // SCIENCE & NATURE
  { category: "science", difficulty: "easy", question: "What gas do plants absorb from the atmosphere for photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], answer: 1, fact: "Plants release oxygen as a byproduct of photosynthesis — the very air we breathe." },
  { category: "science", difficulty: "easy", question: "What is the largest organ in the human body?", options: ["Liver", "Brain", "Skin", "Heart"], answer: 2, fact: "An adult's skin covers about 20 square feet and weighs roughly 8 pounds." },
  { category: "science", difficulty: "medium", question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], answer: 2, fact: "Au comes from the Latin word 'aurum', meaning shining dawn." },
  { category: "science", difficulty: "medium", question: "Which planet has the most moons in our solar system?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], answer: 1, fact: "Saturn currently holds the record with over 140 confirmed moons." },
  { category: "science", difficulty: "hard", question: "What is the only metal that is liquid at room temperature?", options: ["Lead", "Mercury", "Bismuth", "Gallium"], answer: 1, fact: "Mercury stays liquid down to about -38°C, far colder than typical room temperature." },
  { category: "science", difficulty: "hard", question: "What is the powerhouse of the cell called?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Apparatus"], answer: 2, fact: "Mitochondria generate ATP, the energy currency cells use to function." },
  { category: "science", difficulty: "medium", question: "How many bones are in the adult human body?", options: ["186", "206", "226", "246"], answer: 1, fact: "Babies are born with about 300 bones, many of which fuse together by adulthood." },
  { category: "science", difficulty: "easy", question: "What force pulls objects toward the Earth?", options: ["Magnetism", "Gravity", "Friction", "Tension"], answer: 1, fact: "Gravity on the Moon is about one-sixth as strong as on Earth." },

  // HISTORY
  { category: "history", difficulty: "easy", question: "In which year did World War II end?", options: ["1943", "1945", "1947", "1950"], answer: 1, fact: "The war formally ended on September 2, 1945, with Japan's surrender." },
  { category: "history", difficulty: "medium", question: "Who was the first President of the United States?", options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"], answer: 2, fact: "Washington served two terms and refused a third, setting a long-standing precedent." },
  { category: "history", difficulty: "medium", question: "Which ancient civilization built the Machu Picchu citadel?", options: ["Aztec", "Maya", "Inca", "Olmec"], answer: 2, fact: "Machu Picchu was likely built around 1450 as an estate for an Incan emperor." },
  { category: "history", difficulty: "hard", question: "The Magna Carta was signed in which year?", options: ["1066", "1215", "1348", "1492"], answer: 1, fact: "King John of England sealed it at Runnymede to limit royal power." },
  { category: "history", difficulty: "easy", question: "Which wall divided a major European city until 1989?", options: ["Hadrian's Wall", "The Berlin Wall", "The Great Wall", "The Atlantic Wall"], answer: 1, fact: "The Berlin Wall fell on November 9, 1989, reuniting East and West Berlin." },
  { category: "history", difficulty: "hard", question: "Who painted the ceiling of the Sistine Chapel?", options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"], answer: 2, fact: "It took Michelangelo roughly four years, working mostly on his back, to complete it." },
  { category: "history", difficulty: "medium", question: "The ancient city of Rome was built on how many hills?", options: ["Five", "Seven", "Nine", "Twelve"], answer: 1, fact: "The 'Seven Hills of Rome' include Palatine, Capitoline, and Aventine." },

  // GEOGRAPHY
  { category: "geography", difficulty: "easy", question: "What is the largest country in the world by land area?", options: ["Canada", "China", "Russia", "USA"], answer: 2, fact: "Russia spans 11 time zones, more than any other country." },
  { category: "geography", difficulty: "easy", question: "Which river is the longest in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: 1, fact: "The Nile flows roughly 4,135 miles through northeastern Africa." },
  { category: "geography", difficulty: "medium", question: "Mount Kilimanjaro is located in which country?", options: ["Kenya", "Tanzania", "Uganda", "Ethiopia"], answer: 1, fact: "It is the highest free-standing mountain in the world at 19,341 feet." },
  { category: "geography", difficulty: "medium", question: "Which desert is the largest hot desert on Earth?", options: ["Gobi", "Kalahari", "Sahara", "Mojave"], answer: 2, fact: "The Sahara covers roughly 3.6 million square miles across North Africa." },
  { category: "geography", difficulty: "hard", question: "Which country has the most natural lakes?", options: ["United States", "Russia", "Canada", "Finland"], answer: 2, fact: "Canada is home to roughly 60% of the world's lakes." },
  { category: "geography", difficulty: "easy", question: "What is the capital city of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: 2, fact: "Canberra was purpose-built as a compromise between rivals Sydney and Melbourne." },
  { category: "geography", difficulty: "hard", question: "The Strait of Gibraltar separates Europe from which continent?", options: ["Asia", "Africa", "South America", "Antarctica"], answer: 1, fact: "At its narrowest, the strait is only about 8.9 miles wide." },

  // POP CULTURE
  { category: "pop", difficulty: "easy", question: "Which streaming service produced the series 'Stranger Things'?", options: ["Hulu", "Netflix", "Disney+", "Amazon Prime"], answer: 1, fact: "The show is set in the fictional town of Hawkins, Indiana." },
  { category: "pop", difficulty: "easy", question: "Who directed the 'Jurassic Park' film franchise's first movie?", options: ["James Cameron", "Steven Spielberg", "George Lucas", "Ridley Scott"], answer: 1, fact: "The 1993 film was groundbreaking for blending animatronics with CGI dinosaurs." },
  { category: "pop", difficulty: "medium", question: "Which artist released the album 'Thriller' in 1982?", options: ["Prince", "Michael Jackson", "Stevie Wonder", "Lionel Richie"], answer: 1, fact: "Thriller remains the best-selling album of all time worldwide." },
  { category: "pop", difficulty: "medium", question: "In the Harry Potter series, what house is Harry sorted into?", options: ["Slytherin", "Ravenclaw", "Hufflepuff", "Gryffindor"], answer: 3, fact: "The Sorting Hat famously considered placing Harry in Slytherin instead." },
  { category: "pop", difficulty: "hard", question: "Which band performed 'Bohemian Rhapsody'?", options: ["The Rolling Stones", "Led Zeppelin", "Queen", "Pink Floyd"], answer: 2, fact: "The song's unusual structure famously broke radio-length conventions in 1975." },
  { category: "pop", difficulty: "easy", question: "What is the name of the coffee shop in the show 'Friends'?", options: ["Central Perk", "The Grind", "Java Junction", "Daily Brew"], answer: 0, fact: "Central Perk's orange couch became one of TV's most recognizable set pieces." },

  // SPORTS
  { category: "sports", difficulty: "easy", question: "How many players are on a standard soccer team on the field?", options: ["9", "10", "11", "12"], answer: 2, fact: "That's 11 players per side, including the goalkeeper." },
  { category: "sports", difficulty: "easy", question: "In which sport would you perform a slam dunk?", options: ["Volleyball", "Basketball", "Tennis", "Badminton"], answer: 1, fact: "The dunk was briefly banned in NCAA basketball from 1967 to 1976." },
  { category: "sports", difficulty: "medium", question: "How often are the Summer Olympic Games held?", options: ["Every 2 years", "Every 3 years", "Every 4 years", "Every 5 years"], answer: 2, fact: "The Olympics were cancelled three times due to World Wars, but the 4-year cycle otherwise holds." },
  { category: "sports", difficulty: "medium", question: "Which country has won the most FIFA World Cup titles?", options: ["Germany", "Argentina", "Brazil", "Italy"], answer: 2, fact: "Brazil has won the tournament five times, most recently in 2002." },
  { category: "sports", difficulty: "hard", question: "In golf, what term describes one stroke under par?", options: ["Bogey", "Eagle", "Birdie", "Albatross"], answer: 2, fact: "Two strokes under par is called an 'eagle', and three under is an 'albatross'." },
  { category: "sports", difficulty: "hard", question: "Which country invented the sport of table tennis?", options: ["China", "Japan", "England", "USA"], answer: 2, fact: "Table tennis originated as an after-dinner parlor game in Victorian England." },

  // LITERATURE & ARTS
  { category: "arts", difficulty: "easy", question: "Who wrote the play 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], answer: 1, fact: "Shakespeare likely wrote the tragedy around 1594–1596." },
  { category: "arts", difficulty: "medium", question: "Which artist is famous for the painting 'The Starry Night'?", options: ["Claude Monet", "Vincent van Gogh", "Pablo Picasso", "Salvador Dalí"], answer: 1, fact: "Van Gogh painted it from memory while staying at an asylum in France." },
  { category: "arts", difficulty: "medium", question: "What is the pen name of author Samuel Clemens?", options: ["O. Henry", "Mark Twain", "Lewis Carroll", "George Orwell"], answer: 1, fact: "He took the name from a riverboat term meaning 'two fathoms deep'." },
  { category: "arts", difficulty: "hard", question: "Who composed the opera 'The Magic Flute'?", options: ["Beethoven", "Mozart", "Bach", "Verdi"], answer: 1, fact: "Mozart completed the opera just months before his death in 1791." },
  { category: "arts", difficulty: "easy", question: "In which novel does the character Atticus Finch appear?", options: ["Of Mice and Men", "To Kill a Mockingbird", "The Great Gatsby", "Moby Dick"], answer: 1, fact: "Harper Lee published the novel in 1960, and it won a Pulitzer Prize." },

  // TECHNOLOGY
  { category: "tech", difficulty: "easy", question: "What does 'HTTP' stand for?", options: ["HyperText Transfer Protocol", "High Tech Transfer Process", "Home Tool Transfer Protocol", "HyperText Tool Process"], answer: 0, fact: "HTTP was developed by Tim Berners-Lee in 1989–1991." },
  { category: "tech", difficulty: "medium", question: "Who co-founded Apple alongside Steve Jobs?", options: ["Bill Gates", "Steve Wozniak", "Tim Cook", "Larry Page"], answer: 1, fact: "Wozniak designed the original Apple I and Apple II computers." },
  { category: "tech", difficulty: "medium", question: "What does 'CPU' stand for?", options: ["Central Process Utility", "Computer Personal Unit", "Central Processing Unit", "Core Processing Unit"], answer: 2, fact: "The CPU is often called the 'brain' of the computer." },
  { category: "tech", difficulty: "hard", question: "In what year was the first iPhone released?", options: ["2005", "2007", "2009", "2011"], answer: 1, fact: "Steve Jobs unveiled the original iPhone at Macworld in January 2007." },
  { category: "tech", difficulty: "easy", question: "Which company developed the Android operating system?", options: ["Apple", "Microsoft", "Google", "Samsung"], answer: 2, fact: "Google acquired Android Inc. in 2005, two years before launching the OS." },

  // GENERAL KNOWLEDGE
  { category: "general", difficulty: "easy", question: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], answer: 2, fact: "Most geography curricula recognize seven continents, though some models combine Europe and Asia." },
  { category: "general", difficulty: "easy", question: "What is the freezing point of water in Celsius?", options: ["-10°C", "0°C", "10°C", "32°C"], answer: 1, fact: "Water freezes at 0°C and boils at 100°C at standard atmospheric pressure." },
  { category: "general", difficulty: "medium", question: "What is the most spoken native language in the world?", options: ["English", "Hindi", "Mandarin Chinese", "Spanish"], answer: 2, fact: "Mandarin has the most native speakers, though English is the most widely learned second language." },
  { category: "general", difficulty: "medium", question: "Which currency is used in Japan?", options: ["Won", "Yuan", "Yen", "Ringgit"], answer: 2, fact: "The yen was introduced in 1871 as part of modernizing Japan's economy." },
  { category: "general", difficulty: "hard", question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: 2, fact: "2 is the only even prime number — every other even number is divisible by 2." },
  { category: "general", difficulty: "hard", question: "How many time zones does mainland China officially observe?", options: ["1", "3", "5", "8"], answer: 0, fact: "Despite spanning a huge longitude, all of China follows a single official time zone." }
];

// Utility: fetch questions filtered by category and/or difficulty
function getFilteredQuestions(category, difficulty) {
  return TRIVIA_QUESTIONS.filter((q) => {
    const catMatch = category === "all" || q.category === category;
    const diffMatch = difficulty === "all" || q.difficulty === difficulty;
    return catMatch && diffMatch;
  });
}

function getRandomQuestion(category = "all", difficulty = "all") {
  const pool = getFilteredQuestions(category, difficulty);
  if (pool.length === 0) return null;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}
