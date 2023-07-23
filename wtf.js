const phrases = [
    "wtffffff",
    "How did this ever work?"
    "Who wrote this? Oh, it was me.",
    "Why doesn't this match the documentation? Ah, there is no documentation!",
    "Is this a bug or a feature? Who can tell anymore?",
    "Of course, it works on my machine!",
    "This is why we can't have nice things!",
    "The rubber duck understands better than this debugger.",
    "I swear it worked yesterday.",
    "Code, why don't you love me back?",
    "I should have gone into agriculture.",
    "If at first you don't succeed; call it version 1.0!",
    "Let's see, I think I can break the laws of physics here.",
    "Is there a StackOverflow exception for existential crisis?",
    "Who needs unit tests, said no sane engineer ever.",
    "Will work for less cryptic error messages.",
    "If I had a penny for every semicolon I missed…",
    "By the power of caffeinated beverages, compile!",
    "Deadlines and broken code, name a more iconic duo.",
    "When in doubt, //TODO it.",
    "Who needs a social life when you have compiler errors?",
    "Why did past me think this was a good idea?",
    "So, this is what they meant by 'Debugging is like being the detective in a crime movie where you are also the murderer'.",
    "Error 404: Sanity not found.",
    "Don't you 'unexpected error' me!",
    "But it was supposed to be foolproof!",
    "I think I understand quantum physics better than this code.",
    "Go home code, you're drunk.",
    "Oh look, another bug. At least I'm not lonely.",
    "Trust me, I’m an engineer… who doesn’t understand his own code.",
    "How many bugs does it take to drive an engineer mad? Just one, apparently.",
    "Oh great, another 'learning opportunity'."
  ];

  function get_random_phrase() {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  }
  