<template>
    <article class="content">
        <h1>Informace</h1>
        <p>Sreality Manager (SRM) je webový scraper a prohlížeč inzerátů ze serveru sreality.cz.</p>

        <h2>Aktuálně podporované funkce</h2>
        <ul>
            <li>Periodcké ukládání a aktualize všech inzerátů - neaktualizované inzeráty jsou označeny za smazané</li>
            <li>Filtrování inzerátů</li>
            <li>Zobrazení historie ceny inzerátu</li>
            <li>Pokročilé filtrování podle počtu inzerátů v městech</li>
            <li>Odhadování užitné plochy/plochy pozemku ze strojově nečitelných metadat (název, popis)</li>
            <li>
                Přecházení ze SRM prohlížeče na web sreality.cz a naopak, možnost zobrazení všech informací odkazem na
                api
            </li>
        </ul>

        <h2>Webové rozšíření</h2>
        <ul>
            <li>Webové rozšíření (addon)</li>
            <li>Umožňuje jedním kliknutím přejít z sreality na inzerát na tomto webu</li>
        </ul>

        <a :href="firefox" class="flex">
            <svg
                 xmlns="http://www.w3.org/2000/svg"
                 class="icon icon-tabler icon-tabler-brand-firefox"
                 width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 stroke-width="2"
                 stroke="brown"
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4.028 7.82a9 9 0 1 0 12.823 -3.4c-1.636 -1.02 -3.064 -1.02 -4.851 -1.02h-1.647"></path>
                <path
                      d="M4.914 9.485c-1.756 -1.569 -.805 -5.38 .109 -6.17c.086 .896 .585 1.208 1.111 1.685c.88 -.275 1.313 -.282 1.867 0c.82 -.91 1.694 -2.354 2.628 -2.093c-1.082 1.741 -.07 3.733 1.371 4.173c-.17 .975 -1.484 1.913 -2.76 2.686c-1.296 .938 -.722 1.85 0 2.234c.949 .506 3.611 -.995 4.545 .354c-1.698 .102 -1.536 3.107 -3.983 2.727c2.523 .957 4.345 .462 5.458 -.34c1.965 -1.52 2.879 -3.542 2.879 -5.557c-.014 -1.398 .194 -2.695 -1.26 -4.75">
                </path>
            </svg>
            <span>Odkaz ke stažení pro Firefox</span>
        </a>

        <a class="flex" :href="chrome">
            <svg
                 xmlns="http://www.w3.org/2000/svg"
                 class="icon icon-tabler icon-tabler-brand-chrome"
                 width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 stroke-width="2"
                 stroke="brown"
                 fill="none"
                 stroke-linecap="round"
                 stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <circle cx="12" cy="12" r="9"></circle>
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 9h8.4"></path>
                <path d="M14.598 13.5l-4.2 7.275"></path>
                <path d="M9.402 13.5l-4.2 -7.275"></path>
            </svg>
            <span>Odkaz ke stažení pro Chrome</span>
        </a>

        <h2>Historie verzí</h2>
        <ul>
            <li>
                30.1.2023
                <ul>
                    <li>Web: Detail inzerátu, Název stránky</li>
                    <li>Scraper: Oprava přepisování data smazání - historie smazání je špatně</li>
                </ul>
            </li>
            <li>
                23.11.2022
                <ul>
                    <li>Web: Oprava chyby v řazení</li>
                </ul>
            </li>
            <li>
                14.11.2022
                <ul>
                    <li>Web: Přidáno řazení</li>
                    <li>Web: Filtr je nyní perzistentní - při zachování url adresy zůstane filtr i při obnovení stránky.
                        Lze uložit url pro uložení filtru. Přidáno tlačítko vyčištění filtru.
                    </li>
                    <li>Scraper: Scraper umí u inzerátů, kde není cena uvedena jako cena, nýbrž jako položky Původní
                        cena a Zlevněno, správně rozpoznat cenu.
                    </li>
                </ul>
            </li>
            <li>
                22.10.2022
                <ul>
                    <li>Web: Změna barevného schématu labelů kvůli čitelnosti</li>
                    <li>Scraper: Oprava</li>
                </ul>
            </li>
            <li>
                19.10.2022
                <ul>
                    <li>Web: Oprava filtru slevy</li>
                    <li>Web: Přidání nápověd pro dva prvky</li>
                    <li>Web: Přidání barevných labelů</li>
                </ul>
            </li>
            <li>
                18.10.2022
                <ul>
                    <li>Scraper: Oprava přepisování historie cen novější cenou</li>
                    <li>Scraper: Scraper ověřuje, jestli nějaký smazaný inzerát nebyl znovu objeven</li>
                    <li>Databáze: Oprava nekonzistentních dat</li>
                    <li>Databáze: Vytvoření indexů - id, datum vložení</li>
                    <li>Web: Rozdělení filtrů na cenu na nájem a cenu prodeje</li>
                    <li>Web: Přidání filtrů typu i u inzerátů, které nejsou na byt</li>
                    <li>Web: Lze zobrazit smazané inzeráty</li>
                </ul>
            </li>


        </ul>
    </article>
</template>

<style lang="scss">
.repos {
    display: flex;
    gap: 20px;

    a {
        text-decoration: none;
        color: brown;
        outline: brown solid 1px;
        border-radius: 10px;
        padding: 20px;
    }
}
</style>

<script lang="ts">
/*     <h2>Code</h2>
    <div class="repos">
        <a href="https://github.com/zdenecek/srm-front">Frontend (vue)</a>
        <a href="https://github.com/zdenecek/srm-api">Api (node.js)</a>
        <a href="https://github.com/zdenecek/srm-scraper">Scraper (scrapy)</a>
        <a href="https://github.com/zdenecek/srm-web-extension">Browser addon</a>
    </div> */

import { defineComponent } from "vue";
import { firefoxUrl, chromeUrl } from "@/main";

export default defineComponent({
    name: "About",
    data() {
        return {
            firefox: firefoxUrl,
            chrome: chromeUrl,
        };
    },
});
</script>

<style>
.flex {
    display: flex;
    align-items: center;
    gap: 10px;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>
