const startBtn = document.getElementById('start-btn');
const muteToggle = document.getElementById('mute-toggle');
const speakerImg = document.getElementById('speaker-img');
const birthdayMusic = document.getElementById('birthday-music');
const seasonMusic = document.getElementById('season-music');
const typingText = document.getElementById('typing-text');
const nextBtn = document.getElementById('next-btn');
const stickyWall = document.querySelector('.sticky-wall');
const wallBoard = document.getElementById('wall-board');
const poemView = document.getElementById('poem-view');
const poemTitle = document.getElementById('poem-title');
const poemContent = document.getElementById('poem-content');
const backToWallBtn = document.getElementById('back-to-wall');
const overlay = document.getElementById('overlay');

let currentMusic = birthdayMusic;
let messageIndex = 0;
let charIndex = 0;
let typingSpeed = 30;
let typingInterval;

// Set up music
birthdayMusic.volume = 0.5;
seasonMusic.volume = 0.5;

// Function to try playing music
async function tryPlayMusic() {
  try {
    await birthdayMusic.play();
    speakerImg.src = 'https://cdn-icons-png.flaticon.com/512/727/727240.png';
    muteToggle.setAttribute('aria-pressed', 'true');
  } catch (err) {
    console.log('Autoplay failed, will try again on user interaction');
  }
}

// Try to play music as soon as possible
document.addEventListener('DOMContentLoaded', tryPlayMusic);
window.addEventListener('load', tryPlayMusic);
document.addEventListener('click', tryPlayMusic, { once: true });
document.addEventListener('touchstart', tryPlayMusic, { once: true });

const messages = [
   'Dear Ayana,\n\nOn your special day, I wish you peace, fulfillment, and a quiet kind of happiness that lingers warmly in the heart. You continue to grow into someone thoughtful, graceful, and deeply inspiring. May your day be filled with calm, delight, and everything that feels right—because you truly deserve it.',
   'Dear Ayana,\n\nMore than just cake and candles, I hope this year brings you real joy, strong health, and adventures that feel true to your soul. May you find strength in the storms and contentment in the stillness. You\'re not just growing older—you\'re becoming more of the woman you were meant to be.',
      'Dear Ayana,\n\nAs you enter this next chapter, I hope you feel seen, appreciated, and deeply valued. Wishing you clarity, confidence, peaceful days, and laughter that lasts. Happy Birthday, Ayana.\n\nLove always,\nLloyd',
  'So before we proceed for the next page i just wanted to say that\nDear Ayana,\n\nAcross the distance and through the quiet moments,\nI wanted to share these thoughts with you—\nWords from my heart about us, the seasons,\nAnd the hope that grows slowly but surely.\n\nEvery day, even in silence, you\'re present in my thoughts.\nLike how the sky patiently waits for the stars,\nI\'ve held on to the little things—your smile, your voice,\nThe way your name feels like home when I whisper it.\n\nThis page holds pieces of my soul,\nWrapped in honesty, warmth, and soft longing.\nWhatever comes next, I want you to know:\nThese words are for you, only you.'
];

