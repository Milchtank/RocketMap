$(function () {
    'use strict'


    /* Settings. */

    const scaleByRarity = true // Enable scaling by rarity. Default: true.
    const upscalePokemon = false // Enable upscaling of certain Pokemon (upscaledPokemon and notify list). Default: false.
    const upscaledPokemon = [1, 2, 3, 4, 5, 6, 7, 8, 9, 29, 30, 31, 32, 33, 34, 43, 44, 45, 63, 64, 65, 66, 67, 68, 69, 70, 71, 74, 75, 76, 83, 88, 89, 91, 92, 93, 94, 95, 102, 103, 106, 107, 111, 112, 113, 114, 115, 116, 117, 123, 128, 129, 130, 131, 132, 133, 134, 135, 136, 138, 139, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 172, 173, 174, 175, 176, 179, 180, 181, 182, 191, 192, 196, 197, 199, 201, 205, 208, 212, 214, 216, 217, 222, 225, 230, 231, 232, 233, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251] // Add Pokémon IDs separated by commas (e.g. [1, 2, 3]) to upscale icons.

    // Google Analytics property ID. Leave empty to disable.
    // Looks like 'UA-XXXXX-Y'.
    const analyticsKey = ''

    // MOTD.
    const motdEnabled = true
    const motdTitle = 'Willkommen'
    const motd = 'Hoi Willkommen auf der Milchmap. Ich wünsche dir viel Spass:) Eine Spende nicht vergessen;)'

    // Only show every unique MOTD message once. If disabled, the MOTD will be
    // shown on every visit. Requires support for localStorage.
    // Updating only the MOTD title (and not the text) will not make the MOTD
    // appear again.
    const motdShowOnlyOnce = false

    // What pages should the MOTD be shown on? By default, homepage and mobile
    // pages.
    const motdShowOnPages = [
        '/',
        '/mobile'
    ]

    // Clustering! Different zoom levels for desktop vs mobile.
    const disableClusters = true // Default: false
    const maxClusterZoomLevel = 14 // Default: 14
    const maxClusterZoomLevelMobile = 14 // Default: same as desktop
    const clusterZoomOnClick = true // Default: false
    const clusterZoomOnClickMobile = true // Default: same as desktop
    const clusterGridSize = 60 // Default: 60
    const clusterGridSizeMobile = 60 // Default: same as desktop

    // Process Pokémon in chunks to improve responsiveness.
    const processPokemonChunkSize = 100 // Default: 100
    const processPokemonIntervalMs = 100 // Default: 100ms
	
	$(function () {
    'use strict'
const excluded_Pokemon = [165, 46, 198, 167, 14, 161, 10, 13, 17, 16, 11, 20, 19, 21] // Add Pokémon IDs separated by commas (e.g. [1, 2, 3])

const remember_select_exclude = Store.get('remember_select_exclude')
const new_Exclude_List = remember_select_exclude.concat( excluded_Pokemon )
Store.set('remember_select_exclude', new_Exclude_List )
const disableClusters = true // Default: false

})


    /* Feature detection. */

    const hasStorage = (function () {
        var mod = 'RocketMap'
        try {
            localStorage.setItem(mod, mod)
            localStorage.removeItem(mod)
            return true
        } catch (exception) {
            return false
        }
    }())


    /* Do stuff. */

    const currentPage = window.location.pathname


    // Set custom Store values.
    Store.set('maxClusterZoomLevel', maxClusterZoomLevel)
    Store.set('clusterZoomOnClick', clusterZoomOnClick)
    Store.set('clusterGridSize', clusterGridSize)
    Store.set('processPokemonChunkSize', processPokemonChunkSize)
    Store.set('processPokemonIntervalMs', processPokemonIntervalMs)
    Store.set('scaleByRarity', scaleByRarity)
    Store.set('upscalePokemon', upscalePokemon)
    Store.set('upscaledPokemon', upscaledPokemon)

    if (typeof window.orientation !== 'undefined' || isMobileDevice()) {
        Store.set('maxClusterZoomLevel', maxClusterZoomLevelMobile)
        Store.set('clusterZoomOnClick', clusterZoomOnClickMobile)
        Store.set('clusterGridSize', clusterGridSizeMobile)
    }

    if (disableClusters) {
        Store.set('maxClusterZoomLevel', -1)
    }

    // Google Analytics.
    if (analyticsKey.length > 0) {
        window.ga = window.ga || function () {
            (ga.q = ga.q || []).push(arguments)
        }
        ga.l = Date.now
        ga('create', analyticsKey, 'auto')
        ga('send', 'pageview')
    }

    // Show MOTD.
    if (motdEnabled && motdShowOnPages.indexOf(currentPage) !== -1) {
        let motdIsUpdated = true

        if (hasStorage) {
            const lastMOTD = window.localStorage.getItem('lastMOTD') || ''

            if (lastMOTD === motd) {
                motdIsUpdated = false
            }
        }

        if (motdIsUpdated || !motdShowOnlyOnce) {
            window.localStorage.setItem('lastMOTD', motd)

            swal({
                title: motdTitle,
                text: motd
            })
        }
    }
})
