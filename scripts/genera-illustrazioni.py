#!/usr/bin/env python3
"""
Genera le illustrazioni di Mamapp (file SVG in src/assets/illustrazioni/).

Stile: lo stesso del logo. Bambini stilizzati (testa tonda + corpo a goccia),
effetto acquerello leggero, colori del brand: rosa lampone, rosa cipria,
lilla, blu petrolio, più verdi e sabbia per gli sfondi.

Uso:  python3 scripts/genera-illustrazioni.py
Per cambiare una scena basta modificare la sua funzione qui sotto e rilanciare.
"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "src" / "assets" / "illustrazioni"
W, H = 800, 600

# Palette
LAMPONE = "#E43B80"
ROSA = "#F09EB2"
CIPRIA = "#F9D3DE"
LILLA = "#B596C0"
LILLA_CHIARO = "#E3D6EA"
PETROLIO = "#0D7480"
PETROLIO_CHIARO = "#A6D8DC"
ACQUA = "#CFEAF0"
MENTA = "#BFE6D3"
VERDE = "#7CC6A0"
VERDE_SCURO = "#3E9C77"
SABBIA = "#F6E3C5"
SOLE = "#FFD27A"
PESCA = "#F7B89A"
BIANCO = "#FFFFFF"
LEGNO = "#D9A47A"

KID_COLORS = [LAMPONE, LILLA, PETROLIO, PESCA, ROSA]


def svg(body: str, sky_top: str, sky_bottom: str) -> str:
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
  <defs>
    <linearGradient id="cielo" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{sky_top}"/>
      <stop offset="1" stop-color="{sky_bottom}"/>
    </linearGradient>
    <filter id="acquerello" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="4" result="rumore"/>
      <feDisplacementMap in="SourceGraphic" in2="rumore" scale="6" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="carta">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="9"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.30  0 0 0 0 0.38  0 0 0 0.07 0"/>
    </filter>
  </defs>
  <rect width="{W}" height="{H}" fill="url(#cielo)"/>
  <g filter="url(#acquerello)">
{body}
  </g>
  <rect width="{W}" height="{H}" filter="url(#carta)"/>
</svg>
"""


def kid(x, y, h, color, pose="down", opacity=1.0):
    """Bambino stilizzato come nel logo. (x, y) = piedi; h = altezza totale."""
    r = h * 0.14
    w = h * 0.40
    head_cy = y - h + r
    top = head_cy + r + h * 0.05
    body = (
        f"M {x - w / 2:.1f} {top + w * 0.3:.1f} "
        f"Q {x - w / 2:.1f} {top:.1f} {x:.1f} {top:.1f} "
        f"Q {x + w / 2:.1f} {top:.1f} {x + w / 2:.1f} {top + w * 0.3:.1f} "
        f"C {x + w / 2:.1f} {y - h * 0.25:.1f} {x + w * 0.15:.1f} {y:.1f} {x:.1f} {y:.1f} "
        f"C {x - w * 0.15:.1f} {y:.1f} {x - w / 2:.1f} {y - h * 0.25:.1f} {x - w / 2:.1f} {top + w * 0.3:.1f} Z"
    )
    sx, sy = w * 0.42, top + h * 0.06
    if pose == "up":
        ends = [(x - w * 0.85, top - h * 0.16), (x + w * 0.85, top - h * 0.16)]
    elif pose == "side":
        ends = [(x - w * 0.95, top + h * 0.14), (x + w * 0.95, top + h * 0.14)]
    elif pose == "wave":
        ends = [(x - w * 0.70, top + h * 0.34), (x + w * 0.85, top - h * 0.16)]
    elif pose == "front":
        ends = [(x - w * 0.55, top + h * 0.26), (x + w * 0.55, top + h * 0.26)]
    else:  # down
        ends = [(x - w * 0.70, top + h * 0.34), (x + w * 0.70, top + h * 0.34)]
    arms = "".join(
        f'<path d="M {x + side * sx:.1f} {sy:.1f} L {ex:.1f} {ey:.1f}" stroke="{color}" '
        f'stroke-width="{h * 0.085:.1f}" stroke-linecap="round" fill="none"/>'
        for side, (ex, ey) in zip((-1, 1), ends)
    )
    return (
        f'<g opacity="{opacity}">{arms}<path d="{body}" fill="{color}"/>'
        f'<circle cx="{x:.1f}" cy="{head_cy:.1f}" r="{r:.1f}" fill="{color}"/></g>'
    )


