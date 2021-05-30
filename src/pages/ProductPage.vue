<template>
    <main class="content container" v-if="productLoading">
        <LoaderInfo title="Загрузка товара." />
    </main>
    <main class="content container" v-else-if="!productData">
        <LoaderErrorInfo title='Ошибка при загрузке информации...' v-on:reload="reload"/>
    </main>
    <main class="content container" v-else>
        <div class="content__top">
            <ul class="breadcrumbs">
                <li class="breadcrumbs__item">
                    <router-link class="breadcrumbs__link" :to="{name: 'main'}">
                        Каталог
                    </router-link>
                </li>
                <li class="breadcrumbs__item">
                    <router-link class="breadcrumbs__link" :to="{name: 'main'}">
                        {{ category.title }}
                    </router-link>
                </li>
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link">{{ product.title }}</a>
                </li>
            </ul>
        </div>

        <section class="item">
        <div class="item__pics pics">
            <div class="pics__wrapper">
                <img width="570" height="570" :src="currentImage" alt="product.title">
            </div>
            <ul class="pics__list">
                <li class="pics__item" v-for="image in images" :key="image">
                    <a href="" class="pics__link pics__link--current">
                    <img width="98" height="98" :src="image" alt="product.title">
                    </a>
                </li>
            </ul>
        </div>

        <div class="item__info">
            <span class="item__code">Артикул: {{ product.id }} </span>
            <h2 class="item__title">
                {{ product.title }}
            </h2>
            <div class="item__form">
            <form class="form" action="#" method="POST" @submit.prevent="addToCart">
                <div class="item__row item__row--center">
                    <AppCounter :amount.sync="productAmount"/>
                    <b class="item__price">
                        {{ product.price }} ₽
                    </b>
                </div>

                <div class="item__row">
                <fieldset class="form__block">
                    <legend class="form__legend">Цвет</legend>
                    <ColorPicker class="colors colors--black" :colors="colors" :currentColor.sync="currentColor"/>
                </fieldset>


                <fieldset class="form__block">
                    <legend class="form__legend">Размер</legend>
                    <label class="form__label form__label--small form__label--select">
                    <select class="form__select" type="text" name="category" v-model="sizeId">
                        <option :value="size.id" v-for="size in product.sizes" :key="size.id">{{ size.title }}</option>
                    </select>
                    </label>
                </fieldset>
                </div>
                
                <button class="item__button button button--primery" type="submit" :disabled="productAddSending">
                    В корзину
                </button>
            </form>
            </div>
        </div>

        <div class="item__desc">
            <ul class="tabs">
            <li class="tabs__item">
                <a class="tabs__link tabs__link--current">
                Информация о товаре
                </a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#">
                Доставка и возврат
                </a>
            </li>
            </ul>

            <div class="item__content">
            <h3>Состав:</h3>
            
            <p>
                60% хлопок<br>
                30% полиэстер<br>
            </p>
            
            <h3>Уход:</h3>

            <p>
                Машинная стирка при макс. 30ºC короткий отжим<br>
                Гладить при макс. 110ºC<br>
                Не использовать машинную сушку<br>
                Отбеливать запрещено<br>
                Не подвергать химчистке<br>
            </p>
    
            </div>
        </div>
        </section>
    </main>

