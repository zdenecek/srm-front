<template>
    <h1>Informace</h1>
    <p>
        Sreality manager je webový scraper inzerátů ze serveru sreality.cz.
    </p>
    <h2>
        Aktuálně podporované funkce
    </h2>

        <ul>
            <li>Periodcké ukládání a aktualize všech inzerátů</li>
            <li>Vyhledávání v textu inzerátů</li>
            <li>Zobrazení historie ceny inzerátu</li>
        </ul>


    <h2>Code</h2>
    <div class="repos">
        <a href="https://github.com/zdenecek/srm-front">Frontend (vue)</a>
        <a href="https://github.com/zdenecek/srm-api">Api (node.js)</a>
        <a href="https://github.com/zdenecek/srm-scraper">Scraper (scrapy)</a>
        <a href="https://github.com/zdenecek/srm-web-extension">Browser addon</a>
    </div>
    <h2>Todolist funkcí</h2>
    <div class="roadmap">
        <h3>Data analysis</h3>
        <ul>
            <li>Get square meters from text</li>
            <li>Monitor time a listing stays on -> further analysis</li>
            <li>Seen/not seen listings (?)</li>
            <li>New listings</li>
        </ul>

        <h3>User options</h3>
        <ul>
            <li>seen/unseen listings</li>
            <li>show new listings</li>
            <li>scraper history in app</li>
            <li>log scraper actions to db and show them in app</li>
        </ul>

        <h3>Smarter scraper</h3>
        <ul>
            <li>update only on price update ofter</li>
            <li>delete/mark old listings</li>
            <li>two update modes / two browsing modes</li>
        </ul>

        <h3>Images</h3>
        <ul>
            <li>use gallery images, show view on click (quicker loads, ability to view full image, browse even)</li>
        </ul>

        <h3>Searching and filtering</h3>
        <ul>
            <li>add many more filters</li>
        </ul>

        <h3>Migration</h3>
        <ul>
            <li> Migrate to VPS</li>
        </ul>
    </div>
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
import { defineComponent } from "vue";

export default defineComponent({
    name: "About",
});
</script>
