var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function(){
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaMarcadores();
	$("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
	var frase = $(".frase").text();
	var numPalavras = frase.split(" ").length;
	var tamanhoFrase = $("#tamanho-frase");
	tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
	campo.on("input",function(){
		var conteudo = campo.val();

		var qtdPalavras = conteudo.split(/\S+/).length - 1;
		$("#contador-palavras").text(qtdPalavras);

		// Retira os espaços da String
		var conteudoSemEspaco = conteudo.replace(/\s+/g,'');
		var qtdCaracteres = conteudoSemEspaco.length;
		$("#contador-caracteres").text(qtdCaracteres);
	});
}

function inicializaCronometro() {
	var tempoRestante = $("#tempo-digitacao").text();
	campo.one("focus",function(){
		var cronometroID = setInterval(function(){
			$("#botao-reiniciar").attr("disabled",true);
			tempoRestante--;
			$("#tempo-digitacao").text(tempoRestante);
			if(tempoRestante < 1){
				clearInterval(cronometroID);
				finalizaJogo();
			}
		},1000);
	})
}

function finalizaJogo(){
	campo.attr("disabled",true);
	campo.toggleClass("campo-desativado");
	$("#botao-reiniciar").attr("disabled",false);
	inserePlacar();
}

function inicializaMarcadores(){
	var frase = $(".frase").text();
	campo.on("input",function(){
		var digitado = campo.val();
		var comparavel = frase.substr(0,digitado.length);
		/*
		if( frase.startsWith(digitado)) {
			campo.addClass("borda-verde");
		} else {
			campo.addClass("borda-vermelha");
		}
		*/
		if(digitado == comparavel){
			campo.addClass("borda-verde");
			campo.removeClass("borda-vermelha");
		}else{
			campo.addClass("borda-vermelha");
			campo.removeClass("borda-verde");
		}
		/*
		var ehCorreto = (digitado == comparavel);
		campo.toggleClass("borda-verde", ehCorreto);
		campo.toggleClass("borda-vermelha", !ehCorreto);
		*/
	});
}

function inserePlacar(){
	var corpoTabela = $(".placar").find("tbody");
	var usuario = "Julio";
	var numPalavras = $("#contador-palavras").text();
	var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>";

	var linha = "<tr>"+
					"<td>"+ usuario + "</td>"+
					"<td>"+ numPalavras + "</td>"+
					"<td>"+ botaoRemover + "</td>"+
				"</tr";

	corpoTabela.prepend(linha);
}

$(".botao-remover").click(function(event){
	event.preventDefault();
	$(this).parent().parent().remove();
})

function reiniciaJogo(){
	campo.attr("disabled",false);
	campo.val("");
	$("#contador-palavras").text("0");
	$("#contador-caracteres").text("0");
	$("#tempo-digitacao").text(tempoInicial);
	inicializaCronometro();
	campo.toggleClass("campo-desativado");
	campo.removeClass("borda-vermelha");
	campo.removeClass("borda-verde");
}
