import { Milestone, PolaroidPhoto, LoveQuote } from '@/types';

export const ANNIVERSARY_DATE = '2025-08-22T00:00:00+07:00';
export const CORRECT_PIN = '220825';
export const BIRTHDAY_PIN = '020513';
export const VALID_PINS = ['220825', '020513'];

export const LETTER_CONTENT = {
  recipient: 'Fathiyyah ❤️',
  date: 'Spesial Ulang Tahun ke-14 & Anniversary',
  paragraphs: [
    'Selamat ulang tahun yang ke-14 untuk Fathiyyah tersayang! 🎂🎉 Selamat bertambah usia gadis manisku yang lahir pada 2 Mei 2013. Semoga di usiamu yang ke-14 ini, harimu selalu dipenuhi kebahagiaan, tawa yang tak pernah pudar, dan segala hal baik selalu menyertaimu.',
    'Terima kasih sudah hadir di hidupku dan membawakan warna-warna indah yang sebelumnya tak pernah kukenal. Bersyukur sekali rasanya bisa merayakan momen spesial ini bersamamu.',
    'Sejak hari jadian kita di tanggal 22 Agustus 2025, setiap hari bersamamu terasa seperti anugerah terindah. Menjadi teman jalanmu, pendengar ceritamu, dan orang yang selalu ada di sampingmu adalah hal yang paling membahagiakan.',
    'Tawamu selalu jadi melodi paling menenangkan, dan senyummu selalu berhasil membuat duniaku lebih cerah. Di hari ulang tahunmu yang ke-14 ini, doaku semoga kita terus saling menjaga, saling menguatkan, dan tumbuh bersama.',
    'Tetaplah jadi Fathiyyah yang kukenal—yang ceria, baik hati, dan selalu menggemaskan. Happy 14th Birthday cintaku! 🎂💕 I love you more than words could ever describe.'
  ],
  closing: 'Dengan segenap cintaku,',
  sender: 'Putra 🌹'
};

export const POLAROID_PHOTOS: PolaroidPhoto[] = [
  {
    id: 1,
    title: 'Kencan Pertama',
    caption: 'Masih canggung, pura-pura cool, padahal jantung berdegup kencang melihat senyummu.',
    date: 'Awal Perjalanan',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop',
    rotation: '-rotate-2'
  },
  {
    id: 2,
    title: 'Matahari Terbenam',
    caption: 'Senja hari itu sangat indah, tapi mataku tetap tak bisa beralih dari pesonamu.',
    date: 'Momen Hangat',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800&auto=format&fit=crop',
    rotation: 'rotate-3'
  },
  {
    id: 3,
    title: 'Hari Jadian: 22.08.25',
    caption: 'Hari paling bersejarah. Hari di mana duniaku resmi menjadi tempat paling bahagia.',
    date: '22 Agustus 2025',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop',
    rotation: '-rotate-1'
  },
  {
    id: 4,
    title: 'Kopi & Cerita Kita',
    caption: 'Dua cangkir kopi dan obrolan berjam-jam yang tak pernah terasa membosankan.',
    date: 'Minggu Sore',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop',
    rotation: 'rotate-2'
  },
  {
    id: 5,
    title: 'Tawa Lepas Fathiyyah',
    caption: 'Pemandangan favoritku di alam semesta: ketika kamu tertawa sampai matamu menyipit.',
    date: 'Setiap Hari',
    image: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=800&auto=format&fit=crop',
    rotation: '-rotate-3'
  },
  {
    id: 6,
    title: 'Menua Bersamamu',
    caption: 'Genggaman ini tidak akan pernah kulepaskan, hingga rambut kita memutih bersama.',
    date: 'Masa Depan',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    rotation: 'rotate-1'
  }
];

