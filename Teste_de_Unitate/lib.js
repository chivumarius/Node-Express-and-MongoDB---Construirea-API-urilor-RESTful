//________________________________________________________________________
// TESTAREA 'NUMERELOR'
// FUNC. 'ABSOLUT': 
//________________________________________________________________________
module.exports.absolut = function(numar) {

    // DECLARATIA CONDITIONALA 
    // CU 'OP. TERNAR':
    return (numar >= 0) ? numar : -numar;
}



//________________________________________________________________________
// TESTAREA 'STRING'-URILOR
// FUNC. 'SALUT': 
//________________________________________________________________________
module.exports.salut = function(nume) {
    return 'Bine ai venit ' + nume + '!';
}





//________________________________________________________________________
// TESTAREA  'MATRICILOR' 
module.exports.obtinereValuta = function() {
    return ['USD', 'LEI', 'EURO'];
}




//________________________________________________________________________
// TESTAREA  'OBIECTE': 
module.exports.obtineProdus = function(idProdus) {
    return { id: idProdus, pret: 10, categorie: 'a' };
}




//________________________________________________________________________
// TESTAREA  'EXCEPTIILOR'
// (NECESITA CEL PUTIN '2 TESTE DE UNITATE')
module.exports.inregistrareUtilizator = function(nume_uilizator) {

    // DACA 'NUMELE_UTILIZATOR ESTE FALS'
    // ARUNCAM O EXCEPTIE:
    if (!nume_uilizator) throw new Error('Numele de utilizator este solicitat.');

    // ALTFEL SE RETURNEAZA UN 'OBIECT' U '2 PROPRIETATI':
    return { id: new Date().getTime(), nume_uilizator: nume_uilizator }
}