<template>
<aside class="filter">
    <form class="filter__form form" action="#" method="get">
        <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
            <input class="form__input" type="text" name="min-price" value="0">
            <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
            <input class="form__input" type="text" name="max-price" value="12345">
            <span class="form__value">До</span>
        </label>
        </fieldset>

        <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
            <select class="form__select" type="text" name="category">
            <option value="value1">Все категории</option>
            <option value="value2">Футболки</option>
            <option value="value3">Бюстгалтеры</option>
            <option value="value4">Носки</option>
            </select>
        </label>
        </fieldset>

        <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">          
            <li class="check-list__item">
            <label class="check-list__label">
                <input class="check-list__check sr-only" type="checkbox" name="material" value="лен">
                <span class="check-list__desc">
                лен 
                <span>(3)</span>
                </span>
            </label>
            </li>
            <li class="check-list__item">
            <label class="check-list__label">
                <input class="check-list__check sr-only" type="checkbox" name="material" value="хлопок">
                <span class="check-list__desc">
                хлопок 
                <span>(46)</span>
                </span>
            </label>
            </li>
            <li class="check-list__item">
            <label class="check-list__label">
                <input class="check-list__check sr-only" type="checkbox" name="material" value="шерсть">
                <span class="check-list__desc">
                шерсть 
                <span>(20)</span>
                </span>
            </label>
            </li>
            <li class="check-list__item">
            <label class="check-list__label">
                <input class="check-list__check sr-only" type="checkbox" name="material" value="шелк">
                <span class="check-list__desc">
                шелк 
                <span>(30)</span>
                </span>
            </label>
            </li>
        </ul>
        </fieldset>

        <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
            <li class="check-list__item">
            <label class="check-list__label">
                <input class="check-list__check sr-only" type="checkbox" name="collection" value="лето" checked="">
                <span class="check-list__desc">
                лето 
                <span>(2)</span>
                </span>
            </label>
            </li>
            <li class="check-list__item">
            <label class="check-list__label">
                <input class="check-list__check sr-only" type="checkbox" name="collection" value="зима">
                <span class="check-list__desc">
                зима 
                <span>(53)</span>
                </span>
            </label>
            </li>
            <li class="check-list__item">
            <label class="check-list__label">
                <input class="check-list__check sr-only" type="checkbox" name="collection" value="весна">
                <span class="check-list__desc">
                весна 
                <span>(24)</span>
                </span>
            </label>
            </li>
            <li class="check-list__item">
            <label class="check-list__label">
                <input class="check-list__check sr-only" type="checkbox" name="collection" value="осень">
                <span class="check-list__desc">
                осень 
                <span>(30)</span>
                </span>
            </label>
            </li>
        </ul>
        </fieldset>

        <button class="filter__submit button button--primery" type="submit">
        Применить
        </button>
        <button class="filter__reset button button--second" type="button">
        Сбросить
        </button>
    </form>
</aside>
</template>
<script>
//import ColorPicker from "../App/AppColorPicker.vue";
import axios from 'axios'
import { API_BASE } from '@/config'

export default {
    // components: {
    //     ColorPicker
    // },
    data() {
        return {
            currentPriceFrom: 0,
            currentPriceTo: 0,
            currentCategory: 0,
            currentColor: "",
            categoriesData: null,
            colorsData: null,
        }
    },
    props: ['priceFrom', 'priceTo', 'categoryId', 'colorId'],
    watch: {
        priceFrom(value) {
            this.currentPriceFrom = value
        },
        priceTo(value) {
            this.currentPriceTo = value
        },            
        categoryId(value) {
            this.currentCategory = value
        }, 
        colorId(value) {
            this.currentColor = value
        }            
    },
    computed: {
        categories() {
            return this.categoriesData ? this.categoriesData.items : []
        },
        colors() {
            return this.colorsData ? this.colorsData.items : []
        },
    },
    methods: {
        submit() {
            this.$emit("update:priceFrom", this.currentPriceFrom)
            this.$emit("update:priceTo", this.currentPriceTo)
            this.$emit("update:categoryId", this.currentCategory)
            this.$emit("update:colorId", this.currentColor)
        },
        reset() {
            this.$emit("update:priceFrom", 0)
            this.$emit("update:priceTo", 0)
            this.$emit("update:categoryId", 0)
            this.$emit("update:colorId", '')
        },
        loadCategoties() {
            axios.get(API_BASE + 'productCategories',)
            .then(response => this.categoriesData = response.data)
        },
        loadColors() {
            axios.get(API_BASE + 'colors',)
            .then(response => this.colorsData = response.data)
        }
    },
    created() {
        this.loadCategoties()
        this.loadColors()
    },
}
</script>