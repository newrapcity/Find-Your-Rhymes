'use strict';

function getRhymes(userInput) {

  const options = {
  headers: new Headers({
    "X-Mashape-Key": '4e73cc0e6fmsh0f51520d6cc0bbfp18d26fjsn3adbc3ef9f56'})
  };

  fetch(`https://wordsapiv1.p.mashape.com/words/${userInput}/rhymes`, options)
    .then(response => response.json())
    //.then(responseJson => console.log(responseJson))
    .then(responseJson => 
      displayRhymes(responseJson));
    
}

function getDefintions(word) {

  const options = {
  headers: new Headers({
    "X-Mashape-Key": '4e73cc0e6fmsh0f51520d6cc0bbfp18d26fjsn3adbc3ef9f56'})
  };

  fetch(`https://wordsapiv1.p.mashape.com/words/${word}/definitions`, options)
    .then(response => response.json())
   // .then(responseJson => console.log(responseJson))
    .then(responseJson => {
      displayDefinitions(responseJson)
      getSynonyms(word); 
    })
    .catch(error => console.log(error));
    
}

function getSynonyms(word) {

  const options = {
  headers: new Headers({
    "X-Mashape-Key": '4e73cc0e6fmsh0f51520d6cc0bbfp18d26fjsn3adbc3ef9f56'})
  };

  fetch(`https://wordsapiv1.p.mashape.com/words/${word}/synonyms`, options)
    .then(response => response.json())
    //.then(responseJson => console.log(responseJson))
    .then(responseJson => 
      displaySynonyms(responseJson))
    .catch(error => console.log(error));
    
}

function displayRhymes(responseJson) {

  $( ".results" ).empty();

  if (Object.keys(responseJson.rhymes) == 0) {
    $('.results').append(`<p class="error">Sorry no results for that word</p>`);
  } else {

  for(let i = 0; i < responseJson.rhymes.all.length; i++) {
    $('.results').append(`<div class="results-item"><h2 data-word="${responseJson.rhymes.all[i]}">${responseJson.rhymes.all[i]}</h2></div>`);

    }
  }

}

function displayDefinitions(responseJson) {

  for(let i = 0; i < responseJson.definitions.length; i++) {
    $('.modal-content').append(`<p class="label">${responseJson.definitions[i].partOfSpeech}</p><h3 class="definition">${responseJson.definitions[i].definition}</h3>`);
  }

}

function displaySynonyms (responseJson) {

  if(responseJson.synonyms.length === 0){

   } else {
      $('.modal-content').append(`<p class="label">synonyms:</p>`);
   }

  for(let i = 0; i < responseJson.synonyms.length; i++) {
    $('.modal-content').append(`<p class="synonyms">${responseJson.synonyms[i]},</p>`);
  }

}

function removeModal() {
  $('.modal').remove();
}

function watchForm() {

  $('form').submit(event => {
    event.preventDefault();
    const userInput = $('#userInput').val().trim() ;
    getRhymes(userInput);
    console.log(userInput);
  });

  $('.results').on('click','.results-item h2', function(){

  let word = $(this).attr('data-word');

  $('.main-container').append(
    `<div class="modal">
      <div class="modal-content">
        <span class="closeBtn">&times;</span>
        <h1>${word}</h1>
      </div>
    </div>`
    )

  getDefintions(word);

  $('.closeBtn').on('click', event => removeModal());

  });

}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});