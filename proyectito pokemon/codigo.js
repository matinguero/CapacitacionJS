
$(document).ready(function() {
    
    let numero = Math.floor(Math.random() * 1000);
    let botonnexturl;
    let botonback;


    cargarTablaPokemones("https://pokeapi.co/api/v2/pokemon/");
  
    cargarTarjetaPokemon(numero);

    $("#btnNext").click(function() {

        cargarTablaPokemones( $("#btnNext").attr("url"));

    });
    $('#pokedex').on('click', 'td', function() {
       
        if($(this).find('label').text()!=="")
        {
        cargarTarjetaPokemon($(this).find('label').text());
       // cargarTarjetaPokemon($(this).find('label').attr("id"));
        }
        
    });
   

    $("#btnBack").click(function() {
        
        cargarTablaPokemones($("#btnBack").attr("url"));

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


function cargarTarjetaPokemon(id) {
    $.ajax({
        url: " https://pokeapi.co/api/v2/pokemon/" + id,
        type: "GET",
        success: function(response) {
            $('#ulPokemon').empty();
            let NombrePokemon = response.name;
            let Habilidades = response.abilities;
            let img = response.sprites;
            let URLSpecies = response.species;
            
            $("#pokemon2").text(NombrePokemon);
            $("#imgPokemonF").attr("src", img.front_default);
            $("#imgPokemonB").attr("src", img.back_default);      
            $("#imgPokemonF").attr("alt", "Imagen delantera de " + NombrePokemon);
            $("#imgPokemonB").attr("alt", "Imagen trasera de " + NombrePokemon);                  
            $("#hid").show();

           

            for (let i = 0; i<Habilidades.length; i++){
                
                $('#ulPokemon').append('<li>' + Habilidades[i].ability.name + '</li>');
            };
            
        },
        error: function(error) {
            console.log("Error:", error);
        }
    });

}

function cargarTablaPokemones(URL){
    $.ajax({
        url: URL,
        type: "GET",
        success: function(response) {

                $("#pokedex").empty();
            
                let Pokemones = response.results;
                if (response.next===null){
                    $("#btnNext").prop("disabled", true);
                    $("#btnNext").attr("url", "");
                }else{
                    $("#btnNext").prop("disabled", false);
                    $("#btnNext").attr("url", response.next);
                }
                if (response.previous===null){
                    $("#btnBack").prop("disabled", true);
                    $("#btnBack").attr("url", "");
                }else{
                    $("#btnBack").prop("disabled", false);
                    $("#btnBack").attr("url", response.previous);
                    URLaux=response.previous;
                }
               
               
            
                
                console.log( Pokemones);
                let tabla;
                let PokemonNro = 0; 
                for (let i = 0; i < 4; i++) {

                   const row = $('<tr></tr>');
                    
                    for (let j = 0; j < 5; j++) {
                       if(Pokemones[PokemonNro] && Pokemones[PokemonNro].name){
                        const pos = $('<td></td>').text(Pokemones[PokemonNro].name); 
                        idURL = Pokemones[PokemonNro].url.split('/').slice(-2, -1)[0];
                        const LabelOculto = $('<label></label>').attr('hidden', true).attr('id', idURL).attr('url', Pokemones[PokemonNro].url).text(idURL); 

                        pos.append(LabelOculto);
                        row.append(pos); 
                        }
                        else{
                           urlback = URLaux.split("=");
                           urlback[2] = "20";
                           offset = urlback[1].split("&");
                           offset[0]=1280;
                           urlback[1]=offset.join("&");
                           $("#btnBack").attr("url", urlback.join("=")) 
                           const emptyCell = $('<td></td>').text("");
                           emptyCell.css('background-color', "rgb(255, 250, 203)");
                           row.append(emptyCell);
                        }
                        PokemonNro++; 
                    }
            
                $("#pokedex").append(row);
                }
        },
        error: function(error) {
            console.log("Error:", error);
        }
    })

}
