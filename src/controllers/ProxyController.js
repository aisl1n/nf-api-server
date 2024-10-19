import axios from "axios";
import * as cheerio from 'cheerio';

export const proxyRequest = async (req, res) => {
  const url = req.query.url;
  console.log(url);
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const produtos = [];

    $("table tbody tr").each((index, element) => {
      const name = $(element).find("span.txtTit").text().trim();
      const quantity = $(element).find(".Rqtd").clone().children().remove().end().text().trim();
      const price = $(element).find(".txtTit .valor").text().trim();

      if (name && quantity && price) {
        const quantityNumber = Number(quantity.replace(",", "."));
        const priceNumber = Number(price.replace("R$ ", "").replace(",", "."));
        produtos.push({ name, quantity: quantityNumber, price: priceNumber });
      }
    });

    const nomeLoja = $(".txtTopo").text().trim();
    const dataCompraEl = $("ul:contains('Emissão')").text();

    const datePattern = /\d{2}\/\d{2}\/\d{4}/;
    const match = dataCompraEl.match(datePattern);
    const dataCompra = match[0];

    const valorTotal = $(".txtMax").text().trim();
    const valorTotalNumber = Number(valorTotal.replace("R$ ", "").replace(",", "."));

    res.json({ produtos, valorTotalNumber, nomeLoja, dataCompra });
  } catch (error) {
    res.status(500).json({ error: "Falha ao buscar os dados" });
  }
};
