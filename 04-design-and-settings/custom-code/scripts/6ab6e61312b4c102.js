
  (function(){
    var root=document.getElementById("copyfyQuizSW");
    if(!root||root.dataset.copyfyInit)return;root.dataset.copyfyInit="1";

    var ICONS={
      globe:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M2 12h20M12 2a15.3 15.3 0 0 1 0 20a15.3 15.3 0 0 1 0-20\"/></svg>",
      flask:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 3h6M10 3v6.5L4.5 18a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 9.5V3\"/><path d=\"M7 14h10\"/></svg>",
      save:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z\"/><path d=\"M17 21v-8H7v8M7 3v5h8\"/></svg>",
      building:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2\"/><path d=\"M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01\"/></svg>",
      package:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M16.5 9.4 7.5 4.2M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"/><path d=\"M3.3 7 12 12l8.7-5M12 22V12\"/></svg>",
      boxes:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 1.03 1.71l3 1.8a2 2 0 0 0 2 0L12 19v-5.5l-5-3-4.03 2.42zM7 16.5l-4.74-2.85M7 16.5l5-3M7 16.5v5.17M12 13.5V19l3.97 2.38a2 2 0 0 0 2 0l3-1.8a2 2 0 0 0 1.03-1.71v-3.24a2 2 0 0 0-.97-1.71L17 8.5l-5 3zM17 16.5l-5-3M17 16.5l4.74-2.85M17 16.5v5.17M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2 0z\"/></svg>",
      warehouse:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35a2 2 0 0 1 1.27-1.86l8-3.2a2 2 0 0 1 1.46 0l8 3.2A2 2 0 0 1 22 8.35z\"/><path d=\"M6 18h12M6 14h12M6 22V10h12v12\"/></svg>",
      help:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3\"/><path d=\"M12 17h.01\"/></svg>",
      check:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22 11.08V12a10 10 0 1 1-5.93-9.14\"/><path d=\"m9 11 3 3L22 4\"/></svg>",
      close:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m15 9-6 6M9 9l6 6\"/></svg>",
      gift:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"8\" width=\"18\" height=\"4\" rx=\"1\"/><path d=\"M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7\"/><path d=\"M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5\"/></svg>",
      banknote:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"6\" width=\"20\" height=\"12\" rx=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/><path d=\"M6 12h.01M18 12h.01\"/></svg>",
      coins:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"8\" cy=\"8\" r=\"6\"/><path d=\"M18.09 10.37A6 6 0 1 1 10.34 18M7 6h1v4M16.71 13.88l.7.71-2.82 2.82\"/></svg>",
      gem:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 3h12l4 6-10 13L2 9z\"/><path d=\"M11 3 8 9l4 13 4-13-3-6M2 9h20\"/></svg>"
    };

    var HEAD={title:"🎯 Welche Duplizierungsmethode passt zu dir?",subtitle:"4 Fragen, 30 Sekunden, eine maßgeschneiderte Empfehlung"};

    // Questions : chaque option porte sa valeur d'origine (v), utilisée par computeResult()
    var QUESTIONS=[
      {q:"Was ist dein Hauptziel?",
       opts:[
        {t:"In mehreren Ländern verkaufen — Internationale Expansion",ic:"globe",v:"international"},
        {t:"Eine Testumgebung aufsetzen — Staging / Relaunch",ic:"flask",v:"staging"},
        {t:"Meinen Shop sichern — Datensicherheit",ic:"save",v:"backup"},
        {t:"Einen B2B-Shop starten — Paralleles Großhandelsangebot",ic:"building",v:"b2b"}
       ]},
      {q:"Wie viele Produkte hast du im Shop?",
       opts:[
        {t:"Weniger als 100 — Kleiner Katalog",ic:"package",v:"small"},
        {t:"100 bis 1 000 — Mittlerer Katalog",ic:"boxes",v:"medium"},
        {t:"Mehr als 1 000 — Großer Katalog",ic:"warehouse",v:"large"},
        {t:"Weiß ich noch nicht — Noch nicht festgelegt",ic:"help",v:"unknown"}
       ]},
      {q:"Musst du bestehende Bestellungen übertragen?",
       opts:[
        {t:"Ja, das ist essenziell — Kundenhistorie ist kritisch",ic:"check",v:"orders_yes"},
        {t:"Nein, nicht nötig — Bei null anfangen",ic:"close",v:"orders_no"}
       ]},
      {q:"Wie hoch ist dein monatliches Budget für die Operation?",
       opts:[
        {t:"0 € — Kostenlos — Lösung ohne Kosten",ic:"gift",v:"free"},
        {t:"Weniger als 50 €/Monat — Moderates Budget",ic:"banknote",v:"low"},
        {t:"50 bis 200 €/Monat — Komfortables Budget",ic:"coins",v:"medium_budget"},
        {t:"Keine Grenze — Maßgeschneiderte Lösung OK",ic:"gem",v:"high_budget"}
       ]}
    ];

    var RESULTS={
      markets:{verdict:"ÜBERRASCHENDE EMPFEHLUNG",title:"Du musst wahrscheinlich gar nicht duplizieren",desc:"Um international zu verkaufen, erledigt Shopify Markets in 90 % der Fälle den Job — und zwar besser als eine Duplizierung. Ein einziger Bestand, ein einziges Backoffice, natives Multi-Country-SEO über hreflang. Du umgehst die Duplicate-Content-Falle.",cardTitle:"Was dir Markets ermöglicht",points:["In mehreren Ländern mit lokalen Währungen verkaufen","Geo-spezifische Domains (.fr, .de, .es)","Automatische Preisanpassung pro Markt","Kein Multi-Shop-Wartungsaufwand"]},
      csv:{verdict:"KOSTENLOSE METHODE",title:"Manueller CSV-Export",desc:"Für dein Volumen und dein Budget reicht die native CSV-Methode von Shopify völlig aus. Du exportierst Produkte, Kunden, Blog und Seiten aus dem Admin und importierst sie in den neuen Shop. Plane 2 bis 3 Stunden Arbeit ein.",cardTitle:"Was du bekommst",points:["Gesamtkosten: 0 €","Produkte, Kunden, Blog, Seiten übertragen","Theme herunterladbar und wieder installierbar","Ideal für weniger als 200 Produkte"]},
      duplify:{verdict:"EMPFOHLENE APP",title:"Duplify",desc:"Für dein Volumen und deine Anforderungen ist Duplify die zuverlässigste App. Built-for-Shopify-Badge, einwandfreie Verwaltung von Bildern, Varianten und Weiterleitungen. Setup in 15–30 Minuten, das Klonen läuft im Hintergrund.",cardTitle:"Warum Duplify",points:["Bewertung 4,8/5 im Shopify App Store","Bilder ohne Verluste oder Dubletten","Varianten und Metafelder bleiben erhalten","Reaktionsschneller Support (auf Englisch)"]},
      matrixify:{verdict:"FÜR POWER-USER",title:"Matrixify",desc:"Mit deinem umfangreichen Katalog und deinen Anforderungen ist Matrixify das mächtigste Tool. Es verwaltet Excel-Importe/-Exporte für ganz Shopify, inklusive Bestellungen über API. Fordernde Lernkurve, aber langfristig unschlagbar.",cardTitle:"Was es auszeichnet",points:["Inkrementelle Updates möglich","Bidirektionale Synchronisation zwischen Shops","Bestellimport über API","Bearbeitung von 5 000 Datensätzen in einer einzigen Datei"]},
      copycat:{verdict:"KOSTENLOSER PLAN AUF LEBENSZEIT",title:"CopyCat Store Duplicator",desc:"Für dein Budget und dein Volumen bietet CopyCat einen kostenlosen Plan, der völlig ausreicht. Du klonst Produkte, Seiten und Basis-Theme ohne Abo. Perfekt, wenn du vor dem Investieren testen willst.",cardTitle:"Was du kostenlos bekommst",points:["Klonen von Produkten, Seiten, Basis-Theme","Keine zeitliche Begrenzung","Ideal bis 200 Produkte","Du sparst dir Excel und manuelles CSV"]},
      partner:{verdict:"KOMPLEXE MIGRATION",title:"Shopify Partner",desc:"Um Bestellungen mit einem großen Katalog und solidem Budget zu übertragen, hol dir einen Shopify-Partner-Entwickler. Maßgeschneidertes Skript, saubere API-Migration, komplexe Fälle abgedeckt. Plane 500 bis 3 000 $ je nach Umfang ein.",cardTitle:"Wann es die richtige Option ist",points:["Bestellmigration zwingend erforderlich","Komplexe Metafelder zu erhalten","Umfangreicher und sensibler Katalog","Im Experts Marketplace von Shopify zu finden"]}
    };

    var idx=0,answers=[];
    var stage=document.getElementById("copyfyQuizStage");
    var resultEl=document.getElementById("copyfyQuizResult");
    var qEl=document.getElementById("copyfyQuizQuestion");
    var optsEl=document.getElementById("copyfyQuizOptions");
    var badgeEl=document.getElementById("copyfyQuizBadge");
    var fillEl=document.getElementById("copyfyQuizFill");
    document.getElementById("copyfyQuizHTitle").textContent=HEAD.title;
    document.getElementById("copyfyQuizHSub").textContent=HEAD.subtitle;

    function render(){
      var item=QUESTIONS[idx];
      badgeEl.textContent="Question "+(idx+1)+" / "+QUESTIONS.length;
      fillEl.style.width=Math.round(((idx)/QUESTIONS.length)*100)+"%";
      qEl.textContent=item.q;
      optsEl.innerHTML="";
      item.opts.forEach(function(o){
        var btn=document.createElement("button");
        btn.type="button";btn.className="copyfy-quiz-opt";
        btn.innerHTML='<span class="copyfy-quiz-opt-ic">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';
        btn.addEventListener("click",function(){
          answers[idx]=o.v;
          idx++;
          if(idx<QUESTIONS.length){render();}else{showResult();}
        });
        optsEl.appendChild(btn);
      });
    }

    // Logique de résultat reprise À L'IDENTIQUE de l'ancien quiz (cascade computeResult)
    function computeResult(){
      var objective=answers[0];
      var size=answers[1];
      var orders=answers[2];
      var budget=answers[3];
      if(objective==='international'&&budget!=='high_budget'){return 'markets';}
      if(orders==='orders_yes'&&(budget==='medium_budget'||budget==='high_budget')){return 'partner';}
      if(orders==='orders_yes'){return 'matrixify';}
      if(size==='large'||objective==='b2b'){if(budget==='free')return 'csv';return 'matrixify';}
      if(budget==='free'){if(size==='small'||size==='unknown')return 'copycat';return 'csv';}
      if(size==='small'||size==='unknown'){return 'copycat';}
      return 'duplify';
    }

    function showResult(){
      fillEl.style.width="100%";
      var r=RESULTS[computeResult()];
      document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;
      document.getElementById("copyfyQuizRTitle").textContent=r.title;
      document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;
      document.getElementById("copyfyQuizRCardTitle").textContent=r.cardTitle;
      var ul=document.getElementById("copyfyQuizRPoints");ul.innerHTML="";
      r.points.forEach(function(p){var li=document.createElement("li");li.innerHTML=p;ul.appendChild(li);});
      stage.style.display="none";
      resultEl.className="copyfy-quiz-result copyfy-active";
    }

    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){
      idx=0;answers=[];
      resultEl.className="copyfy-quiz-result";
      stage.style.display="block";
      render();
    });

    render();
  })();
  