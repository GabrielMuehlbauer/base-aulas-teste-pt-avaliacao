const RepositorioExercicio= require("../repositories/pessoa.js")

const repositorio = new RepositorioExercicio()

class ServicoExercicio {

    async PegarUm(id){
      const idNum = Number(id);
      if(!id || !Number.isInteger(idNum) || idNum <= 0) {
        throw new Error("Favor inserir um id existente, com apenas números inteiros maiores que zero")
      }
      
      const resultado = await repositorio.PegarUm(id)
      
      if (!resultado) {
        throw new Error("Favor inserir um id existente, com apenas números inteiros maiores que zero")
      }
      
      return resultado
    }

    async PegarTodos(){
      const resultados = await repositorio.PegarTodos()
      
      if(resultados.length === 0) {
         throw new Error("Não há nenhuma pessoa cadastrada")
      }
      
      return resultados
    }

    async Adicionar(pessoa){
      const regexNome = /^[a-zA-ZÀ-ÿ\s]+$/;
      const regexEmail = /^[^\s@]+@[^\s@]+\.com$/;
      const regexEmoji = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

      if(!pessoa || Object.keys(pessoa).length === 0) {
        throw new Error("Favor preencher os campos de pessoa.")
      } else if(!pessoa.nome || pessoa.nome.trim() === "") {
        throw new Error("Favor preencher o nome.")
      } else if(!regexNome.test(pessoa.nome.trim())) {
        throw new Error("Favor preencher o nome corretamente sem simbulos matemáticos.")
      } else if(!pessoa.email || pessoa.email.trim() === "") {
        throw new Error("Favor preencher o email.")
      } else if(!regexEmail.test(pessoa.email.trim()) || pessoa.email.includes("@@") || pessoa.email.includes("..")) {
        throw new Error("Favor preencher o email corretamente.")
      } else if(!pessoa.senha || pessoa.senha.trim() === "") {
        throw new Error("Favor preencher a senha.")
      } else if(pessoa.senha.length < 8) {
        throw new Error("Favor preencher a senha corretamente.")
      } else if(!/[A-Z]/.test(pessoa.senha)) {
        throw new Error("Favor preencher a senha corretamente, com pelo menos uma letra maiuscula.")
      } else if(!/[a-z]/.test(pessoa.senha)) {
        throw new Error("Favor preencher a senha corretamente, com pelo menos uma letra minuscula.")
      } else if(!/[0-9]/.test(pessoa.senha)) {
        throw new Error("Favor preencher a senha corretamente com números.")
      } else if(!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pessoa.senha)) {
        throw new Error("Favor preencher a senha com carácteres especiais.")
      } else if(regexEmoji.test(pessoa.senha)) {
        throw new Error("Favor preencher a senha corretamente, sem emojis.")
      } else if(pessoa.senha.toLowerCase().includes(pessoa.nome.trim().split(" ")[0].toLowerCase())) {
        throw new Error("Favor preencher a senha corretamente, sem colocar seu nome.")
      } else if(/(.)\1{3}/.test(pessoa.senha)) {
        throw new Error("Favor preencher a senha corretamente, sem colocar mais de três caracteres iguais.")
      }

      return repositorio.Adicionar(pessoa)
    }

    async Alterar(id, pessoa){
      const idNum = Number(id);
      if(!id || !Number.isInteger(idNum) || idNum <= 0) {
        throw new Error("Favor inserir um id existente, com apenas números inteiros maiores que zero")
      }

      const regexNome = /^[a-zA-ZÀ-ÿ\s]+$/;
      const regexEmail = /^[^\s@]+@[^\s@]+\.com$/;
      const regexEmoji = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

      if(!pessoa || Object.keys(pessoa).length === 0) {
        throw new Error("Favor preencher os campos de pessoa.")
      } else if(!pessoa.nome || pessoa.nome.trim() === "") {
        throw new Error("Favor preencher o nome.")
      } else if(!regexNome.test(pessoa.nome.trim())) {
        throw new Error("Favor preencher o nome corretamente sem simbulos matemáticos.")
      } else if(!pessoa.email || pessoa.email.trim() === "") {
        throw new Error("Favor preencher o email.")
      } else if(!regexEmail.test(pessoa.email.trim()) || pessoa.email.includes("@@") || pessoa.email.includes("..")) {
        throw new Error("Favor preencher o email corretamente.")
      } else if(!pessoa.senha || pessoa.senha.trim() === "") {
        throw new Error("Favor preencher a senha.")
      } else if(pessoa.senha.length < 8) {
        throw new Error("Favor preencher a senha corretamente.")
      } else if(!/[A-Z]/.test(pessoa.senha)) {
        throw new Error("Favor preencher a senha corretamente, com pelo menos uma letra maiuscula.")
      } else if(!/[a-z]/.test(pessoa.senha)) {
        throw new Error("Favor preencher a senha corretamente, com pelo menos uma letra minuscula.")
      } else if(!/[0-9]/.test(pessoa.senha)) {
        throw new Error("Favor preencher a senha corretamente com números.")
      } else if(!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pessoa.senha)) {
        throw new Error("Favor preencher a senha com carácteres especiais.")
      } else if(regexEmoji.test(pessoa.senha)) {
        throw new Error("Favor preencher a senha corretamente, sem emojis.")
      } else if(pessoa.senha.toLowerCase().includes(pessoa.nome.trim().split(" ")[0].toLowerCase())) {
        throw new Error("Favor preencher a senha corretamente, sem colocar seu nome.")
      } else if(/(.)\1{3}/.test(pessoa.senha)) {
        throw new Error("Favor preencher a senha corretamente, sem colocar mais de três caracteres iguais.")
      }

      const resultado = await repositorio.Alterar(id, pessoa)
      
      if(resultado[0] === 0) {
        throw new Error("Favor inserir um id existente, com apenas números inteiros maiores que zero")
      }
      
      return resultado
    }

    async Deletar(id){
      const idNum = Number(id);
      if(!id || !Number.isInteger(idNum) || idNum <= 0) {
        throw new Error("Favor inserir um id existente, com apenas números inteiros maiores que zero")
      }

      const linhasDeletadas = await repositorio.Deletar(id)
      
      if(linhasDeletadas === 0) {
        throw new Error("Favor inserir um id existente, com apenas números inteiros maiores que zero")
      }
      
      return linhasDeletadas
    }

}
module.exports = ServicoExercicio