def hills(color1, color2, base=430):
    return (
        f'<path d="M0 {base} C 160 {base - 70} 300 {base - 40} 420 {base - 10} '
        f'C 560 {base + 20} 680 {base - 60} 800 {base - 30} L800 600 L0 600 Z" fill="{color1}"/>'
        f'<path d="M0 {base + 50} C 200 {base + 10} 380 {base + 60} 560 {base + 40} '
        f'C 680 {base + 25} 760 {base + 40} 800 {base + 50} L800 600 L0 600 Z" fill="{color2}"/>'
    )


def sun(x, y, r=46):
    return f'<circle cx="{x}" cy="{y}" r="{r + 26}" fill="{SOLE}" opacity="0.25"/><circle cx="{x}" cy="{y}" r="{r}" fill="{SOLE}"/>'


def tree(x, y, s=1.0, color=VERDE):
    return (
        f'<rect x="{x - 7 * s:.1f}" y="{y - 70 * s:.1f}" width="{14 * s:.1f}" height="{70 * s:.1f}" rx="6" fill="{LEGNO}"/>'
        f'<circle cx="{x:.1f}" cy="{y - 110 * s:.1f}" r="{52 * s:.1f}" fill="{color}"/>'
        f'<circle cx="{x - 34 * s:.1f}" cy="{y - 86 * s:.1f}" r="{36 * s:.1f}" fill="{color}"/>'
        f'<circle cx="{x + 36 * s:.1f}" cy="{y - 88 * s:.1f}" r="{38 * s:.1f}" fill="{color}"/>'
    )


def cloud(x, y, s=1.0):
    return (
        f'<g fill="{BIANCO}" opacity="0.85">'
        f'<ellipse cx="{x}" cy="{y}" rx="{60 * s:.0f}" ry="{22 * s:.0f}"/>'
        f'<circle cx="{x - 20 * s:.0f}" cy="{y - 14 * s:.0f}" r="{24 * s:.0f}"/>'
        f'<circle cx="{x + 18 * s:.0f}" cy="{y - 20 * s:.0f}" r="{30 * s:.0f}"/></g>'
    )


# ---------------------------------------------------------------------------
# Scene
# ---------------------------------------------------------------------------

def creativi():
    splashes = "".join(
        f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{c}" opacity="0.55"/>'
        for cx, cy, r, c in [(120, 120, 60, ROSA), (680, 110, 70, LILLA_CHIARO), (420, 80, 40, PETROLIO_CHIARO),
                             (70, 260, 30, SOLE), (740, 260, 26, MENTA)]
    )
    table = f'<rect x="80" y="400" width="640" height="34" rx="14" fill="{LEGNO}"/><rect x="80" y="434" width="640" height="166" fill="{SABBIA}"/>'
    paper = f'<rect x="300" y="360" width="200" height="44" rx="6" fill="{BIANCO}" transform="rotate(-4 400 380)"/>'
    paint = "".join(
        f'<circle cx="{x}" cy="378" r="9" fill="{c}"/>' for x, c in [(330, LAMPONE), (360, PETROLIO), (390, SOLE), (420, VERDE), (450, LILLA)]
    )
    jars = (
        f'<rect x="150" y="345" width="44" height="58" rx="10" fill="{ACQUA}"/>'
        f'<path d="M168 345 L 150 270" stroke="{LEGNO}" stroke-width="6" stroke-linecap="round"/>'
        f'<circle cx="150" cy="268" r="8" fill="{LAMPONE}"/>'
        f'<rect x="610" y="350" width="40" height="52" rx="10" fill="{CIPRIA}"/>'
        f'<path d="M628 350 L 650 285" stroke="{LEGNO}" stroke-width="6" stroke-linecap="round"/>'
        f'<circle cx="650" cy="283" r="8" fill="{PETROLIO}"/>'
    )
    kids = kid(250, 410, 190, LAMPONE, "front") + kid(400, 400, 160, PESCA, "up") + kid(550, 410, 185, LILLA, "front")
    return svg(splashes + kids + table + paper + paint + jars, "#FFF4F7", "#FCE4EC")