</template>
    <!-- <main class="content container" v-else>


        <section class="item">
            <div class="item__pics pics">
                <div class="pics__wrapper">
                    <img width="570" height="570" :src="product.image" :alt="product.title">
                </div>
            </div>

            <div class="item__info">
                <span class="item__code">Артикул: {{ product.id }}</span>
                <h2 class="item__title">
                    {{ product.title }}
                </h2>
                <div class="item__form">
                    <form class="form" action="#" method="POST" @submit.prevent="addToCart">
                        <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

                        <fieldset class="form__block">
                            <legend class="form__legend">Цвет:</legend>
                            <ColorPicker class="colors" :colors="colors" :currentColor.sync="currentColor"/>
                        </fieldset>

                        <fieldset class="form__block">
                            <legend class="form__legend">Объемб в ГБ:</legend>

                            <ul class="sizes sizes--primery">
                                <li class="sizes__item">
                                    <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                                </li>
                                <li class="sizes__item">
                                    <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                                </li>
                                <li class="sizes__item">
                                    <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128" checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                                </li>
                            </ul>
                        </fieldset>

                        <div class="item__row">
                            <AppCounter :amount.sync="productAmount"/>
                            <button class="button button--primery" type="submit" :disabled="productAddSending">
                                В корзину
                            </button>
                            <div v-show="productAdded">Товар добавлен в корзину.</div>
                        </div>    
                        <div v-if="productAddSending">
                            <LoaderInfo title="Добавление в корзину"/>
                        </div>

                    </form>
                </div>
            </div>

            <div class="item__desc">
                <ul class="tabs">
                    <li class="tabs__item">
                        <a class="tabs__link tabs__link--current">
              Описание
            </a>
                    </li>
                    <li class="tabs__item">
                        <a class="tabs__link" href="#">
              Характеристики
            </a>
                    </li>
                    <li class="tabs__item">
                        <a class="tabs__link" href="#">
              Гарантия
            </a>
                    </li>
                    <li class="tabs__item">
                        <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
                    </li>
                </ul>

                <div class="item__content">
                    <p>
                        Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br> Синхронизация со смартфоном<br> Связь по Bluetooth Smart, ANT+ и Wi-Fi<br> Поддержка сторонних приложений<br>
                    </p>

                    <a href="#">
            Все характеристики
          </a>

                    <h3>Что это?</h3>

                    <p>
                        Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+, объединяя полученную с них информацию. Данные отображаются
                        на дисплее, а также сохраняются на смартфоне. При этом на мобильное устройство можно установить как фирменное приложение, так и различные приложения сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая
                        сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
                    </p>

                    <h3>Дизайн</h3>

                    <p>
                        Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю
                        56 мм. На дисплей выводятся координаты и скорость, а также полученная со смартфона и синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки). Корпус
                        велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
                    </p>
                </div>
            </div>
        </section>
    </main> -->

<script>
import AppCounter from '@/components/App/AppCounter.vue'
import ColorPicker from "@/components/App/AppColorPicker.vue";
import LoaderInfo from '@/components/Loaders/LoaderInfo.vue'
import LoaderErrorInfo from '@/components/Loaders/LoaderErrorInfo.vue'
import gotoPage from '@/helpers/gotoPage'
import numberFormat from '@/helpers/numberFormat'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: { AppCounter, ColorPicker, LoaderInfo, LoaderErrorInfo },
    data() {
        return {
            productAmount: 1,
            currentColor: '',
            sizeId: '',
            productAdded: false,
            productAddSending: false,
        }
    },
    filters: {
        numberFormat
    },
    computed: {
        ...mapGetters("product", {productData: "getProductData", productLoading: "getProductLoading"}),
        colors() {
            return this.productData ? this.productData.colors : []
        },
        product() {
            // return this.productData ? { ...this.productData,
            //         image: this.productData.image.file.url } : null
            return this.productData
        },
        category() {
            return this.productData.category
        },
        currentColorId() {
            if (this.productData) {
                return this.productData.colors.find(color => { return color.id === this.currentColor}) 
            }  else { return null; }
        },
        currentImage() {
            let color = this.currentColorId
            if (color) {
                return color.gallery[0].file.url
            } else { return null; }
        },    
        images() {
            let images = []
            let color = this.currentColorId 
            if (color)
                color.gallery.forEach(item => { images.push(item.file.url) })
            return images
        }
    },
    methods: {
        ...mapActions("cart", ['addProductToCart']),
        ...mapActions("product", ['loadProduct']),
        gotoPage,
        addToCart() {
            this.productAdded = false
            this.productAddSending = true
            this.addProductToCart(
                { productId: this.product.id, colorId: this.currentColorId.color.id, 
                  sizeId: this.sizeId, quantity: this.productAmount })
                .then(() => {
                    this.productAdded = true
                    this.productAddSending = false
                })
                .catch(() => {
                    this.productAdded = false
                    this.productAddSending = false
                })
        },
        reload() {
            this.loadProduct(this.$route.params.id)      
            
        }
    },
    watch: {
        productData() {
            if (this.productData)
                this.currentColor = this.productData.colors[0].id
        },
        '$route.params.id': {
            handler() {
                this.reload()
                //this.loadProduct(this.$route.params.id)
                // if (!this.product) {
                //     this.$router.replace({name: 'notFound', params: { '0': '/' }})
                // }
            },
            immediate: true    
        },
    },
}
</script>