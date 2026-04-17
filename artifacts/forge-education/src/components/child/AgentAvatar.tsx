import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { useMemo } from 'react';

export const PRESENTATION_STYLES = [
  { id: 'long', label: 'Long Hair', tops: ['straight01', 'straight02', 'straightAndStrand', 'bigHair', 'bob', 'curvy', 'miaWallace', 'longButNotTooLong'] },
  { id: 'curly-natural', label: 'Curly & Natural', tops: ['curly', 'fro', 'froBand', 'dreads', 'frida', 'shaggy', 'shaggyMullet'] },
  { id: 'up', label: 'Up & Tied', tops: ['bun', 'straight02', 'froBand'] },
  { id: 'short', label: 'Short Hair', tops: ['shortFlat', 'shortCurly', 'shortRound', 'shortWaved', 'sides', 'shavedSides'] },
  { id: 'styled', label: 'Styled & Fade', tops: ['theCaesar', 'theCaesarAndSidePart', 'frizzle', 'dreads01', 'dreads02'] },
  { id: 'hat', label: 'Hat / Cover', tops: ['hat', 'winterHat1', 'winterHat02', 'winterHat03', 'winterHat04', 'hijab', 'turban'] },
];

export const SKIN_TONES = [
  { id: 'ffdbb4', label: 'Light', value: '#ffdbb4' },
  { id: 'edb98a', label: 'Light Medium', value: '#edb98a' },
  { id: 'fd9841', label: 'Warm', value: '#fd9841' },
  { id: 'd08b5b', label: 'Medium', value: '#d08b5b' },
  { id: 'ae5d29', label: 'Medium Dark', value: '#ae5d29' },
  { id: '614335', label: 'Dark', value: '#614335' },
];

export const HAIR_COLORS = [
  { id: '2c1b18', label: 'Black', value: '#2c1b18' },
  { id: '4a312c', label: 'Dark Brown', value: '#4a312c' },
  { id: '724133', label: 'Brown', value: '#724133' },
  { id: 'a55728', label: 'Auburn', value: '#a55728' },
  { id: 'b58143', label: 'Blonde', value: '#b58143' },
  { id: 'd6b370', label: 'Light Blonde', value: '#d6b370' },
  { id: 'ecdcbf', label: 'Platinum', value: '#ecdcbf' },
  { id: 'c93305', label: 'Red', value: '#c93305' },
  { id: 'e8e1e1', label: 'Silver', value: '#e8e1e1' },
  { id: 'f59797', label: 'Pink', value: '#f59797' },
  { id: '7b2d8b', label: 'Purple', value: '#7b2d8b' },
  { id: '1d5fa4', label: 'Blue', value: '#1d5fa4' },
];

export const EYE_STYLES = [
  { id: 'default', label: 'Default' },
  { id: 'happy', label: 'Happy' },
  { id: 'hearts', label: 'Hearts' },
  { id: 'side', label: 'Side' },
  { id: 'squint', label: 'Squint' },
  { id: 'surprised', label: 'Surprised' },
  { id: 'wink', label: 'Wink' },
  { id: 'winkWacky', label: 'Wacky Wink' },
  { id: 'closed', label: 'Closed' },
  { id: 'cry', label: 'Cry' },
  { id: 'eyeRoll', label: 'Eye Roll' },
  { id: 'xDizzy', label: 'Dizzy' },
];

export const EYEBROW_STYLES = [
  { id: 'default', label: 'Default' },
  { id: 'defaultNatural', label: 'Natural' },
  { id: 'flatNatural', label: 'Flat' },
  { id: 'raisedExcited', label: 'Raised' },
  { id: 'raisedExcitedNatural', label: 'Raised Natural' },
  { id: 'sadConcerned', label: 'Sad' },
  { id: 'sadConcernedNatural', label: 'Sad Natural' },
  { id: 'unibrowNatural', label: 'Unibrow' },
  { id: 'upDown', label: 'Skeptical' },
  { id: 'upDownNatural', label: 'Skeptical Natural' },
  { id: 'angry', label: 'Angry' },
  { id: 'angryNatural', label: 'Angry Natural' },
  { id: 'frownNatural', label: 'Frown' },
];

export const MOUTH_STYLES = [
  { id: 'smile', label: 'Smile' },
  { id: 'default', label: 'Neutral' },
  { id: 'twinkle', label: 'Twinkle' },
  { id: 'tongue', label: 'Playful' },
  { id: 'eating', label: 'Eating' },
  { id: 'screamOpen', label: 'Wow' },
  { id: 'serious', label: 'Serious' },
  { id: 'sad', label: 'Sad' },
  { id: 'disbelief', label: 'Hmm' },
  { id: 'concerned', label: 'Worried' },
  { id: 'grimace', label: 'Grimace' },
];

