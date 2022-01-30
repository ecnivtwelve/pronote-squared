const express = require('express');
const pronote = require('@dorian-eydoux/pronote-api');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Parameters are missing');
});

app.get('/data', function (req, res) {
  const url = req.query.url;
  const username = req.query.username;
  const password = req.query.password;
  const cas = req.query.cas;
  
  async function main()
  {
      let session = await pronote.login(url, username, password, cas);
    
      let timetable = await session.timetable();
    
      var data = {nom:session.user.name, classe:session.user.studentClass.name, nbCours:timetable.length, avatar:session.user.avatar, establishment:session.user.establishement};
      res.send(data);
  }

  main().catch(err => {
      if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
          res.send('Mauvais identifiants');    
      } else {
          res.send(err);
      }
  });
})

app.get('/all', function (req, res) {
    const url = req.query.url;
    const username = req.query.username;
    const password = req.query.password;
    const cas = req.query.cas;
    
    async function main()
    {
        let session = await pronote.login(url, username, password, cas);
        let timetable = await session.timetable();
        let marks = await session.marks();
        let homeworks = await session.homeworks();
        let absences = await session.absences();
        let infos = await session.infos();
      
        var data = {nom:session.user.name, classe:session.user.studentClass.name, nbCours:timetable.length, avatar:session.user.avatar, establishment:session.user.establishement};

        var finalData = {data: data, timetable: timetable, marks: marks, homeworks: homeworks, absences: absences, infos: infos}
        res.send(finalData);
    }
  
    main().catch(err => {
        if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
            res.send('Mauvais identifiants');    
        } else {
            res.send(err);
        }
    });
})

app.get('/timetable', function (req, res) {
    const url = req.query.url;
    const username = req.query.username;
    const password = req.query.password;
    const cas = req.query.cas;
    
    async function main()
    {
        let session = await pronote.login(url, username, password, cas);

        let timetable = await session.timetable(new Date(Date.now()));
        let timetable1 = await session.timetable(new Date(Date.now() + 3600 * 1000 * 24));
        let timetable2 = await session.timetable(new Date(Date.now() + 3600 * 1000 * 24 * 2));
        let timetable3 = await session.timetable(new Date(Date.now() + 3600 * 1000 * 24 * 3));

        var finalData = [timetable, timetable1, timetable2, timetable3]
        res.send(finalData);
    }
  
    main().catch(err => {
        if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
            res.send('Mauvais identifiants');    
        } else {
            res.send(err);
        }
    });
  })

  app.get('/marks', function (req, res) {
    const url = req.query.url;
    const username = req.query.username;
    const password = req.query.password;
    const cas = req.query.cas;
    
    async function main()
    {
        let session = await pronote.login(url, username, password, cas);
      
        let marks = await session.marks();

        res.send(marks);
    }
  
    main().catch(err => {
        if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
            res.send('Mauvais identifiants');    
        } else {
            res.send(err);
        }
    });
  })

  app.get('/homeworks', function (req, res) {
    const url = req.query.url;
    const username = req.query.username;
    const password = req.query.password;
    const cas = req.query.cas;
    
    async function main()
    {
        let session = await pronote.login(url, username, password, cas);

        let timetable = await session.homeworks(new Date(Date.now()));
        let timetable1 = await session.homeworks(new Date(Date.now() + 3600 * 1000 * 24));
        let timetable2 = await session.homeworks(new Date(Date.now() + 3600 * 1000 * 24 * 2));
        let timetable3 = await session.homeworks(new Date(Date.now() + 3600 * 1000 * 24 * 3));

        var finalData = [timetable, timetable1, timetable2, timetable3]
        res.send(finalData);
    }
  
    main().catch(err => {
        if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
            res.send('Mauvais identifiants');    
        } else {
            res.send(err);
        }
    });
  })

  app.get('/contents', function (req, res) {
    const url = req.query.url;
    const username = req.query.username;
    const password = req.query.password;
    const cas = req.query.cas;
    
    async function main()
    {
        let session = await pronote.login(url, username, password, cas);
        let contents = await session.contents();

        res.send(contents);
    }
  
    main().catch(err => {
        if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
            res.send('Mauvais identifiants');    
        } else {
            res.send(err);
        }
    });
  })

  app.get('/absences', function (req, res) {
    const url = req.query.url;
    const username = req.query.username;
    const password = req.query.password;
    const cas = req.query.cas;
    
    async function main()
    {
        let session = await pronote.login(url, username, password, cas);
        let absences = await session.absences();

        res.send(absences);
    }
  
    main().catch(err => {
        if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
            res.send('Mauvais identifiants');    
        } else {
            res.send(err);
        }
    });
  })

  app.get('/infos', function (req, res) {
    const url = req.query.url;
    const username = req.query.username;
    const password = req.query.password;
    const cas = req.query.cas;
    
    async function main()
    {
        let session = await pronote.login(url, username, password, cas);
        let infos = await session.infos();

        res.send(infos);
    }
  
    main().catch(err => {
        if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
            res.send('Mauvais identifiants');    
        } else {
            res.send(err);
        }
    });
  })

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});
