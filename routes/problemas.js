const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const problemas = [
    {
      id: 'problema1',
      titulo: 'Crescimento Urbano',
      resumo: 'Clique para ver a explicação.',
      descricao: 'O crescimento da população urbana aumentou muito ao longo do tempo. Com isso, cresce também a necessidade de produzir mais alimentos perto dos centros urbanos. Esse cenário cria desafios para abastecimento, organização dos espaços e uso de tecnologia.'
    },
    {
      id: 'problema2',
      titulo: 'Menos Espaço Rural',
      resumo: 'Clique para ver a explicação.',
      descricao: 'Com a redução proporcional da população rural, existe menor presença de pessoas ligadas diretamente ao campo. Isso pode impactar a produção tradicional e reforça a importância de novas formas de cultivo dentro das cidades.'
    },
    {
      id: 'problema3',
      titulo: 'Produção de Alimentos',
      resumo: 'Clique para ver a explicação.',
      descricao: 'O aumento da população urbana exige mais alimentos, mas os espaços são menores. Por isso, um grande problema é produzir com qualidade, em boa quantidade e de forma acessível, mesmo em áreas reduzidas.'
    },
    {
      id: 'problema4',
      titulo: 'Uso de Recursos',
      resumo: 'Clique para ver a explicação.',
      descricao: 'Nas fazendas urbanas, é necessário controlar melhor água, energia e nutrientes. Sem monitoramento, pode haver desperdício. Por isso, sensores e sistemas inteligentes ajudam no acompanhamento e na eficiência da produção.'
    },
    {
      id: 'problema5',
      titulo: 'Sustentabilidade',
      resumo: 'Clique para ver a explicação.',
      descricao: 'A sustentabilidade é um desafio importante, porque é preciso produzir mais sem causar tantos impactos ao meio ambiente. As fazendas urbanas ajudam nesse processo, mas ainda enfrentam dificuldades como custo, manutenção e adaptação tecnológica.'
    }
  ];

  res.render('problemas', { problemas });
});

router.get('/api', (req, res) => {
  const problemas = [
    { id: 1, titulo: 'Crescimento Urbano', descricao: 'O crescimento da população urbana aumentou muito ao longo do tempo.' },
    { id: 2, titulo: 'Menos Espaço Rural', descricao: 'Com a redução proporcional da população rural, existe menor presença de pessoas ligadas diretamente ao campo.' },
    { id: 3, titulo: 'Produção de Alimentos', descricao: 'O aumento da população urbana exige mais alimentos, mas os espaços são menores.' },
    { id: 4, titulo: 'Uso de Recursos', descricao: 'Nas fazendas urbanas, é necessário controlar melhor água, energia e nutrientes.' },
    { id: 5, titulo: 'Sustentabilidade', descricao: 'A sustentabilidade é um desafio importante para produzir sem impactar o meio ambiente.' }
  ];
  res.json(problemas);
});

module.exports = router;
