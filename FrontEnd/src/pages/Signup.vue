<template>
  <Form :validation-schema="schema" @submit="onSubmit" class="max-w-lg mx-auto my-8 p-6 rounded-lg shadow-lg bg-white">
      <h2 class="text-2xl font-bold mb-4">Sign Up</h2>

      <!-- firstname lastname -->
      <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
              <label class="block text-gray-700 font-bold mb-2" for="first-name">
                  First Name
              </label>
              <Field name="firstname" :class="{ 'border-red-500': false }"
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="first-name" type="text" placeholder="First Name" />
              <ErrorMessage name="firstname" class="text-red-500 text-xs italic" />
          </div>
          <div>
              <label class="block text-gray-700 font-bold mb-2" for="last-name">
                  Last Name
              </label>
              <Field name="lastname" :class="{ 'border-red-500': false }"
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="last-name" type="text" placeholder="Last Name" />
              <ErrorMessage name="lastname" class="text-red-500 text-xs italic" />
          </div>
      </div>


      <!-- email phone -->
      <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="email">
              Email Address
          </label>
          <Field name="email" :class="{ 'border-red-500': false }"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email" type="email" placeholder="Email Address" />
          <ErrorMessage name="email" class="text-red-500 text-xs italic" />
      </div>
      <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="phone-number">
              Phone Number
          </label>
          <Field name="phone" :class="{ 'border-red-500': false }"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone-number" type="text" placeholder="Phone Number" />
          <ErrorMessage name="phone" class="text-red-500 text-xs italic" />
      </div>


      <!-- password confirm password -->
      <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="password">
              Password
          </label>
          <Field name="password" :class="{ 'border-red-500': false }"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password" type="password" placeholder="**********" />
          <ErrorMessage name="password" class="text-red-500 text-xs italic" />
      </div>
      <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="confirm-password">
              Confirm Password
          </label>
          <Field name="confirmPassword" :class="{ 'border-red-500': false }"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password" type="password" placeholder="**********" />
          <ErrorMessage name="confirmPassword" class="text-red-500 text-xs italic" />
      </div>

      <div class="flex items-center justify-between">
          <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"  type="submit">
              Sign Up
           </button>
          <p class="text-sm text-gray-600 mt-2">
              Already have an account? <router-link to="/">Log in here</router-link>.
          </p>
      </div>

  </Form>
</template>
<!-- <template>


</template> -->


<script >
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
export default {
  name: 'Signup',
  components: {
      Field,
      Form,
      ErrorMessage,
  },

  data() {
      return {
          schema: yup.object({
              email: yup.string().email().required(),
              phone: yup.string().required().matches(/^0\d{9}$/, "Phone number must be 10 digits and start with 0"),
              password: yup.string()
                  .required()
                  .min(6)
                  .test('uppercase', 'Password must contain at least one uppercase letter', (value) => { return /[A-Z]/.test(value) })
                  .matches(/[0-9]/, 'Password must contain at least one number'),
              confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
              firstname: yup.string().required().max(20).min(3),
              lastname: yup.string().required().max(20).min(3),
          })

      }
  },
  methods: {
      async onSubmit(values) {
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
      },

  }
};
</script>


