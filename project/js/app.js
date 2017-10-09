function currencyexchange() {
	var euro = parseInt(prompt("Enter euros: "));
	var oneEuro = 1;
	var dollars = parseInt(prompt("Enter dollars: "));
	var euroToGryvnya=30.66*euro;
	var dollarsToGryvnya=25.75*dollars;
	var euroToDollars=1.189*oneEuro;


	if(!isNaN(euro) && !isNaN(dollars))  {
		if(euro==='1') {
			alert( euro+" "+"euro is euqal"+" "+euroToGryvnya+" "+"grns, " + 
				dollars+" "+"dollars are euqal"+" "+dollarsToGryvnya+" "+"grns, "+ " "+
				"one euro is equal"+" "+euroToDollars+" "+"dollars." );
		}
		else if(dollars==='1') {
			alert( euro+" "+"euros are euqal"+" "+euroToGryvnya+" "+"grns, " + 
				dollars+" "+"dollar is euqal"+" "+dollarsToGryvnya+" "+"grns, "+ " "+
				"one euro is equal"+" "+euroToDollars+" "+"dollars." );
		}
		else if((euro==='1')&& (dollars==='1')) {
			alert( euro+" "+"euro is euqal"+" "+euroToGryvnya+" "+"grns, " + 
				dollars+" "+"dollar is euqal"+" "+dollarsToGryvnya+" "+"grns, "+ " "+
				"one euro is equal"+" "+euroToDollars+" "+"dollars." );
		}
		else {
			alert( euro+" "+"euros are euqal"+" "+euroToGryvnya+" "+"grns, " + 
				dollars+" "+"dollars are euqal"+" "+dollarsToGryvnya+" "+"grns, "+ " "+
				"one euro is equal"+" "+euroToDollars+" "+"dollars." );
		}
	}

	else if (isNaN(euro) && isNaN(dollars)){
		alert("ooops,two currency is not a number, you can write only a numbers,try again!");
		currencyexchange();
	}

	else if(isNaN(euro)){
		alert("ooops,euro currency is not a number, you can write only a numbers,try again!");
		currencyexchange();
	}
	else if(isNaN(dollars)){
		alert("ooops,dollar currency is not a number, you can write only a numbers,try again!");
		currencyexchange();
	}
	
	else {
		alert("opps,try again!");
		currencyexchange();
	}
}

currencyexchange();