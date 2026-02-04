# Lezioni Apprese - Sessione 20 Gennaio 2026

## Problemi Vercel

### 1. Progetti Multipli Collegati allo Stesso Repo
**Problema**: 3 progetti Vercel collegati al repo Auriga:
- `sito-web-associazione-auriga` (corretto)
- `main` (creato per errore)
- `turni` (collegato al repo sbagliato)

**Conseguenza**: Ogni push = 3-4 deploy, spreco limite giornaliero 100.

**Soluzione**:
- Eliminato progetto `main`
- Scollegato `turni` dal repo Auriga
- Rimasto solo `sito-web-associazione-auriga`

### 2. File .vercel/project.json Locale Obsoleto
**Problema**: Dopo eliminazione progetto Vercel, il file locale puntava ancora al progetto eliminato.

**Errore**: `Your Project was either deleted...`

**Soluzione**: `vercel link --project sito-web-associazione-auriga --yes`

### 3. Deploy Automatici "Canceled"
**Problema**: Push su `production` triggera deploy che vengono cancellati.

**TODO**: Verificare Production Branch su Vercel Dashboard → Settings → Git

---

## Problemi Coordinamento Agent

### 4. BLAZE: Interpretazione Errata del Task
**Task**: "Rimuovi il duplicato de Il Paradiso Dicembre 2025"

**Cosa ha fatto BLAZE**:
1. Ha cercato nel file, trovato UNA entry
2. Ha rimosso quella entry (pensando fosse "il duplicato")
3. Non ha verificato se esistevano effettivamente DUE entry identiche

**Errore BLAZE**: Non ha chiesto chiarimenti quando la situazione non era chiara.

### 5. MASTER: Merge Non Controllato
**Problema**: Ho fatto merge da main a production senza controllare il risultato.

**Conseguenza**: Il merge ha creato un duplicato (stesso evento con data formattata diversamente).

**Lezione**: SEMPRE controllare `git diff` dopo un merge prima di pushare.

### 6. MASTER: Assunzioni Sbagliate
**Problema**: Quando l'utente ha detto "hai tolto entrambi", ho assunto che BLAZE avesse sbagliato senza verificare.

**Conseguenza**: Ho dato istruzioni sbagliate a BLAZE di "ripristinare" un evento, creando il duplicato.

**Lezione**: VERIFICARE sempre prima di dare nuove istruzioni.

---

## Checklist per Prossime Sessioni

### Prima di Delegare a BLAZE
- [ ] Istruzioni CHIARE e SPECIFICHE
- [ ] Specificare cosa MANTENERE, non solo cosa rimuovere
- [ ] Chiedere conferma se il task è ambiguo

### Prima di Merge
- [ ] `git log origin/main..origin/branch` per vedere i commit
- [ ] Dopo merge: `git diff HEAD~1` per vedere le modifiche
- [ ] Controllare file critici manualmente

### Prima di Deploy
- [ ] Verificare `cat .vercel/project.json` punta al progetto giusto
- [ ] Se dubbi: `vercel link --project NOME --yes`
- [ ] Dopo deploy: hard refresh per vedere le modifiche

---

## Comandi Utili

```bash
# Verifica progetti Vercel
vercel project ls

# Verifica link locale
cat .vercel/project.json

# Ricollega progetto
vercel link --project sito-web-associazione-auriga --yes

# Deploy manuale
vercel --prod

# Controlla cosa cambia nel merge
git diff HEAD~1

# Vedi commit da mergare
git log origin/production..origin/main --oneline
```

---

## Modifiche Implementate Oggi

1. ✅ Fix bug card bianche homepage (View Transitions + astro:page-load)
2. ✅ Sfondo bianco privacy/cookie policy
3. ✅ Rimossa legenda categorie timeline eventi
4. ✅ Rimosso duplicato "Il Paradiso Dicembre 2025"
5. ✅ Ridotto padding-top titoli pagine interne (pt-6/pt-10)
6. ✅ Pulizia progetti Vercel (eliminato "main", scollegato "turni")