def parchi():
    body = (
        sun(660, 110) + cloud(200, 110) + cloud(480, 80, 0.7)
        + hills(MENTA, VERDE, 400)
        + tree(110, 470, 1.15, VERDE_SCURO) + tree(720, 480, 1.0, VERDE_SCURO)
        # scivolo
        + f'<path d="M520 470 L520 340 L560 340 L640 470" stroke="{LAMPONE}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
        + f'<path d="M520 360 L560 360 M520 395 L560 395 M520 430 L560 430" stroke="{LAMPONE}" stroke-width="7" stroke-linecap="round"/>'
        + kid(260, 520, 170, LAMPONE, "up") + kid(370, 505, 135, PETROLIO, "wave") + kid(560, 330, 95, LILLA, "up")
    )
    return svg(body, "#DDF1F6", "#F2FAF7")


def sport():
    field = (
        f'<rect x="0" y="380" width="800" height="220" fill="{VERDE}"/>'
        f'<path d="M0 430 L800 430 M400 380 L400 600" stroke="{BIANCO}" stroke-width="5" opacity="0.7"/>'
        f'<ellipse cx="400" cy="470" rx="90" ry="34" stroke="{BIANCO}" stroke-width="5" fill="none" opacity="0.7"/>'
        f'<path d="M640 470 L640 330 L770 330 L770 470" stroke="{BIANCO}" stroke-width="9" fill="none" stroke-linejoin="round"/>'
        f'<path d="M650 340 L760 460 M760 340 L650 460" stroke="{BIANCO}" stroke-width="2" opacity="0.5"/>'
    )
    ball = (
        f'<circle cx="470" cy="500" r="24" fill="{BIANCO}"/>'
        f'<path d="M462 490 L478 490 L482 505 L470 514 L458 505 Z" fill="#334155"/>'
    )
    body = sun(130, 110) + cloud(560, 100) + field + kid(250, 520, 180, PETROLIO, "side") + kid(390, 505, 150, LAMPONE, "up") + ball + kid(580, 515, 160, LILLA, "wave")
    return svg(body, "#D9EEF5", "#EEF7F4")


def nuoto():
    tiles = "".join(f'<path d="M0 {y} L800 {y}" stroke="{BIANCO}" stroke-width="2" opacity="0.4"/>' for y in range(300, 600, 40))
    water = (
        f'<rect x="0" y="260" width="800" height="340" fill="{PETROLIO_CHIARO}"/>' + tiles
        + f'<path d="M0 300 C 80 280 160 320 240 300 S 400 280 480 300 S 640 320 800 300 L800 600 L0 600 Z" fill="#7FC4CC" opacity="0.55"/>'
    )
    lane = "".join(f'<circle cx="{x}" cy="268" r="9" fill="{LAMPONE if (x // 30) % 2 else BIANCO}"/>' for x in range(15, 800, 30))
    ring = lambda x, y, c: f'<ellipse cx="{x}" cy="{y}" rx="58" ry="22" fill="none" stroke="{c}" stroke-width="18"/>'
    board = f'<rect x="560" y="380" width="120" height="40" rx="18" fill="{SOLE}" transform="rotate(-8 620 400)"/>'
    kids = kid(260, 420, 170, LAMPONE, "up") + ring(260, 400, PESCA) + kid(470, 430, 150, PETROLIO, "side") + ring(470, 410, ROSA)
    waves = f'<path d="M0 420 C 100 400 200 440 300 420 S 500 400 600 420 S 750 440 800 420 L800 600 L0 600 Z" fill="#8FD0D6" opacity="0.6"/>'
    return svg(water + lane + kids + board + waves, "#EAF6FA", "#D3EEF2")


