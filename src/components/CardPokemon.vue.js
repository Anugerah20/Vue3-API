import { ref, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// State untuk menyimpan daftar Pokemon
const pokemons = ref([]);
// State untuk pencarian pokemon
const searchQuery = ref("");
// State untuk pagination
const currentPage = ref(1); // Halaman aktif
const limit = ref(10); // Batasan jumlah data per halaman
const totalPages = ref(0); // Total semua halaman
// Function next page pagination
const handleNextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        getPokemon();
    }
};
// Function previous page pagination
const handlePrevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        getPokemon();
    }
};
// Fungsi untuk fetch data Pokemon dengan URL gambar langsung
const getPokemon = async () => {
    try {
        // Menghitung offset data pagination
        const offset = (currentPage.value - 1) * limit.value;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit.value}&offset=${offset}`);
        const data = await response.json();
        totalPages.value = Math.ceil(data.count / limit.value);
        // Fetch detail pokemon untuk mendapatkan URL Gambar
        const pokemonDetails = await Promise.all(data.results.map(async (pokemon) => {
            const responseDetail = await fetch(pokemon.url);
            const detail = await responseDetail.json();
            return {
                name: pokemon.name,
                url: pokemon.url,
                image: detail.sprites.front_default,
            };
        }));
        // console.log(pokemonDetails);
        pokemons.value = pokemonDetails;
    }
    catch (error) {
        console.error("Error fetching Pokemon data:", error);
    }
};
// Fetch data saat komponen dimuat
onMounted(() => {
    getPokemon();
});
// Search Pokemon by name
const searchPokemon = computed(() => {
    return pokemons.value.filter((pokemon) => pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("max-w-7xl mx-auto mb-10 px-5") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col justify-between items-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ ...{ class: ("flex w-40 h-40 lg:w-52 lg:h-52 md:w-48 md:h-48 object-contain") }, src: ("../assets/pokeapi.png"), alt: ("Pokemon"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("text"), value: ((__VLS_ctx.searchQuery)), required: (true), ...{ class: ("input-search") }, placeholder: ("Search pokemon..."), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4") }, });
    for (const [pokemon] of __VLS_getVForSourceType((__VLS_ctx.searchPokemon))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((pokemon.name)), ...{ class: ("border rounded-lg p-4 text-center shadow gap-x-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((pokemon.image)), alt: ((pokemon.name)), ...{ class: ("w-48 h-48 object-content mx-auto mb-2") }, });
        const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ to: ((`/detail-pokemon/${pokemon.name}`)), }));
        const __VLS_2 = __VLS_1({ to: ((`/detail-pokemon/${pokemon.name}`)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-lg font-semibold mb-5") }, });
        (pokemon.name);
        __VLS_nonNullable(__VLS_5.slots).default;
        var __VLS_5;
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-end items-center mt-5 gap-5") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.handlePrevPage) }, ...{ class: (([
                'btn-detail',
                __VLS_ctx.currentPage === 1
                    ? 'flex gap-x-1 items-center bg-gray-400 text-white cursor-no-drop'
                    : 'flex gap-x-1 items-center bg-slate-800 text-white',
            ])) }, disabled: ((__VLS_ctx.currentPage === 1)), });
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.Icon;
    /** @type { [typeof __VLS_components.Icon, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ icon: ("flowbite:angle-left-outline"), }));
    const __VLS_8 = __VLS_7({ icon: ("flowbite:angle-left-outline"), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-black font-bold") }, });
    (__VLS_ctx.currentPage);
    (__VLS_ctx.totalPages);
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.handleNextPage) }, ...{ class: (([
                'btn-detail',
                __VLS_ctx.currentPage === __VLS_ctx.totalPages
                    ? 'flex gap-x-1 items-center bg-gray-400 text-white cursor-no-drop'
                    : 'flex gap-x-1 items-center bg-slate-800 text-white',
            ])) }, disabled: ((__VLS_ctx.currentPage === __VLS_ctx.totalPages)), });
    const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.Icon;
    /** @type { [typeof __VLS_components.Icon, ] } */
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ icon: ("flowbite:angle-right-outline"), }));
    const __VLS_14 = __VLS_13({ icon: ("flowbite:angle-right-outline"), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_styleScopedClasses['max-w-7xl'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['mb-10'];
    __VLS_styleScopedClasses['px-5'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['w-40'];
    __VLS_styleScopedClasses['h-40'];
    __VLS_styleScopedClasses['lg:w-52'];
    __VLS_styleScopedClasses['lg:h-52'];
    __VLS_styleScopedClasses['md:w-48'];
    __VLS_styleScopedClasses['md:h-48'];
    __VLS_styleScopedClasses['object-contain'];
    __VLS_styleScopedClasses['input-search'];
    __VLS_styleScopedClasses['grid'];
    __VLS_styleScopedClasses['grid-cols-1'];
    __VLS_styleScopedClasses['lg:grid-cols-3'];
    __VLS_styleScopedClasses['md:grid-cols-2'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['shadow'];
    __VLS_styleScopedClasses['gap-x-4'];
    __VLS_styleScopedClasses['w-48'];
    __VLS_styleScopedClasses['h-48'];
    __VLS_styleScopedClasses['object-content'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-5'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-end'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['mt-5'];
    __VLS_styleScopedClasses['gap-5'];
    __VLS_styleScopedClasses['btn-detail'];
    __VLS_styleScopedClasses['text-black'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['btn-detail'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Icon: Icon,
            searchQuery: searchQuery,
            currentPage: currentPage,
            totalPages: totalPages,
            handleNextPage: handleNextPage,
            handlePrevPage: handlePrevPage,
            searchPokemon: searchPokemon,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
