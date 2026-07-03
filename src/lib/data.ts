export type MoodId =
  | "happy"
  | "calm"
  | "sad"
  | "tired"
  | "angry"
  | "emotional"
  | "anxious"
  | "stressed"
  | "energetic"
  | "overwhelmed"

export interface Mood {
  id: MoodId
  label: string
  emoji: string
  color: string
  ring: string
}

export const MOODS: Mood[] = [
  { id: "happy", label: "Happy", emoji: "😊", color: "bg-amber-100 text-amber-700", ring: "ring-amber-300" },
  { id: "calm", label: "Calm", emoji: "🌿", color: "bg-emerald-100 text-emerald-700", ring: "ring-emerald-300" },
  { id: "sad", label: "Sad", emoji: "😔", color: "bg-sky-100 text-sky-700", ring: "ring-sky-300" },
  { id: "tired", label: "Tired", emoji: "😴", color: "bg-indigo-100 text-indigo-700", ring: "ring-indigo-300" },
  { id: "angry", label: "Angry", emoji: "😤", color: "bg-rose-100 text-rose-700", ring: "ring-rose-300" },
  { id: "emotional", label: "Emotional", emoji: "🌧️", color: "bg-violet-100 text-violet-700", ring: "ring-violet-300" },
  { id: "anxious", label: "Anxious", emoji: "😟", color: "bg-orange-100 text-orange-700", ring: "ring-orange-300" },
  { id: "stressed", label: "Stressed", emoji: "😵", color: "bg-red-100 text-red-700", ring: "ring-red-300" },
  { id: "energetic", label: "Energetic", emoji: "⚡", color: "bg-yellow-100 text-yellow-700", ring: "ring-yellow-300" },
  { id: "overwhelmed", label: "Overwhelmed", emoji: "💭", color: "bg-purple-100 text-purple-700", ring: "ring-purple-300" },
]

export function getMood(id: MoodId | null): Mood | undefined {
  return MOODS.find((m) => m.id === id)
}

interface MoodGuidance {
  message: string
  foods: { name: string; note: string; emoji: string }[]
  wellness: string[]
  affirmation: string
}

