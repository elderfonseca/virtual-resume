/**
 * Type definitions for the entire application
 */
import { TweenParamValue } from 'animejs';

// Navigation items used in header and mobile menu
export interface NavigationItem {
  id: string;
  translationKey: string;
}

// Skill data structure
export interface Skill {
  name: string;
  level: number;
}

// Skill categories
export interface SkillsData {
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
  other: Skill[];
}

// Project data structure
export interface Project {
  id: string;
  translationKey: string;
  image: string;
}

// Social link data structure
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

// Contact information structure
export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

// Language data structure
export interface Language {
  code: string;
  name: string;
}

// Contact form data structure
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Contact form validation result
export interface ValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
}

// Button props types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type IconPosition = 'left' | 'right';

// Button configuration for projects
export interface ButtonConfig {
  label: string;
  href: string;
  variant?: ButtonVariant;
  isExternal?: boolean;
}

// Timeline item icon types
export type TimelineIconType = 'company' | 'code' | 'database' | 'default';
export type TimelineAlignment = 'left' | 'right';

// Globe options
export interface GlobeOptions {
  size?: number;
  mainColor?: string;
  secondaryColor?: string;
  lineColor?: string;
  lineOpacity?: number;
  rotationSpeed?: number;
  tilt?: number;
}

// Animation extension types
// Instead of extending AnimationParams directly, we create a more flexible type
/**
 * Custom animation options that include all anime.js parameters plus our extensions
 * This approach avoids the restrictive index signature of AnimationParams
 */
export interface ScrollAnimationOptions {
  // Core animation properties
  opacity?: number | [number, number] | number[];
  translateX?: number | [number, number] | string | [string, string];
  translateY?: number | [number, number] | string | [string, string];
  translateZ?: number | [number, number] | string | [string, string];
  rotate?: number | [number, number] | string | [string, string];
  rotateX?: number | [number, number] | string | [string, string];
  rotateY?: number | [number, number] | string | [string, string];
  rotateZ?: number | [number, number] | string | [string, string];
  scale?: number | [number, number];
  scaleX?: number | [number, number];
  scaleY?: number | [number, number];
  scaleZ?: number | [number, number];

  // Timing properties
  duration?: number;
  delay?: TweenParamValue;
  endDelay?: number;

  // Easing
  easing?: string;

  // Loop and direction
  loop?: boolean | number;
  direction?: 'normal' | 'reverse' | 'alternate';
  alternate?: boolean;

  // Playback
  autoplay?: boolean;
  reversed?: boolean;

  // SVG-specific
  draw?: [string, string] | [string, string, string];

  // Custom scroll-related properties
  threshold?: number;
  once?: boolean;
  targets?: string;

  // Allow any other property to maintain flexibility
  [key: string]: any;
}
