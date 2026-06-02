/**
 * PencilFilters — global SVG filter defs that give all BotanicalSVG
 * illustrations a soft hand-sketched, pencil-on-paper quality.
 *
 * Mount once at the app root. Referenced via `filter: url(#pencil-sketch)`.
 */
export const PencilFilters = () => (
  <svg
    aria-hidden
    width="0"
    height="0"
    style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
  >
    <defs>
      {/* Soft pencil — gentle wobble + slight roughness */}
      <filter id="pencil-sketch" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="G" result="rough" />
        <feGaussianBlur in="rough" stdDeviation="0.25" />
      </filter>

      {/* Stronger sketch — more visible scratch */}
      <filter id="pencil-sketch-strong" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="7" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);
