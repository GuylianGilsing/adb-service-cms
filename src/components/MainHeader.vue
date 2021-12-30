<template>
    <header id="main-header" class="header container">
        <router-link to="/" class="header__logo">AttractionsDatabase</router-link>
        <nav class="header__nav">
            <ul class="header__links">
                <li class="header__link" v-for="link in header.links" :key="link.id">
                    <router-link :to="link.url">{{ link.name }}</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'MainHeader',
    data()
    {
        return {
            header: {
                links: [
                    {
                        id: 1,
                        name: 'Dashboard',
                        url: '/'
                    },
                    {
                        id: 2,
                        name: 'Rollercoasters',
                        url: '/rollercoasters'
                    },
                    {
                        id: 3,
                        name: 'Dark rides',
                        url: '/dark-rides'
                    },
                ]
            }
        }
    }
}
</script>
