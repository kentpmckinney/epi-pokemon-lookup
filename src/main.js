/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import './styles.css';
import $ from 'jquery';

$(document).ready(function () {
	$('#poke-button').click(function () {
		const poke = $('#poke-input').val().toLowerCase();
		(async () => {
			try {
				let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
				let jsonifiedResponse;
				if (response.ok && response.status === 200) {
					jsonifiedResponse = await response.json();
				} else {
					jsonifiedResponse = false;
				}
				let pokemon = jsonifiedResponse;
				let moves = pokemon.moves;
				$('#results').append(`<div><img href='${pokemon.sprites.front_default}'/></div>`);
				if (moves) {
					for (let move of moves) {
						$('#results').append(`<div>${move.move.name}</div>`);
					}
				} else {
					$('#results').append(`Couldn't find a pokemon named '${poke}'. Please check spelling and try again!`);
				}
			} catch (e) {
				alert(e.message);
			}
		})();
	});

	$('input').bind('keypress', function (e) {
		let event = e || window.event;
		let keycode = event.keyCode || event.which;
		if (keycode == '13') $(this).siblings('button').click();
	});
});
