import React from 'react';
import { FaQuestion } from 'react-icons/fa';

//componen untuk menampilkan satu kartu memo
//propps//card: objek berisi informasi kartu(id,icon, color, pairid)
// isFlapped: bool apakah kartu sedang bterbuka
//ismacthed: boool apakah kartu sudah berhasil dicocokkan
//onflip: fungsi yang dipanggil ketika kartu diklik

function Card({ card, isFlipped, isMatched, onFlip }) {
    //hsndler ketika kartu diklik
    //hanya bisa dikik jika kartu belum terbuka dan belum matched
    const handleClick = () => {
        if (!isFlipped && !isMatched) {
            onFlip(card.id);
        }
    };

    const isOpen = isFlipped || isMatched;
    const IconComponent = card.icon;

    // menentukan className berdasarkan status kartu
    const cardClass = `w-20 h-20 flex items-center justify-center text-3xl rounded-xl cursor-pointer select-none transition-all duration-300 transform
    ${isOpen ? 'bg-white shadow-md scale-100' : 'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg hover:scale-105 hover:shadow-xl'}
    ${isMatched ? 'opacity-70 ring-2 ring-green-400' : ''}`;

    return (
        <div onClick={handleClick} className={cardClass}>
            {isOpen ? (
                <span className="animate-bounce-once">
                    <IconComponent style={{ color: card.color }} />
                </span>
            ) : (
                <FaQuestion className="text-white/60 text-xl" />
            )}
        </div>
    );
}

export default Card;