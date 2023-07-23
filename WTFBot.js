// thanks to chatgpt for these gems
const phrases = [
    "wtffffff",
    "How did this ever work?",
    "Who wrote this? Oh, it was me.",
    "Why doesn't this match the documentation? Ah, there is no documentation!",
    "Of course, it works on my machine!",
    "I swear it worked yesterday.",
    "Code, why don't you love me back?",
    "Who needs unit tests, said no sane engineer ever.",
    "Who needs a social life when you have compiler errors?",
    "Why did past me think this was a good idea?",
    "Go home code, you're drunk.",
    "Oh look, another bug. At least I'm not lonely.",
    "Trust me, I’m an engineer… who doesn’t understand his own code.",
  ];

  function get_random_phrase() {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  }
  
  module.exports = { get_random_phrase }
  