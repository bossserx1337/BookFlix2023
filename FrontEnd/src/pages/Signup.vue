<template>
    <form class="max-w-lg mx-auto my-8 p-6 rounded-lg shadow-lg bg-white" @submit.prevent="submitForm">
        <h2 class="text-2xl font-bold mb-4">Sign Up</h2>
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label class="block text-gray-700 font-bold mb-2" for="first-name">
                    First Name
                </label>
                <input v-model="form.first_Name" :class="{ 'border-red-500': formErrors.firstName }"
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="first-name" type="text" placeholder="First Name" />
                <p v-if="formErrors.firstName" class="text-red-500 text-xs italic">{{ formErrors.firstName }}</p>
            </div>
            <div>
                <label class="block text-gray-700 font-bold mb-2" for="last-name">
                    Last Name
                </label>
                <input v-model="form.last_Name" :class="{ 'border-red-500': formErrors.lastName }"
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="last-name" type="text" placeholder="Last Name" />
                <p v-if="formErrors.lastName" class="text-red-500 text-xs italic">{{ formErrors.lastName }}</p>
            </div>
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="email">
                Email Address
            </label>
            <input v-model="form.email" :class="{ 'border-red-500': formErrors.email }"
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email" type="email" placeholder="Email Address" />
            <p v-if="formErrors.email" class="text-red-500 text-xs italic">{{ formErrors.email }}</p>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="phone-number">
                Phone Number
            </label>
            <input v-model="form.mobile" :class="{ 'border-red-500': formErrors.phoneNumber }"
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone-number" type="text" placeholder="Phone Number" />
            <p v-if="formErrors.mobile" class="text-red-500 text-xs italic">{{ formErrors.phoneNumber }}</p>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="password">
                Password
            </label>
            <input v-model="form.password" :class="{ 'border-red-500': formErrors.password }"
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password" type="password" placeholder="**********" />
            <p v-if="formErrors.password" class="text-red-500 text-xs italic">{{ formErrors.password }}</p>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="confirm-password">
                Confirm Password
            </label>
            <input v-model="form.confirm_password" :class="{ 'border-red-500': formErrors.confirmPassword }"
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirm-password" type="password" placeholder="**********" />
            <p v-if="formErrors.confirm_password" class="text-red-500 text-xs italic">{{ formErrors.confirmPassword }}</p>
        </div>
        <div class="flex items-center justify-between">
            <button :disabled="formSubmitted"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">
                {{ formSubmitted ? 'Submitting...' : 'Sign Up' }}
            </button>
            <p class="text-sm text-gray-600 mt-2">
                Already have an account? <router-link :to="{ name: 'login' }">Log in here</router-link>.
            </p>
        </div>
    </form>
</template>


<script>
import axios from '/plugins/axios'
import Swal from 'sweetalert2'


export default {
    data() {
        return {
            form: {
                first_Name: '',
                last_Name: '',
                email: '',
                mobile: '',
                password: '',
                confirm_password: '',
            },
            formErrors: {},
            formSubmitted: false,
        };
    },
    methods: {
        validateForm() {
            const errors = {};
            if (!this.form. first_Name) {
                errors.firstName = 'Please enter your first name.';
            }
            if (!this.form.last_Name) {
                errors.lastName = 'Please enter your last name.';
            }

            if (!this.form.email) {
                errors.email = 'Please enter your email address.';
            }
            if (!this.form.mobile) {
                errors.phoneNumber = 'Please enter your phone number.';
            }
            if (!this.form.password) {
                errors.password = 'Please enter a password.';
            }
            if (!this.form.confirm_password) {
                errors.confirmPassword = 'Please confirm your password.';
            } else if (this.form.password !== this.form.confirm_password) {
                errors.confirmPassword = 'Passwords do not match.';
            }
            this.formErrors = errors;
            return Object.keys(errors).length === 0;
        },
        async submitForm() {
            if (this.validateForm()) {
                try {
                    console.log(this.form);
                    const response = await axios.post('/user/signup', this.form);
                    console.log(response);
                    if (response.status === 201) {
                        this.formSubmitted = true;
                        Swal.fire({
                            icon: 'success',
                            title: "Congratulations! You've successfully created your account.",
                            confirmButtonText: `Go Login`,

                        }).then((result) => {
                            if (result.isConfirmed) {
                                // redirect to sign in page
                                this.$router.push('/package');
                            }
                        });
                    }

                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${error.response.data}`,
                        footer: 'this email is used already'
                    })
                }
            }
        },

    },
};
</script>
