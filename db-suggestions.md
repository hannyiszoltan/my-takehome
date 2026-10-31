# Adatbázis struktúra módosítás javaslatok

<!-- ez a fájl egy nem kötelező feladat része -->
1. Hibás városmegnevezés: A cities táblában a 10-es azonosítójú rekord neve Szombathely, miközben az importáló script ehhez az azonosítóhoz Túrkeve mérési adatait rendeli. A város nevét Túrkevére javítanám; a rekord törlése helyett így megőrizhető a mérési adatok kapcsolata.

2. Régiók külön táblában: A régiókat külön regions táblában tárolnám, egyedi névvel. A városokat idegen kulccsal kapcsolnám hozzájuk. Ez lehetővé tenné új régiók felvételét az adatbázisséma módosítása nélkül.

3. Dátumok típusa: A mérési dátumokat BIGINT helyett DATE típussal tárolnám. Ez pontosabban fejezi ki az adatok jelentését, és közvetlenül használhatóvá teszi az adatbázis dátumkezelő műveleteit. Az átállás során ellenőrizném a meglévő értékek érvényességét.

4. Egyediség és indexelés: Mindhárom mérési táblában PRIMARY KEY (city_id, date) összetett elsődleges kulcsot hoznék létre. Ez biztosítaná, hogy egy városhoz egy adott napon táblánként legfeljebb egy mérési rekord tartozzon, és támogatná a város és dátumtartomány szerinti lekérdezéseket. Bevezetése előtt ellenőrizném és szükség esetén rendezném a meglévő duplikációkat.

5. Kapcsolatok integritása: A mérési táblák city_id mezőjét idegen kulccsal kapcsolnám a cities.id mezőhöz, hogy ne kerülhessenek be nem létező városhoz tartozó mérések. A városok régió szerinti kereséséhez a régiót azonosító mezőn is indexet javasolnék.

6. Hiányzó mérési adatok: A forrásadatokban a -999 érték minimum- és maximum-hőmérsékletnél, valamint csapadéknál is előfordul. Ezekben az esetekben a NULL tárolás célszerűbb lenne, a lekérdezésekben erre van megoldás hogy az eredményeket ne torzítsa. A hiányzó adatokat nem helyettesíteném 0-val, mert az is torzítaná az eredményeket.