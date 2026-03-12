//bagian ini tempat membuat todo Appnya, komponen dirender di sini
'use client';
//import react dan hook useState untuk mengelola state komponen
import React, {useState, useEffect} from 'react';
//import komponen GameBoard dan ScoreBoard
import GameBoard from '@/component/GameBoard';
import ScoreBoard from '@/component/ScoreBoard';
//import react-icons
import{GiCardJoker} from 'react-icons/gi';
import{FaAppleAlt, FaLemon, FaHeart, FaStar} from 'react-icons/fa';

//daftar icon yang digunakan sebagai isi kartu (4 pasang = 8 kartu)
const ICONS=[
  {icon: FaAppleAlt, color:'#ef4444'},
  {icon: FaLemon,color:'#eab308'},
  {icon: FaHeart, color:'#ec4899'},
  {icon: FaStar, color: '#f97316'},
];

//fungsi
//menerima
const shuffleArray=(array)=>{
  const shuffled=[...array];
  for (let i = shuffled.length - 1; i>0; i--){
    const j =Math.floor(Math.random()*(i+1));
    [shuffled[i], shuffled[j] = shuffled[j], shuffled[j], shuffled[i]];
  }
  return shuffled
};

//fungsi untuk membuat set kartu baru
const createCards=()=>{
  const paired = ICONS.flatMap((item,index)=>[
    {id:index*2,icon:item.icon, color: item.color, pairId: index},
    {id: index*2+1, icon: item.icon, color:item.color, pairId:index},
  ]);
  return shuffleArray(paired);
};

export default function Home(){
  const [cards, setCards]=useState([]);

  //state flippedcards
  const [flippedCards, setFlippedCards]=useState([]);
  //state matchedCards
  const [mtchedCards,setMatchedCards]=useState({});
  //state moves
  const[moves,setMoves]=useState(0);
  //useEffect
  useEffect(()=>{
    setCards(createCards());
  }, []);

//useEffect untuk mengecek kecocokan setiap kali kartu 2 terbuka
useEffect(() => {

  //Jika sudah ada 2 kartu terbuka
  if (flippedCards.length === 2) {

    const [firstId, secondId] = flippedCards;
    //mencari data kartu berdasarkan id
    const firstCard = cards.find(c => c.id === firstId);
    const secondCard = cards.find(c => c.id === secondId);

    //tambah jumlah percobaan setiap 2 kartu dibuka
    setMoves(prev => prev + 1);
    //jika kedua kartu memiliki pairId yang sama berarti cocok
    if (firstCard.pairId === secondCard.pairId) {
      //tambahkan kedua kartu ke matchedCards
      setMatchedCards(prev => [...prev, firstId, secondId]);
      //kosongkan flippedCards
      setFlippedCards([]);
    } else {

      //jika tidak cocok, kartu akan ditutup kembali setelah 800ms
      const timer = setTimeout(() => {
        setFlippedCards([]);
      }, 800);

      return () => clearTimeout(timer);
    }
  }

}, [flippedCards, cards]);


//fungsi untuk membuka kartu ketika diklik
const handleCardFlip = (id) => {

  // Mencegah membuka kartu jika sudah ada 2 kartu terbuka
  // atau kartu yang diklik sudah terbuka
  if (
    flippedCards.length === 2 ||
    flippedCards.includes(id)
  ) return;

  // Tambahkan kartu ke flippedCards
  setFlippedCards(prev => [...prev, id]);
};
// Fungsi untuk mereset permainan ke kondisi awal
const resetGame = () => {
  // membuat kartu baru yang sudah diacak
  setCards(createCards());
  // mengosongkan kartu terbuka
  setFlippedCards([]);
  // mengosongkan kartu yang sudah cocok
  setMatchedCards([]);
  // reset jumlah percobaan
  setMoves(0);
};


}