def ludoteca():
    wall = f'<rect x="0" y="0" width="800" height="380" fill="#FFF3E6"/><rect x="0" y="380" width="800" height="220" fill="{SABBIA}"/>'
    window = f'<rect x="560" y="70" width="170" height="130" rx="18" fill="{ACQUA}"/><path d="M645 70 L645 200 M560 135 L730 135" stroke="{BIANCO}" stroke-width="8"/>'
    garland = "".join(
        f'<path d="M{x} 40 L{x + 30} 40 L{x + 15} 75 Z" fill="{c}"/>'
        for x, c in zip(range(40, 520, 60), [LAMPONE, SOLE, PETROLIO, LILLA, ROSA, VERDE, LAMPONE, SOLE])
    )
    pit = f'<rect x="90" y="400" width="420" height="150" rx="40" fill="{PETROLIO_CHIARO}"/>'
    balls = "".join(
        f'<circle cx="{x}" cy="{y}" r="22" fill="{c}"/>'
        for x, y, c in [(130, 420, LAMPONE), (175, 405, SOLE), (220, 425, LILLA), (265, 410, PETROLIO), (310, 425, ROSA),
                        (355, 405, VERDE), (400, 420, LAMPONE), (445, 408, SOLE), (480, 425, LILLA), (150, 455, PETROLIO),
                        (240, 455, SOLE), (330, 455, LAMPONE), (420, 455, ROSA)]
    )
    slide = f'<path d="M560 520 L560 330 L610 330 C 690 330 700 520 780 520 Z" fill="{LILLA_CHIARO}"/><path d="M610 330 C 690 330 700 520 780 520" stroke="{LILLA}" stroke-width="14" fill="none"/>'
    kids = kid(220, 420, 150, LAMPONE, "up") + kid(380, 425, 140, PETROLIO, "wave") + kid(600, 335, 110, PESCA, "up")
    return svg(wall + window + garland + slide + kids + pit + balls, "#FFF3E6", "#FFF3E6")


def teatro():
    curtains = (
        f'<path d="M0 0 L190 0 C 170 160 200 330 140 600 L0 600 Z" fill="{LAMPONE}"/>'
        f'<path d="M800 0 L610 0 C 630 160 600 330 660 600 L800 600 Z" fill="{LAMPONE}"/>'
        f'<path d="M0 0 L800 0 L800 70 C 600 110 200 110 0 70 Z" fill="#C42E6D"/>'
    )
    stage = f'<rect x="230" y="150" width="340" height="200" rx="16" fill="{PETROLIO}"/><rect x="250" y="170" width="300" height="160" rx="10" fill="{SOLE}" opacity="0.85"/>'
    puppets = (
        f'<circle cx="340" cy="240" r="30" fill="{LILLA}"/><path d="M310 330 L320 270 L360 270 L370 330 Z" fill="{LILLA}"/>'
        f'<circle cx="460" cy="235" r="30" fill="{PESCA}"/><path d="M430 330 L440 265 L480 265 L490 330 Z" fill="{PESCA}"/>'
        f'<path d="M232 350 L568 350 L568 410 L232 410 Z" fill="{LEGNO}"/>'
    )
    audience = (
        kid(260, 640, 230, LAMPONE, "up", 0.95) + kid(400, 650, 210, PETROLIO, "down", 0.95)
        + kid(540, 640, 230, LILLA, "up", 0.95)
    )
    stars = "".join(f'<circle cx="{x}" cy="{y}" r="4" fill="{SOLE}"/>' for x, y in [(240, 120), (560, 120), (300, 105), (500, 105)])
    return svg(stage + puppets + stars + audience + curtains, "#3E2A4F", "#6B3D63")


def musica():
    notes = "".join(
        f'<g fill="{c}"><ellipse cx="{x}" cy="{y}" rx="16" ry="12" transform="rotate(-20 {x} {y})"/>'
        f'<rect x="{x + 11}" y="{y - 70}" width="6" height="70" rx="3"/></g>'
        for x, y, c in [(130, 200, LAMPONE), (300, 140, PETROLIO), (520, 170, LILLA), (680, 230, LAMPONE)]
    )
    xylo = "".join(
        f'<rect x="{x}" y="{430 - i * 4}" width="44" height="{90 + i * 8}" rx="10" fill="{c}"/>'
        for i, (x, c) in enumerate(zip(range(250, 560, 52), [LAMPONE, SOLE, VERDE, PETROLIO, LILLA, ROSA]))
    )
    drum = f'<ellipse cx="660" cy="470" rx="70" ry="22" fill="{CIPRIA}"/><rect x="590" y="470" width="140" height="80" fill="{PETROLIO}"/><ellipse cx="660" cy="550" rx="70" ry="22" fill="{PETROLIO}"/>'
    floor = f'<rect x="0" y="520" width="800" height="80" fill="{LILLA_CHIARO}"/>'
    kids = kid(170, 540, 180, PETROLIO, "up") + kid(400, 470, 175, LAMPONE, "up") + kid(660, 460, 120, PESCA, "side")
    return svg(floor + notes + kids + xylo + drum, "#FDF1F6", "#F3E8F6")


