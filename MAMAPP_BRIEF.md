# MamApp — Riassunto del progetto

Fonte: le due chat Gemini ("MAMAPP", lug–nov 2026, e "App per mamme", set 2026).

## 1. L'idea in una frase
Una "GetYourGuide per famiglie" a **Palermo**: aiuta le mamme che non sanno cosa fare con i figli a trovare (e in prospettiva prenotare) attività, luoghi ed eventi adatti all'età dei bambini.

- **Partenza:** solo Palermo e solo mamme/famiglie. In futuro: altre città siciliane (Catania, Messina, Siracusa) ed eventuale apertura a un pubblico generale (concerti, palestre, locali).
- **Nome:** MamApp (valutati anche Uappa, Kidoo, Nanomap, FamilyGo).
- **Promessa:** "Trova in un tap laboratori, parchi, locali e attività da fare con i tuoi figli, senza stress."

## 2. Categorie
Parchi e Natura · Laboratori Creativi · Sport & Movimento · Ludoteche e Spazi Gioco · Musei e Cultura · Eventi (spettacoli, teatro) · Musica (aggiunta come categoria semplice) · Dove mangiare / Spazi (ristoranti family-friendly) · Altro.

Dal sondaggio sono emersi anche: corsi (nuoto, inglese, danza…), campus estivi/invernali, feste di compleanno, babysitter/baby-parking, attività mamma-bimbo.
Le **consulenze** (ostetrica, pediatra…) sono state escluse esplicitamente.

## 3. Funzioni chiave
- Ricerca e **filtri**: età (0-12m, 1-3, 3-6, 6+), genere (maschi, femmine, genitore, genitori+figli), tipo di attività (acqua, calcio, pallavolo, altri sport…), zona/quartiere, **fasce orarie**, solo gratuiti. I filtri attivi si rimuovono con la "x".
- **Mappa** stile Immobiliare.it: pin magenta con il prezzo, bolla "14 attività", pulsante "Mostra lista" in basso. Il raggio di ricerca è stato tolto: meglio cercare per zona.
- **Calendario**: i pulsanti "Oggi / Domani / Scegli data" stanno solo qui, non in Home. "Scegli data" apre il calendario.
- **Schede luogo** con le informazioni utili alle mamme: passeggino, fasciatoio, seggioloni, area recintata, orari (es. "8 - 20"), caratteristiche (area giochi, animali…).
- **Rubrica dei parchi di Palermo** (Favorita, Villa Giulia, Villa Trabia, Orto Botanico, Parco Uditore…) con le caratteristiche di ciascuno.
- **Prenotazione** semplice, con meno testo possibile. In seguito: pagamento, biglietti, recensioni verificate, preferiti, notifiche.

## 4. Design (ultime decisioni, le più recenti valgono)
- **Sfondo sempre bianco**, stile "iOS premium", pulito ed elegante, poco testo.
- **Colore principale:** magenta / rosa-lampone *elegante e profondo* per pulsanti, elementi attivi e pin. Niente rosso o fucsia accesi, niente bordeaux o marrone.
- **Colore secondario:** blu petrolio / teal profondo per logo, titoli e icone.
- **Logo:** pin di mappa ad acquerello (magenta → rosa → lilla) con le sagome astratte di una famiglia (due adulti e un bambino).
- **Barra in basso (5 tab):** Home · Mappa · Calendario · Preferiti · Biglietti.
- **Home:** logo a sinistra; a destra lente, filtri e (ultima a destra) icona account → categorie circolari **con foto** → carosello (prima slide "Attività di oggi a Palermo", foto di bambini e non di adulti) → "Attività in evidenza oggi" con frecce destra/sinistra. La parte principale è dedicata ad attività in offerta o sponsorizzate.
- **Pagina categoria** (tutte uguali, sul modello di Parchi): copertina con foto e titolo → pillole delle sottocategorie ("Tutti" attivo) → numero di risultati → elenco di card (miniatura, titolo, zona, etichette, cuore, pulsante ">").
- **Foto:** sempre bambini, mai adulti.

## 5. Modello di business (proposte di Gemini)
- **Nessuna commissione per le mamme.** Pagano le strutture partner.
- Commissione del **10-15%** su ogni prenotazione (il business plan dice invece 5-10%: da decidere).
- **Feste e campus:** caparra in app con una commissione fissa di 10-15 €.
- **Piano "Pro" per le strutture** (29-49 €/mese): più visibilità e commissione ridotta. Spazi "in evidenza" sponsorizzati.
- **Simulazione con 30 partner a Palermo:** circa 2.600 € netti al mese nello scenario realistico.

## 6. Costi, preventivo e fondi
- **Preventivo Quadcom S.r.l.:** 8.442,40 € IVA inclusa (Android 2.400 € + iOS 2.400 € + Web 2.000 € + 120 €/mese). Molto generico: non elenca le funzioni, non indica i tempi e non chiarisce di chi è la proprietà del codice.
- **Stime di Gemini per un marketplace completo:** sviluppo 15-25 k€, progetto totale 35-75 k€, tempi 3-5 mesi.
- **Strategia indicata:** prima Web App / PWA (MVP) con pannello di amministrazione, app native in un secondo momento.
- **Fondi citati:** Fondo Impresa Femminile, Smart&Start, Resto al Sud (Invitalia). Il bando SiLIFE non è adatto. Le regole vanno verificate sui siti ufficiali.

## 7. Stato attuale
- Esiste un prototipo fatto con **Google AI Studio**, modificato finora a colpi di prompt.
- Problemi ricorrenti nelle chat: la mappa non si apre o va in errore, i filtri hanno bug e non scorrono, e ogni nuovo prompt rompeva o rifaceva parti che andavano bene (categorie sparite, colori cambiati).
