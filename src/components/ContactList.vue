<script>
export default {
    props: {
        contacts: {
            type: Array,
            default: []
        },
        activeIndex: {
            type: Number,
            default: -1
        }
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
}
</script>

<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="(contact, index) in contacts" :key="contact._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            <div class="contact-name">
                {{ contact.name }}
            </div>
            <i v-if="contact.favorite" class="fas fa-heart"></i>
        </li>

    </ul>
</template>


<style scoped>

.list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.contact-name {
    flex-grow: 1; 
}

</style>