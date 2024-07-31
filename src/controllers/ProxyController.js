import axios from "axios";
import Cheerio from "cheerio";

export const proxyRequest = async (req, res) => {
  const url = req.query.url;
  console.log(url);
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = Cheerio.load(html);
    const produtos = [];

    $("table tbody tr").each((index, element) => {
      const name = $(element).find("span.txtTit").text().trim();
      const quantity = $(element).find(".Rqtd").clone().children().remove().end().text().trim();
      const price = $(element).find(".txtTit .valor").text().trim();

      if (name && quantity && price) {
        produtos.push({ name, quantity, price });
      }
    });

    const valorTotal = $(".txtMax").text().trim();

    res.json({ produtos, valorTotal });
  } catch (error) {
    res.status(500).json({ error: "Falha ao buscar os dados" });
  }
};