const poems = [
  {
    title: 'S – Still I Stay',
    content: 'Across the seas, beneath the skies,\nMy thoughts drift softly where you rise.\nThough I\'m not there to see you smile,\nI carry you through every mile.\nThe world is wide, the roads unknown,\nBut still I walk this path alone.\nNot chasing fast, not forcing way—\nJust standing here… still I will stay.'
  },
  {
    title: 'E – Echoes of You',
    content: 'Your voice, though typed or sent through screen,\nHas warmed cold nights I\'ve barely seen.\nEach little laugh, each shared hello,\nBecomes a place where flowers grow.\nI replay words you didn\'t know\nWould stay with me and gently glow.\nYou speak, and through the static blue—\nThe world feels lighter... echoes of you.'
  },
  {
    title: 'A – Apart, But Drawn',
    content: 'We\'re distant, yes, and far in space,\nBut somehow, you still hold your place\nWithin the quiet of my days—\nLike whispered wind or morning haze.\nI\'m not expecting you to fall,\nNor do I rush or beg or call.\nI\'m simply drawn, not to possess,\nBut to admire... and hope you guess.'
  },
  {
    title: 'S – Slowly, Strong',
    content: 'Love shouldn\'t burn too bright, too fast—\nThe kind that flares but doesn\'t last.\nWith you, I\'ve found a sweeter pace,\nA kind of calm, a kind of grace.\nEach word we share, each time you care,\nBecomes a brick I place with care.\nThis feeling builds, both deep and long—\nNot loud or wild... but slowly strong.'
  },
  {
    title: 'O – One Hope, One Day',
    content: 'I don\'t claim to know your dreams,\nOr what your heart is chasing, it seems.\nBut deep inside, there\'s something small—\nA quiet hope, that\'s grown through it all.\nNot to rush you, or make you choose,\nJust hoping one day, I won\'t lose.\nIf you ever feel the same someday,\nI\'ll be right here—no words to say.\nJust open arms, no heavy plans,\nJust a quiet heart that understands.'
  },
  {
    title: 'N – Near in Heart',
    content: 'I can\'t appear outside your door,\nOr leave sweet notes upon your floor.\nBut even from this distant shore,\nI feel you near—what love is for.\nYou\'re not a flame I want to own,\nBut someone I have gently known.\nThrough nights and dreams and skies apart,\nYou\'re far away… but near in heart.'
  },
  {
    title: 'S – Someday, Maybe',
    content: 'And if someday, the stars align,\nYour path might cross again with mine,\nThen all the waiting, quiet, true,\nWill bloom into a life with you.\nBut if not now, or not at all,\nI\'ll still be grateful for the call\nThat led me here, to write this rhyme—\nAnd feel this love across all time.'
  },
  {
    title: 'SEASONS',
    content: 'Still I stay, though far from sight,\nIn dreams you visit every night.\nYour echoes hum through sky and air,\nI find you softly, always there.\nThough we\'re apart, I\'m gently near,\nWith patient hope, not driven by fear.\nSlowly, my care has grown so strong,\nNot loud, but steady all along.\nWith one hope held in quiet ways,\nI wait with warmth that never sways.\nAnd even though you\'re far away,\nYou\'re close to me in every way.\nIf there\'s a chance, in time or space,\nI\'ll wait for you — at your own pace.'
  },
  {
    title: 'Here With You',
    content: 'In a world that can be unsure, I\'ve chosen to get to know you more.\nOut of everyone, it\'s you I want to explore —\nSomeone I\'m truly grateful for.\n\nNo matter what each day might bring, I\'ll be here, not rushing a thing.\nI enjoy the time we spend,\nAnd I hope it doesn\'t end.\n\nThis feeling I have is fresh and new — something real when I\'m with you.\nIt\'s gentle, calm, and full of grace,\nLike finding comfort in the right place.\n\nI\'ll offer you my time and care, and show you always I\'m truly there.\nNot just in words, but in how I act,\nWith kindness, honesty, and simple facts.\n\nSome days may feel quiet or slow, and that\'s okay — it helps us grow.\nEven when there\'s not much to do,\nI\'ll still enjoy just being with you.\n\nBecause from the start, something felt right —\nLike a soft flame gently catching light.\nNot rushed, not forced, just real and true —\nAnd I\'m happy getting to know you.'
  }
];

async function switchMusic(newMusic) {
  if (currentMusic !== newMusic) {
    const wasPlaying = !currentMusic.paused;
    currentMusic.pause();
    currentMusic.currentTime = 0;
    currentMusic = newMusic;
    if (wasPlaying) {
      try {
        await currentMusic.play();
        speakerImg.src = 'https://cdn-icons-png.flaticon.com/512/727/727240.png';
        muteToggle.setAttribute('aria-pressed', 'true');
      } catch (err) {
        console.log('Music switch failed:', err);
        speakerImg.src = 'https://cdn-icons-png.flaticon.com/512/727/727243.png';
        muteToggle.setAttribute('aria-pressed', 'false');
      }
    }
  }
}

function showSection(section) {
  // Hide all sections
  document.querySelectorAll('section').forEach(s => s.classList.remove('visible'));
  // Hide poem view if open
  poemView.classList.remove('visible');
  // Show given section
  section.classList.add('visible');
}

