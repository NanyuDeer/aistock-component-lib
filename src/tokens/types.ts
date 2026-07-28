/**
 * Design Token 类型定义
 *
 * 对应 src/tokens/tokens.json 的结构。
 * generate-tokens.ts 读取 tokens.json 时使用此类型进行校验。
 */
export interface Tokens {
  version: string
  description: string
  color: {
    primary: string
    primaryDeep: string
    primaryLight: string
    primaryScale: Record<string, string>
    accent: string
    accentLight: string
    accentDeep: string
    accentScale: Record<string, string>
    gold: string
    goldLight: string
    goldDeep: string
    background: { page: string; card: string; soft: string; deep: string }
    ink: { default: string; soft: string; mute: string; faint: string }
    line: { default: string; soft: string; strong: string }
    semantic: {
      up: string; upDeep: string; upLight: string
      down: string; downDeep: string; downLight: string
      flat: string; warning: string; warningLight: string
    }
    pure: { white: string; black: string }
    overlay: { base: string; light: string; deep: string }
  }
  radius: Record<string, string>
  spacing: Record<string, string>
  fontSize: Record<string, string>
  lineHeight: { tight: string; base: string; loose: string }
  fontFamily: { sans: string; mono: string; display: string }
  letterSpacing: { tight: string; normal: string; wide: string; wider: string }
  shadow: Record<string, string>
  activeBackground: { primary: string }
  zIndex: Record<string, string>
  grid: { cols: string; gutter: string; margin: string }
  breakpoint: Record<string, string>
  transition: {
    easeOut: string; easeSpring: string
    fast: string; base: string; slow: string; spring: string
  }
  opacity: { disabled: string; active: string; hover: string; readonly: string }
  focusRing: { default: string; error: string; warn: string }
}
