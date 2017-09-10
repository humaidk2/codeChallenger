<template>
  <div class="hello">
    <codemirror ref="myEditor"
      :code.sync="challenge.code" 
      :options="editorOptions"
      @ready="onEditorReady"
      @focus="onEditorFocus"
      @change="onEditorCodeChange">
    </codemirror>
    <div class="ui one column centered grid">
      <button class="huge ui violet button" v-on:click="runTests">Run Tests</button>
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import gql from 'graphql-tag';


// const postsQuery = gql`
//   query allPosts {
//     posts {
//       id
//       title
//       votes
//       author {
//         id
//         firstName
//         lastName
//       }
//     }
//   }
// `;

export default {
  name: 'hello',
  components: {
    codemirror,
  },
  data() {
    return {
      editorOptions: {
        // codemirror options
        tabSize: 2,
        mode: 'text/javascript',
        theme: 'base16-dark',
        styleSelectedText: true,
      },
      hello: '',
      challenge: {
        code: '',
      },
    };
  },
  methods: {
    onEditorReady(editor) {
      console.log('the editor is readied!', editor);
    },
    onEditorFocus(editor) {
      console.log('the editor is focus!', editor);
    },
    onEditorCodeChange(newCode) {
      console.log('this is new code', newCode);
      this.challenge = { code: newCode };
    },
    runTests() {
      const addedScript = document.getElementById('addedScript');
      if (addedScript !== null) {
        addedScript.parentNode.removeChild(addedScript);
      }
      const js = 'var sum = '.concat(this.challenge.code).concat('\n var test = document.getElementById("testAnswer"); \n if (test !== null) { \n test.parentNode.removeChild(test); \n } \n var newTest = document.createElement("H1"); \n newTest.setAttribute("id", "testAnswer") \n newTest.innerHTML = (sum(1, 2) === 3); \n document.getElementsByClassName("hello")[0].append(newTest)');
      const s = document.createElement('script');
      s.setAttribute('id', 'addedScript');
      s.textContent = js;
      console.log(s);
      document.getElementsByClassName('hello')[0].append(s);
    },
  },
  computed: {
    editor() {
      return this.$refs.myEditor.editor;
    },
  },
  created() {
    console.log('a is: ');
  },
  mounted() {
    console.log('this is current editor object', this.editor);
    // you can use this.editor to do something...
  },
  apollo: {
    hello: gql`{hello}`,
    challenge: gql`{challenge{
                code
              }}`,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