def musei():
    columns = "".join(
        f'<rect x="{x}" y="150" width="46" height="300" fill="{BIANCO}" opacity="0.9"/><rect x="{x - 10}" y="135" width="66" height="18" fill="{BIANCO}"/>'
        for x in (90, 664)
    )
    roof = f'<path d="M60 135 L400 40 L740 135 Z" fill="{LILLA_CHIARO}"/>'
    frame = f'<rect x="270" y="150" width="260" height="190" rx="10" fill="{LEGNO}"/><rect x="288" y="168" width="224" height="154" fill="{ACQUA}"/><circle cx="460" cy="210" r="24" fill="{SOLE}"/><path d="M288 322 L360 250 L420 300 L460 270 L512 322 Z" fill="{VERDE}"/>'
    floor = f'<rect x="0" y="450" width="800" height="150" fill="{SABBIA}"/><path d="M0 450 L800 450" stroke="{LEGNO}" stroke-width="4" opacity="0.5"/>'
    rope = f'<path d="M230 430 C 330 470 470 470 570 430" stroke="{LAMPONE}" stroke-width="7" fill="none"/><rect x="222" y="410" width="16" height="60" rx="6" fill="{PETROLIO}"/><rect x="562" y="410" width="16" height="60" rx="6" fill="{PETROLIO}"/>'
    kids = kid(320, 560, 190, LAMPONE, "wave") + kid(470, 565, 170, PETROLIO, "front") + kid(600, 560, 150, LILLA, "side")
    return svg(roof + columns + frame + floor + rope + kids, "#F4EEF8", "#FBF7FB")


def mare():
    sea = f'<rect x="0" y="250" width="800" height="200" fill="#7FC9D3"/><path d="M0 300 C 120 285 240 315 360 300 S 600 285 800 300" stroke="{BIANCO}" stroke-width="4" fill="none" opacity="0.6"/>'
    beach = f'<path d="M0 400 C 200 370 500 390 800 360 L800 600 L0 600 Z" fill="{SABBIA}"/>'
    umbrella = f'<path d="M640 470 L660 290" stroke="{LEGNO}" stroke-width="7"/><path d="M560 300 C 600 220 740 220 770 310 Z" fill="{LAMPONE}"/><path d="M610 290 C 640 240 700 240 720 300" fill="{BIANCO}" opacity="0.6"/>'
    castle = f'<rect x="380" y="470" width="120" height="70" fill="{LEGNO}" opacity="0.8"/><rect x="400" y="430" width="34" height="40" fill="{LEGNO}" opacity="0.8"/><rect x="446" y="440" width="34" height="30" fill="{LEGNO}" opacity="0.8"/><path d="M417 430 L417 400 L440 410 L417 418" fill="{LAMPONE}"/>'
    bucket = f'<path d="M520 520 L560 520 L552 570 L528 570 Z" fill="{PETROLIO}"/>'
    kids = kid(240, 560, 170, LILLA, "up") + kid(330, 550, 130, LAMPONE, "front") + kid(610, 560, 150, PETROLIO, "wave")
    return svg(sun(140, 110) + cloud(520, 110) + sea + beach + umbrella + kids + castle + bucket, "#DDF0F7", "#F4FAFB")


def ristorante():
    wall = f'<rect x="0" y="0" width="800" height="380" fill="#FFF1E8"/><rect x="0" y="380" width="800" height="220" fill="{SABBIA}"/>'
    lamps = "".join(f'<path d="M{x} 0 L{x} 70" stroke="{LEGNO}" stroke-width="3"/><path d="M{x - 30} 100 C {x - 30} 60 {x + 30} 60 {x + 30} 100 Z" fill="{c}"/>' for x, c in [(220, PETROLIO), (580, LAMPONE)])
    table = f'<rect x="380" y="430" width="40" height="150" fill="{LEGNO}"/><ellipse cx="400" cy="425" rx="300" ry="44" fill="{BIANCO}"/>'
    pizza = (
        f'<ellipse cx="400" cy="418" rx="110" ry="30" fill="{SOLE}"/><ellipse cx="400" cy="416" rx="94" ry="24" fill="#F08A6C"/>'
        + "".join(f'<ellipse cx="{x}" cy="{y}" rx="11" ry="5" fill="{c}"/>' for x, y, c in [(350, 410, BIANCO), (395, 405, VERDE), (440, 412, BIANCO), (375, 425, LAMPONE), (425, 426, VERDE)])
        + f'<ellipse cx="250" cy="420" rx="34" ry="10" fill="{ACQUA}"/><ellipse cx="560" cy="420" rx="34" ry="10" fill="{ACQUA}"/>'
    )
    kids = kid(170, 430, 190, LAMPONE, "up") + kid(630, 430, 190, LILLA, "wave")
    toys = f'<rect x="680" y="480" width="60" height="60" rx="10" fill="{PETROLIO_CHIARO}"/><rect x="700" y="450" width="40" height="40" rx="8" fill="{ROSA}"/>'
    return svg(wall + lamps + kids + table + pizza + toys, "#FFF1E8", "#FFF1E8")


