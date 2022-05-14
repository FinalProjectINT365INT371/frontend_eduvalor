<template>
        <div id="app">
            <v-app id="inspire">
                <v-form v-model="valid" @submit.prevent="submit">
                    <v-container>

                        <v-col cols="12" md="4">
                            <v-text-field v-model="title" :rules="titleRules" :counter="50" label="Blog Title" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field v-model="firstname" :rules="nameRules" :counter="10" label="First name"
                                required></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required>
                            </v-text-field>
                        </v-col>
                        <TextEditor v-model="textEditorContent"/>

                        <button type="submit" :disabled="invalid"> Submit</button>
                    </v-container>
                </v-form>

            </v-app>
          

        </div>
</template>
<script>
import TextEditor from '../components/TextEditor.vue'
export default {
    components: {
        TextEditor
    },

    data: () => ({
        valid: false,
        firstname: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        title: '',
        titleRules: [
            v => !!v || 'Blog Title is required',
            v => v.length <= 50 || 'Blog Title must be less than 50 characters',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        textEditorContent: ''
    }),
    methods: {
        submit() {
            // this.$refs.observer.validate()
            console.log(this.title,this.firstname,this.email,this.textEditorContent);
        }
    }
}
</script>