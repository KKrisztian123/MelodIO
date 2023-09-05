# MelodIO zene streaming alkalmazás

Zene streaming alkalmazás webre és androidra Ionic React segítségével.

## Útmutató

Az utasítások segítségével a felállíthatod a projektet fejlesztési és tesztelési célokra. A projekt production verziójának futtatásához lásd a Deployment részt.

### Előfeltételek

A webes felület működéséhez docker szükséges, valamint az app működéséhez node.

**Admin fiók adatai:**
email: admin@melodio.com
jelszó: 123321

### Telepítés

Útmutató lépésről lépésre a fejlesztői környezet futtatására.
A fejlesztői környezet megfelelő működéséhez a projektmappának wsl-ben kell lennie.

Frontend modulok telepítése

```
cd frontend
npm i
```

Backend modulok telepítése

```
cd backend
npm i
```

Projekt elindítása dockerben.

```
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

Az alkalmazás elérhető a 80-as porton.

## Deployment

Webes felület és backend szolgáltatás elindítása.

```
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

Az alkalmazás elérhető a 80-as porton.

### Android verzió

Frissítsd és indítsd el az android projektet:

```
cd frontend
npm run build
npx cap sync
npx cap open android
```

Készítsd el az app bundlet Android Studioban.