/**
 * SSR stub for lucide-react.
 * Used only during `vite build --ssr` (prerender step).
 * All icons render as null during static markup generation.
 *
 * Keep this in sync with every lucide import across src/.
 * To find all used icons: grep -rh "lucide-react" src/ | grep "^import" | grep -o '{[^}]*}' | tr ',' '\n' | tr -d ' {}' | sort -u
 */

function NullIcon() { return null }

export const Activity = NullIcon
export const AlertTriangle = NullIcon
export const ArrowRight = NullIcon
export const BookOpen = NullIcon
export const Calendar = NullIcon
export const Check = NullIcon
export const CheckCircle = NullIcon
export const ChevronRight = NullIcon
export const Clock = NullIcon
export const Cookie = NullIcon
export const FileText = NullIcon
export const Globe = NullIcon
export const Heart = NullIcon
export const Info = NullIcon
export const Mail = NullIcon
export const Menu = NullIcon
export const Pill = NullIcon
export const Send = NullIcon
export const Shield = NullIcon
export const Sparkles = NullIcon
export const Users = NullIcon
export const X = NullIcon
export const Zap = NullIcon

export default NullIcon
