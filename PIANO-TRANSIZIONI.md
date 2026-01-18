# Piano Miglioramento Transizioni - STORM

## Analisi Video (Screen Recording 15:15:01)

### Problemi Identificati

#### 1. Sovrapposizione Caotica (Frame 385, 193)
- Durante la transizione si vedono **ENTRAMBE** le pagine contemporaneamente
- Testi sovrapposti: "Il Paradiso" + "La tempesta continua" + "La battaglia..."
- Cross-fade attuale mostra entrambe le pagine invece di transizione fluida

#### 2. Transizione Ritorno Peggiore
- Frame 193: "Teatro" + "sta continua" sovrapposti
- Il ritorno indietro è più caotico dell'andata

#### 3. Cambio Colore Brutale
- Bordeaux (Teatro) → Bianco (dettaglio) crea "abbaglio"
- La sovrapposizione dei due colori crea un rosa/trasparente sgradevole

#### 4. Immagini a Cascata
- Le immagini si caricano dopo la transizione
- Crea effetto "pop-in" visibile

---

## Soluzioni Proposte

### Soluzione A: Overlay Durante Transizione
Aggiungere un layer nero/bianco semi-trasparente che copre durante la transizione:
```css
::view-transition-old(root) {
  animation: fade-out 300ms ease-out;
}
::view-transition-new(root) {
  animation: fade-in 300ms ease-in 300ms; /* delay! */
}
```
**Pro**: Nasconde sovrapposizione
**Contro**: Più lento (600ms totali)

### Soluzione B: Fade Sequenziale (Non Sovrapposto)
Prima fade-out completo, poi fade-in:
- Vecchia pagina: 0-300ms fade out
- Nuova pagina: 300-600ms fade in
- Le due pagine NON si vedono mai insieme

**Pro**: Nessuna sovrapposizione
**Contro**: Transizione più lunga, momento "vuoto"

### Soluzione C: Scrim Colorato
Usare un colore intermedio durante la transizione:
```css
::view-transition-group(root) {
  background: #1a1a1a; /* scuro neutro */
}
```
**Pro**: Maschera il cambio colore
**Contro**: Aggiunge un "flash" di colore

### Soluzione D: Ridurre Opacità Massima
Non fare mai 100% opacità su entrambe:
```css
::view-transition-old(root) {
  animation: fade-to-half 300ms; /* max 50% */
}
::view-transition-new(root) {
  animation: fade-from-half 300ms;
}
```
**Pro**: Più morbido
**Contro**: Potrebbe sembrare "sbiadito"

---

## Raccomandazione

**Soluzione B (Fade Sequenziale)** sembra la migliore per:
- Evitare completamente la sovrapposizione
- Transizione pulita senza "casino"
- Funziona uguale in entrambe le direzioni

### Implementazione Proposta:
```css
/* Fade OUT prima (vecchia pagina) */
::view-transition-old(root) {
  animation-duration: 350ms;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
}

/* Fade IN dopo (nuova pagina) - con DELAY */
::view-transition-new(root) {
  animation-duration: 350ms;
  animation-delay: 250ms; /* inizia quando old è quasi sparita */
  animation-timing-function: ease-in;
  animation-fill-mode: both;
}
```

Durata totale: ~500ms (overlap di 100ms per smoothness)

---

## Checklist Implementazione

- [x] Modificare CSS in `global.css`
- [ ] Testare Teatro → Dettaglio
- [ ] Testare Dettaglio → Teatro (ritorno)
- [ ] Testare tra pagine con colori diversi
- [ ] Verificare immagini non facciano "pop-in"
- [ ] Fare nuovo screen recording
- [ ] Analizzare frame per frame

---

## Implementazione Effettiva (STORM)

### CSS Applicato:
```css
/* Keyframes con blur per transizione più morbida */
@keyframes fade-out-smooth {
  from { opacity: 1; filter: blur(0); }
  to { opacity: 0; filter: blur(2px); }
}

@keyframes fade-in-smooth {
  from { opacity: 0; filter: blur(2px); }
  to { opacity: 1; filter: blur(0); }
}

/* Vecchia pagina: 280ms, esce PRIMA */
::view-transition-old(root) {
  animation: fade-out-smooth 280ms cubic-bezier(0.4, 0, 1, 1) both;
  z-index: 1;
}

/* Nuova pagina: 320ms con 200ms delay, entra DOPO */
::view-transition-new(root) {
  animation: fade-in-smooth 320ms cubic-bezier(0, 0, 0.2, 1) 200ms both;
  z-index: 2;
}

/* Sfondo scuro durante transizione per evitare abbaglio */
::view-transition-group(root) {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
}
```

### Timing:
- **Fade out**: 280ms (veloce)
- **Delay**: 200ms (pausa)
- **Fade in**: 320ms (più lento per smoothness)
- **Totale**: ~520ms

### Extra:
- Leggero **blur** durante transizione per effetto cinematografico
- **Sfondo scuro** durante il momento "vuoto" per evitare abbaglio bianco/colore

---

## Note
- Il problema principale è la **sovrapposizione simultanea** delle due pagine
- La soluzione deve funzionare in **entrambe le direzioni**
- Priorità: **fluidità > velocità**
