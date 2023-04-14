<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table class="min-w-full text-left text-sm font-light">
                        <thead class="border-b font-medium dark:border-neutral-500">
                            <tr class="text-center">
                                <th scope="col" class="px-6 py-4">Payment ID</th>
                                <th scope="col" class="px-6 py-4">Customer ID</th>
                                <th scope="col" class="px-6 py-4">Bill Image</th>
                                <th scope="col" class="px-6 py-4">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b dark:border-neutral-500 text-center" v-for="pack in packages"
                                :key="pack.pay_id">
                                <td class="whitespace-nowrap px-6 py-4 font-medium">
                                    {{ pack.pay_id }}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    {{ pack.customer_id }}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <button type="button" @click="checkImage(pack)">
                                        {{ pack.pay_bill }}
                                    </button>
                                </td>
                                <td class="whitespace-nowrap px-6 py-4 text-center flex gap-x-3 justify-center">
                                    <div class="bg-green-400 rounded-xl p-2 font-normal hover:bg-green-600 hover:text-gray-300 hover:drop-shadow-xl"
                                        @click="approve(pack.customer_id,pack.pay_id)">
                                        Approve
                                    </div>
                                    <div
                                        class="bg-red-400 rounded-xl p-2 font-normal hover:bg-red-600 hover:text-gray-300 hover:drop-shadow-xl">
                                        Delete
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
    data() {
        return {
            idcard: "",
            name: "",
            ccnum: "",
            expdate: "",
            packages: "",
            packaged: "",
            customerid: "",
            file: null,
            userinfo: "",
        };
    },
    methods: {
        async approve(customer_id,pay_id) {
            try {
                const response = await axios.put("http://localhost:3001/customer",{
                    customerid : customer_id,
                    payid : pay_id
                });
                console.log(customer_id);
            } catch (error) {
                
            }

        },
        checkImage(pack) {
            Swal.fire({
                imageUrl: `http://localhost:3001/${pack.pay_bill}`,
                imageWidth: 500,
                imageHeight: 650,
                imageAlt: "pay bill",
            });
        },
        submitForm() {
            // handle form submission here, e.g. send data to server or process locally
            console.log(
                "Submitted:",
                this.idcard,
                this.name,
                this.ccnum,
                this.expdate
            );
        },
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
            console.log(this.file);
        },
        submit() {
            var formData = new FormData();
            formData.append("packid", this.packaged);
            formData.append("customerid", this.userinfo[0].customer_id);
            formData.append("bill_image", this.file);
            console.log(this.packaged);
            console.log(this.userinfo[0].customer_id);
            console.log(this.file);
            axios
                .post("http://localhost:3001/buypackage", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    response;
                    this.$router.push({ path: "/" }); // Success! -> redirect to home page
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        },
    },
    async created() {
        this.$store.commit("initializeStore");
        this.email = localStorage.getItem("email");
        await axios
            .get(`http://localhost:3001/userinfo/${this.email}`)
            .then((response) => {
                this.userinfo = response.data.userinfo;
                console.log(this.email);
                console.log(this.userinfo[0].customer_id);
                console.log(this.userinfo[0].status);
            })
            .catch((err) => {
                console.log(err);
            });
        try {
            const packages = await axios.get("http://localhost:3001/buypackage");
            this.packages = packages.data.packages;
            console.log(this.packages);
        } catch (error) {
            console.log(error);
        }
    },
};
</script>
