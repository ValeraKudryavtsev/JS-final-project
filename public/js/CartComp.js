Vue.component('cart', {
    props: ['cart', 'visible'],
    template: `<ul class="cart__list" v-show="visible">
                    <li class="cart__item">
                        <h2 class="cart__item-heading">Ваша корзина</h2>
                    </li>
                    <li class="cart__item" v-if="cart.length < 1">
                        <p class="cart__message">Корзина пуста</p>
                    </li>
                    <cartItem v-for="item of cart"
                    :cartItem="item">
                    :visible="visible"
                    </cartItem>
                </ul>`
});

Vue.component('cartItem', {
    props: ['cartItem', 'visible'],
    template: `<li class="cart__item">
                    <div class="cart__item-box1">
                        <div class="cart__img-box">
                            <img class="cart__img" :src="cartItem.img" alt="Product img" />
                        </div>
                        <div class="cart__item-info">
                            <h3 class="cart__item-title">{{ cartItem.product_name }}</h3>
                            <p class="cart__item-price">$\{{ cartItem.price }}</p>
                            <p class="cart__item-count">Quantity: {{ cartItem.quantity }}</p>
                        </div>
                    </div>
                    <div class="cart__item-box2">
                        <p class="cart__item-sum">$\{{ cartItem.price * cartItem.quantity }}</p>
                        <button :v-show="visible" class="cart__item-remove" type="button"
                            @click="$parent.$emit('remove-product', cartItem)">
                            &times;
                        </button>
                    </div>
                </li>`
});