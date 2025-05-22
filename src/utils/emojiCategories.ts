import { EmojiCategory } from '../types/gameTypes';

export const emojiCategories: EmojiCategory[] = [
  {
    name: 'Animals',
    emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨'],
    icon: '🐾'
  },
  {
    name: 'Food',
    emojis: ['🍕', '🍔', '🍟', '🌭', '🍿', '🧁', '🍩', '🍦', '🍓'],
    icon: '🍽️'
  },
  {
    name: 'Sports',
    emojis: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓'],
    icon: '🏆'
  },
  {
    name: 'Nature',
    emojis: ['🌸', '🌹', '🌺', '🌻', '🌴', '🌵', '🍄', '🌍', '⭐'],
    icon: '🌿'
  },
  {
    name: 'Travel',
    emojis: ['✈️', '🚗', '🚂', '🚢', '🚁', '🏖️', '🗽', '🗿', '🏰'],
    icon: '🧳'
  },
  {
    name: 'Faces',
    emojis: ['😀', '😎', '🤔', '😍', '🥳', '😴', '🤯', '😇', '🥺'],
    icon: '😊'
  }
];

export const getRandomEmoji = (category: EmojiCategory): string => {
  const randomIndex = Math.floor(Math.random() * category.emojis.length);
  return category.emojis[randomIndex];
};