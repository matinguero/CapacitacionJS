
$(document).ready(function() {
    flag=true;
    let numero = Math.floor(Math.random() * 1000);
    let botonnexturl
    let botonback
  
    cargarpokemones();

    cargartarjetapokemon(numero);



    $("#btnNext").click(function() {

        botonNext();
       
    });


    $("#btnBack").click(function() {
        
        botonBack();
            
    });

    
   

    $("#imgPokemonF").hover(function(){
        $("#imgPokemonF").attr("hidden", true);
        $("#imgPokemonB").attr("hidden", false);     
    });

    $("#imgPokemonB").hover(function(){},function(){ 
        $("#imgPokemonF").attr("hidden", false);
        $("#imgPokemonB").attr("hidden", true); 
     });


});


  function cargarpokemones() {
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/",
        type: "GET",
        success: function(response) {
                let pokemones = response.results;
                botonnexturl = response.next;
                botonback = response.previous;
                if(botonback === null){
                    $("#btnBack").prop("disabled", true);
                }else{
                    $("#btnBack").prop("disabled", false);
                }
                if(botonNext === null){
                    $("#btnNext").prop("disabled", true);
                }else{
                    $("#btnNext").prop("disabled", false);
                }
                console.log( pokemones);
                let nombrenro = 0;
                for (let i = 0; i < 4; i++) {

                   const row = $('<tr></tr>');
                    
                    for (let j = 0; j < 5; j++) {
                       
                        const pos = $('<td></td>').text(pokemones[nombrenro].name);
                        row.append(pos); 
                        
                        nombrenro++; 
                    }
            
                   
                    $('#pokedex').append(row);
                }

        },
        error: function(error) {
            console.log("Error:", error);
        }
    })
}

function cargartarjetapokemon(id) {
    $.ajax({
        url: " https://pokeapi.co/api/v2/pokemon/" + id,
        type: "GET",
        success: function(response) {
            
            let nombrepokemon = response.name;
            let habilidades = response.abilities;
            let img = response.sprites;
            let URLSpecies = response.species;

            
            $("#pokemon2").text(nombrepokemon);
            $("#imgPokemonF").attr("src", img.front_default);
            $("#imgPokemonB").attr("src", img.back_default);            
            $("#hid").show();

            console.log("Atrapaste un: " + nombrepokemon + "!")
            

            for (let i = 0; i<habilidades.length; i++){
                console.log(habilidades);
                $('#ulPokemon').append('<li>' + habilidades[i].ability.name + '</li>');
            };
            
            flag=false;
        },
        error: function(error) {
            console.log("Error:", error);
        }
    });

}


function botonNext(){
    $.ajax({
        url: botonnexturl,
        type: "GET",
        success: function(response) {

                $("#pokedex").empty();
            
                let pokemones = response.results;
                botonnexturl = response.next;
                botonback = response.previous;
            
                if(botonnexturl === null){
                    $("#btnNext").prop("disabled", true);
                }else{
                    $("#btnNext").prop("disabled", false);
                }
                if(botonback === null){
                    $("#btnBack").prop("disabled", true);
                }else{
                    $("#btnBack").prop("disabled", false);
                }
                
                console.log( pokemones);
                let nombrenro = 0;
                for (let i = 0; i < 4; i++) {

                   const row = $('<tr></tr>');
                    
                    for (let j = 0; j < 5; j++) {
                       
                        const pos = $('<td></td>').text(pokemones[nombrenro].name);
                        row.append(pos); 
                        
                        nombrenro++; 
                    }
            
                   
                    $('#pokedex').append(row);
                }

        },
        error: function(error) {
            console.log("Error:", error);
        }
    })

}

function botonBack(){

    $.ajax({
        url: botonback,
        type: "GET",
        success: function(response) {
            
                $("#pokedex").empty();
                
                let pokemones = response.results;
                botonnexturl = response.next;
                botonback = response.previous;
                
                if(botonback === null){
                    $("#btnBack").prop("disabled", true);
                }else{
                    $("#btnBack").prop("disabled", false);
                }
                if(botonnexturl === null){
                    $("#btnNext").prop("disabled", true);
                }else{
                    $("#btnNext").prop("disabled", false);
                }
                
                console.log( pokemones);
                
                let nombrenro = 0;
                
                for (let i = 0; i < 4; i++) {

                   const row = $('<tr></tr>');
                    
                    for (let j = 0; j < 5; j++) {
                       
                        const pos = $('<td></td>').text(pokemones[nombrenro].name);
                        row.append(pos); 
                        
                        nombrenro++; 
                    }
            
                   
                    $('#pokedex').append(row);
                }

        },
        error: function(error) {
            console.log("Error:", error);
        }
    })
}