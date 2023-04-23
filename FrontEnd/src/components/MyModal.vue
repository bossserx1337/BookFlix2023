<template>
    <div class="modal" v-if="isOpen">
        <div class="modal-overlay" @click="closeModal"></div>
        <div class="modal-container">
            <div class="modal-header">
                <h2 class="modal-title">{{ title }}</h2>
            </div>
            <div class="modal-body">
                <slot name="modal-body"></slot>
            </div>
            <div class="modal-footer">
                <button class="modal-button" @click="closeModal">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Modal Title'
        }
    },
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        openModal() {
            this.isOpen = true
        },
        closeModal() {
            this.isOpen = false
        }
    },
    mounted() {
        // Perform any initialization here
    }
}
</script>

<style>
/* Define your modal styles here */
</style>
