<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";
export default {
    components: {
        ContactForm,
    },
    data() {
        return {
            contact: null,
            message: "",
        };
    },
    methods: {
        async addContact(data, resetForm) {
            try {
                await ContactService.create(data);
                this.message = `Liên hệ ${this.contact.name} được thêm thành công.`;
                this.$swal({
                    title: "Liên hệ được thêm thành công",
                    text: this.message,
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonText: 'Tiếp tục thêm một liên lạc khác',
                    cancelButtonText: 'Trở về màn hình chính',
                }).then((result) => {
                    if (result.value) {
                        resetForm();
                    } else {
                        this.$router.push({ name: "contactbook" });
                    }
                })

            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.contact = {
            "address": "",
            "email": "",
            "name": "",
            "phone": "",
            "favorite": false
        }
        this.message = "";
    },
};
</script>

<template>
    <div class="page">
        <h4>Thêm Liên hệ</h4>
        <ContactForm :contact="contact" @submit:contact="addContact" :action="'add'"/>
    </div>
</template>
