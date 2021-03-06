const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const config = require('./config.json');
const db = require('./models')(Sequelize, config);

(async () => {
	console.log('\r\n\t --- Start main --- \r\n');
	await db.sequelize.sync({force: true});
    await require('./insertPizzas')(db);
    await require('./insertWeapons')(db);
    await require('./insertTurtles')(db);

    console.log('\r\n\t --- TASK 01 [All turtles] --- \r\n');    
    (await db.turtles.findAll()).forEach((v) => {
        console.log(v.name);
    });

    console.log('\r\n\t --- TASK 02 [ Favourite pizza is Mozzarella ] --- \r\n');
	(await db.turtles.findAll({
		where: {
			'$firstFavouritePizza.name$': 'mozzarella'
		},
		include: [{
			model: db.pizzas,
			as: 'firstFavouritePizza'
		}]
	})).forEach((v) => {
		console.log(v.name);
	});

    console.log('\r\n\t --- TASK 03 [ Unique favourite pizzas ] --- \r\n');
    (await db.turtles.findAll({
        // group: 'firstFavouritePizzaId',
        include: [{
            model: db.pizzas,
            as: 'firstFavouritePizza'
        }]
    })).forEach((v) => {
    	let obj = v.dataValues.firstFavouritePizza.dataValues;
    	console.log(`for ${v.dataValues.name} => id = ${obj.id}, name = ${obj.name}`);
    });

	console.log('\r\n\t --- TASK 04 [ Create new turtles ] --- \r\n');
    await db.turtles.create({
        name: 'Bazil',
        color: 'red',
        weaponId: 4,
        firstFavouritePizzaId: 2,
        secondFavouritePizzaId: 1
    }).then(function(row) {
    	console.log(row.dataValues);
    });

	console.log('\r\n\t --- TASK 05 [ Update if calories>3000 add about SUPER FAT! ] --- \r\n');

    await db.pizzas.update(
    	{
    		description : 'SUPER FAT!'
    	},
    	{
			where: {
				calories: {
					[Op.gt]: 3000
				}
			}
    	}
    ).then(function(row) {
    	console.log(`${row} items update!`);
    });

    console.log('\r\n\t --- TASK 06 [ Get count if dps>100 ] --- \r\n');

    console.log(`Count = ${(await db.weapons.findAll(
    {
		where: {
			dps: {
				[Op.gt]: 100
			}
		}
	})).length}`);

	console.log('\r\n\t --- TASK 07 [ Get pizza with id = 1 ] --- \r\n');

    (await db.pizzas.findAll({
		where: {
			id: 1
		}
	})).forEach((val) => {
        console.log(`Name = ${val.name}`);
    });

	console.log('\r\n\t --- TASK 08 [ Add pizza for turtle ] --- \r\n');

	(await db.turtles.update(
	{
		firstFavouritePizzaId: 2
	},
	{
		where: {
			id: 5
		}
	}
	)).forEach((row) => {
        console.log(`Updated!`);
    });

    console.log('\r\n\t --- End main block --- \r\n');
})();