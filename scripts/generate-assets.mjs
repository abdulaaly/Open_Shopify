import fs from 'fs';
import path from 'path';

const productSvgs = {
  'heavyweight-tee.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bgTee" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
    <linearGradient id="fabricTee" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="60%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <filter id="shadowTee" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>
  <rect width="800" height="800" rx="32" fill="url(#bgTee)"/>
  
  <!-- Studio lighting accent -->
  <circle cx="400" cy="360" r="320" fill="#38bdf8" opacity="0.04" filter="blur(60px)"/>

  <!-- T-shirt silhouette -->
  <g filter="url(#shadowTee)">
    <!-- Main Body and Sleeves -->
    <path d="M 285 230 
             L 210 280 
             L 150 375 
             L 215 415 
             L 260 365 
             L 260 620 
             Q 400 640 540 620 
             L 540 365 
             L 585 415 
             L 650 375 
             L 590 280 
             L 515 230 
             Q 400 270 285 230 Z" 
          fill="url(#fabricTee)"/>
    
    <!-- Ribbed Collar -->
    <path d="M 330 220 
             Q 400 280 470 220 
             Q 400 250 330 220 Z" 
          fill="#1e293b" stroke="#64748b" stroke-width="2"/>
    
    <!-- Subtle folds and stitch lines -->
    <path d="M 285 230 L 260 365" stroke="#1e293b" stroke-width="3" opacity="0.7"/>
    <path d="M 515 230 L 540 365" stroke="#1e293b" stroke-width="3" opacity="0.7"/>
    <path d="M 380 320 Q 400 480 370 600" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.4"/>
    <path d="M 420 340 Q 405 490 435 600" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.3"/>
    
    <!-- Woven Brand Tag at Hem -->
    <rect x="525" y="580" width="22" height="16" rx="2" fill="#10b981"/>
    <text x="536" y="592" font-family="system-ui, sans-serif" font-size="7" font-weight="900" fill="#000" text-anchor="middle">APX</text>
  </g>
  
  <!-- Product Label Badge -->
  <g transform="translate(48, 710)">
    <rect width="210" height="42" rx="21" fill="#18181b" stroke="#27272a" stroke-width="1"/>
    <circle cx="21" cy="21" r="5" fill="#10b981"/>
    <text x="36" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#f8fafc">HEAVYWEIGHT BOXY TEE</text>
  </g>
  <text x="752" y="736" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#10b981" text-anchor="end">$58.00 USD</text>
</svg>`,

  'architect-overshirt.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bgJacket" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
    <linearGradient id="fabricJacket" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2d3748"/>
      <stop offset="50%" stop-color="#1a202c"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
    <filter id="shadowJacket" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>
  <rect width="800" height="800" rx="32" fill="url(#bgJacket)"/>
  
  <circle cx="400" cy="380" r="320" fill="#10b981" opacity="0.04" filter="blur(60px)"/>

  <!-- Overshirt Silhouette -->
  <g filter="url(#shadowJacket)">
    <!-- Main Body & Sleeves -->
    <path d="M 290 200 
             L 190 260 
             L 130 430 
             L 205 460 
             L 255 350 
             L 255 640 
             L 545 640 
             L 545 350 
             L 595 460 
             L 670 430 
             L 610 260 
             L 510 200 Z" 
          fill="url(#fabricJacket)" stroke="#374151" stroke-width="2"/>
    
    <!-- Tailored Collar -->
    <path d="M 290 200 L 370 280 L 400 240 L 430 280 L 510 200 Q 400 230 290 200 Z" fill="#111827" stroke="#4b5563" stroke-width="2"/>
    
    <!-- Center Button Placket -->
    <rect x="390" y="240" width="20" height="400" fill="#1f2937" stroke="#374151" stroke-width="1.5"/>
    <!-- Horn Buttons -->
    <circle cx="400" cy="290" r="6" fill="#111827" stroke="#9ca3af" stroke-width="1.5"/>
    <circle cx="400" cy="360" r="6" fill="#111827" stroke="#9ca3af" stroke-width="1.5"/>
    <circle cx="400" cy="430" r="6" fill="#111827" stroke="#9ca3af" stroke-width="1.5"/>
    <circle cx="400" cy="500" r="6" fill="#111827" stroke="#9ca3af" stroke-width="1.5"/>
    <circle cx="400" cy="570" r="6" fill="#111827" stroke="#9ca3af" stroke-width="1.5"/>
    
    <!-- Chest Patch Pockets -->
    <rect x="290" y="320" width="85" height="95" rx="6" fill="#1f2937" stroke="#4b5563" stroke-width="1.5"/>
    <path d="M 290 345 L 375 345" stroke="#374151" stroke-width="1.5"/>
    
    <rect x="425" y="320" width="85" height="95" rx="6" fill="#1f2937" stroke="#4b5563" stroke-width="1.5"/>
    <path d="M 425 345 L 510 345" stroke="#374151" stroke-width="1.5"/>
  </g>
  
  <!-- Product Label Badge -->
  <g transform="translate(48, 710)">
    <rect width="240" height="42" rx="21" fill="#18181b" stroke="#27272a" stroke-width="1"/>
    <circle cx="21" cy="21" r="5" fill="#38bdf8"/>
    <text x="36" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#f8fafc">DOUBLE-WEAVE OVERSHIRT</text>
  </g>
  <text x="752" y="736" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#10b981" text-anchor="end">$185.00 USD</text>
</svg>`,

  'selvedge-denim.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bgDenim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
    <linearGradient id="fabricDenim" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="40%" stop-color="#172554"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <filter id="shadowDenim" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>
  <rect width="800" height="800" rx="32" fill="url(#bgDenim)"/>
  
  <circle cx="400" cy="400" r="320" fill="#3b82f6" opacity="0.05" filter="blur(60px)"/>

  <!-- Denim Jeans Silhouette -->
  <g filter="url(#shadowDenim)">
    <!-- Waistband -->
    <rect x="270" y="180" width="260" height="40" rx="4" fill="#1e3a8a" stroke="#d97706" stroke-width="2"/>
    
    <!-- Copper Button & Belt loops -->
    <circle cx="400" cy="200" r="7" fill="#b45309" stroke="#f59e0b" stroke-width="1.5"/>
    <rect x="290" y="175" width="8" height="50" rx="2" fill="#172554" stroke="#d97706" stroke-width="1"/>
    <rect x="502" y="175" width="8" height="50" rx="2" fill="#172554" stroke="#d97706" stroke-width="1"/>

    <!-- Left and Right Legs -->
    <path d="M 270 220 
             L 280 630 
             L 375 630 
             L 395 350 
             L 405 350 
             L 425 630 
             L 520 630 
             L 530 220 Z" 
          fill="url(#fabricDenim)" stroke="#d97706" stroke-width="2"/>
    
    <!-- Fly Stitching -->
    <path d="M 400 220 L 400 300 Q 400 320 380 325" fill="none" stroke="#d97706" stroke-width="2.5"/>
    
    <!-- Selvedge Cuffs with Red ID line -->
    <!-- Left Cuff -->
    <rect x="280" y="590" width="95" height="40" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
    <line x1="290" y1="590" x2="290" y2="630" stroke="#ef4444" stroke-width="3"/>
    <!-- Right Cuff -->
    <rect x="425" y="590" width="95" height="40" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
    <line x1="515" y1="590" x2="515" y2="630" stroke="#ef4444" stroke-width="3"/>
    
    <!-- Curved Pocket stitches -->
    <path d="M 275 240 Q 330 250 340 300" fill="none" stroke="#d97706" stroke-width="2"/>
    <circle cx="340" cy="300" r="3" fill="#f59e0b"/>
    <path d="M 525 240 Q 470 250 460 300" fill="none" stroke="#d97706" stroke-width="2"/>
    <circle cx="460" cy="300" r="3" fill="#f59e0b"/>
  </g>
  
  <!-- Product Label Badge -->
  <g transform="translate(48, 710)">
    <rect width="250" height="42" rx="21" fill="#18181b" stroke="#27272a" stroke-width="1"/>
    <circle cx="21" cy="21" r="5" fill="#f59e0b"/>
    <text x="36" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#f8fafc">14OZ JAPANESE SELVEDGE</text>
  </g>
  <text x="752" y="736" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#10b981" text-anchor="end">$210.00 USD</text>
</svg>`,

  'lumina-headphones.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bgHdp" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
    <linearGradient id="silverArm" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e2e8f0"/>
      <stop offset="50%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>
    <filter id="shadowHdp" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="24" stdDeviation="30" flood-color="#000000" flood-opacity="0.7"/>
    </filter>
  </defs>
  <rect width="800" height="800" rx="32" fill="url(#bgHdp)"/>
  
  <circle cx="400" cy="380" r="300" fill="#a855f7" opacity="0.06" filter="blur(60px)"/>

  <g filter="url(#shadowHdp)">
    <!-- Headband Arch -->
    <path d="M 230 420 
             C 230 200, 570 200, 570 420" 
          fill="none" stroke="#27272a" stroke-width="44" stroke-linecap="round"/>
    <!-- Headband Cushion -->
    <path d="M 280 340 
             C 320 250, 480 250, 520 340" 
          fill="none" stroke="#09090b" stroke-width="28" stroke-linecap="round"/>
    
    <!-- Metal Extension Sliders -->
    <rect x="216" y="380" width="28" height="70" rx="6" fill="url(#silverArm)"/>
    <rect x="556" y="380" width="28" height="70" rx="6" fill="url(#silverArm)"/>
    
    <!-- Left Ear Cup -->
    <g transform="translate(160, 390)">
      <rect x="0" y="0" width="110" height="170" rx="48" fill="#18181b" stroke="#3f3f46" stroke-width="3"/>
      <!-- Soft memory foam cushion -->
      <rect x="12" y="12" width="86" height="146" rx="40" fill="#09090b"/>
      <!-- Driver grille center -->
      <circle cx="55" cy="85" r="28" fill="#18181b" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 3"/>
      <circle cx="55" cy="85" r="8" fill="#10b981"/>
    </g>

    <!-- Right Ear Cup -->
    <g transform="translate(530, 390)">
      <rect x="0" y="0" width="110" height="170" rx="48" fill="#18181b" stroke="#3f3f46" stroke-width="3"/>
      <rect x="12" y="12" width="86" height="146" rx="40" fill="#09090b"/>
      <circle cx="55" cy="85" r="28" fill="#18181b" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 3"/>
      <circle cx="55" cy="85" r="8" fill="#10b981"/>
    </g>
  </g>
  
  <g transform="translate(48, 710)">
    <rect width="250" height="42" rx="21" fill="#18181b" stroke="#27272a" stroke-width="1"/>
    <circle cx="21" cy="21" r="5" fill="#a855f7"/>
    <text x="36" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#f8fafc">LUMINA ANC WIRELESS</text>
  </g>
  <text x="752" y="736" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#10b981" text-anchor="end">$349.00 USD</text>
</svg>`,

  'mechanical-keyboard.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bgKbd" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
    <filter id="shadowKbd" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>
  <rect width="800" height="800" rx="32" fill="url(#bgKbd)"/>
  
  <circle cx="400" cy="380" r="320" fill="#10b981" opacity="0.04" filter="blur(60px)"/>

  <!-- Keyboard Case 3D Angle -->
  <g filter="url(#shadowKbd)">
    <!-- Anodized Aluminum Chassis -->
    <rect x="140" y="250" width="520" height="280" rx="20" fill="#18181b" stroke="#3f3f46" stroke-width="3"/>
    <rect x="155" y="265" width="490" height="250" rx="12" fill="#09090b"/>
    
    <!-- Rotary Knob top-right -->
    <circle cx="615" cy="295" r="16" fill="#10b981" stroke="#34d399" stroke-width="2"/>
    <circle cx="615" cy="295" r="6" fill="#064e3b"/>

    <!-- Key Rows -->
    <!-- Row 1: Function -->
    <g fill="#27272a" stroke="#3f3f46" stroke-width="1">
      <rect x="170" y="280" width="30" height="24" rx="4" fill="#ef4444"/>
      <rect x="210" y="280" width="28" height="24" rx="4"/>
      <rect x="245" y="280" width="28" height="24" rx="4"/>
      <rect x="280" y="280" width="28" height="24" rx="4"/>
      <rect x="315" y="280" width="28" height="24" rx="4"/>
      <rect x="360" y="280" width="28" height="24" rx="4"/>
      <rect x="395" y="280" width="28" height="24" rx="4"/>
      <rect x="430" y="280" width="28" height="24" rx="4"/>
      <rect x="465" y="280" width="28" height="24" rx="4"/>
      <rect x="510" y="280" width="28" height="24" rx="4"/>
      <rect x="545" y="280" width="28" height="24" rx="4"/>
    </g>

    <!-- Row 2: Alphas -->
    <g fill="#18181b" stroke="#3f3f46" stroke-width="1">
      <rect x="170" y="320" width="38" height="32" rx="4"/>
      <rect x="215" y="320" width="32" height="32" rx="4"/>
      <rect x="253" y="320" width="32" height="32" rx="4"/>
      <rect x="291" y="320" width="32" height="32" rx="4"/>
      <rect x="329" y="320" width="32" height="32" rx="4"/>
      <rect x="367" y="320" width="32" height="32" rx="4"/>
      <rect x="405" y="320" width="32" height="32" rx="4"/>
      <rect x="443" y="320" width="32" height="32" rx="4"/>
      <rect x="481" y="320" width="32" height="32" rx="4"/>
      <rect x="519" y="320" width="32" height="32" rx="4"/>
      <rect x="557" y="320" width="60" height="32" rx="4"/>
    </g>

    <!-- Row 3: Home -->
    <g fill="#18181b" stroke="#3f3f46" stroke-width="1">
      <rect x="170" y="365" width="48" height="32" rx="4"/>
      <rect x="225" y="365" width="32" height="32" rx="4"/>
      <rect x="263" y="365" width="32" height="32" rx="4"/>
      <rect x="301" y="365" width="32" height="32" rx="4"/>
      <rect x="339" y="365" width="32" height="32" rx="4"/>
      <rect x="377" y="365" width="32" height="32" rx="4"/>
      <rect x="415" y="365" width="32" height="32" rx="4"/>
      <rect x="453" y="365" width="32" height="32" rx="4"/>
      <rect x="491" y="365" width="32" height="32" rx="4"/>
      <rect x="529" y="365" width="88" height="32" rx="4" fill="#10b981"/>
    </g>

    <!-- Row 4: Spacebar -->
    <g fill="#18181b" stroke="#3f3f46" stroke-width="1">
      <rect x="170" y="415" width="54" height="34" rx="4"/>
      <rect x="230" y="415" width="40" height="34" rx="4"/>
      <rect x="278" y="415" width="220" height="34" rx="4" fill="#27272a"/>
      <rect x="506" y="415" width="40" height="34" rx="4"/>
      <rect x="552" y="415" width="30" height="34" rx="4"/>
      <rect x="588" y="415" width="30" height="34" rx="4"/>
    </g>
    <!-- RGB Glow Under Spacebar -->
    <rect x="280" y="452" width="216" height="4" rx="2" fill="#10b981" opacity="0.8" filter="blur(2px)"/>
  </g>
  
  <g transform="translate(48, 710)">
    <rect width="250" height="42" rx="21" fill="#18181b" stroke="#27272a" stroke-width="1"/>
    <circle cx="21" cy="21" r="5" fill="#10b981"/>
    <text x="36" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#f8fafc">KEYVOX PRO 75% WIRELESS</text>
  </g>
  <text x="752" y="736" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#10b981" text-anchor="end">$229.00 USD</text>
</svg>`,

  'smart-touch-pos.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bgPos" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
    <filter id="shadowPos" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="24" stdDeviation="30" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>
  <rect width="800" height="800" rx="32" fill="url(#bgPos)"/>
  
  <circle cx="400" cy="380" r="320" fill="#10b981" opacity="0.05" filter="blur(60px)"/>

  <!-- OmniShop POS Terminal Device -->
  <g filter="url(#shadowPos)">
    <!-- Base / Stand -->
    <ellipse cx="400" cy="580" rx="180" ry="35" fill="#18181b" stroke="#27272a" stroke-width="2"/>
    <rect x="375" y="450" width="50" height="130" fill="#27272a"/>
    
    <!-- Angled Display Housing -->
    <rect x="200" y="200" width="400" height="280" rx="20" fill="#09090b" stroke="#3f3f46" stroke-width="3"/>
    
    <!-- Active Glass Screen with OmniShop UI -->
    <rect x="220" y="220" width="360" height="240" rx="12" fill="#0f172a"/>
    
    <!-- Status Bar -->
    <rect x="220" y="220" width="360" height="24" fill="#020617"/>
    <circle cx="236" cy="232" r="4" fill="#10b981"/>
    <text x="248" y="236" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#94a3b8">OmniShop POS Online (Karachi Hub)</text>
    <text x="565" y="236" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#94a3b8" text-anchor="end">9:41 AM</text>
    
    <!-- Cart / Sale Summary Screen -->
    <g transform="translate(240, 260)">
      <text x="0" y="20" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">CURRENT ORDER #1089</text>
      
      <!-- Line Items -->
      <text x="0" y="50" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">1x Heavyweight Boxy Tee</text>
      <text x="320" y="50" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="end">$58.00</text>
      
      <text x="0" y="75" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1">1x Selvedge Raw Denim</text>
      <text x="320" y="75" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="end">$210.00</text>
      
      <line x1="0" y1="95" x2="320" y2="95" stroke="#334155" stroke-width="1"/>
      
      <text x="0" y="115" font-family="system-ui, sans-serif" font-size="12" fill="#94a3b8">Total Due</text>
      <text x="320" y="115" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="#10b981" text-anchor="end">$268.00</text>
      
      <!-- Tap to Pay Button -->
      <rect x="0" y="140" width="320" height="42" rx="8" fill="#10b981"/>
      <text x="160" y="166" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#000" text-anchor="middle">TAP / INSERT CARD OR SCAN QR</text>
    </g>

    <!-- Built-in Chip / NFC Card Reader Slot -->
    <rect x="585" y="260" width="10" height="120" rx="3" fill="#27272a"/>
  </g>
  
  <g transform="translate(48, 710)">
    <rect width="250" height="42" rx="21" fill="#18181b" stroke="#27272a" stroke-width="1"/>
    <circle cx="21" cy="21" r="5" fill="#10b981"/>
    <text x="36" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#f8fafc">OMNISHOP HARDWARE TERMINAL</text>
  </g>
  <text x="752" y="736" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#10b981" text-anchor="end">$499.00 USD</text>
</svg>`
};