export const MOOD_GUIDANCE: Record<MoodId, MoodGuidance> = {
  happy: {
    message: "Love that you're feeling bright today. Let's keep that warmth going.",
    foods: [
      { name: "Fresh fruit bowl", note: "Berries and citrus to match your sunny energy.", emoji: "🍓" },
      { name: "Greek yogurt parfait", note: "Protein to keep you steady through the day.", emoji: "🥣" },
      { name: "Dark chocolate square", note: "A small treat to celebrate the good mood.", emoji: "🍫" },
    ],
    wellness: ["Share a kind message with someone", "Take a short gratitude walk", "Note 3 things that went well today"],
    affirmation: "I deserve this joy, and I let it grow.",
  },

  calm: {
    message: "A calm mind is a gift. Let's gently protect this peaceful space.",
    foods: [
      { name: "Herbal tea", note: "Chamomile or peppermint to stay grounded.", emoji: "🍵" },
      { name: "Oatmeal with honey", note: "Warm, soft, and soothing.", emoji: "🥣" },
      { name: "Avocado toast", note: "Healthy fats to keep you balanced.", emoji: "🥑" },
    ],
    wellness: ["Try 5 minutes of slow breathing", "Stretch your neck and shoulders", "Read a few pages of something gentle"],
    affirmation: "I am exactly where I need to be right now.",
  },

  sad: {
    message: "It's okay to feel low. Be soft with yourself today, you're doing your best.",
    foods: [
      { name: "Warm soup", note: "Comforting and easy on the heart.", emoji: "🍲" },
      { name: "Banana with peanut butter", note: "A cozy, mood-supporting snack.", emoji: "🍌" },
      { name: "Warm milk or cocoa", note: "Something soothing to hold.", emoji: "☕" },
    ],
    wellness: ["Wrap up in a soft blanket", "Let yourself rest without guilt", "Reach out to someone you trust"],
    affirmation: "This feeling is valid, and it will gently pass.",
  },

  tired: {
    message: "Your body is asking for care. Let's make rest feel easy.",
    foods: [
      { name: "Handful of almonds", note: "Steady energy without the crash.", emoji: "🌰" },
      { name: "Banana", note: "Natural, gentle pick-me-up.", emoji: "🍌" },
      { name: "Plenty of water", note: "Tiredness often hides as thirst.", emoji: "💧" },
    ],
    wellness: ["Take a 10-minute screen-free break", "Rest your eyes for a moment", "Plan an earlier, kinder bedtime"],
    affirmation: "Rest is productive, and I am allowed to slow down.",
  },

  angry: {
    message: "Your feelings make sense. Let's give that energy a safe place to land.",
    foods: [
      { name: "Crunchy veggies & hummus", note: "Satisfying crunch to release tension.", emoji: "🥕" },
      { name: "Cool water with lemon", note: "Refreshing and steadying.", emoji: "🍋" },
      { name: "A few walnuts", note: "Grounding healthy fats.", emoji: "🌰" },
    ],
    wellness: ["Try a long exhale, slower than the inhale", "Step outside for fresh air", "Write down what's bothering you"],
    affirmation: "I can feel this fully and still choose calm.",
  },

  emotional: {
    message: "Big feelings are welcome here. There's nothing wrong with you.",
    foods: [
      { name: "Warm oatmeal", note: "Soft and comforting.", emoji: "🥣" },
      { name: "Berries", note: "A little sweetness and antioxidants.", emoji: "🫐" },
      { name: "Herbal tea", note: "Something warm to hold.", emoji: "🍵" },
    ],
    wellness: ["Let the tears come if they need to", "Hold something soft or warm", "Speak to yourself like a dear friend"],
    affirmation: "My emotions are messengers, not problems.",
  },

  anxious: {
    message: "Let's slow everything down together, one small breath at a time.",
    foods: [
      { name: "Magnesium-rich spinach", note: "Add to a smoothie or warm dish.", emoji: "🥬" },
      { name: "Pumpkin seeds", note: "A calming, crunchy snack.", emoji: "🎃" },
      { name: "Chamomile tea", note: "Gently soothing.", emoji: "🍵" },
    ],
    wellness: ["Try the 5-4-3-2-1 grounding exercise", "Place a hand on your chest and breathe", "Limit caffeine for now"],
    affirmation: "I am safe in this moment. I can take it slowly.",
  },

  stressed: {
    message: "You're carrying a lot. Let's lighten the load even a little.",
    foods: [
      { name: "Oranges", note: "Vitamin C to support a stressed body.", emoji: "🍊" },
      { name: "Whole-grain toast", note: "Steady energy to keep you going.", emoji: "🍞" },
      { name: "Green tea", note: "Calm focus without the jitters.", emoji: "🍵" },
    ],
    wellness: ["Pick just one small task to finish", "Take a 3-minute breathing pause", "Step away from your screen"],
    affirmation: "I don't have to do everything at once.",
  },

  energetic: {
    message: "What lovely momentum. Let's channel it into something that feels good.",
    foods: [
      { name: "Smoothie bowl", note: "Fuel that matches your energy.", emoji: "🥤" },
      { name: "Trail mix", note: "Portable, balanced energy.", emoji: "🥜" },
      { name: "Fresh water", note: "Stay hydrated while you move.", emoji: "💧" },
    ],
    wellness: ["Tackle something you've been putting off", "Dance to a favorite song", "Tidy a small space"],
    affirmation: "My energy is mine to use with intention.",
  },

  overwhelmed: {
    message: "When everything feels like too much, we only need the next small step.",
    foods: [
      { name: "Warm soup", note: "Simple and nourishing.", emoji: "🍲" },
      { name: "Banana", note: "Quick, easy, no effort needed.", emoji: "🍌" },
      { name: "Water", note: "Start with one glass.", emoji: "💧" },
    ],
    wellness: ["Write down everything, then circle one thing", "Take three slow breaths", "Give yourself permission to pause"],
    affirmation: "I only need to handle this one moment.",
  },
}

export interface WellnessActivity {
  name: string
  emoji: string

  image: string
  animation?: string

  problems: string[]

  type:
    | "Yoga"
    | "Stretch"
    | "Breathing"
    | "Posture"
    | "Relax"

  duration?: number
  sets?: string

  benefits: string[]

  steps: string[]
}

