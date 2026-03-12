
//GameBoard.js adalah komponen yang menampilkan semua kartu dalam bentuk grid
//Dia mengambil data kartu lalu mengirimnya ke komponen Card satu per satu


import React from "react";
import Card from "./Card"; //manggil komponen card.js

function GameBoard ({cards,flippedCards,  matchedCards, onFlip}){
    return(
        //grid container 4 kolom untuk menampilkan kartu
        <div className="grid grid-cols-4 gap-4 justify-items-center"> {/*ini pakai tailwind css*/}

            {cards.map(card => ( //mengulang array, map() akan membuat Card untuk setiap item
                //render komponen card untuk setiap kartu
                //
                <Card
                key={card.id} //Digunakan React untuk optimasi render list
                card={card} //Mengirim data kartu ke komponen Card.
                isFlipped={flippedCards.includes(card.id)} //Mengecek apakah kartu ada di array flippedcards
                isMatched={matchedCards.includes(card.id)} //Mengecek apakah kartu ada di array matchedcards
                onFlip={onFlip} //mengirim fungsi ketika kartu diklik
                />
            ))}

        </div>
    )
}
export default GameBoard;