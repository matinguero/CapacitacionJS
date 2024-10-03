
$(document).ready(function() {
    flag=true;
    $("#btnAtrapar").click(function() {
        let numero = Math.floor(Math.random() * 1000); 
       // console.log("INFO: Hola, tu numero Random es:" + numero);
        
        $('ul').empty();
        $.ajax({
            url: " https://pokeapi.co/api/v2/pokemon/" + numero, // Example: fetching Ditto's data
            type: "GET",
            success: function(response) {
                
                let nombrepokemon = response.name;
                let habilidades = response.abilities;
                let img = response.sprites;
              //  let img2 = response.types;
                let URLSpecies = response.species;


                $.ajax({
                    url: URLSpecies.url ,
                    type: "GET",
                    success: function(response){
                        let evochain = response.evolution_chain;

                        $.ajax({
                            url: evochain.url,
                            type: "GET",
                            success: function(response){
                                let evolves = response.chain.evolves_to[0].evolves_to[0].species.name;

                               console.log(evolves);
                               $("#ddlEvos").append($('<option>', {
                                value: 1,
                                text: evolves
                            }));
                            },
                            error: function(error){
                                console.log("ERROR: " + error);
                            }
                            
                        })



                    },
                    error: function(error){
                        console.log("ERROR: " + error);
                    }

                })
                // Display fetched information in the div
                $("#pokemon2").text(nombrepokemon);
                $("#imgPokemonF").attr("src", img.front_default);
                $("#imgPokemonB").attr("src", img.back_default);
                
                $("#hid").show();
                console.log("Atrapaste un: " + nombrepokemon + "!")
                console.log(habilidades);
                for (let i = 0; i<habilidades.length; i++){
                    console.log(habilidades);
                    $('#ulPokemon').append('<li>' + habilidades[i].ability.name + '</li>');
                };
                
                //habilidades.forEach(myFunction);
                flag=false;
            },
            error: function(error) {
                console.log("Error:", error);
            }
        });

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
/*
function myFunction(value, index, array) { 
    console.log(array);
    $('#ulPokemon').append('<li>' + array + '</li>');
    
  }
  */