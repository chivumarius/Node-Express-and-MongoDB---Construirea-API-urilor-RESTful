// IMPORTAM:
const request = require('supertest');
const { Rental } = require('../../models/rental');
const { User } = require('../../models/user');
const mongoose = require('mongoose');



// SUITA DE TESTE '/API/RETURNS'
describe('/api/returns', () => {
    // DECLARAREA 'VARIABILELOR':
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;


    // FUNC. 'EXEC(){}'
    const exec = () => {
        // ADAUGARE DATE IN 'DB':
        return request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId, movieId });
    };


    // INCARCAREA 'SERVER'-ULUI 
    beforeEach(async() => {
        // PORNIRE SERVER DIN 'INDEX.JS':
        server = require('../../index');


        // PRELUAREA UNUI 'OBJECTID' DIN 'MONGOOSE':
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();

        // SETARE TOKEN - PT. UN 'USER NOU'
        // & GENERAREA 'TOKEN'-ULUI DE 'AUTENTIFICARE'
        token = new User().generateAuthToken();

        // CREAM OBIECTUL 'INCHIRIERE':
        rental = new Rental({
            // 'INITIALIZAREA' PROP. 'CLIENT':
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },

            // 'INITIALIZAREA' PROP. 'FILM':
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2
            }
        });

        // SALVAREA 'INCHIRIERI' IN 'DB':
        await rental.save();
    });


    afterEach(async() => {
        // 'INCHIDEREA' SERVERULUI: 
        await server.close();
        // STERGEREA 'INCHIRIERI':
        await Rental.remove({});
    });



    // ---------------------------------------------------------------------------------
    //(CAZ 1) RETURNARE '401' - DACA 'CLIENTUL' NU ESTE 'AUTENTIFICAT'
    it('should return 401 if client is not logged in', async() => {
        // SETAM PARAMETRUL 'TOKEN' CA 'CA SIR GOL':
        token = '';

        // APELARE FUNC.'EXEC()':
        const res = await exec();

        // ASTEPTAM CA 'STATUSUL RASP.' SA 'FIE 400':
        expect(res.status).toBe(400);
    });




    // ---------------------------------------------------------------------------------
    //(CAZ 2) RETURNARE '400' - DACA 'ID'-UL 'CLIENTULUI AUTENTIFICAT' NU ESTE 'FURNIZAT'
    it('should return 400 if customerId is not provided', async() => {
        // SETAM PARAMETRUL 'CUSTOMERID' CA 'CA SIR GOL':
        customerId = '';

        // ALTA ABORDARE:
        // delete payload.customerId;


        // APELARE FUNC.'EXEC()':
        const res = await exec();

        // ASTEPTAM CA 'STATUSUL RASP.' SA 'FIE 400':
        expect(res.status).toBe(400);
    });




    // ---------------------------------------------------------------------------------
    //(CAZ 3) RETURNARE '400' - DACA 'ID'-UL 'FILMULUI' NU ESTE 'FURNIZAT'
    it('should return 400 if movieId is not provided', async() => {
        // SETAM PARAMETRUL 'MOVIEID' CA 'CA SIR GOL':
        movieId = '';

        // APELARE FUNC.'EXEC()':
        const res = await exec();

        // ASTEPTAM CA 'STATUSUL RASP.' SA 'FIE 400':
        expect(res.status).toBe(400);
    });




    // ---------------------------------------------------------------------------------
    //(CAZ 4) RETURNARE '404' - DACA 'INCHIRIEREA' NU ESTE 'POSIBILA' PT. 'FILM'/'CLIENT'
    it('should return 404 if no rental found for the customer/movie', async() => {
        // CURATAM COLECTIA 'RENTAL':
        await Rental.remove({});

        // APELARE FUNC.'EXEC()':
        const res = await exec();

        // ASTEPTAM CA 'STATUSUL RASP.' SA 'FIE 404':
        expect(res.status).toBe(404);
    });




    // ---------------------------------------------------------------------------------
    //(CAZ 5) RETURNARE '400' - DACA 'INCHIRIEREA' A FOST 'DEJA PROCESATA' PT. 'FILM'/'CLIENT'
    it('should return 400 if return is already processed', async() => {
        // SETAM 'DATA RETURNARI' CA SI 'DATA CURENTA':
        rental.dateReturned = new Date();

        // SALVAM 'INCGHIRIEREA':
        await rental.save();


        // APELARE FUNC.'EXEC()':
        const res = await exec();

        // ASTEPTAM CA 'STATUSUL RASP.' SA 'FIE 400':
        expect(res.status).toBe(400);
    });




    // ---------------------------------------------------------------------------------
    //(CAZ 6) RETURNARE '200' - DACA 'CEREREA' ESTE 'VALIDA'
    it('should return 200 if we have a valid request', async() => {
        // APELARE FUNC.'EXEC()':
        const res = await exec();

        // ASTEPTAM CA 'STATUSUL RASP.' SA 'FIE 200':
        expect(res.status).toBe(200);
    });
});