<template>
    <div id="app" class="overflow-auto ">
        <v-form v-model="valid" @submit.prevent="submit">
            <div class="d-flex justify-center test" >
                <div class="inputs">

                    <v-text-field class="input-style blog_title" v-model="title" :rules="titleRules" :counter="50"
                        label="Blog Ttile" required>
                    </v-text-field>

                    <v-text-field class="input-style" v-model="author_name" :rules="nameRules" :counter="10"
                        label="Author Name" required>
                    </v-text-field>

                    <quill-editor class="quill" ref="myQuillEditor" v-model="textEditorContent" :options="editorOption"
                        required />
                    <button type="submit" :disabled="invalid" class="submit"> Submit</button>
                </div>
            </div>
        </v-form>


    </div>
</template>
<script>
// import { from } from 'webpack-sources/lib/CompatSource';
import axios from 'axios';

export default {
    components: {
    },

    data: () => ({
        valid: false,
        author_name: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        title: '',
        titleRules: [
            v => !!v || 'Blog Title is required',
            v => v.length <= 50 || 'Blog Title must be less than 50 characters',
        ],
        editorOption: {
            debug: 'info',
            modules: {
                toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    ['image']
                ]
            },
            placeholder: 'Compose an epic...',
            readOnly: true,
            theme: 'snow'
        },
        delta: undefined,
        textEditorContent: ''
    }),
    methods: {
        submit() {
            // this.$refs.observer.validate()
            this.delta = this.$refs.myQuillEditor.quill.getContents();
            // console.log('Blog Title :' + this.title, 'Author Name : ' + this.author_name, 'Content :' + this.delta);
            // const fromData = new fromData();
            // fromData.append("Header",this.title)
            // fromData.append("TextData",this.title)
            // this.delta = document.getElementsByClassName('ql-editor')[0].innerHTML

            // console.log(this.delta);
            // console.log(this.textEditorContent);
            const childNodes = document.getElementsByClassName('ql-editor')[0].childNodes
            const unknow = []
            childNodes.forEach((data) => {
                data.childNodes.forEach(
                    (data) => {
                        if (String(data.nodeName) === 'IMG') {
                            unknow.push(data)
                        }
                    }
                )
            })
            const srcArray = []
            unknow.forEach((data) => {
                String(data.src).split('data:image/png;base64,');
                let stringbuffer = String(data.src).split('data:image/png;base64,')[1]
                data.src = ""
                console.log(stringbuffer);
                stringbuffer = stringbuffer.split('">')[0]
                srcArray.push(stringbuffer)
            })
            const formData = new FormData()
            formData.append('Header', this.title)
            formData.append('TextData', this.textEditorContent)
            formData.append('ContentCategory', '01')
            formData.append('CreateBy', this.author_name)
            formData.append('DeleteFlag', false)
            srcArray.forEach(
                (data) => {
                    formData.append('ImageFiles', data)
                    console.log("formData:" + data);
                }
            )
            for (var value of formData.values()) {
                console.log(value);
            }
            axios.post('https://www.eduvalor.ml/backendDev/content/addcontent', formData)
            this.delta.forEach(array => console.log(array))
        },
        // editorTypeCheck() {
        //     this.delta.forEach(array => console.log(array))
        // },
    },
}
</script>

<style scoped>
.submit {
    background-color: brown;
    display: inline;
}

.input-style,
.quill {
    width: 50%;
}

.test {
    background-color: aquamarine;

}

.inputs{
    background-color: blueviolet;
}
</style>