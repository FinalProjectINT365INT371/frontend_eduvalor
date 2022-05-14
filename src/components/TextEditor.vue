<template>
    <div>
        <!-- Two-way Data-Binding -->
        <quill-editor ref="myQuillEditor" v-model="inputVal" :options="editorOption" @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)" @ready="onEditorReady($event)" />

        <!-- Or manually control the data synchronization -->
        <!-- <quill-editor
    :content="content"
    :options="editorOption"
    @change="onEditorChange($event)"
  /> -->
    </div>
</template>

<script>
// You can also register Quill modules in the component
export default {
    props: {
        value: String
    },
    data() {
        return {
            content: '<h2>I am Example</h2>',
            editorOption: {
                debug: 'info',
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['image', 'code-block']
                    ]
                },
                placeholder: 'Compose an epic...',
                readOnly: true,
                theme: 'snow'
            }
        }
    },
    methods: {
        onEditorBlur(quill) {
            console.log('editor blur!', quill)
        },
        onEditorFocus(quill) {
            console.log('editor focus!', quill)
        },
        onEditorReady(quill) {
            console.log('editor ready!', quill)
        },
        onEditorChange({ quill, html, text }) {
            console.log('editor change!', quill, html, text)
            this.content = html
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        },
        inputVal: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            },
        },
    },
    mounted() {
        console.log('this is current quill instance object', this.editor)

    }
}
</script>