function typeMessage() {
  if (charIndex < messages[messageIndex].length) {
    typingText.textContent += messages[messageIndex].charAt(charIndex);
    charIndex++;
  } else {
    clearInterval(typingInterval);
    typingInterval = null;
    nextBtn.style.display = 'inline-block';
    // Only show confetti for birthday messages (not the last message)
    if (messageIndex < messages.length - 1) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }
}

function startTyping() {
  // Clear any existing interval
  if (typingInterval) {
    clearInterval(typingInterval);
  }
  
  typingText.textContent = '';
  charIndex = 0;
  nextBtn.style.display = 'none';
  
  // Remove previous message classes
  document.querySelector('.typing-screen').classList.remove('typing-message-1', 'typing-message-2', 'typing-message-3', 'typing-message-4');
  // Add current message class
  document.querySelector('.typing-screen').classList.add(`typing-message-${messageIndex + 1}`);
  
  // Switch music based on the message
  if (messageIndex === 3) { // Your heartfelt message (last message)
    switchMusic(seasonMusic);
  } else { // Birthday messages
    switchMusic(birthdayMusic);
  }
  
  typingInterval = setInterval(typeMessage, typingSpeed);
}

function createStickyNotes() {
  if (wallBoard.children.length === 0) {
    const themes = ['snoopy-theme', 'pochacco-theme', 'korumi-theme'];
    
    poems.forEach((poem, i) => {
      const note = document.createElement('div');
      const themeIndex = i % 3;
      const variantIndex = Math.floor(i / 3) % 3 + 1;
      note.className = `sticky-note ${themes[themeIndex]} variant-${variantIndex}`;
      
      const mainCharacter = document.createElement('div');
      mainCharacter.className = 'character-icon character-main';
      
      const noteContent = document.createElement('div');
      noteContent.className = 'note-content';
      noteContent.textContent = poem.title;
      
      note.appendChild(mainCharacter);
      note.appendChild(noteContent);
      
      note.tabIndex = 0;
      note.setAttribute('role', 'button');
      note.setAttribute('aria-pressed', 'false');
      note.addEventListener('click', () => showPoem(i));
      note.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          showPoem(i);
        }
      });
      wallBoard.appendChild(note);
    });
  }
}

function showPoem(index) {
  poemTitle.textContent = poems[index].title;
  poemContent.textContent = poems[index].content;
  overlay.classList.add('visible');
  poemView.classList.add('visible');
  poemView.focus();
}

startBtn.addEventListener('click', () => {
  showSection(document.querySelector('.typing-screen'));
  messageIndex = 0;
  startTyping();
});

nextBtn.addEventListener('click', () => {
  messageIndex++;
  if (messageIndex < messages.length) {
    startTyping();
  } else {
    // Keep the seasons music playing for the sticky wall
    if (currentMusic === birthdayMusic) {
      switchMusic(seasonMusic);
    }
    createStickyNotes();
    showSection(stickyWall);
    nextBtn.style.display = 'none';
  }
});

muteToggle.addEventListener('click', async () => {
  try {
    if (currentMusic.paused) {
      await currentMusic.play();
      speakerImg.src = 'https://cdn-icons-png.flaticon.com/512/727/727240.png';
      muteToggle.setAttribute('aria-pressed', 'true');
    } else {
      currentMusic.pause();
      speakerImg.src = 'https://cdn-icons-png.flaticon.com/512/727/727243.png';
      muteToggle.setAttribute('aria-pressed', 'false');
    }
  } catch (err) {
    console.log('Music toggle failed:', err);
    speakerImg.src = 'https://cdn-icons-png.flaticon.com/512/727/727243.png';
    muteToggle.setAttribute('aria-pressed', 'false');
  }
});

muteToggle.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    muteToggle.click();
  }
});

backToWallBtn.addEventListener('click', () => {
  overlay.classList.remove('visible');
  poemView.classList.remove('visible');
  backToWallBtn.blur();
});

// Close poem view when clicking overlay
overlay.addEventListener('click', () => {
  overlay.classList.remove('visible');
  poemView.classList.remove('visible');
});

// Close poem view when pressing Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && poemView.classList.contains('visible')) {
    overlay.classList.remove('visible');
    poemView.classList.remove('visible');
  }
}); 