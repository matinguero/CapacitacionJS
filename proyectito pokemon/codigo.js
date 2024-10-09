
$(document).ready(function() {""
    
    let numero = Math.floor(Math.random() * 1000);
    let botonnexturl;
    let botonback;


    CargarTabla("https://pokeapi.co/api/v2/pokemon/");
  
    cargartarjetapokemon(numero);

    $("#btnNext").click(function() {

        CargarTabla( $("#btnNext").attr("url"));

    });

    $('#pokedex td').on('click', function() {
        // Get the text of the clicked cell
        var cellData = $(this).text();
        
        // Log the data to the console or use it as needed
        console.log("Cell data: " + cellData);
        
        // Example: Display the data in an alert
        alert("You clicked on: " + cellData);
    });

    $("#btnBack").click(function() {
        
        CargarTabla($("#btnBack").attr("url"));

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
            $("#imgPokemonF").attr("alt", "Imagen delantera de " + nombrepokemon);
            $("#imgPokemonB").attr("alt", "Imagen trasera de " + nombrepokemon);                  
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

function CargarTabla(URL){
    $.ajax({
        url: URL,
        type: "GET",
        success: function(response) {

                $("#pokedex").empty();
            
                let pokemones = response.results;
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
                }
               
               
            
                
                console.log( pokemones);
                let tabla;
                let nombrenro = 0; //REMOVER
                for (let i = 0; i < 4; i++) {

                   const row = $('<tr></tr>');
                    
                    for (let j = 0; j < 5; j++) {
                       
                        const pos = $('<td></td>').text(pokemones[nombrenro].name); //agregar campo hidden con URL
                        row.append(pos); 
                        
                        nombrenro++; 
                    }
            
                $("#pokedex").append(row);
                }
        },
        error: function(error) {
            console.log("Error:", error);
        }
    })
}
