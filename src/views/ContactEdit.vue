<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";
export default {
    components: {
        ContactForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            contact: null,
            message: "",
        };
    },
    methods: {
        async getContact(id) {
            try {
                this.contact = await ContactService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateContact(data) {
            try {
                await ContactService.update(this.contact._id, data);
                this.message = `Liên hệ ${this.contact.name} được cập nhật thành công.`;
                this.$swal({
                    title: "Liên hệ được cập nhật thành công",
                    width: "36em",
                    text: this.message,
                    icon: "success",
                    confirmButtonText: 'Trở về màn hình chính',
                }).then((result) => {
                    if (result.value) {
                        this.$router.push({ name: "contactbook" });
                    }
                })
            } catch (error) {
                console.log(error);
            }
        },
        async deleteContact() {
            try {
                this.message = `Bạn có chắc chắn XÓA liên hệ này?`;
                this.$swal({
                    title: "Bạn có chắc chắn XÓA liên hệ này?",
                    text: "Lưu ý: Hành động này không thể khôi phục !",
                    icon: "warning",
                    width: "36em",
                    showCancelButton: true,
                    confirmButtonText: 'Đúng, hãy xóa nó.',
                    cancelButtonText: 'Không xóa',
                }).then((result) => {
                    if (result.value) {
                        ContactService.delete(this.contact._id);
                        this.$swal('Đã xóa thành công', `Liên hệ ${this.contact.name} đã được xóa thành công`, 'success')
                        this.$router.push({ name: "contactbook" });
                    }
                })
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getContact(this.id);
        this.message = "";
    },
};
</script>

<template>
    <div v-if="contact" class="page">
        <h4>Hiệu chỉnh Liên hệ</h4>
        <ContactForm :contact="contact" @submit:contact="updateContact" @delete:contact="deleteContact" />
    </div>
</template>
