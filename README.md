Skriv en sökmotor med HTML, CSS och JavaScript som hämtar sina bilder från Pixabay. Exakt utformning och innehåll är upp till er, men ni måste uppfylla följande krav:

- Användaren ska kunna skriva in en sökterm samt välja färg på bilderna. Det ska också gå att välja "any color" och se bilder oavsett färg.
- Bredvid varje bild ska finnas bildens taggar (bilder på Pixabay har inga titlar) och fotografens namn.
- Det ska finnas knappar för "föregående sida" och "nästa sida" för att navigera mellan sökresultaten. Dessa knappar ska inaktiveras när användaren är på första respektive sista sidan.
- Sökmotorn ska visa 10 bilder i taget.
- Utgå från dokumentationen för Pixabay-API:et för att ta reda på hur API:et används och vad det kan göra.
- Ni behöver en API-nyckel för att använda API:et, vilket ni kan få genom att skapa ett Pixabay-konto (eller koppla ett Google/Facebook-konto).
- I övrigt gäller samma regler och riktlinjer som i föregående uppgift, exempelvis kring semantisk HTML och responsivitet.
Använd inga bibliotek eller ramverk; enbart er egen kod.

##Javascript - funktoionalitet

formatSearchTerms() -klar
    >ta in en sträng ex. "Hallå där världen"
    >retunera "?Hallå+där+världen"
getInput() -klar
    >Hämta data från formuläret
getResults() -klar
    >hämta data från webbsidan
displayResults() -halvklar
    >skapa visa reslutat på webbsidan

datalist id colors -potentielt trasig ...heh
    - välja färg i dropdownmeny
    
button
    submit
        -
        -
    previous&next page
        -klicka till bilderna tar slut
        -ändra färg till mörkare när man bytt sida
        
#CSS - design och responsivitet

rätt font
färgval knappar