const brandSvgs = {
  'openshopify-logo.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="100%" height="100%">
  <defs>
    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
  </defs>
  <!-- Shopping Bag Icon -->
  <g transform="translate(10, 10)">
    <rect x="10" y="24" width="60" height="56" rx="14" fill="url(#logoGrad)"/>
    <!-- Handle -->
    <path d="M 26 24 C 26 10, 54 10, 54 24" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
    <!-- Open Lightning Bolt -->
    <path d="M 43 32 L 32 52 L 41 52 L 37 72 L 50 48 L 41 48 Z" fill="#ffffff"/>
  </g>
  <!-- Typography -->
  <text x="95" y="52" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900" fill="#ffffff" letter-spacing="-0.03em">Open<tspan fill="#10b981">Shopify</tspan></text>
  <text x="96" y="74" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#94a3b8" letter-spacing="0.1em">ENTERPRISE COMMERCE ENGINE</text>
</svg>`,

  'openshopify-icon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <defs>
    <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="28" fill="#18181b"/>
  <rect x="25" y="42" width="70" height="60" rx="16" fill="url(#iconGrad)"/>
  <path d="M 43 42 C 43 24, 77 24, 77 42" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
  <path d="M 64 52 L 51 72 L 61 72 L 56 92 L 72 68 L 61 68 Z" fill="#ffffff"/>
</svg>`,

  'avatar-elena.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="50" fill="#10b981"/>
  <circle cx="50" cy="40" r="20" fill="#ffffff"/>
  <path d="M 20 85 C 20 65, 80 65, 80 85" fill="#ffffff"/>
</svg>`,

  'avatar-marcus.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="50" fill="#3b82f6"/>
  <circle cx="50" cy="40" r="20" fill="#ffffff"/>
  <path d="M 20 85 C 20 65, 80 65, 80 85" fill="#ffffff"/>
</svg>`
};

const appDirs = [
  path.join(process.cwd(), 'apps', 'storefront', 'public'),
  path.join(process.cwd(), 'apps', 'admin', 'public'),
  path.join(process.cwd(), 'apps', 'web-marketing', 'public'),
  path.join(process.cwd(), 'apps', 'theme-editor', 'public')
];

for (const appDir of appDirs) {
  const prodDir = path.join(appDir, 'assets', 'products');
  const brandDir = path.join(appDir, 'assets', 'branding');
  
  fs.mkdirSync(prodDir, { recursive: true });
  fs.mkdirSync(brandDir, { recursive: true });

  for (const [filename, content] of Object.entries(productSvgs)) {
    fs.writeFileSync(path.join(prodDir, filename), content.trim());
  }

  for (const [filename, content] of Object.entries(brandSvgs)) {
    fs.writeFileSync(path.join(brandDir, filename), content.trim());
  }
}

console.log('✅ Generated and synced all local high-craft assets across 4 apps!');
