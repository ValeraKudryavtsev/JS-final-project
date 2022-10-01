const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        cart: [],
        filtered: [],
        imgCatalog: "../img/",
        userSearch: '',
        show: false
    },
    methods: {
        filter() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    // console.log(error)
                    this.$refs.error.text = error;
                })
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    // console.log(error)
                    this.$refs.error.text = error;
                })
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.$refs.error.text = error;
                })
        },
        delJson(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error))
        },
        addProduct(item) {
            let find = this.cart.find(el => el.id_product === item.id_product);
            if (find) {
                this.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cart.push(prod)
                        }
                    })
            }
        },
        removeProduct(product) {
            let find = this.cart.find(el => el.id_product === product.id_product);
            if (find.quantity > 1) {
                this.putJson(`/api/cart/${find.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            find.quantity--;
                        }
                    })
            } else {
                this.delJson(`/api/cart/${product.id_product}}`, product)
                    .then(data => {
                        if (data.result) {
                            this.cart.splice(this.cart.indexOf(product), 1);
                        } else {
                            console.log('error');
                        }
                    })
            }
        }
    },
    mounted() {
        this.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cart.push(el);
                }
            });
        this.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    }
});