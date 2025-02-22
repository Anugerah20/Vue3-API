import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// Ambil route dan router dan nama pokemon
const route = useRoute();
const router = useRouter();
const detailPokemonName = ref(route.params.name);
// Debugging
// console.log("Pokemon Name from Route:", detailPokemonName.value);
const pokemonDetail = ref(null);
// Fungsi untuk fetch detail Pokemon
const fetchPokemonDetail = async () => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${detailPokemonName.value}`);
        const data = await response.json();
        pokemonDetail.value = data;
        console.log("Detail pokemon", data);
    }
    catch (error) {
        console.error("Error fetching Pokémon details:", error);
    }
};
// Jalankan saat komponen dimuat
onMounted(() => {
    fetchPokemonDetail();
    // Debugging route params
    // console.log("Route params:", route.params);
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
    if (__VLS_ctx.pokemonDetail) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("max-w-4xl mx-auto p-2 mt-10 border-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.pokemonDetail)))
                        return;
                    __VLS_ctx.router.back();
                } }, href: ("/"), ...{ class: ("underline focus:font-bold") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-center") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.pokemonDetail.sprites.front_default)), alt: ((__VLS_ctx.pokemonDetail.name)), ...{ class: ("w-40 h-40 mx-auto") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-2xl font-bold mb-5") }, });
        (__VLS_ctx.pokemonDetail.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-wrap flex-col justify-center") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-center items-center gap-x-5 my-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.pokemonDetail.height);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.pokemonDetail.weight);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-center items-center gap-x-5 my-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("flex flex-col") }, });
        for (const [type] of __VLS_getVForSourceType((__VLS_ctx.pokemonDetail.types))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((type.type.name)), });
            (type.type.name);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("flex flex-col") }, });
        for (const [ability] of __VLS_getVForSourceType((__VLS_ctx.pokemonDetail.abilities))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((ability.ability.name)), });
            (ability.ability.name);
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("flex justify-center items-center min-h-screen") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-center animate-bounce") }, });
    }
    __VLS_styleScopedClasses['max-w-4xl'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['mt-10'];
    __VLS_styleScopedClasses['border-2'];
    __VLS_styleScopedClasses['underline'];
    __VLS_styleScopedClasses['focus:font-bold'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['w-40'];
    __VLS_styleScopedClasses['h-40'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-5'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['gap-x-5'];
    __VLS_styleScopedClasses['my-2'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['gap-x-5'];
    __VLS_styleScopedClasses['my-2'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['min-h-screen'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['animate-bounce'];
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
            router: router,
            pokemonDetail: pokemonDetail,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
