Vue.component('my-filter', {
    template: `<form action="#" class="search-form" @submit.prevent="$parent.filter()" >
                    <input type="text" class="search-field" v-model="$parent.userSearch">
                    <button class="btn-search" type="submit">
                        <i class="fas fa-search"></i>
                    </button>
                </form>`
});

