const ServicoExercicio = require("../services/pessoa.js");

const servico = new ServicoExercicio()
class ControllerExercicio {

  async PegarUm(req, res) {
    try {
      const id = req.params.id

      const result = await servico.PegarUm(id)

      res.status(200).json(result);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
    }
  }

  async PegarTodos(_, res) {
    try {
      const result = await servico.PegarTodos()

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  async Adicionar(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const pessoa = { nome, email, senha };

      await servico.Adicionar(pessoa)

      res.status(201).json({ message: "Adicionado com sucesso!" });
    } catch (error) {
      if (error.parent && error.parent.code === "ER_DUP_ENTRY") {
        res.status(409).json({ message: "Email já cadastrado!" });
      }
      res.status(400).json({ message: error.errors?.message || error.message });
    }
  }
  
  async Alterar(req, res) {
    try {
      const id = req.params.id
      const { nome, email, senha } = req.body;

      const resultado = await servico.Alterar(id, { nome, email, senha });

      if (resultado[0] === 0) {
        return res.status(404).json({ message: "Favor inserir um id existente, com apenas números inteiros maiores que zero." });
      }

      return res.status(200).json({ message: "Alterado com sucesso!" });
    } catch (error) {
      res.status(400).json({ message: error.errors?.message || error.message });

    }
  }
  
  async Deletar(req, res) {
    try {
      const id = req.params.id

      await servico.Deletar(id)

      res.status(200).json({ message: "Deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error.message });

    }
  }

}

module.exports = ControllerExercicio