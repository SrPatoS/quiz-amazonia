'use client';

import { useEffect, useState } from 'react';

type Question = {
  image: string;
  options: string[];
  answer: string;
};

const questions: Question[] = [
  {
    image: "https://acozinhabrasileira.com.br/wp-content/uploads/2021/09/receita-de-tacaca.jpg",
    options: ["Maniçoba", "Açaí", "Tacacá", "Pato no Tucupi"],
    answer: "Tacacá"
  },
  {
    image: "https://chefsandromartins.com/wp-content/uploads/2018/08/pato-no-tucupi.jpg",
    options: ["Vatapá", "Pato no Tucupi", "Moqueca", "Maniçoba"],
    answer: "Pato no Tucupi"
  },
  {
    image: "https://stock.adobe.com/pt/search?k=mani%C3%A7oba",
    options: ["Caruru", "Feijoada", "Maniçoba", "Tacacá"],
    answer: "Maniçoba"
  },
  {
    image: "https://www.istockphoto.com/br/foto/pirarucu-de-casaca-com-banana-prato-tradicional-amaz%C3%B4nico-gm1300618626-392887790",
    options: ["Moqueca", "Vatapá", "Pirarucu à Casaca", "Tacacá"],
    answer: "Pirarucu à Casaca"
  },
  {
    image: "https://www.istockphoto.com/br/fotos/acai-fruit-from-the-amazon",
    options: ["Cupuaçu", "Açaí", "Bacaba", "Buriti"],
    answer: "Açaí"
  },
  {
    image: "https://stock.adobe.com/pt/search?k=cupuacu",
    options: ["Graviola", "Tucumã", "Cupuaçu", "Buriti"],
    answer: "Cupuaçu"
  },
  {
    image: "https://www.shutterstock.com/pt/search/bacaba",
    options: ["Cacau", "Uxi", "Bacaba", "Açaí"],
    answer: "Bacaba"
  },
  {
    image: "https://www.pulsarimagens.com.br/foto/foto?assunto=Frutos+de+tucum%C3%A3+-+palmeira+amaz%C3%B4nica&codigo=586458&codigo-imagem=01RV175&ordenar=1&pagina=1&posicao=2&procurar=01RV175",
    options: ["Cupuaçu", "Tucumã", "Bacaba", "Buriti"],
    answer: "Tucumã"
  },
  {
    image: "https://www.istockphoto.com/br/fotos/buriti",
    options: ["Cajá", "Graviola", "Buriti", "Tucumã"],
    answer: "Buriti"
  },
  {
    image: "https://www.istockphoto.com/fotos/castanha-do-para",
    options: ["Amêndoa", "Castanha-do-Pará", "Noz", "Coco"],
    answer: "Castanha-do-Pará"
  },
  {
    image: "https://www.istockphoto.com/br/fotos/pupunha",
    options: ["Jatobá", "Cacau", "Pupunha", "Tucumã"],
    answer: "Pupunha"
  },
  {
    image: "https://fotonatural.photoshelter.com/image/I0000sNeHIsaZGq0",
    options: ["Açaí", "Carapanaúba", "Buriti", "Uxi"],
    answer: "Carapanaúba"
  },
  {
    image: "https://www.gastronomiaparaense.com/post/descubra-o-saboroso-bolo-de-macaxeira-do-par%C3%A1-uma-del%C3%ADcia-paraense-que-conquista-paladares",
    options: ["Pamonha", "Bolo de macaxeira", "Cuscuz", "Bolo de milho"],
    answer: "Bolo de macaxeira"
  },
  {
    image: "https://tupisoul.com/tucupi",
    options: ["Tacacá", "Tucupi", "Pato no Tucupi", "Caldo de cana"],
    answer: "Tucupi"
  },
  {
    image: "https://www.istockphoto.com/br/fotos/vatapa",
    options: ["Pirarucu", "Vatapá", "Caruru", "Moqueca"],
    answer: "Vatapá"
  },
  {
    image: "https://www.istockphoto.com/br/fotos/uxi",
    options: ["Graviola", "Uxi", "Tucumã", "Bacaba"],
    answer: "Uxi"
  },
  {
    image: "https://www.istockphoto.com/br/fotos/jambu",
    options: ["Espinafre", "Caruru", "Jambu", "Ora-pro-nóbis"],
    answer: "Jambu"
  },
  {
    image: "https://www.istockphoto.com/br/fotos/bolo-de-castanha-do-par%C3%A1",
    options: ["Bolo de nozes", "Pão de mel", "Bolo de castanha-do-pará", "Torta de amêndoas"],
    answer: "Bolo de castanha-do-pará"
  },
  {
    image: "https://www.istockphoto.com/br/fotos/mousse-de-cupuacu",
    options: ["Mousse de chocolate", "Mousse de cupuaçu", "Pudim de buriti", "Mousse de maracujá"],
    answer: "Mousse de cupuaçu"
  },
  {
    image: "https://www.istockphoto.com/br/fotos/bolo-de-macaxeira",
    options: ["Cuscuz", "Bolo de milho", "Bolo de macaxeira", "Pamonha"],
    answer: "Bolo de macaxeira"
  }
];


