const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
require("dotenv").config();

const app = express()
const PORT = process.env.PORT

mongoose.connect(process.env.MONGODB_CONNECT_URI)
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err))

const produtoSchema = new mongoose.Schema({
  produto: String,
  unidade: String,
  valorUnitario: String,
  valorUnitarioTotal: String
})

const Produto = mongoose.model('Produto', produtoSchema)

app.use(cors())
app.use(bodyParser.json());

app.get('/proxy', async (req, res) => {
  const url = req.query.url
  try {
    const response = await axios.get(url)
    const html = response.data
    const $ = cheerio.load(html)
    const produtos = []

    $('table tbody tr').each((index, element) => {
      const produto = $(element).find('span.txtTit').text().trim()
      const unidade = $(element).find('.Rqtd').text().trim()
      const valorUnitario = $(element).find('.RvlUnit').text().trim().replace(/\n|\t/g, '')
      const valorUnitarioTotal = $(element).find('.valor').text().trim().replace(/\n|\t/g, '')

      if (produto && unidade && valorUnitario && valorUnitarioTotal) {
        produtos.push({ produto, unidade, valorUnitario, valorUnitarioTotal })
      }
    })

    const valorTotal = $('.txtMax').text().trim()

    res.json({ produtos, valorTotal })
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar os dados' })
  }
})

app.post('/save', async (req, res) => {
    const { produtos, valorTotal } = req.body
    try {
      const documentos = []
      produtos.forEach(produto => {
        const novoDocumento = new Produto({
          produto: produto.produto,
          unidade: produto.unidade,
          valorUnitario: produto.valorUnitario,
          valorUnitarioTotal: produto.valorUnitarioTotal
        })
        documentos.push(novoDocumento)
      })
      await Produto.insertMany(documentos)
      res.status(201).json({ message: 'Produtos salvos com sucesso' })
    } catch (error) {
      console.error('Erro ao salvar os produtos:', error)
      res.status(500).json({ error: 'Falha ao salvar os produtos' })
    }
  })

  app.get('/produtos', async (req, res) => {
    try {
      const produtos = await Produto.find();
      res.status(200).json(produtos);
    } catch (error) {
      console.error('Erro ao buscar os produtos:', error);
      res.status(500).json({ error: 'Falha ao buscar os produtos' });
    }
  });
  
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`)
})
