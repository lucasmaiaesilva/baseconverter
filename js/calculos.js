$(document).ready(function() {
//	var numero = 1101;
	var objeto = new Numeros();
	$("#numero").keyup(function() {
		objeto.mostrarNumero();
		$('#resultado').show();	
	});  
	$("#numero").click(function() {
		objeto.mostrarNumero();
		$('#resultado').show();	
	});  

});

function Numeros(){

	this.mostrarNumero = function(){

		var debase = this.pegarBaseFromSelect('field');
		var parabase = this.pegarBaseFromSelect('field-2');
		var numero = $('#numero').val();
		if( debase == parabase){
			$('#resultado').html(numero);				
		}else if(debase == 'decimal'){
			var resultado = this.converterBaseFromDecimal(parabase, numero).reverse().join("");
			$('#resultado').html(resultado);
		}else if(parabase == 'decimal'){
			var resultado = this.converterToDecimal(debase, numero);
			$('#resultado').html(resultado);
		}else if(parabase != 'decimal' && debase != 'decimal'){
			var temp = this.converterToDecimal(debase, numero);
			var resultado = this.converterBaseFromDecimal(parabase, temp).reverse().join("");
			$('#resultado').html(resultado);
		}


	}

	this.pegarBaseFromSelect = function(campo){
		var sel = document.getElementById(campo);
		var sv = sel.options[sel.selectedIndex].value;
		return sv;

	}

	this.converterBaseFromDecimal = function(tipo, numero){
		if(tipo == "binary"){
			num = 2;
		}else if(tipo == "octal"){
			num = 8;
		}else if(tipo == "hexadecimal"){
			num = 16;
		}
		var i=0;
		var vetor = new Array();
		while(numero != 0){				
			var numLocal;
			numLocal = numero % num;
			tipo == "hexadecimal"?vetor[i] = this.gerarCaracteresEspeciais(numLocal):vetor[i] = numLocal;
			numero = parseInt(numero / num);
			i++;
		}


		return vetor;		
	}

	this.converterToDecimal = function(tipo, numero){
		if(tipo == "binary"){
			base = 2;
		}else if(tipo == "octal"){
			base = 8;
		}else if(tipo == "decimal"){
			base = 10;
		}else if(tipo == "hexadecimal"){
			base = 16;
		}
		var soma = 0;
		var retorno = 0;
		//debugger;
		num = numero.toString().split("");
		for (i = 0; i < num.length; i++){	
			tipo == "hexadecimal"?valor = this.traduzirCaracteresEspeciais(num[num.length-(i+1)]):valor = parseInt(num[num.length-(i+1)]);
			debugger;
			//valor = parseInt(num[num.length-(i+1)]);
			soma = valor * (Math.pow(base,i));
			retorno = soma + retorno;
			soma = 0;
		}
		return retorno;

	}
	
	this.gerarCaracteresEspeciais = function(num){
		if(this.isNumeric(num) == false)
			num = num.toUpperCase();

		switch (num) {
			case 10:
			return 'A';
			break;

			case 11:
			return 'B';
			break;

			case 12:
			return 'C';
			break;

			case 13:
			return 'D';
			break;

			case 14:
			return 'E';
			break;

			case 15:
			return 'F';
			break;

			default:
			return num;
			break;

		}
	}

	this.isNumeric = function(obj){
	    return !isNaN(parseFloat(obj)) && isFinite(obj);
	}

	this.traduzirCaracteresEspeciais = function(num){
		if(this.isNumeric(num) == false)
			num = num.toUpperCase();

		switch (num) {

			case 'A':
			return 10;
			break;

			case 'B':
			return 11;
			break;

			case 'C':
			return 12;
			break;

			case 'D':
			return 13;
			break;

			case 'E':
			return 14;
			break;

			case 'F':
			return 15;
			break;

			default:
			return num;
			break;

		}
	}


}