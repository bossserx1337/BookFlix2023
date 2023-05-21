
<template>
  <!-- Index Post -->
  <div class="container max-w-7xl mx-auto mt-8">
    <div class="mb-4">
      <h1 class="font-serif text-3xl font-bold underline decoration-gray-400"> </h1>


      <div class="flex justify-end">
        <router-link to="/admin/approve"><button
            class="px-4 py-2 rounded-md bg-sky-500 text-sky-100 hover:bg-sky-600 mr-5">💸 Approve
            Payment</button>
        </router-link>

        <button data-modal-target="addpublisherModal" data-modal-toggle="addpublisherModal"
          class="px-4 py-2 rounded-md bg-sky-500 text-sky-100 hover:bg-sky-600 mr-5">📰 Add Publisher</button>
        <button data-modal-target="addauthorModal" data-modal-toggle="addauthorModal"
          class="px-4 py-2 rounded-md bg-sky-500 text-sky-100 hover:bg-sky-600 mr-5">👨 Add Author</button>
        <button data-modal-target="defaultModal" data-modal-toggle="defaultModal"
          class="px-4 py-2 rounded-md bg-sky-500 text-sky-100 hover:bg-sky-600 mr-5">🕮 Add Book</button>
        <button data-modal-target="addChapterModal" data-modal-toggle="addChapterModal"
          class="px-4 py-2 rounded-md bg-sky-500 text-sky-100 hover:bg-sky-600 mr-5">🕮 Add Chapter</button>
        <button data-modal-target="removeChapterModal" data-modal-toggle="removeChpaterModal"
          class="px-4 py-2 rounded-md bg-sky-500 text-sky-100 hover:bg-sky-600">🕮 Remove Chapter</button>




        <div id="addpublisherModal" tabindex="-1" aria-hidden="true"
          class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <!-- Modal header -->
              <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-black">
                  📰 Add publisher
                </h3>
                <button type="button"
                  class="text-gray-400 bg-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="addpublisherModal">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <!-- Modal body -->
              <form @submit.prevent="addPublisher">
                <div class="mx-4">
                  <div class="mb-4">
                    <label class="block font-bold mb-2">Publisher Name</label>
                    <input class="border rounded w-full py-2 px-3" type="text" v-model="pubname">
                  </div>
                  <div class="mb-4">
                    <label class="block font-bold mb-2">Publisher phone</label>
                    <input class="border rounded w-full py-2 px-3" type="text" v-model="pubphone">
                  </div>
                  <div class="mb-4">
                    <label class="block font-bold mb-2">Publisher URL</label>
                    <input class="border rounded w-full py-2 px-3" type="text" v-model="puburl">
                  </div>

                </div>
                <div class="mt-8 mx-4">
                  <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-5" type="submit"
                    @click="addPub">Add publisher</button>
                </div>
              </form>
              <!-- Modal footer -->

            </div>
          </div>
        </div>
        <div id="defaultModal" tabindex="-1" aria-hidden="true"
          class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <!-- Modal header -->
              <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-black">
                  Add Book
                </h3>
                <button type="button"
                  class="text-gray-400 bg-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="defaultModal">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <!-- Modal body -->
              <form @submit.prevent="updateBook">
                <div class="mx-4">
                  <div class="mb-4">
                    <label class="block font-bold mb-2 mr-5">Book ID</label>
                    <input class="border rounded w-full py-2 px-3 " type="text" v-model="bookid">
                  </div>
                  <div class="mb-4">
                    <label class="block font-bold mb-2">Book Name</label>
                    <input class="border rounded w-full py-2 px-3" type="text" v-model="bookname">
                  </div>
                  <div class="mb-4">
                    <label class="block font-bold mb-2">Book Description</label>
                    <input class="border rounded w-full py-2 px-3" type="text" v-model="bookdesc">
                  </div>
                  <div class="mb-4">
                    <label class="block font-bold mb-2">Book img</label>
                    <input class="border rounded w-full py-2 px-3" type="text" v-model="bookimg">
                  </div>
                  <div class="mb-4">
                    <label class="block font-bold mb-2">Author</label>
                    <select id="package" v-model="authorid" required
                      class="block w-full border border-gray-400 p-2 rounded mb-4 text-black">
                      <option value="">Select a Author</option>
                      <option v-for="author in authors" :value="author.author_id" :key="author.author_id">{{
                        author.author_id }} {{ author.author_fn }} {{ author.author_ln }}</option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label class="block font-bold mb-2">Publisher</label>
                    <select id="package" v-model="pubid" required
                      class="block w-full border border-gray-400 p-2 rounded mb-4 text-black">
                      <option value="">Select a Publisher</option>
                      <option v-for="pub in publishers" :value="pub.pub_id" :key="pub.pub_id">{{ pub.pub_id }} {{
                        pub.pub_name }}</option>
                    </select>
                  </div>
                </div>
                <div class="mt-8 mx-4">
                  <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-5" type="submit"
                    @click="submit">Add Book</button>
                </div>
              </form>
              <!-- Modal footer -->

            </div>
          </div>
        </div>
        <div id="addauthorModal" tabindex="-1" aria-hidden="true"
          class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <!-- Modal header -->
              <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-black">
                  👨 Add Author
                </h3>
                <button type="button"
                  class="text-gray-400 bg-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="addauthorModal">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <!-- Modal body -->
              <form @submit.prevent="addPublisher">
                <div class="mx-4">
                  <div class="mb-4">
                    <label class="block font-bold mb-2">Author FirstName</label>
                    <input class="border rounded w-full py-2 px-3" type="text" v-model="authfname">
                  </div>
                  <div class="mb-4">
                    <label class="block font-bold mb-2">Author LastName</label>
                    <input class="border rounded w-full py-2 px-3" type="text" v-model="authlname">
                  </div>
                  <div class="mb-4">
                    <label class="block font-bold mb-2">Author Alias</label>
                    <input class="border rounded w-full py-2 px-3" type="text" v-model="authalias">
                  </div>

                </div>
                <div class="mt-8 mx-4">
                  <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-5" type="submit"
                    @click="addAuthor">Add Author</button>
                </div>
              </form>
              <!-- Modal footer -->

            </div>
          </div>
        </div>
        <div id="addChapterModal" tabindex="-1" aria-hidden="true"
          class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <!-- Modal header -->
              <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-black">
                  👨 Add Chapter
                </h3>
                <button type="button"
                  class="text-gray-400 bg-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="addChapterModal">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <!-- Modal body -->
              <form @submit.prevent="addChapter">
                <div class="mx-4">
                  <div class="mb-4">
                    <label class="block font-bold mb-2">Book</label>
                    <select name="book_id" v-model="selectedBook">
                      <option v-for="book in books" :value="book.book_id" :key="book.book_id">{{ book.book_name }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label class="block font-bold mb-2">Chapter content</label>
                    <input class="border rounded w-full py-2 px-3" type="text" v-model="chapterContent">
                  </div>
                  <div class="mb-4">
                    <label class="block font-bold mb-2">Chapter images</label>
                    <input class="mb-5" multiple type="file" accept="image/png, image/jpeg, image/webp"
                      ref="imageInput" />
                  </div>
                </div>
                <div class="mt-8 mx-4">
                  <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-5" type="submit">
                    Add Chapter
                  </button>
                </div>
              </form>
              <!-- Modal footer -->

            </div>
          </div>
        </div>
        <div id="removeChpaterModal" tabindex="-1" aria-hidden="true"
          class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <!-- Modal header -->
              <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-black">
                  👨 Remove Chapter
                </h3>
                <button type="button"
                  class="text-gray-400 bg-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="removeChpaterModal">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <!-- Modal body -->
              <form @submit.prevent="removeChapter">
                <div class="mx-4">
                  <div class="mb-4">
                    <label class="block font-bold mb-2">Book</label>
                    <select name="book_id" v-model="selectedBookid">
                      <option v-for="book in books" :value="book.book_id" :key="book.book_id">{{ book.book_name }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label class="block font-bold mb-2">Chapter</label>
                    <select name="book_id" v-model="selectChapter">
                      <option v-for="chapter in chapters" :value="chapter.chapter_id" :key="chapter.chapter_id">{{
                        chapter.chapter_id }} {{ chapter.chapter_content }}
                      </option>
                    </select>
                  </div>

                </div>
                <div class="mt-8 mx-4">
                  <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-5" type="submit">
                    Delete Chapter
                  </button>
                </div>
              </form>
              <!-- Modal footer -->

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- edit book -->
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="inline-block min-w-full overflow-hidden align-midabsolute inset-0 items-center justify-center bg-gray-700 bg-opacity-10 h-fulldle border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  ID</th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Title</th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Description</th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Created_At</th>
                <th class="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50" colspan="3">
                  Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in books" :key="book.book_id">
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="flex items-center">
                    {{ book.book_id }}
                  </div>

                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900"> {{ book.book_name }}
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <p>{{ book.book_desc }}</p>
                </td>

                <td class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                  <span>12/12/22</span>
                </td>

                <td class="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900" @click="updatebook(book)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </a>

                <td class="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                  <a :href="'/book/' + book.book_id + '/chapter'" target="_blank"
                    class="text-gray-600 hover:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </a>

                </td>

                </td>
                <td class="text-sm font-medium leading-5 whitespace-no-wrap border-b border-gray-200 ">
                  <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-600 hover:text-red-800"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="dropbook(book.book_id)">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg></a>

                </td>


                <div v-if="isOpen" class="
          absolute
          inset-0
          flex
          items-center
          justify-center
          bg-gray-700 bg-opacity-10
            h-full
        ">
                  <form @submit.prevent="update(newbook)">
                    <div class="mx-4 bg-white px-9 py-6">
                      <div class="mb-4">
                        <label class="block font-bold mb-2">Book ID</label>
                        <input class="border rounded w-full py-2 px-3" type="text" v-model="newbook.book_id" readonly>
                      </div>
                      <div class="mb-4">
                        <label class="block font-bold mb-2">Book Name</label>
                        <input class="border rounded w-full py-2 px-3" type="text" v-model="newbook.book_name">
                      </div>
                      <div class="mb-4">
                        <label class="block font-bold mb-2">Book Description</label>
                        <input class="border rounded w-full py-2 px-3" type="text" v-model="newbook.book_desc">
                      </div>
                      <div class="mb-4">
                        <label class="block font-bold mb-2">Book img</label>
                        <input class="border rounded w-full py-2 px-3" type="text" v-model="newbook.book_img">
                      </div>
                      <div class="mb-4">
                        <label class="block font-bold mb-2">Author</label>
                        <input class="border rounded w-full py-2 px-3" type="text" v-model="newbook.author_id">
                      </div>
                      <div class="mb-4">
                        <label class="block font-bold mb-2">Publisher</label>
                        <input class="border rounded w-full py-2 px-3" type="text" v-model="newbook.pub_id">
                      </div>
                    </div>
                    <div class="mt-8 mx-4">
                      <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" type="submit"
                        @click="update(newbook)">update</button>
                      <button class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-4" type="button"
                        @click="closeModal">Close</button>

                    </div>
                  </form>
                </div>

              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '/plugins/axios'
import Swal from 'sweetalert2';
export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      books: null,
      isOpen: false,
      newbook: null,
      authors: null,
      authorid: null,
      publishers: null,
      authfname: '',
      authlname: '',
      authalias: '',
      pubname: '',
      pubphone: '',
      puburl: '',
      images: [], // array of image
      chapterContent: '',
      selectedBook: '',
      selectedBookid: '',
      selectChapter: '',
      chapters: []
    }
  },
  computed: {
    isModalVisible() {
      return this.isOpen;
    },

  }, watch: {
    selectedBookid() {
      this.getChapters();
    }
  },
  methods: {
    updatebook(book) {
      this.isOpen = true
      this.newbook = JSON.parse(JSON.stringify(book))
      return this.newbook;
    },
    submit() {
      var formData = new FormData();
      formData.append("bookid", this.bookid)
      formData.append("bookname", this.bookname)
      formData.append("bookdesc", this.bookdesc)
      formData.append("bookimg", this.bookimg);
      formData.append("authorid", this.authorid);
      formData.append("pubid", this.pubid);


      console.log(formData);
      axios.post('http://localhost:3001/addbook', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(response)
        Swal.fire(
          response.data,
          'Add Book Already',
          'success'
        ).then(response => location.reload())
      })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
          console.log(error.message);
        });
    },
    addPub() {
      var formData = new FormData();
      formData.append("pubname", this.pubname)
      formData.append("pubphone", this.pubphone)
      formData.append("puburl", this.puburl)


      console.log(formData);
      axios.post('http://localhost:3001/addpub', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(response)
        Swal.fire(
          response.data,
          'Add Publisher Already',
          'success'
        ).then(response => location.reload())
      })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
          console.log(error.message);
        });
    },
    addAuthor() {
      var formData = new FormData();
      formData.append("authfname", this.authfname)
      formData.append("authlname", this.authlname)
      formData.append("authalias", this.authalias)


      console.log(formData);
      axios.post('http://localhost:3001/addauthor', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(response)
        Swal.fire(
          response.data,
          'Add Author Already',
          'success'
        ).then(response => location.reload())
      })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
          console.log(error.message);
        });
    },
    update(book) {
      var formData = new FormData();
      formData.append("bookid", book.book_id)
      formData.append("bookname", book.book_name)
      formData.append("bookdesc", book.book_desc)
      formData.append("bookimg", book.book_img);
      formData.append("authorid", book.author_id);
      formData.append("pubid", book.pub_id);


      console.log(formData);
      axios.put('http://localhost:3001/updatebook', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(response)
        Swal.fire(
          response.data,
          'Update Book Already',
          'success'
        ).then(response => location.reload())


      })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
          console.log(error.message);
        });
    },
    addChapter() {
      const formData = new FormData();
      formData.append('book_id', this.selectedBook);
      formData.append('chapter_content', this.chapterContent);

      // Get the files from the file input
      const files = this.$refs.imageInput.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append('myImage', file);
      }

      axios.post('/addChapter', formData)
        .then((response) => {
          // Handle success
          Swal.fire(
            response.data,
            'Update Book Already',
            'success'
          ).then(response => location.reload())
        })
        .catch(error => {
          // Handle error
          console.error(error);
        });
    },
    selectImages(event) {
      this.checkfilesize = 0;
      this.images = event.target.files;
      this.images.forEach((image) => {
        this.checkfilesize += image.size;
      });
      this.$v.checkfilesize.$touch();

    },
    closeModal() {
      this.isOpen = false; // เมื่อคลิกที่ปุ่มปิด modal ให้ปิด modal
    },
    async dropbook(bookid) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(
              `http://localhost:3001/book/${bookid}`,
              {
                bookid: bookid,
              }
            );
            if (response.status == 200) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              ).then(response => location.reload())

            }
          } catch (error) { }
        }
      })
    },
    removeChapter() {
      // กระบวนการลบ Chapter ที่เลือกออกจากฐานข้อมูลของคุณ
      axios.delete(`/deletechapter/${this.selectChapter}`)
        .then(response => {
          Swal.fire(
            response.data,
            'Delete Chapter Already',
            'success'
          ).then(response => location.reload())
        })
        .catch(error => {
          console.log(error);
        });
    },
    getChapters() {
      if (this.selectedBookid) {
        axios.get(`/book/${this.selectedBookid}/chapter/`)
          .then((response) => {
            this.chapters = response.data.chapter;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  },
  async created() {
    axios.get("/book")
      .then((response) => {
        this.books = response.data.book;

      })
      .catch((err) => {
        console.log(err);
      });

    const author = await axios.get('/author');
    console.log(author.data)
    this.authors = author.data.authors
    const publishers = await axios.get('/publisher');
    console.log(publishers.data)
    this.publishers = publishers.data.publisher


  },
}
</script>
