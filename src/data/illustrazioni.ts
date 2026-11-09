/*
 * Illustrazioni di Mamapp (disegnate nello stile del logo).
 * I file SVG sono in src/assets/illustrazioni/ e si rigenerano con
 *   python3 scripts/genera-illustrazioni.py
 * Sono immagini di esempio per il prototipo: quando le strutture caricheranno
 * le loro foto vere, queste resteranno come immagine di riserva per categoria.
 */
import creativi from '../assets/illustrazioni/creativi.svg';
import parchi from '../assets/illustrazioni/parchi.svg';
import sport from '../assets/illustrazioni/sport.svg';
import nuoto from '../assets/illustrazioni/nuoto.svg';
import ludoteca from '../assets/illustrazioni/ludoteca.svg';
import teatro from '../assets/illustrazioni/teatro.svg';
import musica from '../assets/illustrazioni/musica.svg';
import musei from '../assets/illustrazioni/musei.svg';
import mare from '../assets/illustrazioni/mare.svg';
import ristorante from '../assets/illustrazioni/ristorante.svg';
import bannerCitta from '../assets/illustrazioni/banner-citta.svg';
import bannerMappa from '../assets/illustrazioni/banner-mappa.svg';
import profilo from '../assets/illustrazioni/profilo.svg';

export const ILLUSTRAZIONI = {
  creativi,
  parchi,
  sport,
  nuoto,
  ludoteca,
  teatro,
  musica,
  musei,
  mare,
  ristorante,
  bannerCitta,
  bannerMappa,
  profilo
} as const;

export type IllustrazioneId = keyof typeof ILLUSTRAZIONI;