export const TIMELINE_MILESTONES: Milestone[] = [
  {
    id: 1,
    date: 'Mei 2025',
    title: 'Awal Kenal & Tatapan Pertama',
    subtitle: 'Ketika semesta menyapa',
    description: 'Semua berawal dari percakapan sederhana yang tak disengaja. Siapa sangka, sosok ramah itu kini menjadi seluruh duniaku.',
    iconName: 'sparkles',
    tag: 'Chapter 01'
  },
  {
    id: 2,
    date: 'Juli 2025',
    title: 'Kencan Pertama yang Berkesan',
    subtitle: 'Salah tingkah tapi bahagia',
    description: 'Hari pertama kita keluar berdua. Masih ingat aroma parfummu dan rasa gugup saat pertama kali menatap matamu langsung.',
    iconName: 'coffee',
    tag: 'Chapter 02'
  },
  {
    id: 3,
    date: '22 Agustus 2025',
    title: 'Hari Jadian: Kita Resmi Memulai!',
    subtitle: 'Dua hati, satu janji',
    description: 'PIN 220825 terukir selamanya. Malam di mana aku memberanikan diri menyatakan rasa, dan kamu tersenyum mengiyakan.',
    iconName: 'ring',
    tag: 'Anniversary'
  },
  {
    id: 4,
    date: 'Oktober 2025',
    title: 'Masa Paling Hangat',
    subtitle: 'Belajar memahami & menguatkan',
    description: 'Melewati hari-hari sibuk bersama. Saling mengirim pesan semangat, video call larut malam, dan saling ada dalam suka maupun duka.',
    iconName: 'heart',
    tag: 'Growing Love'
  },
  {
    id: 5,
    date: 'Hari Ini & Seterusnya',
    title: 'Selamanya Bersama Fathiyyah',
    subtitle: 'Cinta yang tak pernah usai',
    description: 'Perjalanan panjang menanti kita di depan. Aku berjanji akan terus menggenggam tanganmu melangkah sejauh apa pun.',
    iconName: 'stars',
    tag: 'Forever'
  }
];

export const LOVE_QUOTES: LoveQuote[] = [
  {
    id: 1,
    quote: 'Fathiyyah, kamu itu seperti lagu favoritku: tak pernah bosan kuputar berulang kali di kepalaku.',
    category: 'sweet',
    emoji: '🎶'
  },
  {
    id: 2,
    quote: 'Aku cinta caramu tersenyum saat kamu menatapku—seketika duniaku terasa begitu damai.',
    category: 'deep',
    emoji: '✨'
  },
  {
    id: 3,
    quote: 'Kalau mencintaimu adalah ujian, nilaiku pasti 100 karena aku belajar memahamimu setiap hari.',
    category: 'humorous',
    emoji: '📝'
  },
  {
    id: 4,
    quote: 'Terima kasih telah menjadi alasan terbaikku untuk selalu pulang dengan hati yang penuh.',
    category: 'deep',
    emoji: '🏡'
  },
  {
    id: 5,
    quote: 'Kamu tahu bedanya kamu sama bintang? Bintang ada di langit malam, kalau kamu selalu ada di hatiku.',
    category: 'sweet',
    emoji: '⭐'
  },
  {
    id: 6,
    quote: 'Jangan pernah ragu ya, perasaanku padamu sedalam samudra dan seteguh gunung karang.',
    category: 'promise',
    emoji: '🌊'
  },
  {
    id: 7,
    quote: 'Pipimu yang merona saat digoda adalah pemandangan paling estetik yang pernah kulihat.',
    category: 'sweet',
    emoji: '🌸'
  },
  {
    id: 8,
    quote: 'Di antara 8 milyar manusia di bumi, bersyukur sekali semesta menuntunku untuk menemukanmu.',
    category: 'deep',
    emoji: '🌍'
  },
  {
    id: 9,
    quote: 'Kopi sepahit apa pun jadi manis kalau diminum sambil ngobrol sama kamu, Fathiyyah.',
    category: 'humorous',
    emoji: '☕'
  },
  {
    id: 10,
    quote: 'Aku berjanji akan selalu ada di barisan terdepan untuk menghiburmu saat kamu sedang sedih.',
    category: 'promise',
    emoji: '🛡️'
  },
  {
    id: 11,
    quote: 'Setiap detik bersamamu adalah berkah yang tak henti-hentinya kusyukuri.',
    category: 'deep',
    emoji: '🤍'
  },
  {
    id: 12,
    quote: 'Bahkan ketika kamu lagi ngambek sekalipun, kamu tetap orang paling lucu sedunia.',
    category: 'humorous',
    emoji: '🥺'
  },
  {
    id: 13,
    quote: 'Semoga bahagiamu selalu mekar, dan semoga aku yang selalu menjadi alasannya.',
    category: 'promise',
    emoji: '🌷'
  },
  {
    id: 14,
    quote: 'Monokrom bersamamu justru penuh warna cinta yang tak ternilai harganya.',
    category: 'sweet',
    emoji: '🎨'
  },
  {
    id: 15,
    quote: 'Aku mencintaimu bukan karena siapa dirimu, tapi karena siapa diriku saat bersamamu.',
    category: 'deep',
    emoji: '💫'
  }
];