export const WELLNESS_ACTIVITIES: WellnessActivity[] = [
  {
    name: "Child's Pose",
    emoji: "🧘‍♀️",

    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a",

    animation:
      "https://media.giphy.com/media/l3vR85PnGsBwu1PFK/giphy.gif",

    type: "Yoga",

    problems: [
      "Back Pain",
      "Stress",
      "Anxiety",
      "Period Pain",
      "Leg Pain",
      "Body Pain",
      "Mental Exhaustion",
    ],

    duration: 60,

    benefits: [
      "Relaxes lower back",
      "Calms the nervous system",
      "Softens hip tension",
      "Helps emotional relaxation",
    ],

    steps: [
      "Kneel on the floor",
      "Sit back on your heels",
      "Fold forward slowly",
      "Stretch your arms ahead",
      "Breathe deeply and relax",
    ],
  },

  {
    name: "Padmasana",
    emoji: "🪷",

    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773",

    animation:
      "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",

    type: "Yoga",

    problems: [
      "Stress",
      "Anxiety",
      "Overthinking",
      "Body Pain",
      "Back Pain",
      "Not Feeling Calm",
    ],

    duration: 120,

    benefits: [
      "Improves posture",
      "Calms the mind",
      "Enhances breathing",
      "Improves concentration",
    ],

    steps: [
      "Sit on the floor",
      "Cross your legs gently",
      "Place feet on opposite thighs",
      "Rest your hands on knees",
      "Close your eyes and breathe slowly",
    ],
  },

  {
    name: "Butterfly Pose",
    emoji: "🦋",

    image:
      "https://images.unsplash.com/photo-1506629905607-d9d2e6e9a4d3",

    animation:
      "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",

    type: "Yoga",

    problems: [
      "Period Pain",
      "Hip Tightness",
      "Leg Pain",
      "Waist Pain",
      "Body Pain",
    ],

    duration: 90,

    benefits: [
      "Relaxes hips",
      "Comforts menstrual cramps",
      "Improves flexibility",
      "Releases lower body tension",
    ],

    steps: [
      "Sit comfortably",
      "Bring soles together",
      "Hold feet gently",
      "Move knees softly up and down",
      "Keep breathing calmly",
    ],
  },

  {
    name: "Legs Up The Wall",
    emoji: "🌸",

    image:
      "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539",

    animation:
      "https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif",

    type: "Relax",

    problems: [
      "Leg Pain",
      "Tiredness",
      "Period Pain",
      "Stress",
      "Body Pain",
      "Low Energy",
    ],

    duration: 180,

    benefits: [
      "Improves blood circulation",
      "Relaxes tired legs",
      "Calms the body",
      "Reduces swelling",
    ],

    steps: [
      "Lie beside a wall",
      "Raise legs upward",
      "Rest your arms beside the body",
      "Relax your shoulders",
      "Breathe slowly",
    ],
  },

  {
    name: "Cat Cow Stretch",
    emoji: "🐈",

    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",

    animation:
      "https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif",

    type: "Stretch",

    problems: [
      "Back Pain",
      "Waist Pain",
      "Posture Issues",
      "Body Pain",
      "Period Pain",
    ],

    sets: "3 sets × 30 sec",

    benefits: [
      "Improves spine flexibility",
      "Relieves lower back pressure",
      "Improves posture",
      "Releases body stiffness",
    ],

    steps: [
      "Come onto hands and knees",
      "Arch your back slowly",
      "Drop your belly gently",
      "Lift your chest softly",
      "Move with slow breathing",
    ],
  },

  {
    name: "Neck Release Stretch",
    emoji: "💆‍♀️",

    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",

    animation:
      "https://media.giphy.com/media/3o6fJ5LANL0x31R1Ic/giphy.gif",

    type: "Stretch",

    problems: [
      "Neck Pain",
      "Shoulder Pain",
      "Headache",
      "Stress",
      "Screen Fatigue",
      "Eye Strain",
    ],

    duration: 45,

    benefits: [
      "Releases neck stiffness",
      "Reduces tension headaches",
      "Relaxes shoulders",
      "Improves blood flow",
    ],

    steps: [
      "Sit comfortably",
      "Tilt head slowly to one side",
      "Hold gently",
      "Switch sides softly",
      "Relax shoulders while breathing",
    ],
  },

  {
    name: "Wrist Relax Stretch",
    emoji: "✋",

    image:
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2",

    animation:
      "https://media.giphy.com/media/l0MYAs5E2oIDCq9So/giphy.gif",

    type: "Stretch",

    problems: [
      "Wrist Pain",
      "Hand Pain",
      "Typing Fatigue",
      "Body Pain",
    ],

    sets: "2 sets × 20 reps",

    benefits: [
      "Relieves wrist stiffness",
      "Improves flexibility",
      "Supports laptop users",
      "Relaxes hand muscles",
    ],

    steps: [
      "Extend one arm forward",
      "Pull fingers gently backward",
      "Rotate wrists slowly",
      "Repeat on both sides",
    ],
  },

  {
    name: "Eye Relaxation",
    emoji: "👀",

    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",

    animation:
      "https://media.giphy.com/media/3orieYJ5E6MBrv0YSI/giphy.gif",

    type: "Relax",

    problems: [
      "Eye Strain",
      "Headache",
      "Screen Fatigue",
      "Mental Exhaustion",
    ],

    duration: 60,

    benefits: [
      "Relaxes eye muscles",
      "Reduces digital fatigue",
      "Soothes headaches",
      "Improves focus",
    ],

    steps: [
      "Close your eyes gently",
      "Rub palms together",
      "Place warm palms over eyes",
      "Relax and breathe slowly",
    ],
  },

  {
    name: "Deep Belly Breathing",
    emoji: "🌬️",

    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773",

    animation:
      "https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif",

    type: "Breathing",

    problems: [
      "Anxiety",
      "Stress",
      "Chest Tightness",
      "Overthinking",
      "Not Feeling Calm",
    ],

    duration: 120,

    benefits: [
      "Slows heart rate",
      "Calms nervous system",
      "Improves oxygen flow",
      "Reduces panic feelings",
    ],

    steps: [
      "Sit comfortably",
      "Place one hand on stomach",
      "Inhale deeply through nose",
      "Expand your belly softly",
      "Exhale slowly through mouth",
    ],
  },

  {
    name: "Alternate Nostril Breathing",
    emoji: "🌿",

    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773",

    animation:
      "https://media.giphy.com/media/l41lFw057lAJQMwg0/giphy.gif",

    type: "Breathing",

    problems: [
      "Stress",
      "Anxiety",
      "Mental Exhaustion",
      "Overthinking",
    ],

    duration: 180,

    benefits: [
      "Balances breathing",
      "Improves mental clarity",
      "Relaxes the mind",
      "Supports emotional calm",
    ],

    steps: [
      "Sit comfortably",
      "Close right nostril gently",
      "Inhale through left nostril",
      "Switch sides slowly",
      "Repeat calmly",
    ],
  },

  {
    name: "Cobra Pose",
    emoji: "🐍",

    image:
      "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7",

    animation:
      "https://media.giphy.com/media/26gsspfbt1HfVQ9va/giphy.gif",

    type: "Yoga",

    problems: [
      "Back Pain",
      "Waist Pain",
      "Posture Issues",
      "Body Pain",
    ],

    duration: 45,

    benefits: [
      "Strengthens spine",
      "Opens chest",
      "Improves posture",
      "Relieves lower back tightness",
    ],

    steps: [
      "Lie on your stomach",
      "Place palms beside chest",
      "Lift upper body slowly",
      "Keep shoulders relaxed",
      "Hold softly and breathe",
    ],
  },
]

export const AFFIRMATIONS = [
  "I am allowed to take up space and rest.",
  "My worth is not measured by my productivity.",
  "I am growing, even on the slow days.",
  "I treat myself with the kindness I give others.",
  "This feeling is temporary, and I am safe.",
  "I am proud of how far I've come.",
  "I choose peace over perfection.",
  "My body deserves care and gratitude.",
  "I can do hard things gently.",
  "I am enough, exactly as I am today.",
]

export const QUOTES = [
  {
    text: "Almost everything will work again if you unplug it for a few minutes, including you.",
    author: "Anne Lamott",
  },

  {
    text: "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman",
  },

  {
    text: "Rest is not idleness. It is the foundation of a calm mind.",
    author: "Unknown",
  },

  {
    text: "Be gentle with yourself, you're doing the best you can.",
    author: "Unknown",
  },

  {
    text: "Self-care is how you take your power back.",
    author: "Lalah Delia",
  },
]