def banner_citta():
    sky = sun(620, 300, 70)
    city = (
        f'<path d="M0 380 L80 380 L80 320 L130 320 L130 360 L190 360 L190 300 L210 280 L230 300 L230 360 L300 360 '
        f'L300 330 C 300 290 360 290 360 330 L360 360 L430 360 L430 310 L470 310 L470 360 L540 360 L540 340 '
        f'L600 340 L600 370 L680 370 L680 330 L720 330 L720 380 L800 380 L800 600 L0 600 Z" fill="{LILLA}" opacity="0.75"/>'
        f'<circle cx="330" cy="318" r="18" fill="{LAMPONE}" opacity="0.8"/>'
    )
    mount = f'<path d="M520 380 C 600 220 700 200 800 260 L800 380 Z" fill="{LILLA_CHIARO}"/>'
    sea = f'<rect x="0" y="430" width="800" height="170" fill="{PETROLIO_CHIARO}"/>'
    path = f'<path d="M0 560 C 200 500 420 520 800 470 L800 600 L0 600 Z" fill="{SABBIA}"/>'
    kids = kid(160, 580, 170, LAMPONE, "up") + kid(270, 570, 140, PETROLIO, "wave") + kid(370, 575, 160, PESCA, "up")
    return svg(sky + mount + city + sea + path + kids, "#FFD7C2", "#FCE4EC")


def banner_mappa():
    mappa = (
        f'<path d="M170 140 L330 100 L470 140 L630 100 L630 470 L470 510 L330 470 L170 510 Z" fill="{BIANCO}"/>'
        f'<path d="M330 100 L330 470 M470 140 L470 510" stroke="{LILLA_CHIARO}" stroke-width="4"/>'
        f'<path d="M190 380 C 260 300 330 360 400 280 S 540 230 610 180" stroke="{PETROLIO}" stroke-width="6" fill="none" stroke-dasharray="14 12"/>'
        f'<circle cx="250" cy="220" r="40" fill="{MENTA}"/><path d="M520 380 C 560 350 600 400 620 360 L620 460 L520 460 Z" fill="{ACQUA}"/>'
    )
    pin = (
        f'<path d="M400 300 C 360 240 340 210 340 180 C 340 145 367 120 400 120 C 433 120 460 145 460 180 C 460 210 440 240 400 300 Z" fill="{LAMPONE}"/>'
        f'<circle cx="400" cy="180" r="22" fill="{BIANCO}"/>'
    )
    kids = kid(140, 590, 200, PETROLIO, "wave") + kid(660, 590, 200, LILLA, "up")
    dots = "".join(f'<circle cx="{x}" cy="{y}" r="7" fill="{c}"/>' for x, y, c in [(230, 300, SOLE), (560, 250, LAMPONE), (300, 420, LILLA)])
    return svg(mappa + dots + pin + kids, "#E6F4F6", "#FDF1F6")


def profilo():
    """Immagine profilo generica (istruttori, organizzatori, loghi): quadrata."""
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="sfondo" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="{CIPRIA}"/>
      <stop offset="1" stop-color="{LILLA_CHIARO}"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" fill="url(#sfondo)"/>
  {kid(100, 215, 175, LAMPONE, "down", 0.9)}
</svg>
"""


SCENE = {
    "creativi": creativi,
    "parchi": parchi,
    "sport": sport,
    "nuoto": nuoto,
    "ludoteca": ludoteca,
    "teatro": teatro,
    "musica": musica,
    "musei": musei,
    "mare": mare,
    "ristorante": ristorante,
    "banner-citta": banner_citta,
    "banner-mappa": banner_mappa,
    "profilo": profilo,
}

if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for name, fn in SCENE.items():
        (OUT / f"{name}.svg").write_text(fn(), encoding="utf-8")
        print("scritto", name)