const MAX_TIME = 10;
const TIME_DECREMENT = 2;

export default function Quiz() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);
  const [timeoutReached, setTimeoutReached] = useState(false);

  const question = questions[index];
  const currentQuestionTime = Math.max(MAX_TIME - index * TIME_DECREMENT, 2);

  useEffect(() => {
    if (!started || showNext) return;
    if (timeLeft === 0) {
      setTimeoutReached(true);
      setShowNext(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, showNext, started]);

  const handleOption = (opt: string) => {
    if (selected || timeoutReached) return;
    setSelected(opt);
    if (opt === question.answer) {
      setScore((s) => s + 1);
    }
    setShowNext(true);
  };

  const next = () => {
    setIndex(index + 1);
    setSelected(null);
    setShowNext(false);
    setTimeoutReached(false);
    setTimeLeft(Math.max(MAX_TIME - (index + 1) * TIME_DECREMENT, 2));
  };

  const startQuiz = () => {
    setStarted(true);
    setTimeLeft(currentQuestionTime);
  };

  if (!started) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <h1 style={{ fontSize: 40 }}>🧉 Bem-vindo ao Quiz de Culinária Amazônica!</h1>
        <p style={{ fontSize: 20 }}>
          Teste seus conhecimentos sobre pratos típicos e ingredientes da
          Amazônia! Pronto para o desafio?
        </p>
        <button
          onClick={startQuiz}
          style={{
            marginTop: 20,
            backgroundColor: '#22c55e',
            color: '#fff',
            padding: '12px 24px',
            fontSize: '16px',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          ▶️ Começar o desafio!
        </button>
      </div>
    );
  }

  if (index >= questions.length) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <h2>🎉 Parabéns, você concluiu o desafio culinário!</h2>
        <p>
          Você acertou <strong>{score}</strong> de {questions.length} pratos e
          ingredientes.
        </p>
        <p>Compartilhe com seus amigos e veja quem conhece mais da Amazônia!</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <h2 style={{ fontSize: 24, marginBottom: 16 }}>
        🍽️ Qual é o nome desse prato típico ou ingrediente amazônico?
      </h2>
      <div style={{ marginBottom: 8 }}>
        <strong>⏳ Tempo para responder: {timeLeft}s</strong>
      </div>
      <img
        src={question.image}
        alt="Prato amazônico"
        style={{ width: '100%', borderRadius: 8 }}
      />
      <div style={{ marginTop: 24 }}>
        {question.options.map((opt, i) => {
          const isCorrect = showNext && opt === question.answer;
          const isWrong = showNext && opt === selected && opt !== question.answer;

          return (
            <button
              key={i}
              onClick={() => handleOption(opt)}
              disabled={showNext || timeoutReached}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px',
                marginBottom: '10px',
                backgroundColor: isCorrect
                  ? '#4ade80'
                  : isWrong
                    ? '#f87171'
                    : '#f3f4f6',
                border: '1px solid #ccc',
                borderRadius: 8,
                cursor: 'pointer',
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {showNext && (
        <button
          onClick={next}
          style={{
            marginTop: 20,
            backgroundColor: '#3b82f6',
            color: '#fff',
            padding: '12px',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          👉 Próxima pergunta
        </button>
      )}
    </div>
  );
}