export const CLOTHING_TYPES = [
  { id: 'shirtCrewNeck', label: 'Crew Neck' },
  { id: 'shirtScoopNeck', label: 'Scoop Neck' },
  { id: 'shirtVNeck', label: 'V-Neck' },
  { id: 'hoodie', label: 'Hoodie' },
  { id: 'blazerAndShirt', label: 'Blazer & Shirt' },
  { id: 'blazerAndSweater', label: 'Blazer & Sweater' },
  { id: 'collarAndSweater', label: 'Sweater' },
  { id: 'graphicShirt', label: 'Graphic Tee' },
  { id: 'overall', label: 'Overall' },
];

export const CLOTHING_COLORS = [
  { id: '262e33', label: 'Black', value: '#262e33' },
  { id: '65c9ff', label: 'Blue', value: '#65c9ff' },
  { id: '5199e4', label: 'Royal Blue', value: '#5199e4' },
  { id: '25557c', label: 'Navy', value: '#25557c' },
  { id: 'e6e6e6', label: 'Light Gray', value: '#e6e6e6' },
  { id: '929598', label: 'Gray', value: '#929598' },
  { id: '3c4f5c', label: 'Slate', value: '#3c4f5c' },
  { id: 'b1e2ff', label: 'Baby Blue', value: '#b1e2ff' },
  { id: 'a7ffc4', label: 'Mint', value: '#a7ffc4' },
  { id: 'ffafb9', label: 'Pink', value: '#ffafb9' },
  { id: 'ffffb1', label: 'Yellow', value: '#ffffb1' },
  { id: 'ff488e', label: 'Hot Pink', value: '#ff488e' },
  { id: 'ff5c5c', label: 'Red', value: '#ff5c5c' },
  { id: 'ffffff', label: 'White', value: '#ffffff' },
];

export const ACCESSORY_OPTIONS = [
  { id: 'none', label: 'None' },
  { id: 'kurt', label: 'Round Glasses' },
  { id: 'prescription01', label: 'Glasses 1' },
  { id: 'prescription02', label: 'Glasses 2' },
  { id: 'round', label: 'Hipster' },
  { id: 'sunglasses', label: 'Sunglasses' },
  { id: 'wayfarers', label: 'Wayfarers' },
  { id: 'eyepatch', label: 'Eyepatch' },
];

export const FACIAL_HAIR_OPTIONS = [
  { id: 'none', label: 'None' },
  { id: 'beardLight', label: 'Light Beard' },
  { id: 'beardMedium', label: 'Medium Beard' },
  { id: 'beardMajestic', label: 'Full Beard' },
  { id: 'moustacheFancy', label: 'Moustache' },
  { id: 'moustacheMagnum', label: 'Magnum' },
];

export const DEFAULT_AVATAR = {
  skinColor: 'ffdbb4',
  hairColor: '4a312c',
  presentationStyle: 'long',
  topVariant: 0,
  eyeStyle: 'default',
  eyebrowStyle: 'defaultNatural',
  mouthStyle: 'smile',
  clothing: 'shirtCrewNeck',
  clothesColor: '65c9ff',
  accessory: 'none',
  facialHair: 'none',
  facialHairColor: '4a312c',
};

function resolveTop(config: any): string {
  const styleGroup = PRESENTATION_STYLES.find(
    s => s.id === (config.presentationStyle || 'long')
  );
  const tops = styleGroup?.tops || ['straight01'];
  const topIndex = Math.min(config.topVariant || 0, tops.length - 1);
  return tops[Math.max(0, topIndex)];
}

export function AgentAvatar({ config = DEFAULT_AVATAR, size = 120 }: { config?: any; size?: number; stage?: number }) {
  const svgString = useMemo(() => {
    const merged = { ...DEFAULT_AVATAR, ...config };
    const resolvedTop = resolveTop(merged);
    const hasAccessory = merged.accessory && merged.accessory !== 'none';
    const hasFacialHair = merged.facialHair && merged.facialHair !== 'none';

    const avatar = createAvatar(avataaars, {
      seed: 'forge-avatar',
      skinColor: [merged.skinColor],
      hairColor: [merged.hairColor],
      top: [resolvedTop] as any,
      eyes: [merged.eyeStyle] as any,
      eyebrows: [merged.eyebrowStyle] as any,
      mouth: [merged.mouthStyle] as any,
      clothing: [merged.clothing] as any,
      clothesColor: [merged.clothesColor],
      accessories: hasAccessory ? [merged.accessory] as any : [] as any,
      accessoriesColor: ['262e33'],
      accessoriesProbability: hasAccessory ? 100 : 0,
      facialHair: hasFacialHair ? [merged.facialHair] as any : [] as any,
      facialHairColor: [merged.facialHairColor || merged.hairColor],
      facialHairProbability: hasFacialHair ? 100 : 0,
      nose: ['default'] as any,
      backgroundColor: ['1a1a1a'],
    });
    return avatar.toString();
  }, [
    config.skinColor, config.hairColor, config.presentationStyle, config.topVariant,
    config.eyeStyle, config.eyebrowStyle, config.mouthStyle,
    config.clothing, config.clothesColor,
    config.accessory, config.facialHair, config.facialHairColor
  ]);

  return (
    <div
      style={{ width: size, height: size, display: 'block', borderRadius: '50%', overflow: 'hidden' }}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
}
